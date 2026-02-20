import { getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByHandles } from "@/lib/data/products";
import CategoryLanding from "@/components/CategoryLanding";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cintas para embalaje | WESUPPLY — Especialista en embalaje",
  description:
    "Cintas adhesivas para cierre de cajas y paquetes. Rollos de alta resistencia para operaciones intensivas. Descuentos por volumen.",
};

export default async function CintasPage() {
  const category = await getCategoryBySlug("cintas");
  if (!category) return null;
  const products = await getProductsByHandles(category.productHandles);
  return <CategoryLanding category={category} products={products} />;
}
