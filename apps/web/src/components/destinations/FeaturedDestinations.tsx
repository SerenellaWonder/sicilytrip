"use client";

import Image from "next/image";

import {
  IconArrowRight,
  IconMapPin,
  IconSparkles,
} from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";

/* ============================================================
   DESTINATIONS
============================================================ */

const destinations = [
  {
    title: "Taormina",
    subtitle: "Costa Orientale",
    image: "/images/taormina.jpg",
    hotels: 42,

    /*
     * Mobile: destinazione principale.
     * Desktop: invariato.
     */
    className:
      "h-[430px] md:h-[560px] lg:col-span-2 lg:row-span-2 lg:h-[626px]",
  },
  {
    title: "Palermo",
    subtitle: "Capoluogo di Sicilia",
    image: "/images/palermo.jpg",
    hotels: 38,

    /*
     * Mobile più compatto.
     * md/lg invariati.
     */
    className:
      "h-[330px] md:h-[460px] lg:h-[300px]",
  },
  {
    title: "Etna",
    subtitle: "Patrimonio Naturale",
    image: "/images/etna.jpg",
    hotels: 25,
    className:
      "h-[330px] md:h-[460px] lg:h-[300px]",
  },
  {
    title: "Siracusa",
    subtitle: "Storia e Mare",
    image: "/images/siracusa.jpg",
    hotels: 31,
    className:
      "h-[350px] md:col-span-2 md:h-[480px] lg:col-span-2 lg:h-[300px]",
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function FeaturedDestinations() {
  const { openConcierge } = useConcierge();

  return (
    <section
      id="destinations"
      className="
        relative
        overflow-hidden
        bg-white

        py-16

        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[180px]
          top-[120px]
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#F58220]/[0.035]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-[200px]
          bottom-[100px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#0D2340]/[0.025]
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
            SECTION HEADER
        =================================================== */}

        <div
          className="
            mb-8
            grid
            gap-5

            sm:mb-11
            sm:gap-7

            lg:mb-14
            lg:grid-cols-[1fr_0.75fr]
            lg:items-end
            lg:gap-16
          "
        >
          {/* LEFT */}

          <div className="max-w-[850px]">
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

                sm:text-sm
                sm:tracking-[0.34em]
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-[#F58220]

                  sm:w-9
                "
              />

              Destinazioni
            </div>

            <h2
              className="
                mt-4

                max-w-[360px]
                text-[36px]
                font-bold
                leading-[1.06]
                tracking-[-0.045em]
                text-[#0D2340]

                sm:mt-5
                sm:max-w-none
                sm:text-[50px]

                lg:text-[58px]
                xl:text-[64px]
              "
            >
              Ogni angolo di Sicilia
              <br className="hidden sm:block" />
              {" "}racconta una storia.
            </h2>
          </div>

          {/* RIGHT */}

          <div
            className="
              max-w-[560px]
              lg:justify-self-end
            "
          >
            <p
              className="
                text-[15px]
                leading-7
                text-slate-600

                sm:text-lg
                sm:leading-8
              "
            >
              Dal fascino senza tempo di Taormina alle atmosfere
              mediterranee di Palermo, fino alla forza dell&apos;Etna
              e alla luce di Siracusa. Scegli da dove iniziare il tuo
              viaggio.
            </p>

            <button
              type="button"
              className="
                group
                mt-4
                inline-flex
                items-center
                gap-2.5
                text-sm
                font-semibold
                text-[#0D2340]
                transition-colors
                duration-300
                hover:text-[#F58220]

                sm:mt-5
              "
            >
              Esplora tutte le destinazioni

              <IconArrowRight
                size={17}
                stroke={1.8}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        </div>

        {/* ===================================================
            DESTINATIONS GRID
        =================================================== */}

        <div
          className="
            grid

            gap-3.5

            sm:gap-5
            md:grid-cols-2

            lg:grid-cols-3
            lg:gap-6
          "
        >
          {destinations.map((item) => (
            <DestinationCard
              key={item.title}
              destination={item}
            />
          ))}
        </div>

        {/* ===================================================
            BOTTOM CONCIERGE LINE
        =================================================== */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-5
            border-t
            border-[#0D2340]/10
            pt-6

            sm:mt-8
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:pt-7
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <span
              className="
                mt-0.5
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F58220]/10
                text-[#F58220]
              "
            >
              <IconSparkles
                size={15}
                stroke={1.8}
              />
            </span>

            <p
              className="
                max-w-[760px]
                text-[13px]
                leading-6
                text-slate-500

                sm:text-base
              "
            >
              Non sai quale zona scegliere? Racconta al{" "}
              <button
                type="button"
                onClick={() =>
                  openConcierge(
                    "Aiutami a scegliere la destinazione migliore per il mio viaggio in Sicilia"
                  )
                }
                className="
                  font-semibold
                  text-[#0D2340]
                  underline
                  decoration-[#F58220]/40
                  underline-offset-4
                  transition-colors
                  duration-300
                  hover:text-[#F58220]
                "
              >
                SicilyTrip Concierge
              </button>{" "}
              come immagini il tuo viaggio.
            </p>
          </div>

          <div
            className="
              hidden
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#0D2340]/30

              sm:flex
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

            Sicilia da scoprire
          </div>
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
}: {
  destination: (typeof destinations)[number];
}) {
  return (
    <article
      className={`
        group
        relative
        overflow-hidden

        rounded-[24px]
        bg-[#0D2340]

        shadow-[0_16px_45px_rgba(13,35,64,0.10)]

        transition-all
        duration-500

        hover:-translate-y-1
        hover:shadow-[0_28px_65px_rgba(13,35,64,0.17)]

        sm:rounded-[28px]
        lg:rounded-[32px]

        ${destination.className}
      `}
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <Image
        src={destination.image}
        alt={destination.title}
        fill
        sizes="
          (max-width: 768px) 100vw,
          (max-width: 1024px) 50vw,
          33vw
        "
        className="
          object-cover
          transition-transform
          duration-[1100ms]
          ease-out
          group-hover:scale-[1.055]
        "
      />

      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#07182D]/95
          via-[#07182D]/22
          to-[#07182D]/5
        "
      />

      {/* =====================================================
          SOFT LIGHT
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.06]
          via-transparent
          to-transparent
        "
      />

      {/* =====================================================
          TOP LOCATION
      ===================================================== */}

      <div
        className="
          absolute

          left-4
          top-4

          flex
          items-center
          gap-1.5
          rounded-full
          border
          border-white/20
          bg-[#07182D]/30

          px-3
          py-2

          text-[9px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-white
          backdrop-blur-md

          sm:left-6
          sm:top-6
          sm:gap-2
          sm:px-3.5
          sm:text-[10px]
          sm:tracking-[0.16em]
        "
      >
        <IconMapPin
          size={13}
          stroke={1.8}
          className="text-[#F58220]"
        />

        {destination.subtitle}
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          p-5

          sm:p-7
          lg:p-8
          xl:p-9
        "
      >
        <h3
          className="
            text-[34px]
            font-bold
            leading-none
            tracking-[-0.04em]
            text-white

            sm:text-[46px]
            lg:text-[50px]
            xl:text-[54px]
          "
        >
          {destination.title}
        </h3>

        <div
          className="
            mt-4
            flex
            items-end
            justify-between
            gap-4

            sm:mt-5
          "
        >
          {/* =================================================
              HOTEL COUNT

              Dato dimostrativo.
              Successivamente arriverà dal provider reale.
          ================================================= */}

          <div>
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white/55

                sm:text-[10px]
                sm:tracking-[0.2em]
              "
            >
              Strutture selezionate
            </span>

            <div
              className="
                mt-1
                flex
                items-baseline
                gap-2
              "
            >
              <span
                className="
                  text-[22px]
                  font-bold
                  text-white

                  sm:text-[28px]
                "
              >
                {destination.hotels}
              </span>

              <span
                className="
                  text-[11px]
                  text-white/50

                  sm:text-xs
                "
              >
                hotel
              </span>
            </div>
          </div>

          {/* =================================================
              CTA
          ================================================= */}

          <button
            type="button"
            aria-label={`Scopri ${destination.title}`}
            className="
              group/button
              flex

              h-11
              w-11

              shrink-0
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

              hover:border-[#F58220]
              hover:bg-[#F58220]

              sm:h-13
              sm:w-13
            "
          >
            <IconArrowRight
              size={18}
              stroke={1.8}
              className="
                transition-transform
                duration-300
                group-hover/button:translate-x-0.5
              "
            />
          </button>
        </div>
      </div>
    </article>
  );
}