"use client";

import Image from "next/image";

import {
  IconArrowRight,
  IconCompass,
  IconDiamond,
  IconSparkles,
} from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const values = [
  {
    icon: IconCompass,
    number: "01",
    title: "Esperienze autentiche",
    text: "Luoghi, sapori e incontri che raccontano la vera Sicilia.",
    titleEn: "Authentic experiences",
    textEn: "Places, flavours and encounters that reveal the real Sicily.",
  },
  {
    icon: IconDiamond,
    number: "02",
    title: "Strutture selezionate",
    text: "Hotel, resort e dimore scelti secondo elevati standard qualitativi.",
    titleEn: "Selected stays",
    textEn: "Hotels, resorts and residences chosen to exacting quality standards.",
  },
  {
    icon: IconSparkles,
    number: "03",
    title: "Concierge intelligente",
    text: "Un assistente personale che ti accompagna dalla ricerca alla prenotazione.",
    titleEn: "Smart concierge",
    textEn: "A personal assistant supporting you from search to booking.",
  },
];

export default function AboutSection() {
  const { openConcierge } = useConcierge();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-[#F7F6F2]

        py-14

        sm:py-22
        lg:py-24
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#F58220]/[0.045]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-[440px]
          w-[440px]
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
            MAIN ABOUT
        =================================================== */}

        <div
          className="
            grid
            items-center

            gap-8

            sm:gap-12

            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-16

            xl:gap-20
          "
        >
          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="relative">
            <div
              className="
                relative
                overflow-hidden

                rounded-[24px]

                shadow-[0_22px_60px_rgba(13,35,64,0.12)]

                sm:rounded-[36px]
                sm:shadow-[0_30px_80px_rgba(13,35,64,0.14)]
              "
            >
              <div
                className="
                  relative

                  h-[350px]

                  sm:h-[550px]
                  lg:h-[570px]
                "
              >
                <Image
                  src="/images/about.jpg"
                  alt={isEnglish ? "Experience Sicily with SicilyTrip" : "Vivi la Sicilia con SicilyTrip"}
                  fill
                  sizes="
                    (max-width: 1024px) 100vw,
                    55vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-[1200ms]
                    ease-out
                    hover:scale-[1.025]
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#07182D]/35
                    via-transparent
                    to-transparent
                  "
                />
              </div>
            </div>

            {/* ===============================================
                FLOATING SIGNATURE
            =============================================== */}

            <div
              className="
                absolute

                bottom-4
                left-4
                right-4

                rounded-[18px]
                border
                border-white/20
                bg-[#07182D]/82

                px-4
                py-3.5

                text-white
                shadow-xl
                backdrop-blur-xl

                sm:bottom-7
                sm:left-7
                sm:right-auto
                sm:max-w-[310px]
                sm:rounded-[20px]
                sm:px-6
                sm:py-5
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
                  tracking-[0.26em]
                  text-[#F58220]

                  sm:text-[10px]
                  sm:tracking-[0.28em]
                "
              >
                <IconSparkles
                  size={13}
                  stroke={1.8}
                />

                SicilyTrip
              </div>

              <p
                className="
                  mt-1.5

                  text-[13px]
                  font-medium
                  leading-5
                  text-white/90

                  sm:mt-2
                  sm:text-[15px]
                  sm:leading-6
                "
              >
                {isEnglish ? "Sicily is not just visited." : "La Sicilia non si visita."}
                <br />
                {isEnglish ? "It is experienced." : "Si vive."}
              </p>
            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

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

                sm:text-sm
                sm:tracking-[0.35em]
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

              {isEnglish ? "About us" : "Chi siamo"}
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
                sm:max-w-[650px]
                sm:text-[50px]

                lg:text-[56px]
                xl:text-[62px]
              "
            >
              {isEnglish ? (
                <>Sicily,<br />told by those<br />who truly live it.</>
              ) : (
                <>La Sicilia,<br />raccontata da chi<br />la vive davvero.</>
              )}
            </h2>

            <p
              className="
                mt-5

                max-w-[590px]
                text-[15px]
                leading-7
                text-slate-600

                sm:mt-6
                sm:text-lg
                sm:leading-8

                lg:text-[19px]
                lg:leading-9
              "
            >
              {isEnglish
                ? "SicilyTrip was created to introduce you to a different island: authentic, elegant and surprising. We select special places, quality stays and experiences that turn a holiday into a lasting memory."
                : "SicilyTrip nasce per farti scoprire un’isola diversa: autentica, elegante e sorprendente. Selezioniamo luoghi speciali, strutture di qualità ed esperienze capaci di trasformare un soggiorno in un ricordo."}
            </p>

            <p
              className="
                mt-3

                max-w-[580px]
                text-[14px]
                leading-7
                text-slate-500

                sm:text-lg
                sm:leading-8
              "
            >
              {isEnglish
                ? "More than a booking portal, it is a new way to shape your journey: from the first spark of inspiration to choosing hotels, experiences and itineraries."
                : "Non un semplice portale di prenotazione, ma un modo nuovo di costruire il viaggio: dalla prima ispirazione fino alla scelta di hotel, esperienze e itinerari."}
            </p>

            {/* ===============================================
                ACTIONS
            =============================================== */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center

                gap-3

                sm:mt-7
                sm:gap-5
              "
            >
              <button
                type="button"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#0D2340]

                  px-6
                  py-3.5

                  text-sm
                  font-semibold
                  text-white

                  shadow-[0_12px_30px_rgba(13,35,64,0.14)]

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:bg-[#F58220]

                  sm:px-8
                  sm:py-4
                "
              >
                {isEnglish ? "Discover SicilyTrip" : "Scopri SicilyTrip"}

                <IconArrowRight
                  size={18}
                  stroke={1.8}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  openConcierge(
                    isEnglish
                      ? "Help me discover how SicilyTrip can plan my trip to Sicily"
                      : "Aiutami a scoprire come SicilyTrip può organizzare il mio viaggio in Sicilia"
                  )
                }
                className="
                  group
                  inline-flex
                  items-center
                  gap-2.5

                  py-2

                  text-[13px]
                  font-semibold
                  text-[#0D2340]

                  transition-colors
                  duration-300

                  hover:text-[#F58220]

                  sm:py-3
                  sm:text-sm
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
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
                    size={16}
                    stroke={1.8}
                  />
                </span>

                {isEnglish ? "Ask the Concierge" : "Chiedi al Concierge"}
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================
            VALUES
        =================================================== */}

        <div
          className="
            mt-9
            overflow-hidden

            rounded-[24px]

            border
            border-[#0D2340]/[0.07]
            bg-white

            shadow-[0_16px_45px_rgba(13,35,64,0.055)]

            sm:mt-12
            sm:rounded-[28px]

            lg:mt-14
          "
        >
          <div className="grid md:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className={`
                    group
                    relative

                    p-5

                    transition-colors
                    duration-300

                    hover:bg-[#FAFAF7]

                    sm:p-8
                    lg:p-8

                    ${
                      index !== values.length - 1
                        ? "border-b border-[#0D2340]/[0.07] md:border-b-0 md:border-r"
                        : ""
                    }
                  `}
                >
                  <span
                    className="
                      absolute

                      right-5
                      top-5

                      text-[10px]
                      font-semibold
                      tracking-[0.18em]
                      text-[#0D2340]/20

                      sm:right-6
                      sm:text-[11px]
                    "
                  >
                    {item.number}
                  </span>

                  {/* MOBILE: icon + title on same row */}

                  <div
                    className="
                      flex
                      items-center
                      gap-4

                      sm:block
                    "
                  >
                    <div
                      className="
                        flex

                        h-10
                        w-10

                        shrink-0
                        items-center
                        justify-center
                        rounded-xl

                        bg-[#F58220]/10
                        text-[#F58220]

                        transition-all
                        duration-300

                        group-hover:bg-[#F58220]
                        group-hover:text-white

                        sm:h-11
                        sm:w-11
                        sm:rounded-2xl
                      "
                    >
                      <Icon
                        size={20}
                        stroke={1.7}
                      />
                    </div>

                    <h3
                      className="
                        pr-8

                        text-[17px]
                        font-bold
                        tracking-[-0.02em]
                        text-[#0D2340]

                        sm:mt-5
                        sm:pr-0
                        sm:text-lg

                        lg:text-xl
                      "
                    >
                      {isEnglish ? item.titleEn : item.title}
                    </h3>
                  </div>

                  <p
                    className="
                      mt-3

                      max-w-[340px]
                      text-[13px]
                      leading-6
                      text-slate-500

                      sm:mt-2
                      sm:text-sm
                    "
                  >
                    {isEnglish ? item.textEn : item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* ===================================================
            SIGNATURE
        =================================================== */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-center
            gap-2

            text-[9px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[#0D2340]/30

            sm:mt-5
            sm:text-[10px]
            sm:tracking-[0.18em]
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

          Il tuo modo di vivere la Sicilia
        </div>
      </div>
    </section>
  );
}
