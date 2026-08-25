import {
  ConflictException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProviderBookingStatus } from '@prisma/client';

import { PartnerSolutionHotelBookService } from '../../partnersolution/services/hotel-book.service';
import { CustomerIdentityService } from '../../customer-area/customer-identity.service';

import { HotelBookDto } from '../dto/hotel-book.dto';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';
import { ProviderBookingAttemptRepository } from '../repositories/provider-booking-attempt.repository';
import { getHotelPayloadString } from '../utils/hotel-payload';

const SEARCH_TTL_MS = 20 * 60 * 1000;

@Injectable()
export class HotelBookService {
  constructor(
    private readonly provider: PartnerSolutionHotelBookService,
    private readonly hotelSearchRepository: HotelSearchRepository,
    private readonly hotelSearchResultRepository: HotelSearchResultRepository,
    private readonly bookingAttemptRepository: ProviderBookingAttemptRepository,
    private readonly customerIdentity: CustomerIdentityService,
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

    const attempt = await this.bookingAttemptRepository.createPending({
      hotelSearchId: search.id,
      providerSearchId: search.providerSearchId,
      providerHotelId: dto.hotelId,
      giataId,
      roomId: dto.rateId,
      customerEmailHash: this.customerIdentity.hashEmail(dto.customerEmail),
    });

    if (!attempt) {
      throw new ConflictException(
        'Questa prenotazione è già stata inviata. Non ripetere la richiesta: verifica l’esito con il fornitore.',
      );
    }

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

      await this.bookingAttemptRepository.updateResult(
        attempt.id,
        providerResponse.RefCode && !providerResponse.Error
          ? ProviderBookingStatus.CONFIRMED
          : ProviderBookingStatus.FAILED,
        providerResponse.RefCode,
        providerResponse.Error,
      );

      return response;
    } catch (error) {
      // Un errore di trasporto non prova che la pratica non sia stata creata.
      await this.bookingAttemptRepository.updateResult(
        attempt.id,
        ProviderBookingStatus.UNCERTAIN,
        undefined,
        error instanceof Error ? error.message : 'Unknown provider error',
      );
      throw error;
    }
  }
}
