"use client";

import Image from "next/image";

import {
  IconArrowRight,
  IconBeach,
  IconGlass,
  IconMountain,
  IconSailboat,
  IconSparkles,
  IconToolsKitchen2,
} from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const experiences = [
  {
    id: 1,
    title: "Escursioni in Yacht",
    category: "Mare",
    description:
      "Baie nascoste, acque cristalline e tramonti da vivere dal mare.",
    titleEn: "Yacht Excursions",
    categoryEn: "Sea",
    descriptionEn: "Hidden bays, crystal-clear waters and sunsets best enjoyed from the sea.",
    image: "/images/yacht.jpg",
    icon: IconSailboat,
  },
  {
    id: 2,
    title: "Wine Experience",
    category: "Sapori",
    description:
      "Cantine, vigneti e degustazioni tra i territori più autentici dell'isola.",
    titleEn: "Wine Experience",
    categoryEn: "Flavours",
    descriptionEn: "Wineries, vineyards and tastings across the island's most authentic regions.",
    image: "/images/wine.jpg",
    icon: IconGlass,
  },
  {
    id: 3,
    title: "Cooking Class",
    category: "Tradizione",
    description:
      "Entra nella cucina siciliana e scopri ricette, ingredienti e persone.",
    titleEn: "Cooking Class",
    categoryEn: "Tradition",
    descriptionEn: "Step into a Sicilian kitchen and discover its recipes, ingredients and people.",
    image: "/images/cooking.jpg",
    icon: IconToolsKitchen2,
  },
  {
    id: 4,
    title: "Etna Experience",
    category: "Natura",
    description:
      "Sentieri, crateri e panorami straordinari sul vulcano più iconico della Sicilia.",
    titleEn: "Etna Experience",
    categoryEn: "Nature",
    descriptionEn: "Trails, craters and extraordinary views across Sicily's most iconic volcano.",
    image: "/images/etna.jpg",
    icon: IconMountain,
  },
  {
    id: 5,
    title: "Sicilia dal Mare",
    category: "Costa",
    description:
      "Calette, riserve naturali e alcuni dei tratti di costa più suggestivi dell'isola.",
    titleEn: "Sicily from the Sea",
    categoryEn: "Coast",
    descriptionEn: "Coves, nature reserves and some of the island's most captivating coastline.",
    image: "/images/yacht.jpg",
    icon: IconBeach,
  },
  {
    id: 6,
    title: "Sapori di Sicilia",
    category: "Food",
    description:
      "Mercati, prodotti locali e tradizioni gastronomiche raccontate da chi le vive.",
    titleEn: "Flavours of Sicily",
    categoryEn: "Food",
    descriptionEn: "Markets, local produce and food traditions shared by those who live them.",
    image: "/images/cooking.jpg",
    icon: IconToolsKitchen2,
  },
];

