/**
 * Carga el contenido editable.
 * Lee desde content/*.json y hace fallback a datos estáticos cuando no existe.
 */
import { readContent } from "./store";
import { NAV_CATEGORIES } from "@/lib/data/products-catalog";

export type ProductSpec = { key: string; value: string };
export type ProductFAQ = { id: string; question: string; answer: string };
export type ProductApplication = { title: string; desc: string };

export type ProductPreview = {
  sku: string;
  handle: string;
  title: string;
  /** Imagen principal (fallback). Se usa images[0] si existe. */
  image?: string;
  /** Varias imágenes por producto. La primera es la principal. */
  images?: string[];
  price?: number;
  categorySlug?: string;
  /** Descripción larga en la PDP */
  description?: string;
  /** Especificación corta (subtítulo bajo el título) */
  spec?: string;
  /** Especificaciones técnicas (tabla) */
  specs?: ProductSpec[];
  /** Preguntas frecuentes */
  faq?: ProductFAQ[];
  /** Aplicaciones / usos del producto */
  applications?: ProductApplication[];
  /** Stock disponible. null/undefined = sin control. */
  stock?: number | null;
  /** Peso en kg para envíos */
  weightKg?: number;
  /** Dimensiones en cm: alto, ancho, largo */
  heightCm?: number;
  widthCm?: number;
  lengthCm?: number;
  /** Descuentos por volumen. Si no se define, se usan los globales. */
  volumeTiers?: { min: number; max: number | null; discountPercent: number; label: string }[];
};

export type NavCategory = {
  slug: string;
  label: string;
  href: string;
  products: ProductPreview[];
};

export type SiteContent = {
  homeHero?: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaHref: string;
    trustText: string;
    heroImage: string;
  };
  trustBar?: { message: string };
  footer?: {
    address: string;
    shopLinks: { label: string; href: string }[];
    empresaLinks: { label: string; href: string }[];
    socialLinks: { label: string; href: string }[];
    newsletterTitle: string;
    newsletterDesc: string;
    legalLinks: { label: string; href: string }[];
    copyright: string;
    /** URL de verificación AFIP (constancia de inscripción) o CUIT para generar el link */
    afipVerificationUrl?: string;
    afipLabel?: string;
  };
  /** Contenido HTML editable de Términos de servicio */
  termsContent?: string;
  /** Contenido HTML editable de Política de privacidad */
  privacyContent?: string;
  queOfrecemos?: {
    title: string;
    description: string;
    items: { title: string; desc: string; href: string }[];
    ctaText: string;
    ctaHref: string;
    image: string;
  };
  categoryBlocks?: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  meta?: { siteTitle: string; siteDescription: string };
  /** Menú principal del header (label, href). Si está vacío se usa navCategories. */
  headerNav?: { label: string; href: string }[];
};

const CATEGORY_LABELS: Record<string, string> = {
  cintas: "Cintas",
  "panos-textiles": "Paños y textiles",
  tanzas: "Tanzas",
  etiquetas: "Etiquetas",
  embalaje: "Embalaje y envío",
  exhibidores: "Exhibidores",
};

function productsToNavCategories(
  products: (ProductPreview & { categorySlug?: string })[]
): NavCategory[] {
  const slugs = ["cintas", "panos-textiles", "tanzas", "etiquetas", "embalaje", "exhibidores"] as const;
  const contentCats = getCategoriesFromContent();
  return slugs.map((slug) => {
    const catProducts = products.filter((p) => p.categorySlug === slug);
    const fallback = NAV_CATEGORIES.find((c) => c.slug === slug);
    const contentCat = contentCats?.find((c) => c.slug === slug);
    return {
      slug,
      label: contentCat?.label ?? CATEGORY_LABELS[slug] ?? fallback?.label ?? slug,
      href: `/${slug}`,
      products: catProducts.length > 0 ? catProducts : (fallback?.products ?? []),
    };
  });
}

/** Productos agrupados por categoría (para nav y listados) */
export function getNavCategories(): NavCategory[] {
  const stored = readContent<ProductPreview[]>("products");
  if (stored && Array.isArray(stored) && stored.length > 0) {
    return productsToNavCategories(stored);
  }
  return NAV_CATEGORIES.map((c) => ({
    slug: c.slug,
    label: c.label,
    href: c.href,
    products: c.products,
  }));
}

/** Todos los handles de productos */
export function getAllProductHandles(): string[] {
  const cats = getNavCategories();
  return cats.flatMap((c) => c.products.map((p) => p.handle));
}

/** Contenido del sitio (hero, footer, etc.) */
export function getSiteContent(): SiteContent {
  const stored = readContent<SiteContent>("site");
  if (stored && typeof stored === "object") return stored;
  return {};
}

export type EditableCategory = {
  slug: string;
  label: string;
  title: string;
  shortTitle?: string;
  description: string;
  productHandles: string[];
  hero: { headline: string; subheadline: string; image?: string };
  comparisonTable?: { headers: string[]; rows: { label: string; values: string[] }[] };
  applications?: { title: string; desc: string }[];
  faq?: { id: string; question: string; answer: string }[];
  subcategories?: { slug: string; label: string }[];
};

/** Categorías completas (hero, faq, etc.) desde content o null */
export function getCategoriesFromContent(): EditableCategory[] | null {
  const stored = readContent<EditableCategory[]>("categories");
  if (stored && Array.isArray(stored)) return stored;
  return null;
}
