import { HotelSearchResult } from '@prisma/client';

import { HotelSearchResultDto } from '../dto/hotel-search-result.dto';
import { PartnerHotelResultDto } from '../../partnersolution/dto/partner-hotel-result.dto';

export class HotelSearchResultMapper {
  static toDto(hotel: HotelSearchResult): HotelSearchResultDto {
    const payload = hotel.payload as unknown as PartnerHotelResultDto;

    return {
      hotelId: hotel.providerHotelId,

      giataId: payload.GiataID != null ? String(payload.GiataID) : undefined,

      name: hotel.hotelName,

      stars: hotel.stars ?? undefined,

      price: hotel.price ? Number(hotel.price) : undefined,

      currency: hotel.currency ?? undefined,

      supplier: hotel.supplier ?? undefined,

      latitude: payload.Lat ? Number(payload.Lat) : undefined,

      longitude: payload.Lon ? Number(payload.Lon) : undefined,

      image: payload.Image,

      zone: payload.Zone,

      room: payload.BaseRoom,

      board: payload.BaseBoard,

      policy: payload.BasePolicy,
    };
  }
}
