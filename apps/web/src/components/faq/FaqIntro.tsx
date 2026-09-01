"use client";

import { HelpCircle } from "lucide-react";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function FaqIntro() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 text-[#F58220]">
        <HelpCircle size={20} />
        <span className="text-[10px] font-bold uppercase tracking-[0.24em]">
          {isEnglish ? "Help centre" : "Centro assistenza"}
        </span>
      </div>

      <h1 className="mt-6 text-[44px] font-bold leading-[1.05] tracking-[-0.05em] text-[#0D2340] sm:text-[60px] lg:text-[72px]">
        {isEnglish ? "Frequently asked questions" : "Domande frequenti"}
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500">
        {isEnglish
          ? "Everything you need to know to search for a stay, check a rate and continue with confidence."
          : "Tutto ciò che serve sapere per cercare un soggiorno, controllare una tariffa e procedere con tranquillità."}
      </p>
    </div>
  );
}
