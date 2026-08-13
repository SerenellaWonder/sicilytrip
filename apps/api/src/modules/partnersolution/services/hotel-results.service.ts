import { Injectable } from '@nestjs/common';

import { PartnerSolutionClient } from '../client/partnersolution.client';

import {
  PartnerSearchResultsResponseDto,
} from '../dto/partner-search-response.dto';

@Injectable()
export class PartnerSolutionHotelResultsService {

  constructor(
    private readonly client: PartnerSolutionClient,
  ) {}

  async getResults(
    searchId: string,
  ): Promise<PartnerSearchResultsResponseDto> {

    return this.client.get<PartnerSearchResultsResponseDto>(
      `/api/GetHotelResults?SearchId=${encodeURIComponent(
        searchId,
      )}`,
    );

  }

}