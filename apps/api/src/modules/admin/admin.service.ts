import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createHash,
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto';
import { AdminRole } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminJournalArticleDto } from './dto/admin-journal.dto';
import { AdminFaqDto } from './dto/admin-faq.dto';
import { AdminExperienceDto } from './dto/admin-experience.dto';
import { AdminPackageDto } from './dto/admin-package.dto';
import { AdminDestinationDto } from './dto/admin-destination.dto';
import { AdminHotelDto } from './dto/admin-hotel.dto';
import {
  CreateAdminOperatorDto,
  UpdateAdminOperatorDto,
} from './dto/admin-operator.dto';
import { UpdateAdminContactDto } from './dto/admin-contact.dto';
import { AdminEventDto } from './dto/admin-event.dto';
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
  async login(email: string, password: string) {
    this.configured();
    const normalizedEmail = email.trim().toLowerCase();
    let role: AdminRole = AdminRole.SUPER_ADMIN;
    let subject = 'environment-admin';
    if (
      !this.equal(normalizedEmail, this.email!) ||
      !this.equal(password, this.password!)
    ) {
      const operator = await this.prisma.adminOperator.findUnique({
        where: { email: normalizedEmail },
      });
      if (
        !operator?.isActive ||
        !this.verifyOperatorPassword(password, operator.passwordHash)
      )
        throw new UnauthorizedException('Credenziali non valide');
      role = operator.role;
      subject = operator.id;
      await this.prisma.adminOperator.update({
        where: { id: operator.id },
        data: { lastLoginAt: new Date() },
      });
    }
    const payload = Buffer.from(
      JSON.stringify({
        exp: Date.now() + 8 * 60 * 60 * 1000,
        role,
        sub: subject,
      }),
    ).toString('base64url');
    return {
      token: `${payload}.${this.sign(payload)}`,
      expiresIn: 28800,
      role,
    };
  }
  session(auth?: string) {
    const session = this.verify(auth);
    return { role: session.role };
  }
  operators(auth?: string) {
    this.verify(auth, 'super');
    return this.prisma.adminOperator.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  createOperator(auth: string | undefined, dto: CreateAdminOperatorDto) {
    this.verify(auth, 'super');
    return this.tracked('operator.created', () =>
      this.prisma.adminOperator.create({
        data: {
          email: dto.email.trim().toLowerCase(),
          passwordHash: this.hashOperatorPassword(dto.password),
          role: dto.role,
        },
      }),
    );
  }
  updateOperator(
    auth: string | undefined,
    id: string,
    dto: UpdateAdminOperatorDto,
  ) {
    this.verify(auth, 'super');
    return this.tracked('operator.updated', () =>
      this.prisma.adminOperator.update({
        where: { id },
        data: {
          role: dto.role,
          isActive: dto.isActive,
          ...(dto.password
            ? { passwordHash: this.hashOperatorPassword(dto.password) }
            : {}),
        },
      }),
    );
  }
  async contacts(auth?: string) {
    this.verify(auth, 'support');
    await this.prisma.contactRequest.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    return this.prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
    });
  }
  updateContact(
    auth: string | undefined,
    id: string,
    dto: UpdateAdminContactDto,
  ) {
    this.verify(auth, 'support');
    return this.tracked('contact.updated', () =>
      this.prisma.contactRequest.update({
        where: { id },
        data: { status: dto.status },
      }),
    );
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
  async analytics(auth?: string) {
    this.verify(auth);
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const [searchStatus, providers, recentSearches, searches, bookings] =
      await Promise.all([
        this.prisma.hotelSearch.groupBy({
          by: ['status'],
          _count: { id: true },
          orderBy: { status: 'asc' },
        }),
        this.prisma.hotelSearch.groupBy({
          by: ['provider'],
          _count: { id: true },
          orderBy: { _count: { id: 'desc' } },
        }),
        this.prisma.hotelSearch.count({ where: { createdAt: { gte: since } } }),
        this.prisma.hotelSearch.findMany({
          select: { destination: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
          take: 2000,
        }),
        this.prisma.providerBookingAttempt.count(),
      ]);
    const destinations = new Map<string, number>();
    searches.forEach((search) => {
      const name = search.destination?.name;
      if (name) destinations.set(name, (destinations.get(name) ?? 0) + 1);
    });
    const totalSearches = searchStatus.reduce(
      (sum, item) => sum + item._count.id,
      0,
    );
    return {
      totalSearches,
      recentSearches,
      bookings,
      conversionRate: totalSearches
        ? Math.round((bookings / totalSearches) * 1000) / 10
        : 0,
      searchStatus: Object.fromEntries(
        searchStatus.map((item) => [item.status, item._count.id]),
      ),
      providers: providers.map((item) => ({
        name: item.provider,
        searches: item._count.id,
      })),
      destinations: [...destinations.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
    };
  }
  activity(auth?: string) {
    this.verify(auth, 'super');
    return this.prisma.apiLog.findMany({
      where: { provider: 'ADMIN' },
      select: {
        id: true,
        endpoint: true,
        method: true,
        statusCode: true,
        requestBody: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
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
  async users(auth?: string) {
    this.verify(auth);
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        language: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { bookings: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });
    return users.map((user) => ({
      id: `Utente ${user.id.slice(-8).toUpperCase()}`,
      email: this.maskEmail(user.email),
      language: user.language || 'it',
      profileComplete: Boolean(user.firstName && user.lastName),
      bookings: user._count.bookings,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
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
    this.verify(auth, 'content');
    return this.tracked('experience.created', () =>
      this.prisma.experience.create({
        data: {
          ...dto,
          description: dto.description || null,
          city: dto.city || null,
          priceFrom: dto.priceFrom ?? null,
          currency: (dto.currency || 'EUR').toUpperCase(),
        },
      }),
    );
  }
  updateExperience(
    auth: string | undefined,
    id: string,
    dto: AdminExperienceDto,
  ) {
    this.verify(auth, 'content');
    return this.tracked('experience.updated', () =>
      this.prisma.experience.update({
        where: { id },
        data: {
          ...dto,
          description: dto.description || null,
          city: dto.city || null,
          priceFrom: dto.priceFrom ?? null,
          currency: (dto.currency || 'EUR').toUpperCase(),
        },
      }),
    );
  }
  packages(auth?: string) {
    this.verify(auth);
    return this.prisma.package.findMany({ orderBy: { updatedAt: 'desc' } });
  }
  createPackage(auth: string | undefined, dto: AdminPackageDto) {
    this.verify(auth, 'content');
    return this.tracked('package.created', () =>
      this.prisma.package.create({
        data: { ...dto, description: dto.description || null },
      }),
    );
  }
  updatePackage(auth: string | undefined, id: string, dto: AdminPackageDto) {
    this.verify(auth, 'content');
    return this.tracked('package.updated', () =>
      this.prisma.package.update({
        where: { id },
        data: { ...dto, description: dto.description || null },
      }),
    );
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
    this.verify(auth, 'content');
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
    await this.audit('geography.bootstrapped');
    return { ok: true, ...result };
  }
  createDestination(auth: string | undefined, dto: AdminDestinationDto) {
    this.verify(auth, 'content');
    return this.tracked('destination.created', () =>
      this.prisma.destination.create({ data: this.destinationData(dto) }),
    );
  }
  updateDestination(
    auth: string | undefined,
    id: string,
    dto: AdminDestinationDto,
  ) {
    this.verify(auth, 'content');
    return this.tracked('destination.updated', () =>
      this.prisma.destination.update({
        where: { id },
        data: this.destinationData(dto),
      }),
    );
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
    this.verify(auth, 'content');
    return this.tracked('hotel.created', () =>
      this.prisma.hotel.create({ data: this.hotelData(dto) }),
    );
  }
  updateHotel(auth: string | undefined, id: string, dto: AdminHotelDto) {
    this.verify(auth, 'content');
    return this.tracked('hotel.updated', () =>
      this.prisma.hotel.update({
        where: { id },
        data: this.hotelData(dto),
      }),
    );
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
  events(auth?: string) {
    this.verify(auth);
    return this.prisma.tourismEvent.findMany({
      orderBy: [{ startAt: 'asc' }, { updatedAt: 'desc' }],
    });
  }
  createEvent(auth: string | undefined, dto: AdminEventDto) {
    this.verify(auth, 'content');
    return this.tracked('event.created', () =>
      this.prisma.tourismEvent.create({ data: this.eventData(dto) }),
    );
  }
  updateEvent(auth: string | undefined, id: string, dto: AdminEventDto) {
    this.verify(auth, 'content');
    return this.tracked('event.updated', () =>
      this.prisma.tourismEvent.update({
        where: { id },
        data: this.eventData(dto),
      }),
    );
  }
  private eventData(dto: AdminEventDto) {
    return {
      ...dto,
      titleEn: dto.titleEn || null,
      description: dto.description || null,
      descriptionEn: dto.descriptionEn || null,
      endAt: dto.endAt ? new Date(dto.endAt) : null,
      image: dto.image || null,
      externalUrl: dto.externalUrl || null,
      startAt: new Date(dto.startAt),
    };
  }
  createJournalArticle(auth: string | undefined, dto: AdminJournalArticleDto) {
    this.verify(auth, 'content');
    return this.tracked('journal.created', () =>
      this.prisma.journalArticle.create({
        data: {
          ...dto,
          content: dto.content,
          publishedAt: dto.isPublished ? new Date() : null,
        },
      }),
    );
  }
  updateJournalArticle(
    auth: string | undefined,
    id: string,
    dto: AdminJournalArticleDto,
  ) {
    this.verify(auth, 'content');
    return this.tracked('journal.updated', () =>
      this.prisma.journalArticle.update({
        where: { id },
        data: {
          ...dto,
          content: dto.content,
          publishedAt: dto.isPublished ? new Date() : null,
        },
      }),
    );
  }
  faqItems(auth?: string) {
    this.verify(auth);
    return this.prisma.faqItem.findMany({
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
    });
  }
  createFaqItem(auth: string | undefined, dto: AdminFaqDto) {
    this.verify(auth, 'content');
    return this.tracked('faq.created', () =>
      this.prisma.faqItem.create({ data: dto }),
    );
  }
  updateFaqItem(auth: string | undefined, id: string, dto: AdminFaqDto) {
    this.verify(auth, 'content');
    return this.tracked('faq.updated', () =>
      this.prisma.faqItem.update({ where: { id }, data: dto }),
    );
  }
  private async tracked<T extends { id: string }>(
    action: string,
    operation: () => Promise<T>,
  ) {
    const result = await operation();
    await this.audit(action, result.id);
    return result;
  }
  private async audit(action: string, resourceId?: string) {
    try {
      await this.prisma.apiLog.create({
        data: {
          provider: 'ADMIN',
          endpoint: action,
          method: 'POST',
          statusCode: 200,
          requestBody: resourceId ? { resourceId } : undefined,
        },
      });
    } catch {
      // Il log non deve rendere inutilizzabile un'operazione già completata.
    }
  }
  private maskEmail(email: string) {
    const [local, domain] = email.split('@');
    if (!domain) return 'indirizzo protetto';
    return `${local.slice(0, 1)}***@${domain}`;
  }
  private verify(
    auth?: string,
    permission: 'all' | 'content' | 'support' | 'super' = 'all',
  ) {
    this.configured();
    const [p, s] = (auth?.startsWith('Bearer ') ? auth.slice(7) : '').split(
      '.',
    );
    if (!p || !s || !this.equal(s, this.sign(p)))
      throw new UnauthorizedException('Sessione non valida');
    let session: { exp: number; role?: AdminRole; sub?: string };
    try {
      session = JSON.parse(Buffer.from(p, 'base64url').toString()) as {
        exp: number;
        role?: AdminRole;
        sub?: string;
      };
    } catch {
      throw new UnauthorizedException('Sessione scaduta');
    }
    if (session.exp <= Date.now())
      throw new UnauthorizedException('Sessione scaduta');
    const role = session.role ?? AdminRole.SUPER_ADMIN;
    if (permission === 'super' && role !== AdminRole.SUPER_ADMIN)
      throw new UnauthorizedException('Operazione non autorizzata');
    if (
      permission === 'content' &&
      role !== AdminRole.SUPER_ADMIN &&
      role !== AdminRole.CONTENT_EDITOR
    )
      throw new UnauthorizedException('Operazione non autorizzata');
    if (
      permission === 'support' &&
      role !== AdminRole.SUPER_ADMIN &&
      role !== AdminRole.CUSTOMER_SUPPORT
    )
      throw new UnauthorizedException('Operazione non autorizzata');
    return { role, sub: session.sub };
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
  private hashOperatorPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
  }
  private verifyOperatorPassword(password: string, stored: string) {
    const [salt, expected] = stored.split(':');
    if (!salt || !expected) return false;
    const actual = scryptSync(password, salt, 64);
    const expectedBuffer = Buffer.from(expected, 'hex');
    return (
      actual.length === expectedBuffer.length &&
      timingSafeEqual(actual, expectedBuffer)
    );
  }
}
