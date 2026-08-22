import { Injectable } from '@nestjs/common';

import { HotelSearchResultMapper } from '../mappers/hotel-search-result.mapper';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';

@Injectable()
export class HotelSearchResultsService {
  constructor(private readonly repository: HotelSearchResultRepository) {}

  async findBySearchId(searchId: string) {
    const hotels = await this.repository.findBySearchId(searchId);

    return {
      searchId,

      total: hotels.length,

      hotels: hotels.map((hotel) => HotelSearchResultMapper.toDto(hotel)),
    };
  }
}
