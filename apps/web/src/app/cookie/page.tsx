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
            "Le preferenze facoltative possono ricordare le scelte effettuate nel portale. Al momento non sono attivi cookie di profilazione o marketing.",
          ],
          paragraphsEn: [
            "Optional preferences can remember choices made on the website. Profiling and marketing cookies are not currently active.",
          ],
        },
        {
          title: "Servizi esterni",
          titleEn: "External services",
          paragraphs: [
            "La mappa interattiva di Google Maps viene caricata soltanto dopo il consenso dell’utente. Prima dell’autorizzazione non viene stabilito alcun collegamento con il servizio esterno.",
          ],
          paragraphsEn: [
            "The interactive Google Maps map is loaded only after the user’s consent. No connection to the external service is established before permission is granted.",
          ],
        },
        {
          title: "Gestione",
          titleEn: "Management",
          paragraphs: [
            "Le preferenze possono essere modificate in qualsiasi momento tramite il collegamento Preferenze cookie presente nel footer. Le informazioni locali possono inoltre essere eliminate dalle impostazioni del browser.",
          ],
          paragraphsEn: [
            "Preferences can be changed at any time through the Cookie preferences link in the footer. Local information can also be deleted through the browser settings.",
          ],
        },
      ]}
    />
  );
}
