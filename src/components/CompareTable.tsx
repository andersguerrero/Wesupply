"use client";

import Link from "next/link";
import Image from "next/image";
import type { CompareItem } from "@/components/CompareContext";
import { getCompareDisplayValue } from "@/lib/data/compareLabels";
import { formatMoney } from "@/lib/formatMoney";

type CompareTableProps = {
  items: CompareItem[];
};

const ROWS: { key: string; label: string }[] = [
  { key: "micrones", label: "Micrones" },
  { key: "tipo_adhesivo", label: "Tipo de adhesivo" },
  { key: "nivel_uso", label: "Nivel de resistencia" },
  { key: "uso_recomendado", label: "Uso recomendado" },
  { key: "industria", label: "Industria ideal" },
  { key: "pack", label: "Pack disponible" },
  { key: "price", label: "Precio por unidad" },
  { key: "garantia", label: "Garantía" },
];

/** Orden de resistencia para highlight (mayor = mejor) */
const RESISTENCIA_ORDER = ["liviano", "medio", "pesado", "industrial-extremo"];
const MICRONES_ORDER = ["40-45", "46-50", "51-60", "60-plus"];

function getResistenciaRank(val: string | string[]): number {
  const v = Array.isArray(val) ? val[0] : val;
  const i = RESISTENCIA_ORDER.indexOf(v ?? "");
  return i >= 0 ? i : -1;
}

function getMicronesRank(val: string | string[]): number {
  const v = Array.isArray(val) ? val[0] : val;
  const i = MICRONES_ORDER.indexOf(v ?? "");
  return i >= 0 ? i : -1;
}

function isBestInRow(
  items: CompareItem[],
  rowKey: string,
  colIndex: number
): boolean {
  if (rowKey === "nivel_uso") {
    const ranks = items.map((it) =>
      getResistenciaRank(it.filterValues?.nivel_uso ?? [])
    );
    const max = Math.max(...ranks);
    return ranks[colIndex] === max && max >= 0;
  }
  if (rowKey === "micrones") {
    const ranks = items.map((it) =>
      getMicronesRank(it.filterValues?.micrones ?? [])
    );
    const max = Math.max(...ranks);
    return ranks[colIndex] === max && max >= 0;
  }
  if (rowKey === "price") {
    const prices = items.map((it) => it.price);
    const min = Math.min(...prices);
    return items[colIndex].price === min;
  }
  return false;
}

function getCellValue(item: CompareItem, rowKey: string): string {
  if (rowKey === "price") {
    return formatMoney(item.price, item.currencyCode);
  }
  if (rowKey === "garantia") return "—";
  if (rowKey === "uso_recomendado") {
    const apps = item.applications;
    return apps?.[0]?.title ?? "—";
  }
  return getCompareDisplayValue(item.filterValues, rowKey);
}

export default function CompareTable({ items }: CompareTableProps) {
  if (items.length === 0) return null;

  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
      <table
        className="w-full min-w-[600px] border-collapse"
        role="grid"
        aria-label="Comparativa de productos"
      >
        <thead>
          <tr>
            <th
              className="sticky left-0 z-10 w-40 border-b border-black/[0.06] bg-white py-6 pr-6 text-left align-top"
              scope="row"
            >
              <span
                className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--brand-black)]/55"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Especificación
              </span>
            </th>
            {items.map((item, i) => (
              <th
                key={item.handle}
                className="min-w-[200px] border-b border-black/[0.06] px-6 py-6 text-left align-top"
                scope="col"
              >
                <Link
                  href={`/producto/${item.handle}`}
                  className="group flex flex-col"
                >
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-[var(--radius)] bg-[var(--brand-gray)]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                        unoptimized
                      />
                    ) : null}
                  </div>
                  <h3
                    className="text-base font-semibold text-[var(--brand-black)] line-clamp-2 group-hover:text-[var(--brand-primary)]"
                    style={{
                      fontFamily: "var(--font-subheading)",
                      letterSpacing: "var(--heading-tracking)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-lg font-bold text-[var(--brand-black)]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      letterSpacing: "var(--heading-tracking)",
                    }}
                  >
                    {formatMoney(item.price, item.currencyCode)}
                  </p>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr
              key={row.key}
              className="border-b border-black/[0.04] transition-colors hover:bg-[var(--brand-gray)]/30"
            >
              <td
                className="sticky left-0 z-10 border-b border-black/[0.04] bg-white py-5 pr-6"
                style={{ borderLeftWidth: 0 }}
              >
                <span
                  className="text-[13px] font-medium text-[var(--brand-black)]/80"
                  style={{ fontFamily: "var(--font-subheading)" }}
                >
                  {row.label}
                </span>
              </td>
              {items.map((item, colIndex) => {
                const value = getCellValue(item, row.key);
                const isBest = isBestInRow(items, row.key, colIndex);
                return (
                  <td
                    key={item.handle}
                    className={`border-b border-black/[0.04] px-6 py-5 ${
                      isBest ? "bg-[var(--brand-gray)]/40" : ""
                    }`}
                  >
                    <span
                      className="text-[14px] text-[var(--brand-black)]/75"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {value}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
