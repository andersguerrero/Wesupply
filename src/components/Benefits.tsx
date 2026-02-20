const ITEMS = [
  {
    title: "Materiales resistentes",
    description:
      "Selección de aleaciones y acabados que garantizan durabilidad en entornos industriales y uso intensivo.",
  },
  {
    title: "Diseño funcional",
    description:
      "Cada producto está pensado para facilitar el trabajo diario sin sacrificar ergonomía ni seguridad.",
  },
  {
    title: "Trazabilidad",
    description:
      "Origen y procesos documentados. Cumplimiento de estándares para uso profesional y mayorista.",
  },
];

export default function Benefits() {
  return (
    <section
      className="px-6 py-[var(--section-padding-y)]"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          id="benefits-heading"
          className="sr-only"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Por qué elegirnos
        </h2>
        <div className="grid gap-20 md:grid-cols-3 md:gap-16">
          {ITEMS.map((item, i) => (
            <article key={i} className="flex flex-col items-start">
              <div
                className="mb-8 h-12 w-12 rounded-[var(--radius)] bg-[var(--brand-gray)]"
                aria-hidden
              />
              <h3
                className="text-xl font-semibold text-[var(--brand-black)]"
                style={{
                  fontFamily: "var(--font-subheading)",
                  letterSpacing: "var(--heading-tracking)",
                  lineHeight: "var(--line-height-heading)",
                }}
              >
                {item.title}
              </h3>
              <p
                className="mt-6 max-w-sm text-[var(--brand-black)]/65 leading-[var(--line-height-body)]"
                style={{ fontWeight: 400 }}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
