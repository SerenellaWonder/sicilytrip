"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function HotelBookingEmptyState({ hotelId, searchId }: Readonly<{ hotelId: string; searchId?: string }>) {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen items-center justify-center bg-[#F7F5F1] px-5">
      <div className="text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F58220]">SicilyTrip Hotels</span>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#0D2340]">
          {isEnglish ? "Rate unavailable" : "Tariffa non disponibile"}
        </h1>
        <p className="mt-4 text-slate-500">
          {isEnglish ? "Select a room again to continue." : "Seleziona nuovamente una camera per continuare."}
        </p>
        <a href={`/hotel/${encodeURIComponent(hotelId)}?searchId=${encodeURIComponent(searchId ?? "")}`} className="mt-8 inline-flex rounded-full bg-[#F58220] px-7 py-3.5 text-sm font-semibold text-white">
          {isEnglish ? "Back to the hotel" : "Torna all’hotel"}
        </a>
      </div>
    </main>
  );
}
