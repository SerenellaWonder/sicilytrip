import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Termini e condizioni",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Informazioni contrattuali"
      eyebrowEn="Contract information"
      title="Termini e condizioni"
      titleEn="Terms and conditions"
      introduction="Condizioni preliminari per l’utilizzo del portale SicilyTrip."
      introductionEn="Preliminary conditions for using the SicilyTrip portal."
      sections={[
        {
          title: "Uso del sito",
          titleEn: "Use of the website",
          paragraphs: [
            "L’utente è tenuto a fornire informazioni corrette e a utilizzare il servizio nel rispetto della legge e delle condizioni mostrate durante il percorso.",
          ],
          paragraphsEn: [
            "Users must provide accurate information and use the service in accordance with the law and the conditions displayed during the process.",
          ],
        },
        {
          title: "Disponibilità e prezzi",
          titleEn: "Availability and prices",
          paragraphs: [
            "Disponibilità, prezzi e condizioni sono soggetti a riconferma. Una ricerca o una tariffa riconfermata non costituiscono da sole una prenotazione definitiva.",
          ],
          paragraphsEn: [
            "Availability, prices and conditions are subject to reconfirmation. A search or reconfirmed rate does not in itself constitute a final booking.",
          ],
        },
        {
          title: "Prenotazioni e cancellazioni",
          titleEn: "Bookings and cancellations",
          paragraphs: [
            "La prenotazione sarà conclusa solo con la conferma finale. Le condizioni di modifica, cancellazione e le eventuali penali saranno quelle visualizzate e accettate nel percorso di acquisto.",
          ],
          paragraphsEn: [
            "The booking is complete only upon final confirmation. The amendment and cancellation conditions and any penalties are those displayed and accepted during the purchase process.",
          ],
        },
        {
          title: "Versione definitiva",
          titleEn: "Final version",
          paragraphs: [
            "Prima dell’avvio commerciale dovranno essere aggiunti dati societari, ruoli dei fornitori, condizioni di pagamento, responsabilità, legge applicabile e modalità di reclamo.",
          ],
          paragraphsEn: [
            "Before commercial launch, company details, supplier roles, payment conditions, liability, applicable law and complaint procedures must be added.",
          ],
        },
      ]}
    />
  );
}
