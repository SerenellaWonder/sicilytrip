import Header from "@/components/layout/header";

import HotelResultsPage from "@/components/hotels/results/HotelResultsPage";
import HotelSearchEmptyState from "@/components/hotels/results/HotelSearchEmptyState";

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

        <HotelSearchEmptyState />
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
