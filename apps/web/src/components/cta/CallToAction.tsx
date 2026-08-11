"use client";

import Image from "next/image";

import {
  IconArrowRight,
  IconSparkles,
} from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";

export default function CallToAction() {
  const { openConcierge } = useConcierge();

  return (
    <section
      className="
        relative
        bg-white
        px-4
        pb-8
        pt-4
        sm:px-6
        sm:pb-10
        lg:px-8
        lg:pb-12
      "
    >
      {/* =====================================================
          CTA IMAGE
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          h-[560px]
          max-w-[1500px]
          overflow-hidden
          rounded-[30px]
          shadow-[0_25px_70px_rgba(13,35,64,0.14)]
          sm:h-[600px]
          sm:rounded-[36px]
          lg:h-[620px]
          lg:rounded-[40px]
        "
      >
        {/* IMAGE */}

        <Image
          src="/images/cta.jpg"
          alt="Vivi la Sicilia con SicilyTrip"
          fill
          sizes="100vw"
          className="
            object-cover
            transition-transform
            duration-[1500ms]
            ease-out
            hover:scale-[1.02]
          "
        />

        {/* ===================================================
            OVERLAYS
        =================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-[#07182D]/35
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#07182D]/75
            via-[#07182D]/40
            to-[#07182D]/20
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#07182D]/55
            via-transparent
            to-transparent
          "
        />

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-10
            flex
            h-full
            items-center
          "
        >
          <div
            className="
              w-full
              px-7
              sm:px-10
              lg:px-16
              xl:px-20
            "
          >
            <div className="max-w-[760px]">

              {/* EYEBROW */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.32em]
                  text-[#F58220]
                  sm:text-xs
                "
              >
                <span
                  className="
                    h-[1px]
                    w-8
                    bg-[#F58220]
                  "
                />

                Il tuo viaggio inizia qui
              </div>

              {/* TITLE */}

              <h2
                className="
                  mt-6
                  text-[42px]
                  font-bold
                  leading-[1.05]
                  tracking-[-0.045em]
                  text-white
                  sm:text-[52px]
                  lg:text-[62px]
                  xl:text-[68px]
                "
              >
                La Sicilia
                <br />
                che immagini.
                <br />
                E qualcosa in più.
              </h2>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-6
                  max-w-[620px]
                  text-base
                  leading-8
                  text-white/80
                  sm:text-lg
                  lg:text-[20px]
                  lg:leading-9
                "
              >
                Hotel selezionati, esperienze autentiche e
                itinerari costruiti intorno al tuo modo di
                viaggiare.
              </p>

              {/* ACTIONS */}

              <div
                className="
                  mt-8
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                "
              >
                {/* PRIMARY CTA */}

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
                    px-7
                    py-4
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_12px_35px_rgba(245,130,32,0.28)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#FF9238]
                    sm:px-8
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

                {/* CONCIERGE LINK */}

                <button
                  type="button"
                  onClick={() => openConcierge()}
                  className="
                    group
                    inline-flex
                    w-fit
                    items-center
                    gap-2.5
                    px-2
                    py-3
                    text-sm
                    font-medium
                    text-white/80
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-white/10
                      transition-all
                      duration-300
                      group-hover:border-[#F58220]/50
                      group-hover:bg-[#F58220]
                    "
                  >
                    <IconSparkles
                      size={15}
                      stroke={1.7}
                    />
                  </span>

                  Chiedi al Concierge
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM SIGNATURE
        =================================================== */}

        <div
          className="
            absolute
            bottom-6
            right-7
            hidden
            items-center
            gap-2
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-white/45
            sm:flex
            lg:bottom-8
            lg:right-10
          "
        >
          <IconSparkles
            size={13}
            stroke={1.7}
            className="text-[#F58220]"
          />

          SicilyTrip
        </div>
      </div>
    </section>
  );
}