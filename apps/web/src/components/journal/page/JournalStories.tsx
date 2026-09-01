"use client";

import Image from "next/image";
import Link from "next/link";

import { IconArrowUpRight, IconClock, IconSparkles } from "@tabler/icons-react";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function JournalStories() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section
      id="stories"
      className="
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
        {/* =================================================
            INTRO
        ================================================= */}

        <div
          className="
            grid
            gap-10
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
              <IconSparkles size={15} stroke={1.7} />
              {isEnglish ? "Featured stories" : "Storie in evidenza"}
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
              {isEnglish ? "Sicily," : "La Sicilia,"}
              <br />
              <span className="text-[#0D2340]/35">
                {isEnglish ? "told slowly." : "raccontata lentamente."}
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
              ? "Not a list of things to see, but stories to read at the pace needed to understand what makes a place special."
              : "Non una lista di cose da vedere, ma storie da leggere con il tempo necessario per capire cosa rende speciale un luogo."}
          </p>
        </div>

        {/* =================================================
            FEATURED STORY
        ================================================= */}

        <article
          className="
            mt-16
            grid
            items-center
            gap-12
            lg:grid-cols-[minmax(0,1.2fr)_minmax(380px,0.8fr)]
            lg:gap-20
            xl:gap-28
          "
        >
          {/* IMAGE */}

          <div
            className="
              relative
              h-[480px]
              overflow-hidden
              rounded-[30px]
              sm:h-[620px]
              lg:h-[720px]
            "
          >
            <Image
              src="/images/journal-taormina.jpg"
              alt={isEnglish ? "Taormina and the Mediterranean" : "Taormina e il Mediterraneo"}
              fill
              sizes="
                (max-width: 1024px) 100vw,
                60vw
              "
              className="
                object-cover
                transition-transform
                duration-[1200ms]
                hover:scale-[1.025]
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#061527]/60
                via-transparent
                to-transparent
              "
            />

            <div
              className="
                absolute
                bottom-7
                left-7
                right-7
                sm:bottom-9
                sm:left-9
                sm:right-9
              "
            >
              <span
                className="
                  rounded-full
                  bg-[#F58220]
                  px-4
                  py-2
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white
                "
              >
                {isEnglish ? "Destinations" : "Destinazioni"}
              </span>
            </div>
          </div>

          {/* CONTENT */}

          <div>
            <div
              className="
                flex
                items-center
                gap-4
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#0D2340]/40
              "
            >
              <span>12 Agosto 2026</span>

              <span
                className="
                  h-[3px]
                  w-[3px]
                  rounded-full
                  bg-[#F58220]
                "
              />

              <span
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <IconClock size={13} stroke={1.7} />6 min
              </span>
            </div>

            <h3
              className="
                mt-6
                max-w-[570px]
                text-[38px]
                font-bold
                leading-[1.04]
                tracking-[-0.045em]
                text-[#0D2340]
                sm:text-[46px]
                lg:text-[52px]
              "
            >
              {isEnglish ? "Taormina beyond" : "Taormina oltre"}
              <br />
              <span className="text-[#0D2340]/35">
                {isEnglish ? "the postcard." : "la cartolina."}
              </span>
            </h3>

            <p
              className="
                mt-7
                max-w-[540px]
                text-[14px]
                leading-7
                text-[#0D2340]/55
                sm:text-[16px]
                sm:leading-8
              "
            >
              {isEnglish
                ? "When the streets empty and the sun sets behind Mount Etna, Taormina reveals another side. Hidden courtyards, sea-view terraces and places to discover away from the most obvious routes."
                : "Quando le strade si svuotano e il sole scende dietro l’Etna, Taormina mostra un volto diverso. Cortili nascosti, terrazze sul mare e indirizzi da scoprire lontano dai percorsi più evidenti."}
            </p>

            <Link
              href="/journal/taormina-oltre-la-cartolina"
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
                text-[#0D2340]
              "
            >
              {isEnglish ? "Read the story" : "Leggi la storia"}
              <span
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-[#0D2340]
                  text-white
                  transition-all
                  duration-300
                  group-hover:bg-[#F58220]
                "
              >
                <IconArrowUpRight size={16} stroke={1.8} />
              </span>
            </Link>
          </div>
        </article>

        {/* =================================================
            SECONDARY STORIES
        ================================================= */}

        <div
          className="
            mt-20
            grid
            gap-14
            border-t
            border-[#0D2340]/10
            pt-16
            lg:grid-cols-2
            lg:gap-16
            lg:pt-20
          "
        >
          {/* FOOD */}

          <Link
            href="/journal/una-tavola-mille-sicilie"
            className="group block"
          >
            <article>
              <div
                className="
                relative
                h-[360px]
                overflow-hidden
                rounded-[26px]
                sm:h-[460px]
              "
              >
                <Image
                  src="/images/journal-food.jpg"
                  alt={isEnglish ? "Flavours of Sicilian cuisine" : "Sapori della cucina siciliana"}
                  fill
                  sizes="
                  (max-width: 1024px) 100vw,
                  50vw
                "
                  className="
                  object-cover
                  transition-transform
                  duration-[1000ms]
                  hover:scale-[1.025]
                "
                />
              </div>

              <div className="mt-7">
                <div
                  className="
                  flex
                  items-center
                  justify-between
                  gap-6
                "
                >
                  <span
                    className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.20em]
                    text-[#F58220]
                  "
                  >
                    {isEnglish ? "Flavours" : "Sapori"}
                  </span>

                  <span
                    className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[#0D2340]/35
                  "
                  >
                    5 min
                  </span>
                </div>

                <h3
                  className="
                  mt-4
                  max-w-[570px]
                  text-[30px]
                  font-bold
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-[#0D2340]
                  sm:text-[36px]
                "
                >
                  {isEnglish ? "One table," : "Una tavola,"}
                  <br />
                  {isEnglish ? "a thousand Sicilies." : "mille Sicilie."}
                </h3>

                <p
                  className="
                  mt-5
                  max-w-[560px]
                  text-[14px]
                  leading-7
                  text-[#0D2340]/50
                "
                >
                  {isEnglish
                    ? "From market to kitchen, a journey through ingredients, traditions and gestures that change from one province to the next."
                    : "Dal mercato alla cucina, un viaggio attraverso ingredienti, tradizioni e gesti che cambiano da una provincia all’altra."}
                </p>
              </div>
            </article>
          </Link>

          {/* ISLANDS */}

          <Link
            href="/journal/eolie-mare-incontra-fuoco"
            className="group block lg:mt-24"
          >
            <article>
              <div
                className="
                relative
                h-[360px]
                overflow-hidden
                rounded-[26px]
                sm:h-[460px]
              "
              >
                <Image
                  src="/images/journal-islands.jpg"
                  alt={isEnglish ? "Aeolian Islands" : "Isole Eolie"}
                  fill
                  sizes="
                  (max-width: 1024px) 100vw,
                  50vw
                "
                  className="
                  object-cover
                  transition-transform
                  duration-[1000ms]
                  hover:scale-[1.025]
                "
                />
              </div>

              <div className="mt-7">
                <div
                  className="
                  flex
                  items-center
                  justify-between
                  gap-6
                "
                >
                  <span
                    className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.20em]
                    text-[#F58220]
                  "
                  >
                    {isEnglish ? "Islands" : "Isole"}
                  </span>

                  <span
                    className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[#0D2340]/35
                  "
                  >
                    7 min
                  </span>
                </div>

                <h3
                  className="
                  mt-4
                  max-w-[570px]
                  text-[30px]
                  font-bold
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-[#0D2340]
                  sm:text-[36px]
                "
                >
                  {isEnglish ? "Aeolian Islands." : "Eolie."}
                  <br />
                  {isEnglish
                    ? "Where the sea meets fire."
                    : "Dove il mare incontra il fuoco."}
                </h3>

                <p
                  className="
                  mt-5
                  max-w-[560px]
                  text-[14px]
                  leading-7
                  text-[#0D2340]/50
                "
                >
                  {isEnglish
                    ? "Seven islands, seven distinct characters. Volcanoes, bays, small harbours and days shaped only by the sea."
                    : "Sette isole, sette caratteri diversi. Vulcani, baie, piccoli porti e giornate scandite soltanto dal mare."}
                </p>
              </div>
            </article>
          </Link>
        </div>
      </div>
    </section>
  );
}
