"use client";
import SearchBox from "@/components/hero/SearchBox";
import { destinationCatalog } from "@/data/destinations";
import { useLanguage } from "@/components/i18n/LanguageProvider";
export default function ConciergeHotelSearch({
  destinationId,
  adults,
  arrival,
  departure,
}: {
  destinationId: string;
  adults: string;
  arrival: string;
  departure: string;
}) {
  const { language } = useLanguage();
  const english = language === "en";
  const item = destinationCatalog.find((item) => item.id === destinationId);
  const validDate = (date: string) =>
    /^20\d{2}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(new Date(date).getTime()) &&
    new Date(date).toISOString().slice(0, 10) === date;
  const datesValid =
    validDate(arrival) &&
    validDate(departure) &&
    arrival < departure &&
    new Date(departure) > new Date();
  const initialValues = {
    destination: item
      ? {
          id: `catalog-${item.id}`,
          slug: item.id,
          name: item.name,
          displayName: `${item.name}, ${item.province}, Sicilia`,
          region: "Sicilia",
          country: "Italia",
          province: item.province,
          latitude: item.latitude,
          longitude: item.longitude,
          northEast: {
            latitude: item.latitude + 0.18,
            longitude: item.longitude + 0.22,
          },
          southWest: {
            latitude: item.latitude - 0.18,
            longitude: item.longitude - 0.22,
          },
        }
      : undefined,
    checkIn: datesValid ? arrival : "",
    checkOut: datesValid ? departure : "",
    adults: /^[1-6]$/.test(adults) ? Number(adults) : 2,
  };
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F8F8F5] px-5 pb-24 pt-36"
    >
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold text-[#0D2340]">
          {english ? "Find your hotel" : "Trova il tuo hotel"}
        </h1>
        <p className="mt-4 mb-8 max-w-2xl text-slate-600">
          {english
            ? "Confirm destination, dates and guests. Search checks live hotel rates through our booking partners. Flights, transfers and activities are not included."
            : "Conferma destinazione, date e ospiti. La ricerca verifica le tariffe hotel reali tramite i nostri partner di prenotazione. Voli, trasferimenti e attività non sono inclusi."}
        </p>
        <SearchBox
          key={`${destinationId}-${adults}-${arrival}-${departure}`}
          initialValues={initialValues}
        />
      </div>
    </main>
  );
}
