"use client";

import { useEffect, useRef, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Link from "next/link";
import AdminImageField from "../components/AdminImageField";

type Category = {
  slug: string;
  label: string;
  title: string;
  shortTitle?: string;
  description: string;
  productHandles: string[];
  hero: { headline: string; subheadline: string; image?: string };
  applications: { title: string; desc: string }[];
  faq: { id: string; question: string; answer: string }[];
};

export default function AdminCategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<Partial<Category>>({});
  const formRef = useRef(form);
  formRef.current = form;

  useAdminAuth();
  const load = () => {
    fetch("/api/admin/content?key=categories")
      .then((r) => r.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (c: Category) => {
    const initial = {
      ...c,
      hero: c.hero ? { ...c.hero } : { headline: "", subheadline: "" },
    };
    setEditing(c);
    setForm(initial);
    formRef.current = initial;
  };

  const handleSave = async () => {
    if (!editing) return;
    const currentForm = formRef.current;
    setSaving(true);
    setMessage(null);
    try {
      const updated = categories.map((c) =>
        c.slug === editing.slug ? { ...c, ...currentForm } : c
      );
      const res = await fetch("/api/admin/content?key=categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Error al guardar");
      setCategories(updated);
      setEditing(null);
      setMessage({ type: "ok", text: "Cambios guardados" });
    } catch {
      setMessage({ type: "error", text: "No se pudo guardar" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-[#666]">Cargando…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-[#666] hover:text-[#1a1a1a]">
          ← Panel
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-[#1a1a1a]">Categorías</h1>
        <p className="mt-1 text-[#666]">
          Editá títulos, descripciones, imagen del hero y FAQ.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 ${
            message.type === "ok" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {editing ? (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1a1a1a]">
            Editar: {editing.slug}
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333]">Nombre de la categoría</label>
              <p className="text-xs text-[#666]">Aparece en tarjetas del home, navegación y listados.</p>
              <input
                value={form.label ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  const next = { ...formRef.current, label: v, shortTitle: v || formRef.current.shortTitle };
                  formRef.current = next;
                  setForm(next);
                }}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                placeholder="Ej: Cintas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333]">Título completo</label>
              <p className="text-xs text-[#666]">Para la página de la categoría y SEO.</p>
              <input
                value={form.title ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                placeholder="Ej: Cintas para embalaje"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333]">Descripción</label>
              <textarea
                value={form.description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#333]">Hero: Título</label>
                <input
                  value={form.hero?.headline ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      hero: { ...f.hero!, headline: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333]">Hero: Subtítulo</label>
                <input
                  value={form.hero?.subheadline ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      hero: { ...f.hero!, subheadline: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                />
              </div>
            </div>
            <AdminImageField
              label="Imagen del hero"
              value={form.hero?.image ?? ""}
              onChange={(url) =>
                setForm((f) => ({
                  ...f,
                  hero: { ...f.hero!, image: url },
                }))
              }
              folder="hero"
            />
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-[#1a1a1a] px-4 py-2 text-white hover:bg-[#333] disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Guardar"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="rounded-lg border border-[#ddd] px-4 py-2 text-[#666] hover:bg-[#f5f5f5]"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        {categories.map((c) => (
          <div
            key={c.slug}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-[#1a1a1a]">{c.label}</p>
              <p className="text-sm text-[#666]">{c.description.slice(0, 80)}…</p>
            </div>
            <button
              onClick={() => handleEdit(c)}
              className="rounded-lg bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-white hover:bg-[#333]"
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
