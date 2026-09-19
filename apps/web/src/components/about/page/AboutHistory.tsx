"use client";

import Image from "next/image";
import { IconArrowDownRight, IconSparkles } from "@tabler/icons-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const content = {
  it: {
    eyebrow: "La nostra storia",
    title: "Una storia lunga più di quarant’anni.",
    accent: "Un futuro appena iniziato.",
    intro: [
      "SicilyTrip non nasce da un algoritmo né da una startup senza storia. Nasce dalla storia di un bambino che, nel 1970, sedeva sui gradini della Cappella Roano e spiegava ai turisti stranieri i segreti di quei mosaici dorati.",
      "Nasce da quarant’anni di territorio vissuto dall’interno, di relazioni vere e di Sicilia amata profondamente. A quel bambino oggi si è aggiunta una nuova generazione, che ha scelto di raccogliere il testimone e portarlo nel futuro digitale.",
    ],
    past: "Il passato porta la conoscenza: quarant’anni di Sicilia, relazioni e storie vere.",
    present: "Il presente porta l’innovazione: tecnologia, intelligenza artificiale e distribuzione internazionale in sei lingue.",
    promise: "L’AI ci aiuta a trovare la soluzione giusta. Gli esseri umani vi accompagnano a viverla.",
    year: "1970 · L’inizio",
    originTitle: "Tutto comincia sui gradini della Cappella Roano.",
    origin: [
      "Correva l’anno 1970 quando Pietro, un bambino di dieci anni, sedeva sui gradini di una delle cappelle più preziose della Cattedrale di Monreale: la Cappella Roano, allora sede del Tesoro del Duomo.",
      "Pietro cresceva a Monreale, alle porte di Palermo, dove la Cattedrale normanna custodisce alcuni dei mosaici più straordinari del Mediterraneo. I parenti di sua madre erano custodi del Duomo e così, ogni estate e in ogni pomeriggio libero, quel bambino finiva lì: ad ascoltare e a osservare i turisti arrivati da ogni parte del mondo con gli occhi spalancati davanti all’oro dei mosaici.",
      "Il venerdì era il giorno libero di zio Nino, come Pietro chiamava affettuosamente il custode. Avendo imparato a memoria ogni storia, dettaglio e segreto della Cappella, Pietro si alzava e iniziava a spiegare. In italiano, con le parole di un bambino. I turisti lo ascoltavano e qualcuno, alla fine, gli metteva qualcosa in mano.",
    ],
    calling: "Non lo sapeva ancora, ma stava già facendo il lavoro della sua vita.",
    pietroTitle: "Pietro · Una vita nel turismo",
    pietro: [
      "Quegli anni lo portarono all’Istituto Tecnico per il Turismo e poi all’università, che lasciò presto perché la teoria non bastava più. C’era l’Europa da scoprire, gruppi da accompagnare e persone da incontrare.",
      "Per quarant’anni Pietro ha attraversato il continente, portando i suoi clienti verso mete lontane ma tornando sempre alla stessa isola: la sua Sicilia. Il turismo, i viaggiatori e il mondo sono cambiati; Pietro è cambiato con loro, aggiornandosi continuamente senza mai perdere di vista una cosa: le persone.",
      "Oggi considera l’intelligenza artificiale non una minaccia, ma uno strumento straordinario: un alleato capace di elaborare dati, rispondere in sei lingue e non dormire mai. Senza poter sostituire quello sguardo umano che riconosce il bisogno di un viaggiatore prima ancora che venga espresso.",
    ],
    quote: "La Sicilia non è una destinazione. È una condizione dell’anima.",
    gianmarcoTitle: "Gianmarco · La nuova generazione",
    gianmarco: [
      "Gianmarco ha scelto la stessa strada per passione, non per obbligo. Dopo il diploma all’Istituto Tecnico per il Turismo, è partito per Reading, in Inghilterra. Ha iniziato come cameriere in un ristorante di livello, imparando che l’ospitalità nasce dai dettagli, dalla cura e dal rispetto per ogni singolo cliente.",
      "Tornato in Sicilia, ha svolto un tirocinio al ricevimento di una struttura alberghiera. Poi è rientrato a Reading, questa volta come manager. Ha conosciuto ogni livello del settore e ne ha compreso il funzionamento dall’interno.",
      "Quando è tornato definitivamente in Sicilia, ha rilevato l’agenzia di famiglia con una visione chiara: portare l’innovazione digitale dove suo padre aveva costruito decenni di esperienza umana.",
    ],
    future: "Il futuro del turismo è ibrido: tecnologia e umanità, algoritmi e relazioni, intelligenza artificiale e intelligenza emotiva. Non l’una contro l’altra. Insieme.",
    welcome: "Benvenuto su SicilyTrip.",
  },
  en: {
    eyebrow: "Our story",
    title: "A story spanning more than forty years.",
    accent: "A future that has just begun.",
    intro: [
      "SicilyTrip was not born from an algorithm or from a start-up with no history. It began with a child who, in 1970, sat on the steps of the Roano Chapel and revealed the secrets of its golden mosaics to visitors from abroad.",
      "It grew from forty years of experiencing the region from within, building genuine relationships and loving Sicily deeply. Today, a new generation has chosen to carry that legacy into the digital future.",
    ],
    past: "The past brings knowledge: forty years of Sicily, relationships and true stories.",
    present: "The present brings innovation: technology, artificial intelligence and international distribution in six languages.",
    promise: "AI helps us find the right solution. People accompany you as you experience it.",
    year: "1970 · The beginning",
    originTitle: "It all began on the steps of the Roano Chapel.",
    origin: [
      "In 1970, Pietro was ten years old. He would sit on the steps of one of the most precious chapels in Monreale Cathedral: the Roano Chapel, which at the time housed the Cathedral Treasury.",
      "Pietro grew up in Monreale, just outside Palermo, where the Norman Cathedral preserves some of the Mediterranean’s most extraordinary mosaics. His mother’s relatives were custodians of the Cathedral, so every summer and every free afternoon he found himself there, listening and watching visitors arrive from all over the world, amazed by the gold of the mosaics.",
      "Friday was uncle Nino’s day off, as Pietro affectionately called the custodian. Having learnt every story, detail and secret of the Chapel by heart, Pietro would stand up and begin to explain. In Italian, using a child’s words. The visitors listened and, at the end, someone would place something in his hand.",
    ],
    calling: "He did not know it yet, but he was already doing the work of his life.",
    pietroTitle: "Pietro · A life in travel",
    pietro: [
      "Those years led him to study tourism and later attend university, which he soon left because theory was no longer enough. Europe was waiting to be discovered, groups needed guiding and people were there to be met.",
      "For forty years Pietro travelled across the continent, taking his clients to distant places while always returning to the same island: his Sicily. Tourism, travellers and the world changed; Pietro changed with them, continually learning without ever losing sight of one thing: people.",
      "Today he sees artificial intelligence not as a threat but as an extraordinary tool: an ally capable of processing data, replying in six languages and never sleeping. Yet it can never replace the human insight that recognises a traveller’s needs before they are even expressed.",
    ],
    quote: "Sicily is not a destination. It is a state of mind.",
    gianmarcoTitle: "Gianmarco · The new generation",
    gianmarco: [
      "Gianmarco chose the same path out of passion, not obligation. After completing his tourism studies, he left for Reading in England. He began as a waiter in a high-level restaurant, learning that hospitality is built through detail, care and respect for every guest.",
      "Back in Sicily, he trained at a hotel reception desk. He then returned to Reading, this time as a manager. He experienced every level of the industry and learnt how it works from the inside.",
      "When he returned to Sicily permanently, he took over the family agency with a clear vision: bring digital innovation to the place where his father had built decades of human experience.",
    ],
    future: "The future of travel is hybrid: technology and humanity, algorithms and relationships, artificial intelligence and emotional intelligence. Not one against the other. Together.",
    welcome: "Welcome to SicilyTrip.",
  },
};

