"use client";

import { useEffect, useState } from "react";

import {
  IconArrowRight,
  IconCalendarEvent,
  IconHotelService,
  IconMapPin,
  IconSparkles,
  IconX,
} from "@tabler/icons-react";

import { useConcierge } from "./ConciergeProvider";

/* ============================================================
   RANDOM SUGGESTIONS
============================================================ */

const randomSuggestions = [
  {
    label: "4 notti a Taormina",
    icon: IconMapPin,
  },
  {
    label: "Weekend sull'Etna",
    icon: IconCalendarEvent,
  },
  {
    label: "Hotel sul mare",
    icon: IconHotelService,
  },
  {
    label: "Weekend romantico",
    icon: IconSparkles,
  },
  {
    label: "Sicilia con bambini",
    icon: IconMapPin,
  },
  {
    label: "Tour della Sicilia orientale",
    icon: IconMapPin,
  },
  {
    label: "3 giorni a Palermo",
    icon: IconCalendarEvent,
  },
  {
    label: "Resort con piscina",
    icon: IconHotelService,
  },
  {
    label: "Vacanza mare e relax",
    icon: IconHotelService,
  },
  {
    label: "Borghi della Val di Noto",
    icon: IconMapPin,
  },
  {
    label: "Sicilia enogastronomica",
    icon: IconSparkles,
  },
  {
    label: "Una settimana in Sicilia",
    icon: IconCalendarEvent,
  },
  {
    label: "Esperienze sull'Etna",
    icon: IconSparkles,
  },
  {
    label: "Hotel vicino alla spiaggia",
    icon: IconHotelService,
  },
  {
    label: "Sicilia occidentale",
    icon: IconMapPin,
  },
];

/* ============================================================
   FIXED SUGGESTION
============================================================ */

const fixedSuggestion = {
  label: "Crea un viaggio per me",
  icon: IconSparkles,
};

/* ============================================================
   INITIAL SUGGESTIONS

   Devono essere deterministiche durante il primo render
   per evitare hydration mismatch tra server e client.
============================================================ */

const initialSuggestions = [
  randomSuggestions[0],
  randomSuggestions[1],
  randomSuggestions[2],
  fixedSuggestion,
];

/* ============================================================
   COMPONENT
============================================================ */

