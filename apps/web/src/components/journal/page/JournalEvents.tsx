"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { apiFetch } from "@/lib/api";

type TourismEvent = {
  id: string;
  title: string;
  titleEn?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  location: string;
  startAt: string;
  endAt?: string | null;
  externalUrl?: string | null;
  isFeatured: boolean;
};

export default function JournalEvents() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [events, setEvents] = useState<TourismEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void apiFetch<TourismEvent[]>("/events", { signal: controller.signal })
        .then(setEvents)
        .catch(() => setEvents([]))
        .finally(() => setLoading(false));
    }, 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return (
    <section className="bg-white py-24 lg:py-32" aria-labelledby="events-title">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 border-b border-[#0D2340]/10 pb-12 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F58220]">
              <CalendarDays size={17} />
              {isEnglish ? "Events calendar" : "Calendario eventi"}
            </span>
            <h2
              id="events-title"
              className="mt-5 text-[42px] font-bold leading-[1.02] tracking-[-0.05em] text-[#0D2340] sm:text-[58px]"
            >
              {isEnglish ? "What’s happening" : "Cosa succede"}
              <br />
              <span className="text-[#0D2340]/35">
                {isEnglish ? "in Sicily." : "in Sicilia."}
              </span>
            </h2>
          </div>
          <p className="text-[15px] leading-8 text-[#0D2340]/55">
            {isEnglish
              ? "Festivals, exhibitions and local traditions selected to enrich your journey."
              : "Festival, mostre e tradizioni locali selezionati per arricchire il tuo viaggio."}
          </p>
        </div>

        {loading ? (
          <div
            className="mt-12 grid gap-5 md:grid-cols-3"
            aria-label={isEnglish ? "Loading events" : "Caricamento eventi"}
          >
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-[26px] bg-[#F7F3EC]"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="mt-12 rounded-[26px] bg-[#F7F3EC] px-7 py-10 text-center">
            <CalendarDays className="mx-auto text-[#F58220]" size={28} />
            <h3 className="mt-4 text-xl font-bold text-[#0D2340]">
              {isEnglish ? "New events coming soon" : "Nuovi eventi in arrivo"}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {isEnglish
                ? "We are updating the next appointments across Sicily."
                : "Stiamo aggiornando i prossimi appuntamenti in tutta la Sicilia."}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => {
              const url = safeUrl(event.externalUrl);
              return (
                <article
                  key={event.id}
                  className={`flex min-h-64 flex-col rounded-[26px] border p-7 ${event.isFeatured ? "border-[#F58220]/30 bg-[#FFF8F1]" : "border-[#0D2340]/[0.07] bg-[#F7F3EC]"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <time
                      className="rounded-2xl bg-[#0D2340] px-4 py-3 text-center text-white"
                      dateTime={event.startAt}
                    >
                      <strong className="block text-2xl leading-none">
                        {day(event.startAt)}
                      </strong>
                      <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
                        {month(event.startAt, language)}
                      </span>
                    </time>
                    {event.isFeatured && (
                      <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
                        {isEnglish ? "Featured" : "In evidenza"}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em] text-[#0D2340]">
                    {isEnglish ? event.titleEn || event.title : event.title}
                  </h3>
                  <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#0D2340]/55">
                    <MapPin size={14} className="text-[#F58220]" />
                    {event.location}
                  </p>
                  {(isEnglish
                    ? event.descriptionEn || event.description
                    : event.description) && (
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                      {isEnglish
                        ? event.descriptionEn || event.description
                        : event.description}
                    </p>
                  )}
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-2 pt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0D2340]"
                    >
                      {isEnglish ? "Official details" : "Dettagli ufficiali"}
                      <ExternalLink size={14} />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function day(value: string) {
  return new Intl.DateTimeFormat("it-IT", { day: "2-digit" }).format(
    new Date(value),
  );
}
function month(value: string, language: "it" | "en") {
  return new Intl.DateTimeFormat(language === "en" ? "en-GB" : "it-IT", {
    month: "short",
  }).format(new Date(value));
}
function safeUrl(value?: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}
