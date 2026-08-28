import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminJournalArticleDto } from './dto/admin-journal.dto';
import { AdminFaqDto } from './dto/admin-faq.dto';
@Injectable()
export class AdminService {
  private readonly email?: string;
  private readonly password?: string;
  private readonly secret?: string;
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.email = config.get<string>('ADMIN_EMAIL')?.trim().toLowerCase();
    this.password = config.get<string>('ADMIN_PASSWORD');
    this.secret = config.get<string>('ADMIN_AUTH_SECRET');
  }
  login(email: string, password: string) {
    this.configured();
    if (
      !this.equal(email.trim().toLowerCase(), this.email!) ||
      !this.equal(password, this.password!)
    )
      throw new UnauthorizedException('Credenziali non valide');
    const payload = Buffer.from(
      JSON.stringify({ exp: Date.now() + 8 * 60 * 60 * 1000 }),
    ).toString('base64url');
    return { token: `${payload}.${this.sign(payload)}`, expiresIn: 28800 };
  }
  async bookings(auth?: string) {
    this.verify(auth);
    const rows = await this.prisma.providerBookingAttempt.findMany({
      include: { hotelSearch: { include: { results: true } } },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return rows.map((x) => ({
      id: x.id,
      status: x.status,
      referenceCode: x.referenceCode,
      providerError: x.providerError,
      provider: x.hotelSearch.provider,
      hotelName:
        x.hotelSearch.results.find(
          (h) => h.providerHotelId === x.providerHotelId,
        )?.hotelName ?? 'Hotel',
      checkIn: x.hotelSearch.checkIn,
      checkOut: x.hotelSearch.checkOut,
      createdAt: x.createdAt,
    }));
  }
  async summary(auth?: string) {
    this.verify(auth);
    const [bookings, articles, publishedArticles, faq, publishedFaq, payments] =
      await Promise.all([
        this.prisma.providerBookingAttempt.groupBy({
          by: ['status'],
          orderBy: { status: 'asc' },
          _count: { id: true },
        }),
        this.prisma.journalArticle.count(),
        this.prisma.journalArticle.count({ where: { isPublished: true } }),
        this.prisma.faqItem.count(),
        this.prisma.faqItem.count({ where: { isPublished: true } }),
        this.prisma.hotelPayment.groupBy({
          by: ['status'],
          orderBy: { status: 'asc' },
          _count: { id: true },
        }),
      ]);
    return {
      bookings: Object.fromEntries(
        bookings.map((x) => [x.status, x._count.id]),
      ),
      articles: { total: articles, published: publishedArticles },
      faq: { total: faq, published: publishedFaq },
      payments: Object.fromEntries(
        payments.map((x) => [x.status, x._count.id]),
      ),
    };
  }
  async customers(auth?: string) {
    this.verify(auth);
    const attempts = await this.prisma.providerBookingAttempt.findMany({
      where: { customerEmailHash: { not: null } },
      select: { customerEmailHash: true, status: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    const customers = new Map<
      string,
      { id: string; bookings: number; confirmed: number; lastActivity: Date }
    >();
    attempts.forEach((attempt) => {
      const hash = attempt.customerEmailHash;
      if (!hash) return;
      const current = customers.get(hash) ?? {
        id: `Cliente ${hash.slice(0, 8).toUpperCase()}`,
        bookings: 0,
        confirmed: 0,
        lastActivity: attempt.createdAt,
      };
      current.bookings += 1;
      if (attempt.status === 'CONFIRMED') current.confirmed += 1;
      customers.set(hash, current);
    });
    return [...customers.values()];
  }
  async payments(auth?: string) {
    this.verify(auth);
    const payments = await this.prisma.hotelPayment.findMany({
      include: {
        preBookSnapshot: {
          include: {
            hotelSearch: { include: { results: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return payments.map((payment) => {
      const snapshot = payment.preBookSnapshot;
      const search = snapshot.hotelSearch;
      return {
        id: payment.id,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        customerId: `Cliente ${payment.customerEmailHash.slice(0, 8).toUpperCase()}`,
        hotelName:
          search.results.find(
            (result) => result.providerHotelId === snapshot.providerHotelId,
          )?.hotelName ?? 'Hotel',
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        createdAt: payment.createdAt,
      };
    });
  }
  async wishlists(auth?: string) {
    this.verify(auth);
    const [groups, customers] = await Promise.all([
      this.prisma.wishlist.groupBy({
        by: ['hotelId'],
        _count: { id: true },
        _max: { createdAt: true },
        orderBy: { _count: { id: 'desc' } },
        take: 100,
      }),
      this.prisma.wishlist.groupBy({ by: ['userId'] }),
    ]);
    const hotels = await this.prisma.hotel.findMany({
      where: { id: { in: groups.map((group) => group.hotelId) } },
      select: { id: true, name: true, mainImageUrl: true, isActive: true },
    });
    const hotelById = new Map(hotels.map((hotel) => [hotel.id, hotel]));
    return {
      total: groups.reduce((sum, group) => sum + group._count.id, 0),
      customers: customers.length,
      hotels: groups.map((group) => {
        const hotel = hotelById.get(group.hotelId);
        return {
          hotelId: group.hotelId,
          hotelName: hotel?.name ?? 'Hotel non più disponibile',
          image: hotel?.mainImageUrl ?? null,
          isActive: hotel?.isActive ?? false,
          saves: group._count.id,
          lastSavedAt: group._max.createdAt,
        };
      }),
    };
  }
  journalArticles(auth?: string) {
    this.verify(auth);
    return this.prisma.journalArticle.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }
  createJournalArticle(auth: string | undefined, dto: AdminJournalArticleDto) {
    this.verify(auth);
    return this.prisma.journalArticle.create({
      data: {
        ...dto,
        content: dto.content,
        publishedAt: dto.isPublished ? new Date() : null,
      },
    });
  }
  updateJournalArticle(
    auth: string | undefined,
    id: string,
    dto: AdminJournalArticleDto,
  ) {
    this.verify(auth);
    return this.prisma.journalArticle.update({
      where: { id },
      data: {
        ...dto,
        content: dto.content,
        publishedAt: dto.isPublished ? new Date() : null,
      },
    });
  }
  faqItems(auth?: string) {
    this.verify(auth);
    return this.prisma.faqItem.findMany({
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
    });
  }
  createFaqItem(auth: string | undefined, dto: AdminFaqDto) {
    this.verify(auth);
    return this.prisma.faqItem.create({ data: dto });
  }
  updateFaqItem(auth: string | undefined, id: string, dto: AdminFaqDto) {
    this.verify(auth);
    return this.prisma.faqItem.update({ where: { id }, data: dto });
  }
  private verify(auth?: string) {
    this.configured();
    const [p, s] = (auth?.startsWith('Bearer ') ? auth.slice(7) : '').split(
      '.',
    );
    if (!p || !s || !this.equal(s, this.sign(p)))
      throw new UnauthorizedException('Sessione non valida');
    try {
      const v = JSON.parse(Buffer.from(p, 'base64url').toString()) as {
        exp: number;
      };
      if (v.exp <= Date.now()) throw new Error();
    } catch {
      throw new UnauthorizedException('Sessione scaduta');
    }
  }
  private configured() {
    if (!this.email || !this.password || !this.secret)
      throw new ServiceUnavailableException(
        'Pannello amministrativo non configurato',
      );
  }
  private sign(v: string) {
    return createHmac('sha256', this.secret!).update(v).digest('base64url');
  }
  private equal(a: string, b: string) {
    return timingSafeEqual(
      createHash('sha256').update(a).digest(),
      createHash('sha256').update(b).digest(),
    );
  }
}
