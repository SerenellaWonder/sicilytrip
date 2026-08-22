import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <LegalPage eyebrow="Informativa" title="Privacy" introduction="Questa pagina descrive in forma preliminare come SicilyTrip tratta i dati utilizzati durante la navigazione e le richieste di viaggio." sections={[
    { title: "Dati trattati", paragraphs: ["Il sito può trattare dati di contatto forniti volontariamente, parametri della ricerca hotel e dati degli ospiti inseriti durante il percorso di prenotazione."] },
    { title: "Finalità", paragraphs: ["I dati vengono utilizzati per rispondere alle richieste, verificare disponibilità e tariffe e, quando il servizio sarà attivo, completare la prenotazione richiesta dall’utente."] },
    { title: "Conservazione e destinatari", paragraphs: ["Le bozze inserite nel percorso attuale restano nella sessione del browser. Nel servizio definitivo dovranno essere indicati tempi di conservazione, fornitori coinvolti e modalità di esercizio dei diritti."] },
    { title: "Contatti", paragraphs: ["Per informazioni è possibile scrivere a info@sicilytrip.it."] },
  ]} />;
}
