import { getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByHandles } from "@/lib/data/products";
import CategoryLanding from "@/components/CategoryLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sellado e identificación | WESUPPLY — Especialista en embalaje",
  description:
    "Cintas y etiquetas para cierre, identificación y señalización. Soluciones para embalaje y logística.",
};

export default async function SelladoPage() {
  const category = await getCategoryBySlug("sellado");
  if (!category) return null;
  const products = await getProductsByHandles(category.productHandles);
  return <CategoryLanding category={category} products={products} />;
}
