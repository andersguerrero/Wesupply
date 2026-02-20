import { getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByHandles } from "@/lib/data/products";
import CategoryLanding from "@/components/CategoryLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluciones para envío | WESUPPLY — Especialista en embalaje",
  description:
    "Etiquetas, protección y señalización para envíos. Optimizado para e-commerce y logística.",
};

export default async function EnvioPage() {
  const category = getCategoryBySlug("envio");
  if (!category) return null;
  const products = await getProductsByHandles(category.productHandles);
  return <CategoryLanding category={category} products={products} />;
}
