import Header from "@/components/layout/header";
import Hero from "@/components/hero";

import FeaturedDestinations from "@/components/destinations/FeaturedDestinations";
import AboutSection from "@/components/about/AboutSection";
import FeaturedExperiences from "@/components/experiences/FeaturedExperiences";
import FooterSection from "@/components/layout/FooterSection";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <FeaturedDestinations />

        <AboutSection />

        <FeaturedExperiences />

        <FooterSection />
      </main>
    </>
  );
}
import type { Metadata } from "next";
