"use client";
import { useCallback, useEffect, useState } from "react";
import { ShieldCheck, UserRound } from "lucide-react";
import { apiFetch } from "@/lib/api";
type Customer = {
  id: string;
  bookings: number;
  confirmed: number;
  lastActivity: string;
};
export default function AdminCustomers({ token }: { token: string }) {
  const [items, setItems] = useState<Customer[]>([]);
  const [error, setError] = useState("");
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
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : items.length === 0 ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Nessun cliente associato alle prenotazioni.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
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
