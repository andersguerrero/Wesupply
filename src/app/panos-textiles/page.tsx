import { getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByHandles } from "@/lib/data/products";
import CategoryLanding from "@/components/CategoryLanding";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Paños y textiles | WESUPPLY",
  description: "Paños microfibra y repasadores de cocina. Calidad para limpieza y hogar.",
};

export default async function PanosTextilesPage() {
  const category = await getCategoryBySlug("panos-textiles");
  if (!category) return null;
  const products = await getProductsByHandles(category.productHandles);
  return <CategoryLanding category={category} products={products} />;
}
