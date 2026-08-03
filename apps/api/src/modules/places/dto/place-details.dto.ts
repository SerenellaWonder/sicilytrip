export class PlaceDetailsDto {
  placeId!: string;
  name!: string;
  description!: string;
  latitude!: number;
  longitude!: number;

  northEast!: {
    latitude: number;
    longitude: number;
  };

  southWest!: {
    latitude: number;
    longitude: number;
  };
}