import Header from "@/components/layout/header";
import ConciergeHotelSearch from "@/components/concierge/ConciergeHotelSearch";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const value = (key: string) =>
    typeof params[key] === "string" ? (params[key] as string) : "";
  return (
    <>
      <Header />
      <ConciergeHotelSearch
        destinationId={value("destinazione")}
        adults={value("adulti")}
        arrival={value("arrivo")}
        departure={value("partenza")}
      />
    </>
  );
}
