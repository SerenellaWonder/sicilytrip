"use client";

import {
  IconArrowUpRight,
  IconMapPin,
  IconSparkles,
} from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function AboutManifesto() {
  const { openConcierge } = useConcierge();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  function handleConcierge() {
    openConcierge(
      isEnglish
        ? "I would like to discover Sicily with SicilyTrip. Help me imagine a journey built around my interests."
        : "Vorrei scoprire la Sicilia con SicilyTrip. Aiutami a immaginare un viaggio costruito intorno ai miei interessi."
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
        xl:py-40
      "
    >
      {/* DECORATIVE GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[300px]
          -top-[300px]
          h-[700px]
          w-[700px]
          rounded-full
          bg-[#F58220]/[0.08]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[350px]
          right-[-250px]
          h-[800px]
          w-[800px]
          rounded-full
          bg-white/[0.025]
          blur-3xl
        "
      />

      {/* LARGE BACKGROUND WORD */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          hidden
          -translate-x-1/2
          -translate-y-1/2
          select-none
          whitespace-nowrap
          text-[250px]
          font-bold
          leading-none
          tracking-[-0.08em]
          text-white/[0.018]
          xl:block
        "
      >
        SICILIA
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
            TOP
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            pb-7
          "
        >
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
            <IconSparkles
              size={15}
              stroke={1.7}
            />

            {isEnglish ? "Our manifesto" : "Il nostro manifesto"}
          </div>

          <span
            className="
              hidden
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white/25
              sm:block
            "
          >
            SicilyTrip · 2026
          </span>
        </div>

        {/* =================================================
            MAIN STATEMENT
        ================================================= */}

        <div
          className="
            mx-auto
            max-w-[1240px]
            py-20
            text-center
            sm:py-24
            lg:py-32
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-white/35
            "
          >
            {isEnglish ? "We believe that" : "Crediamo che"}
          </p>

          <h2
            className="
              mx-auto
              mt-7
              max-w-[1200px]
              text-[43px]
              font-bold
              leading-[1.01]
              tracking-[-0.055em]
              text-white
              sm:text-[56px]
              lg:text-[72px]
              xl:text-[84px]
            "
          >
            {isEnglish ? "luxury is not about" : "il lusso non sia"}
            <br />

            <span className="text-white/35">
              {isEnglish ? "having more things." : "avere più cose."}
            </span>
          </h2>

          <div
            className="
              mx-auto
              my-10
              h-[1px]
              w-14
              bg-[#F58220]
              sm:my-12
            "
          />

          <h3
            className="
              mx-auto
              max-w-[1050px]
              text-[34px]
              font-semibold
              leading-[1.08]
              tracking-[-0.045em]
              text-white
              sm:text-[44px]
              lg:text-[56px]
            "
          >
            {isEnglish ? "It is having the time" : "È avere il tempo"}
            <br />

            <span className="text-[#F58220]">
              {isEnglish ? "to experience the right ones." : "di vivere quelle giuste."}
            </span>
          </h3>

          <p
            className="
              mx-auto
              mt-10
              max-w-[650px]
              text-[14px]
              leading-7
              text-white/45
              sm:text-[16px]
              sm:leading-8
            "
          >
            {isEnglish
              ? "A place you did not know. A table you will remember. A road taken without rushing. A view you had not planned. These are the moments that shape the journey we want to create."
              : "Un luogo che non conoscevi. Una tavola che ricorderai. Una strada presa senza fretta. Una vista che non avevi programmato. È da questi momenti che nasce il viaggio che vogliamo costruire."}
          </p>
        </div>

        {/* =================================================
            MANIFESTO LINE
        ================================================= */}

        <div
          className="
            grid
            border-y
            border-white/10

            sm:grid-cols-3
          "
        >
          <div
            className="
              border-b
              border-white/10
              py-7
              sm:border-b-0
              sm:pr-7
            "
          >
            <span
              className="
                block
                text-[9px]
                font-bold
                tracking-[0.18em]
                text-[#F58220]
              "
            >
              01
            </span>

            <span
              className="
                mt-3
                block
                text-[13px]
                font-medium
                text-white/65
              "
            >
              {isEnglish ? "Less noise." : "Meno rumore."}
            </span>
          </div>

          <div
            className="
              border-b
              border-white/10
              py-7
              sm:border-b-0
              sm:border-l
              sm:border-white/10
              sm:px-7
            "
          >
            <span
              className="
                block
                text-[9px]
                font-bold
                tracking-[0.18em]
                text-[#F58220]
              "
            >
              02
            </span>

            <span
              className="
                mt-3
                block
                text-[13px]
                font-medium
                text-white/65
              "
            >
              {isEnglish ? "More authenticity." : "Più autenticità."}
            </span>
          </div>

          <div
            className="
              py-7
              sm:border-l
              sm:border-white/10
              sm:pl-7
            "
          >
            <span
              className="
                block
                text-[9px]
                font-bold
                tracking-[0.18em]
                text-[#F58220]
              "
            >
              03
            </span>

            <span
              className="
                mt-3
                block
                text-[13px]
                font-medium
                text-white/65
              "
            >
              {isEnglish ? "More Sicily." : "Più Sicilia."}
            </span>
          </div>
        </div>

        {/* =================================================
            CLOSING
        ================================================= */}

        <div
          className="
            mt-14
            grid
            gap-10
            lg:mt-20
            lg:grid-cols-[minmax(0,1fr)_auto]
            lg:items-end
            lg:gap-20
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.20em]
                text-white/30
              "
            >
              <IconMapPin
                size={14}
                stroke={1.7}
                className="text-[#F58220]"
              />

              {isEnglish ? "Sicily, Italy" : "Sicilia, Italia"}
            </div>

            <p
              className="
                mt-4
                max-w-[680px]
                text-[24px]
                font-semibold
                leading-[1.2]
                tracking-[-0.03em]
                text-white
                sm:text-[30px]
                lg:text-[34px]
              "
            >
              {isEnglish
                ? "Your journey can begin before you even leave."
                : "Il tuo viaggio può iniziare prima ancora di partire."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleConcierge}
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-4
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white
            "
          >
            {isEnglish ? "Talk to the Concierge" : "Parla con il Concierge"}

            <span
              className="
                flex
                h-12
                w-12
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
        </div>
      </div>
    </section>
  );
}
