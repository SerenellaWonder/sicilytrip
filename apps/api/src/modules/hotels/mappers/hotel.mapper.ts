import { Hotel } from '../models/hotel.model';

import { PartnerHotelResultDto } from '../../partnersolution/dto/partner-hotel-result.dto';

export class HotelMapper {
  static fromPartnerSolution(source: PartnerHotelResultDto): Hotel {
    return {
      id: '',

      provider: 'PartnerSolution',

      providerHotelId: String(source.HotelId ?? ''),

      supplier: source.Supplier ?? source.SupplierName ?? '',

      name: source.HotelName ?? '',

      description: source.Description,

      stars: Number(source.Stars ?? source.Category ?? 0),

      address: source.Address,

      city: source.City,

      region: source.Region,

      country: source.Country,

      latitude: source.Latitude,

      longitude: source.Longitude,

      thumbnail: source.Image ?? source.Thumbnail,

      images: source.Images ?? [],

      amenities: source.Amenities ?? [],

      rating: source.Rating,

      reviewCount: source.ReviewCount,

      price:
        source.Price !== undefined
          ? {
              amount: Number(source.Price),
              currency: source.Currency ?? 'EUR',
            }
          : undefined,
    };
  }
}