export default function FeaturedExperiences() {
  const { openConcierge } = useConcierge();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section
      id="experiences"
      className="
        relative
        overflow-hidden
        bg-white

        pb-14
        pt-14

        sm:pb-22
        sm:pt-22

        lg:pb-20
        lg:pt-24
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#F58220]/[0.035]
          blur-3xl
        "
      />

      {/* =====================================================
          HEADER
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
        <div
          className="
            grid
            gap-5

            sm:gap-7

            lg:grid-cols-[minmax(0,1fr)_auto]
            lg:items-end
            lg:gap-12
          "
        >
          {/* =================================================
              LEFT
          ================================================= */}

          <div
            className="
              w-full
              min-w-0

              lg:max-w-[1050px]
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

                sm:block
                sm:text-sm
                sm:tracking-[0.35em]
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-[#F58220]

                  sm:hidden
                "
              />

              {isEnglish ? "Experiences" : "Esperienze"}
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

                sm:max-w-[720px]
                sm:text-[50px]

                lg:max-w-[1000px]
                lg:text-[58px]
                lg:leading-[1.04]

                xl:max-w-[1080px]
                xl:text-[62px]
              "
            >
              <span className="lg:whitespace-nowrap">
                {isEnglish ? "Do not just visit it." : "Non limitarti a visitarla."}
              </span>

              <br />

              {isEnglish ? "Experience it." : "Vivila."}
            </h2>

            <p
              className="
                mt-4
                max-w-[720px]

                text-[15px]
                leading-7
                text-slate-600

                sm:mt-5
                sm:text-lg
                sm:leading-8

                lg:max-w-[800px]
              "
            >
              {isEnglish
                ? "Discover the island's sea, flavours and traditions through selected experiences that make every journey truly personal."
                : "Il mare, i sapori e le tradizioni dell’isola attraverso esperienze selezionate per rendere ogni viaggio davvero personale."}
            </p>
          </div>

          {/* =================================================
              DESKTOP CTA
          ================================================= */}

          <button
            type="button"
            className="
              group
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2.5
              rounded-full
              border
              border-[#0D2340]/15
              bg-white

              px-5
              py-3

              text-[13px]
              font-semibold
              text-[#0D2340]

              transition-all
              duration-300

              hover:border-[#0D2340]
              hover:bg-[#0D2340]
              hover:text-white

              sm:gap-3
              sm:px-6
              sm:py-3.5
              sm:text-sm

              lg:mb-1
            "
          >
            {isEnglish ? "All experiences" : "Tutte le esperienze"}

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

      {/* =====================================================
          CONTINUOUS SLIDER
      ===================================================== */}

      <div
        className="
          experience-slider
          relative

          mt-8

          w-full
          overflow-hidden

          sm:mt-10
          lg:mt-12
        "
      >
        {/* DESKTOP LEFT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            hidden
            w-20
            bg-gradient-to-r
            from-white
            to-transparent

            lg:block
          "
        />

        {/* DESKTOP RIGHT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20
            hidden
            w-20
            bg-gradient-to-l
            from-white
            to-transparent

            lg:block
          "
        />

        <div className="experience-track flex w-max">
          {/* FIRST SET */}

          <div
            className="
              flex
              shrink-0

              gap-3
              pr-3

              sm:gap-5
              sm:pr-5

              lg:gap-6
              lg:pr-6
            "
          >
            {experiences.map((experience) => (
              <ExperienceCard
                key={`a-${experience.id}`}
                experience={experience}
                isEnglish={isEnglish}
              />
            ))}
          </div>

          {/* SECOND SET FOR INFINITE LOOP */}

          <div
            aria-hidden="true"
            className="
              flex
              shrink-0

              gap-3
              pr-3

              sm:gap-5
              sm:pr-5

              lg:gap-6
              lg:pr-6
            "
          >
            {experiences.map((experience) => (
              <ExperienceCard
                key={`b-${experience.id}`}
                experience={experience}
                isEnglish={isEnglish}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div
        className="
          relative
          mx-auto

          mt-6

          max-w-[1500px]

          px-5

          sm:mt-7
          sm:px-8

          lg:px-10
        "
      >
        <div
          className="
            flex
            flex-col
            gap-5

            border-t
            border-[#0D2340]/10

            pt-5

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:pt-6
          "
        >
          <div className="flex items-start gap-3">
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
                max-w-[720px]

                text-[13px]
                leading-6
                text-slate-500

                sm:text-base
              "
            >
              {isEnglish
                ? "Looking for something special? Tell the "
                : "Cerchi qualcosa di particolare? Raccontalo al "}
              <button
                type="button"
                onClick={() =>
                  openConcierge(
                    isEnglish
                      ? "Help me choose a special experience in Sicily"
                      : "Aiutami a scegliere un'esperienza speciale in Sicilia"
                  )
                }
                className="
                  font-semibold
                  text-[#0D2340]
                  underline
                  decoration-[#F58220]/40
                  underline-offset-4
                  transition-colors
                  hover:text-[#F58220]
                "
              >
                SicilyTrip Concierge
              </button>
              .
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

            {language === "en" ? "Discover the experiences" : "Scopri le esperienze"}
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTINUOUS ANIMATION
      ===================================================== */}

      <style>{`
        @keyframes experienceContinuousScroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .experience-track {
          animation:
            experienceContinuousScroll
            70s
            linear
            infinite;

          will-change: transform;
        }

        .experience-slider:hover .experience-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .experience-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

/* ============================================================
   EXPERIENCE CARD
============================================================ */

function ExperienceCard({
  experience,
  isEnglish,
}: {
  experience: (typeof experiences)[number];
  isEnglish: boolean;
}) {
  const Icon = experience.icon;

  return (
    <article
      className="
        group
        relative

        h-[390px]
        w-[280px]

        shrink-0
        overflow-hidden

        rounded-[24px]

        bg-[#07182D]

        shadow-[0_14px_38px_rgba(13,35,64,0.11)]

        transition-all
        duration-500

        hover:-translate-y-1.5
        hover:shadow-[0_25px_60px_rgba(13,35,64,0.17)]

        sm:h-[500px]
        sm:w-[380px]
        sm:rounded-[28px]

        lg:h-[540px]
        lg:w-[420px]
      "
    >
      {/* IMAGE */}

      <Image
        src={experience.image}
        alt={isEnglish ? experience.titleEn : experience.title}
        fill
        sizes="
          (max-width: 640px) 280px,
          (max-width: 1024px) 380px,
          420px
        "
        className="
          object-cover
          transition-transform
          duration-[1100ms]
          ease-out
          group-hover:scale-[1.055]
        "
      />

      {/* DARK OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#07182D]/95
          via-[#07182D]/20
          to-transparent
        "
      />

      {/* SOFT LIGHT */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.04]
          via-transparent
          to-transparent
        "
      />

      {/* CATEGORY */}

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
          bg-[#07182D]/35

          px-3
          py-2

          text-[9px]
          font-semibold
          uppercase
          tracking-[0.16em]
          text-white

          backdrop-blur-md

          sm:left-6
          sm:top-6
          sm:gap-2
          sm:px-3.5
          sm:text-[10px]
          sm:tracking-[0.18em]
        "
      >
        <Icon
          size={14}
          stroke={1.7}
          className="text-[#F58220]"
        />

        {isEnglish ? experience.categoryEn : experience.category}
      </div>

      {/* CONTENT */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          p-5

          sm:p-7
          lg:p-8
        "
      >
        <h3
          className="
            text-[26px]
            font-bold
            leading-[1.08]
            tracking-[-0.035em]
            text-white

            sm:text-[32px]
            lg:text-[34px]
          "
        >
          {isEnglish ? experience.titleEn : experience.title}
        </h3>

        <p
          className="
            mt-2.5
            max-w-[350px]

            text-[13px]
            leading-[1.55]
            text-white/70

            sm:mt-3
            sm:text-sm
            sm:leading-6
          "
        >
          {isEnglish ? experience.descriptionEn : experience.description}
        </p>

        <button
          type="button"
          className="
            mt-4
            inline-flex
            items-center
            gap-2

            text-[13px]
            font-semibold
            text-white

            transition-colors
            duration-300

            hover:text-[#F58220]

            sm:mt-5
            sm:text-sm
          "
        >
          {isEnglish ? "Discover" : "Scopri"}

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white/10

              transition-all
              duration-300

              group-hover:bg-[#F58220]
            "
          >
            <IconArrowRight
              size={15}
              stroke={1.8}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            />
          </span>
        </button>
      </div>
    </article>
  );
}
