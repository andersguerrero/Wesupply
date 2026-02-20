"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import ProductGallery from "@/components/ProductGallery";
import VolumePricing from "@/components/VolumePricing";
import QuantitySelector from "@/components/QuantitySelector";
import ProductSpecs from "@/components/ProductSpecs";
import ProductFAQ from "@/components/ProductFAQ";
import ProductReviews from "@/components/ProductReviews";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { formatMoney } from "@/lib/formatMoney";
import type { Product, VolumeTier, Review, ReviewSummary } from "@/lib/data/types";

const DEFAULT_VOLUME_TIERS: VolumeTier[] = [
  { min: 1, max: 9, discountPercent: 0, label: "1–9 unidades" },
  { min: 10, max: 24, discountPercent: 8, label: "10–24" },
  { min: 25, max: 49, discountPercent: 12, label: "25–49" },
  { min: 50, max: null, discountPercent: 18, label: "50+" },
];

function getPriceForQuantity(
  qty: number,
  unitPrice: number,
  tiers: VolumeTier[]
): number {
  const tier = tiers.find((t) =>
    t.max === null ? qty >= t.min : qty >= t.min && qty <= t.max
  );
  const mult = tier ? 1 - tier.discountPercent / 100 : 1;
  return unitPrice * mult * qty;
}

export type PDPContentProps = {
  product: Product;
  crossSell?: Product[];
  reviews?: Review[];
  reviewSummary?: ReviewSummary;
};

