"use client";

import { Mail, MapPin } from "lucide-react";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function ContactIntro() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F58220]">
        SicilyTrip
      </span>
      <h1 className="mt-5 text-[44px] font-bold leading-[1.05] tracking-[-0.05em] text-[#0D2340] sm:text-[60px]">
        {isEnglish ? "Let’s talk about your journey" : "Parliamo del tuo viaggio"}
      </h1>
      <p className="mt-6 text-base leading-8 text-slate-500">
        {isEnglish
          ? "Write to us for information about your stay or for support in planning your experience in Sicily."
          : "Scrivici per informazioni sul soggiorno o per ricevere supporto nell’organizzazione della tua esperienza in Sicilia."}
      </p>

      <div className="mt-10 space-y-4">
        <a
          href="mailto:info@sicilytrip.it"
          className="flex items-center gap-4 rounded-2xl bg-white p-5 text-sm font-semibold text-[#0D2340]"
        >
          <Mail size={19} className="text-[#F58220]" />
          info@sicilytrip.it
        </a>
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 text-sm font-semibold text-[#0D2340]">
          <MapPin size={19} className="text-[#F58220]" />
          Palermo · {isEnglish ? "Sicily" : "Sicilia"}
        </div>
      </div>
    </div>
  );
}
