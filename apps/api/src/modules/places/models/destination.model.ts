export class Destination {
  id!: string;

  slug!: string;

  name!: string;

  displayName!: string;

  region!: string;

  province!: string;

  country!: string;

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
