import { Injectable } from '@nestjs/common';

import { PartnerSolutionClient } from '../client/partnersolution.client';

@Injectable()
export class PartnerSolutionHotelPreBookService {

  constructor(
    private readonly client: PartnerSolutionClient,
  ) {}

  async preBook(
    request: unknown,
  ) {

    return this.client.post(
      '/api/HotelPreBook',
      request,
    );

  }

}