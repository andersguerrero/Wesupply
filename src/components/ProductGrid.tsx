import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/data/products";

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <section
      id="productos"
      className="scroll-mt-24 bg-[var(--brand-gray)] px-6 py-[var(--section-padding-y)]"
      aria-labelledby="products-heading"
    >
      <span id="shop" className="block scroll-mt-24" aria-hidden />
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          id="products-heading"
          className="text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 700,
            letterSpacing: "var(--heading-tracking)",
            lineHeight: "var(--line-height-heading)",
          }}
        >
          Productos
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.handle}
              href={`/producto/${product.handle}`}
              className="group flex flex-col rounded-[var(--radius)] bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
              style={{
                boxShadow: "var(--shadow-card)",
                transitionTimingFunction: "var(--ease-out-expo)",
              }}
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-[var(--radius)] bg-[var(--brand-gray)]">
                {product.images[0] ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                ) : (
                  <div className="h-full w-full bg-[var(--brand-gray)]" />
                )}
              </div>
              <h3
                className="text-lg font-semibold text-[var(--brand-black)]"
                style={{
                  fontFamily: "var(--font-subheading)",
                  letterSpacing: "var(--heading-tracking)",
                  lineHeight: "var(--line-height-heading)",
                }}
              >
                {product.title}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--brand-black)]/60 leading-relaxed">
                {product.spec ?? product.variants[0]?.title ?? ""}
              </p>
              <span className="mt-4 self-start text-sm font-medium text-[var(--brand-primary)] transition-colors duration-200 group-hover:text-[var(--brand-primary)]/80">
                Ver detalle
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
