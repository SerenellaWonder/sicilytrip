"use client";

import Image from "next/image";

import HeroContent from "@/components/hero/HeroContent";
import ScrollIndicator from "@/components/hero/ScrollIndicator";
import HeroSearch from "@/components/hero/HeroSearch";

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="
          relative
          h-[690px]
          overflow-visible
          bg-[#0D2340]
          sm:h-[720px]
          lg:h-[740px]
        "
      >
        {/* BACKGROUND */}

        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero.jpg"
            alt="Scopri la Sicilia con SicilyTrip"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-[58%_center]
              sm:object-center
            "
          />

          {/* MOBILE / GENERAL CONTRAST */}

          <div
            className="
              absolute
              inset-0
              bg-[#07182D]/25
              lg:bg-transparent
            "
          />

          {/* LEFT OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#07182D]/90
              via-[#07182D]/58
              to-[#07182D]/15
              lg:from-[#07182D]/90
              lg:via-[#07182D]/55
              lg:to-[#07182D]/10
            "
          />

          {/* BOTTOM OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#07182D]/55
              via-transparent
              to-transparent
              lg:from-[#07182D]/45
            "
          />

          {/* NAVBAR CONTRAST */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-[125px]
              bg-gradient-to-b
              from-[#07182D]/70
              via-[#07182D]/35
              to-transparent
              lg:h-[135px]
              lg:from-[#07182D]/60
              lg:via-[#07182D]/30
            "
          />
        </div>

        {/* HERO CONTENT */}

        <div
          className="
            relative
            z-10
            mx-auto
            h-full
            max-w-[1500px]
            px-5
            sm:px-8
            lg:px-10
          "
        >
          <HeroContent />

          <ScrollIndicator />
        </div>

        {/* CONCIERGE / HOTEL SEARCH */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-30
            translate-y-[38%]
            sm:translate-y-[42%]
          "
        >
          <HeroSearch />
        </div>
      </section>

      {/* SPACE FOR OVERLAPPING SEARCH */}

      <div
        className="
          h-[170px]
          sm:h-[105px]
          lg:h-[110px]
        "
      />
    </>
  );
}