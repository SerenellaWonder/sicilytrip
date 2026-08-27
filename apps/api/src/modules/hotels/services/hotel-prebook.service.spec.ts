import { GoneException, NotFoundException } from '@nestjs/common';

import { PartnerSolutionHotelPreBookService } from '../../partnersolution/services/hotel-prebook.service';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';
import { HotelPreBookSnapshotRepository } from '../repositories/hotel-prebook-snapshot.repository';
import { HotelPreBookService } from './hotel-prebook.service';

describe('HotelPreBookService', () => {
  const dto = {
    searchId: 'internal-search-id',
    hotelId: 'provider-hotel-id',
    rateId: 'provider-room-id',
  };

  const provider = {
    preBook: jest.fn(),
  };

  const hotelSearchRepository = {
    findById: jest.fn(),
  };

  const hotelSearchResultRepository = {
    findBySearchId: jest.fn(),
  };
  const preBookSnapshotRepository = { save: jest.fn() };

  const service = new HotelPreBookService(
    provider as unknown as PartnerSolutionHotelPreBookService,
    hotelSearchRepository as unknown as HotelSearchRepository,
    hotelSearchResultRepository as unknown as HotelSearchResultRepository,
    preBookSnapshotRepository as unknown as HotelPreBookSnapshotRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    preBookSnapshotRepository.save.mockResolvedValue({ id: 'prebook-id' });
  });

  it('rejects a missing search', async () => {
    hotelSearchRepository.findById.mockResolvedValue(null);

    await expect(service.preBook(dto)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(provider.preBook).not.toHaveBeenCalled();
  });

  it('rejects a search after twenty minutes', async () => {
    hotelSearchRepository.findById.mockResolvedValue({
      providerSearchId: 'provider-search-id',
      createdAt: new Date(Date.now() - 20 * 60 * 1000),
    });

    await expect(service.preBook(dto)).rejects.toBeInstanceOf(GoneException);
    expect(provider.preBook).not.toHaveBeenCalled();
  });

  it('rejects a hotel not included in the search results', async () => {
    hotelSearchRepository.findById.mockResolvedValue({
      providerSearchId: 'provider-search-id',
      createdAt: new Date(),
    });
    hotelSearchResultRepository.findBySearchId.mockResolvedValue([]);

    await expect(service.preBook(dto)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(provider.preBook).not.toHaveBeenCalled();
  });

  it('rejects a hotel without a GiataID', async () => {
    hotelSearchRepository.findById.mockResolvedValue({
      providerSearchId: 'provider-search-id',
      createdAt: new Date(),
    });
    hotelSearchResultRepository.findBySearchId.mockResolvedValue([
      {
        providerHotelId: dto.hotelId,
        payload: {},
      },
    ]);

    await expect(service.preBook(dto)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(provider.preBook).not.toHaveBeenCalled();
  });

  it('maps internal identifiers to the PartnerSolutions payload', async () => {
    const response = {
      Error: '',
      FinalPrice: 91.74,
      PurchaseToken: '',
      Spui: '',
      OriginalCurrency: '',
      DeadlineDate: '30/10/2026',
    };

    const createdAt = new Date();
    hotelSearchRepository.findById.mockResolvedValue({
      id: dto.searchId,
      providerSearchId: 'provider-search-id',
      createdAt,
    });
    hotelSearchResultRepository.findBySearchId.mockResolvedValue([
      {
        providerHotelId: dto.hotelId,
        payload: {
          GiataID: 35324,
        },
      },
    ]);
    provider.preBook.mockResolvedValue(response);

    await expect(service.preBook(dto)).resolves.toEqual({
      ...response,
      preBookId: 'prebook-id',
    });
    expect(provider.preBook).toHaveBeenCalledTimes(1);
    expect(provider.preBook).toHaveBeenCalledWith({
      SearchId: 'provider-search-id',
      GiataId: '35324',
      RoomId: dto.rateId,
    });
    expect(preBookSnapshotRepository.save).toHaveBeenCalledWith({
      hotelSearchId: dto.searchId,
      providerHotelId: dto.hotelId,
      roomId: dto.rateId,
      purchaseToken: '',
      spui: '',
      originalCurrency: '',
      deadlineDate: '30/10/2026',
      finalPrice: 91.74,
      providerResponse: response,
      expiresAt: new Date(createdAt.getTime() + 20 * 60 * 1000),
    });
  });

  it('does not persist a failed provider prebook', async () => {
    hotelSearchRepository.findById.mockResolvedValue({
      id: dto.searchId,
      providerSearchId: 'provider-search-id',
      createdAt: new Date(),
    });
    hotelSearchResultRepository.findBySearchId.mockResolvedValue([
      {
        providerHotelId: dto.hotelId,
        payload: { GiataID: 35324 },
      },
    ]);
    provider.preBook.mockResolvedValue({ Error: 'Rate unavailable' });

    await expect(service.preBook(dto)).resolves.toEqual({
      Error: 'Rate unavailable',
    });
    expect(preBookSnapshotRepository.save).not.toHaveBeenCalled();
  });
});
