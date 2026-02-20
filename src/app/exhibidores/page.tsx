import { getCategoryBySlug } from "@/lib/data/categories";

export const dynamic = "force-dynamic";
import { getProductsByHandles } from "@/lib/data/products";
import CategoryLanding from "@/components/CategoryLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibidores y retail | WESUPPLY",
  description: "Exhibidores de anteojos, soportes y retail.",
};

export default async function ExhibidoresPage() {
  const category = await getCategoryBySlug("exhibidores");
  if (!category) return null;
  const products = await getProductsByHandles(category.productHandles);
  return <CategoryLanding category={category} products={products} />;
}
