"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

const SEARCH_TTL_MS = 20 * 60 * 1000;

type StoredSearch = {
  createdAt?: number;
  expiresAt?: number;
};

export default function SearchExpiryNotice({
  searchId,
  onExpiredChange,
}: {
  searchId: string;
  onExpiredChange?: (expired: boolean) => void;
}) {
  const [remainingSeconds, setRemainingSeconds] =
    useState<number | null>(null);

  useEffect(() => {
    const storageKey = `hotel-search:${searchId}`;
    let expiresAt = Date.now() + SEARCH_TTL_MS;

    try {
      const stored = sessionStorage.getItem(storageKey);
      const parsed = stored
        ? (JSON.parse(stored) as StoredSearch)
        : null;

      expiresAt =
        parsed?.expiresAt ??
        (parsed?.createdAt
          ? parsed.createdAt + SEARCH_TTL_MS
          : expiresAt);

      if (stored && !parsed?.expiresAt) {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            ...parsed,
            expiresAt,
          })
        );
      }
    } catch (error) {
      console.error(
        "Unable to restore hotel search expiry:",
        error
      );
    }

    function updateRemainingTime() {
      const next = Math.max(
        0,
        Math.ceil((expiresAt - Date.now()) / 1000)
      );

      setRemainingSeconds(next);
      onExpiredChange?.(next === 0);
    }

    updateRemainingTime();
    const interval = window.setInterval(
      updateRemainingTime,
      1000
    );

    return () => window.clearInterval(interval);
  }, [searchId, onExpiredChange]);

  if (remainingSeconds == null) {
    return null;
  }

  const expired = remainingSeconds === 0;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div
      role={expired ? "alert" : "status"}
      className={`mt-6 flex flex-col gap-3 rounded-2xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
        expired
          ? "border-red-200 bg-red-50 text-red-800"
          : remainingSeconds <= 5 * 60
            ? "border-amber-200 bg-amber-50 text-amber-900"
            : "border-[#0D2340]/10 bg-white text-[#0D2340]"
      }`}
    >
      <div className="flex items-center gap-3">
        <Clock3 size={18} className="shrink-0" />
        <div>
          <p className="text-sm font-semibold">
            {expired
              ? "Questa ricerca è scaduta"
              : "Disponibilità riservata ancora per"}
          </p>
          {!expired && (
            <p className="mt-0.5 text-xs opacity-70">
              {minutes}:{seconds.toString().padStart(2, "0")} minuti
            </p>
          )}
        </div>
      </div>

      {expired && (
        <a
          href="/"
          className="text-xs font-bold uppercase tracking-[0.12em] underline"
        >
          Effettua una nuova ricerca
        </a>
      )}
    </div>
  );
}
