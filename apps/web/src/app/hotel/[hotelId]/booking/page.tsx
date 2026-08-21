import Header from "@/components/layout/header";

import HotelBookingPage from "@/components/hotels/booking/HotelBookingPage";

export default async function HotelBookingRoute({
  params,
  searchParams,
}: {
  params: Promise<{
    hotelId: string;
  }>;

  searchParams: Promise<{
    searchId?: string;
    rateId?: string;
  }>;
}) {
  const resolvedParams =
    await params;

  const resolvedSearchParams =
    await searchParams;

  const hotelId =
    resolvedParams.hotelId;

  const searchId =
    resolvedSearchParams.searchId;

  const rateId =
    resolvedSearchParams.rateId;

  if (
    !searchId ||
    !rateId
  ) {
    return (
      <>
        <Header />

        <main
          className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-[#F7F5F1]
            px-5
          "
        >
          <div className="text-center">
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#F58220]
              "
            >
              SicilyTrip Hotels
            </span>

            <h1
              className="
                mt-4
                text-4xl
                font-bold
                tracking-[-0.04em]
                text-[#0D2340]
              "
            >
              Tariffa non disponibile
            </h1>

            <p
              className="
                mt-4
                text-slate-500
              "
            >
              Seleziona nuovamente una camera
              per continuare.
            </p>

            <a
              href={`/hotel/${encodeURIComponent(
                hotelId
              )}?searchId=${encodeURIComponent(
                searchId ?? ""
              )}`}
              className="
                mt-8
                inline-flex
                rounded-full
                bg-[#F58220]
                px-7
                py-3.5
                text-sm
                font-semibold
                text-white
              "
            >
              Torna all&apos;hotel
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <HotelBookingPage
        searchId={searchId}
        hotelId={hotelId}
        rateId={rateId}
      />
    </>
  );
}