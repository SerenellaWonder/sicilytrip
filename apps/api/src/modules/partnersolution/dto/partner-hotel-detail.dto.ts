export interface PartnerHotelDescriptionDto {
  Title: string;

  Description: string;
}

export interface PartnerHotelDetailDto {
  Error?: string;

  Stars?: number;

  Category?: string;

  Name?: string;

  Zone?: string;

  Lat?: string;

  Lon?: string;

  Address?: string;

  PhotoGallery?: string[];

  Descriptions?: PartnerHotelDescriptionDto[];

  Facilities?: string[];
}
