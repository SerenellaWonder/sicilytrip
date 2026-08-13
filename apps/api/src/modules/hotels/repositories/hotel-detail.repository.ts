import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

interface CreateHotelDetailInput {

  provider: string;

  providerHotelId: string;

  name: string;

  stars?: number;

  category?: string;

  zone?: string;

  latitude?: number;

  longitude?: number;

  address?: string;

  photoGallery: Prisma.InputJsonValue;

  descriptions: Prisma.InputJsonValue;

  facilities: Prisma.InputJsonValue;

  payload: Prisma.InputJsonValue;

}

@Injectable()
export class HotelDetailRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findByProviderHotelId(
    providerHotelId: string,
  ) {

    return this.prisma.hotelDetail.findUnique({

      where: {
        providerHotelId,
      },

    });

  }

  save(
    input: CreateHotelDetailInput,
  ) {

    return this.prisma.hotelDetail.upsert({

      where: {
        providerHotelId:
          input.providerHotelId,
      },

      create: input,

      update: input,

    });

  }

}