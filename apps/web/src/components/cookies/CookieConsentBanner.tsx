"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Cookie, Settings2, X } from "lucide-react";

import { useCookieConsent } from "./CookieConsentProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function CookieConsentBanner() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const { choices, decided, preferencesOpen, saveChoices, closePreferences } = useCookieConsent();
  const [customize, setCustomize] = useState(false);
  const [preferences, setPreferences] = useState(choices.preferences);
  const [externalServices, setExternalServices] = useState(choices.externalServices);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const open = !decided || preferencesOpen;

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      setPreferences(choices.preferences);
      setExternalServices(choices.externalServices);
      setCustomize(preferencesOpen);
      headingRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [choices, open, preferencesOpen]);

  if (!open) return null;

  return (
    <section role="dialog" aria-modal="false" aria-labelledby="cookie-title" className="fixed inset-x-4 bottom-4 z-[120] mx-auto max-w-[760px] rounded-[24px] border border-white/10 bg-[#0D2340] p-5 text-white shadow-[0_24px_80px_rgba(6,21,39,0.35)] sm:p-6">
      {preferencesOpen && (
        <button type="button" onClick={closePreferences} aria-label={isEnglish ? "Close cookie preferences" : "Chiudi preferenze cookie"} className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10">
          <X size={18} />
        </button>
      )}
      <div className="flex items-start gap-4 pr-10">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#F58220]" aria-hidden="true"><Cookie size={20} /></span>
        <div>
          <h2 id="cookie-title" ref={headingRef} tabIndex={-1} className="text-lg font-bold">{isEnglish ? "Your privacy choices" : "Le tue scelte sulla privacy"}</h2>
          <p className="mt-2 text-xs leading-6 text-white/65">
            {isEnglish ? "We use necessary technologies for the website. With your permission, we can also remember preferences and load external services such as Google Maps." : "Utilizziamo tecnologie necessarie al funzionamento del sito. Con il tuo consenso possiamo anche ricordare le preferenze e caricare servizi esterni come Google Maps."}
            {" "}<Link href="/cookie" className="font-semibold text-white underline">Cookie Policy</Link>
          </p>
        </div>
      </div>

      {customize && (
        <div className="mt-5 grid gap-3 rounded-2xl bg-white/[0.07] p-4 sm:grid-cols-3">
          <ConsentItem label={isEnglish ? "Necessary" : "Necessari"} description={isEnglish ? "Always active" : "Sempre attivi"} checked disabled />
          <ConsentItem label={isEnglish ? "Preferences" : "Preferenze"} description={isEnglish ? "Language and choices" : "Lingua e scelte"} checked={preferences} onChange={setPreferences} />
          <ConsentItem label={isEnglish ? "External services" : "Servizi esterni"} description="Google Maps" checked={externalServices} onChange={setExternalServices} />
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => saveChoices({ preferences: true, externalServices: true })} className="rounded-full bg-[#F58220] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.1em]">{isEnglish ? "Accept all" : "Accetta tutti"}</button>
        <button type="button" onClick={() => saveChoices(initialDenied)} className="rounded-full border border-white/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.1em]">{isEnglish ? "Necessary only" : "Solo necessari"}</button>
        {customize ? (
          <button type="button" onClick={() => saveChoices({ preferences, externalServices })} className="rounded-full bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0D2340]">{isEnglish ? "Save choices" : "Salva scelte"}</button>
        ) : (
          <button type="button" onClick={() => setCustomize(true)} className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white/75"><Settings2 size={14} />{isEnglish ? "Customize" : "Personalizza"}</button>
        )}
      </div>
    </section>
  );
}

const initialDenied = { preferences: false, externalServices: false };

function ConsentItem({ label, description, checked, disabled = false, onChange }: { label: string; description: string; checked: boolean; disabled?: boolean; onChange?: (value: boolean) => void }) {
  return <label className="flex items-center gap-3 rounded-xl px-2 py-2 text-xs"><input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} className="size-4 accent-[#F58220]" /><span><strong className="block">{label}</strong><small className="text-white/45">{description}</small></span></label>;
}
