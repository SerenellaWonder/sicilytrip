import { HotelSearchDto } from '../dto/hotel-search.dto';

export class HotelSearchMapper {
  static toPartnerSolution(dto: HotelSearchDto) {
    return {
      PlaceId: dto.placeId,

      NorthEast: dto.northEast,

      SouthWest: dto.southWest,

      CheckIn: dto.checkIn,

      CheckOut: dto.checkOut,

      Rooms: dto.rooms.map((room) => ({
        Adults: room.adults,

        Children: room.children,

        Age1: 0,

        Age2: 0,

        Age3: 0,
      })),

      Suppliers: [],
    };
  }
}
