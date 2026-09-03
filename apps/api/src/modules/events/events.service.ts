import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.tourismEvent.findMany({
      where: {
        isPublished: true,
        OR: [
          { endAt: { gte: new Date() } },
          { endAt: null, startAt: { gte: new Date() } },
        ],
      },
      orderBy: [{ isFeatured: 'desc' }, { startAt: 'asc' }],
      take: 24,
    });
  }
}
