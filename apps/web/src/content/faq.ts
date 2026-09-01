export type FaqSection = {
  title: string;
  titleEn: string;
  questions: Array<{
    question: string;
    answer: string;
    questionEn: string;
    answerEn: string;
  }>;
};

export const faqSections: FaqSection[] = [
  {
    title: "Ricerca e disponibilità",
    titleEn: "Search and availability",
    questions: [
      {
        question: "Quanto resta valida una ricerca hotel?",
        answer:
          "La disponibilità e i riferimenti della ricerca restano validi per 20 minuti. Dopo questo intervallo è necessario effettuare una nuova ricerca per ottenere prezzi e camere aggiornati.",
        questionEn: "How long does a hotel search remain valid?",
        answerEn:
          "Availability and search references remain valid for 20 minutes. After that, you need to start a new search to receive updated prices and rooms.",
      },
      {
        question: "Perché il prezzo può cambiare durante la prenotazione?",
        answer:
          "Prezzi e disponibilità vengono forniti in tempo reale. Prima di raccogliere i dati degli ospiti, SicilyTrip riconferma la tariffa e mostra l'importo aggiornato e le condizioni applicabili.",
        questionEn: "Why can the price change during booking?",
        answerEn:
          "Prices and availability are provided in real time. Before collecting guest details, SicilyTrip reconfirms the rate and displays the updated amount and applicable conditions.",
      },
      {
        question: "Posso modificare date o numero di ospiti?",
        answer:
          "Sì. Torna alla ricerca, modifica date o composizione degli ospiti e avvia una nuova verifica della disponibilità.",
        questionEn: "Can I change the dates or number of guests?",
        answerEn:
          "Yes. Return to the search, change the dates or guest arrangement and start a new availability check.",
      },
    ],
  },
  {
    title: "Tariffe e condizioni",
    titleEn: "Rates and conditions",
    questions: [
      {
        question: "Dove trovo le condizioni di cancellazione?",
        answer:
          "Le condizioni preliminari sono indicate insieme alla camera. Dopo la riconferma della tariffa vengono mostrati il termine di cancellazione e le eventuali penali definitive.",
        questionEn: "Where can I find the cancellation conditions?",
        answerEn:
          "Preliminary conditions are shown with the room. Once the rate is reconfirmed, the cancellation deadline and any final penalties are displayed.",
      },
      {
        question: "La tassa di soggiorno è inclusa?",
        answer:
          "Quando prevista dalla destinazione, la tassa di soggiorno può essere richiesta direttamente dalla struttura. Le note definitive della tariffa indicano le condizioni comunicate dal fornitore.",
        questionEn: "Is the city tax included?",
        answerEn:
          "Where applicable, the city tax may be charged directly by the property. The final rate notes show the conditions provided by the supplier.",
      },
      {
        question: "I bambini hanno sempre un letto separato?",
        answer:
          "Non necessariamente. La sistemazione dei bambini dipende dalla camera e dalle condizioni della struttura. È importante controllare le note della tariffa prima di continuare.",
        questionEn: "Do children always have a separate bed?",
        answerEn:
          "Not necessarily. Children’s accommodation depends on the room and property conditions. Check the rate notes carefully before continuing.",
      },
    ],
  },
  {
    title: "Prenotazione e assistenza",
    titleEn: "Booking and support",
    questions: [
      {
        question: "Quando una prenotazione è confermata?",
        answer:
          "Una tariffa riconfermata non equivale ancora a una prenotazione. La prenotazione è conclusa solo quando viene mostrata la conferma finale con il relativo riferimento.",
        questionEn: "When is a booking confirmed?",
        answerEn:
          "A reconfirmed rate is not yet a booking. The booking is complete only when the final confirmation and its reference are displayed.",
      },
      {
        question: "I dati inseriti vengono subito inviati all'hotel?",
        answer:
          "No. Durante la compilazione vengono conservati temporaneamente nella sessione del browser. Dopo la conferma, la copia salvata nel browser viene eliminata automaticamente.",
        questionEn: "Are the details I enter sent to the hotel immediately?",
        answerEn:
          "No. While you complete the form, they are stored temporarily in the browser session. After confirmation, the copy saved in the browser is deleted automatically.",
      },
      {
        question: "Dove posso ritrovare le mie prenotazioni?",
        answer:
          "Apri l'Area clienti e inserisci la stessa email usata durante la prenotazione. Riceverai un codice temporaneo per consultare i soggiorni associati.",
        questionEn: "Where can I find my bookings?",
        answerEn:
          "Open the Customer Area and enter the same email used for the booking. You will receive a temporary code to view the associated stays.",
      },
      {
        question: "Come posso richiedere assistenza?",
        answer:
          "Puoi utilizzare il concierge presente sul sito oppure la pagina Contatti per preparare un messaggio diretto a SicilyTrip.",
        questionEn: "How can I request assistance?",
        answerEn:
          "You can use the concierge on the website or the Contact page to prepare a direct message to SicilyTrip.",
      },
    ],
  },
];
