import { cache } from "react";
import {
  journalArticles,
  getJournalArticle,
  type JournalArticle,
} from "@/content/journal";
import { API_URL } from "@/lib/api";

export type JournalRecord = {
  slug: string;
  title: string;
  subtitle?: string | null;
  excerpt: string;
  category: string;
  image?: string | null;
  imageAlt?: string | null;
  readingTime?: string | null;
  content: { title: string; paragraphs: string[] }[];
  publishedAt?: string | null;
  author?: { slug: string; displayName: string } | null;
};

export function journalView(a: JournalRecord): JournalArticle {
  const image =
    a.image && (/^\/(?!\/)/.test(a.image) || /^https:\/\//.test(a.image))
      ? a.image
      : "";
  return {
    slug: a.slug,
    title: a.title,
    titleEn: a.title,
    category: a.category,
    categoryEn: a.category,
    subtitle: a.subtitle ?? "",
    subtitleEn: a.subtitle ?? "",
    excerpt: a.excerpt,
    excerptEn: a.excerpt,
    image,
    imageAlt: a.imageAlt ?? "",
    imageAltEn: a.imageAlt ?? "",
    readingTime: a.readingTime ?? "",
    publishedAt: a.publishedAt?.slice(0, 10) ?? "",
    introduction: "",
    introductionEn: "",
    author: a.author,
    originalLanguage: "it",
    sections: a.content.map((s) => ({
      ...s,
      titleEn: s.title,
      paragraphsEn: s.paragraphs,
    })),
  };
}

async function read<T>(endpoint: string): Promise<T | null> {
  const response = await fetch(`${API_URL}/content/journal${endpoint}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error("Il Journal non è disponibile in questo momento.");
  return response.json() as Promise<T>;
}

export const getPublicJournal = cache(async () => {
  const records = await read<JournalRecord[]>("");
  if (!records)
    throw new Error("Il servizio Journal non è ancora disponibile.");
  return [...records.map(journalView), ...journalArticles];
});

export const getPublicArticle = cache(async (slug: string) => {
  // Existing editorial pages have a reserved namespace and remain available.
  const legacy = getJournalArticle(slug);
  if (legacy) return legacy;
  const record = await read<JournalRecord>(`/${encodeURIComponent(slug)}`);
  return record ? journalView(record) : null;
});

export const getJournalAuthor = cache(async (slug: string) =>
  read<{
    slug: string;
    displayName: string;
    bio: string | null;
    articles: JournalRecord[];
  }>(`/authors/${encodeURIComponent(slug)}`),
);
