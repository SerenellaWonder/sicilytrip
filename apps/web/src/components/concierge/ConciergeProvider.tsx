"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import ConciergeLauncher from "./ConciergeLauncher";
import ConciergePanel from "./ConciergePanel";

type ConciergeContextValue = {
  isOpen: boolean;
  initialQuery: string;
  openConcierge: (query?: string) => void;
  closeConcierge: () => void;
  toggleConcierge: () => void;
};

const ConciergeContext = createContext<ConciergeContextValue | null>(null);

export default function ConciergeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");

  /**
   * Apre il Concierge.
   * Se arriva una query dalla barra della Home,
   * viene passata automaticamente al pannello.
   */
  const openConcierge = useCallback((query = "") => {
    setInitialQuery(query);
    setIsOpen(true);
  }, []);

  /**
   * Chiude il pannello.
   */
  const closeConcierge = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Apre/chiude il pannello dal launcher flottante.
   */
  const toggleConcierge = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      initialQuery,
      openConcierge,
      closeConcierge,
      toggleConcierge,
    }),
    [
      isOpen,
      initialQuery,
      openConcierge,
      closeConcierge,
      toggleConcierge,
    ]
  );

  return (
    <ConciergeContext.Provider value={value}>
      {/* CONTENUTO DEL PORTALE */}
      {children}

      {/* LAUNCHER FISSO IN BASSO A DESTRA */}
      <ConciergeLauncher />

      {/* PANNELLO DEL CONCIERGE */}
      <ConciergePanel />
    </ConciergeContext.Provider>
  );
}

export function useConcierge() {
  const context = useContext(ConciergeContext);

  if (!context) {
    throw new Error(
      "useConcierge deve essere utilizzato all'interno di ConciergeProvider"
    );
  }

  return context;
}