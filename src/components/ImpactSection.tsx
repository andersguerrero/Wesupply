const BLOCKS = [
  {
    title: "Durabilidad",
    text: "Materiales seleccionados y procesos que garantizan productos que rinden más y generan menos reemplazos.",
  },
  {
    title: "Optimización logística",
    text: "Embalaje eficiente y operación pensada para reducir costos de envío y tiempos de entrega.",
  },
  {
    title: "Menor desperdicio",
    text: "Menos roturas, menos devoluciones. Productos que cumplen con lo prometido desde el primer uso.",
  },
];

export default function ImpactSection() {
  return (
    <section
      className="border-b border-black/[0.04] bg-white px-6 py-24 md:py-32"
      aria-labelledby="impact-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          id="impact-heading"
          className="text-center text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: "var(--line-height-heading)",
          }}
        >
          Qué hace especial nuestro embalaje
        </h2>
        <p
          className="mx-auto mt-6 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--brand-black)]/70"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          Productos industriales pensados para reducir costos operativos y maximizar vida útil.
        </p>
        <div className="mt-20 grid gap-16 md:grid-cols-3 md:gap-12">
          {BLOCKS.map((block, i) => (
            <article key={i} className="flex flex-col">
              <h3
                className="text-xl font-semibold text-[var(--brand-black)]"
                style={{
                  fontFamily: "var(--font-subheading)",
                  letterSpacing: "var(--heading-tracking)",
                }}
              >
                {block.title}
              </h3>
              <p
                className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--brand-black)]/65"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {block.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
