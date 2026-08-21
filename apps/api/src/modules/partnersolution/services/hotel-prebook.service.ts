import { Injectable } from '@nestjs/common';

import { PartnerSolutionClient } from '../client/partnersolution.client';

type PartnerHotelPreBookRequest = {
  SearchId: string;
  GiataId: string;
  RoomId: string;
};

@Injectable()
export class PartnerSolutionHotelPreBookService {

  constructor(
    private readonly client: PartnerSolutionClient,
  ) {}

  async preBook(
    request: PartnerHotelPreBookRequest,
  ) {

    return this.client.post(
      '/api/HotelPreBook',
      request,
    );

  }

}
