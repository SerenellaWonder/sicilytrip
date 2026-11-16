export type HotelRoomRate = {
  SelectCode: string;
  Rooms?: string[];
  Boards?: string[];
  CancellationPolicyCode?: string;
  Price?: number;
  Currency?: string;
  Supplier?: string;
};
const normalize = (text: string) =>
  text.trim().replace(/\s+/g, " ").toLowerCase();
export function groupHotelRooms(rates: HotelRoomRate[]) {
  const groups = new Map<
    string,
    { key: string; rooms: string[]; rates: HotelRoomRate[] }
  >();
  rates.forEach((rate, index) => {
    const rooms = rate.Rooms?.map((room) => room.trim()).filter(Boolean) ?? [];
    // Preserve all room attributes and their order, especially multi-room bookings.
    const key = rooms.length
      ? JSON.stringify(rooms.map(normalize))
      : `unknown-${index}`;
    const existing = groups.get(key);
    if (existing) existing.rates.push(rate);
    else groups.set(key, { key, rooms, rates: [rate] });
  });
  return [...groups.values()];
}
