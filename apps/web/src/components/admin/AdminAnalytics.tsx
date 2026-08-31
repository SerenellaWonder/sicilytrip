"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  BarChart3,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

type Analytics = {
  totalSearches: number;
  recentSearches: number;
  bookings: number;
  conversionRate: number;
  searchStatus: Record<string, number>;
  providers: Array<{ name: string; searches: number }>;
  destinations: Array<{ name: string; count: number }>;
};

export default function AdminAnalytics({ token }: { token: string }) {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setData(
        await apiFetch<Analytics>("/admin/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Analisi non disponibili",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  if (error)
    return (
      <p role="alert" className="text-sm text-red-600">
        {error}
      </p>
    );
  if (!data)
    return <p className="text-sm text-slate-500">Caricamento analisi…</p>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0D2340]">
            Analisi e profilazione
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Tendenze aggregate ricavate dall’utilizzo del portale.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="flex items-center gap-2 text-xs font-semibold text-[#0D2340]"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />{" "}
          Aggiorna
        </button>
      </div>
      <div className="mb-6 flex gap-3 rounded-[20px] border border-emerald-100 bg-emerald-50 p-5 text-sm leading-6 text-emerald-800">
        <ShieldCheck className="mt-0.5 shrink-0" size={19} />
        <p>
          I dati sono aggregati e non contengono nomi, email o informazioni
          identificative degli ospiti.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={<Search />}
          label="Ricerche totali"
          value={data.totalSearches}
          detail={`${data.recentSearches} negli ultimi 30 giorni`}
        />
        <Metric
          icon={<ShoppingBag />}
          label="Richieste booking"
          value={data.bookings}
          detail="Tentativi registrati"
        />
        <Metric
          icon={<TrendingUp />}
          label="Conversione"
          value={`${data.conversionRate}%`}
          detail="Booking rispetto alle ricerche"
        />
        <Metric
          icon={<Activity />}
          label="Ricerche completate"
          value={data.searchStatus.COMPLETED ?? 0}
          detail={`${data.searchStatus.FAILED ?? 0} non riuscite`}
        />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Ranking
          title="Destinazioni più cercate"
          empty="Le ricerche non sono ancora associate al catalogo destinazioni."
          items={data.destinations.map((item) => ({
            label: item.name,
            value: item.count,
          }))}
        />
        <Ranking
          title="Utilizzo fornitori"
          empty="Nessuna ricerca registrata."
          items={data.providers.map((item) => ({
            label: item.name,
            value: item.searches,
          }))}
        />
      </div>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: number | string;
  detail: string;
}) {
  return (
    <article className="rounded-[24px] bg-white p-6">
      <div className="text-[#F58220]">{icon}</div>
      <span className="mt-5 block text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400">
        {label}
      </span>
      <strong className="mt-1 block text-3xl text-[#0D2340]">{value}</strong>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </article>
  );
}

function Ranking({
  title,
  items,
  empty,
}: {
  title: string;
  items: Array<{ label: string; value: number }>;
  empty: string;
}) {
  const maximum = Math.max(...items.map((item) => item.value), 1);
  return (
    <section className="rounded-[24px] bg-white p-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="text-[#F58220]" size={20} />
        <h3 className="font-bold text-[#0D2340]">{title}</h3>
      </div>
      {!items.length ? (
        <p className="mt-5 text-sm leading-6 text-slate-500">{empty}</p>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex justify-between gap-4 text-xs">
                <span className="truncate font-semibold text-[#0D2340]">
                  {item.label}
                </span>
                <strong className="text-[#F58220]">{item.value}</strong>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#F7F5F1]">
                <div
                  className="h-full rounded-full bg-[#F58220]"
                  style={{
                    width: `${Math.max((item.value / maximum) * 100, 4)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
