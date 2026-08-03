import { Injectable } from '@nestjs/common';

import { HotelSearchDto } from '../dto/hotel-search.dto';
import { PartnerSolutionClient } from '../client/partnersolution.client';

@Injectable()
export class PartnerSolutionHotelService {
  constructor(
    private readonly client: PartnerSolutionClient,
  ) {}

  async suppliers() {
    return this.client.get('/api/Suppliers');
  }

  async search(dto: HotelSearchDto) {
    return this.client.post(
      '/api/HotelSearch',
      dto,
    );
  }
}