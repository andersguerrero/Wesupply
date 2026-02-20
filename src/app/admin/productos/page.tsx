"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Link from "next/link";
import Image from "next/image";

type ProductSpec = { key: string; value: string };
type ProductFAQ = { id: string; question: string; answer: string };
type ProductApplication = { title: string; desc: string };
type VolumeTier = { min: number; max: number | null; discountPercent: number; label: string };

type Product = {
  sku: string;
  handle: string;
  title: string;
  image?: string;
  images?: string[];
  price?: number;
  categorySlug: string;
  description?: string;
  spec?: string;
  specs?: ProductSpec[];
  faq?: ProductFAQ[];
  applications?: ProductApplication[];
  /** Stock disponible (opcional) */
  stock?: number | null;
  /** Medidas y peso para envío (kg, cm) */
  weightKg?: number;
  heightCm?: number;
  widthCm?: number;
  lengthCm?: number;
  /** Descuentos por volumen por producto. Si no se define, se usan los globales. */
  volumeTiers?: VolumeTier[];
};

const CATEGORIES = ["cintas", "panos-textiles", "tanzas", "etiquetas", "embalaje", "exhibidores"] as const;
const CATEGORY_LABELS: Record<string, string> = {
  cintas: "Cintas",
  "panos-textiles": "Paños y textiles",
  tanzas: "Tanzas",
  etiquetas: "Etiquetas",
  embalaje: "Embalaje",
  exhibidores: "Exhibidores",
};

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});
  const [contentSection, setContentSection] = useState<"general" | "stock" | "descuentos" | "desc" | "specs" | "faq" | "apps">("general");
  const [filterCategory, setFilterCategory] = useState<string>("");

  useAdminAuth();
  const load = () => {
    fetch("/api/admin/content?key=products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (p: Product) => {
    setEditing(p);
    const imgs = p.images?.length ? p.images : (p.image ? [p.image] : []);
    const defaultTiers: VolumeTier[] = [
      { min: 1, max: 9, discountPercent: 0, label: "1–9 unidades" },
      { min: 10, max: 24, discountPercent: 8, label: "10–24" },
      { min: 25, max: 49, discountPercent: 12, label: "25–49" },
      { min: 50, max: null, discountPercent: 18, label: "50+" },
    ];
    setForm({
      ...p,
      images: imgs,
      specs: p.specs ?? [],
      faq: p.faq ?? [],
      applications: p.applications ?? [],
      volumeTiers: p.volumeTiers?.length ? p.volumeTiers : defaultTiers,
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setMessage(null);
    const imgs = form.images ?? [];
    const { volumeTiers, ...rest } = form;
    const payload: Record<string, unknown> = {
      ...rest,
      images: imgs,
      image: imgs[0] ?? form.image,
    };
    if (volumeTiers != null && volumeTiers.length > 0) {
      payload.volumeTiers = volumeTiers;
    }
    const clearVolumeTiers = volumeTiers !== undefined && volumeTiers.length === 0;
    try {
      const updated = products.map((p) => {
        if (p.handle !== editing.handle) return p;
        const merged = { ...p, ...payload } as Record<string, unknown>;
        if (clearVolumeTiers) delete merged.volumeTiers;
        return merged as Product;
      });
      const res = await fetch("/api/admin/content?key=products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Error al guardar");
      setProducts(updated);
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
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-[#666] hover:text-[#1a1a1a]">
            ← Panel
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-[#1a1a1a]">Productos</h1>
          <p className="mt-1 text-[#666]">
            Editá título, imágenes, precio, descripción, especificaciones, FAQ y aplicaciones.
          </p>
        </div>
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
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Editar producto</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {(["general", "stock", "descuentos", "desc", "specs", "faq", "apps"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setContentSection(s)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  contentSection === s ? "bg-[#1a1a1a] text-white" : "bg-[#f0f0f0] text-[#666]"
                }`}
              >
                {s === "general" && "General"}
                {s === "stock" && "Stock y envío"}
                {s === "descuentos" && "Descuentos"}
                {s === "desc" && "Descripción"}
                {s === "specs" && "Especificaciones"}
                {s === "faq" && "FAQ"}
                {s === "apps" && "Aplicaciones"}
              </button>
            ))}
          </div>
          {contentSection === "general" && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#333]">SKU</label>
              <input
                value={form.sku ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333]">Categoría</label>
              <select
                value={form.categorySlug ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, categorySlug: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#333]">Título</label>
              <input
                value={form.title ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#333]">
                Imágenes del producto
              </label>
              <p className="mt-0.5 text-xs text-[#666]">
                La primera es la principal. Subí archivos o agregá una URL.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(form.images ?? []).map((url, i) => (
                  <div
                    key={i}
                    className="group relative flex shrink-0 flex-col items-center gap-1"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-[#ddd] bg-[#f5f5f5]">
                      <Image
                        src={url || "/images/products/placeholder.webp"}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23ddd' width='80' height='80'/%3E%3Ctext x='50%25' y='50%25' fill='%23999' text-anchor='middle' dy='.3em' font-size='10'%3E?%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const next = (form.images ?? []).filter((_, j) => j !== i);
                        setForm((f) => ({ ...f, images: next }));
                      }}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Quitar
                    </button>
                    {i > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const arr = [...(form.images ?? [])];
                          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                          setForm((f) => ({ ...f, images: arr }));
                        }}
                        className="absolute -left-2 top-6 rounded bg-[#1a1a1a] p-1 text-white"
                        title="Mover antes"
                      >
                        ←
                      </button>
                    )}
                    {i < (form.images ?? []).length - 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const arr = [...(form.images ?? [])];
                          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                          setForm((f) => ({ ...f, images: arr }));
                        }}
                        className="absolute -right-2 top-6 rounded bg-[#1a1a1a] p-1 text-white"
                        title="Mover después"
                      >
                        →
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <label className={`flex cursor-pointer items-center gap-2 rounded-lg border border-[#ddd] bg-white px-4 py-2 text-sm font-medium text-[#333] hover:bg-[#f9f9f9] ${uploading ? "pointer-events-none opacity-60" : ""}`}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    multiple
                    disabled={uploading}
                    onChange={async (e) => {
                      const files = Array.from(e.target.files ?? []);
                      if (files.length === 0) return;
                      setMessage(null);
                      setUploading(true);
                      const uploads = files.map((file) => {
                        const fd = new FormData();
                        fd.append("file", file);
                        fd.append("folder", "products");
                        return fetch("/api/admin/upload", { method: "POST", body: fd })
                          .then((r) => r.json())
                          .then((d) => d.url);
                      });
                      try {
                        const results = await Promise.all(uploads);
                        const urls = results.filter(Boolean);
                        if (urls.length > 0) {
                          setForm((f) => ({
                            ...f,
                            images: [...(f.images ?? []), ...urls],
                          }));
                          if (urls.length < files.length) {
                            setMessage({ type: "error", text: `Se subieron ${urls.length} de ${files.length} imágenes.` });
                          } else {
                            setMessage({ type: "ok", text: `${urls.length} imagen${urls.length > 1 ? "es" : ""} subida${urls.length > 1 ? "s" : ""}` });
                          }
                        } else {
                          setMessage({ type: "error", text: "No se pudo subir ninguna imagen." });
                        }
                      } catch {
                        setMessage({ type: "error", text: "Error al subir" });
                      } finally {
                        setUploading(false);
                        e.target.value = "";
                      }
                    }}
                  />
                  {uploading ? "⏳ Subiendo…" : "📤 Subir varias imágenes"}
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="/images/... o https://..."
                    className="w-48 rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        const url = input.value.trim();
                        if (url) {
                          setForm((f) => ({
                            ...f,
                            images: [...(f.images ?? []), url],
                          }));
                          input.value = "";
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      const input = (e.currentTarget.parentElement?.querySelector("input") as HTMLInputElement);
                      const url = input?.value?.trim();
                      if (url) {
                        setForm((f) => ({
                          ...f,
                          images: [...(f.images ?? []), url],
                        }));
                        input.value = "";
                      }
                    }}
                    className="rounded-lg bg-[#1a1a1a] px-3 py-2 text-sm text-white hover:bg-[#333]"
                  >
                    Agregar URL
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333]">Precio (ARS)</label>
              <input
                type="number"
                value={form.price ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value ? Number(e.target.value) : undefined }))
                }
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
              />
            </div>
          </div>
          )}
          {contentSection === "stock" && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#333]">Stock</label>
              <input
                type="number"
                min={0}
                value={form.stock ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setForm((f) => ({ ...f, stock: v === "" ? null : Math.max(0, parseInt(v, 10) || 0) }));
                }}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                placeholder="Dejar vacío = sin límite"
              />
              <p className="mt-0.5 text-xs text-[#666]">Dejá vacío si no aplica control de stock.</p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="mb-3 text-sm font-semibold text-[#333]">Medidas y peso (para envíos)</h3>
              <p className="mb-3 text-xs text-[#666]">Usado para cotización de envío. Alto × Ancho × Largo en cm.</p>
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <label className="block text-xs font-medium text-[#666]">Peso (kg)</label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={form.weightKg ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, weightKg: e.target.value ? parseFloat(e.target.value) : undefined }))
                    }
                    className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                    placeholder="0.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#666]">Alto (cm)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.heightCm ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, heightCm: e.target.value ? parseInt(e.target.value, 10) : undefined }))
                    }
                    className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#666]">Ancho (cm)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.widthCm ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, widthCm: e.target.value ? parseInt(e.target.value, 10) : undefined }))
                    }
                    className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#666]">Largo (cm)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.lengthCm ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, lengthCm: e.target.value ? parseInt(e.target.value, 10) : undefined }))
                    }
                    className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>
          </div>
          )}
          {contentSection === "descuentos" && (
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-[#666]">
                Configurá los descuentos por volumen para este producto. Si no definís ninguno, se usan los valores globales.
              </p>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, volumeTiers: [] }))}
                className="text-sm font-medium text-[var(--brand-primary,#2563eb)] hover:underline"
              >
                Usar descuentos globales (quitar personalización)
              </button>
            </div>
            {(form.volumeTiers ?? []).map((tier, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2 rounded-lg border border-[#ddd] p-3">
                <input
                  type="number"
                  min={0}
                  value={tier.min}
                  onChange={(e) => {
                    const arr = [...(form.volumeTiers ?? [])];
                    arr[i] = { ...arr[i], min: parseInt(e.target.value, 10) || 0 };
                    setForm((f) => ({ ...f, volumeTiers: arr }));
                  }}
                  className="w-20 rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                  placeholder="Min"
                />
                <span className="text-[#666]">a</span>
                <input
                  type="number"
                  min={0}
                  value={tier.max ?? ""}
                  onChange={(e) => {
                    const arr = [...(form.volumeTiers ?? [])];
                    const v = e.target.value;
                    arr[i] = { ...arr[i], max: v === "" ? null : parseInt(v, 10) || 0 };
                    setForm((f) => ({ ...f, volumeTiers: arr }));
                  }}
                  className="w-20 rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                  placeholder="∞"
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={tier.discountPercent}
                  onChange={(e) => {
                    const arr = [...(form.volumeTiers ?? [])];
                    arr[i] = { ...arr[i], discountPercent: parseInt(e.target.value, 10) || 0 };
                    setForm((f) => ({ ...f, volumeTiers: arr }));
                  }}
                  className="w-16 rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                />
                <span className="text-sm text-[#666]">%</span>
                <input
                  type="text"
                  value={tier.label}
                  onChange={(e) => {
                    const arr = [...(form.volumeTiers ?? [])];
                    arr[i] = { ...arr[i], label: e.target.value };
                    setForm((f) => ({ ...f, volumeTiers: arr }));
                  }}
                  className="min-w-[120px] flex-1 rounded-lg border border-[#ddd] px-3 py-2 text-sm"
                  placeholder="Etiqueta (ej: 1–9 unidades)"
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      volumeTiers: (f.volumeTiers ?? []).filter((_, j) => j !== i),
                    }))
                  }
                  className="text-sm text-red-600 hover:underline"
                >
                  Quitar
                </button>
              </div>
            ))}
            {(form.volumeTiers ?? []).length === 0 && (
              <p className="rounded-lg bg-[#f5f5f5] px-3 py-2 text-sm text-[#666]">
                Se usarán los valores globales: 1–9 (0%), 10–24 (8%), 25–49 (12%), 50+ (18%).
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                const prev = form.volumeTiers ?? [];
                const last = prev[prev.length - 1];
                const nextMin = last ? (last.max ?? last.min) + 1 : 1;
                setForm((f) => ({
                  ...f,
                  volumeTiers: [
                    ...(f.volumeTiers ?? []),
                    { min: nextMin, max: null, discountPercent: 0, label: "" },
                  ],
                }));
              }}
              className="text-sm font-medium text-[var(--brand-primary,#2563eb)]"
            >
              + Agregar nivel de descuento
            </button>
          </div>
          )}
          {contentSection === "desc" && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333]">Subtítulo (bajo el título)</label>
              <input
                value={form.spec ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, spec: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                placeholder="Ej: Pack 6 rollos 48x100m"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333]">Descripción</label>
              <textarea
                value={form.description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={5}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                placeholder="Texto que aparece debajo del precio"
              />
            </div>
          </div>
          )}
          {contentSection === "specs" && (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-[#666]">Especificaciones técnicas (clave – valor). SKU se agrega automáticamente.</p>
            {(form.specs ?? []).map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={s.key}
                  onChange={(e) => {
                    const arr = [...(form.specs ?? [])];
                    arr[i] = { ...arr[i], key: e.target.value };
                    setForm((f) => ({ ...f, specs: arr }));
                  }}
                  className="flex-1 rounded-lg border border-[#ddd] px-3 py-2"
                  placeholder="Clave (ej: Ancho)"
                />
                <input
                  value={s.value}
                  onChange={(e) => {
                    const arr = [...(form.specs ?? [])];
                    arr[i] = { ...arr[i], value: e.target.value };
                    setForm((f) => ({ ...f, specs: arr }));
                  }}
                  className="flex-1 rounded-lg border border-[#ddd] px-3 py-2"
                  placeholder="Valor"
                />
                <button type="button" onClick={() => setForm((f) => ({ ...f, specs: (f.specs ?? []).filter((_, j) => j !== i) }))} className="text-red-600">Quitar</button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, specs: [...(f.specs ?? []), { key: "", value: "" }] }))}
              className="text-sm font-medium text-[var(--brand-primary,#2563eb)]"
            >
              + Agregar especificación
            </button>
          </div>
          )}
          {contentSection === "faq" && (
          <div className="mt-4 space-y-4">
            {(form.faq ?? []).map((item, i) => (
              <div key={item.id || i} className="rounded-lg border border-[#ddd] p-4">
                <input
                  value={item.question}
                  onChange={(e) => {
                    const arr = [...(form.faq ?? [])];
                    arr[i] = { ...arr[i], question: e.target.value };
                    setForm((f) => ({ ...f, faq: arr }));
                  }}
                  className="mb-2 w-full rounded-lg border border-[#ddd] px-3 py-2"
                  placeholder="Pregunta"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => {
                    const arr = [...(form.faq ?? [])];
                    arr[i] = { ...arr[i], answer: e.target.value };
                    setForm((f) => ({ ...f, faq: arr }));
                  }}
                  rows={2}
                  className="w-full rounded-lg border border-[#ddd] px-3 py-2"
                  placeholder="Respuesta"
                />
                <button type="button" onClick={() => setForm((f) => ({ ...f, faq: (f.faq ?? []).filter((_, j) => j !== i) }))} className="mt-2 text-sm text-red-600">Quitar</button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, faq: [...(f.faq ?? []), { id: `q${Date.now()}`, question: "", answer: "" }] }))}
              className="text-sm font-medium text-[var(--brand-primary,#2563eb)]"
            >
              + Agregar pregunta
            </button>
          </div>
          )}
          {contentSection === "apps" && (
          <div className="mt-4 space-y-4">
            {(form.applications ?? []).map((app, i) => (
              <div key={i} className="rounded-lg border border-[#ddd] p-4">
                <input
                  value={app.title}
                  onChange={(e) => {
                    const arr = [...(form.applications ?? [])];
                    arr[i] = { ...arr[i], title: e.target.value };
                    setForm((f) => ({ ...f, applications: arr }));
                  }}
                  className="mb-2 w-full rounded-lg border border-[#ddd] px-3 py-2"
                  placeholder="Título (ej: Cierre de cajas)"
                />
                <input
                  value={app.desc}
                  onChange={(e) => {
                    const arr = [...(form.applications ?? [])];
                    arr[i] = { ...arr[i], desc: e.target.value };
                    setForm((f) => ({ ...f, applications: arr }));
                  }}
                  className="w-full rounded-lg border border-[#ddd] px-3 py-2"
                  placeholder="Descripción corta"
                />
                <button type="button" onClick={() => setForm((f) => ({ ...f, applications: (f.applications ?? []).filter((_, j) => j !== i) }))} className="mt-2 text-sm text-red-600">Quitar</button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, applications: [...(f.applications ?? []), { title: "", desc: "" }] }))}
              className="text-sm font-medium text-[var(--brand-primary,#2563eb)]"
            >
              + Agregar aplicación
            </button>
          </div>
          )}
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

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#333]">Filtrar por categoría</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-[#ddd] px-3 py-2 text-sm"
          >
            <option value="">Todas</option>
            {CATEGORIES.map((slug) => (
              <option key={slug} value={slug}>
                {CATEGORY_LABELS[slug] ?? slug}
              </option>
            ))}
          </select>
        </label>
        <span className="text-sm text-[#666]">
          {filterCategory
            ? `${products.filter((p) => (p.categorySlug || "").toLowerCase() === filterCategory).length} productos`
            : `${products.length} productos`}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products
          .filter((p) => !filterCategory || (p.categorySlug || "").toLowerCase() === filterCategory)
          .map((p) => (
          <div
            key={p.handle}
            className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#eee]">
              <Image
                src={p.images?.[0] ?? p.image ?? "/images/products/placeholder.webp"}
                alt=""
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-[#1a1a1a]">{p.title}</p>
              <p className="text-sm text-[#666]">{p.sku} · {p.categorySlug}</p>
              <p className="text-sm font-semibold text-[#333]">
                ${p.price?.toLocaleString("es-AR") ?? "—"}
                {p.stock != null && (
                  <span className="ml-2 font-normal text-[#666]">· Stock: {p.stock}</span>
                )}
              </p>
              <button
                onClick={() => handleEdit(p)}
                className="mt-2 text-sm font-medium text-[var(--brand-primary,#2563eb)] hover:underline"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
      {filterCategory && products.filter((p) => (p.categorySlug || "").toLowerCase() === filterCategory).length === 0 && (
        <p className="rounded-xl bg-[#f5f5f5] px-4 py-8 text-center text-[#666]">
          No hay productos en esta categoría.
        </p>
      )}
    </div>
  );
}
