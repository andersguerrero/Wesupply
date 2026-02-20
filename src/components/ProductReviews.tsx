"use client";

import type { Review, ReviewSummary } from "@/lib/data/types";

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  const cls = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className="flex items-center gap-0.5 text-amber-500" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f-${i}`} className={cls} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {half > 0 && (
        <svg className={`${cls} text-amber-500`} viewBox="0 0 20 20" fill="url(#half)" aria-hidden>
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="rgb(229 231 235)" stopOpacity={1} />
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e-${i}`} className={`${cls} text-gray-200`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function maskAuthor(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
  }
  return parts[0]?.length ? `${parts[0].charAt(0)}***` : "Cliente";
}

export type ProductReviewsProps = {
  summary: ReviewSummary;
  reviews: Review[];
  productTitle: string;
};

export default function ProductReviews({
  summary,
  reviews,
  productTitle,
}: ProductReviewsProps) {
  if (summary.totalReviews === 0) return null;

  return (
    <section
      className="px-6 py-12 md:py-16"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          id="reviews-heading"
          className="text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "var(--heading-tracking)",
            lineHeight: "var(--line-height-heading)",
          }}
        >
          Reseñas de compradores
        </h2>

        {/* Resumen */}
        <div className="mt-6 flex flex-wrap items-center gap-6 rounded-[var(--radius-lg)] border border-black/[0.06] bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-[var(--brand-black)]">
              {summary.averageRating.toFixed(1)}
            </div>
            <div>
              <StarRating rating={summary.averageRating} size="md" />
              <p className="mt-1 text-sm text-[var(--brand-black)]/60">
                {summary.totalReviews}{" "}
                {summary.totalReviews === 1 ? "reseña verificada" : "reseñas verificadas"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm md:flex-row md:flex-wrap md:gap-4">
            {[5, 4, 3, 2, 1].map((n) => {
              const count = summary.ratingDistribution[n] ?? 0;
              const pct = summary.totalReviews ? (count / summary.totalReviews) * 100 : 0;
              return (
                <div key={n} className="flex items-center gap-2">
                  <span className="w-6 text-[var(--brand-black)]/60">{n}★</span>
                  <div className="h-2 w-20 overflow-hidden rounded-full bg-[var(--brand-gray)] md:w-24">
                    <div
                      className="h-full rounded-full bg-[var(--brand-primary)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-4 text-[var(--brand-black)]/50">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lista de reseñas */}
        <div className="mt-6 space-y-6">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-[var(--radius-lg)] border border-black/[0.06] bg-white p-5"
              style={{ boxShadow: "var(--shadow-subtle)" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <StarRating rating={r.rating} size="sm" />
                  {r.title && (
                    <h3
                      className="mt-1.5 text-base font-semibold text-[var(--brand-black)]"
                      style={{ fontFamily: "var(--font-subheading)" }}
                    >
                      {r.title}
                    </h3>
                  )}
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-[var(--brand-black)]/65">
                    <span>{maskAuthor(r.authorName)}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={r.createdAt}>{formatDate(r.createdAt)}</time>
                    {r.verifiedPurchase && (
                      <>
                        <span aria-hidden>·</span>
                        <span
                          className="inline-flex items-center gap-1 rounded bg-[var(--brand-primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--brand-primary)]"
                          title="Compra verificada: el cliente compró este producto"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Compra verificada
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {r.comment && (
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--brand-black)]/80">
                  {r.comment}
                </p>
              )}
              {r.variantTitle && (
                <p className="mt-2 text-[13px] text-[var(--brand-black)]/50">
                  Variante: {r.variantTitle}
                </p>
              )}
            </article>
          ))}
        </div>

        {/* Nota sobre verificación */}
        <p className="mt-6 max-w-2xl text-[13px] text-[var(--brand-black)]/55">
          Solo los clientes que compraron este producto pueden dejar una reseña.
          Tras tu compra recibirás un enlace para calificar. Esto garantiza opiniones
          honestas de compradores reales.
        </p>
      </div>
    </section>
  );
}
