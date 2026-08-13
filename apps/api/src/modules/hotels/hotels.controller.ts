import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { HotelsService } from './hotels.service';

import { HotelSearchService } from './services/hotel-search.service';
import { HotelSearchResultsService } from './services/hotel-search-results.service';
import { HotelDetailsService } from './services/hotel-details.service';
import { HotelRoomsService } from './services/hotel-rooms.service';
import { HotelPreBookService } from './services/hotel-prebook.service';
import { HotelBookService } from './services/hotel-book.service';

import { HotelSearchDto } from './dto/hotel-search.dto';
import { HotelPreBookDto } from './dto/hotel-prebook.dto';
import { HotelBookDto } from './dto/hotel-book.dto';

@Controller('hotels')
export class HotelsController {

  constructor(
    private readonly hotelsService: HotelsService,
    private readonly hotelSearchService: HotelSearchService,
    private readonly hotelSearchResultsService: HotelSearchResultsService,
    private readonly hotelDetailsService: HotelDetailsService,
    private readonly hotelRoomsService: HotelRoomsService,
    private readonly hotelPreBookService: HotelPreBookService,
    private readonly hotelBookService: HotelBookService,
  ) {}

  @Post('search')
  search(
    @Body() dto: HotelSearchDto,
  ) {
    return this.hotelSearchService.search(dto);
  }

  @Get('search/:searchId')
  getSearchResults(
    @Param('searchId') searchId: string,
  ) {
    return this.hotelSearchResultsService.findBySearchId(
      searchId,
    );
  }

  @Get('search/:searchId/hotel/:hotelId')
  details(
    @Param('searchId') searchId: string,
    @Param('hotelId') hotelId: string,
  ) {
    return this.hotelDetailsService.details(
      searchId,
      hotelId,
    );
  }

  @Get(':hotelId/rooms')
  rooms(
    @Param('hotelId') hotelId: string,
  ) {
    return this.hotelRoomsService.rooms(
      hotelId,
    );
  }

  @Post('prebook')
  preBook(
    @Body() dto: HotelPreBookDto,
  ) {
    return this.hotelPreBookService.preBook(
      dto,
    );
  }

  @Post('book')
  book(
    @Body() dto: HotelBookDto,
  ) {
    return this.hotelBookService.book(
      dto,
    );
  }

}