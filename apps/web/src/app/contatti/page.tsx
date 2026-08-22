import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import ContactForm from "@/components/contact/ContactForm";
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
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F58220]">
              SicilyTrip
            </span>
            <h1 className="mt-5 text-[44px] font-bold leading-[1.05] tracking-[-0.05em] text-[#0D2340] sm:text-[60px]">
              Parliamo del tuo viaggio
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-500">
              Scrivici per informazioni sul soggiorno o per ricevere supporto nell’organizzazione della tua esperienza in Sicilia.
            </p>

            <div className="mt-10 space-y-4">
              <a href="mailto:info@sicilytrip.it" className="flex items-center gap-4 rounded-2xl bg-white p-5 text-sm font-semibold text-[#0D2340]">
                <Mail size={19} className="text-[#F58220]" />
                info@sicilytrip.it
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 text-sm font-semibold text-[#0D2340]">
                <MapPin size={19} className="text-[#F58220]" />
                Palermo · Sicilia
              </div>
            </div>
          </div>

          <ContactForm />
        </section>
        <FooterSection />
      </main>
    </>
  );
}
