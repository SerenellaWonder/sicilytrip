import Header from "@/components/layout/header";

import AboutHero from "@/components/about/page/AboutHero";
import AboutHistory from "@/components/about/page/AboutHistory";
import AboutApproach from "@/components/about/page/AboutApproach";
import AboutManifesto from "@/components/about/page/AboutManifesto";

import FooterSection from "@/components/layout/FooterSection";
import AccommodationSearchSection from "@/components/hotels/AccommodationSearchSection";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "La storia di Pietro e Gianmarco: oltre quarant’anni di esperienza nel turismo siciliano, uniti a tecnologia, innovazione e intelligenza artificiale.",
  alternates: { canonical: "/chi-siamo" },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1}>
        <AboutHero />
        <AboutHistory />
        <AboutApproach />
        <AboutManifesto />
        <AccommodationSearchSection />

        <FooterSection />
      </main>
    </>
  );
}
import type { Metadata } from "next";
