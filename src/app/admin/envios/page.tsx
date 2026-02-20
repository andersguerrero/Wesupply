"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Link from "next/link";

type ShippingZones = {
  cercana: number;
  media: number;
  lejana: number;
};

const DEFAULTS: ShippingZones = {
  cercana: 4611,
  media: 7371,
  lejana: 10246,
};

export default function AdminEnviosPage() {
  const [zones, setZones] = useState<ShippingZones>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  useAdminAuth();

  useEffect(() => {
    fetch("/api/admin/content?key=shipping-zones")
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setZones({
            cercana: Number(data.cercana) || DEFAULTS.cercana,
            media: Number(data.media) || DEFAULTS.media,
            lejana: Number(data.lejana) || DEFAULTS.lejana,
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content?key=shipping-zones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zones),
      });
      if (!res.ok) throw new Error("Error al guardar");
      setMessage({ type: "ok", text: "Precios de envío guardados" });
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
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-[#666] hover:text-[#1a1a1a]">
          ← Panel
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-[#1a1a1a]">Envíos CABA y GBA</h1>
        <p className="mt-1 text-[#666]">
          Precios por zona (estilo Mercado Libre Flex). Solo enviamos a Capital Federal y GBA. Los envíos los realizamos nosotros.
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

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[#1a1a1a]">Precios por zona (ARS)</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333]">Zona cercana (CABA 1000–1499)</label>
            <input
              type="number"
              min={0}
              value={zones.cercana}
              onChange={(e) => setZones((z) => ({ ...z, cercana: parseInt(e.target.value, 10) || 0 }))}
              className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333]">Zona media (GBA 1500–1650)</label>
            <input
              type="number"
              min={0}
              value={zones.media}
              onChange={(e) => setZones((z) => ({ ...z, media: parseInt(e.target.value, 10) || 0 }))}
              className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333]">Zona lejana (GBA 1651–1999)</label>
            <input
              type="number"
              min={0}
              value={zones.lejana}
              onChange={(e) => setZones((z) => ({ ...z, lejana: parseInt(e.target.value, 10) || 0 }))}
              className="mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2"
            />
          </div>
        </div>
        <p className="mt-4 text-xs text-[#666]">
          Valores de referencia Mercado Libre Flex: cercana $4.611, media $7.371, lejana $10.246 (actualizar según costos).
        </p>
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 rounded-lg bg-[#1a1a1a] px-4 py-2 text-white hover:bg-[#333] disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </div>
  );
}
