export interface Hotel {
  /**
   * Id interno SicilyTrip
   */
  id: string;

  /**
   * Provider che ha restituito l'hotel
   * (PartnerSolution, HotelBeds, Expedia...)
   */
  provider: string;

  /**
   * Id dell'hotel presso il provider
   */
  providerHotelId: string;

  /**
   * Supplier del provider
   * (DOTW, MIKI, HotelBeds, ecc.)
   */
  supplier: string;

  /**
   * Nome hotel
   */
  name: string;

  /**
   * Descrizione hotel
   */
  description?: string;

  /**
   * Categoria stelle
   */
  stars: number;

  /**
   * Indirizzo
   */
  address?: string;

  /**
   * Città
   */
  city?: string;

  /**
   * Regione
   */
  region?: string;

  /**
   * Nazione
   */
  country?: string;

  /**
   * Coordinate geografiche
   */
  latitude?: number;

  longitude?: number;

  /**
   * Immagine principale
   */
  thumbnail?: string;

  /**
   * Galleria immagini
   */
  images: string[];

  /**
   * Servizi disponibili
   */
  amenities: string[];

  /**
   * Valutazione media
   */
  rating?: number;

  /**
   * Numero recensioni
   */
  reviewCount?: number;

  /**
   * Prezzo minimo disponibile
   */
  price?: {
    amount: number;
    currency: string;
  };
}
