"use client";

import { useState, useMemo } from "react";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import { SORT_OPTIONS } from "@/lib/data/filters";
import type { Product } from "@/lib/data/types";

type CategoryFilterableGridProps = {
  categorySlug: string;
  products: Product[];
};

function sortProducts(products: Product[], sortBy: string): Product[] {
  const arr = [...products];
  if (sortBy === "recomendado") return arr;
  if (sortBy === "mayor-resistencia") {
    return arr.sort((a, b) => {
      const ra = (a.filterValues?.nivel_uso as string) ?? "";
      const rb = (b.filterValues?.nivel_uso as string) ?? "";
      const order = ["liviano", "medio", "pesado", "industrial-extremo"];
      return order.indexOf(rb) - order.indexOf(ra);
    });
  }
  if (sortBy === "mejor-precio") {
    return arr.sort((a, b) => {
      const pa = parseFloat(a.variants[0]?.price.amount ?? "0");
      const pb = parseFloat(b.variants[0]?.price.amount ?? "0");
      return pa - pb;
    });
  }
  if (sortBy === "mayor-volumen") {
    return arr.sort((a, b) => {
      const pa = parseFloat(a.variants[0]?.price.amount ?? "0");
      const pb = parseFloat(b.variants[0]?.price.amount ?? "0");
      return pb - pa;
    });
  }
  return arr;
}

export default function CategoryFilterableGrid({
  products,
}: CategoryFilterableGridProps) {
  const [sortBy, setSortBy] = useState("recomendado");

  const sorted = useMemo(() => sortProducts(products, sortBy), [products, sortBy]);

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-[14px] text-[var(--brand-black)]/60"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {sorted.length} {sorted.length === 1 ? "producto" : "productos"}
        </p>
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-select"
            className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--brand-black)]/55"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            Ordenar
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-[var(--radius)] border border-black/[0.08] bg-white px-4 py-2.5 text-sm text-[var(--brand-black)] focus:border-[var(--brand-primary)]/50 focus:outline-none"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <CategoryProductGrid products={sorted} />
    </div>
  );
}
