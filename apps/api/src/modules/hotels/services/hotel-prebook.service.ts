import {
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PartnerSolutionHotelPreBookService }
from '../../partnersolution/services/hotel-prebook.service';

import { HotelPreBookDto } from '../dto/hotel-prebook.dto';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';

const SEARCH_TTL_MS = 20 * 60 * 1000;

@Injectable()
export class HotelPreBookService {

  constructor(
    private readonly provider:
      PartnerSolutionHotelPreBookService,

    private readonly hotelSearchRepository:
      HotelSearchRepository,

    private readonly hotelSearchResultRepository:
      HotelSearchResultRepository,
  ) {}

  async preBook(
    dto: HotelPreBookDto,
  ) {

    const search =
      await this.hotelSearchRepository.findById(
        dto.searchId,
      );

    if (!search) {
      throw new NotFoundException(
        'Ricerca non trovata',
      );
    }

    if (
      Date.now() -
        search.createdAt.getTime() >=
      SEARCH_TTL_MS
    ) {
      throw new GoneException(
        'La ricerca è scaduta. Effettua una nuova ricerca per aggiornare disponibilità e tariffe.',
      );
    }

    const hotel =
      await this.hotelSearchResultRepository.findBySearchId(
        dto.searchId,
      ).then(results =>
        results.find(
          result =>
            result.providerHotelId ===
            dto.hotelId,
        ),
      );

    if (!hotel) {
      throw new NotFoundException(
        'Hotel non trovato nei risultati della ricerca',
      );
    }

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
        'GiataId non disponibile per questo hotel',
      );
    }

    return this.provider.preBook(
      {
        SearchId:
          search.providerSearchId,
        GiataId: giataId,
        RoomId: dto.rateId,
      },
    );

  }

}
