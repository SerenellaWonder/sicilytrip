export interface PlaceSuggestion {
  id: string;
  label: string;
  description: string;
}

export interface PlaceDetails {
  id: string;
  label: string;

  latitude: number;
  longitude: number;

  northEast: {
    latitude: number;
    longitude: number;
  };

  southWest: {
    latitude: number;
    longitude: number;
  };
}

export interface IPlacesProvider {
  autocomplete(
    query: string,
  ): Promise<PlaceSuggestion[]>;

  details(
    id: string,
  ): Promise<PlaceDetails>;
}
