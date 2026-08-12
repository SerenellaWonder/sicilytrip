"use client";

import { useState } from "react";
import Link from "next/link";

import {
  IconArrowUpRight,
  IconBeach,
  IconBuildingMonument,
  IconGlass,
  IconMountain,
  IconHeart,
  IconSparkles,
} from "@tabler/icons-react";

type Mood = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  destinations: string[];
  icon: React.ElementType;
};

const moods: Mood[] = [
  {
    id: "mare",
    number: "01",
    title: "Mare",
    subtitle: "Calette, isole e Mediterraneo",
    description:
      "Acque trasparenti, baie nascoste e giornate che seguono soltanto il ritmo del mare.",
    destinations: [
      "Isole Eolie",
      "Taormina",
      "Cefalù",
      "Siracusa",
    ],
    icon: IconBeach,
  },
  {
    id: "cultura",
    number: "02",
    title: "Cultura",
    subtitle: "Millenni di storia",
    description:
      "Templi greci, città barocche, teatri antichi e architetture nate dall'incontro di civiltà diverse.",
    destinations: [
      "Palermo",
      "Agrigento",
      "Siracusa",
      "Val di Noto",
    ],
    icon: IconBuildingMonument,
  },
  {
    id: "gusto",
    number: "03",
    title: "Gusto",
    subtitle: "La Sicilia a tavola",
    description:
      "Cantine, mercati, cucina d'autore e sapori locali per scoprire l'isola attraverso ciò che produce.",
    destinations: [
      "Palermo",
      "Etna",
      "Ragusa",
      "Val di Noto",
    ],
    icon: IconGlass,
  },
  {
    id: "natura",
    number: "04",
    title: "Natura",
    subtitle: "Vulcani e paesaggi",
    description:
      "Camminare sul vulcano, navigare tra le isole e attraversare riserve e paesaggi ancora autentici.",
    destinations: [
      "Etna",
      "Isole Eolie",
      "Ragusa",
      "Cefalù",
    ],
    icon: IconMountain,
  },
  {
    id: "romanticismo",
    number: "05",
    title: "Romanticismo",
    subtitle: "Luoghi da vivere in due",
    description:
      "Boutique hotel, terrazze sul mare, tramonti e piccoli borghi per un viaggio costruito intorno a voi.",
    destinations: [
      "Taormina",
      "Noto",
      "Isole Eolie",
      "Ortigia",
    ],
    icon: IconHeart,
  },
];

