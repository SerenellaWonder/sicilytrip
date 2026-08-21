"use client";

import { CheckCircle2, Users } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type Guest = {
  firstName: string;
  lastName: string;
};

type GuestDetails = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  adults: Guest[];
  children: Guest[];
};

type StoredSearch = {
  search?: {
    adults?: number;
    children?: number;
  };
};

const EMPTY_GUEST: Guest = {
  firstName: "",
  lastName: "",
};

export default function GuestDetailsForm({
  searchId,
  hotelId,
  rateId,
  disabled,
}: {
  searchId: string;
  hotelId: string;
  rateId: string;
  disabled: boolean;
}) {
  const storageKey = `hotel-guests:${searchId}:${hotelId}:${rateId}`;
  const [details, setDetails] = useState<GuestDetails>(() =>
    createEmptyDetails(2, 0)
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const savedDetails = sessionStorage.getItem(storageKey);

      if (savedDetails) {
        setDetails(JSON.parse(savedDetails) as GuestDetails);
        return;
      }

      const storedSearch = sessionStorage.getItem(
        `hotel-search:${searchId}`
      );
      const parsedSearch = storedSearch
        ? (JSON.parse(storedSearch) as StoredSearch)
        : null;

      setDetails(
        createEmptyDetails(
          parsedSearch?.search?.adults ?? 2,
          parsedSearch?.search?.children ?? 0
        )
      );
    } catch (error) {
      console.error("Unable to restore guest details:", error);
    }
  }, [searchId, storageKey]);

  function updateField(
    field: keyof Omit<GuestDetails, "adults" | "children">,
    value: string
  ) {
    setSaved(false);
    setDetails(current => ({ ...current, [field]: value }));
  }

  function updateGuest(
    group: "adults" | "children",
    index: number,
    field: keyof Guest,
    value: string
  ) {
    setSaved(false);
    setDetails(current => ({
      ...current,
      [group]: current[group].map((guest, guestIndex) =>
        guestIndex === index ? { ...guest, [field]: value } : guest
      ),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (disabled) {
      return;
    }

    sessionStorage.setItem(storageKey, JSON.stringify(details));
    setSaved(true);
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
              onChange={value => updateField("title", value)}
              options={["Sig.", "Sig.ra"]}
            />
            <InputField
              label="Nome"
              value={details.firstName}
              onChange={value => updateField("firstName", value)}
              autoComplete="given-name"
            />
            <InputField
              label="Cognome"
              value={details.lastName}
              onChange={value => updateField("lastName", value)}
              autoComplete="family-name"
            />
            <InputField
              label="Email"
              type="email"
              value={details.email}
              onChange={value => updateField("email", value)}
              autoComplete="email"
            />
            <InputField
              label="Telefono"
              type="tel"
              value={details.phone}
              onChange={value => updateField("phone", value)}
              autoComplete="tel"
            />
            <InputField
              label="Paese di residenza"
              value={details.country}
              onChange={value => updateField("country", value)}
              autoComplete="country-name"
            />
          </div>

          <GuestGroup
            title="Adulti"
            guests={details.adults}
            group="adults"
            onChange={updateGuest}
          />

          {details.children.length > 0 && (
            <GuestGroup
              title="Bambini"
              guests={details.children}
              group="children"
              onChange={updateGuest}
            />
          )}
        </fieldset>

        <div className="mt-7 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-5 text-slate-500">
            I dati restano salvati solo in questa sessione. La prenotazione non verrà inviata finché non sarà collegato il passaggio finale HotelBook.
          </p>

          <button
            type="submit"
            disabled={disabled}
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#F58220] px-7 text-[10px] font-bold uppercase tracking-[0.13em] text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Salva dati ospiti
          </button>
        </div>

        {saved && (
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
            <CheckCircle2 size={18} />
            Dati salvati correttamente in questa sessione.
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
  onChange,
}: {
  title: string;
  guests: Guest[];
  group: "adults" | "children";
  onChange: (
    group: "adults" | "children",
    index: number,
    field: keyof Guest,
    value: string
  ) => void;
}) {
  return (
    <div className="mt-8 border-t border-slate-100 pt-7">
      <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
        {title}
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {guests.map((guest, index) => (
          <div key={`${group}-${index}`} className="rounded-2xl bg-[#F7F5F1] p-5">
            <p className="mb-4 text-xs font-semibold text-[#0D2340]">
              {group === "adults" ? "Adulto" : "Bambino"} {index + 1}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Nome"
                value={guest.firstName}
                onChange={value => onChange(group, index, "firstName", value)}
              />
              <InputField
                label="Cognome"
                value={guest.lastName}
                onChange={value => onChange(group, index, "lastName", value)}
              />
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        required
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={event => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-[#0D2340]/10 bg-white px-4 text-sm font-normal outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/10"
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
        onChange={event => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-[#0D2340]/10 bg-white px-4 text-sm font-normal outline-none transition focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/10"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function createEmptyDetails(adults: number, children: number): GuestDetails {
  return {
    title: "Sig.",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Italia",
    adults: Array.from({ length: Math.max(1, adults) }, () => ({
      ...EMPTY_GUEST,
    })),
    children: Array.from({ length: Math.max(0, children) }, () => ({
      ...EMPTY_GUEST,
    })),
  };
}
