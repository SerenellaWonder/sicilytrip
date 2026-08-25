import { Injectable } from '@nestjs/common';
import { Prisma, ProviderBookingStatus } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

type CreateAttemptInput = {
  hotelSearchId: string;
  providerSearchId: string;
  providerHotelId: string;
  giataId: string;
  roomId: string;
};

@Injectable()
export class ProviderBookingAttemptRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPending(input: CreateAttemptInput) {
    try {
      return await this.prisma.providerBookingAttempt.create({
        data: input,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return null;
      }

      throw error;
    }
  }

  updateResult(
    id: string,
    status: ProviderBookingStatus,
    referenceCode?: string,
    providerError?: string,
  ) {
    return this.prisma.providerBookingAttempt.update({
      where: { id },
      data: {
        status,
        referenceCode: referenceCode || null,
        providerError: providerError || null,
      },
    });
  }
}
