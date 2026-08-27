import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

type SavePreBookInput = {
  hotelSearchId: string;
  providerHotelId: string;
  roomId: string;
  purchaseToken: string;
  spui: string;
  originalCurrency: string;
  deadlineDate: string;
  finalPrice?: number;
  providerResponse: Prisma.InputJsonValue;
  expiresAt: Date;
};

@Injectable()
export class HotelPreBookSnapshotRepository {
  constructor(private readonly prisma: PrismaService) {}

  save(input: SavePreBookInput) {
    const { hotelSearchId, roomId, ...data } = input;

    return this.prisma.hotelPreBookSnapshot.upsert({
      where: { hotelSearchId_roomId: { hotelSearchId, roomId } },
      create: { hotelSearchId, roomId, ...data },
      update: data,
    });
  }

  findValid(input: {
    id: string;
    hotelSearchId: string;
    providerHotelId: string;
    roomId: string;
  }) {
    return this.prisma.hotelPreBookSnapshot.findFirst({
      where: {
        ...input,
        expiresAt: { gt: new Date() },
      },
    });
  }

  findByIdValid(id: string) {
    return this.prisma.hotelPreBookSnapshot.findFirst({
      where: { id, expiresAt: { gt: new Date() } },
    });
  }
}
