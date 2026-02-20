import Header from "@/components/Header";
import HomeHero from "@/components/HomeHero";
import CategoryBlocks from "@/components/CategoryBlocks";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/data/categories";

const MAIN_CATEGORY_SLUGS = ["cintas", "panos-textiles", "tanzas", "etiquetas", "embalaje", "exhibidores"] as const;

export const dynamic = "force-dynamic";

export default function Home() {
  const mainCategories = getCategories().filter((c) =>
    MAIN_CATEGORY_SLUGS.includes(c.slug as (typeof MAIN_CATEGORY_SLUGS)[number])
  );

  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <CategoryBlocks categories={mainCategories} />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}
