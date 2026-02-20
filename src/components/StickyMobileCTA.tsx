"use client";

import { useEffect, useState } from "react";

export type StickyMobileCTAProps = {
  price: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export default function StickyMobileCTA({
  price,
  ctaLabel = "Agregar",
  onCtaClick,
}: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > 400;
      setHasScrolled(pastHero);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hasScrolled) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, [hasScrolled]);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/[0.06] bg-white/95 backdrop-blur-md md:hidden"
      style={{
        boxShadow: "0 -2px 20px rgba(0,0,0,0.04)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s var(--ease-out-expo)",
      }}
    >
      <div className="mx-auto flex max-w-[var(--max-width)] items-center justify-between gap-4 px-6 py-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[var(--brand-black)]/55">
            Precio
          </span>
          <p
            className="text-xl font-semibold text-[var(--brand-black)]"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--heading-tracking)",
            }}
          >
            {price}
          </p>
        </div>
        <button
          type="button"
          onClick={onCtaClick}
          className="shrink-0 rounded-[var(--radius)] bg-[var(--brand-cta)] px-6 py-3.5 text-base font-semibold text-[var(--brand-black)] transition-transform active:scale-[0.98] hover:opacity-95"
          style={{
            fontFamily: "var(--font-subheading)",
            boxShadow: "var(--shadow-cta)",
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
