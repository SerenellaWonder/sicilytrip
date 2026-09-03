import Header from "@/components/layout/header";

import JournalHero from "@/components/journal/page/JournalHero";
import JournalStories from "@/components/journal/page/JournalStories";
import JournalThemes from "@/components/journal/page/JournalThemes";
import JournalEvents from "@/components/journal/page/JournalEvents";

import FooterSection from "@/components/layout/FooterSection";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Storie, luoghi e ispirazioni per conoscere la Sicilia e preparare il tuo prossimo viaggio.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <>
      <Header />

      <main>
        <JournalHero />
        <JournalStories />
        <JournalEvents />
        <JournalThemes />

        <FooterSection />
      </main>
    </>
  );
}
import type { Metadata } from "next";
