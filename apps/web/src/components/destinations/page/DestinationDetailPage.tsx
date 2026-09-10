"use client";

import Image from "next/image";
import Link from "next/link";

import FooterSection from "@/components/layout/FooterSection";
import Header from "@/components/layout/header/Header";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { DestinationCatalogItem } from "@/data/destinations";

export default function DestinationDetailPage({
  destination,
}: Readonly<{ destination: DestinationCatalogItem }>) {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <>
      <Header />
      <main className="bg-[#F7F3EC]">
        <section className="relative min-h-[680px] overflow-hidden">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182D] via-[#07182D]/35 to-[#07182D]/20" />
          <div className="relative mx-auto flex min-h-[680px] max-w-[1500px] flex-col justify-end px-5 pb-20 pt-40 sm:px-8 lg:px-10 lg:pb-24">
            <Link href="/destinazioni" className="mb-8 w-fit text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-[#F58220]">
              ← {isEnglish ? "All destinations" : "Tutte le destinazioni"}
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#F58220]">
              {destination.macroArea} · {destination.province}
            </p>
            <h1 className="mt-4 max-w-5xl text-5xl font-bold tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
              {destination.name}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              {destination.description}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1300px] gap-8 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div className="rounded-[30px] bg-white p-8 shadow-[0_16px_50px_rgba(13,35,64,0.07)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F58220]">
              {isEnglish ? "Stay" : "Soggiorna"}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#0D2340]">
              {isEnglish ? `Find accommodation near ${destination.name}` : `Trova una struttura a ${destination.name}`}
            </h2>
            <p className="mt-4 leading-7 text-[#0D2340]/60">
              {isEnglish ? "Check real availability and rates for your travel dates." : "Controlla disponibilità e tariffe reali per le date del tuo viaggio."}
            </p>
            <Link href="/#accommodation-search" className="mt-8 inline-flex rounded-full bg-[#F58220] px-7 py-4 text-sm font-semibold text-white hover:bg-[#0D2340]">
              {isEnglish ? "Search accommodation" : "Ricerca strutture ricettive"}
            </Link>
          </div>

          <div className="rounded-[30px] bg-[#0D2340] p-8 text-white sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F58220]">
              SicilyTrip Experience
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">
              {isEnglish ? "Complete your journey" : "Completa il tuo viaggio"}
            </h2>
            <p className="mt-4 leading-7 text-white/65">
              {isEnglish ? "Discover sea, culture, food and private experiences selected across Sicily." : "Scopri mare, cultura, gusto ed esperienze private selezionate in tutta la Sicilia."}
            </p>
            <Link href="/esperienze" className="mt-8 inline-flex rounded-full border border-white/20 px-7 py-4 text-sm font-semibold hover:border-[#F58220] hover:text-[#F58220]">
              {isEnglish ? "Explore experiences" : "Esplora le esperienze"}
            </Link>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
