"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Link from "next/link";

type Review = {
  id: string;
  productId?: string;
  productHandle: string;
  orderId?: string;
  authorName: string;
  rating: number;
  title?: string;
  comment?: string;
  createdAt: string;
  verifiedPurchase: boolean;
  variantTitle?: string;
};

type Product = { handle: string; title: string };

export default function AdminResenasPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [editing, setEditing] = useState<Review | null>(null);
  const [form, setForm] = useState<Partial<Review>>({});
  const [filterHandle, setFilterHandle] = useState<string>("");

  useAdminAuth();

  const load = () => {
    Promise.all([
      fetch("/api/admin/content?key=reviews").then((r) => r.json()),
      fetch("/api/admin/content?key=products").then((r) => r.json()),
    ])
      .then(([reviewsData, productsData]) => {
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
        const prods = Array.isArray(productsData) ? productsData : [];
        setProducts(prods.map((p: { handle: string; title: string }) => ({ handle: p.handle, title: p.title })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (r: Review) => {
    setEditing(r);
    setForm({ ...r });
  };

  const handleAdd = () => {
    setEditing({} as Review);
    setForm({
      id: `r${Date.now()}`,
      productHandle: products[0]?.handle ?? "",
      authorName: "",
      rating: 5,
      comment: "",
      createdAt: new Date().toISOString(),
      verifiedPurchase: true,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      let updated: Review[];
      if (editing?.id && reviews.some((r) => r.id === editing.id)) {
        updated = reviews.map((r) => (r.id === editing.id ? { ...r, ...form } as Review : r));
      } else {
        const newReview: Review = {
          id: form.id ?? `r${Date.now()}`,
          productHandle: form.productHandle ?? "",
          authorName: form.authorName ?? "",
          rating: Math.min(5, Math.max(1, form.rating ?? 5)),
          comment: form.comment ?? "",
          createdAt: form.createdAt ?? new Date().toISOString(),
          verifiedPurchase: form.verifiedPurchase ?? true,
          productId: form.productId ?? "gid://shopify/Product/0",
          orderId: form.orderId,
          title: form.title,
          variantTitle: form.variantTitle,
        };
        updated = [...reviews, newReview];
      }
      const res = await fetch("/api/admin/content?key=reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Error al guardar");
      setReviews(updated);
      setEditing(null);
      setMessage({ type: "ok", text: "Cambios guardados" });
    } catch {
      setMessage({ type: "error", text: "No se pudo guardar" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta reseña?")) return;
    setSaving(true);
    setMessage(null);
    try {
      const updated = reviews.filter((r) => r.id !== id);
      const res = await fetch("/api/admin/content?key=reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Error al guardar");
      setReviews(updated);
      setEditing(null);
      setMessage({ type: "ok", text: "Reseña eliminada" });
    } catch {
      setMessage({ type: "error", text: "No se pudo eliminar" });
    } finally {
      setSaving(false);
    }
  };

  const filteredReviews = filterHandle
    ? reviews.filter((r) => r.productHandle === filterHandle)
    : reviews;

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
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
          <h1 className="mt-2 text-2xl font-bold text-[#1a1a1a]">Reseñas de clientes</h1>
          <p className="mt-1 text-[#666]">
            Editá las reseñas que aparecen en el carousel de la home y en las páginas de producto.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-lg bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-white hover:bg-[#333]"
        >
          + Agregar reseña
        </button>
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

      {editing !== null ? (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1a1a1a]">
            {editing.id ? "Editar reseña" : "Nueva reseña"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#333]">Producto</label>
              <select
                value={form.productHandle ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, productHandle: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
              >
                {products.map((p) => (
                  <option key={p.handle} value={p.handle}>
                    {p.title || p.handle}
                  </option>
                ))}
                {products.length === 0 && (
                  <option value="">Cargá productos primero</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333]">Autor</label>
              <input
                value={form.authorName ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                placeholder="Ej: Carlos M."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333]">Calificación (1-5)</label>
              <select
                value={form.rating ?? 5}
                onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} ★
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333]">Título (opcional)</label>
              <input
                value={form.title ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                placeholder="Ej: Excelente producto"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#333]">Comentario</label>
              <textarea
                value={form.comment ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                rows={3}
                className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
                placeholder="Texto de la reseña"
              />
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.verifiedPurchase ?? true}
                  onChange={(e) => setForm((f) => ({ ...f, verifiedPurchase: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm font-medium text-[#333]">Compra verificada</span>
              </label>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !form.authorName?.trim() || !form.comment?.trim() || !form.productHandle}
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

      <div className="mb-6 flex items-center gap-4">
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#333]">Filtrar por producto</span>
          <select
            value={filterHandle}
            onChange={(e) => setFilterHandle(e.target.value)}
            className="rounded-lg border border-[#ddd] px-3 py-2 text-sm"
          >
            <option value="">Todos</option>
            {products.map((p) => (
              <option key={p.handle} value={p.handle}>
                {p.title || p.handle}
              </option>
            ))}
          </select>
        </label>
        <span className="text-sm text-[#666]">{filteredReviews.length} reseñas</span>
      </div>

      <div className="space-y-3">
        {filteredReviews.map((r) => (
          <div
            key={r.id}
            className="flex items-start justify-between gap-4 rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#1a1a1a]">{r.authorName}</span>
                <span className="text-yellow-600">{r.rating} ★</span>
                {r.verifiedPurchase && (
                  <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">
                    Verificada
                  </span>
                )}
              </div>
              {r.title && (
                <p className="mt-0.5 font-medium text-[#333]">{r.title}</p>
              )}
              <p className="mt-1 line-clamp-2 text-sm text-[#666]">{r.comment}</p>
              <p className="mt-1 text-xs text-[#999]">
                {r.productHandle} · {new Date(r.createdAt).toLocaleDateString("es-AR")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => handleEdit(r)}
                className="rounded-lg bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-white hover:bg-[#333]"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                disabled={saving}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <p className="rounded-xl bg-[#f5f5f5] px-6 py-12 text-center text-[#666]">
          {reviews.length === 0
            ? "No hay reseñas. Cargá el contenido inicial o agregá una reseña."
            : "No hay reseñas para este producto."}
        </p>
      )}
    </div>
  );
}
