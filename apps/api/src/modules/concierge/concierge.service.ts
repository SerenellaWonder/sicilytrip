import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConciergeProfileDto } from './dto/concierge-profile.dto';

@Injectable()
export class ConciergeService {
  constructor(private readonly prisma: PrismaService) {}

  saveProfile(dto: ConciergeProfileDto) {
    const data = {
      language: dto.language,
      destination: dto.destination,
      period: dto.period,
      guests: dto.guests,
      duration: dto.duration,
      interests: dto.interests.slice(0, 10),
    };
    return this.prisma.conciergeProfile.upsert({
      where: { sessionId: dto.sessionId },
      create: { sessionId: dto.sessionId, ...data },
      update: data,
      select: { id: true },
    });
  }
}
