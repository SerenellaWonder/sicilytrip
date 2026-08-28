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
import { AdminExperienceDto } from './dto/admin-experience.dto';
import { AdminPackageDto } from './dto/admin-package.dto';
import { AdminDestinationDto } from './dto/admin-destination.dto';
import { AdminHotelDto } from './dto/admin-hotel.dto';
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
    const [
      bookings,
      articles,
      publishedArticles,
      faq,
      publishedFaq,
      payments,
      destinations,
      activeDestinations,
      hotels,
      activeHotels,
      experiences,
      activeExperiences,
      packages,
      activePackages,
    ] = await Promise.all([
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
      this.prisma.destination.count(),
      this.prisma.destination.count({ where: { isActive: true } }),
      this.prisma.hotel.count(),
      this.prisma.hotel.count({ where: { isActive: true } }),
      this.prisma.experience.count(),
      this.prisma.experience.count({ where: { isActive: true } }),
      this.prisma.package.count(),
      this.prisma.package.count({ where: { isActive: true } }),
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
      catalog: {
        destinations: { total: destinations, active: activeDestinations },
        hotels: { total: hotels, active: activeHotels },
        experiences: { total: experiences, active: activeExperiences },
        packages: { total: packages, active: activePackages },
      },
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
  experiences(auth?: string) {
    this.verify(auth);
    return this.prisma.experience.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }
  createExperience(auth: string | undefined, dto: AdminExperienceDto) {
    this.verify(auth);
    return this.prisma.experience.create({
      data: {
        ...dto,
        description: dto.description || null,
        city: dto.city || null,
        priceFrom: dto.priceFrom ?? null,
        currency: (dto.currency || 'EUR').toUpperCase(),
      },
    });
  }
  updateExperience(
    auth: string | undefined,
    id: string,
    dto: AdminExperienceDto,
  ) {
    this.verify(auth);
    return this.prisma.experience.update({
      where: { id },
      data: {
        ...dto,
        description: dto.description || null,
        city: dto.city || null,
        priceFrom: dto.priceFrom ?? null,
        currency: (dto.currency || 'EUR').toUpperCase(),
      },
    });
  }
  packages(auth?: string) {
    this.verify(auth);
    return this.prisma.package.findMany({ orderBy: { updatedAt: 'desc' } });
  }
  createPackage(auth: string | undefined, dto: AdminPackageDto) {
    this.verify(auth);
    return this.prisma.package.create({
      data: { ...dto, description: dto.description || null },
    });
  }
  updatePackage(auth: string | undefined, id: string, dto: AdminPackageDto) {
    this.verify(auth);
    return this.prisma.package.update({
      where: { id },
      data: { ...dto, description: dto.description || null },
    });
  }
  destinations(auth?: string) {
    this.verify(auth);
    return this.prisma.destination.findMany({
      include: { municipality: { include: { province: true } } },
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    });
  }
  municipalities(auth?: string) {
    this.verify(auth);
    return this.prisma.municipality.findMany({
      include: { province: true },
      orderBy: { name: 'asc' },
    });
  }
  async bootstrapGeography(auth?: string) {
    this.verify(auth);
    const provinces = [
      ['Agrigento', 'AG', 'agrigento'],
      ['Caltanissetta', 'CL', 'caltanissetta'],
      ['Catania', 'CT', 'catania'],
      ['Enna', 'EN', 'enna'],
      ['Messina', 'ME', 'messina'],
      ['Palermo', 'PA', 'palermo'],
      ['Ragusa', 'RG', 'ragusa'],
      ['Siracusa', 'SR', 'siracusa'],
      ['Trapani', 'TP', 'trapani'],
    ] as const;
    const municipalities = [
      ['084001', 'Agrigento', 'agrigento', 'AG'],
      ['087015', 'Catania', 'catania', 'CT'],
      ['082027', 'Cefalù', 'cefalu', 'PA'],
      ['081005', 'Castellammare del Golfo', 'castellammare-del-golfo', 'TP'],
      ['081008', 'Erice', 'erice', 'TP'],
      ['081009', 'Favignana', 'favignana', 'TP'],
      ['083041', 'Lipari', 'lipari', 'ME'],
      ['081011', 'Marsala', 'marsala', 'TP'],
      ['081012', 'Mazara del Vallo', 'mazara-del-vallo', 'TP'],
      ['089013', 'Noto', 'noto', 'SR'],
      ['082053', 'Palermo', 'palermo', 'PA'],
      ['088009', 'Ragusa', 'ragusa', 'RG'],
      ['081020', 'San Vito Lo Capo', 'san-vito-lo-capo', 'TP'],
      ['089017', 'Siracusa', 'siracusa', 'SR'],
      ['083097', 'Taormina', 'taormina', 'ME'],
      ['081021', 'Trapani', 'trapani', 'TP'],
    ] as const;
    const result = await this.prisma.$transaction(async (database) => {
      const region = await database.region.upsert({
        where: { code: '19' },
        update: { name: 'Sicilia', slug: 'sicilia' },
        create: { name: 'Sicilia', slug: 'sicilia', code: '19' },
      });
      const provinceIds = new Map<string, string>();
      for (const [name, code, slug] of provinces) {
        const province = await database.province.upsert({
          where: { slug },
          update: { name, code, regionId: region.id },
          create: { name, code, slug, regionId: region.id },
        });
        provinceIds.set(code, province.id);
      }
      for (const [istatCode, name, slug, provinceCode] of municipalities) {
        await database.municipality.upsert({
          where: { istatCode },
          update: {
            name,
            slug,
            provinceId: provinceIds.get(provinceCode)!,
          },
          create: {
            istatCode,
            name,
            slug,
            provinceId: provinceIds.get(provinceCode)!,
          },
        });
      }
      return {
        provinces: provinces.length,
        municipalities: municipalities.length,
      };
    });
    return { ok: true, ...result };
  }
  createDestination(auth: string | undefined, dto: AdminDestinationDto) {
    this.verify(auth);
    return this.prisma.destination.create({ data: this.destinationData(dto) });
  }
  updateDestination(
    auth: string | undefined,
    id: string,
    dto: AdminDestinationDto,
  ) {
    this.verify(auth);
    return this.prisma.destination.update({
      where: { id },
      data: this.destinationData(dto),
    });
  }
  private destinationData(dto: AdminDestinationDto) {
    return {
      ...dto,
      shortDescription: dto.shortDescription || null,
      description: dto.description || null,
      latitude: dto.latitude ?? null,
      longitude: dto.longitude ?? null,
      seoTitle: dto.seoTitle || null,
      seoDescription: dto.seoDescription || null,
      coverImage: dto.coverImage || null,
    };
  }
  hotels(auth?: string) {
    this.verify(auth);
    return this.prisma.hotel.findMany({
      include: { destination: true, municipality: true },
      orderBy: { updatedAt: 'desc' },
      take: 300,
    });
  }
  createHotel(auth: string | undefined, dto: AdminHotelDto) {
    this.verify(auth);
    return this.prisma.hotel.create({ data: this.hotelData(dto) });
  }
  updateHotel(auth: string | undefined, id: string, dto: AdminHotelDto) {
    this.verify(auth);
    return this.prisma.hotel.update({
      where: { id },
      data: this.hotelData(dto),
    });
  }
  private hotelData(dto: AdminHotelDto) {
    return {
      ...dto,
      municipalityId: dto.municipalityId || null,
      shortDescription: dto.shortDescription || null,
      longDescription: dto.longDescription || null,
      address: dto.address || null,
      latitude: dto.latitude ?? null,
      longitude: dto.longitude ?? null,
      starRating: dto.starRating ?? null,
      mainImageUrl: dto.mainImageUrl || null,
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
