import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PartnerSolutionHotelPreBookService } from '../../partnersolution/services/hotel-prebook.service';

import { HotelPreBookDto } from '../dto/hotel-prebook.dto';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';
import { HotelPreBookSnapshotRepository } from '../repositories/hotel-prebook-snapshot.repository';
import { getHotelPayloadString } from '../utils/hotel-payload';

const SEARCH_TTL_MS = 20 * 60 * 1000;

@Injectable()
export class HotelPreBookService {
  constructor(
    private readonly provider: PartnerSolutionHotelPreBookService,

    private readonly hotelSearchRepository: HotelSearchRepository,

    private readonly hotelSearchResultRepository: HotelSearchResultRepository,
    private readonly preBookSnapshotRepository: HotelPreBookSnapshotRepository,
  ) {}

  async preBook(dto: HotelPreBookDto) {
    const search = await this.hotelSearchRepository.findById(dto.searchId);

    if (!search) {
      throw new NotFoundException('Ricerca non trovata');
    }

    if (Date.now() - search.createdAt.getTime() >= SEARCH_TTL_MS) {
      throw new GoneException(
        'La ricerca è scaduta. Effettua una nuova ricerca per aggiornare disponibilità e tariffe.',
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

    const response = (await this.provider.preBook({
      SearchId: search.providerSearchId,
      GiataId: giataId,
      RoomId: dto.rateId,
    })) as Record<string, unknown>;

    if (typeof response.Error === 'string' && response.Error) {
      return response;
    }

    const snapshot = await this.preBookSnapshotRepository.save({
      hotelSearchId: search.id,
      providerHotelId: dto.hotelId,
      roomId: dto.rateId,
      purchaseToken: this.stringValue(response.PurchaseToken),
      spui: this.stringValue(response.Spui),
      originalCurrency: this.stringValue(response.OriginalCurrency),
      deadlineDate: this.stringValue(response.DeadlineDate),
      finalPrice:
        typeof response.FinalPrice === 'number'
          ? response.FinalPrice
          : undefined,
      providerResponse: response as Prisma.InputJsonValue,
      expiresAt: new Date(search.createdAt.getTime() + SEARCH_TTL_MS),
    });

    return { ...response, preBookId: snapshot.id };
  }

  private stringValue(value: unknown) {
    return typeof value === 'string' ? value : '';
  }
}
