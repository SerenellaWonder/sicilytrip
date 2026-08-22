export interface NominatimResultDto {
  place_id: string | number;
  name?: string;
  display_name: string;
  lat: string;
  lon: string;
  boundingbox: [string, string, string, string];
  address?: {
    country?: string;
    state?: string;
    county?: string;
    province?: string;
  };
}
