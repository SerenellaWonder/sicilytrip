"use client";

import Image from "next/image";
import Link from "next/link";

import {
  IconArrowDown,
  IconArrowUpRight,
  IconSparkles,
} from "@tabler/icons-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function ExperiencesHero() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section
      className="
        relative
        min-h-[calc(100svh-88px)]
        overflow-hidden
        bg-[#07182D]
      "
    >
      {/* BACKGROUND IMAGE */}

      <Image
        src="/images/mare.jpg"
        alt={isEnglish ? "Exclusive experiences in Sicily" : "Esperienze esclusive in Sicilia"}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* OVERLAYS */}

      <div className="absolute inset-0 bg-[#07182D]/35" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#061527]/90
          via-[#061527]/45
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#061527]/75
          via-transparent
          to-[#061527]/10
        "
      />

      {/* ORANGE GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[200px]
          bottom-[-280px]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#F58220]/15
          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100svh-88px)]
          max-w-[1500px]
          flex-col
          justify-end
          px-5
          pb-12
          pt-32
          sm:px-8
          lg:px-10
          lg:pb-16
        "
      >
        <div
          className="
            grid
            items-end
            gap-12
            lg:grid-cols-[minmax(0,1fr)_400px]
            lg:gap-20
          "
        >
          {/* LEFT */}

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

              SicilyTrip Experiences
            </div>

            <h1
              className="
                mt-6
                max-w-[920px]
                text-[52px]
                font-bold
                leading-[0.94]
                tracking-[-0.055em]
                text-white
                sm:text-[68px]
                lg:text-[82px]
                xl:text-[96px]
              "
            >
              {isEnglish ? (
                <>Do not just see<br />Sicily.<br /><span className="text-white/50">Experience it.</span></>
              ) : (
                <>Non guardare<br />la Sicilia.<br /><span className="text-white/50">Vivila.</span></>
              )}
            </h1>
          </div>

          {/* RIGHT */}

          <div className="lg:pb-2">
            <p
              className="
                max-w-[390px]
                text-[15px]
                leading-7
                text-white/65
                sm:text-[17px]
                sm:leading-8
              "
            >
              {isEnglish
                ? "The sea at dawn. A winery on Mount Etna. A private kitchen, a village after sunset. Selected experiences that take you into the island's true soul."
                : "Il mare all’alba. Una cantina sull’Etna. Una cucina privata, un borgo dopo il tramonto. Esperienze selezionate per entrare davvero nell’anima dell’isola."}
            </p>

            <Link
              href="#esperienze"
              className="
                group
                mt-8
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
              {isEnglish ? "Explore experiences" : "Esplora le esperienze"}

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
                  transition-transform
                  duration-300
                  group-hover:translate-y-1
                "
              >
                <IconArrowDown size={17} stroke={1.8} />
              </span>
            </Link>
          </div>
        </div>

        {/* BOTTOM */}

        <div
          className="
            mt-12
            flex
            items-center
            justify-between
            border-t
            border-white/15
            pt-6
          "
        >
          <div
            className="
              flex
              gap-5
              overflow-hidden
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/45
              sm:gap-8
              sm:text-[9px]
            "
          >
            <span>{isEnglish ? "Sea" : "Mare"}</span>
            <span>Food &amp; Wine</span>
            <span>{isEnglish ? "Nature" : "Natura"}</span>
            <span className="hidden sm:block">{isEnglish ? "Culture" : "Cultura"}</span>
            <span className="hidden md:block">Wellness</span>
          </div>

          <div
            className="
              hidden
              items-center
              gap-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/40
              md:flex
            "
          >
            {isEnglish ? "Authentic experiences" : "Esperienze autentiche"}

            <IconArrowUpRight
              size={14}
              stroke={1.7}
              className="text-[#F58220]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
