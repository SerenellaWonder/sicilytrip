import Header from "@/components/layout/header";

import HotelBookingPage from "@/components/hotels/booking/HotelBookingPage";
import HotelBookingEmptyState from "@/components/hotels/booking/HotelBookingEmptyState";

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

        <HotelBookingEmptyState hotelId={hotelId} searchId={searchId} />
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
