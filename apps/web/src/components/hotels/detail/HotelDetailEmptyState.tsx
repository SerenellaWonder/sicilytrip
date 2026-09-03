"use client";

import Link from "next/link";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function HotelDetailEmptyState() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen items-center justify-center bg-[#F7F5F1] px-5">
      <div className="text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F58220]">
          SicilyTrip Hotels
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#0D2340]">
          {isEnglish ? "Search unavailable" : "Ricerca non disponibile"}
        </h1>
        <p className="mt-4 max-w-md text-slate-500">
          {isEnglish
            ? "To view availability and rates, start from a hotel search."
            : "Per visualizzare disponibilità e tariffe è necessario partire da una ricerca hotel."}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#F58220] px-7 py-3.5 text-sm font-semibold text-white"
        >
          {isEnglish ? "Back to home" : "Torna alla home"}
        </Link>
      </div>
    </main>
  );
}
