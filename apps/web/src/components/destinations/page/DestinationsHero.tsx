"use client";

import Image from "next/image";
import Link from "next/link";

import {
  IconArrowDown,
  IconMapPin,
  IconSparkles,
} from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function DestinationsHero() {
  const { openConcierge } = useConcierge();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F7F6F2]

        pb-20
        pt-36

        lg:pb-24
        lg:pt-40
        xl:pb-28
      "
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[220px]
          top-[120px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#F58220]/[0.055]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-[200px]
          bottom-[-180px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#0D2340]/[0.035]
          blur-3xl
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

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
            BREADCRUMB
        =================================================== */}

        <div
          className="
            mb-8
            flex
            items-center
            gap-2

            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#0D2340]/40

            sm:text-[11px]
            lg:mb-10
          "
        >
          <Link
            href="/"
            className="
              transition-colors
              duration-300
              hover:text-[#F58220]
            "
          >
            Home
          </Link>

          <span className="text-[#F58220]">/</span>

          <span className="text-[#0D2340]/65">
            {isEnglish ? "Destinations" : "Destinazioni"}
          </span>
        </div>

        {/* ===================================================
            MAIN GRID
        =================================================== */}

        <div
          className="
            grid
            items-center
            gap-12

            lg:grid-cols-[0.88fr_1.12fr]
            lg:gap-14

            xl:gap-20
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="relative z-10">
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

              {isEnglish ? "Destinations" : "Destinazioni"}
            </div>

            <h1
              className="
                mt-5

                max-w-[650px]

                text-[44px]
                font-bold
                leading-[0.98]
                tracking-[-0.05em]
                text-[#0D2340]

                sm:text-[58px]

                lg:text-[64px]

                xl:text-[74px]
              "
            >
              {isEnglish ? (
                <>One Sicily.<br /><span className="text-[#0D2340]/55">Endless stories</span><br />to experience.</>
              ) : (
                <>Una Sicilia.<br /><span className="text-[#0D2340]/55">Infinite storie</span><br />da vivere.</>
              )}
            </h1>

            <p
              className="
                mt-7
                max-w-[560px]

                text-[16px]
                leading-8
                text-slate-600

                sm:text-lg
                sm:leading-8

                lg:mt-8
                lg:text-[19px]
                lg:leading-9
              "
            >
              {isEnglish
                ? "From art cities overlooking the Mediterranean to timeless villages, from the islands to the slopes of Mount Etna. Every place tells a different way of experiencing Sicily."
                : "Dalle città d’arte affacciate sul Mediterraneo ai borghi sospesi nel tempo, dalle isole alle pendici dell’Etna. Ogni luogo racconta un modo diverso di vivere la Sicilia."}
            </p>

            {/* ===============================================
                ACTIONS
            =============================================== */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-4

                lg:mt-9
              "
            >
              <a
                href="#explore-destinations"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3

                  rounded-full
                  bg-[#0D2340]

                  px-7
                  py-4

                  text-sm
                  font-semibold
                  text-white

                  shadow-[0_14px_35px_rgba(13,35,64,0.15)]

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:bg-[#F58220]
                "
              >
                {isEnglish ? "Explore Sicily" : "Esplora la Sicilia"}

                <IconArrowDown
                  size={17}
                  stroke={1.8}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-y-1
                  "
                />
              </a>

              <button
                type="button"
                onClick={() =>
                  openConcierge(
                    isEnglish
                      ? "Help me choose the ideal destination for my trip to Sicily"
                      : "Aiutami a scegliere la destinazione ideale per il mio viaggio in Sicilia"
                  )
                }
                className="
                  group
                  inline-flex
                  items-center
                  gap-2.5

                  py-3

                  text-sm
                  font-semibold
                  text-[#0D2340]

                  transition-colors
                  duration-300

                  hover:text-[#F58220]
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
                    bg-[#F58220]/10
                    text-[#F58220]

                    transition-all
                    duration-300

                    group-hover:bg-[#F58220]
                    group-hover:text-white
                  "
                >
                  <IconSparkles
                    size={17}
                    stroke={1.8}
                  />
                </span>

                {isEnglish ? "Ask the Concierge" : "Chiedi al Concierge"}
              </button>
            </div>

            {/* ===============================================
                SMALL SIGNATURE
            =============================================== */}

            <div
              className="
                mt-10
                flex
                items-center
                gap-3

                border-t
                border-[#0D2340]/10

                pt-6

                lg:mt-12
              "
            >
              <IconMapPin
                size={17}
                stroke={1.7}
                className="
                  shrink-0
                  text-[#F58220]
                "
              />

              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#0D2340]/40
                "
              >
                {isEnglish
                  ? "Cities · regions · archipelagos · endless possibilities"
                  : "Città · territori · arcipelaghi · infinite possibilità"}
              </p>
            </div>
          </div>

          {/* =================================================
              RIGHT IMAGE
          ================================================= */}

          <div className="relative">
            {/* ORANGE DECORATION */}

            <div
              className="
                absolute
                -right-4
                -top-4

                h-[120px]
                w-[120px]

                rounded-[32px]
                border
                border-[#F58220]/25

                lg:-right-6
                lg:-top-6
                lg:h-[160px]
                lg:w-[160px]
              "
            />

            {/* IMAGE */}

            <div
              className="
                relative

                h-[520px]

                overflow-hidden
                rounded-[34px]

                bg-[#0D2340]

                shadow-[0_35px_90px_rgba(13,35,64,0.18)]

                sm:h-[620px]

                lg:h-[650px]
                lg:rounded-[42px]

                xl:h-[690px]
              "
            >
              <Image
                src="/images/taormina.jpg"
                alt={isEnglish ? "Discover Sicily's destinations" : "Scopri le destinazioni della Sicilia"}
                fill
                priority
                sizes="
                  (max-width: 1024px) 100vw,
                  58vw
                "
                className="
                  object-cover
                  transition-transform
                  duration-[1400ms]
                  ease-out

                  hover:scale-[1.025]
                "
              />

              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-[#07182D]/60
                  via-transparent
                  to-black/5
                "
              />

              {/* =============================================
                  IMAGE LABEL
              ============================================= */}

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6

                  flex
                  items-end
                  justify-between
                  gap-6

                  lg:bottom-8
                  lg:left-8
                  lg:right-8
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.20em]
                      text-[#F58220]
                    "
                  >
                    <IconMapPin
                      size={14}
                      stroke={1.8}
                    />

                    {isEnglish ? "Eastern Coast" : "Costa Orientale"}
                  </div>

                  <p
                    className="
                      mt-2

                      text-[34px]
                      font-bold
                      tracking-[-0.04em]
                      text-white

                      sm:text-[42px]
                    "
                  >
                    Taormina
                  </p>
                </div>

                <div
                  className="
                    hidden

                    rounded-full
                    border
                    border-white/20
                    bg-[#07182D]/25

                    px-4
                    py-2.5

                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white/75

                    backdrop-blur-md

                    sm:block
                  "
                >
                  {isEnglish ? "Experience Sicily" : "Sicilia da vivere"}
                </div>
              </div>
            </div>

            {/* ===============================================
                FLOATING CARD
            =============================================== */}

            <div
              className="
                absolute

                -bottom-7
                -left-5

                hidden

                max-w-[250px]

                rounded-[22px]
                border
                border-[#0D2340]/[0.07]

                bg-white

                p-5

                shadow-[0_22px_55px_rgba(13,35,64,0.14)]

                lg:block
                xl:-left-10
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

                SicilyTrip Selection
              </div>

              <p
                className="
                  mt-3
                  text-[14px]
                  font-medium
                  leading-6
                  text-[#0D2340]
                "
              >
                {isEnglish
                  ? "Selected places for discovering the island's most authentic soul."
                  : "Luoghi selezionati per scoprire l’anima più autentica dell’isola."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
