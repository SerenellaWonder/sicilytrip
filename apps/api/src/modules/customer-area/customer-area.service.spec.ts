import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CustomerAreaService } from './customer-area.service';
import { CustomerEmailService } from './customer-email.service';
import { CustomerIdentityService } from './customer-identity.service';

describe('CustomerAreaService', () => {
  const prisma = {
    providerBookingAttempt: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    customerAccessCode: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    customerSession: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
    $transaction: jest.fn(),
  };
  const config = {
    get: jest.fn((key: string) => {
      if (key === 'NODE_ENV') return 'development';
      if (key === 'CUSTOMER_AUTH_SECRET') return 'test-secret';
      return undefined;
    }),
  };
  const emailService = {
    isConfigured: jest.fn(() => false),
    sendAccessCode: jest.fn(),
  };
  const identity = new CustomerIdentityService(
    config as unknown as ConfigService,
  );

  function createService() {
    return new CustomerAreaService(
      prisma as unknown as PrismaService,
      identity,
      emailService as unknown as CustomerEmailService,
      config as unknown as ConfigService,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
    emailService.isConfigured.mockReturnValue(false);
  });

  it('does not reveal whether an email has associated bookings', async () => {
    prisma.providerBookingAttempt.findFirst.mockResolvedValue(null);

    const response = await createService().requestAccess('nobody@example.com');

    expect(response).not.toHaveProperty('developmentCode');
    expect(prisma.customerAccessCode.create).not.toHaveBeenCalled();
  });

  it('creates a one-time development code for a known customer', async () => {
    prisma.providerBookingAttempt.findFirst.mockResolvedValue({
      id: 'booking',
    });
    prisma.customerAccessCode.findFirst.mockResolvedValue(null);
    prisma.customerAccessCode.create.mockResolvedValue({ id: 'code' });

    const response = await createService().requestAccess('Guest@Example.com');

    expect(response.developmentCode).toMatch(/^\d{6}$/);
    const createCall = prisma.customerAccessCode.create.mock.calls[0] as [
      { data: { emailHash: string } },
    ];
    expect(createCall[0].data.emailHash).toBe(
      identity.hashEmail('guest@example.com'),
    );
    expect(emailService.sendAccessCode).not.toHaveBeenCalled();
  });

  it('rejects an invalid access code and counts the attempt', async () => {
    prisma.customerAccessCode.findFirst.mockResolvedValue({
      id: 'code-id',
      codeHash: 'different-hash',
    });
    prisma.customerAccessCode.update.mockResolvedValue(undefined);

    await expect(
      createService().verifyAccess('guest@example.com', '123456'),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(prisma.customerAccessCode.update).toHaveBeenCalledWith({
      where: { id: 'code-id' },
      data: { attempts: { increment: 1 } },
    });
  });

  it('returns only bookings associated with the authenticated email hash', async () => {
    prisma.customerSession.findUnique.mockResolvedValue({
      emailHash: 'email-hash',
      expiresAt: new Date(Date.now() + 60_000),
      revokedAt: null,
    });
    prisma.providerBookingAttempt.findMany.mockResolvedValue([]);

    await createService().getBookings('session-token');

    expect(prisma.providerBookingAttempt.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { customerEmailHash: 'email-hash' } }),
    );
  });
});
