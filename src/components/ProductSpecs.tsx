export type ProductSpecRow = {
  key: string;
  value: string;
};

export type ProductSpecsProps = {
  specs: ProductSpecRow[];
};

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <div
      className="overflow-hidden rounded-[var(--radius-lg)] border border-black/[0.06] bg-white"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <table className="w-full border-collapse text-left">
        <tbody>
          {specs.map((row, i) => (
            <tr
              key={row.key}
              className={
                i < specs.length - 1
                  ? "border-b border-black/[0.06]"
                  : ""
              }
            >
              <td
                className="py-6 pl-8 text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--brand-black)]/55"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                {row.key}
              </td>
              <td className="py-6 pr-8 text-right text-[15px] font-semibold text-[var(--brand-black)]">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
