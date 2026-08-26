"use client";

import { useState } from "react";

import {
  Building2,
  Sparkles,
} from "lucide-react";

import ConciergeSearch from "@/components/concierge/ConciergeSearch";
import SearchBox from "@/components/hero/SearchBox";

export default function HeroSearch() {
  const [showHotelSearch, setShowHotelSearch] =
    useState(true);

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1380px]
      "
    >
      <div
        role="tablist"
        aria-label="Scegli come iniziare"
        className="
          relative
          z-40
          mx-auto
          mb-4
          grid
          w-[calc(100%-2rem)]
          max-w-[680px]
          grid-cols-2
          gap-1.5
          rounded-[20px]
          border
          border-white/70
          bg-white/95
          p-1.5
          shadow-[0_16px_45px_rgba(13,35,64,0.16)]
          backdrop-blur-xl
        "
      >
        <button
          type="button"
          role="tab"
          aria-selected={!showHotelSearch}
          onClick={() => setShowHotelSearch(false)}
          className={`
            flex
            min-h-14
            items-center
            justify-center
            gap-2
            rounded-[15px]
            px-3
            text-xs
            font-semibold
            transition-all
            duration-300
            sm:text-sm

            ${
              !showHotelSearch
                ? "bg-[#0D2340] text-white shadow-[0_8px_22px_rgba(13,35,64,0.20)]"
                : "text-[#0D2340]/60 hover:bg-[#0D2340]/[0.04] hover:text-[#0D2340]"
            }
          `}
        >
          <Sparkles size={17} className="shrink-0 text-[#F58220]" />
          <span>
            <span className="block">Lasciati ispirare</span>
            <span className="mt-0.5 hidden text-[10px] font-normal opacity-60 sm:block">
              Usa il Concierge
            </span>
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={showHotelSearch}
          onClick={() => setShowHotelSearch(true)}
          className={`
            flex
            min-h-14
            items-center
            justify-center
            gap-2
            rounded-[15px]
            px-3
            text-xs
            font-semibold
            transition-all
            duration-300
            sm:text-sm

            ${
              showHotelSearch
                ? "bg-[#F58220] text-white shadow-[0_8px_24px_rgba(245,130,32,0.28)]"
                : "text-[#0D2340] ring-1 ring-inset ring-[#F58220]/25 hover:bg-[#F58220]/[0.07]"
            }
          `}
        >
          <Building2 size={18} className="shrink-0" />
          <span>
            <span className="block">Cerca hotel</span>
            <span className="mt-0.5 hidden text-[10px] font-normal opacity-70 sm:block">
              Sai già dove andare?
            </span>
          </span>
        </button>
      </div>

      {/* CONCIERGE */}

      {!showHotelSearch && (
        <ConciergeSearch />
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
          <SearchBox />
        </div>
      )}
    </div>
  );
}
