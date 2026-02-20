import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { INDUSTRIES } from "@/lib/data/categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluciones por industria | WESUPPLY — Especialista en embalaje",
  description:
    "Soluciones de embalaje por sector: Logística, Retail, Construcción, Hogar e Industrial. Productos pensados para cada operación.",
};

export default function SolucionesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="border-b border-black/[0.06] px-6 py-20 md:py-24"
          aria-label="Soluciones por industria"
        >
          <div className="mx-auto max-w-[var(--max-width)]">
            <h1
              className="text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--heading-tracking)",
                fontWeight: 700,
              }}
            >
              Soluciones por industria
            </h1>
            <p
              className="mt-6 max-w-2xl text-[16px] text-[var(--brand-black)]/70"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Productos de embalaje seleccionados para las necesidades de cada sector. Cintas, protección, sellado y envío.
            </p>
          </div>
        </section>

        {/* Industrias grid */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-[var(--max-width)]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map((ind) => (
                <Link
                  key={ind.slug}
                  href={ind.href}
                  className="group flex flex-col rounded-[var(--radius)] border border-black/[0.06] bg-white p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
                  style={{
                    boxShadow: "var(--shadow-card)",
                    transitionTimingFunction: "var(--ease-out-expo)",
                  }}
                >
                  <h2
                    className="text-xl font-semibold text-[var(--brand-black)]"
                    style={{
                      fontFamily: "var(--font-subheading)",
                      letterSpacing: "var(--heading-tracking)",
                    }}
                  >
                    {ind.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--brand-black)]/65">
                    {ind.description}
                  </p>
                  <span
                    className="mt-6 self-start text-sm font-medium text-[var(--brand-primary)] group-hover:text-[var(--brand-primary)]/80"
                    style={{ fontFamily: "var(--font-subheading)" }}
                  >
                    Ver soluciones →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
