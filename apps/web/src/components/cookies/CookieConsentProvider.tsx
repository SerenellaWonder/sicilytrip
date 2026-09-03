"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ConsentChoices = {
  preferences: boolean;
  externalServices: boolean;
};

type CookieConsentContextValue = {
  choices: ConsentChoices;
  decided: boolean;
  preferencesOpen: boolean;
  saveChoices: (choices: ConsentChoices) => void;
  allowExternalServices: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const STORAGE_KEY = "sicilytrip-cookie-consent-v1";
const initialChoices: ConsentChoices = {
  preferences: false,
  externalServices: false,
};
const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export default function CookieConsentProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [choices, setChoices] = useState(initialChoices);
  const [decided, setDecided] = useState(true);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          setDecided(false);
          return;
        }
        const parsed = JSON.parse(stored) as Partial<ConsentChoices>;
        setChoices({
          preferences: parsed.preferences === true,
          externalServices: parsed.externalServices === true,
        });
      } catch {
        setDecided(false);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function saveChoices(next: ConsentChoices) {
    setChoices(next);
    setDecided(true);
    setPreferencesOpen(false);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  const value: CookieConsentContextValue = {
    choices,
    decided,
    preferencesOpen,
    saveChoices,
    allowExternalServices: () =>
      saveChoices({ ...choices, externalServices: true }),
    openPreferences: () => setPreferencesOpen(true),
    closePreferences: () => setPreferencesOpen(false),
  };

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  return context;
}
