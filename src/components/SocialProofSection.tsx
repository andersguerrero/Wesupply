const BADGES = [
  { label: "Calidad garantizada" },
  { label: "Envíos rápidos" },
  { label: "Soporte real" },
];

export default function SocialProofSection() {
  return (
    <section
      className="bg-[var(--brand-primary)] px-6 py-24 md:py-32"
      aria-labelledby="social-proof-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2 id="social-proof-heading" className="sr-only">
          Prueba social
        </h2>
        <div className="flex flex-col items-center gap-16 md:flex-row md:justify-center md:gap-24">
          <div className="text-center md:text-left">
            <p
              className="text-4xl font-bold text-white md:text-5xl"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.02em",
                lineHeight: "var(--line-height-tight)",
              }}
            >
              +50
            </p>
            <p
              className="mt-2 text-base font-medium text-white/80"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              empresas confían
            </p>
          </div>
          <div className="text-center md:text-left">
            <p
              className="text-4xl font-bold text-white md:text-5xl"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.02em",
                lineHeight: "var(--line-height-tight)",
              }}
            >
              25.000+
            </p>
            <p
              className="mt-2 text-base font-medium text-white/80"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              unidades vendidas
            </p>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {BADGES.map((badge) => (
            <span
              key={badge.label}
              className="text-sm font-medium text-white/90"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
