export class PartnerRoomDto {
  Adults!: number;
  Children!: number;

  Age1!: number;
  Age2!: number;
  Age3!: number;
}

export class PartnerHotelSearchDto {
  PlaceId?: string;

  GiataId?: string;

  NorthEast?: string;

  SouthWest?: string;

  CheckIn!: string;

  CheckOut!: string;

  Rooms!: PartnerRoomDto[];

  Suppliers!: string[];
}