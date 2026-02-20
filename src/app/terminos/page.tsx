import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content/loaders";
import { textToHtml } from "@/lib/textToHtml";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de servicio — WESUPPLY",
  description: "Términos y condiciones de uso del sitio y servicios de WESUPPLY.",
};

export const dynamic = "force-dynamic";

const DEFAULT_TERMS = (
  <div className="mt-12 space-y-8 text-[15px] leading-relaxed text-[var(--brand-black)]/80">
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>
        1. Aceptación de los términos
      </h2>
      <p>Al acceder y utilizar el sitio web de WESUPPLY y sus servicios, usted acepta quedar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de los mismos, le solicitamos que no utilice nuestros servicios.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>2. Descripción del servicio</h2>
      <p>WESUPPLY ofrece productos de embalaje, cintas, protección, sellado y soluciones para envío a empresas y operaciones comerciales. La información de productos, precios y disponibilidad está sujeta a cambios sin previo aviso. Las órdenes están condicionadas a la confirmación de stock.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>3. Pedidos y pagos</h2>
      <p>Los pedidos realizados a través del sitio o por otros canales quedan sujetos a confirmación. Los métodos de pago aceptados incluyen MercadoPago y transferencia bancaria, según las opciones disponibles al momento del checkout. Los precios se expresan en pesos argentinos (ARS) e incluyen IVA salvo indicación en contrario.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>4. Envíos y entregas</h2>
      <p>Realizamos envíos a todo el país. Los plazos de entrega son estimados y pueden variar según el destino y la logística. En CABA y GBA ofrecemos opciones de envío sin costo a partir de montos determinados. El riesgo de la mercadería se transmite al comprador al momento de la entrega.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>5. Devoluciones y reclamos</h2>
      <p>Las devoluciones y reclamos por productos defectuosos o errores de envío deben notificarse dentro del plazo que indiquemos en la confirmación del pedido. Se requieren pruebas fotográficas cuando corresponda. Las condiciones específicas se informan al momento de la compra.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>6. Propiedad intelectual</h2>
      <p>El contenido del sitio (textos, imágenes, logotipos, diseños) es propiedad de WESUPPLY o de sus licenciantes. Queda prohibida su reproducción, distribución o uso comercial sin autorización previa por escrito.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>7. Modificaciones</h2>
      <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor al publicarse en el sitio. El uso continuado del servicio constituye la aceptación de los términos vigentes.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>8. Contacto</h2>
      <p>Para consultas sobre estos términos, puede contactarnos en <a href="mailto:info@wesupply.com.ar" className="text-[var(--brand-primary)] hover:underline">info@wesupply.com.ar</a> o visitar nuestra página de <a href="/contacto" className="text-[var(--brand-primary)] hover:underline">contacto</a>.</p>
    </section>
  </div>
);

export default async function TerminosPage() {
  const site = await getSiteContent();
  const termsContent = site?.termsContent?.trim();

  return (
    <>
      <Header />
      <main className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h1
            className="text-[var(--brand-black)]"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: "var(--line-height-tight)",
            }}
          >
            Términos de servicio
          </h1>
          <p className="mt-4 text-[15px] text-[var(--brand-black)]/65">
            Última actualización: {new Date().toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          {termsContent ? (
            <div
              className="mt-12 space-y-6 text-[15px] leading-relaxed text-[var(--brand-black)]/80 prose prose-p:mb-4 prose-headings:font-semibold prose-headings:font-[var(--font-subheading)] prose-a:text-[var(--brand-primary)] prose-a:no-underline hover:prose-a:underline"
              style={{ fontFamily: "var(--font-body)" }}
              dangerouslySetInnerHTML={{ __html: textToHtml(termsContent) }}
            />
          ) : (
            DEFAULT_TERMS
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
