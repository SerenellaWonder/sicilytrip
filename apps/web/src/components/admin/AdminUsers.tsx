"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

type User = {
  id: string;
  email: string;
  language: string;
  profileComplete: boolean;
  bookings: number;
  createdAt: string;
  updatedAt: string;
};

export default function AdminUsers({ token }: { token: string }) {
  const [items, setItems] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setItems(
        await apiFetch<User[]>("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Utenti non disponibili",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return value
      ? items.filter((item) =>
          `${item.id} ${item.email} ${item.language}`
            .toLowerCase()
            .includes(value),
        )
      : items;
  }, [items, query]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0D2340]">
            Utenti registrati
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Anagrafica protetta degli account della piattaforma.
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
      <div className="mb-5 flex gap-3 rounded-[20px] border border-emerald-100 bg-emerald-50 p-5 text-sm leading-6 text-emerald-800">
        <ShieldCheck className="mt-0.5 shrink-0" size={19} />
        <p>
          Nomi e indirizzi email completi non sono mostrati nella lista. I dati
          servono soltanto per assistenza e controllo del funzionamento degli
          account.
        </p>
      </div>
      <label className="mb-5 flex h-12 max-w-md items-center gap-3 rounded-xl bg-white px-4 text-slate-400">
        <Search size={17} />
        <span className="sr-only">Cerca utenti</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cerca identificativo o email mascherata"
          className="min-w-0 flex-1 bg-transparent text-sm text-[#0D2340] outline-none"
        />
      </label>
      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : !filtered.length ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Nessun utente registrato corrisponde alla ricerca.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((user) => (
            <article key={user.id} className="rounded-[24px] bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0D2340]/[0.06] text-[#0D2340]">
                  <UserRound size={20} />
                </div>
                {user.profileComplete ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-2 text-[9px] font-bold uppercase text-emerald-700">
                    <CheckCircle2 size={12} /> Profilo completo
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-2 text-[9px] font-bold uppercase text-amber-700">
                    <XCircle size={12} /> Da completare
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-bold text-[#0D2340]">{user.id}</h3>
              <p className="mt-1 text-sm text-slate-500">{user.email}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Stat label="Prenotazioni" value={user.bookings} />
                <Stat label="Lingua" value={user.language.toUpperCase()} />
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Registrato il {date(user.createdAt)}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl bg-[#F7F5F1] p-3">
      <strong className="text-lg text-[#0D2340]">{value}</strong>
      <span className="block text-[8px] font-bold uppercase text-slate-400">
        {label}
      </span>
    </div>
  );
}
function date(value: string) {
  return new Intl.DateTimeFormat("it-IT", { dateStyle: "medium" }).format(
    new Date(value),
  );
}
