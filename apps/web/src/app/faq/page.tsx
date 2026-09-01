import type { Metadata } from "next";

import FaqExplorer from "@/components/faq/FaqExplorer";
import FaqIntro from "@/components/faq/FaqIntro";
import FooterSection from "@/components/layout/FooterSection";
import Header from "@/components/layout/header";
import { faqSections } from "@/content/faq";

export const metadata: Metadata = {
  title: "Domande frequenti",
  description:
    "Risposte alle domande più comuni su ricerca hotel, disponibilità, tariffe e prenotazioni con SicilyTrip.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F7F5F1] pt-[110px]">
        <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="absolute -right-40 top-5 size-[420px] rounded-full bg-[#F58220]/[0.07] blur-3xl" />

          <div className="relative mx-auto max-w-[1180px]">
            <FaqIntro />

            <FaqExplorer sections={faqSections} />
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
