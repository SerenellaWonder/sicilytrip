import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  robots: { index: false, follow: true },
};

export default function CookiePage() {
  return (
    <LegalPage
      eyebrow="Informativa"
      eyebrowEn="Information notice"
      title="Cookie Policy"
      titleEn="Cookie Policy"
      introduction="Informazioni preliminari sulle tecnologie utilizzate dal sito SicilyTrip."
      introductionEn="Preliminary information about the technologies used by the SicilyTrip website."
      sections={[
        {
          title: "Tecnologie necessarie",
          titleEn: "Necessary technologies",
          paragraphs: [
            "Il sito utilizza funzioni del browser necessarie al servizio, come la sessione temporanea impiegata per mantenere ricerca, tariffa e bozza dei dati ospiti durante il percorso di prenotazione.",
          ],
          paragraphsEn: [
            "The website uses browser features required for the service, such as the temporary session used to retain the search, rate and draft guest details during the booking process.",
          ],
        },
        {
          title: "Preferenze e misurazione",
          titleEn: "Preferences and measurement",
          paragraphs: [
            "Prima della produzione dovranno essere censiti eventuali strumenti di analisi, marketing o servizi esterni e dovrà essere configurata la relativa gestione del consenso.",
          ],
          paragraphsEn: [
            "Before production, any analytics, marketing tools or external services must be identified and the relevant consent management configured.",
          ],
        },
        {
          title: "Gestione",
          titleEn: "Management",
          paragraphs: [
            "Le informazioni memorizzate localmente possono essere eliminate tramite le impostazioni del browser o chiudendo la sessione, secondo la tecnologia utilizzata.",
          ],
          paragraphsEn: [
            "Information stored locally can be deleted through the browser settings or by closing the session, depending on the technology used.",
          ],
        },
      ]}
    />
  );
}
