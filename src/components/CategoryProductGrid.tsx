import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/data/types";

type CategoryProductGridProps = {
  products: Product[];
  /** Futuro: filtros activos para UI */
  activeFilters?: Record<string, string[]>;
};

export default function CategoryProductGrid({
  products,
}: CategoryProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-[var(--radius)] border border-black/[0.06] bg-[var(--brand-gray)]/50 px-8 py-16 text-center">
        <p className="text-[15px] text-[var(--brand-black)]/65">
          No hay productos en esta categoría por el momento. Próximamente ampliaremos el catálogo.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} />
      ))}
    </div>
  );
}
