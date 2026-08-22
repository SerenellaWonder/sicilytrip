import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  robots: { index: false, follow: true },
};

export default function CookiePage() {
  return <LegalPage eyebrow="Informativa" title="Cookie Policy" introduction="Informazioni preliminari sulle tecnologie utilizzate dal sito SicilyTrip." sections={[
    { title: "Tecnologie necessarie", paragraphs: ["Il sito utilizza funzioni del browser necessarie al servizio, come la sessione temporanea impiegata per mantenere ricerca, tariffa e bozza dei dati ospiti durante il percorso di prenotazione."] },
    { title: "Preferenze e misurazione", paragraphs: ["Prima della produzione dovranno essere censiti eventuali strumenti di analisi, marketing o servizi esterni e dovrà essere configurata la relativa gestione del consenso."] },
    { title: "Gestione", paragraphs: ["Le informazioni memorizzate localmente possono essere eliminate tramite le impostazioni del browser o chiudendo la sessione, secondo la tecnologia utilizzata."] },
  ]} />;
}
