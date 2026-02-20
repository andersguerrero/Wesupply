import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";

const FAQ_ITEMS = [
  {
    id: "1",
    question: "¿Cómo realizo un pedido?",
    answer:
      "Añade los productos al carrito desde la ficha de cada artículo, selecciona cantidad y finaliza la compra. Recibirás confirmación por email con los datos del pedido.",
  },
  {
    id: "2",
    question: "¿Cuáles son los plazos de entrega?",
    answer:
      "Para productos en stock estándar, el envío se realiza en 2–4 días laborables. Pedidos especiales o de gran volumen: consultar disponibilidad.",
  },
  {
    id: "3",
    question: "¿Ofrecen descuentos por volumen?",
    answer:
      "Sí. Los precios se ajustan automáticamente según la cantidad. En la ficha de producto verás la tabla de precios por volumen. Para pedidos mayoristas, contacta con nosotros.",
  },
  {
    id: "4",
    question: "¿Incluyen certificados de calidad?",
    answer:
      "Sí. Los productos técnicos incluyen certificado de conformidad y documentación según normativa aplicable. Solícitalo si lo necesitas para tu proyecto.",
  },
  {
    id: "5",
    question: "¿Cómo contactar con atención al cliente?",
    answer:
      "Escríbenos a info@wesupply.com.ar o usa el formulario de la página Contacto. Respondemos en un plazo máximo de 24 horas laborables.",
  },
];

export const metadata = {
  title: "FAQ — WESUPPLY",
  description: "Preguntas frecuentes sobre pedidos, envíos y productos.",
};

export default function FAQPage() {
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
            Preguntas frecuentes
          </h1>
          <p
            className="mt-6 max-w-2xl text-[var(--brand-black)]/75"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            Respuestas a las dudas más habituales sobre nuestros productos y
            servicios.
          </p>
          <div className="mt-14 max-w-2xl">
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
