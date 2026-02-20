type ComparisonTableProps = {
  headers: string[];
  rows: { label: string; values: string[] }[];
};

export default function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-black/[0.06] bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-black/[0.08] bg-[var(--brand-gray)]/60">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-[var(--brand-black)]/70"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-black/[0.04] last:border-b-0 transition-colors hover:bg-[var(--brand-gray)]/30"
            >
              <td
                className="px-6 py-4 text-[15px] font-medium text-[var(--brand-black)]"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                {row.label}
              </td>
              {row.values.map((val, j) => (
                <td
                  key={j}
                  className="px-6 py-4 text-[15px] text-[var(--brand-black)]/70"
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
