const BULLETS = [
  "Especificaciones técnicas claras en cada producto",
  "Certificaciones y trazabilidad cuando aplica",
  "Descuentos por volumen sin mínimos burocráticos",
  "Entrega a todo el país con seguimiento",
  "Soporte directo para consultas técnicas",
];

export default function TrustLayer() {
  return (
    <section
      className="border-b border-black/[0.04] bg-[var(--brand-gray)]/50 px-6 py-20 md:py-28"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          id="trust-heading"
          className="text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "var(--heading-tracking)",
            lineHeight: "var(--line-height-heading)",
          }}
        >
          ¿Por qué elegir WESUPPLY?
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BULLETS.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[15px] text-[var(--brand-black)]/75"
            >
              <span
                className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-primary)]"
                aria-hidden
              />
              <span style={{ fontFamily: "var(--font-subheading)" }}>
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
