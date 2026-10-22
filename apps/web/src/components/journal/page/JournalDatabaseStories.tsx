"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { JournalArticle } from "@/content/journal";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function JournalDatabaseStories({
  articles,
}: {
  articles: JournalArticle[];
}) {
  const { language } = useLanguage();
  const english = language === "en";
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const categories = [...new Set(articles.map((a) => a.category))];
  const visible = articles.filter(
    (a) =>
      (!category || a.category === category) &&
      a.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  return (
    <section id="stories" className="bg-[#F7F3EC] py-20 text-[#0D2340]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F58220]">
          Journal
        </p>
        <h2 className="mt-4 text-4xl font-bold sm:text-6xl">
          {english ? "Stories from Sicily" : "La Sicilia raccontata"}
        </h2>
        <div className="my-10 flex flex-wrap gap-4">
          <label className="flex flex-col gap-2 text-sm">
            {english ? "Search stories" : "Cerca un articolo"}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white p-3"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            {english ? "Category" : "Categoria"}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white p-3"
            >
              <option value="">
                {english ? "All categories" : "Tutte le categorie"}
              </option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <article
              key={a.slug}
              className="overflow-hidden rounded-2xl bg-white"
            >
              {a.image && (
                <div className="relative h-56">
                  <Image
                    src={a.image}
                    alt={english ? a.imageAltEn : a.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-xs font-bold uppercase text-[#F58220]">
                  {english ? a.categoryEn : a.category}
                </p>
                <h3 className="mt-3 text-2xl font-bold">
                  <Link href={`/journal/${a.slug}`}>
                    {english ? a.titleEn : a.title}
                  </Link>
                </h3>
                {a.author && (
                  <Link
                    className="mt-3 block text-sm underline"
                    href={`/journal/autori/${a.author.slug}`}
                  >
                    {a.author.displayName}
                  </Link>
                )}
                <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600">
                  {english ? a.excerptEn : a.excerpt}
                </p>
                <Link
                  href={`/journal/${a.slug}`}
                  className="mt-5 inline-block text-sm font-bold"
                >
                  {english ? "Read the story →" : "Leggi la storia →"}
                </Link>
              </div>
            </article>
          ))}
        </div>
        {!visible.length && (
          <p role="status">
            {english ? "No stories found." : "Nessun articolo trovato."}
          </p>
        )}
      </div>
    </section>
  );
}
