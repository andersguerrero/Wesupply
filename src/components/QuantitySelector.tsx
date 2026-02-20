"use client";

export type QuantitySelectorProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export default function QuantitySelector({
  value,
  min = 1,
  max = 999,
  onChange,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div
      className="inline-flex items-center rounded-[var(--radius)] border border-black/[0.08] bg-white"
      style={{ boxShadow: "var(--shadow-subtle)" }}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Reducir cantidad"
        className="flex h-12 w-12 items-center justify-center text-[var(--brand-black)]/70 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--brand-gray)] hover:text-[var(--brand-black)]"
        style={{
          transitionTimingFunction: "var(--ease-out-expo)",
        }}
      >
        <span className="text-xl font-light leading-none">−</span>
      </button>
      <span
        className="min-w-[3rem] text-center text-base font-medium tabular-nums text-[var(--brand-black)]"
        style={{ fontFamily: "var(--font-subheading)" }}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
        className="flex h-12 w-12 items-center justify-center text-[var(--brand-black)]/70 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--brand-gray)] hover:text-[var(--brand-black)]"
        style={{
          transitionTimingFunction: "var(--ease-out-expo)",
        }}
      >
        <span className="text-xl font-light leading-none">+</span>
      </button>
    </div>
  );
}
