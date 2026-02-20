"use client";

import type { FilterConfig, FilterGroup } from "@/lib/data/filters";

export type FilterValues = Record<string, string[]>;

type FilterPanelProps = {
  config: FilterConfig;
  values: FilterValues;
  onChange: (key: string, value: string, checked: boolean) => void;
  onClear: () => void;
  /** Para mobile: cerrar drawer al aplicar */
  onApply?: () => void;
  variant?: "sidebar" | "drawer";
};

function FilterGroupBlock({
  group,
  values,
  onChange,
}: {
  group: FilterGroup;
  values: string[];
  onChange: (value: string, checked: boolean) => void;
}) {
  return (
    <div className="border-b border-black/[0.06] pb-6 last:border-b-0 last:pb-0">
      <h3
        className="mb-4 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--brand-black)]/55"
        style={{ fontFamily: "var(--font-subheading)" }}
      >
        {group.label}
      </h3>
      <ul className="space-y-3">
        {group.options.map((opt) => {
          const checked = values.includes(opt.value);
          return (
            <li key={opt.value}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => onChange(opt.value, e.target.checked)}
                  className="h-4 w-4 rounded border-black/[0.2] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/30"
                />
                <span className="text-[14px] text-[var(--brand-black)]/80">
                  {opt.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function FilterPanel({
  config,
  values,
  onChange,
  onClear,
  onApply,
  variant = "sidebar",
}: FilterPanelProps) {
  const hasActive = Object.values(values).some((arr) => arr.length > 0);

  return (
    <div
      className={variant === "drawer" ? "flex flex-col" : "flex flex-col"}
      role="group"
      aria-label="Filtros"
    >
      <div className="mb-6 flex items-center justify-between">
        <span
          className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--brand-black)]/55"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          Filtros
        </span>
        {hasActive && (
          <button
            type="button"
            onClick={onClear}
            className="text-[12px] text-[var(--brand-black)]/55 underline hover:text-[var(--brand-black)]/80"
          >
            Limpiar
          </button>
        )}
      </div>
      <div className="space-y-6">
        {config.groups.map((group) => (
          <FilterGroupBlock
            key={group.key}
            group={group}
            values={values[group.key] ?? []}
            onChange={(value, checked) => onChange(group.key, value, checked)}
          />
        ))}
      </div>
      {variant === "drawer" && onApply && (
        <button
          type="button"
          onClick={onApply}
          className="mt-8 w-full rounded-[var(--radius)] bg-[var(--brand-cta)] py-3.5 text-sm font-semibold text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-subheading)",
            boxShadow: "var(--shadow-cta)",
          }}
        >
          Aplicar filtros
        </button>
      )}
    </div>
  );
}
