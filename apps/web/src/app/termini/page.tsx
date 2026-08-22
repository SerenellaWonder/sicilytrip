import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Termini e condizioni",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalPage eyebrow="Informazioni contrattuali" title="Termini e condizioni" introduction="Condizioni preliminari per l’utilizzo del portale SicilyTrip." sections={[
    { title: "Uso del sito", paragraphs: ["L’utente è tenuto a fornire informazioni corrette e a utilizzare il servizio nel rispetto della legge e delle condizioni mostrate durante il percorso."] },
    { title: "Disponibilità e prezzi", paragraphs: ["Disponibilità, prezzi e condizioni sono soggetti a riconferma. Una ricerca o una tariffa riconfermata non costituiscono da sole una prenotazione definitiva."] },
    { title: "Prenotazioni e cancellazioni", paragraphs: ["La prenotazione sarà conclusa solo con la conferma finale. Le condizioni di modifica, cancellazione e le eventuali penali saranno quelle visualizzate e accettate nel percorso di acquisto."] },
    { title: "Versione definitiva", paragraphs: ["Prima dell’avvio commerciale dovranno essere aggiunti dati societari, ruoli dei fornitori, condizioni di pagamento, responsabilità, legge applicabile e modalità di reclamo."] },
  ]} />;
}
