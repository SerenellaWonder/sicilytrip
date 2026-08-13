import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PartnerSolutionHotelService } from '../../partnersolution/services/hotel.services';

import { HotelSearchDto } from '../dto/hotel-search.dto';
import { HotelSearchMapper } from '../mappers/hotel-search.mapper';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';

import { SearchPollingService } from './search-polling.service';

@Injectable()
export class HotelSearchService {
  constructor(
    private readonly partnerSolution: PartnerSolutionHotelService,
    private readonly polling: SearchPollingService,
    private readonly searchRepository: HotelSearchRepository,
  ) {}

  async search(dto: HotelSearchDto) {

    const request =
      HotelSearchMapper.toPartnerSolution(dto);

    const providerResponse =
      await this.partnerSolution.search(request);

    if (!providerResponse.SearchId) {
      return providerResponse;
    }

    const storedSearch =
      await this.searchRepository.create({
        provider: 'PartnerSolution',
        providerSearchId: providerResponse.SearchId,
        checkIn: new Date(dto.checkIn),
        checkOut: new Date(dto.checkOut),
        rooms: dto.rooms as unknown as Prisma.InputJsonValue,
      });

    return this.polling.waitForResults(
      providerResponse.SearchId,
      storedSearch.id,
    );
  }
}