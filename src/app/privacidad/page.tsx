import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content/loaders";
import { textToHtml } from "@/lib/textToHtml";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad — WESUPPLY",
  description: "Política de privacidad y protección de datos personales de WESUPPLY.",
};

export const dynamic = "force-dynamic";

const DEFAULT_PRIVACY = (
  <div className="mt-12 space-y-8 text-[15px] leading-relaxed text-[var(--brand-black)]/80">
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>1. Responsable del tratamiento</h2>
      <p>WESUPPLY, con domicilio en Au. Cam. del Buen Ayre 4600, Galpón 55-9, José León Suárez, Buenos Aires, es el responsable del tratamiento de los datos personales que recopilamos a través de este sitio web y de los canales de contacto indicados.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>2. Datos que recopilamos</h2>
      <p>Podemos recopilar datos como: nombre, correo electrónico, teléfono, dirección de facturación y envío, información de la empresa, datos de uso del sitio y cookies. Estos datos se obtienen cuando usted completa formularios, realiza consultas, realiza compras o se suscribe a nuestra comunicación.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>3. Finalidad del tratamiento</h2>
      <p>Utilizamos sus datos para: procesar pedidos y gestionar la relación comercial, responder consultas, enviar información sobre productos y ofertas (con su consentimiento), cumplir obligaciones legales, mejorar nuestros servicios y la experiencia de usuario.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>4. Base legal</h2>
      <p>El tratamiento se basa en el consentimiento cuando corresponda, la ejecución de un contrato, el cumplimiento de obligaciones legales o el interés legítimo de WESUPPLY en brindar y mejorar sus servicios. En Argentina, nos regimos por la Ley 25.326 de Protección de Datos Personales.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>5. Compartir datos</h2>
      <p>No vendemos ni cedemos sus datos personales a terceros con fines comerciales. Podemos compartir información con proveedores de servicios necesarios para el funcionamiento del negocio (pagos, envíos, hosting) que actúan como encargados de tratamiento bajo contrato.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>6. Cookies y tecnologías similares</h2>
      <p>Utilizamos cookies y tecnologías similares para el funcionamiento del sitio, recordar preferencias y analizar el uso. Puede configurar su navegador para rechazar cookies, aunque ello podría afectar algunas funcionalidades del sitio.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>7. Sus derechos</h2>
      <p>Usted tiene derecho a acceder, rectificar, suprimir, oponerse al tratamiento y limitar el uso de sus datos personales. Para ejercer estos derechos o realizar consultas, puede contactarnos en <a href="mailto:info@wesupply.com.ar" className="text-[var(--brand-primary)] hover:underline">info@wesupply.com.ar</a>.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>8. Seguridad y conservación</h2>
      <p>Implementamos medidas técnicas y organizativas para proteger sus datos frente a accesos no autorizados, pérdida o alteración. Conservamos los datos durante el tiempo necesario para las finalidades indicadas o según exija la normativa aplicable.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>9. Cambios</h2>
      <p>Nos reservamos el derecho de modificar esta política. Los cambios serán publicados en esta página con la fecha de actualización. Le recomendamos revisarla periódicamente.</p>
    </section>
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--brand-black)]" style={{ fontFamily: "var(--font-subheading)" }}>10. Contacto</h2>
      <p>Para consultas sobre privacidad: <a href="mailto:info@wesupply.com.ar" className="text-[var(--brand-primary)] hover:underline">info@wesupply.com.ar</a> o <a href="/contacto" className="text-[var(--brand-primary)] hover:underline">contacto</a>.</p>
    </section>
  </div>
);

export default async function PrivacidadPage() {
  const site = getSiteContent();
  const privacyContent = site?.privacyContent?.trim();

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
            Política de privacidad
          </h1>
          <p className="mt-4 text-[15px] text-[var(--brand-black)]/65">
            Última actualización: {new Date().toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          {privacyContent ? (
            <div
              className="mt-12 space-y-6 text-[15px] leading-relaxed text-[var(--brand-black)]/80 prose prose-p:mb-4 prose-headings:font-semibold prose-headings:font-[var(--font-subheading)] prose-a:text-[var(--brand-primary)] prose-a:no-underline hover:prose-a:underline"
              style={{ fontFamily: "var(--font-body)" }}
              dangerouslySetInnerHTML={{ __html: textToHtml(privacyContent) }}
            />
          ) : (
            DEFAULT_PRIVACY
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
