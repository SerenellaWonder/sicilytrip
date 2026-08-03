import { Injectable } from '@nestjs/common';
import { PartnerSolutionHotelService } from './services/hotel.services';
import { HotelSearchDto } from './dto/hotel-search.dto';

@Injectable()
export class PartnerSolutionService {
  constructor(
    private readonly hotelService: PartnerSolutionHotelService,
  ) {}

  async getSuppliers() {
    return this.hotelService.suppliers();
  }

  async search(dto: HotelSearchDto) {
  return this.hotelService.search(dto);
}
}