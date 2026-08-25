export type DestinationMacroArea =
  | "Sicilia Occidentale"
  | "Sicilia Orientale"
  | "Sicilia Centro-Meridionale";

export type DestinationCatalogItem = {
  id: string;
  number: string;
  name: string;
  area: string;
  macroArea: DestinationMacroArea;
  province: string;
  description: string;
  image: string;
  href: string;
  longitude: number;
  latitude: number;
  labelPosition: "top" | "bottom" | "left" | "right";
};

export const destinationMacroAreas: DestinationMacroArea[] = [
  "Sicilia Occidentale",
  "Sicilia Orientale",
  "Sicilia Centro-Meridionale",
];

const destinations: Omit<DestinationCatalogItem, "number">[] = [
  {
    id: "palermo",
    name: "Palermo",
    area: "Città di Palermo",
    macroArea: "Sicilia Occidentale",
    province: "Palermo",
    description:
      "Mercati, palazzi, giardini e culture diverse si incontrano in una delle città più sorprendenti del Mediterraneo.",
    image: "/images/palermo.jpg",
    href: "/destinazioni/palermo",
    longitude: 13.3615,
    latitude: 38.1157,
    labelPosition: "bottom",
  },
  {
    id: "cefalu",
    name: "Cefalù",
    area: "Costa Settentrionale",
    macroArea: "Sicilia Occidentale",
    province: "Palermo",
    description:
      "Un borgo sul Tirreno tra spiagge, vicoli medievali e la grande Rocca che domina il mare.",
    image: "/images/cefalu.jpg",
    href: "/destinazioni/cefalu",
    longitude: 14.0229,
    latitude: 38.0386,
    labelPosition: "bottom",
  },
  {
    id: "trapani",
    name: "Trapani",
    area: "Costa Occidentale",
    macroArea: "Sicilia Occidentale",
    province: "Trapani",
    description:
      "Saline, mare e un centro storico proteso verso le Egadi raccontano la porta occidentale della Sicilia.",
    image: "/images/mare.jpg",
    href: "/destinazioni/trapani",
    longitude: 12.5365,
    latitude: 38.0176,
    labelPosition: "left",
  },
  {
    id: "erice",
    name: "Erice",
    area: "Agro Ericino",
    macroArea: "Sicilia Occidentale",
    province: "Trapani",
    description:
      "Un borgo medievale sospeso sul monte, tra castelli, vicoli di pietra e panorami sulle isole.",
    image: "/images/arte.jpg",
    href: "/destinazioni/erice",
    longitude: 12.587,
    latitude: 38.037,
    labelPosition: "top",
  },
  {
    id: "marsala",
    name: "Marsala",
    area: "Terre del Vino",
    macroArea: "Sicilia Occidentale",
    province: "Trapani",
    description:
      "Cantine storiche, saline e tramonti sulla laguna dello Stagnone nel cuore della costa occidentale.",
    image: "/images/wine.jpg",
    href: "/destinazioni/marsala",
    longitude: 12.437,
    latitude: 37.798,
    labelPosition: "left",
  },
  {
    id: "mazara-del-vallo",
    name: "Mazara del Vallo",
    area: "Val di Mazara",
    macroArea: "Sicilia Occidentale",
    province: "Trapani",
    description:
      "La Kasbah, il porto e le tradizioni mediterranee disegnano una città aperta all’incontro tra culture.",
    image: "/images/foodwine.jpg",
    href: "/destinazioni/mazara-del-vallo",
    longitude: 12.588,
    latitude: 37.65,
    labelPosition: "bottom",
  },
  {
    id: "isole-egadi",
    name: "Isole Egadi",
    area: "Arcipelago delle Egadi",
    macroArea: "Sicilia Occidentale",
    province: "Trapani",
    description:
      "Favignana, Levanzo e Marettimo formano un’unica meta tra acque limpide, tonnare e natura protetta.",
    image: "/images/yacht.jpg",
    href: "/destinazioni/isole-egadi",
    longitude: 12.12,
    latitude: 37.97,
    labelPosition: "left",
  },
  {
    id: "san-vito-lo-capo",
    name: "San Vito Lo Capo",
    area: "Golfo di Castellammare",
    macroArea: "Sicilia Occidentale",
    province: "Trapani",
    description:
      "Una grande spiaggia chiara tra Monte Monaco e la riserva dello Zingaro.",
    image: "/images/mare.jpg",
    href: "/destinazioni/san-vito-lo-capo",
    longitude: 12.735,
    latitude: 38.175,
    labelPosition: "top",
  },
  {
    id: "scopello",
    name: "Scopello",
    area: "Golfo di Castellammare",
    macroArea: "Sicilia Occidentale",
    province: "Trapani",
    description:
      "Faraglioni, tonnara e accessi alla riserva dello Zingaro in uno degli angoli più scenografici dell’isola.",
    image: "/images/cefalu.jpg",
    href: "/destinazioni/scopello",
    longitude: 12.817,
    latitude: 38.07,
    labelPosition: "right",
  },
  {
    id: "isole-eolie",
    name: "Isole Eolie",
    area: "Arcipelago Eoliano",
    macroArea: "Sicilia Orientale",
    province: "Messina",
    description:
      "Sette isole vulcaniche da vivere seguendo il mare, tra baie remote, barche e tramonti.",
    image: "/images/yacht.jpg",
    href: "/destinazioni/isole-eolie",
    longitude: 14.956,
    latitude: 38.467,
    labelPosition: "top",
  },
  {
    id: "taormina",
    name: "Taormina",
    area: "Costa Ionica",
    macroArea: "Sicilia Orientale",
    province: "Messina",
    description:
      "Il Teatro Antico, terrazze sul Mediterraneo e l’Etna all’orizzonte in uno dei luoghi più iconici della Sicilia.",
    image: "/images/taormina.jpg",
    href: "/destinazioni/taormina",
    longitude: 15.2866,
    latitude: 37.8516,
    labelPosition: "right",
  },
  {
    id: "catania",
    name: "Catania",
    area: "Costa Ionica",
    macroArea: "Sicilia Orientale",
    province: "Catania",
    description:
      "Pietra lavica, architettura barocca, mercati e vita mediterranea ai piedi dell’Etna.",
    image: "/images/catania.jpg",
    href: "/destinazioni/catania",
    longitude: 15.0873,
    latitude: 37.5027,
    labelPosition: "right",
  },
  {
    id: "etna",
    name: "Etna",
    area: "Terre dell’Etna",
    macroArea: "Sicilia Orientale",
    province: "Catania",
    description:
      "Crateri, boschi e vigneti cresciuti sulla lava raccontano il paesaggio più potente dell’isola.",
    image: "/images/etna.jpg",
    href: "/destinazioni/etna",
    longitude: 14.999,
    latitude: 37.751,
    labelPosition: "left",
  },
  {
    id: "siracusa",
    name: "Siracusa e Ortigia",
    area: "Costa Sud-Orientale",
    macroArea: "Sicilia Orientale",
    province: "Siracusa",
    description:
      "Ortigia, pietra chiara e millenni di storia affacciati sulle acque del Mediterraneo.",
    image: "/images/siracusa.jpg",
    href: "/destinazioni/siracusa",
    longitude: 15.2933,
    latitude: 37.0755,
    labelPosition: "right",
  },
  {
    id: "noto",
    name: "Noto",
    area: "Val di Noto",
    macroArea: "Sicilia Orientale",
    province: "Siracusa",
    description:
      "Città barocca della provincia di Siracusa, celebre per i palazzi in pietra dorata del Val di Noto.",
    image: "/images/noto.jpg",
    href: "/destinazioni/noto",
    longitude: 15.0698,
    latitude: 36.8919,
    labelPosition: "bottom",
  },
  {
    id: "ragusa",
    name: "Ragusa",
    area: "Monti Iblei",
    macroArea: "Sicilia Orientale",
    province: "Ragusa",
    description:
      "Cupole, scalinate e palazzi disegnano Ragusa Ibla nel cuore della Sicilia barocca.",
    image: "/images/ragusa.jpg",
    href: "/destinazioni/ragusa",
    longitude: 14.7307,
    latitude: 36.9269,
    labelPosition: "bottom",
  },
  {
    id: "agrigento",
    name: "Agrigento",
    area: "Costa Meridionale",
    macroArea: "Sicilia Centro-Meridionale",
    province: "Agrigento",
    description:
      "Templi greci, colline e Mediterraneo raccontano uno dei paesaggi culturali più straordinari dell’isola.",
    image: "/images/agrigento.jpg",
    href: "/destinazioni/agrigento",
    longitude: 13.5765,
    latitude: 37.3111,
    labelPosition: "bottom",
  },
];

export const destinationCatalog: DestinationCatalogItem[] = destinations.map(
  (destination, index) => ({
    ...destination,
    number: String(index + 1).padStart(2, "0"),
  })
);