export default function AboutHistory() {
  const { language } = useLanguage();
  const copy = language === "en" ? content.en : content.it;

  return (
    <section id="storia" className="overflow-hidden bg-[#F7F3EC] py-24 lg:py-32">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 border-b border-[#0D2340]/10 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F58220]"><IconSparkles size={15} />{copy.eyebrow}</p>
            <h2 className="mt-6 text-[42px] font-bold leading-[1.02] tracking-[-0.05em] text-[#0D2340] sm:text-[54px] lg:text-[64px]">{copy.title}<br /><span className="text-[#0D2340]/35">{copy.accent}</span></h2>
          </div>
          <div className="space-y-5 text-[16px] leading-8 text-[#0D2340]/60">{copy.intro.map((text) => <p key={text}>{text}</p>)}</div>
        </div>

        <div className="grid gap-4 py-12 md:grid-cols-2">
          {[copy.past, copy.present].map((text, index) => <article key={text} className="rounded-[24px] bg-white p-7 sm:p-8"><span className="text-[10px] font-bold tracking-[0.18em] text-[#F58220]">0{index + 1}</span><p className="mt-4 text-xl font-semibold leading-8 text-[#0D2340]">{text}</p></article>)}
        </div>

        <blockquote className="rounded-[28px] bg-[#0D2340] px-7 py-10 text-[27px] font-semibold leading-tight tracking-[-0.03em] text-white sm:px-10 sm:text-[36px] lg:px-14 lg:py-14 lg:text-[44px]">“{copy.promise}”</blockquote>

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div className="overflow-hidden rounded-[30px] lg:sticky lg:top-28">
            <Image src="/images/about-story.jpg" alt={copy.originTitle} width={900} height={1100} className="h-[520px] w-full object-cover lg:h-[720px]" />
            <div className="bg-[#F58220] p-7 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.2em]">{copy.year}</p><p className="mt-3 text-2xl font-semibold leading-8">{copy.originTitle}</p></div>
          </div>
          <div>
            <Paragraphs items={copy.origin} />
            <p className="my-12 border-y border-[#0D2340]/10 py-10 text-[30px] font-semibold leading-tight tracking-[-0.035em] text-[#0D2340] sm:text-[38px]">{copy.calling}</p>
            <Chapter title={copy.pietroTitle} paragraphs={copy.pietro} />
            <blockquote className="my-12 border-l-2 border-[#F58220] pl-7 text-[27px] font-semibold italic leading-tight text-[#0D2340] sm:text-[34px]">“{copy.quote}”</blockquote>
            <Chapter title={copy.gianmarcoTitle} paragraphs={copy.gianmarco} />
          </div>
        </div>

        <div className="mt-20 rounded-[30px] bg-white p-8 sm:p-12 lg:flex lg:items-end lg:justify-between lg:gap-16 lg:p-16">
          <p className="max-w-[940px] text-[30px] font-semibold leading-[1.15] tracking-[-0.04em] text-[#0D2340] sm:text-[40px] lg:text-[50px]">{copy.future}</p>
          <div className="mt-8 flex shrink-0 items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F58220] lg:mt-0">{copy.welcome}<IconArrowDownRight size={18} /></div>
        </div>
      </div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return <div className="space-y-6 text-[16px] leading-8 text-[#0D2340]/60">{items.map((text) => <p key={text}>{text}</p>)}</div>;
}

function Chapter({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return <article><h3 className="text-[30px] font-bold tracking-[-0.035em] text-[#0D2340] sm:text-[38px]">{title}</h3><div className="mt-6"><Paragraphs items={paragraphs} /></div></article>;
}
