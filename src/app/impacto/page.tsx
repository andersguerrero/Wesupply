import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Impacto — WESUPPLY",
  description:
    "Nuestro compromiso con la sostenibilidad y la calidad en productos industriales.",
};

export default function ImpactoPage() {
  return (
    <>
      <Header />
      <main className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[var(--max-width)]">
          <h1
            className="text-[var(--brand-black)]"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "var(--heading-tracking)",
              lineHeight: "var(--line-height-tight)",
            }}
          >
            Impacto
          </h1>
          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--brand-black)]/75"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            Creemos en productos que duran. Menos reemplazos, menos desperdicio.
          </p>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <section className="rounded-[var(--radius-lg)] border border-black/[0.06] bg-[var(--brand-gray)]/50 p-8">
              <h2
                className="text-lg font-semibold text-[var(--brand-black)]"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Productos diseñados para durar
              </h2>
              <p className="mt-4 text-[var(--brand-black)]/75 leading-relaxed">
                Seleccionamos materiales y procesos que maximizan la vida útil de
                cada producto. Durabilidad como principio reduce el impacto
                ambiental a largo plazo.
              </p>
            </section>
            <section className="rounded-[var(--radius-lg)] border border-black/[0.06] bg-[var(--brand-gray)]/50 p-8">
              <h2
                className="text-lg font-semibold text-[var(--brand-black)]"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Trazabilidad
              </h2>
              <p className="mt-4 text-[var(--brand-black)]/75 leading-relaxed">
                Conocemos el origen de nuestros materiales. Cada lote incluye
                documentación que garantiza cumplimiento de normativas y
                estándares de calidad.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
