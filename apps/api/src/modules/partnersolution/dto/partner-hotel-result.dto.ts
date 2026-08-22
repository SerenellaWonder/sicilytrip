export interface PartnerHotelResultDto {
  ID?: string;

  HotelId?: string;

  Name?: string;

  HotelName?: string;

  Supplier?: string;

  SupplierName?: string;

  Category?: number;

  Stars?: number;

  PriceFrom?: number;

  Price?: number;

  Currency?: string;

  Image?: string;

  Thumbnail?: string;

  Description?: string;

  Address?: string;

  City?: string;

  Region?: string;

  Country?: string;

  Latitude?: number;

  Longitude?: number;

  Images?: string[];

  Amenities?: string[];

  Rating?: number;

  ReviewCount?: number;

  GiataID?: string | number;

  Lat?: string | number;

  Lon?: string | number;

  Zone?: string;

  BaseRoom?: string;

  BaseBoard?: string;

  BasePolicy?: string;
}
