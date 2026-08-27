import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";

import FooterSection from "@/components/layout/FooterSection";
import Header from "@/components/layout/header";
import { getJournalArticle, journalArticles } from "@/content/journal";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journalArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = getJournalArticle((await params).slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.imageAlt }],
      publishedTime: article.publishedAt,
    },
  };
}

export default async function JournalArticlePage({ params }: ArticlePageProps) {
  const article = getJournalArticle((await params).slug);

  if (!article) notFound();

  return (
    <>
      <Header />
      <main className="bg-[#F7F3EC] pb-24 pt-[112px]">
        <article>
          <header className="mx-auto max-w-[1180px] px-5 pb-12 pt-12 sm:px-8 lg:px-10 lg:pb-16 lg:pt-20">
            <Link
              href="/journal#stories"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0D2340]/50 transition-colors hover:text-[#F58220]"
            >
              <ArrowLeft size={15} /> Torna al Journal
            </Link>
            <div className="mt-10 max-w-[900px]">
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F58220]">
                <span>{article.category}</span>
                <span className="size-1 rounded-full bg-[#0D2340]/20" />
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
                <span className="inline-flex items-center gap-1.5 text-[#0D2340]/45">
                  <Clock3 size={14} /> {article.readingTime}
                </span>
              </div>
              <h1 className="mt-6 text-[46px] font-bold leading-[0.98] tracking-[-0.055em] text-[#0D2340] sm:text-[64px] lg:text-[78px]">
                {article.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#0D2340]/55 sm:text-xl">
                {article.subtitle}
              </p>
            </div>
          </header>

          <div className="relative mx-auto h-[420px] max-w-[1440px] overflow-hidden sm:h-[580px] lg:h-[720px] lg:rounded-[34px]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover"
            />
          </div>

          <div className="mx-auto max-w-[780px] px-5 py-16 sm:px-8 lg:py-24">
            <p className="text-xl font-medium leading-9 text-[#0D2340] sm:text-2xl sm:leading-10">
              {article.introduction}
            </p>
            {article.sections.map((section) => (
              <section
                key={section.title}
                className="mt-14 border-t border-[#0D2340]/10 pt-12"
              >
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#0D2340] sm:text-4xl">
                  {section.title}
                </h2>
                <div className="mt-6 space-y-6 text-[16px] leading-8 text-[#0D2340]/65 sm:text-[18px] sm:leading-9">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}
