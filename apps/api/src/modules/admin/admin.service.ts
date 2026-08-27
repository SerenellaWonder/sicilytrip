import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../../prisma/prisma.service';
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
