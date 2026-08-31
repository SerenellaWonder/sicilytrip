"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function ContactForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    const element = event.currentTarget;
    const form = new FormData(element);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const subject = String(form.get("subject") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const privacyAccepted = form.get("privacyAccepted") === "on";

    if (!name || !email || !subject || !message || !privacyAccepted) {
      setError("Completa tutti i campi prima di inviare la richiesta.");
      return;
    }

    const body = [`Nome: ${name}`, `Email: ${email}`, "", message].join("\n");

    try {
      setLoading(true);
      await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          privacyAccepted,
          website: form.get("website") || undefined,
        }),
      });
      element.reset();
      setSuccess(true);
    } catch {
      window.location.href = `mailto:info@sicilytrip.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setError(
        "Il servizio online non è disponibile: abbiamo aperto il tuo programma email per completare l’invio.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(13,35,64,0.06)] sm:p-8"
    >
      <div className="flex items-center gap-3 text-[#F58220]">
        <Mail size={20} />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Scrivici
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <ContactField label="Nome e cognome" name="name" autoComplete="name" />
        <ContactField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
        />
      </div>

      <div className="mt-5">
        <ContactField label="Oggetto" name="subject" />
      </div>

      <label className="mt-5 block text-xs font-semibold text-[#0D2340]">
        Messaggio
        <textarea
          required
          name="message"
          rows={6}
          className="mt-2 w-full resize-y rounded-2xl border border-[#0D2340]/10 px-4 py-3 text-sm font-normal outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/10"
        />
      </label>

      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-slate-500">
        <input
          required
          name="privacyAccepted"
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 accent-[#F58220]"
        />
        <span>
          Acconsento al trattamento dei dati per ricevere risposta alla
          richiesta, secondo la{" "}
          <Link
            href="/privacy"
            className="font-semibold text-[#0D2340] underline"
          >
            Privacy Policy
          </Link>
          . I dati saranno conservati per un massimo di 12 mesi.
        </span>
      </label>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}
      {success && (
        <p
          role="status"
          className="mt-4 flex items-center gap-2 text-sm text-emerald-700"
        >
          <CheckCircle2 size={17} />
          Richiesta inviata. Ti risponderemo appena possibile.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#F58220] px-7 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#FF9238]"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {loading ? "Invio…" : "Invia richiesta"}
      </button>

      <p className="mt-4 text-[11px] leading-5 text-slate-400">
        Se il servizio online non è disponibile, si aprirà il programma email
        configurato sul dispositivo.
      </p>
    </form>
  );
}

function ContactField({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        required
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-xl border border-[#0D2340]/10 px-4 text-sm font-normal outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/10"
      />
    </label>
  );
}
