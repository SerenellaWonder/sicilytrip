import { Injectable } from '@nestjs/common';
import { PartnerSolutionClient } from './client/partnersolution.client';

@Injectable()
export class PartnerSolutionService {

  constructor(
    private readonly client: PartnerSolutionClient,
  ) {}

  async getSuppliers() {
    return this.client.get('/api/Suppliers');
  }

}