// Next may preserve escaped slashes in dynamic route parameters.
// Decode once before the API client encodes the hotel identifier again.
export function hotelRouteId(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
