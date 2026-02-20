import { getCategoryBySlug } from "@/lib/data/categories";

export const dynamic = "force-dynamic";
import { getProductsByHandles } from "@/lib/data/products";
import CategoryLanding from "@/components/CategoryLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tanzas bordeadora | WESUPPLY",
  description: "Tanzas para bordeadora cuadrada y redonda. Jardinería y mantenimiento.",
};

export default async function TanzasPage() {
  const category = await getCategoryBySlug("tanzas");
  if (!category) return null;
  const products = await getProductsByHandles(category.productHandles);
  return <CategoryLanding category={category} products={products} />;
}
