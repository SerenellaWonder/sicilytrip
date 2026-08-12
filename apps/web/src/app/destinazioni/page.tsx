import Header from "@/components/layout/header";

import DestinationsHero from "@/components/destinations/page/DestinationsHero";
import DestinationShowcase from "@/components/destinations/page/DestinationShowcase";
import DestinationsMap from "@/components/destinations/page/DestinationsMap";
import TravelMood from "@/components/destinations/page/TravelMood";

import FooterSection from "@/components/layout/FooterSection";

export default function DestinationsPage() {
  return (
    <>
      <Header />

      <main>
        <DestinationsHero />

        <DestinationShowcase />

        <DestinationsMap />

        <TravelMood />

        <FooterSection />
      </main>
    </>
  );
}