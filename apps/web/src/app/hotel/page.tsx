import Link from "next/link";

import Header from "@/components/layout/header";

import HotelResultsPage from "@/components/hotels/results/HotelResultsPage";

export default async function HotelPage({
  searchParams,
}: {
  searchParams: Promise<{
    searchId?: string;
  }>;
}) {
  const params =
    await searchParams;

  const searchId =
    params.searchId;

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
              Inizia una nuova ricerca
            </h1>

            <p
              className="
                mt-4
                text-slate-500
              "
            >
              Seleziona destinazione,
              date e ospiti per trovare
              il tuo soggiorno.
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

      <HotelResultsPage
        searchId={searchId}
      />
    </>
  );
}
