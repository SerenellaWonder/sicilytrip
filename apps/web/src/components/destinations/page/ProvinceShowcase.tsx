"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { IconArrowLeft, IconArrowRight, IconMapPin } from "@tabler/icons-react";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { destinationCatalog } from "@/data/destinations";
import { provinceCatalog } from "@/data/provinces";

export default function ProvinceShowcase() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [activeId, setActiveId] = useState("palermo");
  const railRef = useRef<HTMLDivElement>(null);
  const active = provinceCatalog.find((province) => province.id === activeId) ?? provinceCatalog[0];
  const locations = destinationCatalog.filter((destination) => destination.province === active.name);

  function scroll(direction: number) {
    railRef.current?.scrollBy({ left: direction * 390, behavior: "smooth" });
  }

  return (
    <section id="explore-destinations" className="overflow-hidden bg-[#F7F3EC] py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#F58220]">
              {isEnglish ? "Explore Sicily" : "Esplora la Sicilia"}
            </p>
            <h2 className="mt-4 max-w-[900px] text-[42px] font-bold leading-[1.02] tracking-[-0.05em] text-[#0D2340] sm:text-[54px] lg:text-[64px]">
              {isEnglish ? "9 provinces." : "9 province."}{" "}
              <span className="text-[#0D2340]/35">{isEnglish ? "Endless emotions." : "Un’infinità di emozioni."}</span>
            </h2>
            <p className="mt-5 max-w-[780px] text-base leading-8 text-[#0D2340]/55">
              {isEnglish
                ? "From crystal-clear seas to volcanoes, from art cities to authentic villages. Discover Sicily province by province."
                : "Dal mare cristallino ai vulcani, dalle città d’arte ai borghi autentici. Scopri le province della Sicilia e lasciati ispirare per il tuo prossimo viaggio."}
            </p>
          </div>
          <div className="flex gap-2">
            <RailButton label={isEnglish ? "Previous provinces" : "Province precedenti"} onClick={() => scroll(-1)}><IconArrowLeft size={20} /></RailButton>
            <RailButton label={isEnglish ? "Next provinces" : "Province successive"} onClick={() => scroll(1)}><IconArrowRight size={20} /></RailButton>
          </div>
        </div>
      </div>

      <div ref={railRef} className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 [scrollbar-width:none] sm:px-8 lg:px-[max(2.5rem,calc((100vw-1500px)/2+2.5rem))] [&::-webkit-scrollbar]:hidden">
        {provinceCatalog.map((province) => {
          const selected = province.id === active.id;
          const pills = isEnglish ? province.pillsEn : province.pills;
          return (
            <article key={province.id} className={`relative h-[520px] w-[84vw] max-w-[380px] shrink-0 snap-center overflow-hidden rounded-[28px] border transition-all duration-500 sm:w-[370px] ${selected ? "border-[#F58220] shadow-[0_22px_55px_rgba(13,35,64,0.2)] lg:w-[430px] lg:max-w-[430px]" : "border-white/70"}`}>
              <Image src={province.image} alt={province.name} fill sizes="(max-width: 640px) 84vw, 430px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061A30] via-[#061A30]/25 to-transparent" />
              <button type="button" onClick={() => setActiveId(province.id)} aria-pressed={selected} className="absolute inset-0 z-10 text-left">
                <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-[#0D2340]/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur"><IconMapPin size={15} className="text-[#F58220]" />{province.name}</span>
                <span className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <span className="block text-[34px] font-bold tracking-[-0.045em]">{province.name}</span>
                  <span className="mt-2 block min-h-[72px] text-[15px] leading-6 text-white/85">{isEnglish ? province.shortEn : province.short}</span>
                  <span className="mt-5 flex flex-wrap gap-2">{pills.map((pill) => <span key={pill} className="rounded-full bg-white/15 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.08em] backdrop-blur">{pill}</span>)}</span>
                </span>
              </button>
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <article className="grid gap-10 rounded-[30px] bg-white p-7 shadow-[0_18px_55px_rgba(13,35,64,0.06)] sm:p-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:p-14">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F58220]">{isEnglish ? "Selected province" : "Provincia selezionata"}</p>
            <h3 className="mt-4 text-[42px] font-bold tracking-[-0.05em] text-[#0D2340] sm:text-[52px]">{active.name}</h3>
            <p className="mt-5 text-lg font-medium leading-8 text-[#0D2340]/65">{isEnglish ? active.shortEn : active.short}</p>
            {locations.length > 0 && (
              <div className="mt-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0D2340]/35">{isEnglish ? "Discover the area" : "Scopri il territorio"}</p>
                <div className="mt-3 flex flex-wrap gap-2">{locations.map((location) => <Link key={location.id} href={location.href} className="rounded-full bg-[#F7F3EC] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0D2340] transition hover:bg-[#F58220] hover:text-white">{location.name}</Link>)}</div>
              </div>
            )}
          </div>
          <div className="space-y-5 text-[15px] leading-8 text-[#0D2340]/60 sm:text-base">
            {isEnglish ? <p>{active.descriptionEn}</p> : active.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </div>
    </section>
  );
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-label={label} onClick={onClick} className="grid h-12 w-12 place-items-center rounded-full border border-[#0D2340]/10 bg-white text-[#0D2340] transition hover:border-[#F58220] hover:bg-[#F58220] hover:text-white">{children}</button>;
}
