"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  IconArrowUpRight,
  IconMapPin,
  IconSparkles,
} from "@tabler/icons-react";

type Category =
  | "Tutte"
  | "Mare"
  | "Città d'arte"
  | "Borghi"
  | "Natura"
  | "Isole";

type Destination = {
  id: number;
  name: string;
  area: string;
  category: Exclude<Category, "Tutte">;
  description: string;
  image: string;
  href: string;
  size: "large" | "standard";
};

const categories: Category[] = [
  "Tutte",
  "Mare",
  "Città d'arte",
  "Borghi",
  "Natura",
  "Isole",
];

const destinations: Destination[] = [
  {
    id: 1,
    name: "Taormina",
    area: "Costa Orientale",
    category: "Mare",
    description:
      "Il Mediterraneo, l'Etna e una delle terrazze più affascinanti della Sicilia.",
    image: "/images/taormina.jpg",
    href: "/destinazioni/taormina",
    size: "large",
  },
  {
    id: 2,
    name: "Palermo",
    area: "Sicilia Occidentale",
    category: "Città d'arte",
    description:
      "Palazzi, mercati e culture millenarie nel cuore più vibrante dell'isola.",
    image: "/images/palermo.jpg",
    href: "/destinazioni/palermo",
    size: "standard",
  },
  {
    id: 3,
    name: "Etna",
    area: "Sicilia Orientale",
    category: "Natura",
    description:
      "Paesaggi vulcanici, vigneti e sentieri sospesi tra terra e cielo.",
    image: "/images/etna.jpg",
    href: "/destinazioni/etna",
    size: "standard",
  },
  {
    id: 4,
    name: "Siracusa",
    area: "Sicilia Sud-Orientale",
    category: "Città d'arte",
    description:
      "Ortigia, pietra dorata e millenni di storia affacciati sul mare.",
    image: "/images/siracusa.jpg",
    href: "/destinazioni/siracusa",
    size: "large",
  },
  {
    id: 5,
    name: "Noto",
    area: "Val di Noto",
    category: "Borghi",
    description:
      "Barocco, luce e pietra color miele in uno dei luoghi più eleganti dell'isola.",
    image: "/images/siracusa.jpg",
    href: "/destinazioni/noto",
    size: "standard",
  },
  {
    id: 6,
    name: "Cefalù",
    area: "Costa Settentrionale",
    category: "Mare",
    description:
      "Un borgo sul mare dove vicoli, spiagge e storia si incontrano.",
    image: "/images/taormina.jpg",
    href: "/destinazioni/cefalu",
    size: "standard",
  },
  {
    id: 7,
    name: "Ragusa",
    area: "Sicilia Sud-Orientale",
    category: "Borghi",
    description:
      "Scenografie barocche, scalinate e panorami nel cuore degli Iblei.",
    image: "/images/siracusa.jpg",
    href: "/destinazioni/ragusa",
    size: "standard",
  },
  {
    id: 8,
    name: "Agrigento",
    area: "Costa Meridionale",
    category: "Città d'arte",
    description:
      "Templi, Mediterraneo e paesaggi che raccontano oltre duemila anni di storia.",
    image: "/images/palermo.jpg",
    href: "/destinazioni/agrigento",
    size: "large",
  },
  {
    id: 9,
    name: "Isole Eolie",
    area: "Arcipelago Eoliano",
    category: "Isole",
    description:
      "Sette isole, vulcani e un Mediterraneo da vivere lentamente.",
    image: "/images/yacht.jpg",
    href: "/destinazioni/isole-eolie",
    size: "standard",
  },
];

