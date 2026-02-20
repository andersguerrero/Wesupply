import Link from "next/link";
import { VOLUME_PACKS } from "@/lib/data/categories";

export default function PacksSection() {
  return (
    <section
      id="packs"
      className="scroll-mt-24 border-b border-black/[0.04] bg-[var(--brand-gray)] px-6 py-24 md:py-32"
      aria-labelledby="packs-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          id="packs-heading"
          className="text-center text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: "var(--line-height-heading)",
          }}
        >
          Comprá más, ahorrá más
        </h2>
        <p
          className="mx-auto mt-5 max-w-2xl text-center text-[16px] font-light text-[var(--brand-black)]/70"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          Pack 10, 25 y 50+ con descuentos exclusivos. Se aplican automáticamente en checkout.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {VOLUME_PACKS.map((pack, i) => (
            <Link
              key={pack.name}
              href={pack.href}
              className="group relative flex flex-col rounded-[var(--radius)] border border-black/[0.06] bg-white p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
              style={{
                boxShadow: "var(--shadow-card)",
                transitionTimingFunction: "var(--ease-out-expo)",
              }}
            >
              {i === 1 && (
                <span
                  className="absolute -top-2 right-6 rounded-full bg-[var(--brand-cta)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--brand-black)]"
                  style={{ fontFamily: "var(--font-subheading)" }}
                >
                  Más conveniente
                </span>
              )}
              <span
                className="text-sm font-medium uppercase tracking-wider text-[var(--brand-primary)]"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                {pack.name}
              </span>
              <p
                className="mt-2 text-3xl font-bold text-[var(--brand-black)]"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "var(--heading-tracking)",
                }}
              >
                {pack.discount}% de ahorro
              </p>
              <p className="mt-1 text-sm text-[var(--brand-black)]/60">
                {pack.label}
              </p>
              <span
                className="mt-6 self-start text-sm font-semibold text-[var(--brand-primary)] transition-colors group-hover:text-[var(--brand-primary)]/80"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Ver productos →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
