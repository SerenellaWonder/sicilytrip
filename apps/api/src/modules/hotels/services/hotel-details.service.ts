import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { HotelDetailRepository } from '../repositories/hotel-detail.repository';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';

import { PartnerSolutionHotelDetailsService } from '../../partnersolution/services/hotel-details.service';
import { getHotelPayloadString } from '../utils/hotel-payload';

@Injectable()
export class HotelDetailsService {
  constructor(
    private readonly hotelDetailRepository: HotelDetailRepository,
    private readonly hotelSearchRepository: HotelSearchRepository,
    private readonly hotelSearchResultRepository: HotelSearchResultRepository,
    private readonly provider: PartnerSolutionHotelDetailsService,
  ) {}

  async details(searchId: string, hotelId: string) {
    //
    // 1. CACHE
    //
    const cached =
      await this.hotelDetailRepository.findByProviderHotelId(hotelId);

    if (cached) {
      if (hasImages(cached.photoGallery)) {
        return cached;
      }

      const cachedSearchResults =
        await this.hotelSearchResultRepository.findBySearchId(searchId);

      const cachedHotelResult = cachedSearchResults.find(
        (result) => result.providerHotelId === hotelId,
      );

      const cachedPayload = cachedHotelResult?.payload as Record<
        string,
        unknown
      >;

      const cachedImage = getHotelPayloadString(cachedPayload?.Image);

      return cachedImage ? { ...cached, photoGallery: [cachedImage] } : cached;
    }

    //
    // 2. Recupero ricerca
    //
    const providerSearch = await this.hotelSearchRepository.findById(searchId);

    if (!providerSearch) {
      throw new NotFoundException('Ricerca non trovata');
    }

    //
    // 3. Recupero risultato hotel della ricerca
    //
    const searchResults =
      await this.hotelSearchResultRepository.findBySearchId(searchId);

    const hotelResult = searchResults.find(
      (result) => result.providerHotelId === hotelId,
    );

    if (!hotelResult) {
      throw new NotFoundException(
        'Hotel non trovato nei risultati della ricerca',
      );
    }

    //
    // 4. Recupero GiataID dal payload originale
    //
    const payload = hotelResult.payload as Record<string, unknown>;

    const giataId = getHotelPayloadString(payload.GiataID);

    if (!giataId) {
      throw new NotFoundException('GiataID non disponibile per questo hotel');
    }

    //
    // 5. Chiamata Partner Solution
    //
    const detail = await this.provider.details(
      providerSearch.providerSearchId,
      giataId,
    );

    const searchImage = getHotelPayloadString(payload.Image);
    const photoGallery = hasImages(detail.PhotoGallery)
      ? detail.PhotoGallery
      : searchImage
        ? [searchImage]
        : [];

    const detailWithGallery = {
      ...detail,
      PhotoGallery: photoGallery,
    };

    //
    // 6. Salvataggio nel DB
    //
    await this.hotelDetailRepository.save({
      provider: 'PartnerSolution',

      providerHotelId: hotelId,

      name: detail.Name ?? '',

      stars: detail.Stars,

      category: detail.Category,

      zone: detail.Zone,

      latitude: detail.Lat ? Number(detail.Lat) : undefined,

      longitude: detail.Lon ? Number(detail.Lon) : undefined,

      address: detail.Address,

      photoGallery,

      descriptions: (detail.Descriptions ??
        []) as unknown as Prisma.InputJsonValue,

      facilities: detail.Facilities ?? [],

      payload: detailWithGallery as unknown as Prisma.InputJsonValue,
    });

    //
    // 7. Restituzione dettaglio
    //
    return detailWithGallery;
  }
}

function hasImages(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.some((image) => typeof image === 'string' && image.trim().length > 0)
  );
}
