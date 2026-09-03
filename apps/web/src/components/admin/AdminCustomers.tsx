"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Search, ShieldCheck, UserRound } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { exportCsv, inDateRange } from "./exportCsv";
type Customer = {
  id: string;
  bookings: number;
  confirmed: number;
  lastActivity: string;
};
export default function AdminCustomers({ token }: { token: string }) {
  const [items, setItems] = useState<Customer[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter(
      (item) =>
        (!needle || item.id.toLowerCase().includes(needle)) &&
        inDateRange(item.lastActivity, from, to),
    );
  }, [from, items, query, to]);
  const load = useCallback(async () => {
    try {
      setItems(
        await apiFetch<Customer[]>("/admin/customers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Clienti non disponibili");
    }
  }, [token]);
  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);
  return (
    <div>
      <div className="mb-6 flex items-start gap-3 rounded-[20px] border border-emerald-100 bg-emerald-50 p-5 text-sm leading-6 text-emerald-800">
        <ShieldCheck className="mt-0.5 shrink-0" />
        <p>
          I clienti sono mostrati con un identificativo anonimo. Email, nomi e
          dati degli ospiti non sono disponibili in questa schermata.
        </p>
      </div>
      <div className="mb-6 grid gap-3 rounded-[22px] bg-white p-4 sm:grid-cols-2 xl:grid-cols-[1fr_170px_170px_auto]">
        <label className="relative">
          <span className="sr-only">Cerca cliente anonimo</span>
          <Search className="absolute left-3 top-3.5 text-slate-400" size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Identificativo cliente" className="h-11 w-full rounded-xl border border-[#0D2340]/10 pl-10 pr-3 text-sm outline-none focus:border-[#0D2340]/30" />
        </label>
        <input aria-label="Attività clienti dal" type="date" value={from} onChange={(event) => setFrom(event.target.value)} className="h-11 rounded-xl border border-[#0D2340]/10 px-3 text-sm outline-none" />
        <input aria-label="Attività clienti fino al" type="date" value={to} onChange={(event) => setTo(event.target.value)} className="h-11 rounded-xl border border-[#0D2340]/10 px-3 text-sm outline-none" />
        <button type="button" disabled={!filtered.length} onClick={() => exportCsv("clienti-sicilytrip", ["Cliente anonimo", "Richieste", "Confermate", "Ultima attività"], filtered.map((item) => [item.id, item.bookings, item.confirmed, item.lastActivity]))} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0D2340] px-4 text-xs font-bold text-white disabled:opacity-40"><Download size={15} /> Esporta CSV</button>
      </div>
      {!error && items.length > 0 && <p className="mb-4 text-xs text-slate-500">{filtered.length} di {items.length} clienti</p>}
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : items.length === 0 ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Nessun cliente associato alle prenotazioni.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.id} className="rounded-[24px] bg-white p-6">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0D2340]/[0.06] text-[#0D2340]">
                <UserRound />
              </div>
              <h2 className="mt-4 font-bold text-[#0D2340]">{item.id}</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Stat label="Richieste" value={item.bookings} />
                <Stat label="Confermate" value={item.confirmed} />
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Ultima attività:{" "}
                {new Intl.DateTimeFormat("it-IT", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(item.lastActivity))}
              </p>
            </article>
          ))}
          {filtered.length === 0 && <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500 md:col-span-2 xl:col-span-3">Nessun cliente corrisponde ai filtri selezionati.</div>}
        </div>
      )}
    </div>
  );
}
function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-[#F7F5F1] p-3">
      <strong className="text-xl text-[#0D2340]">{value}</strong>
      <span className="block text-[9px] font-bold uppercase text-slate-400">
        {label}
      </span>
    </div>
  );
}
