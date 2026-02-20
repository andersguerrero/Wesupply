/**
 * Capa de abstracción de productos.
 * Lee desde content/ cuando existe; si no, usa products-catalog.
 */
import type { Product } from "./types";
import { NAV_CATEGORIES } from "./products-catalog";
import { getNavCategories } from "@/lib/content/loaders";

export const USE_MOCK = true;

const VOLUME_TIERS = [
  { min: 1, max: 9, discountPercent: 0, label: "1–9 unidades" },
  { min: 10, max: 24, discountPercent: 8, label: "10–24" },
  { min: 25, max: 49, discountPercent: 12, label: "25–49" },
  { min: 50, max: null, discountPercent: 18, label: "50+" },
];

type CatalogProduct = {
  handle: string;
  sku: string;
  title: string;
  image?: string;
  images?: string[];
  price?: number;
  description?: string;
  spec?: string;
  specs?: { key: string; value: string }[];
  faq?: { id: string; question: string; answer: string }[];
  applications?: { title: string; desc: string }[];
  stock?: number | null;
  weightKg?: number;
  heightCm?: number;
  widthCm?: number;
  lengthCm?: number;
  volumeTiers?: { min: number; max: number | null; discountPercent: number; label: string }[];
};

function makeProduct(p: CatalogProduct): Product {
  const unitPrice = p.price ?? 0;
  const urls = p.images?.length
    ? p.images.filter(Boolean)
    : (p.image ? [p.image] : []);
  const images = urls.length > 0
    ? urls.map((url) => ({ url }))
    : [{ url: "/images/products/placeholder.webp" }];
  const baseSpecs = [{ key: "SKU", value: p.sku }];
  const extraSpecs = p.specs ?? [];
  const specs = [...baseSpecs, ...extraSpecs.filter((s) => s.key !== "SKU")];
  const stock = p.stock;
  const availableForSale = stock === undefined || stock === null || stock > 0;
  return {
    id: `gid://shopify/Product/${p.handle}`,
    handle: p.handle,
    title: `${p.sku} - ${p.title}`,
    spec: p.spec ?? p.title,
    description: p.description ?? `Producto ${p.sku}. ${p.title}. Consultá por stock y precios.`,
    images,
    variants: [
      {
        id: p.handle,
        title: "Estándar",
        price: { amount: String(unitPrice), currencyCode: "ARS" },
        availableForSale,
      },
    ],
    volumeTiers: p.volumeTiers?.length ? p.volumeTiers : VOLUME_TIERS,
    specs,
    faq: p.faq,
    applications: p.applications,
    stock: p.stock,
  };
}

/** Catálogo activo: content/ o estático */
function getCatalog() {
  const cats = getNavCategories();
  return cats.flatMap((cat) =>
    cat.products.map((p) =>
      makeProduct({
        ...p,
        images: p.images?.length ? p.images : p.image ? [p.image] : undefined,
      })
    )
  );
}

export async function getProducts(): Promise<Product[]> {
  if (USE_MOCK) return getCatalog();
  return getCatalog();
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  return getCatalog().find((p) => p.handle === handle) ?? null;
}

export async function getProductsByHandles(handles: string[]): Promise<Product[]> {
  const set = new Set(handles);
  return getCatalog().filter((p) => set.has(p.handle));
}
