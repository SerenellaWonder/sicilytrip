"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  KeyRound,
  Pencil,
  Plus,
  RefreshCw,
  ShieldCheck,
  UserCog,
  X,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

type Role = "SUPER_ADMIN" | "CONTENT_EDITOR" | "CUSTOMER_SUPPORT";
type Operator = {
  id: string;
  email: string;
  role: Role;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};
type FormState = {
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
};
const EMPTY: FormState = {
  email: "",
  password: "",
  role: "CONTENT_EDITOR",
  isActive: true,
};

export default function AdminOperators({ token }: { token: string }) {
  const [items, setItems] = useState<Operator[]>([]);
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
        await apiFetch<Operator[]>("/admin/operators", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Operatori non disponibili",
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
  function edit(item: Operator) {
    setEditing(item.id);
    setForm({
      email: item.email,
      password: "",
      role: item.role,
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
        editing ? `/admin/operators/${editing}` : "/admin/operators",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(
            editing
              ? {
                  role: form.role,
                  isActive: form.isActive,
                  ...(form.password ? { password: form.password } : {}),
                }
              : { email: form.email, password: form.password, role: form.role },
          ),
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
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0D2340]">
            Operatori amministrativi
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Account e livelli di accesso al pannello.
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
            className="flex items-center gap-2 rounded-full bg-[#F58220] px-5 py-3 text-xs font-bold text-white"
          >
            <Plus size={16} /> Nuovo operatore
          </button>
        </div>
      </div>
      <div className="mb-6 flex gap-3 rounded-[20px] border border-amber-100 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
        <ShieldCheck className="mt-0.5 shrink-0" size={19} />
        <p>
          L’amministratore può gestire tutto. Il gestore contenuti può
          modificare catalogo, Journal e FAQ. L’assistenza clienti dispone di
          accesso operativo in sola lettura.
        </p>
      </div>
      {error && !open && (
        <p role="alert" className="mb-5 text-sm text-red-600">
          {error}
        </p>
      )}
      {!items.length ? (
        <div className="rounded-[24px] bg-white p-7 text-sm text-slate-500">
          Nessun operatore aggiuntivo. L’amministratore principale configurato
          nel sistema resta attivo.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-[24px] bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0D2340]/[0.06] text-[#0D2340]">
                  <UserCog size={20} />
                </div>
                <span
                  className={`rounded-full px-3 py-2 text-[9px] font-bold uppercase ${item.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                >
                  {item.isActive ? "Attivo" : "Disattivato"}
                </span>
              </div>
              <h3 className="mt-5 truncate font-bold text-[#0D2340]">
                {item.email}
              </h3>
              <p className="mt-1 text-xs font-semibold text-[#F58220]">
                {roleLabel(item.role)}
              </p>
              <p className="mt-4 text-xs text-slate-400">
                Ultimo accesso:{" "}
                {item.lastLoginAt ? dateTime(item.lastLoginAt) : "mai"}
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
            className="w-full max-w-lg rounded-[28px] bg-white p-7 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F58220]">
                  Sicurezza
                </span>
                <h3 className="mt-1 text-2xl font-bold text-[#0D2340]">
                  {editing ? "Modifica operatore" : "Nuovo operatore"}
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
            <label className="mt-6 block text-xs font-semibold text-[#0D2340]">
              Email
              <input
                type="email"
                required
                disabled={Boolean(editing)}
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                className="mt-2 h-11 w-full rounded-xl border border-[#0D2340]/10 px-4 disabled:bg-slate-50"
              />
            </label>
            <label className="mt-5 block text-xs font-semibold text-[#0D2340]">
              Ruolo
              <select
                value={form.role}
                onChange={(event) =>
                  setForm({ ...form, role: event.target.value as Role })
                }
                className="mt-2 h-11 w-full rounded-xl border border-[#0D2340]/10 bg-white px-4"
              >
                <option value="SUPER_ADMIN">Amministratore</option>
                <option value="CONTENT_EDITOR">Gestore contenuti</option>
                <option value="CUSTOMER_SUPPORT">Assistenza clienti</option>
              </select>
            </label>
            <label className="mt-5 block text-xs font-semibold text-[#0D2340]">
              {editing ? "Nuova password (facoltativa)" : "Password"}
              <div className="relative mt-2">
                <KeyRound
                  className="absolute left-4 top-3 text-slate-300"
                  size={17}
                />
                <input
                  type="password"
                  required={!editing}
                  minLength={10}
                  value={form.password}
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-[#0D2340]/10 pl-11 pr-4"
                />
              </div>
              <span className="mt-2 block text-[10px] font-normal text-slate-400">
                Almeno 10 caratteri.
              </span>
            </label>
            {editing && (
              <label className="mt-5 flex items-center gap-3 text-sm font-semibold text-[#0D2340]">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    setForm({ ...form, isActive: event.target.checked })
                  }
                  className="size-4 accent-[#F58220]"
                />
                Operatore attivo
              </label>
            )}
            {error && (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {error}
              </p>
            )}
            <button
              disabled={saving}
              className="mt-6 rounded-full bg-[#F58220] px-7 py-3 text-xs font-bold text-white disabled:opacity-60"
            >
              {saving ? "Salvataggio…" : "Salva operatore"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function roleLabel(role: Role) {
  return role === "SUPER_ADMIN"
    ? "Amministratore"
    : role === "CONTENT_EDITOR"
      ? "Gestore contenuti"
      : "Assistenza clienti";
}
function dateTime(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
