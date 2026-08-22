import { Destination } from '../models/destination.model';

export interface IPlacesProvider {
  autocomplete(query: string): Promise<Destination[]>;

  details(id: string): Promise<Destination>;
}
