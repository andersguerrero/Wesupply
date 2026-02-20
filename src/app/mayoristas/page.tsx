import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MayoristasForm from "@/components/MayoristasForm";
import FAQAccordion from "@/components/FAQAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mayoristas | WESUPPLY — Especialista en embalaje",
  description:
    "Soluciones de embalaje para operaciones de alto volumen. Precios escalonados, logística eficiente, facturación empresarial.",
};

const BENEFITS = [
  { title: "Precios escalonados por volumen", desc: "Descuentos automáticos según cantidad. Sin mínimos burocráticos." },
  { title: "Logística eficiente", desc: "Despacho programado y entregas a todo el país." },
  { title: "Facturación empresarial", desc: "Factura A y documentación para contaduría." },
  { title: "Stock permanente", desc: "Disponibilidad continua en productos de alto consumo." },
];

const STEPS = [
  { num: 1, title: "Elegís productos", desc: "Catálogo completo de cintas, protección, sellado y envío." },
  { num: 2, title: "Aplicás volumen", desc: "Descuentos se aplican automáticamente en checkout." },
  { num: 3, title: "Recibís en 24–72h", desc: "Envíos a todo el país con seguimiento." },
];

const FAQ_B2B = [
  { id: "b1", question: "¿Hacen facturación A?", answer: "Sí, emitimos factura A para operaciones B2B. La documentación se envía por email junto con el pedido." },
  { id: "b2", question: "¿Trabajan con cuentas corrientes?", answer: "Para volúmenes mayores evaluamos condiciones de pago especiales. Contactanos con tu volumen estimado." },
  { id: "b3", question: "¿Tienen descuentos adicionales?", answer: "Los descuentos por volumen se aplican automáticamente. Para pedidos recurrentes o grandes volúmenes podemos evaluar condiciones personalizadas." },
  { id: "b4", question: "¿Hacen envíos a todo el país?", answer: "Sí, enviamos a todo Argentina. En CABA y GBA la entrega es en 24–48 hs hábiles. Interior según destino." },
];

export default function MayoristasPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero técnico */}
        <section className="border-b border-black/[0.06] bg-[var(--brand-primary)] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[var(--max-width)] text-center">
            <h1
              className="text-white"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "var(--heading-tracking)",
                lineHeight: "var(--line-height-tight)",
              }}
            >
              Soluciones de embalaje para operaciones de alto volumen
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl text-lg text-white/90"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              Optimización logística. Rendimiento constante. Precio competitivo por volumen.
            </p>
            <a
              href="#formulario"
              className="mt-10 inline-flex rounded-[var(--radius)] bg-[var(--brand-cta)] px-8 py-4 text-base font-semibold text-[var(--brand-black)] transition-transform active:scale-[0.98] hover:opacity-95"
              style={{
                fontFamily: "var(--font-subheading)",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              Solicitar lista mayorista
            </a>
          </div>
        </section>

        {/* Beneficios B2B */}
        <section className="border-b border-black/[0.06] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[var(--max-width)]">
            <h2
              className="text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "var(--heading-tracking)",
              }}
            >
              Beneficios B2B
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b, i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius)] border border-black/[0.06] bg-white p-6"
                  style={{ boxShadow: "var(--shadow-subtle)" }}
                >
                  <h3
                    className="text-base font-semibold text-[var(--brand-black)]"
                    style={{ fontFamily: "var(--font-subheading)" }}
                  >
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--brand-black)]/65">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="border-b border-black/[0.06] bg-[var(--brand-gray)] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[var(--max-width)]">
            <h2
              className="text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "var(--heading-tracking)",
              }}
            >
              Proceso simple
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.num} className="flex gap-6">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius)] bg-[var(--brand-primary)] text-base font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.num}
                  </span>
                  <div>
                    <h3
                      className="text-lg font-semibold text-[var(--brand-black)]"
                      style={{ fontFamily: "var(--font-subheading)" }}
                    >
                      Paso {s.num}: {s.title}
                    </h3>
                    <p className="mt-2 text-[15px] text-[var(--brand-black)]/65">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section
          id="formulario"
          className="border-b border-black/[0.06] px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-[var(--max-width)] lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                className="text-[var(--brand-black)]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "var(--heading-tracking)",
                }}
              >
                Solicitar lista mayorista
              </h2>
              <p className="mt-4 max-w-lg text-[15px] text-[var(--brand-black)]/65">
                Completá el formulario con los datos de tu empresa. Nos contactamos para enviar la lista de precios y condiciones.
              </p>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="rounded-[var(--radius)] border border-black/[0.06] bg-white p-8">
                <MayoristasForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ B2B */}
        <section className="bg-[var(--brand-gray)] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[var(--max-width)]">
            <h2
              className="text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "var(--heading-tracking)",
              }}
            >
              Preguntas frecuentes
            </h2>
            <div className="mt-8 max-w-2xl">
              <FAQAccordion items={FAQ_B2B} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
