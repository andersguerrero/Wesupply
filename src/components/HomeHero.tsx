"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteContent } from "@/context/SiteContentContext";

const DEFAULTS = {
  headline: "Explorá soluciones de embalaje para tu operación",
  subheadline: "Cintas, protección, sellado y envío. Descuentos por volumen. Envío a todo el país.",
  ctaText: "Ver productos",
  ctaHref: "/cintas",
  trustText: "Pago seguro · MercadoPago",
  heroImage: "/images/hero/hero-embalaje.webp",
};

export default function HomeHero() {
  const site = useSiteContent();
  const h = site?.homeHero ?? DEFAULTS;
  return (
    <section
      className="relative w-full min-h-[75vh] overflow-hidden bg-[var(--brand-primary)]"
      aria-label="Presentación"
    >
      {/* Imagen de fondo full bleed */}
      <div className="absolute inset-0">
        <Image
          src={h.heroImage || DEFAULTS.heroImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          unoptimized
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/95 via-[var(--brand-primary)]/80 to-[var(--brand-primary)]/40"
          aria-hidden
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-[var(--max-width)] items-center px-6 py-12 lg:py-16">
        <div className="max-w-2xl">
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "-0.02em",
              fontWeight: 700,
            }}
          >
            {h.headline || DEFAULTS.headline}
          </h1>
          <p
            className="mt-6 text-xl font-light leading-relaxed text-white/90"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            {h.subheadline || DEFAULTS.subheadline}
          </p>
          <div className="mt-10">
            <Link
              href={h.ctaHref || DEFAULTS.ctaHref}
              className="inline-flex w-fit rounded-[var(--radius)] bg-[var(--brand-cta)] px-8 py-4 text-base font-semibold text-[var(--brand-black)] transition-transform active:scale-[0.98] hover:opacity-95"
              style={{
                fontFamily: "var(--font-subheading)",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              {h.ctaText || DEFAULTS.ctaText}
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">
            {h.trustText || DEFAULTS.trustText}
          </p>
        </div>
      </div>
    </section>
  );
}
