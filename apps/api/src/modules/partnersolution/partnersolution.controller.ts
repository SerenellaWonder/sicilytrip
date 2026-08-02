import { Controller, Get } from '@nestjs/common';
import { PartnerSolutionService } from './partnersolution.service';

@Controller('partnersolution')
export class PartnerSolutionController {

  constructor(
    private readonly partnerSolutionService: PartnerSolutionService,
  ) {}

  @Get('suppliers')
  async suppliers() {
    return this.partnerSolutionService.getSuppliers();
  }
}