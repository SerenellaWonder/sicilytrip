import { Module } from '@nestjs/common';

import { PlacesModule } from '../places/places.module';
import { PartnerSolutionModule } from '../partnersolution/partnersolution.module';
import { CustomerAreaModule } from '../customer-area/customer-area.module';

import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';

import { HotelSearchRepository } from './repositories/hotel-search.repository';

import { HotelSearchService } from './services/hotel-search.service';
import { HotelResultsService } from './services/hotel-results.service';
import { HotelDetailsService } from './services/hotel-details.service';
import { HotelRoomsService } from './services/hotel-rooms.service';
import { HotelPreBookService } from './services/hotel-prebook.service';
import { HotelBookService } from './services/hotel-book.service';
import { SearchPollingService } from './services/search-polling.service';
import { HotelSearchResultRepository } from './repositories/hotel-search-result.repository';
import { HotelSearchResultsService } from './services/hotel-search-results.service';
import { HotelDetailRepository } from './repositories/hotel-detail.repository';
import { ProviderBookingAttemptRepository } from './repositories/provider-booking-attempt.repository';
import { HotelPreBookSnapshotRepository } from './repositories/hotel-prebook-snapshot.repository';

@Module({
  imports: [PlacesModule, PartnerSolutionModule, CustomerAreaModule],
  controllers: [HotelsController],
  providers: [
    HotelsService,

    HotelSearchRepository,
    HotelSearchResultRepository,
    HotelDetailRepository,
    ProviderBookingAttemptRepository,
    HotelPreBookSnapshotRepository,

    HotelSearchService,
    HotelSearchResultsService,
    HotelResultsService,
    HotelDetailsService,
    HotelRoomsService,
    HotelPreBookService,
    HotelBookService,

    SearchPollingService,
  ],
  exports: [HotelsService, HotelSearchRepository],
})
export class HotelsModule {}
