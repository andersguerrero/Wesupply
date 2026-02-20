const SPECS: { key: string; value: string }[] = [
  { key: "Material", value: "Acero inoxidable AISI 316" },
  { key: "Diámetro", value: "6 mm" },
  { key: "Longitud", value: "100 m" },
  { key: "Carga mínima rotura", value: "2.120 kg" },
  { key: "Normativa", value: "EN 12385-4" },
];

export default function SpecsSection() {
  return (
    <section
      className="px-6 py-[var(--section-padding-y)]"
      aria-labelledby="specs-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          id="specs-heading"
          className="text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 700,
            letterSpacing: "var(--heading-tracking)",
            lineHeight: "var(--line-height-heading)",
          }}
        >
          Especificaciones técnicas
        </h2>
        <div
          className="mt-14 overflow-hidden rounded-[var(--radius-lg)] border border-black/[0.06] bg-white"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <table className="w-full border-collapse text-left">
            <tbody>
              {SPECS.map((row, i) => (
                <tr
                  key={row.key}
                  className={
                    i < SPECS.length - 1
                      ? "border-b border-black/[0.06]"
                      : ""
                  }
                >
                  <td
                    className="py-5 pl-8 text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--brand-black)]/55"
                    style={{ fontFamily: "var(--font-subheading)" }}
                  >
                    {row.key}
                  </td>
                  <td className="py-5 pr-8 text-right text-[15px] font-medium text-[var(--brand-black)]">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
