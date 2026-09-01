"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

import type { FaqSection } from "@/content/faq";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function FaqExplorer({ sections }: { sections: FaqSection[] }) {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tutte");

  const filteredSections = useMemo(() => {
    const normalizedQuery = normalize(query);

    return sections
      .filter((section) => category === "Tutte" || section.title === category)
      .map((section) => ({
        ...section,
        questions: section.questions.filter((item) =>
          normalize(
            isEnglish
              ? `${item.questionEn} ${item.answerEn}`
              : `${item.question} ${item.answer}`,
          ).includes(
            normalizedQuery,
          ),
        ),
      }))
      .filter((section) => section.questions.length > 0);
  }, [category, isEnglish, query, sections]);

  const resultCount = filteredSections.reduce(
    (total, section) => total + section.questions.length,
    0,
  );

  return (
    <div className="mt-14">
      <div className="rounded-[24px] bg-white p-4 shadow-[0_12px_40px_rgba(13,35,64,0.05)] sm:p-5">
        <label className="flex items-center gap-3">
          <Search size={20} className="shrink-0 text-[#F58220]" />
          <span className="sr-only">
            {isEnglish ? "Search frequently asked questions" : "Cerca nelle domande frequenti"}
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              isEnglish
                ? "Search a question, for example cancellation..."
                : "Cerca una domanda, ad esempio cancellazione..."
            }
            className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#0D2340] outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={isEnglish ? "Clear search" : "Cancella ricerca"}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F7F5F1] text-slate-500"
            >
              <X size={16} />
            </button>
          )}
        </label>
      </div>

      <div
        className="mt-5 flex flex-wrap gap-2"
        aria-label={isEnglish ? "FAQ categories" : "Categorie FAQ"}
      >
        {["Tutte", ...sections.map((section) => section.title)].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors ${
              category === item
                ? "bg-[#0D2340] text-white"
                : "bg-white text-[#0D2340]/55 hover:text-[#0D2340]"
            }`}
          >
            {item === "Tutte"
              ? isEnglish
                ? "All"
                : item
              : isEnglish
                ? sections.find((section) => section.title === item)?.titleEn
                : item}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-400" aria-live="polite">
        {resultCount}{" "}
        {isEnglish
          ? resultCount === 1
            ? "answer found"
            : "answers found"
          : resultCount === 1
            ? "risposta trovata"
            : "risposte trovate"}
      </p>

      {resultCount ? (
        <div className="mt-5 grid gap-8 lg:grid-cols-3">
          {filteredSections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[#0D2340]">
                {isEnglish ? section.titleEn : section.title}
              </h2>
              <div className="space-y-3">
                {section.questions.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-[#0D2340]/[0.07] bg-white p-5 shadow-[0_8px_28px_rgba(13,35,64,0.04)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold leading-6 text-[#0D2340]">
                      {isEnglish ? item.questionEn : item.question}
                      <ChevronDown
                        size={17}
                        className="shrink-0 text-[#F58220] transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-6 text-slate-500">
                      {isEnglish ? item.answerEn : item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[24px] bg-white px-6 py-12 text-center">
          <p className="font-semibold text-[#0D2340]">
            {isEnglish ? "No answers found" : "Nessuna risposta trovata"}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {isEnglish
              ? "Try broader keywords or select another category."
              : "Prova con parole più generiche oppure seleziona un’altra categoria."}
          </p>
        </div>
      )}
    </div>
  );
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}
