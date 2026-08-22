import Link from "next/link";

import Header from "@/components/layout/header";

import HotelDetailPage from "@/components/hotels/detail/HotelDetailPage";

export default async function HotelDetailRoute({
  params,
  searchParams,
}: {
  params: Promise<{
    hotelId: string;
  }>;

  searchParams: Promise<{
    searchId?: string;
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

  if (!searchId) {
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
              Ricerca non disponibile
            </h1>

            <p
              className="
                mt-4
                max-w-md
                text-slate-500
              "
            >
              Per visualizzare disponibilità e tariffe
              è necessario partire da una ricerca hotel.
            </p>

            <Link
              href="/"
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
              Torna alla home
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <HotelDetailPage
        searchId={searchId}
        hotelId={hotelId}
      />
    </>
  );
}
