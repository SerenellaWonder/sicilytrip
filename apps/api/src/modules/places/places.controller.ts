import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('autocomplete')
  async autocomplete(@Query('q') query: string) {
    if (!query || query.trim().length < 2) {
      throw new BadRequestException('Query must contain at least 2 characters');
    }

    return this.placesService.autocomplete(query.trim());
  }

  @Get('details/:id')
  async details(@Param('id') id: string) {
    return this.placesService.details(id);
  }
}
