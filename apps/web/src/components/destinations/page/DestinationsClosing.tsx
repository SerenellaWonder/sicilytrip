import Image from "next/image";
import Link from "next/link";

import {
  IconArrowRight,
  IconSparkles,
} from "@tabler/icons-react";

export default function DestinationsClosing() {
  return (
    <section
      className="
        relative
        bg-white
        px-4
        pb-5
        pt-4
        sm:px-5
        sm:pb-6
        lg:px-6
        lg:pb-8
      "
    >
      <div
        className="
          relative
          mx-auto
          min-h-[680px]
          max-w-[1600px]
          overflow-hidden
          rounded-[32px]
          sm:min-h-[720px]
          lg:min-h-[780px]
          lg:rounded-[42px]
        "
      >
        {/* =====================================================
            BACKGROUND IMAGE
        ===================================================== */}

        <Image
          src="/images/cta.jpg"
          alt="Viaggio in Sicilia"
          fill
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-[#061527]/45
          "
        />

        {/* GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#061527]/90
            via-[#061527]/50
            to-[#061527]/10
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#061527]/55
            via-transparent
            to-[#061527]/15
          "
        />

        {/* =====================================================
            DECORATIVE LINE
        ===================================================== */}

        <div
          className="
            absolute
            left-8
            top-8
            hidden
            items-center
            gap-4
            lg:flex
          "
        >
          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-white/50
            "
          >
            SicilyTrip
          </span>

          <span className="h-px w-16 bg-white/25" />

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-white/30
            "
          >
            Sicilia
          </span>
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div
          className="
            relative
            z-10
            flex
            min-h-[680px]
            items-end
            px-6
            pb-10
            pt-28
            sm:min-h-[720px]
            sm:px-10
            sm:pb-14
            lg:min-h-[780px]
            lg:items-center
            lg:px-16
            lg:pb-16
            lg:pt-24
            xl:px-20
          "
        >
          <div className="max-w-[790px]">

            {/* EYEBROW */}

            <div
              className="
                flex
                items-center
                gap-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-white/75
                sm:text-xs
              "
            >
              <span className="h-px w-9 bg-[#F58220]" />

              Il viaggio comincia qui
            </div>

            {/* TITLE */}

            <h2
              className="
                mt-6
                text-[46px]
                font-bold
                leading-[0.98]
                tracking-[-0.05em]
                text-white
                sm:text-[58px]
                lg:text-[70px]
                xl:text-[78px]
              "
            >
              Una Sicilia.
              <br />

              <span className="text-white/55">
                La tua.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-7
                max-w-[620px]
                text-[15px]
                leading-7
                text-white/65
                sm:text-[17px]
                sm:leading-8
              "
            >
              Non scegliere soltanto una destinazione.
              Costruisci il modo in cui vuoi viverla.
              SicilyTrip unisce luoghi, soggiorni ed esperienze
              per trasformare la Sicilia nel tuo viaggio.
            </p>

            {/* CTA */}

            <div
              className="
                mt-9
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
              "
            >
              {/* PRIMARY */}

              <Link
                href="/concierge"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#F58220]
                  px-7
                  text-[12px]
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-white
                  hover:text-[#0D2340]
                "
              >
                <IconSparkles
                  size={17}
                  stroke={1.7}
                />

                Crea un viaggio per me

                <IconArrowRight
                  size={17}
                  stroke={1.8}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              {/* SECONDARY */}

              <Link
                href="/hotel"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-white/30
                  bg-white/10
                  px-7
                  text-[12px]
                  font-semibold
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-white
                  hover:bg-white
                  hover:text-[#0D2340]
                "
              >
                Esplora gli hotel

                <IconArrowRight
                  size={17}
                  stroke={1.8}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM DETAILS
        ===================================================== */}

        <div
          className="
            absolute
            bottom-8
            right-8
            z-10
            hidden
            items-center
            gap-5
            lg:flex
          "
        >
          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.20em]
              text-white/35
            "
          >
            37° N
          </span>

          <span className="h-px w-8 bg-white/20" />

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.20em]
              text-white/35
            "
          >
            Mediterraneo
          </span>
        </div>
      </div>
    </section>
  );
}