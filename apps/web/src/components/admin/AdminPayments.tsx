"use client";

import { useCallback, useEffect, useState } from "react";
import { CreditCard, RefreshCw, ShieldCheck } from "lucide-react";
import { apiFetch } from "@/lib/api";

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
          {items.map((payment) => (
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
