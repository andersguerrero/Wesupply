"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    headline: "Especialista en embalaje.",
    subheadline: "Cintas, protección y sellado para operaciones que rinden.",
    cta: "Ver productos",
    ctaHref: "/cintas",
    image: "/images/hero/hero-jardin.webp",
    productLink: "/cintas",
  },
  {
    headline: "Calidad bien pensada.",
    subheadline: "Productos diseñados para durar y reducir costos operativos.",
    cta: "Ver productos",
    ctaHref: "/cintas",
    image: "/images/hero/hero-oficina.webp",
    productLink: "/cintas",
  },
  {
    headline: "Cintas, etiquetas y embalaje.",
    subheadline: "Soluciones por categoría. Sin marketplace, sin ruido.",
    cta: "Ver categorías",
    ctaHref: "/soluciones",
    image: "/images/hero/hero-embalaje.webp",
    productLink: "/soluciones",
  },
  {
    headline: "Entrega confiable.",
    subheadline: "Logística adaptada a tu operación.",
    cta: "Contactar",
    ctaHref: "/contacto",
    image: "/images/hero/hero-logistica.webp",
    productLink: "/envio",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const goPrev = () =>
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <section
      className="relative min-h-[80vh] overflow-hidden bg-[var(--brand-primary)]"
      aria-label="Presentación"
    >
      {/* Imagen de fondo full bleed (estilo Earth Rated) */}
      <Link
        href={slide.productLink}
        className="absolute inset-0 block"
        aria-hidden
      >
        <Image
          key={current}
          src={slide.image}
          alt=""
          fill
          className="object-cover object-[35%_center] transition-opacity duration-500 md:object-[30%_center]"
          sizes="100vw"
          priority={current === 0}
          unoptimized
        />
      </Link>

      {/* Overlay — más contraste */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/96 via-[var(--brand-primary)]/85 to-[var(--brand-primary)]/40"
        aria-hidden
      />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-[var(--max-width)] items-center px-6 py-20">
        <div className="max-w-[32rem]">
          <h1
            key={current}
            className="animate-hero-in text-white"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3.25rem, 6vw, 5rem)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "-0.02em",
              fontWeight: 700,
            }}
          >
            {slide.headline}
          </h1>
          <p
            key={`sub-${current}`}
            className="mt-6 text-xl font-light leading-relaxed text-white/90"
            style={{
              fontFamily: "var(--font-subheading)",
              letterSpacing: "var(--heading-tracking)",
            }}
          >
            {slide.subheadline}
          </p>
          <div className="mt-14 flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Link
                href={slide.ctaHref}
                className="inline-flex rounded-[var(--radius)] bg-[var(--brand-cta)] px-8 py-4 text-base font-semibold text-[var(--brand-black)] transition-transform duration-200 active:scale-[0.98] hover:opacity-95"
                style={{
                  fontFamily: "var(--font-subheading)",
                  boxShadow: "var(--shadow-cta)",
                  transitionTimingFunction: "var(--ease-out-expo)",
                }}
              >
                {slide.cta}
              </Link>
              <Link
                href="/soluciones"
                className="inline-flex rounded-[var(--radius)] border-2 border-white/80 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Ver por industria
              </Link>
            </div>
            <p className="text-sm text-white/70">
              Pago seguro · MercadoPago
            </p>
          </div>
        </div>
      </div>

      {/* Slider navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Slide anterior"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 hover:scale-105 active:scale-95"
        >
          <span className="text-lg leading-none">←</span>
        </button>
        <span className="min-w-[4rem] text-center text-sm font-medium text-white/90">
          {current + 1} de {SLIDES.length}
        </span>
        <button
          type="button"
          onClick={goNext}
          aria-label="Slide siguiente"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 hover:scale-105 active:scale-95"
        >
          <span className="text-lg leading-none">→</span>
        </button>
      </div>
    </section>
  );
}
