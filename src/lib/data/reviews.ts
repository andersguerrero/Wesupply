/**
 * Capa de reseñas. Prioriza content/reviews.json (editable desde admin).
 * Fallback a datos estáticos si no existe contenido editable.
 */
import { readContent } from "@/lib/content/store";
import type { Review, ReviewSummary } from "./types";

// Reseñas mock — todas verifiedPurchase (productos de wesupply.com.ar)
const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    productId: "gid://shopify/Product/1",
    productHandle: "ws402-tanza-bordeadora-redonda-2-5mm",
    orderId: "ord-001",
    authorName: "Carlos M.",
    rating: 5,
    title: "Excelente para el jardín",
    comment:
      "Más de 247 metros, muy buen rendimiento. Corte parejo y duradero. Entrega rápida.",
    createdAt: "2024-01-15T10:00:00Z",
    verifiedPurchase: true,
    variantTitle: "Amarillo",
  },
  {
    id: "r2",
    productId: "gid://shopify/Product/1",
    productHandle: "ws402-tanza-bordeadora-redonda-2-5mm",
    orderId: "ord-002",
    authorName: "Juan P.",
    rating: 5,
    comment: "Compatibilidad perfecta con mi bordeadora. Calidad Wesupply.",
    createdAt: "2024-02-01T14:30:00Z",
    verifiedPurchase: true,
  },
  {
    id: "r3",
    productId: "gid://shopify/Product/1",
    productHandle: "ws402-tanza-bordeadora-redonda-2-5mm",
    orderId: "ord-003",
    authorName: "Roberto F.",
    rating: 4,
    title: "Muy buena",
    comment: "Cumple lo esperado. Un poco más rígida que otras marcas pero rinde bien.",
    createdAt: "2024-02-20T09:00:00Z",
    verifiedPurchase: true,
  },
  {
    id: "r4",
    productId: "gid://shopify/Product/2",
    productHandle: "ws100-cinta-embalar-transparente-48x100m",
    orderId: "ord-004",
    authorName: "María L.",
    rating: 5,
    comment: "Mantiene el café caliente horas. Tapa se desarma para limpiar. Recomiendo.",
    createdAt: "2024-01-28T16:00:00Z",
    verifiedPurchase: true,
    variantTitle: "Negro",
  },
  {
    id: "r5",
    productId: "gid://shopify/Product/2",
    productHandle: "ws100-cinta-embalar-transparente-48x100m",
    orderId: "ord-005",
    authorName: "Andrea T.",
    rating: 5,
    title: "Ideal para la oficina",
    comment: "Diseño moderno, no gotea. Certificado INAL me da tranquilidad.",
    createdAt: "2024-02-10T11:00:00Z",
    verifiedPurchase: true,
  },
  {
    id: "r6",
    productId: "gid://shopify/Product/3",
    productHandle: "ws400-tanza-bordeadora-cuadrada-3mm",
    orderId: "ord-006",
    authorName: "Jardinería López",
    rating: 5,
    comment: "Tanza cuadrada para maleza densa. Muy resistente.",
    createdAt: "2024-02-05T08:00:00Z",
    verifiedPurchase: true,
  },
  {
    id: "r7",
    productId: "gid://shopify/Product/4",
    productHandle: "ws100-cinta-embalar-transparente-48x100m",
    orderId: "ord-007",
    authorName: "Pablo R.",
    rating: 5,
    title: "Excelente relación precio-calidad",
    comment: "6 rollos, buen adhesivo. Usamos para envíos diarios.",
    createdAt: "2024-02-12T13:00:00Z",
    verifiedPurchase: true,
  },
  {
    id: "r8",
    productId: "gid://shopify/Product/7",
    productHandle: "ws604-bolsas-aire-vino",
    orderId: "ord-008",
    authorName: "Alejandro T.",
    rating: 5,
    comment: "Tumbler Tyeso de 887 ml, mantiene todo el día. Calidad superior.",
    createdAt: "2024-02-08T10:30:00Z",
    verifiedPurchase: true,
  },
  {
    id: "r9",
    productId: "gid://shopify/Product/8",
    productHandle: "ws200-panos-microfibra-10pcs",
    orderId: "ord-009",
    authorName: "Joyas del Sur",
    rating: 5,
    comment: "Paño de microfibra excelente para plata y oro. No raya.",
    createdAt: "2024-02-15T09:00:00Z",
    verifiedPurchase: true,
  },
  {
    id: "r10",
    productId: "gid://shopify/Product/6",
    productHandle: "ws500-etiquetas-termicas-100x150-330pcs",
    orderId: "ord-010",
    authorName: "Logística Express",
    rating: 5,
    comment: "Etiquetas térmicas ideales para etiquetado de envíos. Perfectas.",
    createdAt: "2024-02-18T14:00:00Z",
    verifiedPurchase: true,
  },
];

function computeSummary(reviews: Review[]): ReviewSummary {
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;
  for (const r of reviews) {
    dist[r.rating] = (dist[r.rating] ?? 0) + 1;
    sum += r.rating;
  }
  return {
    averageRating: reviews.length ? Math.round((sum / reviews.length) * 10) / 10 : 0,
    totalReviews: reviews.length,
    ratingDistribution: dist,
  };
}

async function getReviewsFromContent(): Promise<Review[] | null> {
  const data = await readContent<Review[]>("reviews");
  if (data && Array.isArray(data) && data.length > 0) return data;
  return null;
}

/** Todas las reseñas para la home (carousel) */
export async function getAllReviews(): Promise<Review[]> {
  const fromContent = await getReviewsFromContent();
  return fromContent ?? MOCK_REVIEWS;
}

export async function getReviewsByProductHandle(
  productHandle: string
): Promise<Review[]> {
  const reviews = await getAllReviews();
  return reviews.filter((r) => r.productHandle === productHandle);
}

export async function getReviewSummary(
  productHandle: string
): Promise<ReviewSummary> {
  const reviews = await getReviewsByProductHandle(productHandle);
  return computeSummary(reviews);
}

/**
 * Enviar reseña. Solo permitido si el usuario compró el producto (estilo Cohley).
 *
 * Flujo post-compra (cuando Shopify esté conectado):
 * 1. Tras el checkout, email al cliente con enlace único: /reseña?token=xxx&product=handle
 * 2. El token contiene orderId firmado; el backend verifica que la orden incluye el producto
 * 3. Solo entonces se muestra el formulario de reseña y se persiste
 *
 * Apps alternativas: Opinew, Yotpo, Judge.me (Shopify) envían emails post-compra
 * y marcan reseñas como "verified" cuando vienen del link del email.
 */
export async function submitReview(
  _input: {
    productHandle: string;
    orderId: string;
    email: string; // para verificar que la orden es de ese email
    authorName: string;
    rating: number;
    title?: string;
    comment?: string;
  }
): Promise<{ success: boolean; reviewId?: string; error?: string }> {
  // Sin backend no podemos verificar compra real
  return {
    success: false,
    error: "Verificación de compra no disponible. Tras el checkout recibirás un enlace para dejar tu reseña.",
  };
}
