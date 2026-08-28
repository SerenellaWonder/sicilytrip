"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

type Summary = {
  bookings: Record<string, number>;
  articles: { total: number; published: number };
  faq: { total: number; published: number };
  payments: Record<string, number>;
};
type Message = { id: number; role: "assistant" | "user"; text: string };

const suggestions = [
  "Fammi un riepilogo operativo",
  "Ci sono prenotazioni da controllare?",
  "Come stanno andando i pagamenti?",
  "Cosa manca nei contenuti?",
];

export default function AdminAssistant({ token }: { token: string }) {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Buongiorno, sono l’assistente operativo SicilyTrip. Posso aiutarti a leggere lo stato del portale, individuare priorità e orientarti tra le sezioni amministrative.",
    },
  ]);
  const nextId = useRef(2);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setSummary(
        await apiFetch<Summary>("/admin/summary", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  function ask(question: string) {
    const value = question.trim();
    if (!value) return;
    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "user", text: value },
      {
        id: nextId.current++,
        role: "assistant",
        text: answer(value, summary),
      },
    ]);
    setInput("");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_310px]">
      <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_16px_50px_rgba(13,35,64,0.06)]">
        <header className="relative overflow-hidden bg-[#0D2340] p-6 text-white">
          <div className="absolute -right-12 -top-16 size-44 rounded-full bg-[#F58220]/15 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#F58220]">
              <Sparkles size={21} />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
                SicilyTrip Concierge
              </span>
              <h2 className="mt-1 text-xl font-bold">
                Assistente amministrativo
              </h2>
            </div>
            {loading && (
              <Loader2
                className="ml-auto animate-spin text-white/50"
                size={18}
              />
            )}
          </div>
        </header>

        <div className="max-h-[520px] min-h-[360px] space-y-5 overflow-y-auto bg-[#F7F5F1]/55 p-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${message.role === "assistant" ? "bg-[#0D2340] text-[#F58220]" : "bg-[#F58220] text-white"}`}
              >
                {message.role === "assistant" ? (
                  <Bot size={17} />
                ) : (
                  <UserRound size={17} />
                )}
              </div>
              <p
                className={`max-w-[82%] whitespace-pre-line rounded-2xl px-5 py-4 text-sm leading-6 ${message.role === "assistant" ? "rounded-tl-sm bg-white text-slate-600" : "rounded-tr-sm bg-[#F58220] text-white"}`}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>

        <form
          onSubmit={submit}
          className="flex gap-3 border-t border-slate-100 p-5"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Chiedi un riepilogo o un suggerimento…"
            className="h-12 min-w-0 flex-1 rounded-xl border border-[#0D2340]/10 px-4 text-sm outline-none focus:border-[#F58220]/50"
          />
          <button
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#F58220] text-white"
            aria-label="Invia"
          >
            <Send size={18} />
          </button>
        </form>
      </section>

      <aside className="space-y-5">
        <div className="rounded-[24px] bg-white p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#0D2340]">
            Domande rapide
          </h3>
          <div className="mt-4 space-y-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => ask(suggestion)}
                className="w-full rounded-xl bg-[#F7F5F1] px-4 py-3 text-left text-xs font-semibold leading-5 text-[#0D2340] transition hover:bg-[#F58220]/10"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 rounded-[24px] border border-emerald-100 bg-emerald-50 p-5 text-sm leading-6 text-emerald-800">
          <ShieldCheck className="mt-0.5 shrink-0" size={19} />
          <p>
            L’assistente lavora localmente sui riepiloghi protetti. Nessun dato
            viene inviato a servizi di intelligenza artificiale esterni.
          </p>
        </div>
      </aside>
    </div>
  );
}

function answer(question: string, data: Summary | null) {
  if (!data)
    return "Sto ancora caricando i dati del pannello. Riprova tra qualche secondo.";
  const query = question.toLowerCase();
  const totalBookings = total(data.bookings);
  const pending = (data.bookings.PENDING ?? 0) + (data.bookings.UNCERTAIN ?? 0);
  const failed = data.bookings.FAILED ?? 0;
  const payments = total(data.payments);
  const paymentIssues =
    (data.payments.FAILED ?? 0) +
    (data.payments.REQUIRES_ACTION ?? 0) +
    (data.payments.REQUIRES_PAYMENT_METHOD ?? 0);

  if (query.includes("prenot") || query.includes("controllare")) {
    return `Sono presenti ${totalBookings} richieste di prenotazione. ${pending ? `${pending} richiedono attenzione o verifica.` : "Non risultano richieste in attesa di verifica."} ${failed ? `${failed} risultano non confermate.` : "Non risultano errori di prenotazione."}`;
  }
  if (query.includes("pagament")) {
    return `Il pannello registra ${payments} pagamenti. ${paymentIssues ? `${paymentIssues} richiedono attenzione: apri la sezione Pagamenti per il dettaglio.` : "Non risultano pagamenti con azioni pendenti."}`;
  }
  if (
    query.includes("contenut") ||
    query.includes("journal") ||
    query.includes("faq") ||
    query.includes("manca")
  ) {
    const draftArticles = data.articles.total - data.articles.published;
    const draftFaq = data.faq.total - data.faq.published;
    return `Journal: ${data.articles.published} articoli pubblicati su ${data.articles.total}${draftArticles ? `, con ${draftArticles} bozze da rivedere` : ""}. FAQ: ${data.faq.published} pubblicate su ${data.faq.total}${draftFaq ? `, con ${draftFaq} bozze da completare` : ""}.`;
  }
  if (
    query.includes("riepilogo") ||
    query.includes("priorit") ||
    query.includes("stato")
  ) {
    const priority = pending + failed + paymentIssues;
    return `Riepilogo operativo:\n• ${totalBookings} richieste di prenotazione\n• ${payments} pagamenti registrati\n• ${data.articles.published} articoli Journal pubblicati\n• ${data.faq.published} FAQ pubblicate\n\n${priority ? `Priorità consigliata: controllare ${priority} elementi tra prenotazioni e pagamenti.` : "Non emergono criticità operative dai dati disponibili."}`;
  }
  return "Posso aiutarti con prenotazioni, pagamenti, Journal, FAQ e priorità operative. Per modificare destinazioni, esperienze o pacchetti, apri la relativa sezione del pannello.";
}

function total(values: Record<string, number>) {
  return Object.values(values).reduce((sum, value) => sum + value, 0);
}
