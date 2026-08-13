import { HotelSearchResult } from '@prisma/client';

import { HotelSearchResultDto } from '../dto/hotel-search-result.dto';

export class HotelSearchResultMapper {

  static toDto(
    hotel: HotelSearchResult,
  ): HotelSearchResultDto {

    const payload = hotel.payload as any;

    return {

      hotelId: hotel.providerHotelId,

      name: hotel.hotelName,

      stars: hotel.stars ?? undefined,

      price: hotel.price
        ? Number(hotel.price)
        : undefined,

      currency: hotel.currency ?? undefined,

      supplier: hotel.supplier ?? undefined,

      latitude: payload?.Lat
        ? Number(payload.Lat)
        : undefined,

      longitude: payload?.Lon
        ? Number(payload.Lon)
        : undefined,

      image: payload?.Image,

      zone: payload?.Zone,

    };

  }

}