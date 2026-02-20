import type { Metadata } from "next";
import { Syne, Oswald } from "next/font/google";
import "@/styles/globals.css";
import { CartProvider } from "@/components/CartContext";
import { CompareProvider } from "@/components/CompareContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import CartDrawer from "@/components/CartDrawer";
import TrustBar from "@/components/TrustBar";
import { getSiteContent, getNavCategories } from "@/lib/content/loaders";

const syne = Syne({
  variable: "--font-heading-fallback",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-subheading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WESUPPLY — Especialista en embalaje",
  description: "Cintas, protección, sellado y envío. Soluciones de embalaje para operaciones que rinden.",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteContent, navCategories] = await Promise.all([getSiteContent(), getNavCategories()]);
  return (
    <html lang="es-AR" className={`${syne.variable} ${oswald.variable}`}>
      <body className="antialiased">
        <SiteContentProvider content={{ ...siteContent, navCategories }}>
          <CartProvider>
            <CompareProvider>
              <TrustBar />
              {children}
              <CartDrawer />
            </CompareProvider>
          </CartProvider>
        </SiteContentProvider>
      </body>
    </html>
  );
}
