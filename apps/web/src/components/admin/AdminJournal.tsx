"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { apiFetch } from "@/lib/api";

type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  readingTime?: string;
  isPublished: boolean;
  content: Array<{ title: string; paragraphs: string[] }>;
};
const empty = {
  title: "",
  slug: "",
  category: "Destinazioni",
  excerpt: "",
  subtitle: "",
  image: "",
  imageAlt: "",
  readingTime: "5 min",
  body: "",
  isPublished: false,
};

export default function AdminJournal({ token }: { token: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setArticles(
        await apiFetch<Article[]>("/admin/journal", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore Journal");
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);
  function edit(a: Article) {
    setEditing(a.id);
    setForm({
      title: a.title,
      slug: a.slug,
      category: a.category,
      excerpt: a.excerpt,
      subtitle: a.subtitle ?? "",
      image: a.image ?? "",
      imageAlt: a.imageAlt ?? "",
      readingTime: a.readingTime ?? "5 min",
      body: a.content.flatMap((s) => s.paragraphs).join("\n\n"),
      isPublished: a.isPublished,
    });
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const payload = {
        ...form,
        content: [
          {
            title: "Contenuto",
            paragraphs: form.body
              .split(/\n\s*\n/)
              .map((x) => x.trim())
              .filter(Boolean),
          },
        ],
      };
      delete (payload as Partial<typeof payload>).body;
      await apiFetch(editing ? `/admin/journal/${editing}` : "/admin/journal", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      setForm(empty);
      setEditing(undefined);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Salvataggio non riuscito");
      setLoading(false);
    }
  }
  return (
    <div className="grid gap-7 lg:grid-cols-[360px_1fr]">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0D2340]">Articoli</h2>
          <button
            onClick={() => {
              setEditing(undefined);
              setForm(empty);
            }}
            className="flex items-center gap-1 text-xs font-bold text-[#F58220]"
          >
            <Plus size={15} /> Nuovo
          </button>
        </div>
        {loading && !articles.length ? (
          <Loader2 className="animate-spin text-[#F58220]" />
        ) : (
          <div className="space-y-3">
            {articles.map((a) => (
              <button
                key={a.id}
                onClick={() => edit(a)}
                className="w-full rounded-2xl bg-white p-4 text-left"
              >
                <span className="text-[9px] font-bold uppercase text-[#F58220]">
                  {a.category} · {a.isPublished ? "Pubblicato" : "Bozza"}
                </span>
                <strong className="mt-2 block text-[#0D2340]">{a.title}</strong>
              </button>
            ))}
          </div>
        )}
      </section>
      <form onSubmit={save} className="rounded-[24px] bg-white p-6">
        <h2 className="text-xl font-bold text-[#0D2340]">
          {editing ? "Modifica articolo" : "Nuovo articolo"}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Titolo"
            value={form.title}
            onChange={(v) =>
              setForm({
                ...form,
                title: v,
                slug: editing ? form.slug : slugify(v),
              })
            }
          />
          <Field
            label="Slug URL"
            value={form.slug}
            onChange={(v) => setForm({ ...form, slug: slugify(v) })}
          />
          <Field
            label="Categoria"
            value={form.category}
            onChange={(v) => setForm({ ...form, category: v })}
          />
          <Field
            label="Tempo di lettura"
            value={form.readingTime}
            onChange={(v) => setForm({ ...form, readingTime: v })}
          />
          <Field
            label="Sottotitolo"
            value={form.subtitle}
            onChange={(v) => setForm({ ...form, subtitle: v })}
          />
          <Field
            label="Percorso immagine"
            value={form.image}
            onChange={(v) => setForm({ ...form, image: v })}
          />
        </div>
        <Area
          label="Riassunto"
          value={form.excerpt}
          onChange={(v) => setForm({ ...form, excerpt: v })}
        />
        <Area
          label="Testo articolo (separa i paragrafi con una riga vuota)"
          value={form.body}
          onChange={(v) => setForm({ ...form, body: v })}
          rows={12}
        />
        <label className="mt-5 flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) =>
              setForm({ ...form, isPublished: e.target.checked })
            }
            className="accent-[#F58220]"
          />{" "}
          Pubblica articolo
        </label>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="mt-6 rounded-full bg-[#F58220] px-7 py-3 text-xs font-bold text-white disabled:opacity-60"
        >
          Salva articolo
        </button>
      </form>
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="text-xs font-semibold text-[#0D2340]">
      {label}
      <input
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none"
      />
    </label>
  );
}
function Area({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="mt-4 block text-xs font-semibold text-[#0D2340]">
      {label}
      <textarea
        required
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none"
      />
    </label>
  );
}
function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
