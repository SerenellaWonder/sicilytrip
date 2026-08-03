import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { PartnerSolutionController } from './partnersolution.controller';
import { PartnerSolutionService } from './partnersolution.service';
import { PartnerSolutionClient } from './client/partnersolution.client';
import { PartnerSolutionHotelService } from './services/hotel.services';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
  ],
  controllers: [
    PartnerSolutionController,
  ],
  providers: [
    PartnerSolutionService,
    PartnerSolutionClient,
    PartnerSolutionHotelService,
  ],
  exports: [
    PartnerSolutionService,
    PartnerSolutionClient,
  ],
})
export class PartnerSolutionModule {}