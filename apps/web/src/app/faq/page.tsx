import type { Metadata } from "next";
import { ChevronDown, HelpCircle } from "lucide-react";

import FooterSection from "@/components/layout/FooterSection";
import Header from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Domande frequenti | SicilyTrip",
  description:
    "Risposte alle domande più comuni su ricerca hotel, disponibilità, tariffe e prenotazioni con SicilyTrip.",
};

const sections = [
  {
    title: "Ricerca e disponibilità",
    questions: [
      {
        question: "Quanto resta valida una ricerca hotel?",
        answer:
          "La disponibilità e i riferimenti della ricerca restano validi per 20 minuti. Dopo questo intervallo è necessario effettuare una nuova ricerca per ottenere prezzi e camere aggiornati.",
      },
      {
        question: "Perché il prezzo può cambiare durante la prenotazione?",
        answer:
          "Prezzi e disponibilità vengono forniti in tempo reale. Prima di raccogliere i dati degli ospiti, SicilyTrip riconferma la tariffa e mostra l’importo aggiornato e le condizioni applicabili.",
      },
      {
        question: "Posso modificare date o numero di ospiti?",
        answer:
          "Sì. Torna alla ricerca, modifica date o composizione degli ospiti e avvia una nuova verifica della disponibilità.",
      },
    ],
  },
  {
    title: "Tariffe e condizioni",
    questions: [
      {
        question: "Dove trovo le condizioni di cancellazione?",
        answer:
          "Le condizioni preliminari sono indicate insieme alla camera. Dopo la riconferma della tariffa vengono mostrati il termine di cancellazione e le eventuali penali definitive.",
      },
      {
        question: "La tassa di soggiorno è inclusa?",
        answer:
          "Quando prevista dalla destinazione, la tassa di soggiorno può essere richiesta direttamente dalla struttura. Le note definitive della tariffa indicano le condizioni comunicate dal fornitore.",
      },
      {
        question: "I bambini hanno sempre un letto separato?",
        answer:
          "Non necessariamente. La sistemazione dei bambini dipende dalla camera e dalle condizioni della struttura. È importante controllare le note della tariffa prima di continuare.",
      },
    ],
  },
  {
    title: "Prenotazione e assistenza",
    questions: [
      {
        question: "Quando una prenotazione è confermata?",
        answer:
          "Una tariffa riconfermata non equivale ancora a una prenotazione. La prenotazione è conclusa solo quando viene mostrata la conferma finale con il relativo riferimento.",
      },
      {
        question: "I dati inseriti vengono subito inviati all’hotel?",
        answer:
          "No. Durante la compilazione vengono conservati temporaneamente nella sessione del browser e saranno trasmessi soltanto nel passaggio finale della prenotazione.",
      },
      {
        question: "Come posso richiedere assistenza?",
        answer:
          "Puoi utilizzare il concierge presente sul sito per ricevere supporto nella ricerca e nell’organizzazione del soggiorno.",
      },
    ],
  },
];

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
                Tutto ciò che serve sapere per cercare un soggiorno, controllare una tariffa e procedere con tranquillità.
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {sections.map(section => (
                <section key={section.title}>
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[#0D2340]">
                    {section.title}
                  </h2>

                  <div className="space-y-3">
                    {section.questions.map(item => (
                      <details
                        key={item.question}
                        className="group rounded-2xl border border-[#0D2340]/[0.07] bg-white p-5 shadow-[0_8px_28px_rgba(13,35,64,0.04)]"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold leading-6 text-[#0D2340]">
                          {item.question}
                          <ChevronDown
                            size={17}
                            className="shrink-0 text-[#F58220] transition-transform group-open:rotate-180"
                          />
                        </summary>
                        <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-6 text-slate-500">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
