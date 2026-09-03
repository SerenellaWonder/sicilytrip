"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Download,
  ExternalLink,
  Loader2,
  LockKeyhole,
  LogOut,
  RefreshCw,
  Search,
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
import AdminAssistant from "./AdminAssistant";
import AdminHotels from "./AdminHotels";
import AdminAnalytics from "./AdminAnalytics";
import AdminActivity from "./AdminActivity";
import AdminUsers from "./AdminUsers";
import AdminOperators from "./AdminOperators";
import AdminContacts from "./AdminContacts";
import AdminEvents from "./AdminEvents";
import { exportCsv, inDateRange } from "./exportCsv";

type AdminRole = "SUPER_ADMIN" | "CONTENT_EDITOR" | "CUSTOMER_SUPPORT";

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

type BookingDetail = Booking & {
  providerSearchId: string;
  providerHotelId: string;
  giataId: string;
  searchStatus: string;
  updatedAt: string;
  preBook: {
    deadlineDate: string;
    finalPrice: number | null;
    currency: string;
    expiresAt: string;
  } | null;
  payment: {
    status: string;
    amount: number;
    currency: string;
    createdAt: string;
  } | null;
};

const SESSION_KEY = "sicilytrip-admin-session";

export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState<AdminRole>("SUPER_ADMIN");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingQuery, setBookingQuery] = useState("");
  const [bookingStatus, setBookingStatus] = useState("ALL");
  const [bookingFrom, setBookingFrom] = useState("");
  const [bookingTo, setBookingTo] = useState("");
  const [selectedBooking, setSelectedBooking] =
    useState<BookingDetail | null>(null);
  const [detailLoadingId, setDetailLoadingId] = useState("");
  const [detailError, setDetailError] = useState("");
  const filteredBookings = useMemo(() => {
    const needle = bookingQuery.trim().toLowerCase();
    return bookings.filter(
      (booking) =>
        (bookingStatus === "ALL" || booking.status === bookingStatus) &&
        inDateRange(booking.createdAt, bookingFrom, bookingTo) &&
        (!needle ||
          [booking.hotelName, booking.provider, booking.referenceCode ?? "", booking.id].some((value) =>
            value.toLowerCase().includes(needle),
          )),
    );
  }, [bookingFrom, bookingQuery, bookings, bookingStatus, bookingTo]);
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
    | "assistant"
    | "hotels"
    | "analytics"
    | "activity"
    | "users"
    | "operators"
    | "contacts"
    | "events"
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
      setRole(readRole(sessionToken));
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

  async function openBooking(id: string) {
    try {
      setDetailLoadingId(id);
      setDetailError("");
      setSelectedBooking(
        await apiFetch<BookingDetail>(`/admin/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (reason) {
      setDetailError(
        reason instanceof Error
          ? reason.message
          : "Dettaglio non disponibile.",
      );
    } finally {
      setDetailLoadingId("");
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setToken("");
    setRole("SUPER_ADMIN");
    setBookings([]);
  }

  return (
    <main id="main-content" tabIndex={-1} className="relative min-h-screen overflow-hidden bg-[#F7F5F1] px-5 py-8 sm:px-8 lg:py-10">
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
              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white/55">
                  {roleLabel(role)}
                </span>
                <button
                  onClick={logout}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <LogOut size={17} /> Esci
                </button>
              </div>
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
              {role !== "CONTENT_EDITOR" && (
                <>
                  <NavButton
                    label="Prenotazioni"
                    active={section === "bookings"}
                    onClick={() => setSection("bookings")}
                  />
                  <NavButton
                    label="Clienti"
                    active={section === "customers"}
                    onClick={() => setSection("customers")}
                  />
                  <NavButton
                    label="Pagamenti"
                    active={section === "payments"}
                    onClick={() => setSection("payments")}
                  />
                  <NavButton
                    label="Richieste"
                    active={section === "contacts"}
                    onClick={() => setSection("contacts")}
                  />
                </>
              )}
              {role !== "CUSTOMER_SUPPORT" && (
                <>
                  <NavButton
                    label="Journal"
                    active={section === "journal"}
                    onClick={() => setSection("journal")}
                  />
                  <NavButton
                    label="Eventi"
                    active={section === "events"}
                    onClick={() => setSection("events")}
                  />
                  <NavButton
                    label="FAQ"
                    active={section === "faq"}
                    onClick={() => setSection("faq")}
                  />
                </>
              )}
              {role !== "CUSTOMER_SUPPORT" && (
                <>
                  <NavButton
                    label="Wishlist"
                    active={section === "wishlists"}
                    onClick={() => setSection("wishlists")}
                  />
                  <NavButton
                    label="Esperienze"
                    active={section === "experiences"}
                    onClick={() => setSection("experiences")}
                  />
                  <NavButton
                    label="Pacchetti"
                    active={section === "packages"}
                    onClick={() => setSection("packages")}
                  />
                  <NavButton
                    label="Destinazioni"
                    active={section === "destinations"}
                    onClick={() => setSection("destinations")}
                  />
                  <NavButton
                    label="Hotel"
                    active={section === "hotels"}
                    onClick={() => setSection("hotels")}
                  />
                </>
              )}
              <button
                type="button"
                onClick={() => setSection("assistant")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "assistant" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Assistente
              </button>
              <button
                type="button"
                onClick={() => setSection("analytics")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "analytics" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
              >
                Analisi
              </button>
              {role === "SUPER_ADMIN" && (
                <button
                  type="button"
                  onClick={() => setSection("activity")}
                  className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "activity" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
                >
                  Attività
                </button>
              )}
              {role !== "CONTENT_EDITOR" && (
                <NavButton
                  label="Utenti"
                  active={section === "users"}
                  onClick={() => setSection("users")}
                />
              )}
              {role === "SUPER_ADMIN" && (
                <button
                  type="button"
                  onClick={() => setSection("operators")}
                  className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${section === "operators" ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
                >
                  Operatori
                </button>
              )}
            </nav>
            {section === "overview" ? (
              <AdminOverview token={token} />
            ) : section === "journal" ? (
              <AdminJournal token={token} />
            ) : section === "events" ? (
              <AdminEvents token={token} />
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
            ) : section === "assistant" ? (
              <AdminAssistant token={token} />
            ) : section === "hotels" ? (
              <AdminHotels token={token} />
            ) : section === "analytics" ? (
              <AdminAnalytics token={token} />
            ) : section === "activity" ? (
              <AdminActivity token={token} />
            ) : section === "users" ? (
              <AdminUsers token={token} />
            ) : section === "operators" && role === "SUPER_ADMIN" ? (
              <AdminOperators token={token} />
            ) : section === "contacts" && role !== "CONTENT_EDITOR" ? (
              <AdminContacts token={token} />
            ) : (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-slate-500">
                    {filteredBookings.length} di {bookings.length} richieste recenti
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
                <div className="mb-5 grid gap-3 rounded-[22px] bg-white p-4 sm:grid-cols-2 xl:grid-cols-[1fr_190px_160px_160px_auto]">
                  <label className="relative">
                    <span className="sr-only">Cerca prenotazioni</span>
                    <Search className="absolute left-3 top-3.5 text-slate-400" size={16} />
                    <input value={bookingQuery} onChange={(event) => setBookingQuery(event.target.value)} placeholder="Hotel, riferimento o fornitore" className="h-11 w-full rounded-xl border border-[#0D2340]/10 pl-10 pr-3 text-sm outline-none focus:border-[#0D2340]/30" />
                  </label>
                  <select aria-label="Filtra prenotazioni per stato" value={bookingStatus} onChange={(event) => setBookingStatus(event.target.value)} className="h-11 rounded-xl border border-[#0D2340]/10 px-3 text-sm text-[#0D2340] outline-none">
                    <option value="ALL">Tutti gli stati</option>
                    <option value="CONFIRMED">Confermate</option>
                    <option value="PENDING">In elaborazione</option>
                    <option value="UNCERTAIN">Da verificare</option>
                    <option value="FAILED">Non confermate</option>
                  </select>
                  <input aria-label="Prenotazioni dal" type="date" value={bookingFrom} onChange={(event) => setBookingFrom(event.target.value)} className="h-11 rounded-xl border border-[#0D2340]/10 px-3 text-sm outline-none" />
                  <input aria-label="Prenotazioni fino al" type="date" value={bookingTo} onChange={(event) => setBookingTo(event.target.value)} className="h-11 rounded-xl border border-[#0D2340]/10 px-3 text-sm outline-none" />
                  <button type="button" disabled={!filteredBookings.length} onClick={() => exportCsv("prenotazioni-sicilytrip", ["Stato", "Riferimento", "Hotel", "Fornitore", "Check-in", "Check-out", "Creato il", "Errore fornitore", "ID"], filteredBookings.map((item) => [statusLabel(item.status), item.referenceCode, item.hotelName, item.provider, item.checkIn, item.checkOut, item.createdAt, item.providerError, item.id]))} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0D2340] px-4 text-xs font-bold text-white disabled:opacity-40"><Download size={15} /> Esporta CSV</button>
                </div>
                <div className="grid gap-4">
                  {bookings.length === 0 ? (
                    <div className="rounded-2xl bg-white p-7 text-sm text-slate-500">
                      Nessuna richiesta presente.
                    </div>
                  ) : (
                    filteredBookings.map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        loading={detailLoadingId === booking.id}
                        onOpen={() => void openBooking(booking.id)}
                      />
                    ))
                  )}
                  {bookings.length > 0 && filteredBookings.length === 0 && (
                    <div className="rounded-2xl bg-white p-7 text-sm text-slate-500">Nessuna prenotazione corrisponde ai filtri selezionati.</div>
                  )}
                </div>
                {detailError && (
                  <p role="alert" className="mt-4 text-sm text-red-600">
                    {detailError}
                  </p>
                )}
                {selectedBooking && (
                  <BookingDetailPanel
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                  />
                )}
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

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${active ? "bg-[#F58220] text-white shadow-md shadow-orange-200" : "text-[#0D2340]/60 hover:bg-[#F7F5F1]"}`}
    >
      {label}
    </button>
  );
}

function BookingCard({
  booking,
  loading,
  onOpen,
}: {
  booking: Booking;
  loading: boolean;
  onOpen: () => void;
}) {
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
        <button
          type="button"
          onClick={onOpen}
          disabled={loading}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#0D2340]/10 px-4 py-2 text-xs font-bold text-[#0D2340] disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <ExternalLink size={14} />
          )}
          Apri scheda
        </button>
      </div>
    </article>
  );
}

