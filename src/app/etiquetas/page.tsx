import { getCategoryBySlug } from "@/lib/data/categories";

export const dynamic = "force-dynamic";
import { getProductsByHandles } from "@/lib/data/products";
import CategoryLanding from "@/components/CategoryLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Etiquetas térmicas | WESUPPLY",
  description: "Etiquetas térmicas para impresoras de envíos. Etiquetado logístico.",
};

export default async function EtiquetasPage() {
  const category = await getCategoryBySlug("etiquetas");
  if (!category) return null;
  const products = await getProductsByHandles(category.productHandles);
  return <CategoryLanding category={category} products={products} />;
}
