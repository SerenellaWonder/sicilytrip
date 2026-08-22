import { Injectable } from '@nestjs/common';

import { PartnerSolutionClient } from '../client/partnersolution.client';

import { PartnerHotelSearchDto } from '../dto/partner-hotel-search.dto';
import { PartnerSearchResponseDto } from '../dto/partner-search-response.dto';

@Injectable()
export class PartnerSolutionHotelService {
  constructor(private readonly client: PartnerSolutionClient) {}

  async suppliers() {
    return this.client.get('/api/Suppliers');
  }

  async search(
    request: PartnerHotelSearchDto,
  ): Promise<PartnerSearchResponseDto> {
    return this.client.post<PartnerSearchResponseDto>(
      '/api/HotelSearch',
      request,
    );
  }
}
