"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  RefreshCw,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

type Activity = {
  id: string;
  endpoint: string;
  method: string;
  statusCode: number | null;
  requestBody: { resourceId?: string } | null;
  createdAt: string;
};

const labels: Record<string, string> = {
  "experience.created": "Esperienza creata",
  "experience.updated": "Esperienza modificata",
  "package.created": "Pacchetto creato",
  "package.updated": "Pacchetto modificato",
  "destination.created": "Destinazione creata",
  "destination.updated": "Destinazione modificata",
  "hotel.created": "Hotel creato",
  "hotel.updated": "Hotel modificato",
  "journal.created": "Articolo Journal creato",
  "journal.updated": "Articolo Journal modificato",
  "faq.created": "FAQ creata",
  "faq.updated": "FAQ modificata",
  "geography.bootstrapped": "Territorio siciliano caricato",
  "contact.updated": "Richiesta di contatto aggiornata",
  "operator.created": "Operatore creato",
  "operator.updated": "Operatore modificato",
};

export default function AdminActivity({ token }: { token: string }) {
  const [items, setItems] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setItems(
        await apiFetch<Activity[]>("/admin/activity", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Registro non disponibile",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0D2340]">
            Registro attività
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Cronologia delle modifiche effettuate nel pannello.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="flex items-center gap-2 text-xs font-semibold text-[#0D2340]"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />{" "}
          Aggiorna
        </button>
      </div>
      <div className="mb-6 flex gap-3 rounded-[20px] border border-emerald-100 bg-emerald-50 p-5 text-sm leading-6 text-emerald-800">
        <ShieldCheck className="mt-0.5 shrink-0" size={19} />
        <p>
          Il registro conserva soltanto tipo di operazione, riferimento tecnico
          e data. I contenuti modificati e i dati personali non vengono copiati
          nei log.
        </p>
      </div>
      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : !items.length ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Il registro inizierà a popolarsi con le prossime modifiche
          amministrative.
        </div>
      ) : (
        <div className="overflow-hidden rounded-[24px] bg-white">
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <article key={item.id} className="flex items-center gap-4 p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#0D2340]/[0.06] text-[#0D2340]">
                  <ScrollText size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-[#0D2340]">
                      {labels[item.endpoint] ?? item.endpoint}
                    </h3>
                    {item.statusCode === 200 && (
                      <CheckCircle2
                        size={14}
                        className="shrink-0 text-emerald-600"
                      />
                    )}
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-400">
                    Riferimento:{" "}
                    {item.requestBody?.resourceId ?? "operazione generale"}
                  </p>
                </div>
                <time className="flex shrink-0 items-center gap-2 text-xs text-slate-400">
                  <Clock3 size={14} />
                  {dateTime(item.createdAt)}
                </time>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function dateTime(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
