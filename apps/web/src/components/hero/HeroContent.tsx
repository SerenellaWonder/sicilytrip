"use client";

import { IconArrowRight } from "@tabler/icons-react";

export default function HeroContent() {
  return (
    <div
      className="
        flex
        h-full
        items-center
        pb-[170px]
        pt-[80px]
        sm:pb-[130px]
        lg:pb-[145px]
        lg:pt-[90px]
      "
    >
      <div
        className="
          max-w-[620px]
        "
      >
        {/* EYEBROW */}

        <div
          className="
            mb-4
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.30em]
            text-[#F58220]
            sm:mb-5
            sm:text-sm
            sm:tracking-[0.38em]
          "
        >
          Scopri una Sicilia diversa
        </div>

        {/* TITLE */}

        <h1
          className="
            max-w-[360px]
            text-[40px]
            font-bold
            leading-[1.02]
            tracking-[-0.045em]
            text-white
            min-[390px]:text-[43px]
            sm:max-w-none
            sm:text-[56px]
            lg:text-[64px]
            xl:text-[70px]
          "
        >
          Scopri la Sicilia
          <br />
          come non l&apos;hai
          <br />
          mai vista
        </h1>

        {/* DESCRIPTION */}

        <p
          className="
            mt-5
            max-w-[340px]
            text-[16px]
            leading-[1.6]
            text-white/85
            sm:mt-6
            sm:max-w-[520px]
            sm:text-xl
            lg:text-[22px]
          "
        >
          Esperienze autentiche, luoghi unici
          <br className="hidden sm:block" />
          e emozioni indimenticabili.
        </p>

        {/* CTA */}

        <button
          type="button"
          className="
            group
            mt-6
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-[#F58220]
            px-6
            py-3.5
            text-sm
            font-semibold
            text-white
            shadow-[0_12px_30px_rgba(245,130,32,0.25)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#FF9238]
            sm:mt-8
            sm:px-8
            sm:py-4
          "
        >
          Esplora ora

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
      </div>
    </div>
  );
}