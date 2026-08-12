"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  IconArrowUpRight,
  IconCompass,
} from "@tabler/icons-react";

type Experience = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  href: string;
};

const experiences: Experience[] = [
  {
    id: "mare",
    number: "01",
    title: "Mare & Yacht",
    eyebrow: "Mediterraneo",
    description:
      "Naviga lungo la costa siciliana, raggiungi baie nascoste e isole vulcaniche con esperienze private disegnate intorno al tuo viaggio.",
    image: "/images/mare.jpg",
    href: "/esperienze/mare-yacht",
  },
  {
    id: "foodwine",
    number: "02",
    title: "Food & Wine",
    eyebrow: "Sapori di Sicilia",
    description:
      "Cantine sull'Etna, tavole private, produttori locali e cucina siciliana raccontata attraverso luoghi, persone e sapori autentici.",
    image: "/images/foodwine.jpg",
    href: "/esperienze/food-wine",
  },
  {
    id: "etna",
    number: "03",
    title: "Etna & Natura",
    eyebrow: "Terra viva",
    description:
      "Cammina tra crateri, colate laviche, boschi e vigneti per scoprire il lato più potente e sorprendente della Sicilia.",
    image: "/images/etna1.jpg",
    href: "/esperienze/etna-natura",
  },
  {
    id: "arte",
    number: "04",
    title: "Arte & Cultura",
    eyebrow: "Storie millenarie",
    description:
      "Palazzi, siti archeologici, città barocche e luoghi normalmente invisibili diventano parte di un itinerario costruito su misura.",
    image: "/images/arte.jpg",
    href: "/esperienze/arte-cultura",
  },
  {
    id: "wellness",
    number: "05",
    title: "Wellness",
    eyebrow: "Tempo per sé",
    description:
      "Spa, resort immersi nella natura e rituali di benessere per rallentare e vivere il Mediterraneo con un ritmo completamente diverso.",
    image: "/images/spa.jpg",
    href: "/esperienze/wellness",
  },
  {
    id: "private",
    number: "06",
    title: "Esperienze Private",
    eyebrow: "Solo per te",
    description:
      "Cene private, accessi esclusivi e momenti creati intorno ai tuoi desideri. La Sicilia diventa un'esperienza personale.",
    image: "/images/private.jpg",
    href: "/esperienze/private",
  },
];
export default function ExperiencesExplorer() {
  const [activeId, setActiveId] = useState("mare");

  const active =
    experiences.find((experience) => experience.id === activeId) ??
    experiences[0];

  return (
    <section
      id="esperienze"
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
        {/* HEADER */}

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
              <IconCompass size={15} stroke={1.7} />

              Scegli come viverla
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
              La Sicilia
              <br />

              <span className="text-[#0D2340]/35">
                non ha un solo ritmo.
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
            Scegli ciò che ti ispira. Dal Mediterraneo
            ai vigneti dell&apos;Etna, dall&apos;arte al benessere:
            ogni esperienza può diventare parte del tuo
            viaggio in Sicilia.
          </p>
        </div>

        {/* DESKTOP */}

        <div
          className="
            mt-16
            hidden
            grid-cols-[minmax(0,1.2fr)_minmax(390px,0.8fr)]
            gap-16
            lg:grid
            xl:gap-24
          "
        >
          {/* LARGE ACTIVE IMAGE */}

          <div className="relative">
            <Link
              key={active.id}
              href={active.href}
              className="
                experience-image
                group
                relative
                block
                h-[720px]
                overflow-hidden
                rounded-[34px]
              "
            >
              <Image
                src={active.image}
                alt={active.title}
                fill
                sizes="60vw"
                className="
                  object-cover
                  transition-transform
                  duration-[1400ms]
                  ease-out
                  group-hover:scale-[1.025]
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#061527]/90
                  via-[#061527]/10
                  to-transparent
                "
              />

              {/* TOP */}

              <div
                className="
                  absolute
                  left-8
                  right-8
                  top-8
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-white/70
                  "
                >
                  {active.eyebrow}
                </span>

                <span
                  className="
                    text-[10px]
                    font-semibold
                    tracking-[0.22em]
                    text-white/45
                  "
                >
                  {active.number} / 06
                </span>
              </div>

              {/* BOTTOM CONTENT */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  p-9
                  xl:p-12
                "
              >
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.24em]
                    text-[#F58220]
                  "
                >
                  SicilyTrip Experience
                </p>

                <h3
                  className="
                    mt-3
                    max-w-[700px]
                    text-[50px]
                    font-bold
                    leading-[0.98]
                    tracking-[-0.05em]
                    text-white
                    xl:text-[64px]
                  "
                >
                  {active.title}
                </h3>

                <div
                  className="
                    mt-6
                    flex
                    items-end
                    justify-between
                    gap-10
                  "
                >
                  <p
                    className="
                      max-w-[520px]
                      text-[14px]
                      leading-7
                      text-white/65
                    "
                  >
                    {active.description}
                  </p>

                  <span
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#0D2340]
                      transition-all
                      duration-300
                      group-hover:bg-[#F58220]
                      group-hover:text-white
                    "
                  >
                    <IconArrowUpRight
                      size={18}
                      stroke={1.8}
                    />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* EXPERIENCE SELECTOR */}

          <div
            className="
              flex
              flex-col
              justify-center
              border-t
              border-[#0D2340]/10
            "
          >
            {experiences.map((experience) => {
              const isActive = experience.id === activeId;

              return (
                <button
                  key={experience.id}
                  type="button"
                  onMouseEnter={() => setActiveId(experience.id)}
                  onFocus={() => setActiveId(experience.id)}
                  onClick={() => setActiveId(experience.id)}
                  className="
                    group
                    relative
                    w-full
                    border-b
                    border-[#0D2340]/10
                    py-7
                    text-left
                  "
                >
                  <span
                    className={`
                      absolute
                      bottom-[-1px]
                      left-0
                      h-[2px]
                      bg-[#F58220]
                      transition-all
                      duration-500
                      ${
                        isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />

                  <div
                    className="
                      grid
                      grid-cols-[42px_minmax(0,1fr)_42px]
                      items-center
                      gap-4
                    "
                  >
                    <span
                      className={`
                        text-[9px]
                        font-semibold
                        tracking-[0.18em]
                        transition-colors
                        ${
                          isActive
                            ? "text-[#F58220]"
                            : "text-[#0D2340]/25"
                        }
                      `}
                    >
                      {experience.number}
                    </span>

                    <div>
                      <span
                        className={`
                          block
                          text-[24px]
                          font-bold
                          tracking-[-0.035em]
                          transition-all
                          duration-300
                          xl:text-[28px]
                          ${
                            isActive
                              ? "translate-x-1 text-[#0D2340]"
                              : "text-[#0D2340]/45 group-hover:text-[#0D2340]"
                          }
                        `}
                      >
                        {experience.title}
                      </span>

                      <span
                        className={`
                          mt-1
                          block
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.17em]
                          transition-colors
                          ${
                            isActive
                              ? "text-[#0D2340]/45"
                              : "text-[#0D2340]/20"
                          }
                        `}
                      >
                        {experience.eyebrow}
                      </span>
                    </div>

                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "border-[#F58220] bg-[#F58220] text-white"
                            : "border-[#0D2340]/10 text-[#0D2340]/30 group-hover:border-[#0D2340] group-hover:text-[#0D2340]"
                        }
                      `}
                    >
                      <IconArrowUpRight
                        size={15}
                        stroke={1.7}
                      />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MOBILE / TABLET */}

        <div
          className="
            mt-12
            border-t
            border-[#0D2340]/10
            lg:hidden
          "
        >
          {experiences.map((experience) => (
            <Link
              key={experience.id}
              href={experience.href}
              className="
                group
                block
                border-b
                border-[#0D2340]/10
                py-7
              "
            >
              <div
                className="
                  grid
                  grid-cols-[34px_minmax(0,1fr)_40px]
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    text-[9px]
                    font-semibold
                    tracking-[0.16em]
                    text-[#F58220]
                  "
                >
                  {experience.number}
                </span>

                <div>
                  <h3
                    className="
                      text-[26px]
                      font-bold
                      tracking-[-0.04em]
                      text-[#0D2340]
                    "
                  >
                    {experience.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.17em]
                      text-[#0D2340]/35
                    "
                  >
                    {experience.eyebrow}
                  </p>
                </div>

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
                    text-[#0D2340]
                  "
                >
                  <IconArrowUpRight
                    size={16}
                    stroke={1.7}
                  />
                </span>
              </div>

              <div
                className="
                  relative
                  mt-5
                  h-[270px]
                  overflow-hidden
                  rounded-[24px]
                  sm:h-[400px]
                "
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  sizes="100vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.025]
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#061527]/45
                    via-transparent
                    to-transparent
                  "
                />
              </div>

              <p
                className="
                  mt-5
                  max-w-[600px]
                  text-[13px]
                  leading-6
                  text-[#0D2340]/50
                "
              >
                {experience.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes experienceImageIn {
          from {
            opacity: 0;
            transform: scale(1.01);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .experience-image {
          animation: experienceImageIn 420ms ease-out;
        }
      `}</style>
    </section>
  );
}