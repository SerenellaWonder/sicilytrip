export interface Destination {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  region?: string;
  province?: string;
  country?: string;

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

export interface HotelSearchRoom {
  adults: number;
  children: number;
  childrenAges?: number[];
}

export interface HotelSearchRequest {
  placeId: string;
  northEast: string;
  southWest: string;
  checkIn: string;
  checkOut: string;
  rooms: HotelSearchRoom[];
}

/*
 * Risultato restituito direttamente dal POST /hotels/search
 * mentre il backend conclude il polling PartnerSolution.
 */
export interface PartnerHotelSearchResult {
  ID: string;
  GiataID?: string;
  Name: string;
  Image?: string;
  Category?: number;
  CategoryTxt?: string;
  PriceFrom?: number;
  Currency?: string;
  Zone?: string;
  BaseRoom?: string;
  BaseBoard?: string;
  BasePolicy?: string;
  Lat?: string;
  Lon?: string;
  Supplier?: string;
}

export type HotelSearchStatus =
  | "PENDING"
  | "RUNNING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export interface HotelSearchResponse {
  searchId: string;
  providerSearchId?: string;
  status: HotelSearchStatus;
  timeout?: boolean;
  total: number;
  results: PartnerHotelSearchResult[];
}

/*
 * Risultato persistito restituito da:
 *
 * GET /api/v1/hotels/search/:searchId
 */
export interface HotelResult {
  hotelId: string;
  giataId?: string;

  name: string;
  stars?: number;

  price?: number;
  currency?: string;

  supplier?: string;

  latitude?: number;
  longitude?: number;

  image?: string;
  zone?: string;

  room?: string;
  board?: string;
  policy?: string;
}

export interface HotelResultsResponse {
  searchId: string;
  total: number;
  hotels: HotelResult[];
}

export interface StoredHotelSearch {
  searchId: string;
  providerSearchId?: string;
  status: HotelSearchStatus;
  total: number;

  search?: {
    destination: Destination;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  };
}