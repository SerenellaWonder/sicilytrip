import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DestinationCache } from './cache/destination.cache';
import { Destination } from './models/destination.model';
import { NominatimProvider } from './providers/nominatim.provider';

@Injectable()
export class PlacesService {
  constructor(
    private readonly provider: NominatimProvider,
    private readonly cache: DestinationCache,
  ) {}

  /**
   * Ricerca destinazioni tramite provider
   * e salva automaticamente i risultati in cache.
   */
  async autocomplete(
    query: string,
  ): Promise<Destination[]> {

    const destinations =
      await this.provider.autocomplete(query);

    this.cache.saveMany(destinations);

    return destinations;
  }

  /**
   * Restituisce una destinazione dalla cache.
   * Utilizzato dagli endpoint REST.
   */
  async details(
    id: string,
  ): Promise<Destination> {

    const destination =
      this.cache.get(id);

    if (!destination) {

      throw new NotFoundException(
        `Destination ${id} not found`,
      );

    }

    return destination;
  }

  /**
   * Metodo interno utilizzato dagli altri moduli
   * (Hotels, Experiences, Packages, ecc.).
   */
  findById(
    id: string,
  ): Destination {

    const destination =
      this.cache.get(id);

    if (!destination) {

      throw new NotFoundException(
        `Destination ${id} not found`,
      );

    }

    return destination;
  }
}