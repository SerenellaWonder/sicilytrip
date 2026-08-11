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
  description: string;
  icon: React.ComponentType<{
    size?: number;
    stroke?: number;
    className?: string;
  }>;
  prompt: string;
};

/* ============================================================
   QUICK ACTIONS
============================================================ */

const actions: QuickAction[] = [
  {
    label: "Trova un hotel",
    description: "Scopri strutture selezionate",
    icon: IconBuilding,
    prompt: "Aiutami a trovare un hotel",
  },
  {
    label: "Crea il mio viaggio",
    description: "Costruiamo il soggiorno insieme",
    icon: IconSparkles,
    prompt: "Vorrei creare il mio viaggio in Sicilia",
  },
  {
    label: "Esperienze",
    description: "Mare, vino, cucina e territorio",
    icon: IconToolsKitchen2,
    prompt: "Mostrami le esperienze disponibili",
  },
  {
    label: "Offerte e pacchetti",
    description: "Scopri le proposte SicilyTrip",
    icon: IconGift,
    prompt: "Quali offerte e pacchetti sono disponibili?",
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function ConciergePanel() {
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
        text: createDemoResponse(cleanText),
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
        aria-label="Chiudi Concierge"
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
                  Il tuo assistente di viaggio
                </div>

              </div>

            </div>

            {/* HEADER BUTTONS */}

            <div className="flex items-center gap-2">

              {hasConversation && (
                <button
                  type="button"
                  onClick={resetConversation}
                  aria-label="Nuova conversazione"
                  title="Nuova conversazione"
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
                aria-label="Chiudi Concierge"
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
                Come posso aiutarti
                <br />
                a vivere la Sicilia?
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
                Raccontami il viaggio che immagini.
                Posso aiutarti con hotel, esperienze,
                offerte, pacchetti e itinerari.
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
                Da dove vuoi iniziare?
              </div>

              <div className="grid gap-2.5">

                {actions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() =>
                        selectAction(action.prompt)
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
                          {action.label}
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
                          {action.description}
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
                    "4 notti a Taormina a settembre per 2 persone, hotel sul mare e una wine experience"
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
                      Prova a chiedermi
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
                      “4 notti a Taormina a settembre
                      per 2 persone, hotel sul mare e
                      una wine experience.”
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
                Continua con
              </div>

              <div className="flex flex-wrap gap-2">

                <FollowUpButton
                  onClick={() =>
                    sendMessage(
                      "Mostrami gli hotel disponibili"
                    )
                  }
                >
                  Hotel
                </FollowUpButton>

                <FollowUpButton
                  onClick={() =>
                    sendMessage(
                      "Aggiungi delle esperienze"
                    )
                  }
                >
                  Esperienze
                </FollowUpButton>

                <FollowUpButton
                  onClick={() =>
                    sendMessage(
                      "Creami un pacchetto completo"
                    )
                  }
                >
                  Pacchetto completo
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
                  ? "Il Concierge sta rispondendo..."
                  : "Scrivi al Concierge..."
              }
              disabled={isTyping}
              aria-label="Messaggio per SicilyTrip Concierge"
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
              aria-label="Invia messaggio"
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
  query: string
): string {
  const text = query.toLowerCase();

  /* HOTEL */

  if (
    text.includes("hotel") ||
    text.includes("albergo") ||
    text.includes("struttura")
  ) {
    return (
      "Certamente. Posso cercare le strutture più adatte alle tue esigenze. " +
      "Indicami destinazione, date, numero di ospiti e, se vuoi, il tipo di soggiorno che preferisci: mare, centro storico, resort, boutique hotel o dimora esclusiva."
    );
  }

  /* TAORMINA */

  if (text.includes("taormina")) {
    return (
      "Ottima scelta. Taormina è perfetta per un soggiorno tra mare, cultura e panorami unici. " +
      "Posso selezionare hotel adatti alle tue date e aggiungere esperienze come escursioni in barca, Etna, degustazioni o una cena speciale."
    );
  }

  /* ETNA */

  if (text.includes("etna")) {
    return (
      "Posso organizzare un soggiorno dedicato all’Etna combinando strutture selezionate, escursioni private, cantine e degustazioni. " +
      "Se mi indichi quanti giorni hai a disposizione, posso costruire una proposta completa."
    );
  }

  /* PALERMO */

  if (text.includes("palermo")) {
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
    return (
      "Posso mostrarti offerte e pacchetti SicilyTrip disponibili per il periodo che ti interessa. " +
      "Indicami quando vorresti partire e quante persone viaggeranno."
    );
  }

  /* DEFAULT */

  return (
    "Certo, posso aiutarti. Raccontami qualcosa in più sul viaggio che immagini: destinazione, periodo, numero di ospiti oppure il tipo di esperienza che vorresti vivere. " +
    "Da lì possiamo costruire insieme la soluzione più adatta."
  );
}