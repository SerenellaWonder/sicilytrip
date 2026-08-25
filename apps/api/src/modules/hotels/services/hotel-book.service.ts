import {
  ConflictException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PartnerSolutionHotelBookService } from '../../partnersolution/services/hotel-book.service';

import { HotelBookDto } from '../dto/hotel-book.dto';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';
import { getHotelPayloadString } from '../utils/hotel-payload';

const SEARCH_TTL_MS = 20 * 60 * 1000;

type BookingAttempt = 'PENDING' | 'COMPLETED' | 'FAILED' | 'UNCERTAIN';

@Injectable()
export class HotelBookService {
  private readonly attempts = new Map<string, BookingAttempt>();

  constructor(
    private readonly provider: PartnerSolutionHotelBookService,
    private readonly hotelSearchRepository: HotelSearchRepository,
    private readonly hotelSearchResultRepository: HotelSearchResultRepository,
  ) {}

  async book(dto: HotelBookDto) {
    const search = await this.hotelSearchRepository.findById(dto.searchId);

    if (!search) {
      throw new NotFoundException('Ricerca non trovata');
    }

    if (Date.now() - search.createdAt.getTime() >= SEARCH_TTL_MS) {
      throw new GoneException(
        'La ricerca è scaduta. Effettua una nuova ricerca prima di prenotare.',
      );
    }

    const hotel = await this.hotelSearchResultRepository
      .findBySearchId(dto.searchId)
      .then((results) =>
        results.find((result) => result.providerHotelId === dto.hotelId),
      );

    if (!hotel) {
      throw new NotFoundException(
        'Hotel non trovato nei risultati della ricerca',
      );
    }

    const payload = hotel.payload as Record<string, unknown>;
    const giataId = getHotelPayloadString(payload.GiataID);

    if (!giataId) {
      throw new NotFoundException('GiataId non disponibile per questo hotel');
    }

    const attemptKey = `${search.providerSearchId}:${giataId}:${dto.rateId}`;

    if (this.attempts.has(attemptKey)) {
      throw new ConflictException(
        'Questa prenotazione è già stata inviata. Non ripetere la richiesta: verifica l’esito con il fornitore.',
      );
    }

    this.attempts.set(attemptKey, 'PENDING');

    try {
      const response = await this.provider.book({
        Names: dto.Names,
        PurchaseToken: dto.PurchaseToken,
        Spui: dto.Spui,
        OriginalCurrency: dto.OriginalCurrency,
        DeadlineDate: dto.DeadlineDate,
        SearchId: search.providerSearchId,
        GiataId: giataId,
        RoomId: dto.rateId,
      });

      const providerResponse = response as {
        Error?: string;
        RefCode?: string;
      };

      this.attempts.set(
        attemptKey,
        providerResponse.RefCode && !providerResponse.Error
          ? 'COMPLETED'
          : 'FAILED',
      );

      return response;
    } catch (error) {
      // Un errore di trasporto non prova che la pratica non sia stata creata.
      this.attempts.set(attemptKey, 'UNCERTAIN');
      throw error;
    }
  }
}
