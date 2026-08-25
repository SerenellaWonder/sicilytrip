import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, randomInt } from 'node:crypto';

import { PrismaService } from '../../prisma/prisma.service';
import { CustomerEmailService } from './customer-email.service';
import { CustomerIdentityService } from './customer-identity.service';

const CODE_TTL_MS = 10 * 60 * 1000;
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const MAX_CODE_ATTEMPTS = 5;

@Injectable()
export class CustomerAreaService {
  private readonly isProduction: boolean;

  constructor(
    private readonly prisma: PrismaService,
    private readonly identity: CustomerIdentityService,
    private readonly emailService: CustomerEmailService,
    config: ConfigService,
  ) {
    this.isProduction = config.get<string>('NODE_ENV') === 'production';
  }

  async requestAccess(email: string) {
    const normalizedEmail = this.identity.normalizeEmail(email);
    const emailHash = this.identity.hashEmail(normalizedEmail);
    const genericResponse = {
      message:
        'Se esistono prenotazioni associate a questa email, riceverai un codice di accesso.',
    };

    const booking = await this.prisma.providerBookingAttempt.findFirst({
      where: { customerEmailHash: emailHash },
      select: { id: true },
    });

    if (!booking) {
      return genericResponse;
    }

    const recentCode = await this.prisma.customerAccessCode.findFirst({
      where: {
        emailHash,
        createdAt: { gt: new Date(Date.now() - 60 * 1000) },
      },
    });

    if (recentCode) {
      return genericResponse;
    }

    const code = String(randomInt(100000, 1000000));

    await this.prisma.customerAccessCode.create({
      data: {
        emailHash,
        codeHash: this.identity.hash(`${emailHash}:${code}`),
        expiresAt: new Date(Date.now() + CODE_TTL_MS),
      },
    });

    if (this.emailService.isConfigured()) {
      await this.emailService.sendAccessCode(normalizedEmail, code);
    }

    return {
      ...genericResponse,
      ...(!this.isProduction && !this.emailService.isConfigured()
        ? { developmentCode: code }
        : {}),
    };
  }

  async verifyAccess(email: string, code: string) {
    const emailHash = this.identity.hashEmail(email);
    const accessCode = await this.prisma.customerAccessCode.findFirst({
      where: {
        emailHash,
        usedAt: null,
        expiresAt: { gt: new Date() },
        attempts: { lt: MAX_CODE_ATTEMPTS },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (
      !accessCode ||
      accessCode.codeHash !== this.identity.hash(`${emailHash}:${code}`)
    ) {
      if (accessCode) {
        await this.prisma.customerAccessCode.update({
          where: { id: accessCode.id },
          data: { attempts: { increment: 1 } },
        });
      }
      throw new UnauthorizedException('Codice non valido o scaduto');
    }

    const token = randomBytes(32).toString('base64url');

    await this.prisma.$transaction([
      this.prisma.customerAccessCode.update({
        where: { id: accessCode.id },
        data: { usedAt: new Date() },
      }),
      this.prisma.customerSession.create({
        data: {
          emailHash,
          tokenHash: this.identity.hash(token),
          expiresAt: new Date(Date.now() + SESSION_TTL_MS),
        },
      }),
    ]);

    return { token, expiresIn: SESSION_TTL_MS / 1000 };
  }

  async getBookings(token: string) {
    const session = await this.prisma.customerSession.findUnique({
      where: { tokenHash: this.identity.hash(token) },
    });

    if (!session || session.revokedAt || session.expiresAt <= new Date()) {
      throw new UnauthorizedException('Sessione non valida o scaduta');
    }

    const attempts = await this.prisma.providerBookingAttempt.findMany({
      where: { customerEmailHash: session.emailHash },
      include: {
        hotelSearch: {
          include: { results: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return attempts.map((attempt) => ({
      id: attempt.id,
      status: attempt.status,
      referenceCode: attempt.referenceCode,
      hotelName:
        attempt.hotelSearch.results.find(
          (hotel) => hotel.providerHotelId === attempt.providerHotelId,
        )?.hotelName ?? 'Hotel',
      checkIn: attempt.hotelSearch.checkIn,
      checkOut: attempt.hotelSearch.checkOut,
      createdAt: attempt.createdAt,
    }));
  }
}
