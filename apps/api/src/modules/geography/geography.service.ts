import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GeographyService {
  constructor(private readonly prisma: PrismaService) {}

  findAllRegions() {
    return this.prisma.region.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  findRegion(id: string) {
    return this.prisma.region.findUnique({
      where: { id },
      include: {
        provinces: true,
      },
    });
  }
}
