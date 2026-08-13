import { Injectable } from '@nestjs/common';

import { PartnerSolutionHotelRoomsService }
from '../../partnersolution/services/hotel-rooms.service';

@Injectable()
export class HotelRoomsService {

  constructor(
    private readonly provider:
      PartnerSolutionHotelRoomsService,
  ) {}

  async rooms(
    hotelId: string,
  ) {

    return this.provider.rooms(
      hotelId,
    );

  }

}