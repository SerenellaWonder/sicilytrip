import { Controller, Get } from '@nestjs/common';
import { PartnerSolutionService } from './partnersolution.service';
import { Body, Post } from '@nestjs/common';
import { HotelSearchDto } from './dto/hotel-search.dto';

@Controller('partnersolution')
export class PartnerSolutionController {

  constructor(
    private readonly partnerSolutionService: PartnerSolutionService,
  ) {}

  @Get('suppliers')
  async suppliers() {
    return this.partnerSolutionService.getSuppliers();
  }
  @Post('hotel/search')
async search(
  @Body() dto: HotelSearchDto,
) {
  return this.partnerSolutionService.search(dto);
}
}