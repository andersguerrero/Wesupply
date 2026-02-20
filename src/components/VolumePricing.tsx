"use client";

export type VolumeTier = {
  min: number;
  max: number | null;
  discountPercent: number;
  label: string;
};

const DEFAULT_TIERS: VolumeTier[] = [
  { min: 1, max: 9, discountPercent: 0, label: "1–9 unidades" },
  { min: 10, max: 24, discountPercent: 8, label: "10–24" },
  { min: 25, max: 49, discountPercent: 12, label: "25–49" },
  { min: 50, max: null, discountPercent: 18, label: "50+" },
];

export type VolumePricingProps = {
  tiers?: VolumeTier[];
  unitPrice: number;
  selectedQuantity: number;
  currencyCode?: string;
};

function getTierForQuantity(
  quantity: number,
  tiers: VolumeTier[]
): VolumeTier | undefined {
  return tiers.find((t) => {
    if (t.max === null) return quantity >= t.min;
    return quantity >= t.min && quantity <= t.max;
  });
}

function formatPrice(amount: number, currencyCode: string): string {
  const symbol = currencyCode === "EUR" ? "€" : "$";
  return `${amount.toLocaleString("es-AR")} ${symbol}`;
}

export default function VolumePricing({
  tiers = DEFAULT_TIERS,
  unitPrice,
  selectedQuantity,
  currencyCode = "ARS",
}: VolumePricingProps) {
  const activeTier = getTierForQuantity(selectedQuantity, tiers);
  const discountMultiplier = activeTier
    ? 1 - activeTier.discountPercent / 100
    : 1;
  const displayPrice = unitPrice * discountMultiplier;

  return (
    <div className="rounded-[var(--radius-lg)] border border-black/[0.06] bg-white p-5">
      <table className="w-full border-collapse text-left">
        <tbody>
          {tiers.map((tier) => {
            const isActive =
              activeTier?.min === tier.min && activeTier?.max === tier.max;
            const tierPrice =
              unitPrice * (1 - tier.discountPercent / 100);
            return (
              <tr
                key={tier.label}
                className={`transition-colors duration-200 ${
                  isActive ? "bg-[var(--brand-gray)]/60" : ""
                }`}
              >
                <td
                  className={`py-2 pl-4 pr-3 text-sm ${
                    isActive
                      ? "font-semibold text-[var(--brand-black)]"
                      : "text-[var(--brand-black)]/70"
                  }`}
                  style={{ fontFamily: "var(--font-subheading)" }}
                >
                  {tier.label}
                </td>
                <td className="py-2 pr-4 text-right text-sm font-medium text-[var(--brand-black)]">
                  {tier.discountPercent > 0 ? (
                    <>
                      <span className="text-[var(--brand-black)]/50 line-through">
                        {formatPrice(unitPrice, currencyCode)}
                      </span>{" "}
                      {formatPrice(tierPrice, currencyCode)}
                    </>
                  ) : (
                    formatPrice(unitPrice, currencyCode)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-3 text-[13px] text-[var(--brand-black)]/55">
        El descuento se aplica automáticamente en checkout.
      </p>
    </div>
  );
}
