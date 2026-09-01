"use client";

import Image from "next/image";

import {
  IconCompass,
  IconMapPin,
} from "@tabler/icons-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function AboutStory() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section
      id="storia"
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
        {/* INTRO */}

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
              <IconCompass
                size={15}
                stroke={1.7}
              />

              {isEnglish ? "Our idea" : "La nostra idea"}
            </div>

            <h2
              className="
                mt-5
                max-w-[900px]
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
              {isEnglish ? "A different way" : "Un altro modo"}
              <br />

              <span className="text-[#0D2340]/35">
                {isEnglish ? "to discover Sicily." : "di scoprire la Sicilia."}
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
              ? "We do not simply want to show you where to stay or what to see. We want to help you find the way you wish to experience the island."
              : "Non vogliamo mostrarti soltanto dove dormire o cosa vedere. Vogliamo aiutarti a trovare il modo in cui desideri vivere l’isola."}
          </p>
        </div>

        {/* STORY */}

        <div
          className="
            mt-16
            grid
            items-center
            gap-14
            lg:grid-cols-[minmax(0,1.12fr)_minmax(380px,0.88fr)]
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
              sm:h-[600px]
              lg:h-[720px]
            "
          >
            <Image
              src="/images/about-story.jpg"
              alt={isEnglish ? "Authentic Sicilian atmosphere" : "Atmosfera autentica siciliana"}
              fill
              sizes="
                (max-width: 1024px) 100vw,
                58vw
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
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#F58220]
                "
              >
                SicilyTrip · {isEnglish ? "Authentic Sicily" : "Sicilia autentica"}
              </p>

              <p
                className="
                  mt-2
                  max-w-[390px]
                  text-[20px]
                  font-medium
                  leading-7
                  tracking-[-0.025em]
                  text-white
                  sm:text-[24px]
                  sm:leading-8
                "
              >
                {isEnglish
                  ? "The most beautiful places are those that can still tell a story."
                  : "I luoghi più belli sono quelli che riescono ancora a raccontare una storia."}
              </p>
            </div>
          </div>

          {/* COPY */}

          <div>
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.20em]
                text-[#F58220]
              "
            >
              01 · {isEnglish ? "The starting point" : "Il punto di partenza"}
            </span>

            <h3
              className="
                mt-5
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
              {isEnglish ? (
                <>The journey<br /><span className="text-[#0D2340]/35">comes first.</span><br />Everything else follows.</>
              ) : (
                <>Prima viene<br /><span className="text-[#0D2340]/35">il viaggio.</span><br />Poi tutto il resto.</>
              )}
            </h3>

            <div
              className="
                mt-8
                max-w-[550px]
                space-y-5
                text-[14px]
                leading-7
                text-[#0D2340]/55
                sm:text-[16px]
                sm:leading-8
              "
            >
              <p>
                {isEnglish
                  ? "Sicily is made of remarkably different places: sea and volcanoes, Baroque towns, small villages, countryside, islands and a culture that changes from one area to the next."
                  : "La Sicilia è fatta di luoghi molto diversi tra loro. Mare e vulcani, città barocche, piccoli borghi, campagne, isole e una cultura che cambia continuamente da una parte all’altra del territorio."}
              </p>

              <p>
                {isEnglish
                  ? "That is why SicilyTrip does not begin with a list of properties. It begins with what you want to experience: your time, your interests and the journey you imagine."
                  : "Per questo SicilyTrip non parte da una lista di strutture. Parte da ciò che vuoi vivere: il tuo tempo, i tuoi interessi e il modo in cui immagini il viaggio."}
              </p>

              <p>
                {isEnglish
                  ? "From there, we select stays, destinations and experiences that belong together and reveal a Sicily that feels right for you."
                  : "Da lì selezioniamo soggiorni, destinazioni ed esperienze capaci di stare bene insieme e di raccontare una Sicilia che abbia senso per te."}
              </p>
            </div>

            {/* SIGNATURE */}

            <div
              className="
                mt-10
                flex
                items-center
                gap-4
                border-t
                border-[#0D2340]/10
                pt-6
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
                  bg-[#0D2340]
                  text-[#F58220]
                "
              >
                <IconMapPin
                  size={16}
                  stroke={1.8}
                />
              </span>

              <div>
                <span
                  className="
                    block
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[#0D2340]
                  "
                >
                  SicilyTrip
                </span>

                <span
                  className="
                    mt-1
                    block
                    text-[10px]
                    text-[#0D2340]/40
                  "
                >
                  Born in Sicily. Designed around you.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
