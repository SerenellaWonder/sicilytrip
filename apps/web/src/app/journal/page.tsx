import Header from "@/components/layout/header";

import JournalHero from "@/components/journal/page/JournalHero";
import JournalStories from "@/components/journal/page/JournalStories";
import JournalDatabaseStories from "@/components/journal/page/JournalDatabaseStories";
import { getPublicJournal } from "@/lib/journal";
import JournalThemes from "@/components/journal/page/JournalThemes";
import JournalEvents from "@/components/journal/page/JournalEvents";

import FooterSection from "@/components/layout/FooterSection";
import AccommodationSearchSection from "@/components/hotels/AccommodationSearchSection";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Storie, luoghi e ispirazioni per conoscere la Sicilia e preparare il tuo prossimo viaggio.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const articles = await getPublicJournal().catch(() => null);
  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1}>
        <JournalHero />
        {articles ? (
          <JournalDatabaseStories articles={articles} />
        ) : (
          <>
            <p role="status" className="bg-[#F7F3EC] px-5 py-4 text-center">
              I nuovi articoli non sono disponibili in questo momento. Puoi
              leggere le storie in evidenza.
            </p>
            <JournalStories />
          </>
        )}
        <JournalEvents />
        <JournalThemes />

        <AccommodationSearchSection />

        <FooterSection />
      </main>
    </>
  );
}
import type { Metadata } from "next";
