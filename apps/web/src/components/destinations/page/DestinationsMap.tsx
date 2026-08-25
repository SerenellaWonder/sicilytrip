"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  IconArrowUpRight,
  IconMap2,
  IconMapPin,
  IconSparkles,
} from "@tabler/icons-react";

import {
  destinationCatalog,
  destinationMacroAreas,
  type DestinationMacroArea,
} from "@/data/destinations";

type MapDestination = {
  id: string;
  name: string;
  area: string;
  description: string;
  image: string;
  href: string;
  longitude: number;
  latitude: number;
  labelPosition?: "top" | "bottom" | "left" | "right";
};

/* =========================================================
   PARAMETRI SVG
   Devono corrispondere a quelli usati per sicily-map.svg
========================================================= */

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 650;
const SVG_PADDING = 55;

const MIN_LON = 11.92659;
const MIN_LAT = 35.49369;
const MAX_LON = 15.65283;
const MAX_LAT = 38.8117;

const GEO_WIDTH = MAX_LON - MIN_LON;
const GEO_HEIGHT = MAX_LAT - MIN_LAT;

const SCALE_X =
  (SVG_WIDTH - SVG_PADDING * 2) / GEO_WIDTH;

const SCALE_Y =
  (SVG_HEIGHT - SVG_PADDING * 2) / GEO_HEIGHT;

const MAP_SCALE = Math.min(SCALE_X, SCALE_Y);

const DRAW_WIDTH = GEO_WIDTH * MAP_SCALE;
const DRAW_HEIGHT = GEO_HEIGHT * MAP_SCALE;

const OFFSET_X =
  (SVG_WIDTH - DRAW_WIDTH) / 2;

const OFFSET_Y =
  (SVG_HEIGHT - DRAW_HEIGHT) / 2;

function project(longitude: number, latitude: number) {
  return {
    x:
      OFFSET_X +
      (longitude - MIN_LON) * MAP_SCALE,

    y:
      OFFSET_Y +
      (MAX_LAT - latitude) * MAP_SCALE,
  };
}

/* =========================================================
   DESTINAZIONI
========================================================= */

const destinations = destinationCatalog;

function getLabelClasses(
  position: MapDestination["labelPosition"]
) {
  switch (position) {
    case "top":
      return `
        bottom-[27px]
        left-1/2
        -translate-x-1/2
      `;

    case "left":
      return `
        right-[27px]
        top-1/2
        -translate-y-1/2
      `;

    case "right":
      return `
        left-[27px]
        top-1/2
        -translate-y-1/2
      `;

    default:
      return `
        left-1/2
        top-[27px]
        -translate-x-1/2
      `;
  }
}

