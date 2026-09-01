"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

type LanguageSwitcherProps = {
  solidHeader: boolean;
};

export default function LanguageSwitcher({
  solidHeader,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      aria-label={language === "it" ? "Seleziona lingua" : "Select language"}
      className={`
        hidden h-10 items-center rounded-full border p-1 lg:flex
        ${
          solidHeader
            ? "border-[#0D2340]/10 bg-[#0D2340]/[0.04]"
            : "border-white/25 bg-white/10 backdrop-blur-md"
        }
      `}
    >
      {(["it", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          aria-pressed={language === item}
          className={`
            flex h-8 min-w-9 items-center justify-center rounded-full px-2
            text-[11px] font-bold uppercase tracking-[0.12em] transition-all
            ${
              language === item
                ? "bg-[#F58220] text-white shadow-sm"
                : solidHeader
                  ? "text-[#0D2340]/60 hover:text-[#F58220]"
                  : "text-white/75 hover:text-white"
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
