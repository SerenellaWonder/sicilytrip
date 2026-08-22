import { Injectable } from '@nestjs/common';
import { HotelSearchStatus, Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

interface CreateHotelSearchInput {
  provider: string;
  providerSearchId: string;
  destinationId?: string;
  checkIn: Date;
  checkOut: Date;
  rooms: Prisma.InputJsonValue;
}

@Injectable()
export class HotelSearchRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateHotelSearchInput) {
    return this.prisma.hotelSearch.create({
      data: {
        provider: input.provider,

        providerSearchId: input.providerSearchId,

        destinationId: input.destinationId,

        checkIn: input.checkIn,

        checkOut: input.checkOut,

        rooms: input.rooms,

        status: HotelSearchStatus.PENDING,
      },
    });
  }

  findById(id: string) {
    return this.prisma.hotelSearch.findUnique({
      where: {
        id,
      },

      include: {
        destination: true,
        results: true,
      },
    });
  }

  findByProviderSearchId(providerSearchId: string) {
    return this.prisma.hotelSearch.findUnique({
      where: {
        providerSearchId,
      },

      include: {
        destination: true,
        results: true,
      },
    });
  }

  async getProviderSearchId(searchId: string): Promise<string> {
    const search = await this.prisma.hotelSearch.findUnique({
      where: {
        id: searchId,
      },

      select: {
        providerSearchId: true,
      },
    });

    if (!search) {
      throw new Error(`Search ${searchId} non trovata`);
    }

    return search.providerSearchId;
  }

  updateStatus(id: string, status: HotelSearchStatus) {
    return this.prisma.hotelSearch.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });
  }
}
