"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Compass, Pencil, Plus, RefreshCw, X } from "lucide-react";
import { apiFetch } from "@/lib/api";

type Experience = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  city: string | null;
  priceFrom: string | number | null;
  currency: string | null;
  isActive: boolean;
  updatedAt: string;
};

type FormState = {
  title: string;
  slug: string;
  description: string;
  city: string;
  priceFrom: string;
  currency: string;
  isActive: boolean;
};

const EMPTY: FormState = {
  title: "",
  slug: "",
  description: "",
  city: "",
  priceFrom: "",
  currency: "EUR",
  isActive: true,
};

export default function AdminExperiences({ token }: { token: string }) {
  const [items, setItems] = useState<Experience[]>([]);
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
      setItems(
        await apiFetch<Experience[]>("/admin/experiences", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Esperienze non disponibili",
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
    setForm(EMPTY);
    setOpen(true);
    setError("");
  }

  function edit(item: Experience) {
    setEditing(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      description: item.description ?? "",
      city: item.city ?? "",
      priceFrom: item.priceFrom === null ? "" : String(item.priceFrom),
      currency: item.currency ?? "EUR",
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
        editing ? `/admin/experiences/${editing}` : "/admin/experiences",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            ...form,
            slug: slugify(form.slug || form.title),
            priceFrom: form.priceFrom ? Number(form.priceFrom) : undefined,
            currency: form.currency.toUpperCase(),
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

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0D2340]">Esperienze</h2>
          <p className="mt-1 text-sm text-slate-500">
            Gestisci il catalogo delle esperienze SicilyTrip.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="flex items-center gap-2 text-xs font-semibold text-[#0D2340]"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Aggiorna
          </button>
          <button
            type="button"
            onClick={create}
            className="flex items-center gap-2 rounded-full bg-[#F58220] px-5 py-3 text-xs font-bold text-white"
          >
            <Plus size={16} /> Nuova esperienza
          </button>
        </div>
      </div>

      {error && !open && (
        <p role="alert" className="mb-5 text-sm text-red-600">
          {error}
        </p>
      )}

      {items.length === 0 ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Nessuna esperienza presente. Puoi creare la prima dal pulsante in
          alto.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-[24px] bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#F58220]/10 text-[#F58220]">
                  <Compass size={20} />
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase ${item.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                >
                  {item.isActive ? "Attiva" : "Non attiva"}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0D2340]">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {item.city || "Località da definire"} · /{item.slug}
              </p>
              {item.description && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              )}
              <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
                <div>
                  <span className="block text-[9px] font-bold uppercase text-slate-400">
                    Prezzo da
                  </span>
                  <strong className="text-[#0D2340]">
                    {item.priceFrom === null
                      ? "Su richiesta"
                      : money(item.priceFrom, item.currency || "EUR")}
                  </strong>
                </div>
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
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-7 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F58220]">
                  Catalogo SicilyTrip
                </span>
                <h3 className="mt-1 text-2xl font-bold text-[#0D2340]">
                  {editing ? "Modifica esperienza" : "Nuova esperienza"}
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
                label="Titolo"
                value={form.title}
                onChange={(title) => setForm({ ...form, title })}
                required
              />
              <Field
                label="Indirizzo pagina (slug)"
                value={form.slug}
                onChange={(slug) => setForm({ ...form, slug })}
                placeholder={slugify(form.title) || "etna-al-tramonto"}
              />
              <Field
                label="Località"
                value={form.city}
                onChange={(city) => setForm({ ...form, city })}
                placeholder="Taormina"
              />
              <div className="grid grid-cols-[1fr_90px] gap-3">
                <Field
                  label="Prezzo da"
                  value={form.priceFrom}
                  onChange={(priceFrom) => setForm({ ...form, priceFrom })}
                  type="number"
                  min="0"
                  step="0.01"
                />
                <Field
                  label="Valuta"
                  value={form.currency}
                  onChange={(currency) => setForm({ ...form, currency })}
                  maxLength={3}
                />
              </div>
            </div>
            <label className="mt-5 block text-xs font-semibold text-[#0D2340]">
              Descrizione
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                rows={5}
                className="mt-2 w-full rounded-xl border border-[#0D2340]/10 p-4 outline-none focus:border-[#0D2340]/30"
              />
            </label>
            <label className="mt-5 flex items-center gap-3 text-sm font-semibold text-[#0D2340]">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) =>
                  setForm({ ...form, isActive: event.target.checked })
                }
                className="size-4 accent-[#F58220]"
              />
              Esperienza attiva
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
              {saving ? "Salvataggio…" : "Salva esperienza"}
            </button>
          </form>
        </div>
      )}
    </div>
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
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <label className="block text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
        className="mt-2 h-11 w-full rounded-xl border border-[#0D2340]/10 px-4 outline-none focus:border-[#0D2340]/30"
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

function money(amount: string | number, currency: string) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency,
  }).format(Number(amount));
}
