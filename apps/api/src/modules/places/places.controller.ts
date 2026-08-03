import { Controller, Get, Query } from '@nestjs/common';

import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(
    private readonly placesService: PlacesService,
  ) {}

  @Get('autocomplete')
  autocomplete(
    @Query('q') query: string,
  ) {
    return this.placesService.autocomplete(query);
  }
}