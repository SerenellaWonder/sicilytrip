"use client";

import { CheckCircle2, Loader2, ShieldAlert, Users } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

import { apiFetch } from "@/lib/api";

type Guest = {
  title: string;
  firstName: string;
  lastName: string;
  age?: string;
};

type GuestDetails = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  leadIsGuest: boolean;
  dataProcessingAccepted: boolean;
  rooms: GuestRoom[];
};

type GuestRoom = {
  adults: Guest[];
  children: Guest[];
};

type StoredSearch = {
  search?: {
    adults?: number;
    children?: number;
    rooms?: Array<{ adults: number; children: number }>;
  };
};

const EMPTY_GUEST: Guest = {
  title: "Sig.",
  firstName: "",
  lastName: "",
};

export default function GuestDetailsForm({
  searchId,
  hotelId,
  rateId,
  disabled,
  preBook,
}: {
  searchId: string;
  hotelId: string;
  rateId: string;
  disabled: boolean;
  preBook: {
    preBookId?: string;
  };
}) {
  const storageKey = `hotel-guests:${searchId}:${hotelId}:${rateId}`;
  const attemptStorageKey = `hotel-book-attempt:${searchId}:${hotelId}:${rateId}`;
  const [details, setDetails] = useState<GuestDetails>(() =>
    createEmptyDetails([{ adults: 2, children: 0 }]),
  );
  const [saved, setSaved] = useState(false);
  const [booking, setBooking] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [bookError, setBookError] = useState("");
  const [refCode, setRefCode] = useState("");
  const requestStarted = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedDetails = sessionStorage.getItem(storageKey);

        if (savedDetails) {
          const parsed = JSON.parse(savedDetails) as GuestDetails & {
            adults?: Guest[];
            children?: Guest[];
          };
          setDetails({
            ...parsed,
            rooms: parsed.rooms ?? [
              {
                adults: parsed.adults ?? [],
                children: parsed.children ?? [],
              },
            ],
            leadIsGuest: parsed.leadIsGuest ?? true,
            dataProcessingAccepted: parsed.dataProcessingAccepted ?? false,
          });
        } else {
          const storedSearch = sessionStorage.getItem(
            `hotel-search:${searchId}`,
          );
          const parsedSearch = storedSearch
            ? (JSON.parse(storedSearch) as StoredSearch)
            : null;

          setDetails(
            createEmptyDetails(
              parsedSearch?.search?.rooms ?? [
                {
                  adults: parsedSearch?.search?.adults ?? 2,
                  children: parsedSearch?.search?.children ?? 0,
                },
              ],
            ),
          );
        }

        const storedAttempt = sessionStorage.getItem(attemptStorageKey);

        if (storedAttempt) {
          const parsedAttempt = JSON.parse(storedAttempt) as {
            status?: string;
            refCode?: string;
          };
          setAttempted(true);
          setRefCode(parsedAttempt.refCode ?? "");
          if (parsedAttempt.status !== "CONFIRMED") {
            setBookError(
              "La richiesta è già stata inviata. Non ripeterla: l’esito deve essere verificato con il fornitore.",
            );
          }
        }
      } catch (error) {
        console.error("Unable to restore guest details:", error);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [attemptStorageKey, searchId, storageKey]);

  function updateField(
    field: keyof Omit<GuestDetails, "rooms">,
    value: string,
  ) {
    setSaved(false);
    setDetails((current) => {
      const next = { ...current, [field]: value };

      if (
        current.leadIsGuest &&
        (field === "title" || field === "firstName" || field === "lastName")
      ) {
        next.rooms = current.rooms.map((room, roomIndex) => ({
          ...room,
          adults: room.adults.map((guest, guestIndex) =>
            roomIndex === 0 && guestIndex === 0
              ? { ...guest, [field]: value }
              : guest,
          ),
        }));
      }

      return next;
    });
  }

  function updateBoolean(
    field: "leadIsGuest" | "dataProcessingAccepted",
    value: boolean,
  ) {
    setSaved(false);
    setDetails((current) => {
      const next = { ...current, [field]: value };

      if (field === "leadIsGuest" && value) {
        next.rooms = current.rooms.map((room, roomIndex) => ({
          ...room,
          adults: room.adults.map((guest, guestIndex) =>
            roomIndex === 0 && guestIndex === 0
              ? {
                  ...guest,
                  title: current.title,
                  firstName: current.firstName,
                  lastName: current.lastName,
                }
              : guest,
          ),
        }));
      }

      return next;
    });
  }

  function updateGuest(
    roomIndex: number,
    group: "adults" | "children",
    index: number,
    field: keyof Guest,
    value: string,
  ) {
    setSaved(false);
    setDetails((current) => ({
      ...current,
      rooms: current.rooms.map((room, currentRoomIndex) =>
        currentRoomIndex === roomIndex
          ? {
              ...room,
              [group]: room[group].map((guest, guestIndex) =>
                guestIndex === index ? { ...guest, [field]: value } : guest,
              ),
            }
          : room,
      ),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (disabled || attempted || requestStarted.current) {
      return;
    }

    sessionStorage.setItem(storageKey, JSON.stringify(details));
    setSaved(true);

    requestStarted.current = true;
    setAttempted(true);
    setBooking(true);
    setBookError("");
    sessionStorage.setItem(
      attemptStorageKey,
      JSON.stringify({ status: "PENDING" }),
    );

    try {
      const response = await apiFetch<{ Error?: string; RefCode?: string }>(
        "/hotels/book",
        {
          method: "POST",
          body: JSON.stringify({
            searchId,
            hotelId,
            rateId,
            customerEmail: details.email.trim(),
            Names: buildNames(details),
            preBookId: preBook.preBookId ?? "",
          }),
        },
      );

      if (response.Error || !response.RefCode) {
        throw new Error(
          response.Error ||
            "Il fornitore non ha restituito il codice di conferma.",
        );
      }

      setRefCode(response.RefCode);
      sessionStorage.removeItem(storageKey);
      sessionStorage.setItem(
        attemptStorageKey,
        JSON.stringify({ status: "CONFIRMED", refCode: response.RefCode }),
      );
    } catch (error) {
      setBookError(
        `${
          error instanceof Error
            ? error.message
            : "Non è stato possibile determinare l’esito della prenotazione."
        } Non ripetere la richiesta: verifica la pratica con il fornitore.`,
      );
      sessionStorage.setItem(
        attemptStorageKey,
        JSON.stringify({ status: "VERIFY" }),
      );
    } finally {
      setBooking(false);
    }
  }

  return (
    <section className="mt-7 rounded-[26px] bg-white p-7 shadow-[0_12px_40px_rgba(13,35,64,0.05)]">
      <div className="flex items-start gap-3">
        <Users size={22} className="mt-0.5 shrink-0 text-[#F58220]" />
        <div>
          <h2 className="text-2xl font-semibold text-[#0D2340]">
            Dati della prenotazione
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Inserisci i dati dell&apos;intestatario e i nominativi degli ospiti.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-7">
        <fieldset disabled={disabled} className="disabled:opacity-60">
          <legend className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Intestatario e contatti
          </legend>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SelectField
              label="Titolo"
              value={details.title}
              onChange={(value) => updateField("title", value)}
              options={["Sig.", "Sig.ra"]}
            />
            <InputField
              label="Nome"
              value={details.firstName}
              onChange={(value) => updateField("firstName", value)}
              autoComplete="given-name"
            />
            <InputField
              label="Cognome"
              value={details.lastName}
              onChange={(value) => updateField("lastName", value)}
              autoComplete="family-name"
            />
            <InputField
              label="Email"
              type="email"
              value={details.email}
              onChange={(value) => updateField("email", value)}
              autoComplete="email"
            />
            <InputField
              label="Telefono"
              type="tel"
              value={details.phone}
              onChange={(value) => updateField("phone", value)}
              autoComplete="tel"
            />
            <InputField
              label="Paese di residenza"
              value={details.country}
              onChange={(value) => updateField("country", value)}
              autoComplete="country-name"
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={details.leadIsGuest}
              onChange={(event) =>
                updateBoolean("leadIsGuest", event.target.checked)
              }
              className="mt-0.5 size-4 accent-[#F58220]"
            />
            L&apos;intestatario è il primo ospite adulto.
          </label>

          {details.rooms.map((room, roomIndex) => (
            <div
              key={`booking-room-${roomIndex}`}
              className="mt-8 rounded-2xl border border-[#0D2340]/[0.06] p-5"
            >
              <h3 className="text-base font-semibold text-[#0D2340]">
                Camera {roomIndex + 1}
              </h3>
              <GuestGroup
                title="Adulti"
                guests={room.adults}
                group="adults"
                roomIndex={roomIndex}
                onChange={updateGuest}
                firstGuestLocked={details.leadIsGuest && roomIndex === 0}
              />
              {room.children.length > 0 && (
                <GuestGroup
                  title="Bambini"
                  guests={room.children}
                  group="children"
                  roomIndex={roomIndex}
                  onChange={updateGuest}
                  firstGuestLocked={false}
                />
              )}
            </div>
          ))}
        </fieldset>

        <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#F7F5F1] p-5 text-xs leading-5 text-slate-600">
          <input
            required
            type="checkbox"
            disabled={disabled}
            checked={details.dataProcessingAccepted}
            onChange={(event) =>
              updateBoolean("dataProcessingAccepted", event.target.checked)
            }
            className="mt-0.5 size-4 shrink-0 accent-[#F58220]"
          />
          Autorizzo l&apos;utilizzo dei dati inseriti esclusivamente per gestire
          questa richiesta di prenotazione.
        </label>

        <div className="mt-7 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-5 text-slate-500">
            Premendo conferma la richiesta verrà inviata una sola volta. In caso
            di errore non verrà effettuato alcun tentativo automatico.
          </p>

          <button
            type="submit"
            disabled={disabled || attempted || booking}
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#F58220] px-7 text-[10px] font-bold uppercase tracking-[0.13em] text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {booking ? (
              <>
                <Loader2 size={15} className="mr-2 animate-spin" />
                Invio in corso...
              </>
            ) : refCode ? (
              "Prenotazione confermata"
            ) : attempted ? (
              "Richiesta già inviata"
            ) : (
              "Conferma prenotazione"
            )}
          </button>
        </div>

        {saved && !attempted && (
          <div
            className="mt-5 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
            role="status"
          >
            <CheckCircle2 size={18} />
            Dati salvati correttamente in questa sessione.
          </div>
        )}

        {refCode && (
          <div
            className="mt-5 rounded-2xl bg-emerald-50 px-5 py-5 text-emerald-800"
            role="status"
          >
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 size={20} />
              Prenotazione confermata
            </div>
            <p className="mt-2 text-sm">
              Codice di riferimento: <strong>{refCode}</strong>
            </p>
            <p className="mt-3 text-xs leading-5 text-emerald-700">
              I dati degli ospiti salvati nel browser sono stati rimossi dopo la
              conferma.
            </p>
            <Link
              href="/area-clienti"
              className="mt-4 inline-flex rounded-full bg-emerald-700 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white"
            >
              Vai alle tue prenotazioni
            </Link>
          </div>
        )}

        {bookError && (
          <div
            className="mt-5 flex items-start gap-3 rounded-2xl bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900"
            role="alert"
          >
            <ShieldAlert size={20} className="mt-0.5 shrink-0" />
            <p>{bookError}</p>
          </div>
        )}
      </form>
    </section>
  );
}

