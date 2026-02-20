import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryHero from "@/components/CategoryHero";
import CategoryFilterableGrid from "@/components/CategoryFilterableGrid";
import ComparisonTable from "@/components/ComparisonTable";
import FAQAccordion from "@/components/FAQAccordion";
import type { SubcategoryMeta } from "@/lib/data/subcategories";
import type { Product } from "@/lib/data/types";

type SubcategoryLandingProps = {
  categorySlug: string;
  categoryTitle: string;
  subcategory: SubcategoryMeta;
  products: Product[];
};

export default function SubcategoryLanding({
  categorySlug,
  categoryTitle,
  subcategory,
  products,
}: SubcategoryLandingProps) {
  return (
    <>
      <Header />
      <main>
        <CategoryHero
          headline={subcategory.hero.headline}
          subheadline={subcategory.hero.subheadline}
          image={subcategory.hero.image}
        />

        {/* Breadcrumb / contexto */}
        <section className="border-b border-black/[0.06] px-6 py-6">
          <div className="mx-auto max-w-[var(--max-width)]">
            <nav aria-label="Breadcrumb" className="text-sm text-[var(--brand-black)]/55">
              <Link href={`/${categorySlug}`} className="hover:text-[var(--brand-primary)]">
                {categoryTitle}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--brand-black)]/80">{subcategory.title}</span>
            </nav>
          </div>
        </section>

        {/* Descripción técnica */}
        <section className="border-b border-black/[0.06] px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[var(--max-width)]">
            <p
              className="max-w-2xl text-[16px] leading-relaxed text-[var(--brand-black)]/75"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {subcategory.description}
            </p>
          </div>
        </section>

        {/* Grid productos */}
        <section
          id="productos"
          className="scroll-mt-24 bg-[var(--brand-gray)] px-6 py-16 md:py-24"
          aria-labelledby="productos-heading"
        >
          <div className="mx-auto max-w-[var(--max-width)]">
            <h2
              id="productos-heading"
              className="text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "var(--heading-tracking)",
              }}
            >
              Productos
            </h2>
            <div className="mt-8">
              <CategoryFilterableGrid
                categorySlug={categorySlug}
                products={products}
              />
            </div>
          </div>
        </section>

        {/* Tabla comparativa */}
        {subcategory.comparisonTable && (
          <section className="border-b border-black/[0.06] px-6 py-16 md:py-20">
            <div className="mx-auto max-w-[var(--max-width)]">
              <h2
                className="text-[var(--brand-black)]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                  fontWeight: 700,
                  letterSpacing: "var(--heading-tracking)",
                }}
              >
                Comparativo
              </h2>
              <div className="mt-6">
                <ComparisonTable
                  headers={subcategory.comparisonTable.headers}
                  rows={subcategory.comparisonTable.rows}
                />
              </div>
            </div>
          </section>
        )}

        {/* Ideal para */}
        <section className="bg-[var(--brand-gray)] px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[var(--max-width)]">
            <h2
              className="text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                fontWeight: 700,
                letterSpacing: "var(--heading-tracking)",
              }}
            >
              Ideal para
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subcategory.idealFor.map((item, i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius)] border border-black/[0.06] bg-white p-5"
                  style={{ boxShadow: "var(--shadow-subtle)" }}
                >
                  <h3
                    className="text-base font-semibold text-[var(--brand-black)]"
                    style={{ fontFamily: "var(--font-subheading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[var(--brand-black)]/60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        {subcategory.faq.length > 0 && (
          <section className="border-b border-black/[0.06] px-6 py-16 md:py-20">
            <div className="mx-auto max-w-[var(--max-width)]">
              <h2
                className="text-[var(--brand-black)]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                  fontWeight: 700,
                  letterSpacing: "var(--heading-tracking)",
                }}
              >
                Preguntas frecuentes
              </h2>
              <div className="mt-6 max-w-2xl">
                <FAQAccordion items={subcategory.faq} />
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
