import Header from "@/components/layout/header";

import DestinationsHero from "@/components/destinations/page/DestinationsHero";
import DestinationShowcase from "@/components/destinations/page/DestinationShowcase";
import DestinationsMap from "@/components/destinations/page/DestinationsMap";
import TravelMood from "@/components/destinations/page/TravelMood";

import FooterSection from "@/components/layout/FooterSection";

export const metadata: Metadata = {
  title: "Destinazioni",
  description:
    "Esplora le destinazioni più affascinanti della Sicilia e trova il luogo ideale per il tuo prossimo soggiorno.",
  alternates: { canonical: "/destinazioni" },
};

export default function DestinationsPage() {
  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1}>
        <DestinationsHero />

        <DestinationShowcase />

        <DestinationsMap />

        <TravelMood />

        <FooterSection />
      </main>
    </>
  );
}
import type { Metadata } from "next";
