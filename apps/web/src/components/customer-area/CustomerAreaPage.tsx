"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Loader2,
  LogOut,
  RotateCcw,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/i18n/LanguageProvider";

type Booking = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "FAILED" | "UNCERTAIN";
  referenceCode?: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  createdAt: string;
};

const SESSION_KEY = "sicilytrip-customer-session";

export default function CustomerAreaPage() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"EMAIL" | "CODE" | "BOOKINGS">("EMAIL");
  const [token, setToken] = useState("");
  const [developmentCode, setDevelopmentCode] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedToken = sessionStorage.getItem(SESSION_KEY);
      if (storedToken) {
        setToken(storedToken);
        void loadBookings(storedToken);
      }
    }, 0);

    return () => window.clearTimeout(timer);
    // Il ripristino deve avvenire una sola volta all’apertura dell’area.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendCooldown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  async function loadBookings(sessionToken: string) {
    try {
      setLoading(true);
      const results = await apiFetch<Booking[]>("/customer-area/bookings", {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      setBookings(results);
      setStep("BOOKINGS");
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
      setToken("");
      setStep("EMAIL");
      setError(isEnglish ? "The session has expired. Request a new access code." : "La sessione è scaduta. Richiedi un nuovo codice di accesso.");
    } finally {
      setLoading(false);
    }
  }

  async function requestCode(event: FormEvent) {
    event.preventDefault();
    await sendCode();
  }

  async function sendCode() {
    try {
      setLoading(true);
      setError("");
      const response = await apiFetch<{
        message: string;
        developmentCode?: string;
      }>("/customer-area/request-code", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setDevelopmentCode(response.developmentCode ?? "");
      setCode("");
      setResendCooldown(60);
      setStep("CODE");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : isEnglish ? "Unable to request the code." : "Non è stato possibile richiedere il codice.",
      );
    } finally {
      setLoading(false);
    }
  }

  function changeEmail() {
    setCode("");
    setDevelopmentCode("");
    setResendCooldown(0);
    setError("");
    setStep("EMAIL");
  }

  async function verifyCode(event: FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await apiFetch<{ token: string; expiresIn: number }>(
        "/customer-area/verify-code",
        {
          method: "POST",
          body: JSON.stringify({ email, code }),
        },
      );
      sessionStorage.setItem(SESSION_KEY, response.token);
      setToken(response.token);
      await loadBookings(response.token);
    } catch (verifyError) {
      setError(
        verifyError instanceof Error
          ? verifyError.message
          : isEnglish ? "The code is invalid." : "Il codice non è valido.",
      );
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setToken("");
    setBookings([]);
    setCode("");
    setStep("EMAIL");
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F7F5F1] px-5 pb-24 pt-[130px]">
      <div className="mx-auto max-w-[920px]">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F58220]">
          SicilyTrip
        </span>
        <div className="mt-3 flex items-start justify-between gap-5">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#0D2340] sm:text-5xl">
              {isEnglish ? "Your bookings" : "Le tue prenotazioni"}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              {isEnglish ? "Sign in with the temporary code sent to the same email used for the booking." : "Accedi con il codice temporaneo inviato alla stessa email usata per la prenotazione."}
            </p>
          </div>
          {token && (
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500"
            >
              <LogOut size={17} /> {isEnglish ? "Sign out" : "Esci"}
            </button>
          )}
        </div>

        {step !== "BOOKINGS" ? (
          <section className="mt-10 max-w-xl rounded-[26px] bg-white p-7 shadow-[0_12px_40px_rgba(13,35,64,0.06)]">
            <KeyRound size={25} className="text-[#F58220]" />
            {step === "EMAIL" ? (
              <form onSubmit={requestCode} className="mt-6">
                <Field
                  label={isEnglish ? "Booking email" : "Email della prenotazione"}
                  type="email"
                  value={email}
                  onChange={setEmail}
                />
                <SubmitButton loading={loading}>{isEnglish ? "Send code" : "Invia codice"}</SubmitButton>
              </form>
            ) : (
              <form onSubmit={verifyCode} className="mt-6">
                <p className="mb-5 text-sm leading-6 text-slate-500">
                  {isEnglish ? "Enter the six-digit code sent to" : "Inserisci il codice di sei cifre inviato a"}{" "}
                  <strong className="text-[#0D2340]">{maskEmail(email)}</strong>
                  {isEnglish ? ". It expires after 10 minutes and can be used only once." : ". Scade dopo 10 minuti e può essere utilizzato una sola volta."}
                </p>
                {developmentCode && (
                  <p className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    {isEnglish ? "Local test code" : "Codice locale di prova"}: <strong>{developmentCode}</strong>
                  </p>
                )}
                <Field
                  label={isEnglish ? "Temporary code" : "Codice temporaneo"}
                  value={code}
                  onChange={setCode}
                  inputMode="numeric"
                  maxLength={6}
                />
                <SubmitButton loading={loading}>{isEnglish ? "Sign in" : "Accedi"}</SubmitButton>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={changeEmail}
                    disabled={loading}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 disabled:opacity-50"
                  >
                    <ArrowLeft size={14} /> {isEnglish ? "Change email" : "Cambia email"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void sendCode()}
                    disabled={loading || resendCooldown > 0}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#F58220] disabled:text-slate-400"
                  >
                    <RotateCcw size={14} />
                    {resendCooldown > 0
                      ? isEnglish ? `New code in ${resendCooldown}s` : `Nuovo codice tra ${resendCooldown}s`
                      : isEnglish ? "Send a new code" : "Invia un nuovo codice"}
                  </button>
                </div>
              </form>
            )}
            {error && (
              <p role="alert" className="mt-5 text-sm text-red-600">
                {error}
              </p>
            )}
          </section>
        ) : (
          <section className="mt-10 grid gap-5">
            {bookings.length === 0 ? (
              <div className="rounded-[26px] bg-white p-8 text-sm text-slate-500">
                {isEnglish ? "No bookings are associated with this email." : "Non risultano prenotazioni associate a questa email."}
              </div>
            ) : (
              bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} isEnglish={isEnglish} />
              ))
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function BookingCard({ booking, isEnglish }: { booking: Booking; isEnglish: boolean }) {
  const confirmed = booking.status === "CONFIRMED";
  return (
    <article className="rounded-[26px] bg-white p-7 shadow-[0_12px_40px_rgba(13,35,64,0.05)]">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#0D2340]">
            {confirmed && (
              <CheckCircle2 size={18} className="text-emerald-600" />
            )}
            {statusLabel(booking.status, isEnglish)}
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-[#0D2340]">
            {booking.hotelName}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {formatDate(booking.checkIn, isEnglish ? "en-GB" : "it-IT")} – {formatDate(booking.checkOut, isEnglish ? "en-GB" : "it-IT")}
          </p>
        </div>
        {booking.referenceCode && (
          <div className="rounded-2xl bg-[#F7F5F1] px-5 py-4 sm:text-right">
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {isEnglish ? "Reference" : "Riferimento"}
            </span>
            <strong className="mt-1 block text-lg text-[#0D2340]">
              {booking.referenceCode}
            </strong>
          </div>
        )}
      </div>
    </article>
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
  type?: string;
  inputMode?: "numeric";
  maxLength?: number;
}) {
  return (
    <label className="block text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
        className="mt-2 h-12 w-full rounded-xl border border-[#0D2340]/10 px-4 text-sm outline-none focus:border-[#0D2340]/25 focus:ring-2 focus:ring-[#0D2340]/[0.04]"
      />
    </label>
  );
}

function SubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      disabled={loading}
      className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#F58220] px-7 text-[10px] font-bold uppercase tracking-[0.13em] text-white disabled:opacity-60"
    >
      {loading && <Loader2 size={15} className="mr-2 animate-spin" />}
      {children}
    </button>
  );
}

function formatDate(value: string, locale: "it-IT" | "en-GB") {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function maskEmail(value: string) {
  const [localPart, domain] = value.split("@");

  if (!localPart || !domain) {
    return value;
  }

  const visible = localPart.slice(0, Math.min(2, localPart.length));
  return `${visible}${"•".repeat(Math.max(3, localPart.length - visible.length))}@${domain}`;
}

function statusLabel(status: Booking["status"], isEnglish: boolean) {
  if (status === "CONFIRMED") return isEnglish ? "Booking confirmed" : "Prenotazione confermata";
  if (status === "FAILED") return isEnglish ? "Booking not confirmed" : "Prenotazione non confermata";
  if (status === "UNCERTAIN") return isEnglish ? "Booking requires verification" : "Prenotazione da verificare";
  return isEnglish ? "Booking in progress" : "Prenotazione in elaborazione";
}