function GuestGroup({
  title,
  guests,
  group,
  roomIndex,
  onChange,
  firstGuestLocked,
}: {
  title: string;
  guests: Guest[];
  group: "adults" | "children";
  roomIndex: number;
  onChange: (
    roomIndex: number,
    group: "adults" | "children",
    index: number,
    field: keyof Guest,
    value: string,
  ) => void;
  firstGuestLocked: boolean;
}) {
  return (
    <div className="mt-8 border-t border-slate-100 pt-7">
      <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
        {title}
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {guests.map((guest, index) => (
          <div
            key={`${group}-${index}`}
            className="rounded-2xl bg-[#F7F5F1] p-5"
          >
            <p className="mb-4 text-xs font-semibold text-[#0D2340]">
              {group === "adults" ? "Adulto" : "Bambino"} {index + 1}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Titolo"
                value={guest.title}
                onChange={(value) =>
                  onChange(roomIndex, group, index, "title", value)
                }
                options={["Sig.", "Sig.ra"]}
              />
              <InputField
                label="Nome"
                value={guest.firstName}
                onChange={(value) =>
                  onChange(roomIndex, group, index, "firstName", value)
                }
                readOnly={firstGuestLocked && index === 0}
              />
              <InputField
                label="Cognome"
                value={guest.lastName}
                onChange={(value) =>
                  onChange(roomIndex, group, index, "lastName", value)
                }
                readOnly={firstGuestLocked && index === 0}
              />
              {group === "children" && (
                <InputField
                  label="Età"
                  type="number"
                  value={guest.age ?? ""}
                  onChange={(value) =>
                    onChange(roomIndex, group, index, "age", value)
                  }
                  min="0"
                  max="17"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  readOnly = false,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  readOnly?: boolean;
  min?: string;
  max?: string;
}) {
  return (
    <label className="block text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        required
        type={type}
        value={value}
        autoComplete={autoComplete}
        readOnly={readOnly}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-[#0D2340]/10 bg-white px-4 text-sm font-normal outline-none transition focus:border-[#0D2340]/25 focus:ring-2 focus:ring-[#0D2340]/[0.04] read-only:bg-slate-100 read-only:text-slate-500"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-xs font-semibold text-[#0D2340]">
      {label}
      <select
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-[#0D2340]/10 bg-white px-4 text-sm font-normal outline-none transition focus:border-[#0D2340]/25 focus:ring-2 focus:ring-[#0D2340]/[0.04]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function createEmptyDetails(
  rooms: Array<{ adults: number; children: number }>,
): GuestDetails {
  return {
    title: "Sig.",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Italia",
    leadIsGuest: true,
    dataProcessingAccepted: false,
    rooms: rooms.map((room) => ({
      adults: Array.from({ length: Math.max(1, room.adults) }, () => ({
        ...EMPTY_GUEST,
      })),
      children: Array.from({ length: Math.max(0, room.children) }, () => ({
        ...EMPTY_GUEST,
        age: "",
      })),
    })),
  };
}

function buildNames(details: GuestDetails) {
  let absolutePaxNumber = 0;

  return details.rooms.map((room, roomIndex) => {
    const adults = room.adults.map((guest, index) => ({
      Title: toProviderTitle(guest.title),
      Name: guest.firstName.trim(),
      LastName: guest.lastName.trim(),
      Type: "Adult",
      AbosultePaxNumber: ++absolutePaxNumber,
      RelativePaxNumber: index + 1,
    }));

    const children = room.children.map((guest, index) => ({
      Title: toProviderTitle(guest.title),
      Name: guest.firstName.trim(),
      LastName: guest.lastName.trim(),
      Type: "Child",
      AbosultePaxNumber: ++absolutePaxNumber,
      RelativePaxNumber: index + 1,
    }));

    return { Cam: roomIndex + 1, Paxes: [...adults, ...children] };
  });
}

function toProviderTitle(title: string) {
  return title === "Sig.ra" ? "Mrs" : "Mr";
}
