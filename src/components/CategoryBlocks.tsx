"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteContent } from "@/context/SiteContentContext";

type CategoryBlock = {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  hero?: { image?: string };
};

type CategoryBlocksProps = {
  categories: CategoryBlock[];
};

export default function CategoryBlocks({ categories }: CategoryBlocksProps) {
  const site = useSiteContent();
  const cb = site?.categoryBlocks;
  const title = cb?.title ?? "Explorá por categoría";
  const subtitle = cb?.subtitle ?? "Combiná y sumá a tu carrito. Sin mínimos. Descuentos automáticos por volumen.";
  const ctaText = cb?.ctaText ?? "Ver categoría →";

  const mainCategories = categories;

  return (
    <section
      className="border-b border-black/[0.04] bg-[var(--brand-gray)] px-6 py-24 md:py-32"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          id="categories-heading"
          className="text-center text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: "var(--line-height-heading)",
          }}
        >
          {title}
        </h2>
        <p
          className="mx-auto mt-5 max-w-2xl text-center text-[16px] font-light text-[var(--brand-black)]/65"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          {subtitle}
        </p>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mainCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group flex flex-col overflow-hidden rounded-[var(--radius)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              style={{
                boxShadow: "var(--shadow-card)",
                transitionTimingFunction: "var(--ease-out-expo)",
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--brand-gray)]">
                {cat.hero?.image ? (
                  <Image
                    src={cat.hero.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                ) : (
                  <div className="h-full w-full bg-[var(--brand-gray)]" />
                )}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1.5 bg-[var(--brand-primary)]"
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3
                  className="text-xl font-semibold text-[var(--brand-black)]"
                  style={{
                    fontFamily: "var(--font-subheading)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {cat.shortTitle ?? cat.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[var(--brand-black)]/65">
                  {cat.description}
                </p>
                <span
                  className="mt-4 self-start text-sm font-medium text-[var(--brand-primary)] underline decoration-[var(--brand-primary)]/40 underline-offset-2 transition-colors group-hover:text-[var(--brand-primary)]"
                  style={{ fontFamily: "var(--font-subheading)" }}
                >
                  {ctaText}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
