"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { apiFetch } from "@/lib/api";

type Item = {
  id: string;
  category: string;
  categoryEn?: string | null;
  question: string;
  questionEn?: string | null;
  answer: string;
  answerEn?: string | null;
  sortOrder: number;
  isPublished: boolean;
};
const empty = {
  category: "Ricerca e disponibilità",
  categoryEn: "Search and availability",
  question: "",
  questionEn: "",
  answer: "",
  answerEn: "",
  sortOrder: 0,
  isPublished: true,
};

export default function AdminFaq({ token }: { token: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setItems(
        await apiFetch<Item[]>("/admin/faq", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore FAQ");
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);
  async function save(event: FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      await apiFetch(editing ? `/admin/faq/${editing}` : "/admin/faq", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      setEditing(undefined);
      setForm(empty);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Salvataggio non riuscito");
      setLoading(false);
    }
  }
  return (
    <div className="grid gap-7 lg:grid-cols-[380px_1fr]">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0D2340]">Domande</h2>
          <button
            onClick={() => {
              setEditing(undefined);
              setForm(empty);
            }}
            className="flex items-center gap-1 text-xs font-bold text-[#F58220]"
          >
            <Plus size={15} /> Nuova
          </button>
        </div>
        {loading && !items.length ? (
          <p className="text-sm text-slate-500">Caricamento...</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setEditing(item.id);
                  setForm({
                    category: item.category,
                    categoryEn: item.categoryEn ?? "",
                    question: item.question,
                    questionEn: item.questionEn ?? "",
                    answer: item.answer,
                    answerEn: item.answerEn ?? "",
                    sortOrder: item.sortOrder,
                    isPublished: item.isPublished,
                  });
                }}
                className="w-full rounded-2xl bg-white p-4 text-left"
              >
                <span className="text-[9px] font-bold uppercase text-[#F58220]">
                  {item.category} · {item.isPublished ? "Pubblicata" : "Bozza"}
                </span>
                <strong className="mt-2 block text-sm text-[#0D2340]">
                  {item.question}
                </strong>
              </button>
            ))}
          </div>
        )}
      </section>
      <form onSubmit={save} className="rounded-[24px] bg-white p-6">
        <h2 className="text-xl font-bold text-[#0D2340]">
          {editing ? "Modifica FAQ" : "Nuova FAQ"}
        </h2>
        <Field
          label="Categoria"
          value={form.category}
          onChange={(v) => setForm({ ...form, category: v })}
        />
        <Field
          label="Categoria inglese"
          value={form.categoryEn}
          onChange={(v) => setForm({ ...form, categoryEn: v })}
          required={false}
        />
        <Field
          label="Domanda"
          value={form.question}
          onChange={(v) => setForm({ ...form, question: v })}
        />
        <Field
          label="Domanda inglese"
          value={form.questionEn}
          onChange={(v) => setForm({ ...form, questionEn: v })}
          required={false}
        />
        <label className="mt-4 block text-xs font-semibold text-[#0D2340]">
          Risposta
          <textarea
            required
            rows={8}
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none"
          />
        </label>
        <label className="mt-4 block text-xs font-semibold text-[#0D2340]">
          Risposta inglese
          <textarea
            rows={8}
            value={form.answerEn}
            onChange={(e) => setForm({ ...form, answerEn: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none"
          />
        </label>
        <label className="mt-4 block text-xs font-semibold text-[#0D2340]">
          Ordine
          <input
            type="number"
            min="0"
            value={form.sortOrder}
            onChange={(e) =>
              setForm({ ...form, sortOrder: Number(e.target.value) })
            }
            className="mt-2 h-11 w-28 rounded-xl border border-slate-200 px-3"
          />
        </label>
        <label className="mt-4 flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) =>
              setForm({ ...form, isPublished: e.target.checked })
            }
            className="accent-[#F58220]"
          />{" "}
          Pubblica FAQ
        </label>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="mt-6 rounded-full bg-[#F58220] px-7 py-3 text-xs font-bold text-white disabled:opacity-60"
        >
          Salva FAQ
        </button>
      </form>
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="mt-4 block text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none"
      />
    </label>
  );
}
