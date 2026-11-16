import { destinationCatalog } from "@/data/destinations";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function createConciergeResponse(
  conversation: string,
  latestMessage: string,
  isEnglish: boolean,
) {
  const latest = normalize(latestMessage);
  const history = normalize(conversation);
  const matches = (text: string) =>
    destinationCatalog.filter((item) => {
      const names = [normalize(item.name), item.id.replaceAll("-", " ")];
      if (item.id === "siracusa") names.push("ortigia");
      return names.some((name) => new RegExp(`\\b${name}\\b`).test(text));
    });
  const destination = matches(latest)[0] ?? matches(history)[0];
  const params = new URLSearchParams();
  if (destination) params.set("destinazione", destination.id);
  // Only explicit adults are prefilled; families confirm their room composition.
  const adults = [...history.matchAll(/\b(\d+)\s*(?:adulti|adults)\b/g)].at(
    -1,
  )?.[1];
  if (adults && Number(adults) >= 1 && Number(adults) <= 6)
    params.set("adulti", adults);
  const dates =
    latest.match(/\b20\d{2}-\d{2}-\d{2}\b/g) ??
    history.match(/\b20\d{2}-\d{2}-\d{2}\b/g);
  if (
    dates?.length === 2 &&
    dates[0] < dates[1] &&
    dates.every((date) => {
      const parsed = new Date(date);
      return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === date
      );
    })
  ) {
    params.set("arrivo", dates[0]);
    params.set("partenza", dates[1]);
  }
  const packages =
    /pacchett|package|volo|flight|tour|itinerari|su misura|tailor/.test(latest);
  const experiences = /esperienz|experience|escursion|excursion/.test(latest);
  const href = `/hotel/cerca${params.size ? `?${params}` : ""}`;
  const text = packages
    ? isEnglish
      ? "Complete packages are not available for online booking yet. You can check live hotel rates or contact us for a tailor-made trip. A hotel search does not include flights, transfers or activities."
      : "I pacchetti completi non sono ancora disponibili per la prenotazione online. Puoi verificare le tariffe hotel reali oppure richiederci un viaggio su misura. La ricerca hotel non comprende voli, trasferimenti o attività."
    : experiences
      ? isEnglish
        ? "Explore our experiences and contact us to confirm availability and prices. You can also search for accommodation separately."
        : "Esplora le nostre esperienze e contattaci per confermare disponibilità e prezzi. Puoi anche cercare separatamente il soggiorno."
      : isEnglish
        ? `Search live hotel availability${destination ? ` in ${destination.name}` : ""}. Confirm destination, exact dates and adults/children per room in the form. Prices are shown after the search; seaside or pool facilities must be checked in the hotel details.`
        : `Cerca disponibilità hotel reali${destination ? ` a ${destination.name}` : ""}. Conferma nel modulo destinazione, date esatte e adulti/bambini per camera. I prezzi compaiono dopo la ricerca; vicinanza al mare e piscina vanno verificate nella scheda della struttura.`;
  return {
    text,
    actions: [
      {
        label: isEnglish
          ? "Check hotel availability"
          : "Verifica disponibilità hotel",
        href,
      },
      ...(packages
        ? [
            {
              label: isEnglish
                ? "Request a tailor-made trip"
                : "Richiedi un viaggio su misura",
              href: "/contatti",
            },
          ]
        : []),
      ...(experiences
        ? [
            {
              label: isEnglish ? "Explore experiences" : "Esplora esperienze",
              href: "/esperienze",
            },
          ]
        : []),
    ],
  };
}
