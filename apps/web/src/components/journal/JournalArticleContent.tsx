"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { JournalArticle } from "@/content/journal";

export default function JournalArticleContent({
  article,
}: Readonly<{ article: JournalArticle }>) {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main className="bg-[#F7F3EC] pb-24 pt-[112px]">
      <article>
        <header className="mx-auto max-w-[1180px] px-5 pb-12 pt-12 sm:px-8 lg:px-10 lg:pb-16 lg:pt-20">
          <Link
            href="/journal#stories"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0D2340]/50 transition-colors hover:text-[#F58220]"
          >
            <ArrowLeft size={15} />
            {isEnglish ? "Back to the Journal" : "Torna al Journal"}
          </Link>
          <div className="mt-10 max-w-[900px]">
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F58220]">
              <span>{isEnglish ? article.categoryEn : article.category}</span>
              <span className="size-1 rounded-full bg-[#0D2340]/20" />
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt, isEnglish ? "en-GB" : "it-IT")}
              </time>
              <span className="inline-flex items-center gap-1.5 text-[#0D2340]/45">
                <Clock3 size={14} /> {article.readingTime}
              </span>
            </div>
            <h1 className="mt-6 text-[46px] font-bold leading-[0.98] tracking-[-0.055em] text-[#0D2340] sm:text-[64px] lg:text-[78px]">
              {isEnglish ? article.titleEn : article.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#0D2340]/55 sm:text-xl">
              {isEnglish ? article.subtitleEn : article.subtitle}
            </p>
          </div>
        </header>

        <div className="relative mx-auto h-[420px] max-w-[1440px] overflow-hidden sm:h-[580px] lg:h-[720px] lg:rounded-[34px]">
          <Image
            src={article.image}
            alt={isEnglish ? article.imageAltEn : article.imageAlt}
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover"
          />
        </div>

        <div className="mx-auto max-w-[780px] px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-xl font-medium leading-9 text-[#0D2340] sm:text-2xl sm:leading-10">
            {isEnglish ? article.introductionEn : article.introduction}
          </p>
          {article.sections.map((section) => (
            <section
              key={section.title}
              className="mt-14 border-t border-[#0D2340]/10 pt-12"
            >
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#0D2340] sm:text-4xl">
                {isEnglish ? section.titleEn : section.title}
              </h2>
              <div className="mt-6 space-y-6 text-[16px] leading-8 text-[#0D2340]/65 sm:text-[18px] sm:leading-9">
                {(isEnglish ? section.paragraphsEn : section.paragraphs).map(
                  (paragraph) => <p key={paragraph}>{paragraph}</p>,
                )}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

function formatDate(value: string, locale: "it-IT" | "en-GB") {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}
