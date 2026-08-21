"use client";

import { useState } from "react";

import {
  Building2,
  Sparkles,
  X,
} from "lucide-react";

import ConciergeSearch from "@/components/concierge/ConciergeSearch";
import SearchBox from "@/components/hero/SearchBox";

export default function HeroSearch() {
  const [showHotelSearch, setShowHotelSearch] =
    useState(false);

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1380px]
      "
    >
      {/* CONCIERGE */}

      {!showHotelSearch && (
        <>
          <ConciergeSearch />

          <div
            className="
              mt-4
              flex
              justify-center
            "
          >
            <button
              type="button"
              onClick={() =>
                setShowHotelSearch(true)
              }
              className="
                group
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-[#0D2340]/10
                bg-white
                px-5
                py-2.5
                text-[12px]
                font-semibold
                text-[#0D2340]/65
                shadow-[0_8px_25px_rgba(13,35,64,0.06)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-[#F58220]/30
                hover:text-[#0D2340]
                hover:shadow-[0_12px_30px_rgba(13,35,64,0.10)]
              "
            >
              <Building2
                size={16}
                strokeWidth={1.7}
                className="text-[#F58220]"
              />

              <span>
                Sai già dove andare?
              </span>

              <span className="text-[#F58220]">
                Cerca hotel
              </span>
            </button>
          </div>
        </>
      )}

      {/* HOTEL SEARCH */}

      {showHotelSearch && (
        <div
          className="
            mx-auto
            max-w-[1240px]
            px-4
            sm:px-6
          "
        >
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
              px-1
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Building2
                size={16}
                strokeWidth={1.7}
                className="text-[#F58220]"
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#0D2340]/45
                "
              >
                Ricerca hotel
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowHotelSearch(false)
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                px-3
                py-2
                text-[11px]
                font-semibold
                text-[#0D2340]/50
                transition-colors

                hover:bg-[#0D2340]/[0.05]
                hover:text-[#0D2340]
              "
            >
              <Sparkles
                size={14}
                strokeWidth={1.7}
                className="text-[#F58220]"
              />

              Usa il Concierge

              <X
                size={14}
                strokeWidth={1.7}
              />
            </button>
          </div>

          <SearchBox />
        </div>
      )}
    </div>
  );
}