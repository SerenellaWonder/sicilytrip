"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Building2, Pencil, Plus, RefreshCw, Star, X } from "lucide-react";
import { apiFetch } from "@/lib/api";

type Destination = { id: string; name: string; municipalityId: string };
type Hotel = {
  id: string;
  name: string;
  slug: string;
  destinationId: string;
  municipalityId: string | null;
  shortDescription: string | null;
  longDescription: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  starRating: number | null;
  mainImageUrl: string | null;
  isActive: boolean;
  destination: { name: string };
};
type FormState = {
  name: string;
  slug: string;
  destinationId: string;
  shortDescription: string;
  longDescription: string;
  address: string;
  latitude: string;
  longitude: string;
  starRating: string;
  mainImageUrl: string;
  isActive: boolean;
};
const EMPTY: FormState = {
  name: "",
  slug: "",
  destinationId: "",
  shortDescription: "",
  longDescription: "",
  address: "",
  latitude: "",
  longitude: "",
  starRating: "",
  mainImageUrl: "",
  isActive: true,
};

export default function AdminHotels({ token }: { token: string }) {
  const [items, setItems] = useState<Hotel[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const headers = { Authorization: `Bearer ${token}` };
      const [hotels, places] = await Promise.all([
        apiFetch<Hotel[]>("/admin/hotels", { headers }),
        apiFetch<Destination[]>("/admin/destinations", { headers }),
      ]);
      setItems(hotels);
      setDestinations(places);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Hotel non disponibili",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);
  function create() {
    setEditing(null);
    setForm({ ...EMPTY, destinationId: destinations[0]?.id ?? "" });
    setOpen(true);
    setError("");
  }
  function edit(item: Hotel) {
    setEditing(item.id);
    setForm({
      name: item.name,
      slug: item.slug,
      destinationId: item.destinationId,
      shortDescription: item.shortDescription ?? "",
      longDescription: item.longDescription ?? "",
      address: item.address ?? "",
      latitude: item.latitude === null ? "" : String(item.latitude),
      longitude: item.longitude === null ? "" : String(item.longitude),
      starRating: item.starRating === null ? "" : String(item.starRating),
      mainImageUrl: item.mainImageUrl ?? "",
      isActive: item.isActive,
    });
    setOpen(true);
    setError("");
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      const destination = destinations.find(
        (item) => item.id === form.destinationId,
      );
      await apiFetch(editing ? `/admin/hotels/${editing}` : "/admin/hotels", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...form,
          slug: slugify(form.slug || form.name),
          municipalityId: destination?.municipalityId,
          latitude: form.latitude ? Number(form.latitude) : undefined,
          longitude: form.longitude ? Number(form.longitude) : undefined,
          starRating: form.starRating ? Number(form.starRating) : undefined,
        }),
      });
      setOpen(false);
      await load();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Salvataggio non riuscito",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0D2340]">Hotel</h2>
          <p className="mt-1 text-sm text-slate-500">
            Gestisci il catalogo delle strutture SicilyTrip.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="flex items-center gap-2 text-xs font-semibold text-[#0D2340]"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />{" "}
            Aggiorna
          </button>
          <button
            type="button"
            onClick={create}
            disabled={!destinations.length}
            className="flex items-center gap-2 rounded-full bg-[#F58220] px-5 py-3 text-xs font-bold text-white disabled:opacity-50"
          >
            <Plus size={16} /> Nuovo hotel
          </button>
        </div>
      </div>
      {error && !open && (
        <p role="alert" className="mb-5 text-sm text-red-600">
          {error}
        </p>
      )}
      {!loading && !destinations.length && (
        <p className="mb-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
          Prima di inserire un hotel crea almeno una destinazione.
        </p>
      )}
      {!items.length ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Nessun hotel presente nel catalogo.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-[24px] bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0D2340]/[0.06] text-[#0D2340]">
                  <Building2 size={20} />
                </div>
                <span
                  className={`rounded-full px-3 py-2 text-[9px] font-bold uppercase ${item.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                >
                  {item.isActive ? "Attivo" : "Non attivo"}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0D2340]">
                {item.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-[#F58220]">
                {item.destination.name}
              </p>
              <div className="mt-3 flex gap-1 text-amber-500">
                {Array.from({ length: item.starRating ?? 0 }, (_, index) => (
                  <Star key={index} size={13} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500">
                {item.shortDescription ||
                  item.address ||
                  "Descrizione da inserire."}
              </p>
              <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => edit(item)}
                  className="flex items-center gap-2 text-xs font-bold text-[#F58220]"
                >
                  <Pencil size={15} /> Modifica
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D2340]/60 p-5 backdrop-blur-sm">
          <form
            onSubmit={save}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-white p-7 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F58220]">
                  Catalogo strutture
                </span>
                <h3 className="mt-1 text-2xl font-bold text-[#0D2340]">
                  {editing ? "Modifica hotel" : "Nuovo hotel"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-500"
                aria-label="Chiudi"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label="Nome"
                value={form.name}
                onChange={(name) => setForm({ ...form, name })}
                required
              />
              <Field
                label="Slug"
                value={form.slug}
                onChange={(slug) => setForm({ ...form, slug })}
                placeholder={slugify(form.name)}
              />
              <label className="block text-xs font-semibold text-[#0D2340]">
                Destinazione
                <select
                  value={form.destinationId}
                  onChange={(event) =>
                    setForm({ ...form, destinationId: event.target.value })
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-[#0D2340]/10 bg-white px-4"
                >
                  {destinations.map((destination) => (
                    <option key={destination.id} value={destination.id}>
                      {destination.name}
                    </option>
                  ))}
                </select>
              </label>
              <Field
                label="Categoria (stelle)"
                value={form.starRating}
                onChange={(starRating) => setForm({ ...form, starRating })}
                type="number"
                min="1"
                max="5"
              />
              <Field
                label="Indirizzo"
                value={form.address}
                onChange={(address) => setForm({ ...form, address })}
              />
              <Field
                label="Immagine principale (URL)"
                value={form.mainImageUrl}
                onChange={(mainImageUrl) => setForm({ ...form, mainImageUrl })}
                type="url"
              />
              <Field
                label="Latitudine"
                value={form.latitude}
                onChange={(latitude) => setForm({ ...form, latitude })}
                type="number"
                step="any"
              />
              <Field
                label="Longitudine"
                value={form.longitude}
                onChange={(longitude) => setForm({ ...form, longitude })}
                type="number"
                step="any"
              />
            </div>
            <Area
              label="Descrizione breve"
              value={form.shortDescription}
              onChange={(shortDescription) =>
                setForm({ ...form, shortDescription })
              }
              rows={3}
            />
            <Area
              label="Descrizione completa"
              value={form.longDescription}
              onChange={(longDescription) =>
                setForm({ ...form, longDescription })
              }
              rows={6}
            />
            <label className="mt-5 flex items-center gap-3 text-sm font-semibold text-[#0D2340]">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) =>
                  setForm({ ...form, isActive: event.target.checked })
                }
                className="size-4 accent-[#F58220]"
              />
              Hotel attivo
            </label>
            {error && (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {error}
              </p>
            )}
            <button
              disabled={saving}
              className="mt-6 rounded-full bg-[#F58220] px-7 py-3 text-xs font-bold text-white disabled:opacity-60"
            >
              {saving ? "Salvataggio…" : "Salva hotel"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  step?: string;
  min?: string;
  max?: string;
}) {
  const { label, value, onChange, ...input } = props;
  return (
    <label className="block text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...input}
        className="mt-2 h-11 w-full rounded-xl border border-[#0D2340]/10 px-4 outline-none"
      />
    </label>
  );
}
function Area({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="mt-5 block text-xs font-semibold text-[#0D2340]">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="mt-2 w-full rounded-xl border border-[#0D2340]/10 p-4 outline-none"
      />
    </label>
  );
}
function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
