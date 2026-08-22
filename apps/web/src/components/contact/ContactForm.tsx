"use client";

import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";

export default function ContactForm() {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const subject = String(form.get("subject") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name || !email || !subject || !message) {
      setError("Completa tutti i campi prima di inviare la richiesta.");
      return;
    }

    const body = [
      `Nome: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:info@sicilytrip.it?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
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
        <ContactField label="Email" name="email" type="email" autoComplete="email" />
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

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#F58220] px-7 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#FF9238]"
      >
        <Send size={16} />
        Prepara email
      </button>

      <p className="mt-4 text-[11px] leading-5 text-slate-400">
        Si aprirà il programma email configurato sul dispositivo. Nessun dato viene memorizzato dal sito.
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
