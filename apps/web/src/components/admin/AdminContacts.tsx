"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock3, Mail, RefreshCw, ShieldCheck } from "lucide-react";
import { apiFetch } from "@/lib/api";

type Status = "NEW" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";
type Contact = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: Status;
  createdAt: string;
  expiresAt: string;
};
const statuses: Array<{ value: Status; label: string }> = [
  { value: "NEW", label: "Nuova" },
  { value: "IN_PROGRESS", label: "In lavorazione" },
  { value: "RESOLVED", label: "Risolta" },
  { value: "ARCHIVED", label: "Archiviata" },
];

export default function AdminContacts({ token }: { token: string }) {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setItems(
        await apiFetch<Contact[]>("/admin/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Richieste non disponibili",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);
  async function update(id: string, status: Status) {
    try {
      setError("");
      await apiFetch(`/admin/contacts/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, status } : item)),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Aggiornamento non riuscito",
      );
    }
  }
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0D2340]">
            Richieste di contatto
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Customer care e messaggi ricevuti dal portale.
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
          Questi dati sono accessibili soltanto ad Amministratore e Assistenza
          clienti e vengono eliminati automaticamente dopo 12 mesi.
        </p>
      </div>
      {error && (
        <p role="alert" className="mb-5 text-sm text-red-600">
          {error}
        </p>
      )}
      {!items.length ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Nessuna richiesta di contatto presente.
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-[24px] bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#F58220]/10 text-[#F58220]">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0D2340]">
                        {item.subject}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.name} ·{" "}
                        <a
                          className="text-[#F58220]"
                          href={`mailto:${item.email}`}
                        >
                          {item.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <select
                  aria-label={`Stato richiesta di ${item.name}`}
                  value={item.status}
                  onChange={(event) =>
                    void update(item.id, event.target.value as Status)
                  }
                  className="h-10 rounded-xl border border-[#0D2340]/10 bg-white px-3 text-xs font-bold text-[#0D2340]"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#F7F5F1] p-5 text-sm leading-6 text-slate-600">
                {item.message}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <Clock3 size={13} />
                  Ricevuta {dateTime(item.createdAt)}
                </span>
                <span>Conservata fino al {date(item.expiresAt)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
function date(value: string) {
  return new Intl.DateTimeFormat("it-IT", { dateStyle: "medium" }).format(
    new Date(value),
  );
}
function dateTime(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
