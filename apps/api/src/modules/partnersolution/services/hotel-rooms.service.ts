import { Injectable } from '@nestjs/common';

import { PartnerSolutionClient } from '../client/partnersolution.client';

@Injectable()
export class PartnerSolutionHotelRoomsService {

  constructor(
    private readonly client: PartnerSolutionClient,
  ) {}

  async rooms(
    hotelId: string,
  ) {

    return this.client.get(
      `/api/HotelRooms?HotelId=${hotelId}`,
    );

  }

}