"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="group flex flex-col rounded-[var(--radius)] bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
      style={{
        boxShadow: "var(--shadow-card)",
        transitionTimingFunction: "var(--ease-out-expo)",
      }}
    >
      <Link href={`/producto/${product.handle}`} className="flex flex-col flex-1">
        <div className="relative mb-5 aspect-square overflow-hidden rounded-[var(--radius)] bg-[var(--brand-gray)]">
          {product.images[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="h-full w-full bg-[var(--brand-gray)]" />
          )}
        </div>
        <h3
          className="text-xl font-semibold text-[var(--brand-primary)]"
          style={{
            fontFamily: "var(--font-subheading)",
            letterSpacing: "var(--heading-tracking)",
          }}
        >
          {product.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-[var(--brand-black)]/60">
          {product.spec ?? product.variants[0]?.title ?? product.description}
        </p>
        <span
          className="mt-5 self-center inline-flex w-fit items-center justify-center rounded-[var(--radius)] bg-[var(--brand-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-[var(--brand-primary)]/90"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          Ver producto
        </span>
      </Link>
    </div>
  );
}
