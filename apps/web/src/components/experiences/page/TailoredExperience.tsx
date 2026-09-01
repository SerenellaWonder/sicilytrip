"use client";

import Image from "next/image";

import {
  IconArrowUpRight,
  IconSparkles,
} from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function TailoredExperience() {
  const { openConcierge } = useConcierge();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  function handleCreateExperience() {
    openConcierge(
      isEnglish
        ? "I would like to create a personalised experience in Sicily. Help me build a tailor-made journey around my interests."
        : "Vorrei creare un'esperienza personalizzata in Sicilia. Aiutami a costruire un viaggio su misura in base ai miei interessi."
    );
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#07182D]
        py-24
        lg:py-32
        xl:py-36
      "
    >
      {/* DECORATIVE GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[240px]
          -top-[260px]
          h-[700px]
          w-[700px]
          rounded-full
          bg-[#F58220]/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* TOP LABEL */}

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
          <IconSparkles size={15} stroke={1.7} />

          {isEnglish ? "Beyond the itinerary" : "Oltre l’itinerario"}
        </div>

        {/* MAIN CONTENT */}

        <div
          className="
            mt-7
            grid
            items-center
            gap-14
            lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
            lg:gap-20
            xl:gap-28
          "
        >
          {/* =================================================
              TEXT
          ================================================= */}

          <div>
            <h2
              className="
                max-w-[700px]
                text-[44px]
                font-bold
                leading-[0.98]
                tracking-[-0.05em]
                text-white
                sm:text-[54px]
                lg:text-[62px]
                xl:text-[72px]
              "
            >
              {isEnglish ? "Your Sicily" : "La tua Sicilia"}
              <br />

              <span className="text-white/35">
                {isEnglish ? "does not exist yet." : "non esiste ancora."}
              </span>
            </h2>

            <p
              className="
                mt-8
                max-w-[540px]
                text-[15px]
                leading-8
                text-white/55
                sm:text-[17px]
              "
            >
              {isEnglish
                ? "Not every journey can be chosen from a catalogue. Some begin with a wish, a special occasion or simply the desire to experience something that belongs only to you."
                : "Non tutti i viaggi possono essere scelti da un catalogo. Alcuni nascono da un desiderio, da una ricorrenza o semplicemente dalla voglia di vivere qualcosa che appartenga soltanto a te."}
            </p>

            <p
              className="
                mt-5
                max-w-[540px]
                text-[14px]
                leading-7
                text-white/40
              "
            >
              {isEnglish
                ? "Tell us what you imagine. SicilyTrip can combine places, stays and experiences to create a personal journey across the island."
                : "Raccontaci cosa immagini. SicilyTrip può combinare luoghi, soggiorni ed esperienze per costruire un percorso personale attraverso l’isola."}
            </p>

            {/* CONCIERGE BUTTON */}

            <button
              type="button"
              onClick={handleCreateExperience}
              className="
                group
                mt-9
                inline-flex
                items-center
                gap-4
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              {isEnglish ? "Create your experience" : "Crea la tua esperienza"}

              <span
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F58220]
                  text-white
                  transition-all
                  duration-300
                  group-hover:scale-105
                  group-hover:bg-white
                  group-hover:text-[#0D2340]
                "
              >
                <IconArrowUpRight
                  size={17}
                  stroke={1.8}
                />
              </span>
            </button>

            {/* SMALL DETAILS */}

            <div
              className="
                mt-14
                grid
                max-w-[560px]
                grid-cols-3
                border-t
                border-white/10
                pt-6
              "
            >
              <div>
                <span
                  className="
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#F58220]
                  "
                >
                  01
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-[11px]
                    font-medium
                    text-white/55
                  "
                >
                  {isEnglish ? "Tell us" : "Raccontaci"}
                </span>
              </div>

              <div
                className="border-l border-white/10 pl-5 sm:pl-7"
              >
                <span
                  className="
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#F58220]
                  "
                >
                  02
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-[11px]
                    font-medium
                    text-white/55
                  "
                >
                  {isEnglish ? "We design" : "Progettiamo"}
                </span>
              </div>

              <div
                className="border-l border-white/10 pl-5 sm:pl-7"
              >
                <span
                  className="
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#F58220]
                  "
                >
                  03
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-[11px]
                    font-medium
                    text-white/55
                  "
                >
                  {isEnglish ? "Experience" : "Vivi"}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              IMAGE
          ================================================= */}

          <div
            className="
              relative
              h-[470px]
              overflow-hidden
              rounded-[30px]
              sm:h-[570px]
              lg:h-[680px]
            "
          >
            <Image
              src="/images/private.jpg"
              alt={isEnglish ? "Private SicilyTrip experience" : "Esperienza privata SicilyTrip"}
              fill
              sizes="
                (max-width: 1024px) 100vw,
                55vw
              "
              className="object-cover"
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#061527]/55
                via-transparent
                to-transparent
              "
            />

            {/* IMAGE LABEL */}

            <div
              className="
                absolute
                bottom-7
                left-7
                right-7
                flex
                items-end
                justify-between
                gap-6
                sm:bottom-9
                sm:left-9
                sm:right-9
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#F58220]
                  "
                >
                  Tailor-made Sicily
                </p>

                <p
                  className="
                    mt-2
                    max-w-[330px]
                    text-[18px]
                    font-medium
                    leading-6
                    tracking-[-0.02em]
                    text-white
                    sm:text-[21px]
                    sm:leading-7
                  "
                >
                  {isEnglish
                    ? "A journey built around what you want to remember."
                    : "Un viaggio costruito intorno a ciò che vuoi ricordare."}
                </p>
              </div>

              <span
                className="
                  hidden
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white/45
                  sm:block
                "
              >
                SicilyTrip
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
