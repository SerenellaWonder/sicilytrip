import Image from "next/image";

import {
  IconArrowDown,
  IconMapPin,
} from "@tabler/icons-react";

export default function AboutHero() {
  return (
    <section
      className="
        relative
        min-h-[760px]
        overflow-hidden
        bg-[#07182D]
        pt-[76px]
        lg:min-h-[860px]
        lg:pt-[86px]
      "
    >
      {/* BACKGROUND */}

      <Image
        src="/images/about-hero.jpg"
        alt="Paesaggio della Sicilia"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* OVERLAYS */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#061527]/90
          via-[#061527]/48
          to-[#061527]/10
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

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[684px]
          max-w-[1500px]
          flex-col
          justify-end
          px-5
          pb-12
          sm:px-8
          lg:min-h-[774px]
          lg:px-10
          lg:pb-14
        "
      >
        <div
          className="
            grid
            items-end
            gap-12
            lg:grid-cols-[minmax(0,1fr)_360px]
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
              <IconMapPin
                size={15}
                stroke={1.7}
              />

              SicilyTrip · La nostra storia
            </div>

            <h1
              className="
                mt-6
                max-w-[980px]
                text-[52px]
                font-bold
                leading-[0.94]
                tracking-[-0.055em]
                text-white
                sm:text-[66px]
                lg:text-[82px]
                xl:text-[96px]
              "
            >
              La Sicilia
              <br />

              <span className="text-white/45">
                non si visita.
              </span>

              <br />

              Si vive.
            </h1>
          </div>

          {/* RIGHT */}

          <div className="lg:pb-3">
            <p
              className="
                max-w-[360px]
                text-[14px]
                leading-7
                text-white/65
                sm:text-[16px]
                sm:leading-8
              "
            >
              SicilyTrip nasce da un&apos;idea semplice:
              trasformare un viaggio in Sicilia in qualcosa
              di personale, autentico e difficile da
              dimenticare.
            </p>

            <a
              href="#storia"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-4
                text-[9px]
                font-bold
                uppercase
                tracking-[0.20em]
                text-white
              "
            >
              Scopri chi siamo

              <span
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  transition-all
                  duration-300
                  group-hover:border-[#F58220]
                  group-hover:bg-[#F58220]
                "
              >
                <IconArrowDown
                  size={16}
                  stroke={1.8}
                />
              </span>
            </a>
          </div>
        </div>

        {/* BOTTOM LINE */}

        <div
          className="
            mt-12
            flex
            items-center
            justify-between
            border-t
            border-white/15
            pt-5
          "
        >
          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white/40
            "
          >
            Sicilia · Mediterraneo
          </span>

          <span
            className="
              hidden
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white/40
              sm:block
            "
          >
            Esplora · Scegli · Parti
          </span>
        </div>
      </div>
    </section>
  );
}