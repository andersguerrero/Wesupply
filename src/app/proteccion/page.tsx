import { getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByHandles } from "@/lib/data/products";
import CategoryLanding from "@/components/CategoryLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protección y amortiguación | WESUPPLY — Especialista en embalaje",
  description:
    "Material de protección para productos frágiles. Bolsas de burbuja, protectores. Reduce roturas durante el transporte.",
};

export default async function ProteccionPage() {
  const category = getCategoryBySlug("proteccion");
  if (!category) return null;
  const products = await getProductsByHandles(category.productHandles);
  return <CategoryLanding category={category} products={products} />;
}
