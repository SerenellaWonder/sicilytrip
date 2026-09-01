import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Informativa"
      eyebrowEn="Information notice"
      title="Privacy"
      titleEn="Privacy"
      introduction="Questa pagina descrive in forma preliminare come SicilyTrip tratta i dati utilizzati durante la navigazione e le richieste di viaggio."
      introductionEn="This page provides a preliminary description of how SicilyTrip processes data used while browsing and making travel requests."
      sections={[
        {
          title: "Dati trattati",
          titleEn: "Data processed",
          paragraphs: [
            "Il sito può trattare dati di contatto forniti volontariamente, parametri della ricerca hotel e dati degli ospiti inseriti durante il percorso di prenotazione.",
          ],
          paragraphsEn: [
            "The website may process contact details provided voluntarily, hotel search parameters and guest details entered during the booking process.",
          ],
        },
        {
          title: "Finalità",
          titleEn: "Purposes",
          paragraphs: [
            "I dati vengono utilizzati per rispondere alle richieste, verificare disponibilità e tariffe e, quando il servizio sarà attivo, completare la prenotazione richiesta dall’utente.",
          ],
          paragraphsEn: [
            "Data is used to respond to requests, check availability and rates and, once the service is active, complete the booking requested by the user.",
          ],
        },
        {
          title: "Conservazione e destinatari",
          titleEn: "Retention and recipients",
          paragraphs: [
            "Le bozze inserite nel percorso attuale restano nella sessione del browser. Nel servizio definitivo dovranno essere indicati tempi di conservazione, fornitori coinvolti e modalità di esercizio dei diritti.",
          ],
          paragraphsEn: [
            "Drafts entered in the current process remain in the browser session. The final service must specify retention periods, the suppliers involved and how users can exercise their rights.",
          ],
        },
        {
          title: "Contatti",
          titleEn: "Contact",
          paragraphs: [
            "Per informazioni è possibile scrivere a info@sicilytrip.it.",
          ],
          paragraphsEn: [
            "For information, write to info@sicilytrip.it.",
          ],
        },
      ]}
    />
  );
}
