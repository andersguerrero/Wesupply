/**
 * Configuración de categorías — Especialista en Embalaje.
 * Estructura escalable para filtros, subcategorías y SEO por categoría.
 */

/**
 * Futuro: estado de filtros para UI.
 * Campos preparados en subcategories: resistencia, micrones, industria, volumen.
 */
export type CategoryFilterState = Record<string, string[]>;

/** Futuro: subcategorías para navegación expandida */
export type SubcategoryRef = { slug: string; label: string };

export type CategoryMeta = {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  /** Product handles para filtro mock. Futuro: tag/collection Shopify */
  productHandles: string[];
  hero: {
    headline: string;
    subheadline: string;
    image?: string;
  };
  /** Tabla comparativa — columnas: producto o característica */
  comparisonTable?: {
    headers: string[];
    rows: { label: string; values: string[] }[];
  };
  applications: { title: string; desc: string }[];
  faq: { id: string; question: string; answer: string }[];
  /** Futuro: subcategorías para drill-down */
  subcategories?: SubcategoryRef[];
};

import { getNavCategories } from "@/lib/content/loaders";
import { getCategoriesFromContent } from "@/lib/content/loaders";

/** Categorías estáticas de respaldo */
function getStaticCategories(): CategoryMeta[] {
  const navCats = getNavCategories();
  return [
  {
    slug: "cintas",
    title: "Cintas para embalaje",
    shortTitle: "Cintas",
    productHandles: navCats.find((c) => c.slug === "cintas")?.products.map((p) => p.handle) ?? [],
    description:
      "Cintas adhesivas para cierre de cajas, paquetes y envíos. Diferentes anchos y longitudes para adaptarse a tu operación. Adhesivo resistente y fácil aplicación.",
    hero: {
      headline: "Cintas para embalaje",
      subheadline: "Cierre seguro de cajas y paquetes. Rollos de alta resistencia para operaciones intensivas.",
      image: "/images/hero/hero-embalaje.webp",
    },
    comparisonTable: {
      headers: ["Producto", "Ancho", "Longitud", "Cantidad"],
      rows: [
        { label: "Pack 6 rollos", values: ["48 mm", "100 m c/u", "6"] },
        { label: "Caja 36 rollos", values: ["48 mm", "100 m c/u", "36"] },
      ],
    },
    applications: [
      { title: "Cierre de cajas", desc: "Sellado de cartones y paquetes para envío." },
      { title: "Logística", desc: "Identificación y seguridad de bultos." },
      { title: "E-commerce", desc: "Embalaje de pedidos en alto volumen." },
    ],
    faq: [
      {
        id: "c1",
        question: "¿Qué ancho de cinta necesito?",
        answer:
          "Para cajas estándar, 48 mm es el más versátil. Para cajas grandes o pallets, considera anchos mayores.",
      },
      {
        id: "c2",
        question: "¿El adhesivo funciona en invierno?",
        answer: "Sí, nuestras cintas mantienen adherencia en un amplio rango de temperaturas.",
      },
    ],
  },
  ...navCats.filter((c) => c.slug !== "cintas").map(
    (navCat) =>
      ({
        slug: navCat.slug,
        title: navCat.label,
        shortTitle: navCat.label,
        description: `Productos ${navCat.label}. Consultá por stock y precios.`,
        productHandles: navCat.products.map((p) => p.handle),
        hero: {
          headline: navCat.label,
          subheadline: `Catálogo de ${navCat.label.toLowerCase()}.`,
          image: navCat.products[0]?.image ?? "/images/hero/hero-embalaje.webp",
        },
        applications: [],
        faq: [],
      } satisfies CategoryMeta)
  ),
  ];
}

/** Categorías: prioriza content/categories.json si existe */
export function getCategories(): CategoryMeta[] {
  const fromContent = getCategoriesFromContent();
  if (fromContent && fromContent.length > 0) {
    return fromContent.map((c) => ({
      ...c,
      applications: c.applications ?? [],
      faq: c.faq ?? [],
    })) as CategoryMeta[];
  }
  return getStaticCategories();
}

/** @deprecated Usar getCategories() para datos actualizados desde admin */
export const CATEGORIES: CategoryMeta[] = getStaticCategories();

/** Industrias para landing Soluciones */
export const INDUSTRIES = [
  {
    slug: "logistica",
    title: "Logística",
    description: "Cintas, etiquetas y protección para centros de distribución y fulfillment.",
    href: "/envio",
  },
  {
    slug: "retail",
    title: "Retail",
    description: "Embalaje para puntos de venta, reposición y pedidos online.",
    href: "/cintas",
  },
  {
    slug: "construccion",
    title: "Construcción",
    description: "Protección de materiales y herramientas en obra y transporte.",
    href: "/proteccion",
  },
  {
    slug: "hogar",
    title: "Hogar",
    description: "Soluciones para mudanzas, almacenamiento y envíos particulares.",
    href: "/envio",
  },
  {
    slug: "industrial",
    title: "Industrial",
    description: "Volúmenes mayores, especificaciones técnicas y supply chain.",
    href: "/packs",
  },
];

/** Packs de volumen — config reutilizable */
export const VOLUME_PACKS = [
  { name: "Pack 10", discount: 8, label: "10–24 unidades", href: "/packs", productsHref: "/cintas" },
  { name: "Pack 25", discount: 12, label: "25–49 unidades", href: "/packs", productsHref: "/proteccion" },
  { name: "Pack 50", discount: 18, label: "50+ unidades", href: "/packs", productsHref: "/envio" },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  const fromContent = getCategoriesFromContent();
  if (fromContent) {
    const contentCat = fromContent.find((c) => c.slug === slug);
    if (contentCat) {
      return {
        ...contentCat,
        comparisonTable: contentCat.comparisonTable,
        applications: contentCat.applications ?? [],
        faq: contentCat.faq ?? [],
        subcategories: contentCat.subcategories,
      } as CategoryMeta;
    }
  }
  return getCategories().find((c) => c.slug === slug);
}
