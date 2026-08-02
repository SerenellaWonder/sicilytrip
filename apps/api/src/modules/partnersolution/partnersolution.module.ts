import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { PartnerSolutionController } from './partnersolution.controller';
import { PartnerSolutionService } from './partnersolution.service';
import { PartnerSolutionClient } from './client/partnersolution.client';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
  ],
  controllers: [PartnerSolutionController],
  providers: [
    PartnerSolutionService,
    PartnerSolutionClient,
  ],
  exports: [
    PartnerSolutionService,
    PartnerSolutionClient,
  ],
})
export class PartnerSolutionModule {}