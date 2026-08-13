import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { PartnerSolutionClient } from './client/partnersolution.client';

import { PartnerSolutionHotelService } from './services/hotel.services';
import { PartnerSolutionHotelResultsService } from './services/hotel-results.service';
import { PartnerSolutionHotelDetailsService } from './services/hotel-details.service';
import { PartnerSolutionHotelRoomsService } from './services/hotel-rooms.service';
import { PartnerSolutionHotelPreBookService } from './services/hotel-prebook.service';
import { PartnerSolutionHotelBookService } from './services/hotel-book.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
  ],
  providers: [
    PartnerSolutionClient,
    PartnerSolutionHotelService,
    PartnerSolutionHotelResultsService,
    PartnerSolutionHotelDetailsService,
    PartnerSolutionHotelRoomsService,
    PartnerSolutionHotelPreBookService,
    PartnerSolutionHotelBookService,
  ],
  exports: [
    PartnerSolutionClient,
    PartnerSolutionHotelService,
    PartnerSolutionHotelResultsService,
    PartnerSolutionHotelDetailsService,
    PartnerSolutionHotelRoomsService,
    PartnerSolutionHotelPreBookService,
    PartnerSolutionHotelBookService,
  ],
})
export class PartnerSolutionModule {}