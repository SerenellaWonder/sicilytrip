"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  IconArrowUpRight,
  IconMapPin,
} from "@tabler/icons-react";

import {
  destinationCatalog,
  destinationMacroAreas,
  type DestinationMacroArea,
} from "@/data/destinations";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const destinations = destinationCatalog;

export default function DestinationShowcase() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [macroArea, setMacroArea] =
    useState<DestinationMacroArea>("Sicilia Occidentale");
  const [province, setProvince] = useState("Tutte");
  const [activeId, setActiveId] = useState("palermo");

  const provinces = Array.from(
    new Set(
      destinations
        .filter(destination => destination.macroArea === macroArea)
        .map(destination => destination.province)
    )
  );

  const filteredDestinations = destinations.filter(
    destination =>
      destination.macroArea === macroArea &&
      (province === "Tutte" || destination.province === province)
  );

  const active =
    filteredDestinations.find(
      (destination) => destination.id === activeId
    ) ?? filteredDestinations[0];

  function selectMacroArea(nextMacroArea: DestinationMacroArea) {
    setMacroArea(nextMacroArea);
    setProvince("Tutte");
    setActiveId(
      destinations.find(
        destination => destination.macroArea === nextMacroArea
      )?.id ?? "palermo"
    );
  }

  function selectProvince(nextProvince: string) {
    setProvince(nextProvince);
    setActiveId(
      destinations.find(
        destination =>
          destination.macroArea === macroArea &&
          (nextProvince === "Tutte" || destination.province === nextProvince)
      )?.id ?? "palermo"
    );
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F7F3EC]
        py-24
        lg:py-32
        xl:py-36
      "
    >
      <div
        className="
          mx-auto
          max-w-[1500px]
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            grid
            gap-8
            border-b
            border-[#0D2340]/10
            pb-14
            lg:grid-cols-[minmax(0,1fr)_420px]
            lg:items-end
            lg:gap-20
            lg:pb-20
          "
        >
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

              {isEnglish ? "Explore the island" : "Esplora l’isola"}
            </div>

            <h2
              className="
                mt-5
                max-w-[850px]
                text-[42px]
                font-bold
                leading-[1.01]
                tracking-[-0.05em]
                text-[#0D2340]
                sm:text-[52px]
                lg:text-[60px]
                xl:text-[68px]
              "
            >
              {isEnglish ? "Regions to discover." : "Territori da scoprire."}
              <br />

              <span className="text-[#0D2340]/35">
                {isEnglish ? "One Sicily, endless destinations." : "Una Sicilia, infinite mete."}
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[420px]
              text-[15px]
              leading-8
              text-[#0D2340]/55
              sm:text-[17px]
            "
          >
            {isEnglish
              ? "From the urban character of Palermo and Catania to the islands, the volcano and Baroque towns. Every destination reveals a different side of Sicily."
              : "Dal carattere urbano di Palermo e Catania alle isole, al vulcano e alle città barocche. Ogni destinazione racconta un volto diverso della Sicilia."}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3" aria-label={isEnglish ? "Filter by region" : "Filtra per macroarea"}>
          {destinationMacroAreas.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => selectMacroArea(item)}
              className={`rounded-full border px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                macroArea === item
                  ? "border-[#F58220] bg-[#F58220] text-white"
                  : "border-[#0D2340]/10 bg-white text-[#0D2340]/55 hover:border-[#F58220] hover:text-[#F58220]"
              }`}
            >
              {isEnglish
                ? item === "Sicilia Occidentale" ? "Western Sicily" : "Eastern Sicily"
                : item}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2" aria-label={isEnglish ? "Filter by province" : "Filtra per provincia"}>
          {["Tutte", ...provinces].map(item => (
            <button
              key={item}
              type="button"
              onClick={() => selectProvince(item)}
              className={`rounded-full px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] transition ${
                province === item
                  ? "bg-[#0D2340] text-white"
                  : "bg-[#0D2340]/[0.05] text-[#0D2340]/50 hover:text-[#0D2340]"
              }`}
            >
              {isEnglish && item === "Tutte" ? "All" : item}
            </button>
          ))}
        </div>

        {/* =====================================================
            DESKTOP
        ===================================================== */}

        <div
          className="
            mt-16
            hidden
            grid-cols-[minmax(430px,0.85fr)_minmax(0,1.15fr)]
            gap-16
            lg:grid
            xl:gap-24
          "
        >
          {/* =================================================
              DESTINATION LIST
          ================================================= */}

          <div className="border-t border-[#0D2340]/10">
            {filteredDestinations.map((destination) => {
              const activeDestination =
                destination.id === activeId;

              return (
                <button
                  key={destination.id}
                  type="button"
                  onMouseEnter={() =>
                    setActiveId(destination.id)
                  }
                  onFocus={() =>
                    setActiveId(destination.id)
                  }
                  onClick={() =>
                    setActiveId(destination.id)
                  }
                  className="
                    group
                    relative
                    block
                    w-full
                    border-b
                    border-[#0D2340]/10
                    py-[18px]
                    text-left
                  "
                >
                  {/* ACTIVE LINE */}

                  <span
                    className={`
                      absolute
                      bottom-[-1px]
                      left-0
                      h-[2px]
                      bg-[#F58220]
                      transition-all
                      duration-500
                      ${
                        activeDestination
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />

                  <div
                    className="
                      grid
                      grid-cols-[42px_minmax(0,1fr)_150px_42px]
                      items-center
                      gap-4
                    "
                  >
                    {/* NUMBER */}

                    <span
                      className={`
                        text-[9px]
                        font-semibold
                        tracking-[0.18em]
                        transition-colors
                        duration-300
                        ${
                          activeDestination
                            ? "text-[#F58220]"
                            : "text-[#0D2340]/25"
                        }
                      `}
                    >
                      {destination.number}
                    </span>

                    {/* NAME */}

                    <span
                      className={`
                        text-[24px]
                        font-bold
                        tracking-[-0.035em]
                        transition-all
                        duration-300
                        xl:text-[27px]
                        ${
                          activeDestination
                            ? "translate-x-1 text-[#0D2340]"
                            : "text-[#0D2340]/48 group-hover:text-[#0D2340]"
                        }
                      `}
                    >
                      {destination.name}
                    </span>

                    {/* AREA */}

                    <span
                      className={`
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.13em]
                        transition-colors
                        duration-300
                        ${
                          activeDestination
                            ? "text-[#0D2340]/55"
                            : "text-[#0D2340]/25"
                        }
                      `}
                    >
                      {destination.area}
                    </span>

                    {/* ARROW */}

                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-all
                        duration-300
                        ${
                          activeDestination
                            ? "border-[#F58220] bg-[#F58220] text-white"
                            : "border-[#0D2340]/10 text-[#0D2340]/30 group-hover:border-[#0D2340] group-hover:text-[#0D2340]"
                        }
                      `}
                    >
                      <IconArrowUpRight
                        size={15}
                        stroke={1.7}
                      />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* =================================================
              SINGLE DESTINATION PREVIEW
          ================================================= */}

          <div className="relative">
            <div className="sticky top-[120px]">
              <Link
                key={active.id}
                href={active.href}
                className="
                  destination-preview
                  group
                  relative
                  block
                  h-[690px]
                  overflow-hidden
                  rounded-[34px]
                "
              >
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  sizes="55vw"
                  className="
                    object-cover
                    transition-transform
                    duration-[1200ms]
                    ease-out
                    group-hover:scale-[1.025]
                  "
                />

                {/* IMAGE GRADIENT */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#061527]/85
                    via-[#061527]/5
                    to-transparent
                  "
                />

                {/* AREA */}

                <div
                  className="
                    absolute
                    left-8
                    top-8
                    flex
                    items-center
                    gap-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white/80
                  "
                >
                  <IconMapPin
                    size={14}
                    stroke={1.8}
                    className="text-[#F58220]"
                  />

                  {active.area}
                </div>

                {/* NUMBER */}

                <span
                  className="
                    absolute
                    right-8
                    top-8
                    text-[10px]
                    font-semibold
                    tracking-[0.20em]
                    text-white/50
                  "
                >
                  {active.number}
                </span>

                {/* CONTENT */}

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    p-9
                    xl:p-11
                  "
                >
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-[#F58220]
                    "
                  >
                    SicilyTrip Destination
                  </p>

                  <h3
                    className="
                      mt-3
                      text-[52px]
                      font-bold
                      leading-none
                      tracking-[-0.05em]
                      text-white
                      xl:text-[62px]
                    "
                  >
                    {active.name}
                  </h3>

                  <p
                    className="
                      mt-5
                      max-w-[540px]
                      text-[14px]
                      leading-7
                      text-white/65
                    "
                  >
                    {active.description}
                  </p>

                  <div
                    className="
                      mt-7
                      inline-flex
                      items-center
                      gap-4
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-white
                    "
                  >
                    {isEnglish ? "Discover" : "Scopri"} {active.name}

                    <span
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-[#0D2340]
                        transition-all
                        duration-300
                        group-hover:bg-[#F58220]
                        group-hover:text-white
                      "
                    >
                      <IconArrowUpRight
                        size={16}
                        stroke={1.8}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================
            MOBILE / TABLET
        ===================================================== */}

        <div
          className="
            mt-12
            border-t
            border-[#0D2340]/10
            lg:hidden
          "
        >
          {filteredDestinations.map((destination) => (
            <Link
              key={destination.id}
              href={destination.href}
              className="
                group
                block
                border-b
                border-[#0D2340]/10
                py-6
              "
            >
              <div
                className="
                  grid
                  grid-cols-[34px_1fr_auto]
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    text-[9px]
                    font-semibold
                    tracking-[0.16em]
                    text-[#F58220]
                  "
                >
                  {destination.number}
                </span>

                <div>
                  <h3
                    className="
                      text-[26px]
                      font-bold
                      tracking-[-0.035em]
                      text-[#0D2340]
                    "
                  >
                    {destination.name}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.13em]
                      text-[#0D2340]/35
                    "
                  >
                    {destination.area}
                  </p>
                </div>

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#0D2340]/10
                    text-[#0D2340]
                  "
                >
                  <IconArrowUpRight
                    size={15}
                    stroke={1.7}
                  />
                </span>
              </div>

              {/* MOBILE IMAGE */}

              <div
                className="
                  relative
                  mt-5
                  h-[240px]
                  overflow-hidden
                  rounded-[22px]
                  sm:h-[340px]
                "
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="100vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.025]
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#061527]/45
                    to-transparent
                  "
                />
              </div>

              <p
                className="
                  mt-4
                  text-[13px]
                  leading-6
                  text-[#0D2340]/50
                "
              >
                {destination.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes destinationPreviewIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .destination-preview {
          animation: destinationPreviewIn 380ms ease-out;
        }
      `}</style>
    </section>
  );
}
