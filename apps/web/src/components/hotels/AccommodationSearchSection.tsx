"use client";

import { Building2 } from "lucide-react";

import SearchBox from "@/components/hero/SearchBox";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function AccommodationSearchSection() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section
      id="accommodation-search"
      className="scroll-mt-[110px] bg-[#F2EEE7] px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0D2340] text-[#F58220]">
            <Building2 size={21} />
          </div>
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F58220]">
            SicilyTrip Stay
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em] text-[#0D2340] sm:text-4xl">
            {isEnglish ? "Find your accommodation in Sicily" : "Trova la tua struttura in Sicilia"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#0D2340]/55 sm:text-base">
            {isEnglish ? "Search real availability and rates without returning to the home page." : "Cerca disponibilità e tariffe reali senza tornare alla pagina iniziale."}
          </p>
        </div>
        <SearchBox />
      </div>
    </section>
  );
}
