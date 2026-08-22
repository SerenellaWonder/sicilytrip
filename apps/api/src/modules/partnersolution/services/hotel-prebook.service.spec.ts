import { PartnerSolutionClient } from '../client/partnersolution.client';
import { PartnerSolutionHotelPreBookService } from './hotel-prebook.service';

describe('PartnerSolutionHotelPreBookService', () => {
  const client = {
    post: jest.fn(),
  };

  const service = new PartnerSolutionHotelPreBookService(
    client as unknown as PartnerSolutionClient,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('posts the identifiers in the JSON body without a query string', async () => {
    const request = {
      SearchId: '93162db5-dc1e-4c0a-9159-6e980f6b91d2',
      GiataId: '35324',
      RoomId: 'f810470d-6634-42f1-91de-9be39e21adac',
    };
    const response = {
      Error: '',
      FinalPrice: 91.74,
    };

    client.post.mockResolvedValue(response);

    await expect(service.preBook(request)).resolves.toBe(response);
    expect(client.post).toHaveBeenCalledTimes(1);
    expect(client.post).toHaveBeenCalledWith('/api/HotelPreBook', request);
  });

  it('returns provider errors unchanged for the application service', async () => {
    const response = {
      Error: 'Room no longer available',
    };

    client.post.mockResolvedValue(response);

    await expect(
      service.preBook({
        SearchId: 'search-id',
        GiataId: 'giata-id',
        RoomId: 'room-id',
      }),
    ).resolves.toBe(response);
  });
});
