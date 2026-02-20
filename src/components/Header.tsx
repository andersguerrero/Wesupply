"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CartButton from "@/components/CartButton";
import { useCompare } from "@/components/CompareContext";
import { useSiteContent } from "@/context/SiteContentContext";

const OTHER_LINKS = [
  { label: "Mayoristas", href: "/mayoristas" },
  { label: "Contacto", href: "/contacto" },
];

const FALLBACK_NAV = [
  { slug: "cintas", label: "Cintas", href: "/cintas", products: [] as { handle: string; sku: string; title: string; image?: string }[] },
  { slug: "panos-textiles", label: "Paños y textiles", href: "/panos-textiles", products: [] },
  { slug: "tanzas", label: "Tanzas", href: "/tanzas", products: [] },
  { slug: "etiquetas", label: "Etiquetas", href: "/etiquetas", products: [] },
  { slug: "embalaje", label: "Embalaje", href: "/embalaje", products: [] },
  { slug: "exhibidores", label: "Exhibidores", href: "/exhibidores", products: [] },
];

function buildNavFromHeaderNav(
  headerNav: { label: string; href: string }[],
  navCategories: { slug: string; label: string; href: string; products: { handle: string; sku: string; title: string; image?: string; images?: string[] }[] }[]
) {
  return headerNav.map((item) => {
    const slug = item.href.replace(/^\//, "").split("?")[0] || "";
    const cat = navCategories.find((c) => c.slug === slug || c.href === item.href);
    return {
      slug: cat?.slug ?? (slug || `link-${item.label.toLowerCase().replace(/\s+/g, "-")}`),
      label: item.label,
      href: item.href.startsWith("/") || item.href.startsWith("http") ? item.href : `/${item.href}`,
      products: cat?.products ?? [],
    };
  });
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { items: compareItems } = useCompare();
  const site = useSiteContent();
  const baseNav = site?.navCategories ?? FALLBACK_NAV;
  const navCategories =
    (site?.headerNav?.length ?? 0) > 0 && site?.headerNav
      ? buildNavFromHeaderNav(site.headerNav, baseNav)
      : [
          ...baseNav,
          ...OTHER_LINKS.map((l) => ({
            slug: "",
            label: l.label,
            href: l.href,
            products: [] as { handle: string; sku: string; title: string; image?: string; images?: string[] }[],
          })),
        ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-white/95 backdrop-blur-xl transition-[padding,box-shadow] duration-300"
      style={{
        paddingBlock: scrolled ? "0.625rem" : "1rem",
        transitionTimingFunction: "var(--ease-out-expo)",
        boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="mx-auto flex max-w-[var(--max-width)] items-center justify-between px-6"
      >
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
          aria-label="WESUPPLY - Inicio"
        >
          <Image
            src="/images/logo.png"
            alt="We supply"
            width={280}
            height={100}
            className="h-[100px] w-auto"
            priority
            unoptimized
          />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {navCategories.map((cat) => {
            const navKey = cat.slug || cat.href || cat.label;
            const isHovered = hovered === navKey;
            return (
              <div
                key={navKey}
                className="relative"
                onMouseEnter={() => setHovered(navKey)}
              >
                <Link
                  href={cat.href}
                  className="block px-4 py-2 text-sm font-medium text-[var(--brand-black)]/75 transition-colors hover:text-[var(--brand-black)]"
                  style={{ fontFamily: "var(--font-subheading)" }}
                >
                  {cat.label}
                </Link>
                {isHovered && cat.products.length > 0 && (
                  <div
                    className="absolute left-0 top-full z-50 pt-1"
                    style={{ animation: "fadeIn 0.15s ease-out" }}
                  >
                    <div
                      className="w-[min(90vw,600px)] rounded-[var(--radius)] border border-black/[0.06] bg-white p-4 shadow-[var(--shadow-card)]"
                      style={{ minWidth: "320px" }}
                    >
                      <Link
                        href={cat.href}
                        className="mb-3 block text-[13px] font-medium text-[var(--brand-primary)] hover:underline"
                      >
                        Ver todo {cat.label} →
                      </Link>
                      <div className="grid max-h-[320px] grid-cols-4 gap-3 overflow-y-auto sm:grid-cols-3">
                        {cat.products.map((p) => (
                          <Link
                            key={p.handle}
                            href={`/producto/${p.handle}`}
                            className="group flex flex-col items-center rounded-lg p-2 transition-colors hover:bg-[var(--brand-gray)]/50"
                          >
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[var(--brand-gray)]">
                              <Image
                                src={(p as { images?: string[]; image?: string }).images?.[0] ?? (p as { image?: string }).image ?? "/images/products/placeholder.webp"}
                                alt=""
                                fill
                                className="object-contain p-1"
                                sizes="64px"
                                unoptimized
                              />
                            </div>
                            <span className="mt-1.5 line-clamp-2 text-center text-[11px] font-medium text-[var(--brand-black)]/80 group-hover:text-[var(--brand-black)]">
                              {p.sku}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {compareItems.length > 0 && (
            <Link
              href="/comparar"
              className="hidden text-sm font-medium text-[var(--brand-black)]/70 hover:text-[var(--brand-black)] sm:block"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              Comparar ({compareItems.length})
            </Link>
          )}
          <CartButton />
          <Link
            href="/cintas"
            className="rounded-[var(--radius)] bg-[var(--brand-cta)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-black)] transition-transform active:scale-[0.98] hover:opacity-95"
            style={{
              fontFamily: "var(--font-subheading)",
              boxShadow: "var(--shadow-cta)",
              transitionTimingFunction: "var(--ease-out-expo)",
            }}
          >
            Ver productos
          </Link>
        </div>
      </div>
    </header>
  );
}
