import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";

import FaqExplorer from "@/components/faq/FaqExplorer";
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
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-[#F58220]">
                <HelpCircle size={20} />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em]">
                  Centro assistenza
                </span>
              </div>

              <h1 className="mt-6 text-[44px] font-bold leading-[1.05] tracking-[-0.05em] text-[#0D2340] sm:text-[60px] lg:text-[72px]">
                Domande frequenti
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500">
                Tutto ciò che serve sapere per cercare un soggiorno, controllare
                una tariffa e procedere con tranquillità.
              </p>
            </div>

            <FaqExplorer sections={faqSections} />
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
