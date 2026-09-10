"use client";

import Image from "next/image";
import Link from "next/link";

import FooterSection from "@/components/layout/FooterSection";
import Header from "@/components/layout/header/Header";
import { useConcierge } from "@/components/concierge/ConciergeProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { ExperienceCatalogItem } from "@/data/experiences";

export default function ExperienceDetailPage({
  experience,
}: Readonly<{ experience: ExperienceCatalogItem }>) {
  const { language } = useLanguage();
  const { openConcierge } = useConcierge();
  const isEnglish = language === "en";

  return (
    <>
      <Header />
      <main className="bg-[#F7F3EC]">
        <section className="relative min-h-[700px] overflow-hidden">
          <Image src={experience.image} alt={isEnglish ? experience.titleEn : experience.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182D] via-[#07182D]/40 to-[#07182D]/20" />
          <div className="relative mx-auto flex min-h-[700px] max-w-[1500px] flex-col justify-end px-5 pb-20 pt-40 sm:px-8 lg:px-10 lg:pb-24">
            <Link href="/esperienze" className="mb-8 w-fit text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-[#F58220]">
              ← {isEnglish ? "All experiences" : "Tutte le esperienze"}
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#F58220]">
              {isEnglish ? experience.eyebrowEn : experience.eyebrow}
            </p>
            <h1 className="mt-4 max-w-5xl text-5xl font-bold tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
              {isEnglish ? experience.titleEn : experience.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              {isEnglish ? experience.descriptionEn : experience.description}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 py-20 text-center sm:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F58220]">SicilyTrip Concierge</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-[-0.045em] text-[#0D2340] sm:text-5xl">
            {isEnglish ? "Build this experience into your Sicilian journey." : "Inserisci questa esperienza nel tuo viaggio in Sicilia."}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#0D2340]/60">
            {isEnglish ? "Tell us when you are travelling and what you love. The Concierge will help shape a personalised proposal." : "Raccontaci quando viaggi e cosa ami. Il Concierge ti aiuterà a costruire una proposta personalizzata."}
          </p>
          <button
            type="button"
            onClick={() => openConcierge(isEnglish ? `I would like to organise a ${experience.titleEn} experience` : `Vorrei organizzare un'esperienza ${experience.title}`)}
            className="mt-9 inline-flex rounded-full bg-[#F58220] px-8 py-4 text-sm font-semibold text-white hover:bg-[#0D2340]"
          >
            {isEnglish ? "Plan your experience" : "Organizza la tua esperienza"}
          </button>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
