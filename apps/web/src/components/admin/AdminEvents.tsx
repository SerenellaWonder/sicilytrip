"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { CalendarDays, Loader2, MapPin, Plus } from "lucide-react";
import { apiFetch } from "@/lib/api";

type TourismEvent = {
  id: string;
  title: string;
  titleEn?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  location: string;
  startAt: string;
  endAt?: string | null;
  image?: string | null;
  externalUrl?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
};

const empty = {
  title: "",
  titleEn: "",
  description: "",
  descriptionEn: "",
  location: "",
  startAt: "",
  endAt: "",
  image: "",
  externalUrl: "",
  isFeatured: false,
  isPublished: false,
};

export default function AdminEvents({ token }: { token: string }) {
  const [items, setItems] = useState<TourismEvent[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setItems(
        await apiFetch<TourismEvent[]>("/admin/events", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Eventi non disponibili",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  function edit(item: TourismEvent) {
    setEditing(item.id);
    setForm({
      title: item.title,
      titleEn: item.titleEn ?? "",
      description: item.description ?? "",
      descriptionEn: item.descriptionEn ?? "",
      location: item.location,
      startAt: localDateTime(item.startAt),
      endAt: item.endAt ? localDateTime(item.endAt) : "",
      image: item.image ?? "",
      externalUrl: item.externalUrl ?? "",
      isFeatured: item.isFeatured,
      isPublished: item.isPublished,
    });
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      await apiFetch(editing ? `/admin/events/${editing}` : "/admin/events", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...form,
          startAt: new Date(form.startAt).toISOString(),
          endAt: form.endAt ? new Date(form.endAt).toISOString() : undefined,
        }),
      });
      setForm(empty);
      setEditing(undefined);
      await load();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Salvataggio non riuscito",
      );
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[360px_1fr]">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
              Turismo
            </span>
            <h2 className="mt-1 text-xl font-bold text-[#0D2340]">
              Calendario eventi
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditing(undefined);
              setForm(empty);
            }}
            className="flex items-center gap-1 text-xs font-bold text-[#F58220]"
          >
            <Plus size={15} /> Nuovo
          </button>
        </div>
        {loading && !items.length ? (
          <Loader2 className="animate-spin text-[#F58220]" />
        ) : items.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-sm leading-6 text-slate-500">
            Nessun evento inserito. Crea il primo appuntamento da mostrare nel
            Journal.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => edit(item)}
                className="w-full rounded-2xl bg-white p-4 text-left"
              >
                <span className="text-[9px] font-bold uppercase text-[#F58220]">
                  {item.isPublished ? "Pubblicato" : "Bozza"}
                  {item.isFeatured ? " · In evidenza" : ""}
                </span>
                <strong className="mt-2 block text-[#0D2340]">
                  {item.title}
                </strong>
                <span className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays size={13} /> {formatDate(item.startAt)}
                </span>
                <span className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <MapPin size={13} /> {item.location}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      <form onSubmit={save} className="rounded-[24px] bg-white p-6">
        <h2 className="text-xl font-bold text-[#0D2340]">
          {editing ? "Modifica evento" : "Nuovo evento"}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Titolo italiano"
            value={form.title}
            onChange={(title) => setForm({ ...form, title })}
          />
          <Field
            label="Titolo inglese"
            value={form.titleEn}
            onChange={(titleEn) => setForm({ ...form, titleEn })}
            required={false}
          />
          <Field
            label="Località"
            value={form.location}
            onChange={(location) => setForm({ ...form, location })}
          />
          <Field
            label="Immagine"
            value={form.image}
            onChange={(image) => setForm({ ...form, image })}
            required={false}
            placeholder="/images/evento.jpg"
          />
          <Field
            label="Inizio"
            type="datetime-local"
            value={form.startAt}
            onChange={(startAt) => setForm({ ...form, startAt })}
          />
          <Field
            label="Fine"
            type="datetime-local"
            value={form.endAt}
            onChange={(endAt) => setForm({ ...form, endAt })}
            required={false}
          />
          <Field
            label="Link ufficiale"
            type="url"
            value={form.externalUrl}
            onChange={(externalUrl) => setForm({ ...form, externalUrl })}
            required={false}
            placeholder="https://"
          />
        </div>
        <Area
          label="Descrizione italiana"
          value={form.description}
          onChange={(description) => setForm({ ...form, description })}
        />
        <Area
          label="Descrizione inglese"
          value={form.descriptionEn}
          onChange={(descriptionEn) => setForm({ ...form, descriptionEn })}
        />
        <div className="mt-5 flex flex-wrap gap-5 text-sm text-[#0D2340]">
          <Check
            label="Mostra in evidenza"
            checked={form.isFeatured}
            onChange={(isFeatured) => setForm({ ...form, isFeatured })}
          />
          <Check
            label="Pubblica nel Journal"
            checked={form.isPublished}
            onChange={(isPublished) => setForm({ ...form, isPublished })}
          />
        </div>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
        <button
          disabled={loading}
          className="mt-6 rounded-full bg-[#F58220] px-7 py-3 text-xs font-bold text-white disabled:opacity-60"
        >
          Salva evento
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = true,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-[#F58220]/60"
      />
    </label>
  );
}
function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-4 block text-xs font-semibold text-[#0D2340]">
      {label}
      <textarea
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-[#F58220]/60"
      />
    </label>
  );
}
function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="accent-[#F58220]"
      />
      {label}
    </label>
  );
}
function localDateTime(value: string) {
  const date = new Date(value);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}
function formatDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
