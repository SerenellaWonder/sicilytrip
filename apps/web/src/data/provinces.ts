export type ProvinceContent = {
  id: string;
  name: string;
  image: string;
  short: string;
  shortEn: string;
  pills: string[];
  pillsEn: string[];
  paragraphs: string[];
  descriptionEn: string;
};

export const provinceCatalog: ProvinceContent[] = [
  {
    id: "palermo", name: "Palermo", image: "/images/palermo.jpg",
    short: "Arte, mercati e mare, in una città dove culture diverse si incontrano da secoli.",
    shortEn: "Art, markets and sea in a city where different cultures have met for centuries.",
    pills: ["Cefalù", "Monreale", "Street food Palermo"], pillsEn: ["Cefalù", "Monreale", "Palermo street food"],
    paragraphs: [
      "Palermo è uno di quei luoghi che non si comprendono guardando una fotografia. Bisogna entrarci dentro. Camminare tra palazzi nobiliari e mercati popolari, sentire il profumo del pane appena sfornato, attraversare vicoli che improvvisamente si aprono davanti a chiese, cupole e cortili nati dall’incontro fra culture normanne, arabe e bizantine.",
      "Poi c’è tutto ciò che accade fuori dalla città. A Monreale si guarda Palermo dall’alto dopo essere entrati in una delle cattedrali più sorprendenti della Sicilia. Cefalù cambia completamente il ritmo: case raccolte sul mare, una grande rocca alle spalle e giornate da vivere a piedi. Verso l’interno, Castelbuono e i paesi delle Madonie raccontano invece una Sicilia di montagne, boschi, formaggi, piccoli ristoranti e strade panoramiche.",
      "Questa provincia è perfetta per capire una cosa fondamentale della Sicilia: qui il mare è solo l’inizio. In pochi giorni puoi passare da una capitale mediterranea a una spiaggia, da un mosaico medievale a un paese di montagna.",
    ],
    descriptionEn: "Palermo must be experienced from within: noble palaces, lively markets and streets shaped by Norman, Arab and Byzantine cultures. Beyond the city, Monreale, Cefalù and the Madonie reveal a province where sea, medieval art and mountain villages coexist within a short journey.",
  },
  {
    id: "catania", name: "Catania", image: "/images/catania.jpg",
    short: "Tra lava e mare, una città vibrante ai piedi dell’Etna.", shortEn: "Between lava and sea, a vibrant city at the foot of Mount Etna.",
    pills: ["Etna", "Vini dell’Etna", "Escursioni sul vulcano"], pillsEn: ["Mount Etna", "Etna wines", "Volcano tours"],
    paragraphs: [
      "A Catania c’è sempre qualcosa che ricorda che sotto i tuoi piedi la Sicilia è ancora viva. L’Etna domina l’orizzonte e, in qualche modo, detta il carattere di tutta la provincia: energia, contrasti, terra nera e paesaggi che cambiano continuamente.",
      "La città di Catania è elegante e irrequieta allo stesso tempo. Palazzi barocchi costruiti in pietra lavica, piazze animate, mercati affollati, caffè, ristoranti e una vita urbana che continua fino a tardi. Poi basta guidare verso nord per ritrovarsi tra vigneti e piccoli paesi sulle pendici del vulcano. Nicolosi è una delle porte dell’Etna, Randazzo sembra appartenere a un’altra Sicilia, mentre tra Acireale, Aci Castello e Aci Trezza la lava incontra direttamente il Mediterraneo.",
      "Qui puoi salire la mattina verso un paesaggio quasi lunare, pranzare in una cantina tra i vigneti e concludere la giornata davanti al mare. Catania non è semplicemente una tappa del viaggio. È una Sicilia intensa, giovane e sorprendentemente diversa da tutto ciò che la circonda.",
    ],
    descriptionEn: "Catania lives between Mount Etna and the Mediterranean. Lava-stone Baroque architecture, markets and nightlife lead to vineyards, volcanic villages and a coast where black rock meets the sea. It is an intense, youthful and constantly changing side of Sicily.",
  },
  {
    id: "messina", name: "Messina", image: "/images/taormina.jpg",
    short: "Da Taormina alle Isole Eolie, panorami straordinari tra mare, natura e borghi autentici.", shortEn: "From Taormina to the Aeolian Islands, extraordinary views, nature and authentic villages.",
    pills: ["Taormina", "Isole Eolie", "Stromboli"], pillsEn: ["Taormina", "Aeolian Islands", "Stromboli"],
    paragraphs: [
      "La provincia di Messina sembra progettata per chi non vuole scegliere tra mare, isole, montagne e piccoli borghi. Li mette semplicemente tutti nello stesso viaggio.",
      "Il cuore è Taormina. Il teatro antico guarda verso il mare con l’Etna sullo sfondo e, nonostante sia uno dei luoghi più conosciuti della Sicilia, dal vivo riesce ancora a stupire. Poco distante, l’Alcantara attraversa gole scavate nella roccia vulcanica. Procedendo verso nord si arriva a Milazzo, punto di partenza per le Isole Eolie: Lipari, Vulcano, Salina, Panarea, Stromboli, Alicudi e Filicudi. Qui la Sicilia cambia ancora e diventa un viaggio tra vulcani, barche, piccoli porti e tramonti sul mare.",
      "Ma esiste anche una Messina meno conosciuta. Nei Nebrodi, paesi come Montalbano Elicona raccontano un entroterra verde, silenzioso e lontano dall’immagine classica dell’isola. Forse è proprio questa la sua particolarità: puoi guardare Stromboli eruttare dal mare e il giorno dopo trovarti in un bosco di montagna. Senza aver mai lasciato la stessa provincia.",
    ],
    descriptionEn: "Messina brings sea, islands, mountains and villages into a single journey. Taormina, the Alcantara gorges and the Aeolian Islands are joined by the green Nebrodi mountains, creating one of Sicily’s most varied provinces.",
  },
  {
    id: "siracusa", name: "Siracusa", image: "/images/siracusa.jpg",
    short: "Storia, mare e bellezza senza tempo, nel cuore della Sicilia sud-orientale.", shortEn: "History, sea and timeless beauty in south-eastern Sicily.",
    pills: ["Ortigia", "Teatro Greco", "Noto"], pillsEn: ["Ortigia", "Greek Theatre", "Noto"],
    paragraphs: [
      "Ci sono luoghi dove la storia si osserva dietro una vetrina. A Siracusa, invece, ci cammini dentro. Il cuore è Ortigia, una piccola isola collegata alla città dove vicoli di pietra, balconi, piazze, palazzi e il Mediterraneo sembrano mescolarsi senza un vero confine. A pochi minuti si trova il grande teatro greco: improvvisamente ci si rende conto che queste strade erano vive più di duemila anni fa.",
      "Ma la provincia continua verso sud e diventa sempre più luminosa. Noto appare quasi teatrale con le sue facciate color miele; Marzamemi conserva l’atmosfera di un antico borgo di pescatori affacciato sul mare; nella riserva di Vendicari il paesaggio torna essenziale, fatto di acqua, natura e silenzio. Più all’interno, Palazzolo Acreide mostra un volto ancora diverso del territorio.",
      "Siracusa è indicata per chi cerca una Sicilia da assaporare lentamente. Non serve riempire ogni giornata di cose da fare: spesso il momento che si ricorda di più è semplicemente una passeggiata al tramonto lungo il mare di Ortigia.",
    ],
    descriptionEn: "In Syracuse, history is part of everyday life. Ortigia and the Greek Theatre lead south towards Noto, Marzamemi and Vendicari, where honey-coloured Baroque architecture, fishing villages and protected coastline invite travellers to slow down.",
  },
  {
    id: "ragusa", name: "Ragusa", image: "/images/ragusa.jpg",
    short: "Borghi barocchi, sapori autentici e il mare del sud.", shortEn: "Baroque towns, authentic flavours and the southern sea.",
    pills: ["Ragusa Ibla", "Modica", "Barocco siciliano"], pillsEn: ["Ragusa Ibla", "Modica", "Sicilian Baroque"],
    paragraphs: [
      "La provincia di Ragusa sembra quasi una Sicilia dentro la Sicilia. È più raccolta, più quieta e, proprio per questo, spesso sorprende chi arriva senza sapere bene cosa aspettarsi.",
      "Ragusa Ibla appare adagiata sulla collina come una scenografia di pietra: scale, cupole, giardini e stradine che invitano a perdersi. A Modica il paesaggio urbano segue le pareti della vallata e la tradizione del cioccolato diventa una porta d’ingresso alla gastronomia locale. Scicli, più intima, è uno di quei luoghi in cui viene spontaneo rallentare e sedersi in piazza senza guardare l’orologio.",
      "Intorno alle città cambia tutto. Le campagne sono attraversate da muretti a secco, ulivi, masserie e strade che conducono verso il mare. Marina di Ragusa, Donnalucata e Sampieri aggiungono spiagge e piccoli ritmi costieri. È una destinazione ideale per chi vuole sentire la Sicilia nella vita quotidiana: nei mercati, a tavola, nelle piazze e nelle strade di campagna.",
    ],
    descriptionEn: "Ragusa is a quieter Sicily of Baroque towns, chocolate traditions, dry-stone walls and country roads leading to the southern coast. Ragusa Ibla, Modica and Scicli reward travellers who prefer everyday life and authentic rhythms to a checklist of attractions.",
  },
  {
    id: "agrigento", name: "Agrigento", image: "/images/agrigento.jpg",
    short: "Templi millenari e paesaggi mediterranei, nel cuore della Sicilia antica.", shortEn: "Ancient temples and Mediterranean landscapes in the heart of classical Sicily.",
    pills: ["Valle dei Templi", "Scala dei Turchi", "Sciacca"], pillsEn: ["Valley of the Temples", "Scala dei Turchi", "Sciacca"],
    paragraphs: [
      "Ad Agrigento può capitare qualcosa di raro: trovarsi davanti a un tempio greco di 2.500 anni e avere la sensazione che il paesaggio intorno faccia ancora parte della stessa storia.",
      "La Valle dei Templi non è semplicemente un sito archeologico. È una lunga passeggiata tra colonne, ulivi, mandorli e il Mediterraneo, soprattutto nelle ore in cui la luce cambia colore. Poco più avanti, la costa mostra un volto completamente diverso con le pareti bianche della Scala dei Turchi.",
      "Ma questa provincia non finisce nei luoghi più fotografati. Sciacca conserva il carattere di una città marinara, fatta di ceramiche, porto e tradizioni; Sambuca di Sicilia introduce ai paesaggi rurali dell’interno; Porto Empedocle racconta invece il rapporto profondo tra questa terra e il mare. Qui archeologia, paesaggio e vita mediterranea sembrano appartenere alla stessa scena.",
    ],
    descriptionEn: "Agrigento combines the Valley of the Temples with olive trees, almond groves and Mediterranean light. Scala dei Turchi, Sciacca, Sambuca and Porto Empedocle reveal a province where archaeology, landscape and coastal life share the same scene.",
  },
  {
    id: "trapani", name: "Trapani", image: "/images/mare.jpg",
    short: "Isole, saline e tramonti indimenticabili nella Sicilia occidentale.", shortEn: "Islands, salt pans and unforgettable sunsets in western Sicily.",
    pills: ["San Vito Lo Capo", "Favignana", "Erice"], pillsEn: ["San Vito Lo Capo", "Favignana", "Erice"],
    paragraphs: [
      "Nella Sicilia occidentale la luce sembra diversa. Le giornate si allungano verso il mare, le saline diventano rosa al tramonto e all’orizzonte compaiono isole abbastanza vicine da far venire voglia di raggiungerle.",
      "Trapani è il punto da cui iniziare. Poco distante, Erice si trova invece centinaia di metri più in alto: un borgo medievale di pietra dal quale, nelle giornate limpide, lo sguardo attraversa una parte enorme della costa. Scendendo a sud arriva Marsala, terra di vino, saline e antiche rotte mediterranee. Risalendo verso nord si incontrano Castellammare del Golfo, la Riserva dello Zingaro e infine San Vito Lo Capo.",
      "E poi ci sono le Egadi. Favignana, Levanzo e Marettimo introducono un’altra dimensione del viaggio: biciclette, barche, calette e giornate scandite dal mare. Trapani è la provincia per chi ama muoversi. Ogni giorno può avere un paesaggio differente, ma quasi sempre termina guardando il sole scendere nel Mediterraneo.",
    ],
    descriptionEn: "Western Sicily is shaped by salt pans, islands and long sunsets. From Trapani and Erice to Marsala, San Vito Lo Capo and the Egadi Islands, every day offers a different landscape connected by the sea.",
  },
  {
    id: "enna", name: "Enna", image: "/images/etna1.jpg",
    short: "Panorami mozzafiato e una Sicilia autentica tutta da scoprire, nel cuore dell’isola.", shortEn: "Breathtaking views and an authentic Sicily in the heart of the island.",
    pills: ["Piazza Armerina", "Villa Romana del Casale", "Morgantina"], pillsEn: ["Piazza Armerina", "Villa Romana del Casale", "Morgantina"],
    paragraphs: [
      "Per capire davvero la Sicilia bisogna, almeno una volta, allontanarsi dal mare. La provincia di Enna si trova nel cuore dell’isola e mostra un paesaggio che molti viaggiatori stranieri non immaginano di trovare qui: grandi altipiani, laghi, campi di grano, montagne e città costruite in posizioni quasi impossibili.",
      "Enna domina il territorio dall’alto e, dal Castello di Lombardia, lo sguardo sembra non avere fine. Poco più a sud, Piazza Armerina custodisce la Villa Romana del Casale, dove migliaia di metri quadri di mosaici raccontano la vita quotidiana di oltre sedici secoli fa. Nei dintorni, Aidone e l’area archeologica di Morgantina aggiungono un altro capitolo alla storia dell’isola.",
      "Più a nord, Nicosia introduce alla Sicilia delle montagne e dei paesi dell’interno. Enna non è la destinazione siciliana più ovvia, ed è proprio questo il suo fascino: una Sicilia silenziosa, ampia e profondamente legata alla terra.",
    ],
    descriptionEn: "Enna reveals inland Sicily: plateaus, lakes, wheat fields and hilltop towns. The Castello di Lombardia, Piazza Armerina, the Villa Romana del Casale and Morgantina tell the story of a quiet landscape deeply connected to the land.",
  },
  {
    id: "caltanissetta", name: "Caltanissetta", image: "/images/about.jpg",
    short: "Paesaggi autentici, antiche miniere e borghi fuori dai percorsi più battuti.", shortEn: "Authentic landscapes, historic mines and villages away from the usual routes.",
    pills: ["Gela", "Castello di Mussomeli", "Miniere di zolfo"], pillsEn: ["Gela", "Mussomeli Castle", "Sulphur mines"],
    paragraphs: [
      "Caltanissetta è probabilmente la provincia che meglio racconta la Sicilia che molti visitatori non hanno ancora imparato a cercare. Qui non troverai una sequenza di località costruite intorno al turismo. Troverai invece colline immense, campi, paesi arroccati e strade che attraversano uno dei territori più autentici dell’isola.",
      "La città conserva un rapporto profondo con l’entroterra e con la storia delle miniere di zolfo, che per generazioni hanno segnato la vita di queste comunità. Mussomeli sorprende con il suo castello costruito sopra una rupe; Mazzarino conserva palazzi e chiese che raccontano un passato aristocratico spesso sconosciuto fuori dalla Sicilia.",
      "Poi il territorio raggiunge nuovamente il Mediterraneo a Gela, una delle città più importanti della Sicilia greca, dove l’archeologia convive con il paesaggio costiero. È una provincia per viaggiatori curiosi, quelli che vogliono lasciare le rotte più famose e incontrare la Sicilia più sincera.",
    ],
    descriptionEn: "Caltanissetta tells the story of a lesser-known Sicily through hills, fields, sulphur mines and hilltop towns. Mussomeli, Mazzarino and ancient Gela reward curious travellers willing to leave the island’s most familiar routes.",
  },
];
