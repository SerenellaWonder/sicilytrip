"use client";

import {
  IconArrowDownRight,
  IconCheck,
  IconRoute,
  IconSparkles,
} from "@tabler/icons-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const principles = [
  {
    number: "01",
    title: "Selezioniamo",
    subtitle: "Solo ciò che vale il viaggio.",
    description:
      "Cerchiamo luoghi, soggiorni ed esperienze capaci di raccontare davvero il territorio. Non una raccolta infinita di alternative, ma una selezione costruita intorno a qualità, identità e autenticità.",
    titleEn: "We select",
    subtitleEn: "Only what is worth the journey.",
    descriptionEn: "We seek places, stays and experiences that truly express their region. Not an endless collection of alternatives, but a selection built around quality, identity and authenticity.",
    icon: IconCheck,
  },
  {
    number: "02",
    title: "Connettiamo",
    subtitle: "Ogni scelta diventa parte di un percorso.",
    description:
      "Una struttura, una destinazione o un'esperienza acquistano valore quando dialogano tra loro. SicilyTrip mette insieme questi elementi per trasformarli in un viaggio coerente, personale e semplice da vivere.",
    titleEn: "We connect",
    subtitleEn: "Every choice becomes part of a journey.",
    descriptionEn: "A property, destination or experience gains meaning when each connects with the others. SicilyTrip brings these elements together into a coherent, personal and effortless journey.",
    icon: IconRoute,
  },
  {
    number: "03",
    title: "Accompagniamo",
    subtitle: "Tecnologia quando serve. Presenza quando conta.",
    description:
      "Il Concierge SicilyTrip ti aiuta a orientarti, trovare ispirazione e costruire il viaggio intorno alle tue esigenze. Prima della partenza e durante l'esperienza, senza perdere il valore del rapporto umano.",
    titleEn: "We guide",
    subtitleEn: "Technology when useful. Presence when it matters.",
    descriptionEn: "The SicilyTrip Concierge helps you find direction, inspiration and build a journey around your needs, before departure and throughout the experience without losing the value of human connection.",
    icon: IconSparkles,
  },
];

export default function AboutApproach() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        lg:py-32
        xl:py-36
      "
    >
      {/* DECORATIVE NUMBER */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-8
          top-8
          hidden
          select-none
          text-[260px]
          font-bold
          leading-none
          tracking-[-0.08em]
          text-[#0D2340]/[0.025]
          xl:block
        "
      >
        03
      </div>

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
        {/* =================================================
            INTRO
        ================================================= */}

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]
            lg:gap-20
            xl:gap-28
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
              <span
                className="
                  h-[6px]
                  w-[6px]
                  rounded-full
                  bg-[#F58220]
                "
              />

              {isEnglish ? "Our approach" : "Il nostro modo"}
            </div>

            <h2
              className="
                mt-5
                max-w-[680px]
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
              {isEnglish ? "Fewer choices." : "Meno scelta."}
              <br />

              <span className="text-[#0D2340]/35">
                {isEnglish ? "More meaning." : "Più significato."}
              </span>
            </h2>
          </div>

          <div
            className="
              flex
              items-end
              lg:justify-end
            "
          >
            <div className="max-w-[520px]">
              <p
                className="
                  text-[16px]
                  leading-8
                  text-[#0D2340]/60
                  sm:text-[18px]
                  sm:leading-9
                "
              >
                {isEnglish
                  ? "A journey does not become better by containing more things. It becomes better when every choice has a reason to be there."
                  : "Un viaggio non diventa migliore perché contiene più cose. Diventa migliore quando ogni scelta ha un motivo per esserci."}
              </p>

              <div
                className="
                  mt-7
                  flex
                  items-center
                  gap-4
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
                    border
                    border-[#0D2340]/10
                    text-[#F58220]
                  "
                >
                  <IconArrowDownRight
                    size={16}
                    stroke={1.8}
                  />
                </span>

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.20em]
                    text-[#0D2340]/45
                  "
                >
                  {isEnglish ? "The SicilyTrip method" : "Il metodo SicilyTrip"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            PRINCIPLES
        ================================================= */}

        <div
          className="
            mt-16
            border-t
            border-[#0D2340]/10
            lg:mt-20
          "
        >
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <div
                key={principle.number}
                className="
                  group
                  grid
                  gap-7
                  border-b
                  border-[#0D2340]/10
                  py-10
                  transition-colors
                  duration-500

                  md:grid-cols-[70px_minmax(220px,0.75fr)_minmax(0,1.25fr)_56px]
                  md:items-start
                  md:gap-8

                  lg:grid-cols-[90px_minmax(300px,0.8fr)_minmax(0,1.2fr)_64px]
                  lg:py-12

                  xl:gap-12
                "
              >
                {/* NUMBER */}

                <div>
                  <span
                    className="
                      text-[10px]
                      font-bold
                      tracking-[0.18em]
                      text-[#F58220]
                    "
                  >
                    {principle.number}
                  </span>
                </div>

                {/* TITLE */}

                <div>
                  <h3
                    className="
                      text-[30px]
                      font-bold
                      leading-none
                      tracking-[-0.04em]
                      text-[#0D2340]
                      transition-transform
                      duration-500
                      group-hover:translate-x-1

                      sm:text-[34px]
                      lg:text-[38px]
                    "
                  >
                    {isEnglish ? principle.titleEn : principle.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-[300px]
                      text-[11px]
                      font-semibold
                      leading-5
                      text-[#0D2340]/40
                    "
                  >
                    {isEnglish ? principle.subtitleEn : principle.subtitle}
                  </p>
                </div>

                {/* DESCRIPTION */}

                <p
                  className="
                    max-w-[650px]
                    text-[14px]
                    leading-7
                    text-[#0D2340]/55

                    sm:text-[15px]
                    sm:leading-8
                  "
                >
                  {isEnglish ? principle.descriptionEn : principle.description}
                </p>

                {/* ICON */}

                <div
                  className="
                    flex
                    md:justify-end
                  "
                >
                  <span
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#0D2340]/10
                      bg-[#F7F3EC]
                      text-[#0D2340]
                      transition-all
                      duration-500

                      group-hover:border-[#F58220]
                      group-hover:bg-[#F58220]
                      group-hover:text-white

                      lg:h-14
                      lg:w-14
                    "
                  >
                    <Icon
                      size={19}
                      stroke={1.6}
                    />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div
          className="
            mt-14
            grid
            gap-8
            lg:grid-cols-[minmax(0,1fr)_520px]
            lg:items-end
            lg:gap-20
            lg:mt-20
          "
        >
          <p
            className="
              max-w-[820px]
              text-[30px]
              font-semibold
              leading-[1.15]
              tracking-[-0.035em]
              text-[#0D2340]

              sm:text-[36px]
              lg:text-[42px]
            "
          >
            {isEnglish ? (
              <>We do not simply want<br className="hidden sm:block" />to take you to Sicily.</>
            ) : (
              <>Non vogliamo portarti<br className="hidden sm:block" />semplicemente in Sicilia.</>
            )}
          </p>

          <p
            className="
              max-w-[500px]
              text-[14px]
              leading-7
              text-[#0D2340]/50
              sm:text-[15px]
              sm:leading-8
            "
          >
            {isEnglish
              ? "We want to help you find the part of the island that, for a few days, can feel like yours alone."
              : "Vogliamo aiutarti a trovare quella parte dell’isola che, per qualche giorno, possa sembrare soltanto tua."}
          </p>
        </div>
      </div>
    </section>
  );
}
