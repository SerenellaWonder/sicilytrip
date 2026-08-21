import { Injectable } from '@nestjs/common';

import { PartnerSolutionClient } from '../client/partnersolution.client';
import { PartnerHotelDetailDto } from '../dto/partner-hotel-detail.dto';

@Injectable()
export class PartnerSolutionHotelDetailsService {

  constructor(
    private readonly client: PartnerSolutionClient,
  ) {}

  async details(
    searchId: string,
    giataId: string,
  ): Promise<PartnerHotelDetailDto> {

    return this.client.get<PartnerHotelDetailDto>(
      `/api/HotelDetails?searchid=${encodeURIComponent(
        searchId,
      )}&giataid=${encodeURIComponent(
        giataId,
      )}`,
    );

  }

}