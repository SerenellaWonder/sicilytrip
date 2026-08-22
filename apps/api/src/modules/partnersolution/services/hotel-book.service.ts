import { Injectable } from '@nestjs/common';

import { PartnerSolutionClient } from '../client/partnersolution.client';

@Injectable()
export class PartnerSolutionHotelBookService {
  constructor(private readonly client: PartnerSolutionClient) {}

  async book(request: unknown) {
    return this.client.post('/api/HotelBook', request);
  }
}
