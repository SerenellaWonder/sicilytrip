"use client";

import { IconArrowRight } from "@tabler/icons-react";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function HeroContent() {
  const { language } = useLanguage();
  const isItalian = language === "it";

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
          {isItalian ? "Scopri una Sicilia diversa" : "Discover a different Sicily"}
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
          {isItalian ? "Scopri la Sicilia" : "Discover Sicily"}
          <br />
          {isItalian ? "come non l'hai" : "as you've never"}
          <br />
          {isItalian ? "mai vista" : "seen it before"}
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
          {isItalian
            ? "Esperienze autentiche, luoghi unici"
            : "Authentic experiences, unique places"}
          <br className="hidden sm:block" />
          {isItalian
            ? " e emozioni indimenticabili."
            : " and unforgettable moments."}
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
          {isItalian ? "Esplora ora" : "Explore now"}

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
