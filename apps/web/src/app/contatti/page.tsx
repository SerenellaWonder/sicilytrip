import type { Metadata } from "next";

import ContactForm from "@/components/contact/ContactForm";
import ContactIntro from "@/components/contact/ContactIntro";
import FooterSection from "@/components/layout/FooterSection";
import Header from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Contatta SicilyTrip per informazioni e assistenza sul tuo viaggio in Sicilia.",
  alternates: { canonical: "/contatti" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F5F1] pt-[110px]">
        <section className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
          <ContactIntro />

          <ContactForm />
        </section>
        <FooterSection />
      </main>
    </>
  );
}
