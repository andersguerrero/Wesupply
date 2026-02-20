import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCompare from "@/components/ProductCompare";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparar productos | WESUPPLY — Especialista en embalaje",
  description:
    "Compará especificaciones técnicas de productos de embalaje. Micrones, adhesivo, resistencia y más.",
};

export default function CompararPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] pt-8">
        <ProductCompare />
      </main>
      <Footer />
    </>
  );
}
