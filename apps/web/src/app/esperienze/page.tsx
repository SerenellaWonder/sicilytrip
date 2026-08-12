import Header from "@/components/layout/header";

import ExperiencesHero from "@/components/experiences/page/ExperiencesHero";
import ExperiencesExplorer from "@/components/experiences/page/ExperiencesExplorer";
import TailoredExperience from "@/components/experiences/page/TailoredExperience";

import FooterSection from "@/components/layout/FooterSection";

export default function ExperiencesPage() {
  return (
    <>
      <Header />

      <main>
        <ExperiencesHero />

        <ExperiencesExplorer />

        <TailoredExperience />

        <FooterSection />
      </main>
    </>
  );
}