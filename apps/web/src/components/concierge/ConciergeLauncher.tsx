"use client";

import { IconSparkles } from "@tabler/icons-react";
import { useConcierge } from "./ConciergeProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function ConciergeLauncher() {
  const { isOpen, toggleConcierge } = useConcierge();
  const { language } = useLanguage();

  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={toggleConcierge}
      aria-label={
        language === "en"
          ? "Open SicilyTrip Concierge"
          : "Apri SicilyTrip Concierge"
      }
      className="
        group
        fixed
        bottom-4
        right-4
        z-[80]

        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-full
        border
        border-white/30
        bg-[#F58220]

        text-white

        shadow-[0_14px_35px_rgba(7,24,45,0.25)]

        transition-all
        duration-300

        hover:-translate-y-1
        hover:bg-[#FF9238]

        sm:bottom-7
        sm:right-7
        sm:h-auto
        sm:w-auto
        sm:gap-3
        sm:border-white/15
        sm:bg-[#07182D]/95
        sm:py-3
        sm:pl-3
        sm:pr-5
        sm:shadow-[0_18px_50px_rgba(7,24,45,0.30)]
        sm:backdrop-blur-xl

        sm:hover:bg-[#07182D]
        sm:hover:shadow-[0_24px_60px_rgba(7,24,45,0.40)]
      "
    >
      <span
        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full

          text-white

          sm:h-11
          sm:w-11
          sm:bg-[#F58220]
          sm:shadow-[0_8px_22px_rgba(245,130,32,0.30)]
        "
      >
        <IconSparkles
          size={21}
          stroke={1.8}
        />

        <span
          className="
            absolute
            right-0
            top-0

            h-2.5
            w-2.5

            rounded-full
            border-2
            border-[#F58220]
            bg-white

            sm:border-[#07182D]
          "
        />
      </span>

      <span
        className="
          hidden
          text-left

          sm:block
        "
      >
        <span
          className="
            block
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#F58220]
          "
        >
          SicilyTrip
        </span>

        <span
          className="
            mt-0.5
            block
            text-sm
            font-semibold
          "
        >
          Concierge
        </span>
      </span>
    </button>
  );
}
