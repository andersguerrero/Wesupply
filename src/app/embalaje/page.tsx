import { getCategoryBySlug } from "@/lib/data/categories";

export const dynamic = "force-dynamic";
import { getProductsByHandles } from "@/lib/data/products";
import CategoryLanding from "@/components/CategoryLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embalaje y envío | WESUPPLY",
  description: "Cajas, bolsas, joyeros y protección para empacado y envío.",
};

export default async function EmbalajePage() {
  const category = getCategoryBySlug("embalaje");
  if (!category) return null;
  const products = await getProductsByHandles(category.productHandles);
  return <CategoryLanding category={category} products={products} />;
}
