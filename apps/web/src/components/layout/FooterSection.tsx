"use client";

import Image from "next/image";
import Link from "next/link";

import {
  IconArrowRight,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  IconSparkles,
} from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";

const menu = [
  {
    label: "Destinazioni",
    href: "/destinazioni",
  },
  {
    label: "Hotel",
    href: "/#destinations",
  },
  {
    label: "Esperienze",
    href: "/esperienze",
  },
  {
    label: "Chi siamo",
    href: "/chi-siamo",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Contatti",
    href: "/contatti",
  },
];

export default function FooterSection() {
  const { openConcierge } = useConcierge();

  return (
    <>
      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#07182D]
        "
      >
        <div
          className="
            relative
            h-[540px]
            w-full

            sm:h-[640px]
            lg:h-[680px]
          "
        >
          <Image
            src="/images/cta.jpg"
            alt="La Sicilia che immagini"
            fill
            priority={false}
            sizes="100vw"
            className="
              object-cover
              object-center
              transition-transform
              duration-[1800ms]
              ease-out
              hover:scale-[1.015]
            "
          />

          {/* MOBILE CONTRAST */}

          <div
            className="
              absolute
              inset-0
              bg-[#07182D]/30

              sm:bg-[#07182D]/20
            "
          />

          <div
            className="
              absolute
              inset-0

              bg-gradient-to-r
              from-[#07182D]/90
              via-[#07182D]/58
              to-[#07182D]/15

              sm:from-[#07182D]/82
              sm:via-[#07182D]/42
              sm:to-[#07182D]/5
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-[#07182D]/10
              via-transparent
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0

              h-[180px]

              bg-gradient-to-b
              from-transparent
              via-[#07182D]/65
              to-[#07182D]

              sm:h-[220px]
            "
          />

          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              h-full
              max-w-[1500px]
              items-center

              px-5

              sm:px-8
              lg:px-10
            "
          >
            <div
              className="
                max-w-[760px]

                pb-10

                sm:pb-20
                lg:pb-24
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3

                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#F58220]

                  sm:text-xs
                  sm:tracking-[0.32em]
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

                Il tuo viaggio inizia qui
              </div>

              <h2
                className="
                  mt-5

                  text-[38px]
                  font-bold
                  leading-[1.02]
                  tracking-[-0.045em]
                  text-white

                  sm:mt-6
                  sm:text-[54px]

                  lg:text-[66px]
                  xl:text-[72px]
                "
              >
                La Sicilia
                <br />
                che immagini.
                <br />

                <span className="text-white/70">
                  E qualcosa in più.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-[620px]

                  text-[14px]
                  leading-7
                  text-white/75

                  sm:mt-6
                  sm:text-lg
                  sm:leading-8

                  lg:text-[19px]
                  lg:leading-9
                "
              >
                Hotel selezionati, esperienze autentiche e
                itinerari costruiti intorno al tuo modo di
                viaggiare.
              </p>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-center

                  gap-3

                  sm:mt-8
                  sm:gap-5
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    openConcierge(
                      "Aiutami a creare il mio viaggio in Sicilia"
                    )
                  }
                  className="
                    group
                    inline-flex
                    w-fit
                    items-center
                    gap-3

                    rounded-full
                    bg-[#F58220]

                    px-6
                    py-3.5

                    text-[13px]
                    font-semibold
                    text-white

                    shadow-[0_12px_35px_rgba(245,130,32,0.28)]

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:bg-[#FF9238]

                    sm:px-8
                    sm:py-4
                    sm:text-sm
                  "
                >
                  Inizia il tuo viaggio

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
                  onClick={() => openConcierge()}
                  className="
                    group
                    inline-flex
                    w-fit
                    items-center
                    gap-2.5

                    py-2

                    text-[12px]
                    font-medium
                    text-white/75

                    transition-colors
                    duration-300

                    hover:text-white

                    sm:px-2
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
                      border
                      border-white/20
                      bg-white/10
                      backdrop-blur-md

                      transition-all
                      duration-300

                      group-hover:border-[#F58220]
                      group-hover:bg-[#F58220]
                    "
                  >
                    <IconSparkles
                      size={16}
                      stroke={1.7}
                    />
                  </span>

                  Chiedi al Concierge
                </button>
              </div>
            </div>
          </div>

          <div
            className="
              absolute
              bottom-8
              right-8
              z-10

              hidden
              items-center
              gap-2

              text-[9px]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-white/35

              sm:flex
              lg:right-10
            "
          >
            <IconSparkles
              size={12}
              stroke={1.7}
              className="text-[#F58220]"
            />

            SicilyTrip
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        id="footer"
        className="
          relative
          overflow-hidden
          bg-[#07182D]
          text-white
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0

            h-[300px]
            w-[800px]

            -translate-x-1/2
            rounded-full
            bg-[#153B68]/20
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-[1500px]

            px-5

            sm:px-6
            md:px-10
          "
        >
          {/* BRAND */}

          <div
            className="
              pb-8
              pt-7
              text-center

              sm:pb-11
              sm:pt-9

              md:pb-13
              md:pt-11
            "
          >
            <Image
              src="/images/logo.png"
              alt="SicilyTrip"
              width={300}
              height={110}
              className="
                mx-auto
                h-auto

                w-[190px]

                object-contain

                sm:w-[250px]
                lg:w-[270px]
              "
            />

            <p
              className="
                mt-4

                text-[9px]
                font-medium
                uppercase
                tracking-[0.38em]
                text-white/45

                sm:mt-5
                sm:text-xs
                sm:tracking-[0.48em]
              "
            >
              Scopri · Vivi · Ricorda
            </p>
          </div>

          {/* NAVIGATION */}

          <div
            className="
              border-y
              border-white/10

              py-6

              sm:py-8
            "
          >
            <nav
              className="
                flex
                flex-wrap
                items-center
                justify-center

                gap-x-5
                gap-y-4

                sm:gap-x-10
                sm:gap-y-5

                lg:gap-x-16
              "
            >
              {menu.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-white/60

                    transition-colors
                    duration-300

                    hover:text-[#F58220]

                    sm:text-sm
                    sm:tracking-[0.15em]
                  "
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* JOURNAL */}

          <div
            id="journal"
            className="
              mx-auto
              max-w-5xl
              scroll-mt-[100px]

              py-10
              text-center

              sm:py-14
              md:py-16
            "
          >
            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.30em]
                text-[#F58220]

                sm:text-xs
                sm:tracking-[0.38em]
              "
            >
              SicilyTrip Journal
            </span>

            <h3
              className="
                mx-auto
                mt-4
                max-w-[330px]

                text-[28px]
                font-semibold
                leading-[1.1]
                tracking-[-0.03em]
                text-white

                sm:mt-5
                sm:max-w-none
                sm:text-4xl

                lg:text-[46px]
              "
            >
              Lasciati ispirare dalla Sicilia
            </h3>

            <p
              className="
                mx-auto
                mt-4
                max-w-[330px]

                text-[14px]
                leading-6
                text-white/55

                sm:mt-5
                sm:max-w-2xl
                sm:text-lg
                sm:leading-8
              "
            >
              Luoghi da scoprire, esperienze esclusive e nuove
              idee per il tuo prossimo viaggio.
            </p>

            <form
              className="
                mx-auto
                mt-7
                flex
                max-w-3xl
                items-center

                rounded-full
                border
                border-white/15
                bg-white/[0.055]

                p-1

                backdrop-blur-xl

                transition-all
                duration-300

                focus-within:border-[#F58220]/60
                focus-within:bg-white/[0.08]

                sm:mt-9
                sm:p-1.5
              "
              onSubmit={(e) => e.preventDefault()}
            >
              <IconMail
                size={20}
                stroke={1.6}
                className="
                  ml-5
                  hidden
                  shrink-0
                  text-white/35

                  sm:block
                "
              />

              <input
                type="email"
                placeholder="La tua email"
                aria-label="Indirizzo email"
                className="
                  min-w-0
                  flex-1
                  bg-transparent

                  px-4
                  py-3

                  text-[14px]
                  text-white

                  outline-none
                  placeholder:text-white/35

                  sm:px-5
                  sm:py-4
                  sm:text-base
                "
              />

              <button
                type="submit"
                aria-label="Iscriviti alla newsletter"
                className="
                  flex

                  h-11
                  w-11

                  shrink-0
                  items-center
                  justify-center
                  rounded-full

                  bg-[#F58220]
                  text-white

                  shadow-[0_8px_25px_rgba(245,130,32,0.25)]

                  transition-all
                  duration-300

                  hover:scale-105
                  hover:bg-[#FF9238]

                  sm:h-14
                  sm:w-14
                "
              >
                <IconArrowRight
                  size={20}
                  stroke={1.8}
                />
              </button>
            </form>
          </div>

          {/* SOCIAL / CONTACT */}

          <div
            className="
              grid

              gap-6

              border-t
              border-white/10

              py-8

              md:grid-cols-2
              md:items-center
              md:gap-8
              md:py-10
            "
          >
            <div
              className="
                text-center
                md:text-left
              "
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-white/35

                  sm:text-[10px]
                "
              >
                SicilyTrip
              </p>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-[330px]

                  text-[13px]
                  leading-6
                  text-white/50

                  sm:text-sm

                  md:mx-0
                  md:max-w-[500px]
                "
              >
                Un nuovo modo di scoprire, organizzare e vivere
                la Sicilia.
              </p>
            </div>

            <div
              className="
                flex
                justify-center
                gap-3

                md:justify-end
              "
            >
              <SocialLink label="Instagram">
                <IconBrandInstagram
                  size={20}
                  stroke={1.6}
                />
              </SocialLink>

              <SocialLink label="Facebook">
                <IconBrandFacebook
                  size={20}
                  stroke={1.6}
                />
              </SocialLink>

              <SocialLink label="LinkedIn">
                <IconBrandLinkedin
                  size={20}
                  stroke={1.6}
                />
              </SocialLink>
            </div>
          </div>

          {/* COPYRIGHT */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-between

              gap-4

              border-t
              border-white/10

              py-6

              text-center
              text-[10px]
              leading-5
              text-white/35

              sm:text-xs

              md:flex-row
              md:gap-5
              md:py-7
              md:text-left
            "
          >
            <p>
              © 2026 SicilyTrip · Tutti i diritti riservati.
            </p>

            <div
              className="
                flex
                flex-wrap
                justify-center

                gap-x-5
                gap-y-2

                sm:gap-x-7
                sm:gap-y-3
              "
            >
              <Link
                href="/privacy"
                className="
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Privacy
              </Link>

              <Link
                href="/cookie"
                className="
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Cookie
              </Link>

              <Link
                href="/termini"
                className="
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Termini e condizioni
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function SocialLink({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href="#"
      aria-label={label}
      className="
        flex

        h-11
        w-11

        items-center
        justify-center
        rounded-full

        border
        border-white/15

        text-white/60

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#F58220]
        hover:bg-[#F58220]
        hover:text-white

        sm:h-12
        sm:w-12
      "
    >
      {children}
    </Link>
  );
}
