import {
  BadRequestException,
  ConflictException,
  GoneException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ProviderBookingStatus } from '@prisma/client';

import { PartnerSolutionHotelBookService } from '../../partnersolution/services/hotel-book.service';
import { CustomerEmailService } from '../../customer-area/customer-email.service';
import { CustomerIdentityService } from '../../customer-area/customer-identity.service';

import { HotelBookDto } from '../dto/hotel-book.dto';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';
import { ProviderBookingAttemptRepository } from '../repositories/provider-booking-attempt.repository';
import { HotelPreBookSnapshotRepository } from '../repositories/hotel-prebook-snapshot.repository';
import { getHotelPayloadString } from '../utils/hotel-payload';

const SEARCH_TTL_MS = 20 * 60 * 1000;

@Injectable()
export class HotelBookService {
  private readonly logger = new Logger(HotelBookService.name);

  constructor(
    private readonly provider: PartnerSolutionHotelBookService,
    private readonly hotelSearchRepository: HotelSearchRepository,
    private readonly hotelSearchResultRepository: HotelSearchResultRepository,
    private readonly bookingAttemptRepository: ProviderBookingAttemptRepository,
    private readonly customerIdentity: CustomerIdentityService,
    private readonly customerEmail: CustomerEmailService,
    private readonly preBookSnapshotRepository: HotelPreBookSnapshotRepository,
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

    this.validateGuestRooms(dto, search.rooms);

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

    const preBook = await this.preBookSnapshotRepository.findValid({
      id: dto.preBookId,
      hotelSearchId: search.id,
      providerHotelId: dto.hotelId,
      roomId: dto.rateId,
    });

    if (!preBook) {
      throw new GoneException(
        'La riconferma della tariffa non è più valida. Riconferma prezzo e disponibilità prima di prenotare.',
      );
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

    let response: unknown;

    try {
      response = await this.provider.book({
        Names: dto.Names,
        PurchaseToken: preBook.purchaseToken,
        Spui: preBook.spui,
        OriginalCurrency: preBook.originalCurrency,
        DeadlineDate: preBook.deadlineDate,
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

    const providerResponse = response as {
      Error?: string;
      RefCode?: string;
    };

    if (providerResponse.RefCode && !providerResponse.Error) {
      await this.sendConfirmationEmailSafely({
        referenceCode: providerResponse.RefCode,
        hotelName: hotel.hotelName,
        checkIn: search.checkIn,
        checkOut: search.checkOut,
      });
    }

    return response;
  }

  private async sendConfirmationEmailSafely(input: {
    referenceCode: string;
    hotelName: string;
    checkIn: Date;
    checkOut: Date;
  }) {
    if (!this.customerEmail.isConfigured()) {
      return;
    }

    try {
      await this.customerEmail.sendBookingConfirmation(input);
    } catch {
      // L'email è accessoria: non deve modificare l'esito né ripetere il Book.
      this.logger.warn(
        `Invio email di conferma non riuscito per la pratica ${input.referenceCode}`,
      );
    }
  }

  private validateGuestRooms(dto: HotelBookDto, searchRooms: unknown) {
    const expectedRooms = Array.isArray(searchRooms) ? searchRooms.length : 0;

    if (!expectedRooms || dto.Names.length !== expectedRooms) {
      throw new BadRequestException(
        'La composizione delle camere non corrisponde alla ricerca.',
      );
    }

    let expectedAbsoluteNumber = 1;

    dto.Names.forEach((room, roomIndex) => {
      if (room.Cam !== roomIndex + 1) {
        throw new BadRequestException('Numerazione delle camere non valida.');
      }

      const relativeNumbers = { Adult: 1, Child: 1 };

      room.Paxes.forEach((pax) => {
        const type = pax.Type as 'Adult' | 'Child';
        if (
          pax.AbosultePaxNumber !== expectedAbsoluteNumber ||
          pax.RelativePaxNumber !== relativeNumbers[type]
        ) {
          throw new BadRequestException('Numerazione degli ospiti non valida.');
        }

        expectedAbsoluteNumber += 1;
        relativeNumbers[type] += 1;
      });
    });
  }
}
