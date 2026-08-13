import Header from "@/components/layout/header";

import JournalHero from "@/components/journal/page/JournalHero";
import JournalStories from "@/components/journal/page/JournalStories";
import JournalThemes from "@/components/journal/page/JournalThemes";

import FooterSection from "@/components/layout/FooterSection";

export default function JournalPage() {
  return (
    <>
      <Header />

      <main>
        <JournalHero />
        <JournalStories />
        <JournalThemes />

        <FooterSection />
      </main>
    </>
  );
}