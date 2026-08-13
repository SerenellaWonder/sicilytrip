import { Injectable } from '@nestjs/common';

import { Destination } from '../models/destination.model';

@Injectable()
export class DestinationCache {

  private readonly cache =
    new Map<string, Destination>();

  save(destination: Destination): void {

    this.cache.set(
      destination.id,
      destination,
    );

  }

  saveMany(
    destinations: Destination[],
  ): void {

    destinations.forEach((d) =>
      this.save(d),
    );

  }

  get(
    id: string,
  ): Destination | undefined {

    return this.cache.get(id);

  }

  clear(): void {

    this.cache.clear();

  }

}