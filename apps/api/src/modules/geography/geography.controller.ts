import { Controller, Get, Param } from '@nestjs/common';
import { GeographyService } from './geography.service';

@Controller({
  path: 'geography',
  version: '1',
})
export class GeographyController {
  constructor(private readonly geographyService: GeographyService) {}

  @Get('regions')
  findAllRegions() {
    return this.geographyService.findAllRegions();
  }

  @Get('regions/:id')
  findRegion(@Param('id') id: string) {
    return this.geographyService.findRegion(id);
  }
}
