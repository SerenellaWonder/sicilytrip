import { GoneException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../../../prisma/prisma.service';
import { CustomerIdentityService } from '../../customer-area/customer-identity.service';
import { HotelPreBookSnapshotRepository } from '../repositories/hotel-prebook-snapshot.repository';
import { HotelPaymentService } from './hotel-payment.service';

describe('HotelPaymentService', () => {
  const prisma = {};
  const customerIdentity = {};
  const preBookRepository = { findByIdValid: jest.fn() };

  function createService(values: Record<string, string>) {
    const config = {
      get: jest.fn((key: string) => values[key]),
    };

    return new HotelPaymentService(
      config as unknown as ConfigService,
      prisma as unknown as PrismaService,
      customerIdentity as unknown as CustomerIdentityService,
      preBookRepository as unknown as HotelPreBookSnapshotRepository,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('is disabled by default and never contacts Stripe', async () => {
    const service = createService({});

    expect(service.getConfiguration()).toEqual({ enabled: false });
    await expect(
      service.createIntent({
        preBookId: 'prebook-id',
        customerEmail: 'mario@example.com',
      }),
    ).rejects.toBeInstanceOf(ServiceUnavailableException);
    expect(preBookRepository.findByIdValid).not.toHaveBeenCalled();
  });

  it('refuses live Stripe keys while the integration is in test mode', async () => {
    const service = createService({
      PAYMENTS_ENABLED: 'true',
      STRIPE_SECRET_KEY: 'sk_live_not-allowed',
    });

    await expect(
      service.createIntent({
        preBookId: 'prebook-id',
        customerEmail: 'mario@example.com',
      }),
    ).rejects.toBeInstanceOf(ServiceUnavailableException);
    expect(preBookRepository.findByIdValid).not.toHaveBeenCalled();
  });

  it('rejects an expired prebook before creating a payment intent', async () => {
    const service = createService({
      PAYMENTS_ENABLED: 'true',
      STRIPE_SECRET_KEY: 'sk_test_example',
    });
    preBookRepository.findByIdValid.mockResolvedValue(null);

    await expect(
      service.createIntent({
        preBookId: 'prebook-id',
        customerEmail: 'mario@example.com',
      }),
    ).rejects.toBeInstanceOf(GoneException);
  });
});
