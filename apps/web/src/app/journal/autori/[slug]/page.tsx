import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import FooterSection from "@/components/layout/FooterSection";
import JournalDatabaseStories from "@/components/journal/page/JournalDatabaseStories";
import { getJournalAuthor, journalView } from "@/lib/journal";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getJournalAuthor((await params).slug);
  return author
    ? {
        title: `${author.displayName} | Journal`,
        alternates: { canonical: `/journal/autori/${author.slug}` },
      }
    : {};
}
export default async function AuthorPage({ params }: Props) {
  const author = await getJournalAuthor((await params).slug);
  if (!author) notFound();
  return (
    <>
      <Header />
      <main id="main-content" className="bg-[#F7F3EC] pt-40 text-[#0D2340]">
        <header className="mx-auto max-w-[1180px] px-5 py-12">
          <p className="text-sm uppercase tracking-widest">Autore Journal</p>
          <h1 className="mt-4 text-5xl font-bold">{author.displayName}</h1>
          {author.bio && (
            <p className="mt-6 max-w-3xl whitespace-pre-wrap leading-8">
              {author.bio}
            </p>
          )}
        </header>
        <JournalDatabaseStories articles={author.articles.map(journalView)} />
      </main>
      <FooterSection />
    </>
  );
}
