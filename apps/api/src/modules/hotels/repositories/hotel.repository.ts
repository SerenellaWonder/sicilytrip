import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

import { Hotel } from '../models/hotel.model';

@Injectable()
export class HotelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.hotel.findUnique({
      where: {
        id,
      },
    });
  }

  async findByProviderHotelId(provider: string, providerHotelId: string) {
    return this.prisma.hotel.findFirst({
      where: {
        apiMappings: {
          some: {
            provider,

            providerHotelId,
          },
        },
      },
    });
  }

  async save(hotel: Hotel) {
    return this.prisma.hotel.create({
      data: {
        slug: hotel.name.toLowerCase().replace(/\s+/g, '-'),

        name: hotel.name,

        destinationId: '',

        country: hotel.country,

        address: hotel.address,

        latitude: hotel.latitude,

        longitude: hotel.longitude,

        starRating: hotel.stars,

        shortDescription: hotel.description,

        mainImageUrl: hotel.thumbnail,
      },
    });
  }
}
