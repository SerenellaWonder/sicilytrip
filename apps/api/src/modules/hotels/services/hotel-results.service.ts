import { Injectable } from '@nestjs/common';

import { PartnerSolutionHotelResultsService } from '../../partnersolution/services/hotel-results.service';

@Injectable()
export class HotelResultsService {
  constructor(private readonly provider: PartnerSolutionHotelResultsService) {}

  async getResults(searchId: string) {
    return this.provider.getResults(searchId);
  }
}
