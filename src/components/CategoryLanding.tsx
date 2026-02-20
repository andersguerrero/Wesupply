import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryHero from "@/components/CategoryHero";
import CategoryFilterableGrid from "@/components/CategoryFilterableGrid";
import FAQAccordion from "@/components/FAQAccordion";
import type { CategoryMeta } from "@/lib/data/categories";
import type { Product } from "@/lib/data/types";

type CategoryLandingProps = {
  category: CategoryMeta;
  products: Product[];
};

export default function CategoryLanding({ category, products }: CategoryLandingProps) {
  return (
    <>
      <Header />
      <main>
        <CategoryHero
          headline={category.hero.headline}
          subheadline={category.hero.subheadline}
          image={category.hero.image}
        />

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
                categorySlug={category.slug}
                products={products}
              />
            </div>
          </div>
        </section>

        {/* Aplicaciones */}
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
              Aplicaciones
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.applications.map((app, i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius)] border border-black/[0.06] bg-white p-5"
                  style={{ boxShadow: "var(--shadow-subtle)" }}
                >
                  <h3
                    className="text-base font-semibold text-[var(--brand-black)]"
                    style={{ fontFamily: "var(--font-subheading)" }}
                  >
                    {app.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[var(--brand-black)]/60">
                    {app.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        {category.faq.length > 0 && (
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
                <FAQAccordion items={category.faq} />
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
