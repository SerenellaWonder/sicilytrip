import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { HotelSearchRepository } from '../repositories/hotel-search.repository';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';

import { PartnerSolutionHotelRoomsService }
from '../../partnersolution/services/hotel-rooms.service';

@Injectable()
export class HotelRoomsService {

  constructor(
    private readonly provider:
      PartnerSolutionHotelRoomsService,

    private readonly hotelSearchRepository:
      HotelSearchRepository,

    private readonly hotelSearchResultRepository:
      HotelSearchResultRepository,
  ) {}

  async rooms(
    searchId: string,
    hotelId: string,
  ) {

    //
    // 1. Recupero ricerca interna
    //
    const search =
      await this.hotelSearchRepository.findById(
        searchId,
      );

    if (!search) {
      throw new NotFoundException(
        'Ricerca non trovata',
      );
    }

    //
    // 2. Recupero hotel dai risultati
    //
    const results =
      await this.hotelSearchResultRepository.findBySearchId(
        searchId,
      );

    const hotel =
      results.find(
        result =>
          result.providerHotelId === hotelId,
      );

    if (!hotel) {
      throw new NotFoundException(
        'Hotel non trovato nei risultati della ricerca',
      );
    }

    //
    // 3. Recupero GiataID
    //
    const payload =
      hotel.payload as Record<
        string,
        unknown
      >;

    const giataId =
      payload?.GiataID != null
        ? String(payload.GiataID)
        : undefined;

    if (!giataId) {
      throw new NotFoundException(
        'GiataID non disponibile per questo hotel',
      );
    }

    //
    // 4. Chiamata PartnerSolution
    //
    return this.provider.rooms(
      search.providerSearchId,
      giataId,
    );

  }

}