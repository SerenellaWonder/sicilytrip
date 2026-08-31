import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';

@Injectable()
export class ContactsService {
  private readonly attempts = new Map<string, number[]>();

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactRequestDto, clientId: string) {
    if (dto.website) return { ok: true };
    this.checkRate(clientId);
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    await this.prisma.contactRequest.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        subject: dto.subject.trim(),
        message: dto.message.trim(),
        consentAt: new Date(),
        expiresAt,
      },
    });
    return { ok: true };
  }

  private checkRate(clientId: string) {
    const now = Date.now();
    const recent = (this.attempts.get(clientId) ?? []).filter(
      (value) => now - value < 60 * 60 * 1000,
    );
    if (recent.length >= 5)
      throw new HttpException(
        'Hai inviato troppe richieste. Riprova più tardi.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    recent.push(now);
    this.attempts.set(clientId, recent);
  }
}
