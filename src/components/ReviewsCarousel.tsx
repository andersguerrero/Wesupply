"use client";

import Image from "next/image";
import Link from "next/link";
import type { Review } from "@/lib/data/types";

type ReviewWithImage = Review & { productImage?: string; productTitle?: string };

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "opacity-100" : "opacity-30"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsCarousel({
  reviews,
}: {
  reviews: ReviewWithImage[];
}) {
  const track = [...reviews, ...reviews];

  return (
    <div
      className="reviews-marquee overflow-hidden py-6"
      role="region"
      aria-label="Reseñas de clientes"
    >
      <div className="reviews-track flex gap-6">
        {track.map((r, i) => (
          <Link
            key={`${r.id}-${i}`}
            href={`/producto/${r.productHandle}`}
            className="group flex h-full min-w-[320px] max-w-[360px] shrink-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-black/[0.06] bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="flex items-start gap-4">
              {r.productImage ? (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[var(--brand-gray)]">
                  <Image
                    src={r.productImage}
                    alt=""
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 shrink-0 rounded-lg bg-[var(--brand-gray)]" />
              )}
              <div className="min-w-0 flex-1">
                <Stars rating={r.rating} />
                {r.productTitle && (
                  <p className="mt-1 truncate text-xs font-medium text-[var(--brand-black)]/60">
                    {r.productTitle}
                  </p>
                )}
              </div>
            </div>
            <p
              className="mt-4 line-clamp-3 text-[14px] leading-relaxed text-[var(--brand-black)]/80"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {r.title && (
                <span className="font-medium">{r.title}. </span>
              )}
              {r.comment}
            </p>
            <cite className="mt-4 block not-italic text-[13px] text-[var(--brand-black)]/55">
              — {r.authorName}
            </cite>
          </Link>
        ))}
      </div>
      <style>{`
        .reviews-marquee {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .reviews-track {
          width: max-content;
          animation: reviews-scroll 60s linear infinite;
          will-change: transform;
        }
        @keyframes reviews-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reviews-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
