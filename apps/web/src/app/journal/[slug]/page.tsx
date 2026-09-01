import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JournalArticleContent from "@/components/journal/JournalArticleContent";
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
      <JournalArticleContent article={article} />
      <FooterSection />
    </>
  );
}
