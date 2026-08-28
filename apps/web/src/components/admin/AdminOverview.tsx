"use client";
import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  Boxes,
  Building2,
  CircleHelp,
  Compass,
  CreditCard,
  Hotel,
  MapPinned,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
type Summary = {
  bookings: Record<string, number>;
  articles: { total: number; published: number };
  faq: { total: number; published: number };
  payments: Record<string, number>;
  catalog: Record<
    "destinations" | "hotels" | "experiences" | "packages",
    { total: number; active: number }
  >;
};
export default function AdminOverview({ token }: { token: string }) {
  const [data, setData] = useState<Summary>();
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try {
      setData(
        await apiFetch<Summary>("/admin/summary", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Riepilogo non disponibile");
    }
  }, [token]);
  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);
  if (error) return <p className="text-red-600">{error}</p>;
  if (!data) return <p>Caricamento...</p>;
  const total = Object.values(data.bookings).reduce((a, b) => a + b, 0);
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card
        icon={<Hotel />}
        label="Prenotazioni"
        value={total}
        detail={`${data.bookings.CONFIRMED ?? 0} confermate`}
      />
      <Card
        icon={<BookOpen />}
        label="Journal"
        value={data.articles.total}
        detail={`${data.articles.published} pubblicati`}
      />
      <Card
        icon={<CircleHelp />}
        label="FAQ"
        value={data.faq.total}
        detail={`${data.faq.published} pubblicate`}
      />
      <Card
        icon={<CreditCard />}
        label="Pagamenti"
        value={Object.values(data.payments).reduce((a, b) => a + b, 0)}
        detail="Non ancora attivi"
      />
      <Card
        icon={<MapPinned />}
        label="Destinazioni"
        value={data.catalog.destinations.total}
        detail={`${data.catalog.destinations.active} attive`}
      />
      <Card
        icon={<Building2 />}
        label="Hotel"
        value={data.catalog.hotels.total}
        detail={`${data.catalog.hotels.active} attivi`}
      />
      <Card
        icon={<Compass />}
        label="Esperienze"
        value={data.catalog.experiences.total}
        detail={`${data.catalog.experiences.active} attive`}
      />
      <Card
        icon={<Boxes />}
        label="Pacchetti"
        value={data.catalog.packages.total}
        detail={`${data.catalog.packages.active} attivi`}
      />
    </div>
  );
}
function Card({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <article className="rounded-[24px] bg-white p-6">
      <div className="text-[#F58220]">{icon}</div>
      <span className="mt-5 block text-xs font-bold uppercase text-slate-400">
        {label}
      </span>
      <strong className="mt-1 block text-4xl text-[#0D2340]">{value}</strong>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </article>
  );
}
