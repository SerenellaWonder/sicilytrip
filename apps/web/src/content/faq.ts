export type FaqSection = {
  title: string;
  questions: Array<{ question: string; answer: string }>;
};

export const faqSections: FaqSection[] = [
  {
    title: "Ricerca e disponibilità",
    questions: [
      {
        question: "Quanto resta valida una ricerca hotel?",
        answer:
          "La disponibilità e i riferimenti della ricerca restano validi per 20 minuti. Dopo questo intervallo è necessario effettuare una nuova ricerca per ottenere prezzi e camere aggiornati.",
      },
      {
        question: "Perché il prezzo può cambiare durante la prenotazione?",
        answer:
          "Prezzi e disponibilità vengono forniti in tempo reale. Prima di raccogliere i dati degli ospiti, SicilyTrip riconferma la tariffa e mostra l'importo aggiornato e le condizioni applicabili.",
      },
      {
        question: "Posso modificare date o numero di ospiti?",
        answer:
          "Sì. Torna alla ricerca, modifica date o composizione degli ospiti e avvia una nuova verifica della disponibilità.",
      },
    ],
  },
  {
    title: "Tariffe e condizioni",
    questions: [
      {
        question: "Dove trovo le condizioni di cancellazione?",
        answer:
          "Le condizioni preliminari sono indicate insieme alla camera. Dopo la riconferma della tariffa vengono mostrati il termine di cancellazione e le eventuali penali definitive.",
      },
      {
        question: "La tassa di soggiorno è inclusa?",
        answer:
          "Quando prevista dalla destinazione, la tassa di soggiorno può essere richiesta direttamente dalla struttura. Le note definitive della tariffa indicano le condizioni comunicate dal fornitore.",
      },
      {
        question: "I bambini hanno sempre un letto separato?",
        answer:
          "Non necessariamente. La sistemazione dei bambini dipende dalla camera e dalle condizioni della struttura. È importante controllare le note della tariffa prima di continuare.",
      },
    ],
  },
  {
    title: "Prenotazione e assistenza",
    questions: [
      {
        question: "Quando una prenotazione è confermata?",
        answer:
          "Una tariffa riconfermata non equivale ancora a una prenotazione. La prenotazione è conclusa solo quando viene mostrata la conferma finale con il relativo riferimento.",
      },
      {
        question: "I dati inseriti vengono subito inviati all'hotel?",
        answer:
          "No. Durante la compilazione vengono conservati temporaneamente nella sessione del browser. Dopo la conferma, la copia salvata nel browser viene eliminata automaticamente.",
      },
      {
        question: "Dove posso ritrovare le mie prenotazioni?",
        answer:
          "Apri l'Area clienti e inserisci la stessa email usata durante la prenotazione. Riceverai un codice temporaneo per consultare i soggiorni associati.",
      },
      {
        question: "Come posso richiedere assistenza?",
        answer:
          "Puoi utilizzare il concierge presente sul sito oppure la pagina Contatti per preparare un messaggio diretto a SicilyTrip.",
      },
    ],
  },
];
