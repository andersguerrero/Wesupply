export type ProductSpec = { key: string; value: string };
export type FAQItem = { id: string; question: string; answer: string };
export type VolumeTier = {
  min: number;
  max: number | null;
  discountPercent: number;
  label: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  spec: string;
  description: string;
  unitPrice: number;
  volumeTiers: VolumeTier[];
  images: string[];
  specs: ProductSpec[];
  faq: FAQItem[];
  applications: { title: string; desc: string }[];
};

const VOLUME_TIERS: VolumeTier[] = [
  { min: 1, max: 9, discountPercent: 0, label: "1–9 unidades" },
  { min: 10, max: 24, discountPercent: 8, label: "10–24" },
  { min: 25, max: 49, discountPercent: 12, label: "25–49" },
  { min: 50, max: null, discountPercent: 18, label: "50+" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "cable-acero-6mm",
    name: "Cable de acero 6 mm",
    spec: "Acero inoxidable AISI 316 · 100 m",
    description:
      "Cable de acero inoxidable de alta resistencia, ideal para aplicaciones de elevación, izado y amarre en entornos industriales y marinos. Fabricado según normativa EN 12385-4, garantiza la máxima seguridad y durabilidad. Resistente a la corrosión y a condiciones extremas.",
    unitPrice: 89,
    volumeTiers: VOLUME_TIERS,
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    ],
    specs: [
      { key: "Material", value: "Acero inoxidable AISI 316" },
      { key: "Diámetro", value: "6 mm" },
      { key: "Longitud", value: "100 m" },
      { key: "Carga mínima rotura", value: "2.120 kg" },
      { key: "Normativa", value: "EN 12385-4" },
      { key: "Acabado", value: "Brillo" },
    ],
    faq: [
      {
        id: "1",
        question: "¿Qué longitud tiene el cable?",
        answer:
          "El cable se suministra en bobinas de 100 m. Para longitudes personalizadas, contacta con ventas para presupuesto.",
      },
      {
        id: "2",
        question: "¿Incluye certificado de calidad?",
        answer:
          "Sí. Cada lote incluye certificado de conformidad según EN 12385-4 y trazabilidad del material.",
      },
      {
        id: "3",
        question: "¿Cuál es el plazo de entrega?",
        answer:
          "Stock estándar: 2–4 días laborables. Pedidos superiores a 500 m: consultar disponibilidad.",
      },
    ],
    applications: [
      { title: "Elevación y izado", desc: "Sistemas de carga y grúas." },
      { title: "Amarre y sujeción", desc: "Fijación de cargas en transporte." },
      { title: "Estructuras", desc: "Tirantes y elementos tensados." },
    ],
  },
  {
    id: "2",
    slug: "abrazadera-industrial",
    name: "Abrazadera industrial",
    spec: "Acero galvanizado · 50–80 mm",
    description:
      "Abrazadera de acero galvanizado para fijación de tuberías, conductos y elementos estructurales. Diseño robusto que garantiza sujeción firme y resistencia a la intemperie. Rango de apertura 50–80 mm, apta para uso industrial y construcción.",
    unitPrice: 12,
    volumeTiers: VOLUME_TIERS,
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
    ],
    specs: [
      { key: "Material", value: "Acero galvanizado" },
      { key: "Rango", value: "50–80 mm" },
      { key: "Acabado", value: "Galvanizado en caliente" },
      { key: "Uso", value: "Tuberías, conductos" },
    ],
    faq: [
      {
        id: "1",
        question: "¿Qué diámetro de tubería soporta?",
        answer:
          "El rango 50–80 mm permite sujetar tuberías de ese diámetro nominal. Consulta tabla de compatibilidad para medidas exactas.",
      },
    ],
    applications: [
      { title: "Instalaciones", desc: "Sujeción de tuberías y conductos." },
      { title: "Construcción", desc: "Fijación de elementos." },
    ],
  },
  {
    id: "3",
    slug: "gancho-carga",
    name: "Gancho de carga",
    spec: "Capacidad 2 t · Forja",
    description:
      "Gancho de carga forjado con capacidad nominal de 2 toneladas. Diseñado para sistemas de elevación, eslingas y grúas. Fabricado en acero de alta resistencia con tratamiento térmico. Seguro y certificado para uso profesional.",
    unitPrice: 45,
    volumeTiers: VOLUME_TIERS,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
    ],
    specs: [
      { key: "Capacidad", value: "2 t" },
      { key: "Material", value: "Acero forjado" },
      { key: "Tratamiento", value: "Térmico" },
      { key: "Apertura", value: "Estándar" },
    ],
    faq: [
      {
        id: "1",
        question: "¿Incluye certificación?",
        answer: "Sí, certificado de conformidad según normativa de equipos de elevación.",
      },
    ],
    applications: [
      { title: "Elevación", desc: "Grúas y polipastos." },
      { title: "Eslingado", desc: "Sistemas de carga." },
    ],
  },
  {
    id: "4",
    slug: "eslinga-plana",
    name: "Eslinga plana",
    spec: "Poliéster · 2 m · 1 t",
    description:
      "Eslinga plana de poliéster de 2 metros de longitud y capacidad de carga de 1 tonelada. Ideal para carga y descarga de mercancías, protección de superficies sensibles y distribución uniforme del peso. Ligera y fácil de manejar.",
    unitPrice: 28,
    volumeTiers: VOLUME_TIERS,
    images: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    ],
    specs: [
      { key: "Material", value: "Poliéster" },
      { key: "Longitud", value: "2 m" },
      { key: "Capacidad", value: "1 t" },
      { key: "Ancho", value: "50 mm" },
    ],
    faq: [
      {
        id: "1",
        question: "¿Resiste la intemperie?",
        answer: "El poliéster es resistente a la humedad y la mayoría de condiciones. Evitar exposición prolongada a UV sin protección.",
      },
    ],
    applications: [
      { title: "Carga general", desc: "Mercancías y palés." },
      { title: "Protección", desc: "Superficies delicadas." },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
