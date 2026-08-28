"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Loader2,
  LockKeyhole,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import AdminJournal from "./AdminJournal";
import AdminFaq from "./AdminFaq";
import AdminOverview from "./AdminOverview";
import AdminCustomers from "./AdminCustomers";
import AdminPayments from "./AdminPayments";
import AdminWishlists from "./AdminWishlists";
import AdminExperiences from "./AdminExperiences";
import AdminPackages from "./AdminPackages";
import AdminDestinations from "./AdminDestinations";

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
  const [section, setSection] = useState<
    | "overview"
    | "bookings"
    | "journal"
    | "faq"
    | "customers"
    | "payments"
    | "wishlists"
    | "experiences"
    | "packages"
    | "destinations"
  >("overview");

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
    <main className="relative min-h-screen overflow-hidden bg-[#F7F5F1] px-5 py-8 sm:px-8 lg:py-10">
      <div className="pointer-events-none absolute -right-32 top-32 size-[420px] rounded-full bg-[#F58220]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 size-[480px] rounded-full bg-[#0D2340]/[0.06] blur-3xl" />
      <div className="relative mx-auto max-w-[1240px]">
        <header className="relative overflow-hidden rounded-[30px] bg-[#0D2340] px-7 py-7 text-white shadow-[0_24px_70px_rgba(13,35,64,0.18)] sm:px-10 sm:py-9">
          <div className="absolute -right-16 -top-28 size-72 rounded-full border border-white/[0.07]" />
          <div className="absolute -bottom-28 right-28 size-56 rounded-full bg-[#F58220]/10 blur-2xl" />
          <div className="relative flex items-start justify-between gap-5">
            <div>
              <Image
                src="/images/logo-sicilytrip-light.svg"
                alt="SicilyTrip"
                width={154}
                height={48}
                priority
                className="h-auto w-[138px] sm:w-[154px]"
              />
              <span className="mt-7 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#F58220]">
                Area amministrativa
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
                Il cuore operativo di SicilyTrip
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
                Controlla prenotazioni, contenuti e attività della piattaforma
                da un unico spazio.
              </p>
            </div>
            {token && (
              <button
                onClick={logout}
                className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <LogOut size={17} /> Esci
              </button>
            )}
          </div>
        </header>

        {!token ? (
          <form
            onSubmit={login}
            className="mx-auto mt-10 max-w-md rounded-[28px] border border-[#0D2340]/[0.06] bg-white p-8 shadow-[0_18px_55px_rgba(13,35,64,0.08)]"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#F58220]/10">
              <LockKeyhole className="text-[#F58220]" />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-[#0D2340]">
              Accesso riservato
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Inserisci le credenziali amministrative per continuare.
            </p>
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
            <nav className="mb-8 flex w-fit flex-wrap gap-2 rounded-[20px] border border-[#0D2340]/[0.06] bg-white p-2 shadow-[0_10px_35px_rgba(13,35,64,0.05)]">
              <button
                type="button"
                onClick={() => setSection("overview")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "overview" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setSection("bookings")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "bookings" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Prenotazioni
              </button>
              <button
                onClick={() => setSection("journal")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "journal" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Journal
              </button>
              <button
                type="button"
                onClick={() => setSection("faq")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "faq" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                FAQ
              </button>
              <button
                type="button"
                onClick={() => setSection("customers")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "customers" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Clienti
              </button>
              <button
                type="button"
                onClick={() => setSection("payments")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "payments" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Pagamenti
              </button>
              <button
                type="button"
                onClick={() => setSection("wishlists")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "wishlists" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Wishlist
              </button>
              <button
                type="button"
                onClick={() => setSection("experiences")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "experiences" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Esperienze
              </button>
              <button
                type="button"
                onClick={() => setSection("packages")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "packages" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Pacchetti
              </button>
              <button
                type="button"
                onClick={() => setSection("destinations")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "destinations" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Destinazioni
              </button>
            </nav>
            {section === "overview" ? (
              <AdminOverview token={token} />
            ) : section === "journal" ? (
              <AdminJournal token={token} />
            ) : section === "faq" ? (
              <AdminFaq token={token} />
            ) : section === "customers" ? (
              <AdminCustomers token={token} />
            ) : section === "payments" ? (
              <AdminPayments token={token} />
            ) : section === "wishlists" ? (
              <AdminWishlists token={token} />
            ) : section === "experiences" ? (
              <AdminExperiences token={token} />
            ) : section === "packages" ? (
              <AdminPackages token={token} />
            ) : section === "destinations" ? (
              <AdminDestinations token={token} />
            ) : (
              <>
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
              </>
            )}
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
