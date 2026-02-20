import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationSection from "@/components/LocationSection";

export const metadata = {
  title: "Contacto — WESUPPLY",
  description: "Contacta con el equipo de WESUPPLY para consultas y pedidos.",
};

export default function ContactoPage() {
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
            Contacto
          </h1>
          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--brand-black)]/75"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            ¿Tienes dudas sobre nuestros productos o necesitas un presupuesto?
            Escríbenos.
          </p>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <section>
              <h2
                className="text-lg font-semibold text-[var(--brand-black)]"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Ubicación
              </h2>
              <p className="mt-2 text-[var(--brand-black)]/80">
                Au. Cam. del Buen Ayre 4600, Galpón 55-9
                <br />
                José León Suárez, Buenos Aires, CP 1655
              </p>
              <a
                href="https://maps.google.com/?q=Camino+del+Buen+Ayre+4600,+José+León+Suárez,+Buenos+Aires,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-[var(--brand-primary)] hover:underline"
              >
                Ver en Google Maps
              </a>
            </section>
            <section>
              <h2
                className="text-lg font-semibold text-[var(--brand-black)]"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Email
              </h2>
              <a
                href="mailto:info@wesupply.com.ar"
                className="mt-2 block text-[var(--brand-primary)] hover:underline"
              >
                info@wesupply.com.ar
              </a>
              <p className="mt-1 text-sm text-[var(--brand-black)]/60">
                Respuesta en 24 h laborables
              </p>
            </section>
            <section>
              <h2
                className="text-lg font-semibold text-[var(--brand-black)]"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Mayoristas
              </h2>
              <a
                href="mailto:mayoristas@wesupply.com.ar"
                className="mt-2 block text-[var(--brand-primary)] hover:underline"
              >
                mayoristas@wesupply.com.ar
              </a>
              <p className="mt-1 text-sm text-[var(--brand-black)]/60">
                Condiciones especiales para volumen
              </p>
            </section>
          </div>
        </div>
        <div className="mt-20">
          <LocationSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
