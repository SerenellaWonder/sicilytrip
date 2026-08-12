import Header from "@/components/layout/header";

import AboutHero from "@/components/about/page/AboutHero";
import AboutStory from "@/components/about/page/AboutStory";
import AboutApproach from "@/components/about/page/AboutApproach";
import AboutManifesto from "@/components/about/page/AboutManifesto";

import FooterSection from "@/components/layout/FooterSection";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        <AboutHero />
        <AboutStory />
        <AboutApproach />
        <AboutManifesto />

        <FooterSection />
      </main>
    </>
  );
}