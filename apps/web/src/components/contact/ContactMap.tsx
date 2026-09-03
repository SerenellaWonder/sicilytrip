"use client";

import { ExternalLink, MapPin, ShieldCheck } from "lucide-react";

import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const MAP_URL =
  "https://www.google.com/maps?q=Palermo%2C%20Sicilia&z=12&t=k&output=embed";
const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=Palermo%2C%20Sicilia";

export default function ContactMap() {
  const { language } = useLanguage();
  const { choices, allowExternalServices } = useCookieConsent();
  const isEnglish = language === "en";

  return (
    <section
      aria-labelledby="contact-map-title"
      className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28"
    >
      <div className="overflow-hidden rounded-[30px] bg-[#0D2340] shadow-[0_22px_65px_rgba(13,35,64,0.14)]">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="relative flex flex-col justify-center overflow-hidden px-7 py-10 text-white sm:px-10 lg:py-14">
            <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-[#F58220]/15 blur-3xl" />
            <div className="relative">
              <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F58220]">
                <MapPin size={16} />
                {isEnglish ? "Find us" : "Dove siamo"}
              </span>
              <h2
                id="contact-map-title"
                className="mt-5 text-3xl font-bold tracking-[-0.04em] sm:text-4xl"
              >
                {isEnglish
                  ? "Your journey starts in Sicily"
                  : "Il tuo viaggio parte dalla Sicilia"}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
                {isEnglish
                  ? "Explore our location on the interactive satellite map and open directions on your device."
                  : "Esplora la nostra posizione sulla mappa satellitare interattiva e apri le indicazioni sul tuo dispositivo."}
              </p>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#F58220] px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:bg-[#FF9238] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {isEnglish ? "Open directions" : "Apri indicazioni"}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative min-h-[360px] bg-slate-200 sm:min-h-[440px]">
            {choices.externalServices ? (
              <iframe
                title={
                  isEnglish
                    ? "Satellite map of Palermo, Sicily"
                    : "Mappa satellitare di Palermo, Sicilia"
                }
                src={MAP_URL}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-7 text-center">
                <ShieldCheck size={30} className="text-[#F58220]" />
                <h3 className="mt-4 text-xl font-bold text-[#0D2340]">
                  {isEnglish ? "Map protected by your choices" : "Mappa protetta dalle tue scelte"}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  {isEnglish
                    ? "Allow external services to load the interactive Google map."
                    : "Autorizza i servizi esterni per caricare la mappa interattiva di Google."}
                </p>
                <button type="button" onClick={allowExternalServices} className="mt-5 rounded-full bg-[#0D2340] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                  {isEnglish ? "Allow and show map" : "Autorizza e mostra mappa"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
