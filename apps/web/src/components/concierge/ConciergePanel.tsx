"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  IconArrowUp,
  IconBuilding,
  IconChevronRight,
  IconGift,
  IconMapPin,
  IconRefresh,
  IconSparkles,
  IconToolsKitchen2,
  IconX,
} from "@tabler/icons-react";

import { useConcierge } from "./ConciergeProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

/* ============================================================
   TYPES
============================================================ */

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

type QuickAction = {
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ComponentType<{
    size?: number;
    stroke?: number;
    className?: string;
  }>;
  prompt: string;
  promptEn: string;
};

/* ============================================================
   QUICK ACTIONS
============================================================ */

const actions: QuickAction[] = [
  {
    label: "Trova un hotel",
    labelEn: "Find a hotel",
    description: "Scopri strutture selezionate",
    descriptionEn: "Discover selected properties",
    icon: IconBuilding,
    prompt: "Aiutami a trovare un hotel",
    promptEn: "Help me find a hotel",
  },
  {
    label: "Crea il mio viaggio",
    labelEn: "Create my journey",
    description: "Costruiamo il soggiorno insieme",
    descriptionEn: "Let’s plan your stay together",
    icon: IconSparkles,
    prompt: "Vorrei creare il mio viaggio in Sicilia",
    promptEn: "I would like to create my journey in Sicily",
  },
  {
    label: "Esperienze",
    labelEn: "Experiences",
    description: "Mare, vino, cucina e territorio",
    descriptionEn: "Sea, wine, food and local culture",
    icon: IconToolsKitchen2,
    prompt: "Mostrami le esperienze disponibili",
    promptEn: "Show me the available experiences",
  },
  {
    label: "Offerte e pacchetti",
    labelEn: "Offers and packages",
    description: "Scopri le proposte SicilyTrip",
    descriptionEn: "Discover SicilyTrip proposals",
    icon: IconGift,
    prompt: "Quali offerte e pacchetti sono disponibili?",
    promptEn: "Which offers and packages are available?",
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function ConciergePanel() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const {
    isOpen,
    initialQuery,
    closeConcierge,
  } = useConcierge();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const initialQueryHandled = useRef("");

  /* ============================================================
     QUERY PROVENIENTE DALLA HERO
  ============================================================ */

  useEffect(() => {
    if (!isOpen || !initialQuery) return;

    /*
      Evita che la stessa query venga inviata più volte
      durante i render.
    */

    if (initialQueryHandled.current === initialQuery) {
      return;
    }

    initialQueryHandled.current = initialQuery;

    const timer = window.setTimeout(() => {
      sendMessage(initialQuery);
    }, 250);

    return () => window.clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialQuery]);

  /* ============================================================
     AUTO SCROLL
  ============================================================ */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);

    return () => window.clearTimeout(timer);
  }, [messages, isTyping]);

  /* ============================================================
     SEND MESSAGE
  ============================================================ */

  function sendMessage(text: string) {
    const cleanText = text.trim();

    if (!cleanText || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: cleanText,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setMessage("");
    setIsTyping(true);

    /*
      DEMO:
      simuliamo il tempo di risposta del Concierge.

      In futuro qui chiameremo il backend/API AI.
    */

    window.setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: createDemoResponse(cleanText, isEnglish),
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setIsTyping(false);
    }, 1100);
  }

  /* ============================================================
     SUBMIT
  ============================================================ */

  function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    sendMessage(message);
  }

  /* ============================================================
     RESET
  ============================================================ */

  function resetConversation() {
    setMessages([]);
    setMessage("");
    setIsTyping(false);
    initialQueryHandled.current = "";
  }

  /* ============================================================
     QUICK ACTION
  ============================================================ */

  function selectAction(prompt: string) {
    sendMessage(prompt);
  }

  if (!isOpen) return null;

  const hasConversation = messages.length > 0;

  return (
    <>
      {/* ======================================================
          BACKDROP MOBILE
      ====================================================== */}

      <button
        type="button"
        aria-label={isEnglish ? "Close Concierge" : "Chiudi Concierge"}
        onClick={closeConcierge}
        className="
          fixed
          inset-0
          z-[89]
          bg-[#07182D]/40
          backdrop-blur-[3px]
          sm:hidden
        "
      />

      {/* ======================================================
          PANEL
      ====================================================== */}

      <aside
        className="
          fixed
          inset-x-3
          bottom-3
          z-[90]
          flex
          max-h-[calc(100dvh-24px)]
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          border-white/60
          bg-[#FAFAF8]
          shadow-[0_30px_100px_rgba(7,24,45,0.32)]

          sm:inset-x-auto
          sm:bottom-7
          sm:right-7
          sm:h-[720px]
          sm:max-h-[calc(100vh-56px)]
          sm:w-[440px]
          sm:rounded-[32px]
        "
      >

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
            relative
            shrink-0
            overflow-hidden
            bg-[#07182D]
            px-5
            pb-5
            pt-5
            text-white
            sm:px-6
            sm:pb-6
            sm:pt-6
          "
        >

          {/* decorative glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-56
              w-56
              rounded-full
              bg-[#F58220]/15
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              items-start
              justify-between
              gap-4
            "
          >

            {/* BRAND */}

            <div className="flex items-center gap-3">

              <div
                className="
                  relative
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F58220]
                  text-white
                  shadow-[0_8px_25px_rgba(245,130,32,0.28)]
                "
              >
                <IconSparkles
                  size={22}
                  stroke={1.8}
                />

                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-[#07182D]
                    bg-emerald-400
                  "
                />
              </div>

              <div>

                <div
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#F58220]
                  "
                >
                  SicilyTrip
                </div>

                <div
                  className="
                    mt-0.5
                    text-lg
                    font-semibold
                  "
                >
                  Concierge
                </div>

                <div
                  className="
                    mt-0.5
                    text-[11px]
                    text-white/45
                  "
                >
                  {isEnglish ? "Your travel assistant" : "Il tuo assistente di viaggio"}
                </div>

              </div>

            </div>

            {/* HEADER BUTTONS */}

            <div className="flex items-center gap-2">

              {hasConversation && (
                <button
                  type="button"
                  onClick={resetConversation}
                  aria-label={isEnglish ? "New conversation" : "Nuova conversazione"}
                  title={isEnglish ? "New conversation" : "Nuova conversazione"}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.06]
                    text-white/60
                    transition-all
                    duration-300
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <IconRefresh
                    size={18}
                    stroke={1.7}
                  />
                </button>
              )}

              <button
                type="button"
                onClick={closeConcierge}
                aria-label={isEnglish ? "Close Concierge" : "Chiudi Concierge"}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.06]
                  text-white/70
                  transition-all
                  duration-300
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <IconX
                  size={19}
                  stroke={1.8}
                />
              </button>

            </div>

          </div>

          {/* HEADER INTRO */}

          {!hasConversation && (
            <div className="relative mt-6">

              <h2
                className="
                  text-[25px]
                  font-semibold
                  leading-[1.2]
                  tracking-[-0.025em]
                "
              >
                {isEnglish ? "How can I help you" : "Come posso aiutarti"}
                <br />
                {isEnglish ? "experience Sicily?" : "a vivere la Sicilia?"}
              </h2>

              <p
                className="
                  mt-3
                  max-w-[350px]
                  text-sm
                  leading-6
                  text-white/55
                "
              >
                {isEnglish
                  ? "Tell me about the journey you imagine. I can help with hotels, experiences, offers, packages and itineraries."
                  : "Raccontami il viaggio che immagini. Posso aiutarti con hotel, esperienze, offerte, pacchetti e itinerari."}
              </p>

            </div>
          )}

        </div>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div
          ref={scrollRef}
          className="
            flex-1
            overflow-y-auto
            overscroll-contain
            px-5
            py-5
            sm:px-6
          "
        >

          {/* ==================================================
              WELCOME STATE
          ================================================== */}

          {!hasConversation && !isTyping && (
            <div>

              <div
                className="
                  mb-4
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#0D2340]/40
                "
              >
                {isEnglish ? "Where would you like to start?" : "Da dove vuoi iniziare?"}
              </div>

              <div className="grid gap-2.5">

                {actions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() =>
                        selectAction(isEnglish ? action.promptEn : action.prompt)
                      }
                      className="
                        group
                        flex
                        items-center
                        gap-4
                        rounded-[20px]
                        border
                        border-[#0D2340]/[0.07]
                        bg-white
                        p-4
                        text-left
                        shadow-[0_6px_20px_rgba(13,35,64,0.035)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-[#F58220]/30
                        hover:shadow-[0_10px_30px_rgba(13,35,64,0.08)]
                      "
                    >

                      <span
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          bg-[#F58220]/10
                          text-[#F58220]
                        "
                      >
                        <Icon
                          size={20}
                          stroke={1.7}
                        />
                      </span>

                      <span className="min-w-0 flex-1">

                        <span
                          className="
                            block
                            text-sm
                            font-semibold
                            text-[#0D2340]
                          "
                        >
                          {isEnglish ? action.labelEn : action.label}
                        </span>

                        <span
                          className="
                            mt-0.5
                            block
                            text-xs
                            leading-5
                            text-slate-500
                          "
                        >
                          {isEnglish ? action.descriptionEn : action.description}
                        </span>

                      </span>

                      <IconChevronRight
                        size={18}
                        stroke={1.6}
                        className="
                          shrink-0
                          text-[#0D2340]/25
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          group-hover:text-[#F58220]
                        "
                      />

                    </button>
                  );
                })}

              </div>

              {/* EXAMPLE */}

              <button
                type="button"
                onClick={() =>
                  selectAction(
                    isEnglish
                      ? "4 nights in Taormina in September for 2 people, a seaside hotel and a wine experience"
                      : "4 notti a Taormina a settembre per 2 persone, hotel sul mare e una wine experience"
                  )
                }
                className="
                  group
                  mt-5
                  w-full
                  rounded-[20px]
                  bg-[#0D2340]/[0.045]
                  p-4
                  text-left
                  transition-colors
                  duration-300
                  hover:bg-[#0D2340]/[0.07]
                "
              >
                <div className="flex gap-3">

                  <IconMapPin
                    size={19}
                    stroke={1.7}
                    className="
                      mt-0.5
                      shrink-0
                      text-[#F58220]
                    "
                  />

                  <div>

                    <div
                      className="
                        text-xs
                        font-semibold
                        text-[#0D2340]
                      "
                    >
                      {isEnglish ? "Try asking me" : "Prova a chiedermi"}
                    </div>

                    <p
                      className="
                        mt-1.5
                        text-xs
                        leading-5
                        text-slate-500
                        transition-colors
                        group-hover:text-slate-600
                      "
                    >
                      {isEnglish
                        ? "“4 nights in Taormina in September for 2 people, a seaside hotel and a wine experience.”"
                        : "“4 notti a Taormina a settembre per 2 persone, hotel sul mare e una wine experience.”"}
                    </p>

                  </div>

                </div>
              </button>

            </div>
          )}

          {/* ==================================================
              CONVERSATION
          ================================================== */}

          {hasConversation && (
            <div className="space-y-5">

              {messages.map((item) => (
                <ChatMessage
                  key={item.id}
                  message={item}
                />
              ))}

            </div>
          )}

          {/* ==================================================
              TYPING INDICATOR
          ================================================== */}

          {isTyping && (
            <div className="mt-5 flex items-end gap-2.5">

              <AssistantAvatar />

              <div
                className="
                  rounded-[18px]
                  rounded-bl-[6px]
                  border
                  border-[#0D2340]/[0.06]
                  bg-white
                  px-4
                  py-3.5
                  shadow-[0_5px_20px_rgba(13,35,64,0.05)]
                "
              >
                <div className="flex items-center gap-1.5">

                  <TypingDot delay="0ms" />
                  <TypingDot delay="150ms" />
                  <TypingDot delay="300ms" />

                </div>
              </div>

            </div>
          )}

          {/* ==================================================
              FOLLOW UP ACTIONS
          ================================================== */}

          {hasConversation && !isTyping && (
            <div className="mt-5">

              <div
                className="
                  mb-2.5
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#0D2340]/30
                "
              >
                {isEnglish ? "Continue with" : "Continua con"}
              </div>

              <div className="flex flex-wrap gap-2">

                <FollowUpButton
                  onClick={() =>
                    sendMessage(
                      isEnglish
                        ? "Show me the available hotels"
                        : "Mostrami gli hotel disponibili"
                    )
                  }
                >
                  Hotel
                </FollowUpButton>

                <FollowUpButton
                  onClick={() =>
                    sendMessage(
                      isEnglish
                        ? "Add some experiences"
                        : "Aggiungi delle esperienze"
                    )
                  }
                >
                  {isEnglish ? "Experiences" : "Esperienze"}
                </FollowUpButton>

                <FollowUpButton
                  onClick={() =>
                    sendMessage(
                      isEnglish
                        ? "Create a complete package for me"
                        : "Creami un pacchetto completo"
                    )
                  }
                >
                  {isEnglish ? "Complete package" : "Pacchetto completo"}
                </FollowUpButton>

              </div>

            </div>
          )}

        </div>

        {/* ====================================================
            INPUT
        ==================================================== */}

        <div
          className="
            shrink-0
            border-t
            border-[#0D2340]/[0.07]
            bg-white
            p-4
            sm:p-5
          "
        >

          <form
            onSubmit={handleSubmit}
            className="
              flex
              items-end
              gap-2
              rounded-[22px]
              border
              border-[#0D2340]/10
              bg-[#F7F7F4]
              p-2
              transition-all
              duration-300
              focus-within:border-[#F58220]/40
              focus-within:bg-white
              focus-within:shadow-[0_5px_20px_rgba(13,35,64,0.05)]
            "
          >

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();

                  if (message.trim()) {
                    sendMessage(message);
                  }
                }
              }}
              rows={1}
              placeholder={
                isTyping
                  ? isEnglish
                    ? "The Concierge is replying..."
                    : "Il Concierge sta rispondendo..."
                  : isEnglish
                    ? "Write to the Concierge..."
                    : "Scrivi al Concierge..."
              }
              disabled={isTyping}
              aria-label={
                isEnglish
                  ? "Message for SicilyTrip Concierge"
                  : "Messaggio per SicilyTrip Concierge"
              }
              className="
                max-h-28
                min-h-[44px]
                flex-1
                resize-none
                bg-transparent
                px-3
                py-3
                text-sm
                leading-5
                text-[#0D2340]
                outline-none
                placeholder:text-slate-400
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            <button
              type="submit"
              disabled={
                !message.trim() ||
                isTyping
              }
              aria-label={isEnglish ? "Send message" : "Invia messaggio"}
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F58220]
                text-white
                shadow-[0_7px_20px_rgba(245,130,32,0.25)]
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#FF9238]
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:hover:scale-100
              "
            >
              <IconArrowUp
                size={19}
                stroke={1.9}
              />
            </button>

          </form>

          <div
            className="
              mt-2.5
              flex
              items-center
              justify-center
              gap-1.5
              text-[9px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-[#0D2340]/30
            "
          >
            <IconSparkles
              size={11}
              className="text-[#F58220]"
            />

            SicilyTrip Concierge
          </div>

        </div>

      </aside>
    </>
  );
}

/* ============================================================
   CHAT MESSAGE
============================================================ */

function ChatMessage({
  message,
}: {
  message: Message;
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">

        <div
          className="
            max-w-[84%]
            rounded-[20px]
            rounded-br-[6px]
            bg-[#0D2340]
            px-4
            py-3
            text-sm
            leading-6
            text-white
            shadow-[0_6px_20px_rgba(13,35,64,0.12)]
          "
        >
          {message.text}
        </div>

      </div>
    );
  }

  return (
    <div className="flex items-end gap-2.5">

      <AssistantAvatar />

      <div
        className="
          max-w-[84%]
          rounded-[20px]
          rounded-bl-[6px]
          border
          border-[#0D2340]/[0.06]
          bg-white
          px-4
          py-3
          text-sm
          leading-6
          text-[#0D2340]
          shadow-[0_6px_20px_rgba(13,35,64,0.05)]
        "
      >
        {message.text}
      </div>

    </div>
  );
}

/* ============================================================
   ASSISTANT AVATAR
============================================================ */

function AssistantAvatar() {
  return (
    <div
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[#F58220]
        text-white
        shadow-[0_5px_15px_rgba(245,130,32,0.22)]
      "
    >
      <IconSparkles
        size={15}
        stroke={1.8}
      />
    </div>
  );
}

/* ============================================================
   TYPING DOT
============================================================ */

function TypingDot({
  delay,
}: {
  delay: string;
}) {
  return (
    <span
      className="
        h-1.5
        w-1.5
        animate-bounce
        rounded-full
        bg-[#0D2340]/35
      "
      style={{
        animationDelay: delay,
      }}
    />
  );
}

/* ============================================================
   FOLLOW UP BUTTON
============================================================ */

function FollowUpButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        rounded-full
        border
        border-[#0D2340]/10
        bg-white
        px-3.5
        py-2
        text-[11px]
        font-semibold
        text-[#0D2340]/70
        transition-all
        duration-300
        hover:border-[#F58220]/35
        hover:bg-[#F58220]/5
        hover:text-[#0D2340]
      "
    >
      {children}
    </button>
  );
}

/* ============================================================
   DEMO RESPONSE ENGINE

   Per ora serve esclusivamente alla demo.
   Successivamente verrà sostituito dal backend AI/API.
============================================================ */

function createDemoResponse(
  query: string,
  isEnglish: boolean,
): string {
  const text = query.toLowerCase();

  /* HOTEL */

  if (
    text.includes("hotel") ||
    text.includes("albergo") ||
    text.includes("struttura")
  ) {
    if (isEnglish) {
      return "Certainly. I can search for the properties that best suit your needs. Tell me your destination, dates, number of guests and, if you wish, the kind of stay you prefer: seaside, historic centre, resort, boutique hotel or exclusive residence.";
    }
    return (
      "Certamente. Posso cercare le strutture più adatte alle tue esigenze. " +
      "Indicami destinazione, date, numero di ospiti e, se vuoi, il tipo di soggiorno che preferisci: mare, centro storico, resort, boutique hotel o dimora esclusiva."
    );
  }

  /* TAORMINA */

  if (text.includes("taormina")) {
    if (isEnglish) {
      return "Excellent choice. Taormina is perfect for a stay combining the sea, culture and unique views. I can select hotels for your dates and add experiences such as boat trips, Mount Etna, tastings or a special dinner.";
    }
    return (
      "Ottima scelta. Taormina è perfetta per un soggiorno tra mare, cultura e panorami unici. " +
      "Posso selezionare hotel adatti alle tue date e aggiungere esperienze come escursioni in barca, Etna, degustazioni o una cena speciale."
    );
  }

  /* ETNA */

  if (text.includes("etna")) {
    if (isEnglish) {
      return "I can arrange a stay dedicated to Mount Etna, combining selected properties, private excursions, wineries and tastings. Tell me how many days you have and I can build a complete proposal.";
    }
    return (
      "Posso organizzare un soggiorno dedicato all’Etna combinando strutture selezionate, escursioni private, cantine e degustazioni. " +
      "Se mi indichi quanti giorni hai a disposizione, posso costruire una proposta completa."
    );
  }

  /* PALERMO */

  if (text.includes("palermo")) {
    if (isEnglish) {
      return "Palermo offers an extraordinary combination of art, markets, food and sea. I can help you choose where to stay and create an itinerary with food experiences, private visits and a day on the coast.";
    }
    return (
      "Palermo offre una combinazione straordinaria di arte, mercati, cucina e mare. " +
      "Posso aiutarti a scegliere dove soggiornare e creare un itinerario con esperienze gastronomiche, visite private e una giornata sulla costa."
    );
  }

  /* SIRACUSA */

  if (
    text.includes("siracusa") ||
    text.includes("ortigia")
  ) {
    if (isEnglish) {
      return "Syracuse and Ortigia are ideal for a journey through history, the sea and Sicilian cuisine. I can search for a property in the historic centre or by the sea and pair it with selected experiences.";
    }
    return (
      "Siracusa e Ortigia sono ideali per un viaggio tra storia, mare e cucina siciliana. " +
      "Posso cercare una struttura nel centro storico oppure sul mare e abbinarla a esperienze selezionate."
    );
  }

  /* EXPERIENCE */

  if (
    text.includes("esperienz") ||
    text.includes("wine") ||
    text.includes("vino") ||
    text.includes("barca") ||
    text.includes("cooking")
  ) {
    if (isEnglish) {
      return "Of course. We can enrich your stay with selected experiences: private yachts and boats, wine experiences, cooking classes, Mount Etna excursions and cultural itineraries. Tell me where you will be staying and I will suggest the most suitable options.";
    }
    return (
      "Certo. Possiamo arricchire il soggiorno con esperienze selezionate: yacht e barca privata, wine experience, cooking class, escursioni sull’Etna e itinerari culturali. " +
      "Dimmi dove soggiornerai e ti proporrò quelle più adatte."
    );
  }

  /* PACKAGE */

  if (
    text.includes("pacchetto") ||
    text.includes("viaggio") ||
    text.includes("itinerario")
  ) {
    if (isEnglish) {
      return "Perfect. I can build the journey with you by combining accommodation, destinations and experiences. To begin, tell me how many days you would like to spend in Sicily, when you plan to travel and how many people will be travelling.";
    }
    return (
      "Perfetto. Posso costruire il viaggio insieme a te combinando soggiorno, destinazioni ed esperienze. " +
      "Per iniziare dimmi quanti giorni vuoi trascorrere in Sicilia, il periodo e quante persone viaggeranno."
    );
  }

  /* OFFER */

  if (
    text.includes("offert") ||
    text.includes("promoz")
  ) {
    if (isEnglish) {
      return "I can show you SicilyTrip offers and packages available for the period you are interested in. Tell me when you would like to travel and how many people will be joining you.";
    }
    return (
      "Posso mostrarti offerte e pacchetti SicilyTrip disponibili per il periodo che ti interessa. " +
      "Indicami quando vorresti partire e quante persone viaggeranno."
    );
  }

  /* DEFAULT */

  if (isEnglish) {
    return "Of course, I can help. Tell me a little more about the journey you imagine: destination, travel period, number of guests or the kind of experience you would like. From there, we can build the most suitable solution together.";
  }

  return (
    "Certo, posso aiutarti. Raccontami qualcosa in più sul viaggio che immagini: destinazione, periodo, numero di ospiti oppure il tipo di esperienza che vorresti vivere. " +
    "Da lì possiamo costruire insieme la soluzione più adatta."
  );
}