export default function TravelMood() {
  const [activeId, setActiveId] =
    useState<string>("mare");

  const active =
    moods.find((mood) => mood.id === activeId) ??
    moods[0];

  const ActiveIcon = active.icon;

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        lg:py-32
      "
    >
      {/* BACKGROUND DECORATION */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[300px]
          top-[80px]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#F58220]/[0.045]
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1500px]
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* ===================================================
            INTRO
        =================================================== */}

        <div
          className="
            grid
            gap-12
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-20
            xl:gap-28
          "
        >
          {/* LEFT */}

          <div>
            <div
              className="
                flex
                items-center
                gap-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.30em]
                text-[#F58220]
                sm:text-xs
              "
            >
              <span className="h-px w-9 bg-[#F58220]" />

              Trova la tua Sicilia
            </div>

            <h2
              className="
                mt-5
                max-w-[620px]
                text-[42px]
                font-bold
                leading-[1.02]
                tracking-[-0.045em]
                text-[#0D2340]
                sm:text-[52px]
                lg:text-[60px]
                xl:text-[66px]
              "
            >
              Che Sicilia
              <br />

              <span className="text-[#0D2340]/35">
                stai cercando?
              </span>
            </h2>

            <p
              className="
                mt-7
                max-w-[510px]
                text-[15px]
                leading-8
                text-[#0D2340]/55
                sm:text-[17px]
              "
            >
              Non esiste un solo modo di vivere l&apos;isola.
              Parti da quello che ami e lascia che SicilyTrip
              ti porti nei luoghi giusti.
            </p>

            {/* ACTIVE MOOD DESKTOP */}

            <div
              className="
                mt-12
                hidden
                rounded-[30px]
                bg-[#07182D]
                p-8
                text-white
                lg:block
                xl:p-9
              "
            >
              <div
                className="
                  flex
                  items-start
                  justify-between
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F58220]
                  "
                >
                  <ActiveIcon
                    size={22}
                    stroke={1.6}
                  />
                </div>

                <span
                  className="
                    text-[10px]
                    font-semibold
                    tracking-[0.20em]
                    text-white/25
                  "
                >
                  {active.number}
                </span>
              </div>

              <div
                key={active.id}
                className="mood-content"
              >
                <p
                  className="
                    mt-7
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#F58220]
                  "
                >
                  {active.subtitle}
                </p>

                <h3
                  className="
                    mt-3
                    text-[36px]
                    font-bold
                    tracking-[-0.04em]
                  "
                >
                  {active.title}
                </h3>

                <p
                  className="
                    mt-4
                    max-w-[420px]
                    text-[14px]
                    leading-7
                    text-white/55
                  "
                >
                  {active.description}
                </p>

                <div
                  className="
                    mt-7
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {active.destinations.map(
                    (destination) => (
                      <span
                        key={destination}
                        className="
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.05]
                          px-4
                          py-2
                          text-[10px]
                          font-semibold
                          text-white/70
                        "
                      >
                        {destination}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              MOOD SELECTOR
          ================================================= */}

          <div
            className="
              border-t
              border-[#0D2340]/10
            "
          >
            {moods.map((mood) => {
              const Icon = mood.icon;
              const isActive =
                mood.id === activeId;

              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() =>
                    setActiveId(mood.id)
                  }
                  className="
                    group
                    relative
                    w-full
                    border-b
                    border-[#0D2340]/10
                    py-6
                    text-left
                    sm:py-7
                  "
                >
                  {/* ACTIVE BACKGROUND */}

                  <span
                    className={`
                      absolute
                      inset-y-0
                      left-0
                      transition-all
                      duration-500

                      ${
                        isActive
                          ? "w-full bg-[#F7F3EC]"
                          : "w-0 bg-[#F7F3EC] group-hover:w-full"
                      }
                    `}
                  />

                  <div
                    className="
                      relative
                      z-10
                      grid
                      grid-cols-[42px_1fr_auto]
                      items-center
                      gap-4
                      px-3
                      sm:grid-cols-[50px_1fr_170px_auto]
                      sm:gap-5
                      sm:px-5
                    "
                  >
                    {/* NUMBER */}

                    <span
                      className={`
                        text-[10px]
                        font-semibold
                        tracking-[0.15em]
                        transition-colors
                        duration-300

                        ${
                          isActive
                            ? "text-[#F58220]"
                            : "text-[#0D2340]/25"
                        }
                      `}
                    >
                      {mood.number}
                    </span>

                    {/* TITLE */}

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >
                      <span
                        className={`
                          hidden
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          transition-all
                          duration-300
                          sm:flex

                          ${
                            isActive
                              ? `
                                bg-[#F58220]
                                text-white
                              `
                              : `
                                bg-[#0D2340]/[0.05]
                                text-[#0D2340]/45
                                group-hover:bg-[#0D2340]
                                group-hover:text-white
                              `
                          }
                        `}
                      >
                        <Icon
                          size={18}
                          stroke={1.6}
                        />
                      </span>

                      <h3
                        className={`
                          text-[28px]
                          font-bold
                          tracking-[-0.035em]
                          transition-colors
                          duration-300
                          sm:text-[32px]
                          lg:text-[36px]

                          ${
                            isActive
                              ? "text-[#0D2340]"
                              : "text-[#0D2340]/55"
                          }
                        `}
                      >
                        {mood.title}
                      </h3>
                    </div>

                    {/* SUBTITLE */}

                    <span
                      className="
                        hidden
                        text-[11px]
                        font-medium
                        text-[#0D2340]/40
                        sm:block
                      "
                    >
                      {mood.subtitle}
                    </span>

                    {/* ARROW */}

                    <span
                      className={`
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                              rotate-45
                              border-[#F58220]
                              bg-[#F58220]
                              text-white
                            `
                            : `
                              border-[#0D2340]/10
                              text-[#0D2340]/45
                              group-hover:border-[#0D2340]
                              group-hover:bg-[#0D2340]
                              group-hover:text-white
                            `
                        }
                      `}
                    >
                      <IconArrowUpRight
                        size={17}
                        stroke={1.7}
                      />
                    </span>
                  </div>
                </button>
              );
            })}

            {/* MOBILE ACTIVE CONTENT */}

            <div
              className="
                mt-7
                rounded-[28px]
                bg-[#07182D]
                p-6
                text-white
                lg:hidden
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F58220]
                  "
                >
                  <ActiveIcon
                    size={19}
                    stroke={1.6}
                  />
                </span>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.20em]
                      text-[#F58220]
                    "
                  >
                    {active.subtitle}
                  </p>

                  <h3
                    className="
                      mt-1
                      text-[28px]
                      font-bold
                    "
                  >
                    {active.title}
                  </h3>
                </div>
              </div>

              <p
                className="
                  mt-5
                  text-[13px]
                  leading-7
                  text-white/55
                "
              >
                {active.description}
              </p>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {active.destinations.map(
                  (destination) => (
                    <span
                      key={destination}
                      className="
                        rounded-full
                        border
                        border-white/10
                        px-3
                        py-2
                        text-[9px]
                        text-white/65
                      "
                    >
                      {destination}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            CONCIERGE CTA
        =================================================== */}

        <div
          className="
            mt-20
            overflow-hidden
            rounded-[32px]
            bg-[#F7F3EC]
            px-6
            py-8
            sm:px-8
            lg:mt-24
            lg:flex
            lg:items-center
            lg:justify-between
            lg:px-10
            lg:py-9
          "
        >
          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <span
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F58220]
                text-white
              "
            >
              <IconSparkles
                size={19}
                stroke={1.7}
              />
            </span>

            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.20em]
                  text-[#F58220]
                "
              >
                SicilyTrip Concierge
              </p>

              <h3
                className="
                  mt-2
                  text-[24px]
                  font-bold
                  tracking-[-0.035em]
                  text-[#0D2340]
                  sm:text-[28px]
                "
              >
                Non sai da dove iniziare?
              </h3>

              <p
                className="
                  mt-2
                  max-w-[650px]
                  text-[13px]
                  leading-6
                  text-[#0D2340]/50
                "
              >
                Raccontaci che viaggio immagini. Ti aiuteremo
                a trovare destinazioni, soggiorni ed esperienze
                adatte a te.
              </p>
            </div>
          </div>

          <Link
            href="/concierge"
            className="
              group
              mt-7
              inline-flex
              shrink-0
              items-center
              gap-3
              rounded-full
              bg-[#0D2340]
              px-6
              py-3.5
              text-[12px]
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#F58220]
              lg:mt-0
              lg:ml-10
            "
          >
            Crea il mio viaggio

            <IconArrowUpRight
              size={17}
              stroke={1.8}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes moodContentIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mood-content {
          animation: moodContentIn 350ms ease-out;
        }
      `}</style>
    </section>
  );
}