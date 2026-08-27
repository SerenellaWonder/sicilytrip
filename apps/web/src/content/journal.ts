export type JournalArticle = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  readingTime: string;
  introduction: string;
  sections: Array<{ title: string; paragraphs: string[] }>;
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "taormina-oltre-la-cartolina",
    category: "Destinazioni",
    title: "Taormina oltre la cartolina",
    subtitle: "Cortili, panorami e silenzi da scoprire con lentezza.",
    excerpt:
      "Quando le strade si svuotano, Taormina mostra terrazze sul mare e indirizzi lontani dai percorsi più evidenti.",
    image: "/images/journal-taormina.jpg",
    imageAlt: "Taormina e il Mediterraneo",
    publishedAt: "2026-08-12",
    readingTime: "6 min",
    introduction:
      "Taormina è celebre per il teatro antico e la vista sull'Etna, ma il suo carattere più autentico emerge nelle ore tranquille, quando il centro rallenta e ogni deviazione diventa un invito alla scoperta.",
    sections: [
      {
        title: "Il momento giusto per camminare",
        paragraphs: [
          "La mattina presto il corso appartiene ancora a chi apre le botteghe. È il momento ideale per osservare portali, balconi e piccoli passaggi che durante il giorno si confondono nella folla.",
          "Al tramonto, invece, la luce avvicina idealmente la montagna al mare. Basta allontanarsi di poche strade dall'asse principale per ritrovare silenzio e prospettive inattese.",
        ],
      },
      {
        title: "Giardini e terrazze sospese",
        paragraphs: [
          "La Villa Comunale conserva sentieri ombreggiati e costruzioni eccentriche affacciate sulla costa. Da qui lo sguardo attraversa Isola Bella e raggiunge la costa ionica.",
          "Le terrazze degli alberghi storici e dei piccoli ristoranti raccontano un'altra Taormina: più raccolta, fatta di agrumi, pietra chiara e conversazioni che seguono il ritmo della sera.",
        ],
      },
      {
        title: "Un soggiorno senza fretta",
        paragraphs: [
          "Fermarsi almeno due notti permette di alternare il centro alle spiagge e ai borghi vicini. Castelmola, sopra Taormina, offre una prospettiva differente e un'atmosfera ancora più intima.",
          "Il consiglio SicilyTrip è semplice: scegli un solo luogo da visitare ogni mezza giornata e lascia spazio agli incontri casuali. È spesso lì che comincia il ricordo più bello.",
        ],
      },
    ],
  },
  {
    slug: "una-tavola-mille-sicilie",
    category: "Sapori",
    title: "Una tavola, mille Sicilie",
    subtitle: "Ingredienti e gesti che cambiano da una provincia all'altra.",
    excerpt:
      "Dal mercato alla cucina, un viaggio attraverso ingredienti, tradizioni e gesti che cambiano da una provincia all'altra.",
    image: "/images/journal-food.jpg",
    imageAlt: "Sapori della cucina siciliana",
    publishedAt: "2026-08-18",
    readingTime: "5 min",
    introduction:
      "Parlare di cucina siciliana al singolare è quasi impossibile. Ogni costa, campagna e città ha costruito un lessico diverso, nato dagli scambi nel Mediterraneo e dalla disponibilità delle materie prime.",
    sections: [
      {
        title: "Il mercato come punto di partenza",
        paragraphs: [
          "A Palermo, Catania e Siracusa il mercato non è soltanto il luogo della spesa. È una mappa sonora della città, dove il pesce incontra agrumi, erbe spontanee, formaggi e conserve.",
          "Visitandolo al mattino si comprende la stagionalità prima ancora di sedersi a tavola. I colori dei banchi anticipano ciò che comparirà nei menu della giornata.",
        ],
      },
      {
        title: "Ricette che raccontano incontri",
        paragraphs: [
          "Mandorle, pistacchi, sesamo e spezie convivono con pasta, ortaggi e pesce azzurro. La stratificazione culturale dell'isola è visibile in ogni preparazione, dalle ricette di strada ai piatti delle feste.",
          "Anche una stessa specialità cambia nome, forma e condimento dopo pochi chilometri. È questa varietà, più di una ricetta definitiva, a definire la cucina siciliana.",
        ],
      },
      {
        title: "Assaggiare con consapevolezza",
        paragraphs: [
          "Un buon itinerario gastronomico alterna mercati, piccoli produttori e tavole familiari. Chiedere l'origine di un ingrediente apre spesso conversazioni preziose sul territorio.",
        ],
      },
    ],
  },
  {
    slug: "eolie-mare-incontra-fuoco",
    category: "Isole",
    title: "Eolie, dove il mare incontra il fuoco",
    subtitle: "Sette isole e sette modi diversi di vivere il Mediterraneo.",
    excerpt:
      "Vulcani, baie, piccoli porti e giornate scandite soltanto dal mare: ogni isola custodisce un carattere distinto.",
    image: "/images/journal-islands.jpg",
    imageAlt: "Paesaggio delle Isole Eolie",
    publishedAt: "2026-08-24",
    readingTime: "7 min",
    introduction:
      "Le Eolie formano un arcipelago compatto sulla carta e sorprendentemente vario una volta raggiunto. Scegliere dove fermarsi significa scegliere un ritmo, un paesaggio e un modo personale di incontrare il mare.",
    sections: [
      {
        title: "Sette identità",
        paragraphs: [
          "Lipari è il centro più vivace e il punto di partenza più semplice. Salina offre colline verdi e una raffinata cultura agricola, mentre Vulcano e Stromboli mostrano in superficie l'energia geologica dell'arcipelago.",
          "Panarea predilige atmosfere eleganti; Alicudi e Filicudi invitano alla disconnessione. Stromboli vive alla presenza costante del vulcano, Ginostra custodisce uno degli approdi più piccoli e suggestivi.",
        ],
      },
      {
        title: "Muoversi seguendo il mare",
        paragraphs: [
          "Aliscafi e traghetti collegano le isole, ma vento e condizioni marine restano parte del viaggio. Un programma elastico è sempre preferibile a una sequenza troppo serrata.",
          "Per una prima visita conviene scegliere una base e aggiungere poche escursioni. Cambiare isola ogni giorno sottrae tempo proprio a ciò che rende speciale l'arcipelago: la lentezza.",
        ],
      },
      {
        title: "La stagione più adatta",
        paragraphs: [
          "La tarda primavera e l'inizio dell'autunno regalano temperature miti e approdi più tranquilli. In piena estate l'energia aumenta, insieme alla necessità di prenotare con anticipo.",
        ],
      },
    ],
  },
];

export function getJournalArticle(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}
