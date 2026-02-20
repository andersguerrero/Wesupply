import { notFound } from "next/navigation";
import {
  getSubcategory,
  getSubcategoriesForCategory,
} from "@/lib/data/subcategories";
import { getProductsByHandles } from "@/lib/data/products";
import SubcategoryLanding from "@/components/SubcategoryLanding";
import type { Metadata } from "next";

const CATEGORY_TITLE = "Cintas";

export async function generateStaticParams() {
  const subs = getSubcategoriesForCategory("cintas");
  return subs.map((s) => ({ subcategory: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}): Promise<Metadata> {
  const { subcategory } = await params;
  const sub = getSubcategory("cintas", subcategory);
  if (!sub) return { title: "WESUPPLY" };
  return {
    title: `${sub.title} | WESUPPLY — Especialista en embalaje`,
    description: sub.description,
  };
}

export default async function CintasSubcategoryPage({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;
  const sub = getSubcategory("cintas", subcategory);
  if (!sub) notFound();
  const products = await getProductsByHandles(sub.productHandles);
  return (
    <SubcategoryLanding
      categorySlug="cintas"
      categoryTitle={CATEGORY_TITLE}
      subcategory={sub}
      products={products}
    />
  );
}
