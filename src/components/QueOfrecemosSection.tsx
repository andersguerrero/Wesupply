"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteContent } from "@/context/SiteContentContext";

const FALLBACK_ITEMS = [
  { title: "Cintas para embalaje", desc: "Cierre seguro de cajas y paquetes.", href: "/cintas" },
  { title: "Protección y amortiguación", desc: "Burbuja, relleno y materiales que reducen roturas.", href: "/proteccion" },
  { title: "Sellado e identificación", desc: "Etiquetas térmicas y adhesivos industriales.", href: "/sellado" },
  { title: "Soluciones para envío", desc: "Todo lo necesario para fulfillment y logística.", href: "/envio" },
];

export default function QueOfrecemosSection() {
  const site = useSiteContent();
  const q = site?.queOfrecemos;
  const title = q?.title ?? "¿Qué te ofrecemos?";
  const description = q?.description ?? "Evitá el almacén: cintas, protección y sellado a tu puerta. Combiná categorías y aprovechá descuentos por volumen.";
  const items = q?.items?.length ? q.items : FALLBACK_ITEMS;
  const ctaText = q?.ctaText ?? "Explorar productos";
  const ctaHref = q?.ctaHref ?? "/cintas";
  const image = q?.image ?? "/images/hero/hero-logistica.webp";
  return (
    <section
      className="border-b border-black/[0.04] bg-white px-6 py-24 md:py-32"
      aria-labelledby="ofrecemos-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Imagen */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-[var(--brand-gray)]">
            <Image
              src={image}
              alt="Logística y embalaje"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </div>

          {/* Contenido */}
          <div>
            <h2
              id="ofrecemos-heading"
              className="text-[var(--brand-black)]"
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
            <p className="mt-5 text-[16px] font-light leading-relaxed text-[var(--brand-black)]/70">
              {description}
            </p>
            <ul className="mt-10 space-y-4">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-start gap-4 rounded-[var(--radius)] p-4 transition-colors hover:bg-[var(--brand-gray)]/50"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-primary)]"
                      aria-hidden
                    />
                    <div>
                      <span
                        className="font-semibold text-[var(--brand-black)] group-hover:text-[var(--brand-primary)]"
                        style={{ fontFamily: "var(--font-subheading)" }}
                      >
                        {item.title}
                      </span>
                      <p className="mt-0.5 text-[14px] text-[var(--brand-black)]/65">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={ctaHref}
              className="mt-8 inline-flex rounded-[var(--radius)] bg-[var(--brand-cta)] px-6 py-3.5 text-sm font-semibold text-[var(--brand-black)] transition-transform active:scale-[0.98] hover:opacity-95"
              style={{
                fontFamily: "var(--font-subheading)",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
