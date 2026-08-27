"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  LockKeyhole,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

type Booking = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "FAILED" | "UNCERTAIN";
  referenceCode?: string;
  providerError?: string;
  provider: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  createdAt: string;
};

const SESSION_KEY = "sicilytrip-admin-session";

export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) void loadBookings(stored);
      else setLoading(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  async function loadBookings(sessionToken: string) {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch<Booking[]>("/admin/bookings", {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      setToken(sessionToken);
      setBookings(data);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
      setToken("");
      setError("Sessione scaduta o non valida.");
    } finally {
      setLoading(false);
    }
  }

  async function login(event: FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch<{ token: string }>("/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      sessionStorage.setItem(SESSION_KEY, data.token);
      setPassword("");
      await loadBookings(data.token);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Accesso non riuscito.",
      );
      setLoading(false);
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setToken("");
    setBookings([]);
  }

  return (
    <main className="min-h-screen bg-[#F7F5F1] px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <header className="flex items-start justify-between gap-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
              SicilyTrip Backend
            </span>
            <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#0D2340] sm:text-5xl">
              Prenotazioni
            </h1>
          </div>
          {token && (
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500"
            >
              <LogOut size={17} /> Esci
            </button>
          )}
        </header>

        {!token ? (
          <form
            onSubmit={login}
            className="mt-10 max-w-md rounded-[26px] bg-white p-7 shadow-[0_12px_40px_rgba(13,35,64,0.06)]"
          >
            <LockKeyhole className="text-[#F58220]" />
            <Field
              label="Email amministratore"
              type="email"
              value={email}
              onChange={setEmail}
              autoComplete="username"
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
            />
            <button
              disabled={loading}
              className="mt-6 inline-flex h-12 items-center rounded-full bg-[#F58220] px-7 text-[10px] font-bold uppercase tracking-[0.13em] text-white disabled:opacity-60"
            >
              {loading && <Loader2 size={15} className="mr-2 animate-spin" />}{" "}
              Accedi
            </button>
            {error && (
              <p role="alert" className="mt-5 text-sm text-red-600">
                {error}
              </p>
            )}
          </form>
        ) : (
          <section className="mt-10">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {bookings.length} richieste recenti
              </p>
              <button
                onClick={() => void loadBookings(token)}
                disabled={loading}
                className="flex items-center gap-2 text-xs font-semibold text-[#0D2340]"
              >
                <RefreshCw
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />{" "}
                Aggiorna
              </button>
            </div>
            <div className="grid gap-4">
              {bookings.length === 0 ? (
                <div className="rounded-2xl bg-white p-7 text-sm text-slate-500">
                  Nessuna richiesta presente.
                </div>
              ) : (
                bookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  ...props
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: string;
  autoComplete: string;
}) {
  return (
    <label className="mt-5 block text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
        className="mt-2 h-12 w-full rounded-xl border border-[#0D2340]/10 px-4 outline-none focus:border-[#0D2340]/30"
      />
    </label>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <article className="grid gap-5 rounded-[24px] bg-white p-6 md:grid-cols-[1fr_auto]">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#0D2340]">
          {booking.status === "CONFIRMED" && (
            <CheckCircle2 size={17} className="text-emerald-600" />
          )}
          {statusLabel(booking.status)}
        </div>
        <h2 className="mt-3 text-xl font-semibold text-[#0D2340]">
          {booking.hotelName}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {date(booking.checkIn)} – {date(booking.checkOut)} ·{" "}
          {booking.provider}
        </p>
        {booking.providerError && (
          <p className="mt-3 text-xs text-red-600">
            Errore fornitore: {booking.providerError}
          </p>
        )}
      </div>
      <div className="md:text-right">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
          Riferimento
        </span>
        <strong className="mt-1 block text-[#0D2340]">
          {booking.referenceCode || "—"}
        </strong>
        <time className="mt-2 block text-xs text-slate-400">
          {dateTime(booking.createdAt)}
        </time>
      </div>
    </article>
  );
}

function statusLabel(value: Booking["status"]) {
  return value === "CONFIRMED"
    ? "Confermata"
    : value === "FAILED"
      ? "Non confermata"
      : value === "UNCERTAIN"
        ? "Da verificare"
        : "In elaborazione";
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