export default function ConciergeSearch() {
  const [query, setQuery] = useState("");

  const [suggestions, setSuggestions] =
    useState(initialSuggestions);

  const { openConcierge } = useConcierge();

  /* ==========================================================
     RANDOMIZE AFTER MOUNT
  ========================================================== */

  useEffect(() => {
    const shuffled = [...randomSuggestions];

    /*
     * Fisher-Yates shuffle.
     *
     * Lo facciamo nel useEffect, quindi soltanto sul client
     * dopo l'hydration.
     */

    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(
        Math.random() * (i + 1)
      );

      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }

    setSuggestions([
      ...shuffled.slice(0, 3),
      fixedSuggestion,
    ]);
  }, []);

  /* ==========================================================
     SUBMIT
  ========================================================== */

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const cleanQuery = query.trim();

    if (!cleanQuery) {
      openConcierge();
      return;
    }

    openConcierge(cleanQuery);
  }

  /* ==========================================================
     SELECT SUGGESTION
  ========================================================== */

  function selectSuggestion(value: string) {
    setQuery(value);

    openConcierge(value);
  }

  /* ==========================================================
     CLEAR SEARCH
  ========================================================== */

  function clearSearch() {
    setQuery("");
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      className="
        relative
        z-30
        mx-auto
        w-full
        max-w-[1120px]
        px-4
        sm:px-6
      "
    >
      <div
        className="
          rounded-[24px]
          border
          border-white/60
          bg-white/95
          p-2.5
          shadow-[0_22px_60px_rgba(13,35,64,0.20)]
          backdrop-blur-xl

          sm:rounded-[32px]
          sm:p-4
        "
      >
        {/* ===================================================
            MOBILE LABEL
        =================================================== */}

        <button
          type="button"
          onClick={() => openConcierge()}
          className="
            mb-2
            flex
            items-center
            gap-2
            px-2
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.20em]
            text-[#0D2340]/45

            sm:hidden
          "
        >
          <IconSparkles
            size={13}
            stroke={1.8}
            className="text-[#F58220]"
          />

          SicilyTrip Concierge
        </button>

        {/* ===================================================
            SEARCH
        =================================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            flex
            items-center
            rounded-[18px]
            border
            border-[#0D2340]/10
            bg-[#F8F8F5]
            p-1
            transition-all
            duration-300

            focus-within:border-[#F58220]/50
            focus-within:bg-white
            focus-within:shadow-[0_8px_30px_rgba(13,35,64,0.08)]

            sm:rounded-full
            sm:p-1.5
          "
        >
          {/* =================================================
              CONCIERGE ICON
          ================================================= */}

          <button
            type="button"
            onClick={() => openConcierge()}
            aria-label="Apri SicilyTrip Concierge"
            className="
              ml-1
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#0D2340]
              text-[#F58220]
              shadow-[0_6px_18px_rgba(13,35,64,0.16)]
              transition-all
              duration-300

              hover:scale-105
              hover:bg-[#07182D]

              sm:ml-2
              sm:h-12
              sm:w-12
            "
          >
            <IconSparkles
              size={19}
              stroke={1.8}
            />
          </button>

          {/* =================================================
              INPUT
          ================================================= */}

          <input
            type="text"
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Dove vuoi andare?"
            aria-label="Chiedi al SicilyTrip Concierge"
            className="
              min-w-0
              flex-1
              bg-transparent
              px-3
              py-3
              text-[14px]
              font-medium
              text-[#0D2340]
              outline-none

              placeholder:font-normal
              placeholder:text-slate-400

              sm:px-5
              sm:py-4
              sm:text-base
              sm:placeholder:text-[15px]

              lg:text-lg
            "
          />

          {/* =================================================
              CLEAR
          ================================================= */}

          {query.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Cancella ricerca"
              title="Cancella"
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                text-[#0D2340]/35
                transition-all
                duration-200

                hover:bg-[#0D2340]/[0.06]
                hover:text-[#0D2340]/70

                sm:mr-1
                sm:h-9
                sm:w-9
              "
            >
              <IconX
                size={17}
                stroke={1.8}
              />
            </button>
          )}

          {/* =================================================
              SUBMIT
          ================================================= */}

          <button
            type="submit"
            aria-label="Chiedi al Concierge"
            className="
              group
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#F58220]
              text-white
              shadow-[0_8px_25px_rgba(245,130,32,0.25)]
              transition-all
              duration-300

              hover:scale-105
              hover:bg-[#FF9238]

              sm:h-12
              sm:w-12
            "
          >
            <IconArrowRight
              size={18}
              stroke={1.8}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            />
          </button>
        </form>

        {/* ===================================================
            RANDOM QUICK PROMPTS
        =================================================== */}

        <div
          className="
            mt-2.5
            flex
            gap-2
            overflow-x-auto
            px-1
            pb-1

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            sm:mt-3
            sm:flex-wrap
            sm:justify-center
            sm:overflow-visible
          "
        >
          {suggestions.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  selectSuggestion(item.label)
                }
                className="
                  group
                  inline-flex
                  shrink-0
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-[#0D2340]/10
                  bg-white
                  px-3
                  py-2
                  text-[11px]
                  font-medium
                  text-[#0D2340]/70
                  transition-all
                  duration-300

                  hover:border-[#F58220]/40
                  hover:bg-[#F58220]/5
                  hover:text-[#0D2340]

                  sm:gap-2
                  sm:px-4
                  sm:py-2.5
                  sm:text-sm
                "
              >
                <Icon
                  size={14}
                  stroke={1.6}
                  className="
                    text-[#F58220]
                    sm:h-4
                    sm:w-4
                  "
                />

                {item.label}
              </button>
            );
          })}
        </div>

        {/* ===================================================
            DESKTOP SIGNATURE
        =================================================== */}

        <button
          type="button"
          onClick={() => openConcierge()}
          className="
            mx-auto
            mt-3
            hidden
            items-center
            justify-center
            gap-2
            pb-1
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#0D2340]/35
            transition-colors
            duration-300

            hover:text-[#0D2340]/60

            sm:flex
          "
        >
          <IconSparkles
            size={13}
            stroke={1.7}
            className="text-[#F58220]"
          />

          SicilyTrip Concierge
        </button>
      </div>
    </div>
  );
}