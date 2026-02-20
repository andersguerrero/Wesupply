import { getAllReviews } from "@/lib/data/reviews";
import { getProductByHandle } from "@/lib/data/products";
import ReviewsCarousel from "./ReviewsCarousel";

export default async function ReviewsSection() {
  const reviews = await getAllReviews();
  const uniqueHandles = [...new Set(reviews.map((r) => r.productHandle))];
  const productMap = new Map<string, { image?: string; title: string }>();
  for (const handle of uniqueHandles) {
    const p = await getProductByHandle(handle);
    if (p) {
      productMap.set(handle, {
        image: p.images[0]?.url,
        title: p.title,
      });
    }
  }

  const reviewsWithImages = reviews.map((r) => ({
    ...r,
    productImage: productMap.get(r.productHandle)?.image,
    productTitle: productMap.get(r.productHandle)?.title,
  }));

  return (
    <section
      className="border-b border-black/[0.04] bg-[var(--brand-gray)]/50 px-6 py-20 md:py-28"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        {/* Título */}
        <h2
          id="reviews-heading"
          className="text-center text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Reseñas de clientes reales
        </h2>
        <p
          className="mx-auto mt-3 max-w-xl text-center text-[15px] text-[var(--brand-black)]/65"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          Opiniones de operaciones que confían en nuestro embalaje
        </p>

        {/* Carousel animado */}
        <div className="mt-10">
          <ReviewsCarousel reviews={reviewsWithImages} />
        </div>
      </div>
    </section>
  );
}
