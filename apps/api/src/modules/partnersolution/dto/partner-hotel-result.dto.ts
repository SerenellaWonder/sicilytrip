export interface PartnerHotelResultDto {

  ID: string;

  Name: string;

  Supplier?: string;

  Category?: number;

  PriceFrom?: number;

  Currency?: string;

  Image?: string;

  Latitude?: number;

  Longitude?: number;

  [key: string]: any;

}