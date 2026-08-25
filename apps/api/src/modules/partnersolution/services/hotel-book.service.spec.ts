import { PartnerSolutionClient } from '../client/partnersolution.client';
import { PartnerSolutionHotelBookService } from './hotel-book.service';

describe('PartnerSolutionHotelBookService', () => {
  const client = { post: jest.fn() };
  const service = new PartnerSolutionHotelBookService(
    client as unknown as PartnerSolutionClient,
  );

  beforeEach(() => jest.clearAllMocks());

  it('posts the full payload in the body without a query string', async () => {
    const request = {
      Names: [{ Cam: 1, Paxes: [] }],
      PurchaseToken: '',
      Spui: '',
      OriginalCurrency: '',
      DeadlineDate: '30/10/2026',
      SearchId: 'search-id',
      GiataId: '35324',
      RoomId: 'room-id',
    };
    const response = { Error: '', RefCode: '123-48789' };
    client.post.mockResolvedValue(response);

    await expect(service.book(request)).resolves.toBe(response);
    expect(client.post).toHaveBeenCalledWith('/api/HotelBook', request);
  });
});
