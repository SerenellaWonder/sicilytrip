import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'node:crypto';

@Injectable()
export class CustomerIdentityService {
  private readonly secret: string;

  constructor(config: ConfigService) {
    const configuredSecret = config.get<string>('CUSTOMER_AUTH_SECRET');

    if (!configuredSecret && config.get<string>('NODE_ENV') === 'production') {
      throw new Error('CUSTOMER_AUTH_SECRET is required in production');
    }

    this.secret = configuredSecret ?? 'sicilytrip-local-development-only';
  }

  normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  hash(value: string) {
    return createHmac('sha256', this.secret).update(value).digest('hex');
  }

  hashEmail(email: string) {
    return this.hash(this.normalizeEmail(email));
  }
}