function BookingDetailPanel({
  booking,
  onClose,
}: {
  booking: BookingDetail;
  onClose: () => void;
}) {
  return (
    <section
      aria-label="Dettaglio prenotazione"
      className="mt-6 rounded-[28px] border border-[#0D2340]/[0.07] bg-white p-6 shadow-[0_18px_55px_rgba(13,35,64,0.07)] sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
            Scheda prenotazione
          </span>
          <h2 className="mt-2 text-2xl font-bold text-[#0D2340]">
            {booking.hotelName}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {statusLabel(booking.status)} ·{" "}
            {booking.referenceCode || "Riferimento non disponibile"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-[#F7F5F1] px-4 py-2 text-xs font-bold text-[#0D2340]"
        >
          Chiudi scheda
        </button>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Detail
          label="Soggiorno"
          value={`${date(booking.checkIn)} – ${date(booking.checkOut)}`}
        />
        <Detail label="Fornitore" value={booking.provider} />
        <Detail label="Giata ID" value={booking.giataId} />
        <Detail label="Stato ricerca" value={booking.searchStatus} />
        <Detail
          label="Totale riconfermato"
          value={
            booking.preBook?.finalPrice == null
              ? "—"
              : money(booking.preBook.finalPrice, booking.preBook.currency)
          }
        />
        <Detail
          label="Scadenza tariffa"
          value={booking.preBook?.deadlineDate || "—"}
        />
        <Detail
          label="Pagamento"
          value={
            booking.payment
              ? genericStatusLabel(booking.payment.status)
              : "Non presente"
          }
        />
        <Detail
          label="Ultimo aggiornamento"
          value={dateTime(booking.updatedAt)}
        />
      </div>
      {booking.providerError && (
        <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
          <strong>Errore fornitore:</strong> {booking.providerError}
        </div>
      )}
      <details className="mt-5 rounded-2xl bg-[#F7F5F1] p-4 text-xs text-slate-500">
        <summary className="cursor-pointer font-bold text-[#0D2340]">
          Identificativi tecnici
        </summary>
        <dl className="mt-3 grid gap-2 break-all sm:grid-cols-2">
          <div>
            <dt className="font-semibold">ID interno</dt>
            <dd>{booking.id}</dd>
          </div>
          <div>
            <dt className="font-semibold">Search ID fornitore</dt>
            <dd>{booking.providerSearchId}</dd>
          </div>
          <div>
            <dt className="font-semibold">Hotel ID fornitore</dt>
            <dd>{booking.providerHotelId}</dd>
          </div>
        </dl>
      </details>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#F7F5F1] p-4">
      <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>
      <strong className="mt-1 block text-sm text-[#0D2340]">{value}</strong>
    </div>
  );
}

function money(amount: number, currency: string) {
  if (!currency) return `${amount.toFixed(2)} —`;
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

function genericStatusLabel(status: string) {
  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/^./, (letter) => letter.toUpperCase());
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

function readRole(token: string): AdminRole {
  try {
    const encoded = token
      .split(".")[0]
      .replaceAll("-", "+")
      .replaceAll("_", "/");
    const payload = JSON.parse(
      atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, "=")),
    ) as {
      role?: AdminRole;
    };
    return payload.role ?? "SUPER_ADMIN";
  } catch {
    return "SUPER_ADMIN";
  }
}

function roleLabel(role: AdminRole) {
  return role === "SUPER_ADMIN"
    ? "Amministratore"
    : role === "CONTENT_EDITOR"
      ? "Gestore contenuti"
      : "Assistenza clienti";
}
