import Header from "@/components/layout/header";

import ExperiencesHero from "@/components/experiences/page/ExperiencesHero";
import ExperiencesExplorer from "@/components/experiences/page/ExperiencesExplorer";
import TailoredExperience from "@/components/experiences/page/TailoredExperience";

import FooterSection from "@/components/layout/FooterSection";

export const metadata: Metadata = {
  title: "Esperienze",
  description:
    "Scopri esperienze autentiche, sapori, natura e cultura per vivere la Sicilia oltre il soggiorno.",
  alternates: { canonical: "/esperienze" },
};

export default function ExperiencesPage() {
  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1}>
        <ExperiencesHero />

        <ExperiencesExplorer />

        <TailoredExperience />

        <FooterSection />
      </main>
    </>
  );
}
import type { Metadata } from "next";