export default function PDPContent({
  product,
  crossSell = [],
  reviews = [],
  reviewSummary = { averageRating: 0, totalReviews: 0, ratingDistribution: {} },
}: PDPContentProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const unitPrice = parseFloat(product.variants[0]?.price.amount ?? "0");
  const volumeTiers = product.volumeTiers ?? DEFAULT_VOLUME_TIERS;
  const variant = product.variants[0];
  const availableForSale = variant?.availableForSale ?? true;
  const stock = product.stock;

  const handleAddToCart = useCallback(() => {
    if (!variant) return;
    const tier = volumeTiers.find((t) =>
      t.max === null ? quantity >= t.min : quantity >= t.min && quantity <= t.max
    );
    const mult = tier ? 1 - tier.discountPercent / 100 : 1;
    const price = Math.round(unitPrice * mult);
    addItem({
      variantId: variant.id,
      productTitle: product.title,
      variantTitle: product.spec ?? variant.title,
      price,
      quantity,
      image: product.images[0]?.url,
    });
  }, [quantity, addItem, product, variant, unitPrice, volumeTiers]);

  const currencyCode = variant?.price.currencyCode ?? "ARS";
  const displayPrice = useMemo(
    () =>
      formatMoney(getPriceForQuantity(quantity, unitPrice, volumeTiers), currencyCode),
    [quantity, unitPrice, volumeTiers, currencyCode]
  );

  const imageUrls = product.images.map((i) => i.url);
  const specs = product.specs ?? [];
  const faq = product.faq ?? [];
  const applications = product.applications ?? [];

  return (
    <>
      <section className="border-b border-black/[0.04] px-6 py-8 md:py-12">
        <div className="mx-auto grid max-w-[var(--max-width)] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={imageUrls} alt={product.title} />
          </div>

          <div className="flex flex-col">
            <h1
              className="text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: "var(--line-height-tight)",
              }}
            >
              {product.title}
            </h1>
            <p
              className="mt-2 text-[15px] text-[var(--brand-black)]/65"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              {product.spec ?? variant?.title ?? ""}
            </p>
            {reviewSummary.totalReviews > 0 && (
              <p className="mt-1.5 flex items-center gap-2 text-sm text-[var(--brand-black)]/70">
                <span className="inline-flex items-center gap-0.5 font-medium text-amber-600">
                  ★ {reviewSummary.averageRating.toFixed(1)}
                </span>
                <span>
                  ({reviewSummary.totalReviews}{" "}
                  {reviewSummary.totalReviews === 1 ? "reseña verificada" : "reseñas verificadas"})
                </span>
              </p>
            )}
            <div className="mt-6 flex flex-col gap-1.5">
              <p
                className="text-4xl font-bold tracking-tight text-[var(--brand-black)]"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.02em",
                  lineHeight: "var(--line-height-tight)",
                }}
              >
                {formatMoney(unitPrice, currencyCode)}
              </p>
              <span className="text-sm font-normal text-[var(--brand-black)]/55">
                por unidad · Descuento por volumen al agregar cantidad
              </span>
            </div>

            {product.description && (
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[var(--brand-black)]/75">
                {product.description}
              </p>
            )}

            <div className="mt-6">
              <VolumePricing
                tiers={volumeTiers}
                unitPrice={unitPrice}
                selectedQuantity={quantity}
                currencyCode={currencyCode}
              />
            </div>

            {availableForSale && (
            <div className="mt-6">
              <p className="mb-2 text-[13px] font-medium uppercase tracking-wider text-[var(--brand-black)]/55">
                Cantidad
              </p>
              <QuantitySelector
                value={quantity}
                min={1}
                max={stock != null ? stock : 999}
                onChange={setQuantity}
              />
              {stock != null && stock > 0 && (
                <p className="mt-1 text-xs text-[var(--brand-black)]/55">
                  {stock} disponible{stock !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!availableForSale}
                className="w-full rounded-[var(--radius)] bg-[var(--brand-cta)] py-4 text-base font-semibold text-[var(--brand-black)] transition-transform active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 hover:opacity-95 disabled:hover:opacity-60"
                style={{
                  fontFamily: "var(--font-subheading)",
                  boxShadow: "var(--shadow-cta)",
                  transitionTimingFunction: "var(--ease-out-expo)",
                }}
              >
                {availableForSale ? "Agregar" : "Sin stock"}
              </button>
              <p className="mt-2 text-center text-[13px] text-[var(--brand-black)]/50">
                Pago seguro · MercadoPago
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-black/[0.06] pt-8">
              {[
                "Entrega rápida",
                "Garantía de calidad",
                "Soporte directo",
              ].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="text-[var(--brand-primary)]"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="text-[14px] font-medium text-[var(--brand-black)]/80">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[var(--radius)] border border-black/[0.06] bg-[var(--brand-gray)]/50 p-6">
              <p
                className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-black)]/55"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Lo que dicen nuestros clientes
              </p>
              <div className="mt-4 space-y-3">
                <p className="text-[15px] italic text-[var(--brand-black)]/75">
                  &ldquo;Producto sólido, llegó en tiempo. Ideal para uso intensivo.&rdquo;
                </p>
                <p className="text-[15px] italic text-[var(--brand-black)]/75">
                  &ldquo;Buena relación calidad-precio. El descuento por volumen hace la diferencia.&rdquo;
                </p>
                <p className="text-[15px] italic text-[var(--brand-black)]/75">
                  &ldquo;Atención clara y respuesta rápida en consultas técnicas.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {applications.length > 0 && (
        <section className="bg-[var(--brand-gray)] px-6 py-12 md:py-16">
          <div className="mx-auto max-w-[var(--max-width)]">
            <h2
              className="text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: "var(--line-height-heading)",
              }}
            >
              Aplicaciones
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {applications.map((app, i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius-lg)] border border-black/[0.06] bg-white p-5"
                  style={{ boxShadow: "var(--shadow-subtle)" }}
                >
                  <h3
                    className="text-base font-semibold text-[var(--brand-black)]"
                    style={{ fontFamily: "var(--font-subheading)" }}
                  >
                    {app.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[var(--brand-black)]/60">
                    {app.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {specs.length > 0 && (
        <section className="border-t border-black/[0.06] px-6 py-12 md:py-16">
          <div className="mx-auto max-w-[var(--max-width)]">
            <h2
              className="text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: "var(--line-height-heading)",
              }}
            >
              Especificaciones técnicas
            </h2>
            <div className="mt-6">
              <ProductSpecs specs={specs} />
            </div>
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section className="bg-[var(--brand-gray)] px-6 py-12 md:py-16">
          <div className="mx-auto max-w-[var(--max-width)]">
            <h2
              className="text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: "var(--line-height-heading)",
              }}
            >
              Preguntas frecuentes
            </h2>
            <div className="mt-6 max-w-2xl">
              <ProductFAQ items={faq} />
            </div>
          </div>
        </section>
      )}

      {reviewSummary.totalReviews > 0 && (
        <ProductReviews
          summary={reviewSummary}
          reviews={reviews}
          productTitle={product.title}
        />
      )}

      <section className="border-t border-black/[0.06] bg-[var(--brand-gray)] px-6 py-20 md:py-24 pb-32 md:pb-24">
        <div className="mx-auto max-w-[var(--max-width)]">
          <h2
            className="text-[var(--brand-black)]"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: "var(--line-height-heading)",
            }}
          >
            También te puede interesar
          </h2>
          <p className="mt-2 text-[15px] text-[var(--brand-black)]/60">
            Productos complementarios para tu operación
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {crossSell.slice(0, 4).map((p) => (
              <Link
                key={p.handle}
                href={`/producto/${p.handle}`}
                className="group flex flex-col rounded-[var(--radius)] bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
                style={{
                  boxShadow: "var(--shadow-card)",
                  transitionTimingFunction: "var(--ease-out-expo)",
                }}
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded-[var(--radius)] bg-[var(--brand-gray)]">
                  {p.images[0] && (
                    <Image
                      src={p.images[0].url}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 25vw"
                      unoptimized
                    />
                  )}
                </div>
                <h3
                  className="text-lg font-semibold text-[var(--brand-black)]"
                  style={{
                    fontFamily: "var(--font-subheading)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--brand-black)]/60">
                  {p.spec ?? p.variants[0]?.title ?? ""}
                </p>
                <span className="mt-3 self-start text-sm font-medium text-[var(--brand-primary)]">
                  Ver detalle
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StickyMobileCTA
        price={displayPrice}
        ctaLabel="Agregar"
        onCtaClick={handleAddToCart}
      />
    </>
  );
}
