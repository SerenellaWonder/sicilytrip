"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function ContactForm() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
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
      setError(
        isEnglish
          ? "Complete all fields before sending your request."
          : "Completa tutti i campi prima di inviare la richiesta.",
      );
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
        isEnglish
          ? "The online service is unavailable: we opened your email app so you can complete the request."
          : "Il servizio online non è disponibile: abbiamo aperto il tuo programma email per completare l’invio.",
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
          {isEnglish ? "Write to us" : "Scrivici"}
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <ContactField
          label={isEnglish ? "Full name" : "Nome e cognome"}
          name="name"
          autoComplete="name"
        />
        <ContactField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
        />
      </div>

      <div className="mt-5">
        <ContactField label={isEnglish ? "Subject" : "Oggetto"} name="subject" />
      </div>

      <label className="mt-5 block text-xs font-semibold text-[#0D2340]">
        {isEnglish ? "Message" : "Messaggio"}
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
          {isEnglish
            ? "I consent to the processing of my data in order to receive a reply, in accordance with the "
            : "Acconsento al trattamento dei dati per ricevere risposta alla richiesta, secondo la "}
          <Link
            href="/privacy"
            className="font-semibold text-[#0D2340] underline"
          >
            Privacy Policy
          </Link>
          {isEnglish
            ? ". Data will be retained for a maximum of 12 months."
            : ". I dati saranno conservati per un massimo di 12 mesi."}
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
          {isEnglish
            ? "Request sent. We will reply as soon as possible."
            : "Richiesta inviata. Ti risponderemo appena possibile."}
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
        {loading
          ? isEnglish
            ? "Sending…"
            : "Invio…"
          : isEnglish
            ? "Send request"
            : "Invia richiesta"}
      </button>

      <p className="mt-4 text-[11px] leading-5 text-slate-400">
        {isEnglish
          ? "If the online service is unavailable, the email app configured on your device will open."
          : "Se il servizio online non è disponibile, si aprirà il programma email configurato sul dispositivo."}
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
