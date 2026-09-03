"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CreditCard, Download, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { exportCsv, inDateRange } from "./exportCsv";

type Payment = {
  id: string;
  status: string;
  amount: number;
  currency: string;
  customerId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  createdAt: string;
};

export default function AdminPayments({ token }: { token: string }) {
  const [items, setItems] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const statuses = useMemo(
    () => [...new Set(items.map((item) => item.status))].sort(),
    [items],
  );
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter(
      (item) =>
        (status === "ALL" || item.status === status) &&
        inDateRange(item.createdAt, from, to) &&
        (!needle ||
          [item.hotelName, item.customerId, item.id].some((value) =>
            value.toLowerCase().includes(needle),
          )),
    );
  }, [from, items, query, status, to]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setItems(
        await apiFetch<Payment[]>("/admin/payments", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Pagamenti non disponibili",
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3 text-sm leading-6 text-slate-500">
          <ShieldCheck className="mt-0.5 shrink-0 text-emerald-600" size={19} />
          <p>
            Nessun dato della carta viene salvato o mostrato. I clienti sono
            identificati in forma anonima.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="flex items-center gap-2 text-xs font-semibold text-[#0D2340]"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Aggiorna
        </button>
      </div>

      <div className="mb-6 grid gap-3 rounded-[22px] bg-white p-4 sm:grid-cols-2 xl:grid-cols-[1fr_190px_160px_160px_auto]">
        <label className="relative">
          <span className="sr-only">Cerca pagamenti</span>
          <Search className="absolute left-3 top-3.5 text-slate-400" size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Hotel, cliente o identificativo"
            className="h-11 w-full rounded-xl border border-[#0D2340]/10 pl-10 pr-3 text-sm outline-none focus:border-[#0D2340]/30"
          />
        </label>
        <select
          aria-label="Filtra per stato pagamento"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-11 rounded-xl border border-[#0D2340]/10 px-3 text-sm text-[#0D2340] outline-none"
        >
          <option value="ALL">Tutti gli stati</option>
          {statuses.map((value) => (
            <option key={value} value={value}>{statusLabel(value)}</option>
          ))}
        </select>
        <input aria-label="Pagamenti dal" type="date" value={from} onChange={(event) => setFrom(event.target.value)} className="h-11 rounded-xl border border-[#0D2340]/10 px-3 text-sm outline-none" />
        <input aria-label="Pagamenti fino al" type="date" value={to} onChange={(event) => setTo(event.target.value)} className="h-11 rounded-xl border border-[#0D2340]/10 px-3 text-sm outline-none" />
        <button
          type="button"
          disabled={!filtered.length}
          onClick={() => exportCsv("pagamenti-sicilytrip", ["Stato", "Importo", "Valuta", "Cliente", "Hotel", "Check-in", "Check-out", "Creato il", "ID"], filtered.map((item) => [statusLabel(item.status), item.amount / 100, item.currency, item.customerId, item.hotelName, item.checkIn, item.checkOut, item.createdAt, item.id]))}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0D2340] px-4 text-xs font-bold text-white disabled:opacity-40"
        >
          <Download size={15} /> Esporta CSV
        </button>
      </div>

      {!error && items.length > 0 && (
        <p className="mb-4 text-xs text-slate-500">{filtered.length} di {items.length} pagamenti</p>
      )}

      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : items.length === 0 ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Nessun pagamento presente.
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((payment) => (
            <article
              key={payment.id}
              className="grid gap-5 rounded-[24px] bg-white p-6 md:grid-cols-[1fr_auto]"
            >
              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#F58220]/10 text-[#F58220]">
                  <CreditCard size={20} />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F58220]">
                    {statusLabel(payment.status)}
                  </span>
                  <h2 className="mt-1 text-lg font-bold text-[#0D2340]">
                    {payment.hotelName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {payment.customerId} · {date(payment.checkIn)} –{" "}
                    {date(payment.checkOut)}
                  </p>
                </div>
              </div>
              <div className="md:text-right">
                <strong className="text-xl text-[#0D2340]">
                  {money(payment.amount, payment.currency)}
                </strong>
                <time className="mt-2 block text-xs text-slate-400">
                  {dateTime(payment.createdAt)}
                </time>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">Nessun pagamento corrisponde ai filtri selezionati.</div>
          )}
        </div>
      )}
    </div>
  );
}

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function date(value: string) {
  return new Intl.DateTimeFormat("it-IT", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

function dateTime(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusLabel(status: string) {
  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}
