import { Module } from '@nestjs/common';

import { CustomerAreaController } from './customer-area.controller';
import { CustomerAreaService } from './customer-area.service';
import { CustomerEmailService } from './customer-email.service';
import { CustomerIdentityService } from './customer-identity.service';

@Module({
  controllers: [CustomerAreaController],
  providers: [
    CustomerAreaService,
    CustomerEmailService,
    CustomerIdentityService,
  ],
  exports: [CustomerIdentityService],
})
export class CustomerAreaModule {}
