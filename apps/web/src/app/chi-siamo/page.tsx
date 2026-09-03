import Header from "@/components/layout/header";

import AboutHero from "@/components/about/page/AboutHero";
import AboutStory from "@/components/about/page/AboutStory";
import AboutApproach from "@/components/about/page/AboutApproach";
import AboutManifesto from "@/components/about/page/AboutManifesto";

import FooterSection from "@/components/layout/FooterSection";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Conosci SicilyTrip e il nostro modo di raccontare e organizzare viaggi autentici in Sicilia.",
  alternates: { canonical: "/chi-siamo" },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1}>
        <AboutHero />
        <AboutStory />
        <AboutApproach />
        <AboutManifesto />

        <FooterSection />
      </main>
    </>
  );
}
import type { Metadata } from "next";