export default function DestinationsExplorer() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("Tutte");

  const filteredDestinations = useMemo(() => {
    if (activeCategory === "Tutte") {
      return destinations;
    }

    return destinations.filter(
      (destination) =>
        destination.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <section
      id="explore-destinations"
      className="
        relative
        overflow-hidden
        bg-white
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
          -right-[250px]
          top-[220px]
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#F58220]/[0.035]
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
            gap-10
            lg:grid-cols-[minmax(0,0.95fr)_minmax(350px,0.55fr)]
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
                sm:tracking-[0.34em]
              "
            >
              <span className="h-px w-9 bg-[#F58220]" />

              Esplora la Sicilia
            </div>

            <h2
              className="
                mt-5
                max-w-[850px]
                text-[42px]
                font-bold
                leading-[1.02]
                tracking-[-0.045em]
                text-[#0D2340]
                sm:text-[52px]
                lg:text-[58px]
                xl:text-[64px]
              "
            >
              Trova il tuo
              <br />
              angolo di{" "}
              <span className="text-[#F58220]">
                Sicilia.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[520px]
              text-[16px]
              leading-8
              text-slate-600
              sm:text-lg
              sm:leading-8
              lg:justify-self-end
            "
          >
            Mare, arte, natura e borghi. Scegli ciò che ti
            ispira e lasciati guidare attraverso le diverse
            anime dell&apos;isola.
          </p>
        </div>

        {/* ===================================================
            FILTERS
        =================================================== */}

        <div
          className="
            mt-12
            flex
            flex-wrap
            items-center
            gap-2.5
            border-y
            border-[#0D2340]/10
            py-5
            lg:mt-14
          "
        >
          <span
            className="
              mr-3
              hidden
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#0D2340]/35
              lg:block
            "
          >
            Filtra per
          </span>

          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`
                  rounded-full
                  border
                  px-5
                  py-2.5
                  text-[12px]
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    active
                      ? `
                        border-[#0D2340]
                        bg-[#0D2340]
                        text-white
                        shadow-[0_8px_20px_rgba(13,35,64,0.12)]
                      `
                      : `
                        border-[#0D2340]/10
                        bg-white
                        text-[#0D2340]/60
                        hover:border-[#F58220]
                        hover:text-[#F58220]
                      `
                  }
                `}
              >
                {category}
              </button>
            );
          })}

          <div
            className="
              ml-auto
              hidden
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#0D2340]/30
              lg:flex
            "
          >
            <IconMapPin
              size={14}
              stroke={1.7}
              className="text-[#F58220]"
            />

            {filteredDestinations.length} destinazioni
          </div>
        </div>

        {/* ===================================================
            DESTINATIONS GRID
        =================================================== */}

        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:mt-12
            lg:grid-cols-12
            lg:gap-6
          "
        >
          {filteredDestinations.map(
            (destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                index={index}
              />
            )
          )}
        </div>

        {/* ===================================================
            BOTTOM MESSAGE
        =================================================== */}

        <div
          className="
            mt-12
            flex
            flex-col
            gap-5
            border-t
            border-[#0D2340]/10
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
            lg:mt-14
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F58220]/10
                text-[#F58220]
              "
            >
              <IconSparkles
                size={16}
                stroke={1.8}
              />
            </span>

            <p
              className="
                max-w-[680px]
                text-sm
                leading-6
                text-slate-500
                sm:text-base
              "
            >
              Questa è solo una selezione. La Sicilia ha
              ancora molto da raccontare.
            </p>
          </div>

          <span
            className="
              hidden
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#0D2340]/30
              sm:block
            "
          >
            SicilyTrip Selection
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESTINATION CARD
============================================================ */

function DestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  /*
   * Con "Tutte" costruiamo una composizione irregolare.
   * Con i filtri manteniamo comunque card ampie e leggibili.
   */
  const layout =
    index % 6 === 0 || index % 6 === 3
      ? "lg:col-span-7"
      : "lg:col-span-5";

  const height =
    destination.size === "large"
      ? "h-[500px] lg:h-[580px]"
      : "h-[440px] lg:h-[500px]";

  return (
    <Link
      href={destination.href}
      className={`
        group
        relative
        col-span-1
        block
        overflow-hidden
        rounded-[28px]
        bg-[#07182D]
        shadow-[0_18px_45px_rgba(13,35,64,0.10)]
        transition-all
        duration-500

        hover:-translate-y-1.5
        hover:shadow-[0_30px_70px_rgba(13,35,64,0.16)]

        ${layout}
        ${height}

        lg:rounded-[34px]
      `}
    >
      {/* IMAGE */}

      <Image
        src={destination.image}
        alt={destination.name}
        fill
        sizes="
          (max-width: 640px) 100vw,
          (max-width: 1024px) 50vw,
          60vw
        "
        className="
          object-cover
          transition-transform
          duration-[1200ms]
          ease-out
          group-hover:scale-[1.045]
        "
      />

      {/* OVERLAYS */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#07182D]/95
          via-[#07182D]/18
          to-black/5
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#07182D]/15
          via-transparent
          to-transparent
        "
      />

      {/* CATEGORY */}

      <div
        className="
          absolute
          left-6
          top-6
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/20
          bg-[#07182D]/30
          px-4
          py-2.5
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-white
          backdrop-blur-md
          lg:left-7
          lg:top-7
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-[#F58220]
          "
        />

        {destination.category}
      </div>

      {/* ARROW */}

      <span
        className="
          absolute
          right-6
          top-6
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-white/10
          text-white
          backdrop-blur-md
          transition-all
          duration-300

          group-hover:rotate-45
          group-hover:border-[#F58220]
          group-hover:bg-[#F58220]

          lg:right-7
          lg:top-7
        "
      >
        <IconArrowUpRight
          size={19}
          stroke={1.7}
        />
      </span>

      {/* CONTENT */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          p-6
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
          <IconMapPin
            size={13}
            stroke={1.8}
          />

          {destination.area}
        </div>

        <h3
          className="
            mt-2
            text-[34px]
            font-bold
            leading-none
            tracking-[-0.04em]
            text-white
            sm:text-[38px]
            lg:text-[44px]
          "
        >
          {destination.name}
        </h3>

        <p
          className="
            mt-3
            max-w-[520px]
            text-[13px]
            leading-6
            text-white/65
            sm:text-sm
          "
        >
          {destination.description}
        </p>

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
            text-[12px]
            font-semibold
            text-white
          "
        >
          Scopri la destinazione

          <IconArrowUpRight
            size={15}
            stroke={1.8}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </div>
      </div>
    </Link>
  );
}