"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Heart, RefreshCw, UsersRound } from "lucide-react";
import { apiFetch } from "@/lib/api";

type WishlistSummary = {
  total: number;
  customers: number;
  hotels: Array<{
    hotelId: string;
    hotelName: string;
    image: string | null;
    isActive: boolean;
    saves: number;
    lastSavedAt: string | null;
  }>;
};

export default function AdminWishlists({ token }: { token: string }) {
  const [data, setData] = useState<WishlistSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setData(
        await apiFetch<WishlistSummary>("/admin/wishlists", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Wishlist non disponibili",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <SummaryCard
          icon={<Heart size={20} />}
          label="Preferiti salvati"
          value={data?.total ?? 0}
        />
        <SummaryCard
          icon={<UsersRound size={20} />}
          label="Clienti con wishlist"
          value={data?.customers ?? 0}
        />
      </div>

      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0D2340]">
            Hotel più desiderati
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Classifica aggregata, senza dati identificativi dei clienti.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="flex shrink-0 items-center gap-2 text-xs font-semibold text-[#0D2340]"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Aggiorna
        </button>
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : !data || data.hotels.length === 0 ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Nessun hotel è stato ancora aggiunto alle wishlist.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.hotels.map((hotel, index) => (
            <article
              key={hotel.hotelId}
              className="grid grid-cols-[76px_1fr_auto] items-center gap-4 rounded-[24px] bg-white p-4"
            >
              <div className="relative h-[76px] overflow-hidden rounded-2xl bg-[#0D2340]/[0.06]">
                {hotel.image ? (
                  <Image
                    src={hotel.image}
                    alt=""
                    fill
                    sizes="76px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#F58220]">
                    <Heart size={22} />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F58220]">
                  #{index + 1} · {hotel.isActive ? "Attivo" : "Non attivo"}
                </span>
                <h3 className="mt-1 truncate font-bold text-[#0D2340]">
                  {hotel.hotelName}
                </h3>
                {hotel.lastSavedAt && (
                  <p className="mt-1 text-xs text-slate-400">
                    Ultimo salvataggio {dateTime(hotel.lastSavedAt)}
                  </p>
                )}
              </div>
              <div className="rounded-2xl bg-[#F58220]/10 px-4 py-3 text-center text-[#F58220]">
                <strong className="block text-xl">{hotel.saves}</strong>
                <span className="text-[8px] font-bold uppercase">
                  salvataggi
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[24px] bg-[#0D2340] p-6 text-white">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[#F58220]">
        {icon}
      </div>
      <div>
        <strong className="text-3xl">{value}</strong>
        <span className="block text-[9px] font-bold uppercase tracking-[0.13em] text-white/45">
          {label}
        </span>
      </div>
    </div>
  );
}

function dateTime(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
