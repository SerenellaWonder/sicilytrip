import { ConflictException, GoneException } from '@nestjs/common';

import { PartnerSolutionHotelBookService } from '../../partnersolution/services/hotel-book.service';
import { CustomerIdentityService } from '../../customer-area/customer-identity.service';
import { CustomerEmailService } from '../../customer-area/customer-email.service';
import { HotelBookDto } from '../dto/hotel-book.dto';
import { HotelSearchRepository } from '../repositories/hotel-search.repository';
import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';
import { ProviderBookingAttemptRepository } from '../repositories/provider-booking-attempt.repository';
import { HotelBookService } from './hotel-book.service';

describe('HotelBookService', () => {
  const dto: HotelBookDto = {
    customerEmail: 'mario@example.com',
    searchId: 'internal-search-id',
    hotelId: 'provider-hotel-id',
    rateId: 'room-id',
    Names: [
      {
        Cam: 1,
        Paxes: [
          {
            Title: 'Mr',
            Name: 'Mario',
            LastName: 'Rossi',
            Type: 'Adult',
            AbosultePaxNumber: 1,
            RelativePaxNumber: 1,
          },
        ],
      },
    ],
    PurchaseToken: '',
    Spui: '',
    OriginalCurrency: '',
    DeadlineDate: '30/10/2026',
  };

  const provider = { book: jest.fn() };
  const hotelSearchRepository = { findById: jest.fn() };
  const hotelSearchResultRepository = { findBySearchId: jest.fn() };
  const bookingAttemptRepository = {
    createPending: jest.fn(),
    updateResult: jest.fn(),
  };
  const customerIdentity = { hashEmail: jest.fn() };
  const customerEmail = {
    isConfigured: jest.fn(),
    sendBookingConfirmation: jest.fn(),
  };

  function createService() {
    return new HotelBookService(
      provider as unknown as PartnerSolutionHotelBookService,
      hotelSearchRepository as unknown as HotelSearchRepository,
      hotelSearchResultRepository as unknown as HotelSearchResultRepository,
      bookingAttemptRepository as unknown as ProviderBookingAttemptRepository,
      customerIdentity as unknown as CustomerIdentityService,
      customerEmail as unknown as CustomerEmailService,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
    hotelSearchRepository.findById.mockResolvedValue({
      providerSearchId: 'provider-search-id',
      createdAt: new Date(),
      checkIn: new Date('2026-10-30T00:00:00.000Z'),
      checkOut: new Date('2026-11-02T00:00:00.000Z'),
      rooms: [{ adults: 1, children: 0 }],
    });
    hotelSearchResultRepository.findBySearchId.mockResolvedValue([
      {
        providerHotelId: dto.hotelId,
        hotelName: 'Hotel Test',
        payload: { GiataID: 35324 },
      },
    ]);
    bookingAttemptRepository.createPending.mockResolvedValue({
      id: 'attempt-id',
    });
    bookingAttemptRepository.updateResult.mockResolvedValue(undefined);
    customerIdentity.hashEmail.mockReturnValue('customer-email-hash');
    customerEmail.isConfigured.mockReturnValue(true);
    customerEmail.sendBookingConfirmation.mockResolvedValue(undefined);
  });

  it('sends the exact provider payload and preserves empty strings', async () => {
    const service = createService();
    const response = { Error: '', RefCode: '123-48789' };
    provider.book.mockResolvedValue(response);

    await expect(service.book(dto)).resolves.toBe(response);
    expect(provider.book).toHaveBeenCalledWith({
      Names: dto.Names,
      PurchaseToken: '',
      Spui: '',
      OriginalCurrency: '',
      DeadlineDate: '30/10/2026',
      SearchId: 'provider-search-id',
      GiataId: '35324',
      RoomId: 'room-id',
    });
    expect(bookingAttemptRepository.createPending).toHaveBeenCalledWith(
      expect.objectContaining({ customerEmailHash: 'customer-email-hash' }),
    );
    expect(bookingAttemptRepository.updateResult).toHaveBeenCalledWith(
      'attempt-id',
      'CONFIRMED',
      '123-48789',
      '',
    );
    expect(customerEmail.sendBookingConfirmation).toHaveBeenCalledWith({
      referenceCode: '123-48789',
      hotelName: 'Hotel Test',
      checkIn: new Date('2026-10-30T00:00:00.000Z'),
      checkOut: new Date('2026-11-02T00:00:00.000Z'),
    });
  });

  it('keeps a confirmed booking when the confirmation email fails', async () => {
    const service = createService();
    const response = { Error: '', RefCode: '123-48789' };
    provider.book.mockResolvedValue(response);
    customerEmail.sendBookingConfirmation.mockRejectedValue(
      new Error('Email unavailable'),
    );

    await expect(service.book(dto)).resolves.toBe(response);
    expect(provider.book).toHaveBeenCalledTimes(1);
    expect(bookingAttemptRepository.updateResult).toHaveBeenCalledWith(
      'attempt-id',
      'CONFIRMED',
      '123-48789',
      '',
    );
  });

  it('does not send a confirmation email for a failed booking', async () => {
    const service = createService();
    provider.book.mockResolvedValue({ Error: 'Booking failed', RefCode: '' });

    await service.book(dto);

    expect(customerEmail.sendBookingConfirmation).not.toHaveBeenCalled();
  });

  it('rejects booking after the search validity window', async () => {
    const service = createService();
    hotelSearchRepository.findById.mockResolvedValue({
      providerSearchId: 'provider-search-id',
      createdAt: new Date(Date.now() - 20 * 60 * 1000),
    });

    await expect(service.book(dto)).rejects.toBeInstanceOf(GoneException);
    expect(provider.book).not.toHaveBeenCalled();
  });

  it('never calls HotelBook twice for the same selection', async () => {
    const service = createService();
    provider.book.mockResolvedValue({ Error: 'Booking failed', RefCode: '' });

    await service.book(dto);
    bookingAttemptRepository.createPending.mockResolvedValueOnce(null);
    await expect(service.book(dto)).rejects.toBeInstanceOf(ConflictException);
    expect(provider.book).toHaveBeenCalledTimes(1);
  });

  it('blocks retries when the provider outcome is uncertain', async () => {
    const service = createService();
    provider.book.mockRejectedValueOnce(new Error('Network timeout'));

    await expect(service.book(dto)).rejects.toThrow('Network timeout');
    bookingAttemptRepository.createPending.mockResolvedValueOnce(null);
    await expect(service.book(dto)).rejects.toBeInstanceOf(ConflictException);
    expect(provider.book).toHaveBeenCalledTimes(1);
  });
});
