import { HotelDetailsService } from './hotel-details.service';
import { HotelDetailRepository } from '../repositories/hotel-detail.repository';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';
import { PartnerSolutionHotelDetailsService } from '../../partnersolution/services/hotel-details.service';

describe('Hotel detail cache contract', () => {
  const original = {
    Name: "Villa D'amato",
    Stars: 3,
    Category: '3 STELLE',
    Zone: 'Palermo',
    Address: 'Messina Marine, 178/180',
    Lat: '38.101862',
    Lon: '13.398105',
    PhotoGallery: ['/getHotelImageGallery?id=258270'],
    Descriptions: [
      { Title: 'Ubicazione', Description: 'Negozi e ristoranti.' },
      { Title: 'Dotazione', Description: 'Reception 24 ore.' },
    ],
    Facilities: ['WiFi'],
    RoomFacilities: ['Doccia'],
    Amenities: ['37 camere'],
    Distances: ['Mare 200m'],
  };
  const findByProviderHotelId = jest.fn();
  const save = jest.fn().mockResolvedValue(undefined);
  const details = jest.fn().mockResolvedValue(original);
  const results = jest.fn().mockResolvedValue([
    {
      providerHotelId: 'hotel1',
      payload: { GiataID: '123', Image: '/fallback.jpg' },
    },
  ]);
  const service = new HotelDetailsService(
    { findByProviderHotelId, save } as unknown as HotelDetailRepository,
    {
      findById: jest
        .fn()
        .mockResolvedValue({ providerSearchId: 'provider-search' }),
    } as unknown as HotelSearchRepository,
    { findBySearchId: results } as unknown as HotelSearchResultRepository,
    { details } as unknown as PartnerSolutionHotelDetailsService,
  );
  const cached = {
    name: original.Name,
    stars: original.Stars,
    category: original.Category,
    zone: original.Zone,
    address: original.Address,
    latitude: Number(original.Lat),
    longitude: Number(original.Lon),
    photoGallery: original.PhotoGallery,
    descriptions: original.Descriptions,
    facilities: original.Facilities,
    payload: original,
  };
  beforeEach(() => jest.clearAllMocks());
  it('returns the same display data for first and subsequent visits', async () => {
    findByProviderHotelId
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(cached);
    const fresh = await service.details('search1', 'hotel1');
    const repeat = await service.details('search1', 'hotel1');
    expect(repeat).toEqual(fresh);
    expect(repeat).toMatchObject(original);
    expect(details).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledTimes(1);
  });
  it('restores descriptions from stored columns even without original payload', async () => {
    findByProviderHotelId.mockResolvedValue({
      ...cached,
      payload: null,
      latitude: 0,
      longitude: 0,
    });
    expect(await service.details('search1', 'hotel1')).toMatchObject({
      Descriptions: original.Descriptions,
      Facilities: ['WiFi'],
      Lat: '0',
      Lon: '0',
    });
  });
  it('uses search image without changing the response field names', async () => {
    findByProviderHotelId.mockResolvedValue({ ...cached, photoGallery: [] });
    expect(await service.details('search1', 'hotel1')).toMatchObject({
      PhotoGallery: ['/fallback.jpg'],
      RoomFacilities: ['Doccia'],
    });
  });
});
