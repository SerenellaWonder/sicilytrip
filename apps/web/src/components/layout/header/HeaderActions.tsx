"use client";

import Link from "next/link";
import { IconSparkles, IconUserCircle } from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

type HeaderActionsProps = {
  scrolled: boolean;
};

export default function HeaderActions({
  scrolled,
}: HeaderActionsProps) {
  const { openConcierge } = useConcierge();
  const { language } = useLanguage();

  return (
    <div
      className="
        hidden
        items-center
        gap-3
        lg:flex
      "
    >
      <Link
        href="/area-clienti"
        className={`
          inline-flex
          h-12
          items-center
          gap-2
          rounded-full
          border
          px-4
          text-[13px]
          font-semibold
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-[#F58220]
          hover:text-[#F58220]

          ${
            scrolled
              ? "border-[#0D2340]/10 text-[#0D2340]"
              : "border-white/30 text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          }
        `}
      >
        <IconUserCircle size={18} stroke={1.7} />
        <span className="hidden xl:inline">
          {language === "it" ? "Area clienti" : "Customer area"}
        </span>
      </Link>

      <button
        type="button"
        onClick={() =>
          openConcierge(
            language === "it"
              ? "Aiutami a organizzare il mio viaggio in Sicilia"
              : "Help me plan my trip to Sicily"
          )
        }
        className={`
          group
          inline-flex
          h-12
          items-center
          gap-2.5
          rounded-full
          bg-[#F58220]
          px-6
          text-[13px]
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#E87415]
          xl:px-7

          ${
            scrolled
              ? `
                shadow-[0_10px_28px_rgba(245,130,32,0.22)]
              `
              : `
                border
                border-white/20
                shadow-[0_10px_30px_rgba(0,0,0,0.20)]
              `
          }
        `}
      >
        <IconSparkles
          size={17}
          stroke={1.7}
          className="
            transition-transform
            duration-300
            group-hover:rotate-12
          "
        />

        <span>{language === "it" ? "Organizza il viaggio" : "Plan your trip"}</span>
      </button>
    </div>
  );
}
