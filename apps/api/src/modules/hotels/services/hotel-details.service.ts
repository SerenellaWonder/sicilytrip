import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    // Refresh aggregated content daily; do not retain incomplete/error responses.
    if (
      cached &&
      cached.name &&
      Date.now() - cached.updatedAt.getTime() < 24 * 60 * 60 * 1000 &&
      !(cached.payload as Record<string, unknown>)?.Error
    ) {
      // Cached database fields and fresh provider responses share one contract.
      const payload =
        cached.payload &&
        typeof cached.payload === 'object' &&
        !Array.isArray(cached.payload)
          ? cached.payload
          : {};
      const normalized = {
        ...payload,
        Name: cached.name,
        Stars: cached.stars,
        Category: cached.category,
        Zone: cached.zone,
        Address: cached.address,
        Lat: cached.latitude == null ? undefined : String(cached.latitude),
        Lon: cached.longitude == null ? undefined : String(cached.longitude),
        PhotoGallery: cached.photoGallery,
        Descriptions: cached.descriptions,
        Facilities: cached.facilities,
      };
      if (hasImages(cached.photoGallery)) {
        return normalizeHotelContent(
          normalized as unknown as Parameters<typeof normalizeHotelContent>[0],
        );
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

      return cachedImage
        ? { ...normalized, PhotoGallery: [cachedImage] }
        : normalized;
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
    const response = await this.provider.details(
      providerSearch.providerSearchId,
      giataId,
    );

    if (response.Error || !response.Name?.trim()) {
      throw new BadGatewayException(
        'Scheda hotel temporaneamente non disponibile',
      );
    }
    const detail = normalizeHotelContent(response);

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

// Remove exact repetitions only: different descriptions and image URLs are preserved.
function normalizeHotelContent<
  T extends {
    PhotoGallery?: string[];
    Facilities?: string[];
    RoomFacilities?: string[];
    Amenities?: string[];
    Distances?: string[];
    Descriptions?: { Title: string; Description: string }[];
  },
>(detail: T): T {
  const unique = (items?: string[]) => [
    ...new Set(
      (items ?? [])
        .filter((item) => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
  const seen = new Set<string>();
  return {
    ...detail,
    PhotoGallery: unique(detail.PhotoGallery),
    Facilities: unique(detail.Facilities),
    RoomFacilities: unique(detail.RoomFacilities),
    Amenities: unique(detail.Amenities),
    Distances: unique(detail.Distances),
    Descriptions: (detail.Descriptions ?? []).filter((section) => {
      const key = JSON.stringify([section.Title, section.Description]);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }),
  };
}
