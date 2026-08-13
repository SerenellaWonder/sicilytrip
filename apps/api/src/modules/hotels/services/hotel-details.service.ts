import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { HotelDetailRepository } from '../repositories/hotel-detail.repository';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';

import { PartnerSolutionHotelDetailsService } from '../../partnersolution/services/hotel-details.service';

@Injectable()
export class HotelDetailsService {

  constructor(
    private readonly hotelDetailRepository: HotelDetailRepository,
    private readonly hotelSearchRepository: HotelSearchRepository,
    private readonly provider: PartnerSolutionHotelDetailsService,
  ) {}

  async details(
    searchId: string,
    hotelId: string,
  ) {

    //
    // 1. CACHE
    //
    const cached =
      await this.hotelDetailRepository.findByProviderHotelId(
        hotelId,
      );

    if (cached) {
      return cached;
    }

    //
    // 2. Recupero ProviderSearchId
    //
    const providerSearch =
      await this.hotelSearchRepository.findById(
        searchId,
      );

    if (!providerSearch) {
      throw new NotFoundException(
        'Ricerca non trovata',
      );
    }

    //
    // 3. Chiamata Partner Solution
    //
    const detail =
      await this.provider.details(
        providerSearch.providerSearchId,
        hotelId,
      );

    //
    // 4. Salvataggio nel DB
    //
    await this.hotelDetailRepository.save({

      provider: 'PartnerSolution',

      providerHotelId: hotelId,

      name: detail.Name ?? '',

      stars: detail.Stars,

      category: detail.Category,

      zone: detail.Zone,

      latitude:
        detail.Lat
          ? Number(detail.Lat)
          : undefined,

      longitude:
        detail.Lon
          ? Number(detail.Lon)
          : undefined,

      address: detail.Address,

      photoGallery:
        (detail.PhotoGallery ??
          []) as unknown as Prisma.InputJsonValue,

      descriptions:
        (detail.Descriptions ??
          []) as unknown as Prisma.InputJsonValue,

      facilities:
        (detail.Facilities ??
          []) as unknown as Prisma.InputJsonValue,

      payload:
        detail as unknown as Prisma.InputJsonValue,

    });

    //
    // 5. Restituisco il dettaglio
    //
    return detail;

  }

}