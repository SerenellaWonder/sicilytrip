export type ExperienceCatalogItem = {
  id: string;
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  titleEn: string;
  eyebrowEn: string;
  descriptionEn: string;
  image: string;
  href: string;
};

export const experienceCatalog: ExperienceCatalogItem[] = [
  {
    id: "mare", slug: "mare-yacht", number: "01", title: "Mare & Yacht",
    eyebrow: "Mediterraneo", description: "Naviga lungo la costa siciliana, raggiungi baie nascoste e isole vulcaniche con esperienze private disegnate intorno al tuo viaggio.",
    titleEn: "Sea & Yacht", eyebrowEn: "Mediterranean", descriptionEn: "Sail along the Sicilian coast to hidden bays and volcanic islands with private experiences designed around your journey.",
    image: "/images/mare.jpg", href: "/esperienze/mare-yacht",
  },
  {
    id: "foodwine", slug: "food-wine", number: "02", title: "Food & Wine",
    eyebrow: "Sapori di Sicilia", description: "Cantine sull'Etna, tavole private, produttori locali e cucina siciliana raccontata attraverso luoghi, persone e sapori autentici.",
    titleEn: "Food & Wine", eyebrowEn: "Flavours of Sicily", descriptionEn: "Etna wineries, private tables, local producers and Sicilian cuisine told through authentic places, people and flavours.",
    image: "/images/foodwine.jpg", href: "/esperienze/food-wine",
  },
  {
    id: "etna", slug: "etna-natura", number: "03", title: "Etna & Natura",
    eyebrow: "Terra viva", description: "Cammina tra crateri, colate laviche, boschi e vigneti per scoprire il lato più potente e sorprendente della Sicilia.",
    titleEn: "Etna & Nature", eyebrowEn: "Living earth", descriptionEn: "Walk among craters, lava flows, forests and vineyards to discover Sicily's most powerful and surprising side.",
    image: "/images/etna1.jpg", href: "/esperienze/etna-natura",
  },
  {
    id: "arte", slug: "arte-cultura", number: "04", title: "Arte & Cultura",
    eyebrow: "Storie millenarie", description: "Palazzi, siti archeologici, città barocche e luoghi normalmente invisibili diventano parte di un itinerario costruito su misura.",
    titleEn: "Art & Culture", eyebrowEn: "Ancient stories", descriptionEn: "Palaces, archaeological sites, Baroque towns and usually hidden places become part of a tailor-made itinerary.",
    image: "/images/arte.jpg", href: "/esperienze/arte-cultura",
  },
  {
    id: "wellness", slug: "wellness", number: "05", title: "Wellness",
    eyebrow: "Tempo per sé", description: "Spa, resort immersi nella natura e rituali di benessere per rallentare e vivere il Mediterraneo con un ritmo completamente diverso.",
    titleEn: "Wellness", eyebrowEn: "Time for yourself", descriptionEn: "Spas, resorts surrounded by nature and wellness rituals invite you to slow down and experience the Mediterranean differently.",
    image: "/images/spa.jpg", href: "/esperienze/wellness",
  },
  {
    id: "private", slug: "private", number: "06", title: "Esperienze Private",
    eyebrow: "Solo per te", description: "Cene private, accessi esclusivi e momenti creati intorno ai tuoi desideri. La Sicilia diventa un'esperienza personale.",
    titleEn: "Private Experiences", eyebrowEn: "Just for you", descriptionEn: "Private dinners, exclusive access and moments created around your wishes. Sicily becomes a personal experience.",
    image: "/images/private.jpg", href: "/esperienze/private",
  },
];
