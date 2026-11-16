export type SearchArea = { lat: number; lon: number; radiusKm: number };
export function validArea(area: SearchArea | undefined): area is SearchArea {
  return (
    !!area &&
    Number.isFinite(area.lat) &&
    Number.isFinite(area.lon) &&
    Math.abs(area.lat) <= 85 &&
    Math.abs(area.lon) <= 180 &&
    Number.isFinite(area.radiusKm) &&
    area.radiusKm >= 1 &&
    area.radiusKm <= 50
  );
}
export function distanceKm(
  lat: number,
  lon: number,
  otherLat: number,
  otherLon: number,
) {
  const rad = Math.PI / 180;
  const a =
    Math.sin(((otherLat - lat) * rad) / 2) ** 2 +
    Math.cos(lat * rad) *
      Math.cos(otherLat * rad) *
      Math.sin(((otherLon - lon) * rad) / 2) ** 2;
  return (
    6371 *
    2 *
    Math.atan2(Math.sqrt(Math.min(1, a)), Math.sqrt(Math.max(0, 1 - a)))
  );
}
export function areaBounds(area: SearchArea) {
  const latDelta = ((area.radiusKm / 6371) * 180) / Math.PI;
  const lonDelta =
    (Math.asin(
      Math.min(
        1,
        Math.sin(area.radiusKm / 6371) / Math.cos((area.lat * Math.PI) / 180),
      ),
    ) *
      180) /
    Math.PI;
  return {
    northEast: {
      latitude: Math.min(85, area.lat + latDelta),
      longitude: Math.min(180, area.lon + lonDelta),
    },
    southWest: {
      latitude: Math.max(-85, area.lat - latDelta),
      longitude: Math.max(-180, area.lon - lonDelta),
    },
  };
}
