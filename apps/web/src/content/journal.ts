export type JournalArticle = {
  slug: string;
  category: string;
  categoryEn: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  excerpt: string;
  excerptEn: string;
  image: string;
  imageAlt: string;
  imageAltEn: string;
  publishedAt: string;
  readingTime: string;
  introduction: string;
  introductionEn: string;
  sections: Array<{
    title: string;
    titleEn: string;
    paragraphs: string[];
    paragraphsEn: string[];
  }>;
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "taormina-oltre-la-cartolina",
    category: "Destinazioni",
    categoryEn: "Destinations",
    title: "Taormina oltre la cartolina",
    titleEn: "Taormina beyond the postcard",
    subtitle: "Cortili, panorami e silenzi da scoprire con lentezza.",
    subtitleEn: "Courtyards, views and quiet corners to discover slowly.",
    excerpt:
      "Quando le strade si svuotano, Taormina mostra terrazze sul mare e indirizzi lontani dai percorsi più evidenti.",
    excerptEn:
      "When the streets empty, Taormina reveals sea-view terraces and places far from the most obvious routes.",
    image: "/images/journal-taormina.jpg",
    imageAlt: "Taormina e il Mediterraneo",
    imageAltEn: "Taormina and the Mediterranean",
    publishedAt: "2026-08-12",
    readingTime: "6 min",
    introduction:
      "Taormina è celebre per il teatro antico e la vista sull'Etna, ma il suo carattere più autentico emerge nelle ore tranquille, quando il centro rallenta e ogni deviazione diventa un invito alla scoperta.",
    introductionEn:
      "Taormina is famous for its ancient theatre and views of Mount Etna, but its most authentic character emerges in the quieter hours, when the centre slows down and every detour becomes an invitation to explore.",
    sections: [
      {
        title: "Il momento giusto per camminare",
        titleEn: "The right time for a walk",
        paragraphs: [
          "La mattina presto il corso appartiene ancora a chi apre le botteghe. È il momento ideale per osservare portali, balconi e piccoli passaggi che durante il giorno si confondono nella folla.",
          "Al tramonto, invece, la luce avvicina idealmente la montagna al mare. Basta allontanarsi di poche strade dall'asse principale per ritrovare silenzio e prospettive inattese.",
        ],
        paragraphsEn: [
          "Early in the morning, the main street still belongs to those opening their shops. It is the ideal time to notice doorways, balconies and small passages that disappear into the crowds later in the day.",
          "At sunset, the light seems to bring the mountain closer to the sea. Walk just a few streets away from the main route to rediscover silence and unexpected views.",
        ],
      },
      {
        title: "Giardini e terrazze sospese",
        titleEn: "Gardens and suspended terraces",
        paragraphs: [
          "La Villa Comunale conserva sentieri ombreggiati e costruzioni eccentriche affacciate sulla costa. Da qui lo sguardo attraversa Isola Bella e raggiunge la costa ionica.",
          "Le terrazze degli alberghi storici e dei piccoli ristoranti raccontano un'altra Taormina: più raccolta, fatta di agrumi, pietra chiara e conversazioni che seguono il ritmo della sera.",
        ],
        paragraphsEn: [
          "The Villa Comunale preserves shaded paths and eccentric buildings overlooking the coast. From here, the view crosses Isola Bella and stretches along the Ionian coastline.",
          "The terraces of historic hotels and small restaurants reveal another Taormina: more intimate, shaped by citrus trees, pale stone and conversations that follow the rhythm of the evening.",
        ],
      },
      {
        title: "Un soggiorno senza fretta",
        titleEn: "An unhurried stay",
        paragraphs: [
          "Fermarsi almeno due notti permette di alternare il centro alle spiagge e ai borghi vicini. Castelmola, sopra Taormina, offre una prospettiva differente e un'atmosfera ancora più intima.",
          "Il consiglio SicilyTrip è semplice: scegli un solo luogo da visitare ogni mezza giornata e lascia spazio agli incontri casuali. È spesso lì che comincia il ricordo più bello.",
        ],
        paragraphsEn: [
          "Staying for at least two nights lets you alternate the town centre with beaches and nearby villages. Castelmola, above Taormina, offers a different perspective and an even more intimate atmosphere.",
          "SicilyTrip’s advice is simple: choose just one place to visit each half-day and leave room for chance encounters. That is often where the most beautiful memory begins.",
        ],
      },
    ],
  },
  {
    slug: "una-tavola-mille-sicilie",
    category: "Sapori",
    categoryEn: "Flavours",
    title: "Una tavola, mille Sicilie",
    titleEn: "One table, a thousand Sicilies",
    subtitle: "Ingredienti e gesti che cambiano da una provincia all'altra.",
    subtitleEn: "Ingredients and gestures that change from one province to the next.",
    excerpt:
      "Dal mercato alla cucina, un viaggio attraverso ingredienti, tradizioni e gesti che cambiano da una provincia all'altra.",
    excerptEn:
      "From market to kitchen, a journey through ingredients, traditions and gestures that change from one province to the next.",
    image: "/images/journal-food.jpg",
    imageAlt: "Sapori della cucina siciliana",
    imageAltEn: "Flavours of Sicilian cuisine",
    publishedAt: "2026-08-18",
    readingTime: "5 min",
    introduction:
      "Parlare di cucina siciliana al singolare è quasi impossibile. Ogni costa, campagna e città ha costruito un lessico diverso, nato dagli scambi nel Mediterraneo e dalla disponibilità delle materie prime.",
    introductionEn:
      "It is almost impossible to speak of Sicilian cuisine in the singular. Every coast, countryside and city has developed a different vocabulary, born from Mediterranean exchanges and the ingredients available locally.",
    sections: [
      {
        title: "Il mercato come punto di partenza",
        titleEn: "The market as a starting point",
        paragraphs: [
          "A Palermo, Catania e Siracusa il mercato non è soltanto il luogo della spesa. È una mappa sonora della città, dove il pesce incontra agrumi, erbe spontanee, formaggi e conserve.",
          "Visitandolo al mattino si comprende la stagionalità prima ancora di sedersi a tavola. I colori dei banchi anticipano ciò che comparirà nei menu della giornata.",
        ],
        paragraphsEn: [
          "In Palermo, Catania and Syracuse, the market is much more than a place to shop. It is a living sound map of the city, where fish meets citrus fruits, wild herbs, cheeses and preserves.",
          "Visiting in the morning reveals the seasons before you even sit down to eat. The colours of the stalls anticipate what will appear on the day’s menus.",
        ],
      },
      {
        title: "Ricette che raccontano incontri",
        titleEn: "Recipes that tell of encounters",
        paragraphs: [
          "Mandorle, pistacchi, sesamo e spezie convivono con pasta, ortaggi e pesce azzurro. La stratificazione culturale dell'isola è visibile in ogni preparazione, dalle ricette di strada ai piatti delle feste.",
          "Anche una stessa specialità cambia nome, forma e condimento dopo pochi chilometri. È questa varietà, più di una ricetta definitiva, a definire la cucina siciliana.",
        ],
        paragraphsEn: [
          "Almonds, pistachios, sesame and spices sit alongside pasta, vegetables and oily fish. The island’s cultural layers are visible in every preparation, from street food to festive dishes.",
          "Even the same speciality changes name, shape and seasoning after just a few kilometres. More than any definitive recipe, it is this variety that defines Sicilian cuisine.",
        ],
      },
      {
        title: "Assaggiare con consapevolezza",
        titleEn: "Tasting with awareness",
        paragraphs: [
          "Un buon itinerario gastronomico alterna mercati, piccoli produttori e tavole familiari. Chiedere l'origine di un ingrediente apre spesso conversazioni preziose sul territorio.",
        ],
        paragraphsEn: [
          "A good food itinerary alternates markets, small producers and family tables. Asking where an ingredient comes from often opens valuable conversations about the surrounding area.",
        ],
      },
    ],
  },
  {
    slug: "eolie-mare-incontra-fuoco",
    category: "Isole",
    categoryEn: "Islands",
    title: "Eolie, dove il mare incontra il fuoco",
    titleEn: "Aeolian Islands, where the sea meets fire",
    subtitle: "Sette isole e sette modi diversi di vivere il Mediterraneo.",
    subtitleEn: "Seven islands and seven different ways to experience the Mediterranean.",
    excerpt:
      "Vulcani, baie, piccoli porti e giornate scandite soltanto dal mare: ogni isola custodisce un carattere distinto.",
    excerptEn:
      "Volcanoes, bays, small harbours and days shaped only by the sea: each island has a distinct character.",
    image: "/images/journal-islands.jpg",
    imageAlt: "Paesaggio delle Isole Eolie",
    imageAltEn: "Landscape of the Aeolian Islands",
    publishedAt: "2026-08-24",
    readingTime: "7 min",
    introduction:
      "Le Eolie formano un arcipelago compatto sulla carta e sorprendentemente vario una volta raggiunto. Scegliere dove fermarsi significa scegliere un ritmo, un paesaggio e un modo personale di incontrare il mare.",
    introductionEn:
      "The Aeolian Islands form a compact archipelago on the map, yet prove surprisingly varied once reached. Choosing where to stay means choosing a pace, a landscape and a personal way of encountering the sea.",
    sections: [
      {
        title: "Sette identità",
        titleEn: "Seven identities",
        paragraphs: [
          "Lipari è il centro più vivace e il punto di partenza più semplice. Salina offre colline verdi e una raffinata cultura agricola, mentre Vulcano e Stromboli mostrano in superficie l'energia geologica dell'arcipelago.",
          "Panarea predilige atmosfere eleganti; Alicudi e Filicudi invitano alla disconnessione. Stromboli vive alla presenza costante del vulcano, Ginostra custodisce uno degli approdi più piccoli e suggestivi.",
        ],
        paragraphsEn: [
          "Lipari is the liveliest centre and the easiest starting point. Salina offers green hills and a refined agricultural culture, while Vulcano and Stromboli reveal the archipelago’s geological energy at the surface.",
          "Panarea favours elegant atmospheres; Alicudi and Filicudi invite you to disconnect. Stromboli lives in the volcano’s constant presence, while Ginostra preserves one of the smallest and most evocative harbours.",
        ],
      },
      {
        title: "Muoversi seguendo il mare",
        titleEn: "Travelling with the sea",
        paragraphs: [
          "Aliscafi e traghetti collegano le isole, ma vento e condizioni marine restano parte del viaggio. Un programma elastico è sempre preferibile a una sequenza troppo serrata.",
          "Per una prima visita conviene scegliere una base e aggiungere poche escursioni. Cambiare isola ogni giorno sottrae tempo proprio a ciò che rende speciale l'arcipelago: la lentezza.",
        ],
        paragraphsEn: [
          "Hydrofoils and ferries connect the islands, but wind and sea conditions remain part of the journey. A flexible plan is always preferable to an overly tight schedule.",
          "For a first visit, it is best to choose one base and add only a few excursions. Changing island every day takes time away from what makes the archipelago special: its slow pace.",
        ],
      },
      {
        title: "La stagione più adatta",
        titleEn: "The best season",
        paragraphs: [
          "La tarda primavera e l'inizio dell'autunno regalano temperature miti e approdi più tranquilli. In piena estate l'energia aumenta, insieme alla necessità di prenotare con anticipo.",
        ],
        paragraphsEn: [
          "Late spring and early autumn offer mild temperatures and quieter harbours. In midsummer, the energy rises, along with the need to book well in advance.",
        ],
      },
    ],
  },
];

export function getJournalArticle(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}
