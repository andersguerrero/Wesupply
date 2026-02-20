import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PDPContent from "@/components/PDPContent";
import { getProductByHandle, getProducts } from "@/lib/data/products";
import { getReviewsByProductHandle, getReviewSummary } from "@/lib/data/reviews";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) return { title: "Producto no encontrado — WESUPPLY" };
  return {
    title: `${product.title} — WESUPPLY`,
    description: product.description || product.spec || product.title,
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const [product, allProducts, reviews, reviewSummary] = await Promise.all([
    getProductByHandle(slug),
    getProducts(),
    getReviewsByProductHandle(slug),
    getReviewSummary(slug),
  ]);
  if (!product) notFound();

  const crossSell = allProducts.filter((p) => p.handle !== product.handle);

  return (
    <>
      <Header />
      <main>
        <PDPContent
          product={product}
          crossSell={crossSell}
          reviews={reviews}
          reviewSummary={reviewSummary}
        />
      </main>
      <Footer />
    </>
  );
}
