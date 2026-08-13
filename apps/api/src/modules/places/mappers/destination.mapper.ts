import { Destination } from '../models/destination.model';

export class DestinationMapper {

  static fromNominatim(item: any): Destination {

    const destination = new Destination();

    destination.id = String(item.place_id);

    destination.slug =
      (item.name ?? item.display_name)
        .toLowerCase()
        .replace(/\s+/g, '-');

    destination.name =
      item.name ?? item.display_name;

    destination.displayName =
      item.display_name;

    destination.country =
      item.address?.country ?? '';

    destination.region =
      item.address?.state ?? '';

    destination.province =
      item.address?.county ??
      item.address?.province ??
      '';

    destination.latitude =
      Number(item.lat);

    destination.longitude =
      Number(item.lon);

    destination.northEast = {

      latitude:
        Number(item.boundingbox[1]),

      longitude:
        Number(item.boundingbox[3]),

    };

    destination.southWest = {

      latitude:
        Number(item.boundingbox[0]),

      longitude:
        Number(item.boundingbox[2]),

    };

    return destination;

  }

}