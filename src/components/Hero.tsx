"use client";

import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800";

export default function Hero() {
  return (
    <section
      className="flex min-h-[80vh] items-center bg-[var(--brand-primary)] px-6 py-24"
      aria-label="Presentación"
    >
      <div className="mx-auto grid w-full max-w-[var(--max-width)] grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-[28rem]">
          <h1
            className="animate-hero-in text-white"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "var(--heading-tracking)",
              fontWeight: 700,
            }}
          >
            Calidad bien pensada.
          </h1>
          <p
            className="mt-8 text-lg leading-relaxed text-white/95"
            style={{
              fontFamily: "var(--font-subheading)",
              letterSpacing: "var(--heading-tracking)",
            }}
          >
            Productos diseñados para durar.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/#productos"
              className="inline-flex rounded-[var(--radius)] bg-[var(--brand-cta)] px-6 py-3.5 text-base font-semibold text-[var(--brand-black)] transition-transform duration-200 active:scale-[0.98] hover:opacity-95"
              style={{
                fontFamily: "var(--font-subheading)",
                boxShadow: "var(--shadow-cta)",
                transitionTimingFunction: "var(--ease-out-expo)",
              }}
            >
              Ver productos
            </a>
            <a
              href="/#productos"
              className="inline-flex rounded-[var(--radius)] border border-white/70 bg-transparent px-6 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-white/10"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              Explorar
            </a>
          </div>
        </div>
        <Link
          href="/producto/cable-acero-6mm"
          className="relative flex min-h-[320px] overflow-hidden rounded-[var(--radius-lg)] bg-white/8"
          style={{ boxShadow: "var(--shadow-hero-block)" }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Cable de acero industrial"
            fill
            className="object-cover opacity-90"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <span className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.2em] text-white/90">
            Cable de acero 6 mm — Ver producto
          </span>
        </Link>
      </div>
    </section>
  );
}
