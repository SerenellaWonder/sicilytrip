import {
  BadRequestException,
  GoneException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentStatus } from '@prisma/client';
import Stripe from 'stripe';

import { PrismaService } from '../../../prisma/prisma.service';
import { CustomerIdentityService } from '../../customer-area/customer-identity.service';
import { HotelPaymentIntentDto } from '../dto/hotel-payment-intent.dto';
import { HotelPreBookSnapshotRepository } from '../repositories/hotel-prebook-snapshot.repository';

@Injectable()
export class HotelPaymentService {
  private readonly enabled: boolean;
  private readonly secretKey?: string;

  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly customerIdentity: CustomerIdentityService,
    private readonly preBookRepository: HotelPreBookSnapshotRepository,
  ) {
    this.enabled = config.get<string>('PAYMENTS_ENABLED') === 'true';
    this.secretKey = config.get<string>('STRIPE_SECRET_KEY');
  }

  getConfiguration() {
    return { enabled: this.enabled };
  }

  async createIntent(dto: HotelPaymentIntentDto) {
    if (!this.enabled) {
      throw new ServiceUnavailableException(
        'I pagamenti online non sono ancora attivi.',
      );
    }

    if (!this.secretKey || !this.secretKey.startsWith('sk_test_')) {
      throw new ServiceUnavailableException(
        'Stripe non è configurato in modalità test.',
      );
    }

    const preBook = await this.preBookRepository.findByIdValid(dto.preBookId);

    if (!preBook) {
      throw new GoneException(
        'La riconferma della tariffa è scaduta. Effettua un nuovo pre-book.',
      );
    }

    const amount = Math.round(Number(preBook.finalPrice) * 100);
    const currency = preBook.originalCurrency.trim().toLowerCase();

    if (!Number.isSafeInteger(amount) || amount <= 0 || !currency) {
      throw new BadRequestException(
        'Prezzo o valuta del pre-book non validi per il pagamento.',
      );
    }

    const existing = await this.prisma.hotelPayment.findUnique({
      where: { preBookSnapshotId: preBook.id },
    });
    const stripe = new Stripe(this.secretKey);

    if (existing) {
      const intent = await stripe.paymentIntents.retrieve(
        existing.stripePaymentIntentId,
      );
      return { clientSecret: intent.client_secret };
    }

    const intent = await stripe.paymentIntents.create(
      {
        amount,
        currency,
        automatic_payment_methods: { enabled: true },
        metadata: { preBookId: preBook.id },
      },
      { idempotencyKey: `hotel-prebook-${preBook.id}` },
    );

    await this.prisma.hotelPayment.create({
      data: {
        preBookSnapshotId: preBook.id,
        stripePaymentIntentId: intent.id,
        amount,
        currency,
        customerEmailHash: this.customerIdentity.hashEmail(dto.customerEmail),
        status: PaymentStatus.REQUIRES_PAYMENT_METHOD,
      },
    });

    return { clientSecret: intent.client_secret };
  }
}