export default function DestinationsMap() {
  const [macroArea, setMacroArea] =
    useState<DestinationMacroArea>("Sicilia Occidentale");
  const [selectedId, setSelectedId] =
    useState("palermo");

  const filteredDestinations = destinations.filter(
    destination => destination.macroArea === macroArea
  );

  const selected =
    filteredDestinations.find(
      (destination) => destination.id === selectedId
    ) ?? filteredDestinations[0];

  function selectMacroArea(nextMacroArea: DestinationMacroArea) {
    setMacroArea(nextMacroArea);
    setSelectedId(
      destinations.find(
        destination => destination.macroArea === nextMacroArea
      )?.id ?? "palermo"
    );
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#07182D]
        py-24
        lg:py-28
        xl:py-32
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[260px]
          top-[80px]
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#153B68]/35
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-[250px]
          bottom-[-200px]
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#F58220]/[0.06]
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
        {/* HEADER */}

        <div
          className="
            grid
            gap-8
            lg:grid-cols-[minmax(0,1fr)_420px]
            lg:items-end
            lg:gap-16
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
              Orientati
            </div>

            <h2
              className="
                mt-5
                max-w-[850px]
                text-[42px]
                font-bold
                leading-[1.02]
                tracking-[-0.045em]
                text-white
                sm:text-[52px]
                lg:text-[58px]
                xl:text-[64px]
              "
            >
              La Sicilia,
              <br />

              <span className="text-white/55">
                da un altro punto di vista.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[420px]
              text-[16px]
              leading-8
              text-white/55
              sm:text-lg
            "
          >
            Esplora l&apos;isola attraverso i suoi territori.
            Seleziona un luogo sulla mappa e scopri da dove
            iniziare il tuo viaggio.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-3" aria-label="Filtra la mappa per macroarea">
          {destinationMacroAreas.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => selectMacroArea(item)}
              className={`rounded-full border px-5 py-3 text-[9px] font-bold uppercase tracking-[0.12em] transition ${
                macroArea === item
                  ? "border-[#F58220] bg-[#F58220] text-white"
                  : "border-white/15 bg-white/[0.04] text-white/55 hover:border-white/30 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* MAP + CARD */}

        <div
          className="
            mt-14
            grid
            gap-8
            lg:mt-16
            lg:grid-cols-[minmax(0,1.25fr)_430px]
            lg:items-stretch
            lg:gap-10
            xl:grid-cols-[minmax(0,1.4fr)_460px]
            xl:gap-14
          "
        >
          {/* MAP */}

          <div
            className="
              relative
              min-h-[590px]
              overflow-hidden
              rounded-[34px]
              border
              border-white/10
              bg-white/[0.035]
              lg:min-h-[650px]
              lg:rounded-[40px]
            "
          >
            <div
              className="
                absolute
                left-7
                top-7
                z-30
                flex
                items-center
                gap-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-white/35
              "
            >
              <IconMap2
                size={15}
                stroke={1.7}
                className="text-[#F58220]"
              />

              Mappa delle destinazioni
            </div>

            {/* =================================================
                MAP CANVAS INGRANDITO

                Mappa e marker vengono ingranditi INSIEME.
                Non cambiare separatamente img e svg.
            ================================================= */}

            <div
              className="
                absolute
    inset-x-[7%]
    bottom-[7%]
    top-[18%]
    origin-center
    scale-[1.25]
    xl:scale-[1.35]
  "
            >
              {/* SAGOMA REALE */}

              <Image
                src="/images/sicily-map.svg"
                alt=""
                aria-hidden="true"
                draggable={false}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  select-none
                  object-contain
                "
              />

              {/* MARKER NELLO STESSO VIEWBOX */}

              <svg
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  overflow-visible
                "
                aria-label="Destinazioni in Sicilia"
              >
                <foreignObject
                  x="0"
                  y="0"
                  width={SVG_WIDTH}
                  height={SVG_HEIGHT}
                  pointerEvents="none"
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {filteredDestinations.map((destination) => {
                      const point = project(
                        destination.longitude,
                        destination.latitude
                      );

                      const active =
                        destination.id === selected.id;

                      return (
                        <button
                          key={destination.id}
                          type="button"
                          aria-label={`Mostra ${destination.name}`}
                          onClick={() =>
                            setSelectedId(destination.id)
                          }
                          style={{
                            pointerEvents: "auto",
                            position: "absolute",
                            left: point.x,
                            top: point.y,
                          }}
                          className="
                            group
                            -translate-x-1/2
                            -translate-y-1/2
                          "
                        >
                          {/* HALO */}

                          <span
                            className={`
                              absolute
                              left-1/2
                              top-1/2
                              -translate-x-1/2
                              -translate-y-1/2
                              rounded-full
                              transition-all
                              duration-300

                              ${
                                active
                                  ? `
                                    h-11
                                    w-11
                                    bg-[#F58220]/20
                                  `
                                  : `
                                    h-9
                                    w-9
                                    group-hover:bg-white/10
                                  `
                              }
                            `}
                          />

                          {/* DOT */}

                          <span
                            className={`
                              relative
                              block
                              rounded-full
                              border-[3px]
                              border-white
                              shadow-[0_5px_18px_rgba(0,0,0,0.35)]
                              transition-all
                              duration-300

                              ${
                                active
                                  ? `
                                    h-[18px]
                                    w-[18px]
                                    bg-[#F58220]
                                  `
                                  : `
                                    h-[14px]
                                    w-[14px]
                                    bg-white
                                    group-hover:scale-125
                                    group-hover:bg-[#F58220]
                                  `
                              }
                            `}
                          >
                            {active && (
                              <span
                                className="
                                  absolute
                                  left-1/2
                                  top-1/2
                                  h-1
                                  w-1
                                  -translate-x-1/2
                                  -translate-y-1/2
                                  rounded-full
                                  bg-white
                                "
                              />
                            )}
                          </span>

                          {/* LABEL */}

                          <span
                            className={`
                              absolute
                              whitespace-nowrap
                              rounded-full
                              border
                              px-3
                              py-1.5
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-[0.12em]
                              backdrop-blur-md
                              transition-all
                              duration-300

                              ${getLabelClasses(
                                destination.labelPosition
                              )}

                              ${
                                active
                                  ? `
                                    border-[#F58220]
                                    bg-[#F58220]
                                    text-white
                                    shadow-[0_7px_20px_rgba(245,130,32,0.20)]
                                  `
                                  : `
                                    border-white/10
                                    bg-[#07182D]/80
                                    text-white/55
                                    group-hover:border-white/20
                                    group-hover:text-white
                                  `
                              }
                            `}
                          >
                            {destination.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </foreignObject>
              </svg>
            </div>

            {/* BOTTOM LABEL */}

            <div
              className="
                absolute
                bottom-7
                left-7
                z-30
                flex
                items-center
                gap-2
                text-[9px]
                text-white/30
              "
            >
              <IconMapPin
                size={13}
                stroke={1.7}
                className="text-[#F58220]"
              />

              Seleziona una destinazione
            </div>
          </div>

          {/* DESTINATION CARD */}

          <div
            key={selected.id}
            className="
              destination-map-card
              relative
              min-h-[650px]
              overflow-hidden
              rounded-[34px]
              bg-white
              shadow-[0_30px_80px_rgba(0,0,0,0.18)]
              lg:rounded-[40px]
            "
          >
            {/* IMAGE */}

            <div
              className="
                relative
                h-[48%]
                min-h-[300px]
                overflow-hidden
              "
            >
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="460px"
                loading="eager"
                className="
                  object-cover
                  transition-transform
                  duration-[1000ms]
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#07182D]/50
                  via-transparent
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.20em]
                  text-white
                "
              >
                <IconMapPin
                  size={14}
                  stroke={1.8}
                  className="text-[#F58220]"
                />

                {selected.area}
              </div>
            </div>

            {/* CONTENT */}

            <div
              className="
                flex
                min-h-[335px]
                flex-col
                p-7
                lg:p-8
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.20em]
                  text-[#F58220]
                "
              >
                <IconSparkles
                  size={14}
                  stroke={1.8}
                />

                SicilyTrip Destination
              </div>

              <h3
                className="
                  mt-4
                  text-[40px]
                  font-bold
                  leading-none
                  tracking-[-0.045em]
                  text-[#0D2340]
                  lg:text-[46px]
                "
              >
                {selected.name}
              </h3>

              <p
                className="
                  mt-5
                  text-[14px]
                  leading-7
                  text-slate-600
                  lg:text-[15px]
                "
              >
                {selected.description}
              </p>

              <div className="mt-auto pt-7">
                <Link
                  href={selected.href}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-[#0D2340]
                    px-6
                    py-3.5
                    text-[13px]
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#F58220]
                  "
                >
                  Scopri {selected.name}

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
          </div>
        </div>

        {/* BOTTOM */}

        <div
          className="
            mt-10
            flex
            items-center
            justify-between
            border-t
            border-white/10
            pt-7
          "
        >
          <p
            className="
              max-w-[650px]
              text-[13px]
              leading-6
              text-white/40
            "
          >
            Ogni destinazione sarà collegata a hotel,
            esperienze e itinerari selezionati da SicilyTrip.
          </p>

          <span
            className="
              hidden
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white/25
              sm:block
            "
          >
            Esplora · Scegli · Parti
          </span>
        </div>
      </div>

      <style>{`
        @keyframes destinationMapCardIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .destination-map-card {
          animation: destinationMapCardIn 420ms ease-out;
        }
      `}</style>
    </section>
  );
}
