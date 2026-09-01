import Header from "@/components/layout/header";

import HotelDetailPage from "@/components/hotels/detail/HotelDetailPage";
import HotelDetailEmptyState from "@/components/hotels/detail/HotelDetailEmptyState";

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

        <HotelDetailEmptyState />
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
