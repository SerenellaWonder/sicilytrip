"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { MapPinned, Pencil, Plus, RefreshCw, Star, X } from "lucide-react";
import { apiFetch } from "@/lib/api";

type Municipality = {
  id: string;
  name: string;
  province: { name: string; code: string };
};
type Destination = {
  id: string;
  municipalityId: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  seoTitle: string | null;
  seoDescription: string | null;
  coverImage: string | null;
  featured: boolean;
  isActive: boolean;
  municipality: Municipality;
};
type FormState = {
  municipalityId: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  latitude: string;
  longitude: string;
  seoTitle: string;
  seoDescription: string;
  coverImage: string;
  featured: boolean;
  isActive: boolean;
};
const EMPTY: FormState = {
  municipalityId: "",
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  latitude: "",
  longitude: "",
  seoTitle: "",
  seoDescription: "",
  coverImage: "",
  featured: false,
  isActive: true,
};

export default function AdminDestinations({ token }: { token: string }) {
  const [items, setItems] = useState<Destination[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const headers = { Authorization: `Bearer ${token}` };
      const [destinations, places] = await Promise.all([
        apiFetch<Destination[]>("/admin/destinations", { headers }),
        apiFetch<Municipality[]>("/admin/municipalities", { headers }),
      ]);
      setItems(destinations);
      setMunicipalities(places);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Destinazioni non disponibili",
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
    setForm({ ...EMPTY, municipalityId: municipalities[0]?.id ?? "" });
    setOpen(true);
    setError("");
  }
  function edit(item: Destination) {
    setEditing(item.id);
    setForm({
      municipalityId: item.municipalityId,
      name: item.name,
      slug: item.slug,
      shortDescription: item.shortDescription ?? "",
      description: item.description ?? "",
      latitude: item.latitude === null ? "" : String(item.latitude),
      longitude: item.longitude === null ? "" : String(item.longitude),
      seoTitle: item.seoTitle ?? "",
      seoDescription: item.seoDescription ?? "",
      coverImage: item.coverImage ?? "",
      featured: item.featured,
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
      await apiFetch(
        editing ? `/admin/destinations/${editing}` : "/admin/destinations",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            ...form,
            slug: slugify(form.slug || form.name),
            latitude: form.latitude ? Number(form.latitude) : undefined,
            longitude: form.longitude ? Number(form.longitude) : undefined,
          }),
        },
      );
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

  async function bootstrap() {
    try {
      setBootstrapping(true);
      setError("");
      await apiFetch("/admin/geography/bootstrap", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      await load();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Caricamento del territorio non riuscito",
      );
    } finally {
      setBootstrapping(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0D2340]">Destinazioni</h2>
          <p className="mt-1 text-sm text-slate-500">
            Località organizzate correttamente per comune e provincia.
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
            disabled={!municipalities.length}
            className="flex items-center gap-2 rounded-full bg-[#F58220] px-5 py-3 text-xs font-bold text-white disabled:opacity-50"
          >
            <Plus size={16} /> Nuova destinazione
          </button>
        </div>
      </div>
      {error && !open && (
        <p role="alert" className="mb-5 text-sm text-red-600">
          {error}
        </p>
      )}
      {!loading && !municipalities.length && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber-50 p-5 text-sm text-amber-800">
          <p>
            Comuni e province non sono ancora presenti. Puoi caricare la base
            territoriale SicilyTrip con un solo clic.
          </p>
          <button
            type="button"
            onClick={() => void bootstrap()}
            disabled={bootstrapping}
            className="rounded-full bg-[#0D2340] px-5 py-3 text-xs font-bold text-white disabled:opacity-60"
          >
            {bootstrapping ? "Caricamento…" : "Carica territorio siciliano"}
          </button>
        </div>
      )}
      {!items.length ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Nessuna destinazione presente.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-[24px] bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#F58220]/10 text-[#F58220]">
                  <MapPinned size={20} />
                </div>
                <div className="flex gap-2">
                  {item.featured && (
                    <span
                      className="rounded-full bg-amber-50 p-2 text-amber-600"
                      title="In evidenza"
                    >
                      <Star size={14} fill="currentColor" />
                    </span>
                  )}
                  <span
                    className={`rounded-full px-3 py-2 text-[9px] font-bold uppercase ${item.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                  >
                    {item.isActive ? "Attiva" : "Non attiva"}
                  </span>
                </div>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0D2340]">
                {item.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-[#F58220]">
                {item.municipality.name} · Provincia di{" "}
                {item.municipality.province.name}
              </p>
              <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500">
                {item.shortDescription || "Descrizione breve da inserire."}
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
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F58220]">
                  Catalogo territoriale
                </span>
                <h3 className="mt-1 text-2xl font-bold text-[#0D2340]">
                  {editing ? "Modifica destinazione" : "Nuova destinazione"}
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
                label="Indirizzo pagina (slug)"
                value={form.slug}
                onChange={(slug) => setForm({ ...form, slug })}
                placeholder={slugify(form.name) || "isole-egadi"}
              />
              <label className="block text-xs font-semibold text-[#0D2340]">
                Comune e provincia
                <select
                  required
                  value={form.municipalityId}
                  onChange={(event) =>
                    setForm({ ...form, municipalityId: event.target.value })
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-[#0D2340]/10 bg-white px-4 outline-none"
                >
                  {municipalities.map((place) => (
                    <option key={place.id} value={place.id}>
                      {place.name} · {place.province.code}
                    </option>
                  ))}
                </select>
              </label>
              <Field
                label="Immagine di copertina (URL)"
                value={form.coverImage}
                onChange={(coverImage) => setForm({ ...form, coverImage })}
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
              <Field
                label="Titolo SEO"
                value={form.seoTitle}
                onChange={(seoTitle) => setForm({ ...form, seoTitle })}
              />
              <Field
                label="Descrizione SEO"
                value={form.seoDescription}
                onChange={(seoDescription) =>
                  setForm({ ...form, seoDescription })
                }
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
              value={form.description}
              onChange={(description) => setForm({ ...form, description })}
              rows={6}
            />
            <div className="mt-5 flex flex-wrap gap-6">
              <Check
                label="Destinazione in evidenza"
                checked={form.featured}
                onChange={(featured) => setForm({ ...form, featured })}
              />
              <Check
                label="Destinazione attiva"
                checked={form.isActive}
                onChange={(isActive) => setForm({ ...form, isActive })}
              />
            </div>
            {error && (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {error}
              </p>
            )}
            <button
              disabled={saving}
              className="mt-6 rounded-full bg-[#F58220] px-7 py-3 text-xs font-bold text-white disabled:opacity-60"
            >
              {saving ? "Salvataggio…" : "Salva destinazione"}
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
}) {
  const { label, value, onChange, ...input } = props;
  return (
    <label className="block text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...input}
        className="mt-2 h-11 w-full rounded-xl border border-[#0D2340]/10 px-4 outline-none focus:border-[#0D2340]/30"
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
        className="mt-2 w-full rounded-xl border border-[#0D2340]/10 p-4 outline-none focus:border-[#0D2340]/30"
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
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-[#0D2340]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-[#F58220]"
      />
      {label}
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
