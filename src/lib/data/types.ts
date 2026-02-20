/**
 * Tipos compatibles con Shopify Storefront API.
 * Estructura diseñada para migración futura sin cambios en la UI.
 */

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  price: Money;
  availableForSale: boolean;
};

export type ProductImage = {
  url: string;
  altText?: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  /** Campo extendido para PDP: especificación corta (variant.title o custom) */
  spec?: string;
  /** Campos extendidos para PDP (mock/SEO). Shopify no los tiene por defecto. */
  volumeTiers?: VolumeTier[];
  specs?: ProductSpec[];
  faq?: FAQItem[];
  applications?: { title: string; desc: string }[];
  /**
   * Atributos para filtros. Mapeable desde Shopify metafields.
   * Ej: { tipo_cinta: ["estandar"], micrones: "46-50", industria: ["logistica"] }
   */
  filterValues?: Record<string, string | string[]>;
  /** Stock disponible (para límite de cantidad). null/undefined = sin límite. */
  stock?: number | null;
};

export type VolumeTier = {
  min: number;
  max: number | null;
  discountPercent: number;
  label: string;
};

export type ProductSpec = { key: string; value: string };

export type FAQItem = { id: string; question: string; answer: string };

export type CartLineMerchandise = {
  product: { title: string };
  variant: { id: string; title: string; price: Money };
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: CartLineMerchandise;
};

export type CartLinesEdge = {
  node: CartLine;
};

export type Cart = {
  id: string;
  lines: { edges: CartLinesEdge[] };
  cost: { subtotalAmount: Money };
};

/**
 * Reseña de producto. Solo compradores verificados pueden calificar (estilo Cohley).
 * verifiedPurchase: true = vinculada a una orden confirmada.
 */
export type Review = {
  id: string;
  productId: string;
  productHandle: string;
  /** orderId para verificación; presente si verifiedPurchase */
  orderId?: string;
  authorName: string;
  rating: number; // 1-5
  title?: string;
  comment?: string;
  createdAt: string; // ISO
  verifiedPurchase: boolean;
  /** Variante comprada (opcional) */
  variantTitle?: string;
};

export type ReviewSummary = {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>; // 5: 12, 4: 3, ...
};
