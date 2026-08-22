import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

interface SearchResultInput {
  provider: string;
  providerHotelId: string;
  supplier?: string;
  hotelName: string;
  stars?: number;
  price?: number;
  currency?: string;
  payload: Prisma.InputJsonValue;
}

@Injectable()
export class HotelSearchResultRepository {
  constructor(private readonly prisma: PrismaService) {}

  async replaceResults(
    hotelSearchId: string,
    results: SearchResultInput[],
  ): Promise<void> {
    await this.prisma.hotelSearchResult.deleteMany({
      where: {
        hotelSearchId,
      },
    });

    if (!results.length) {
      return;
    }

    await this.prisma.hotelSearchResult.createMany({
      data: results.map((result) => ({
        hotelSearchId,

        provider: result.provider,

        providerHotelId: result.providerHotelId,

        supplier: result.supplier,

        hotelName: result.hotelName,

        stars: result.stars,

        price: result.price != null ? new Prisma.Decimal(result.price) : null,

        currency: result.currency,

        payload: result.payload,
      })),
    });
  }

  async findBySearchId(hotelSearchId: string) {
    return this.prisma.hotelSearchResult.findMany({
      where: {
        hotelSearchId,
      },

      orderBy: {
        price: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.hotelSearchResult.findUnique({
      where: {
        id,
      },
    });
  }
}
