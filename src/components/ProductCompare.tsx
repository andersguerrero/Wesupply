"use client";

import Link from "next/link";
import { useCompare } from "@/components/CompareContext";
import CompareTable from "@/components/CompareTable";

export default function ProductCompare() {
  const { items, removeFromCompare, clearCompare } = useCompare();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[var(--max-width)] px-6 py-24 text-center">
        <h1
          className="text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 700,
            letterSpacing: "var(--heading-tracking)",
          }}
        >
          Comparar productos
        </h1>
        <p className="mt-4 text-[15px] text-[var(--brand-black)]/65">
          Agregá hasta 3 productos desde las fichas de producto para compararlos.
        </p>
        <Link
          href="/cintas"
          className="mt-8 inline-flex rounded-[var(--radius)] bg-[var(--brand-cta)] px-6 py-3.5 text-sm font-semibold text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-subheading)",
            boxShadow: "var(--shadow-cta)",
          }}
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[var(--max-width)] px-6 pb-24">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1
          className="text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 700,
            letterSpacing: "var(--heading-tracking)",
          }}
        >
          Comparar productos
        </h1>
        <button
          type="button"
          onClick={clearCompare}
          className="text-[13px] font-medium text-[var(--brand-black)]/60 underline hover:text-[var(--brand-black)]/80"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          Limpiar comparación
        </button>
      </div>

      <div
        className="overflow-hidden rounded-[var(--radius)] border border-black/[0.06] bg-white"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="overflow-x-auto">
          <div className="min-w-0">
            <CompareTable items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
