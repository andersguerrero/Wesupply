/**
 * Tipos para el contenido editable del admin.
 */

export type EditableProduct = {
  sku: string;
  handle: string;
  title: string;
  image: string;
  price?: number;
  categorySlug: string;
  description?: string;
};

export type EditableCategory = {
  slug: string;
  label: string;
  title: string;
  shortTitle?: string;
  description: string;
  productHandles: string[];
  hero: { headline: string; subheadline: string; image?: string };
  comparisonTable?: { headers: string[]; rows: { label: string; values: string[] }[] };
  applications: { title: string; desc: string }[];
  faq: { id: string; question: string; answer: string }[];
};

export type SiteContent = {
  homeHero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaHref: string;
    trustText: string;
    heroImage: string;
  };
  trustBar: { message: string };
  footer: {
    address: string;
    shopLinks: { label: string; href: string }[];
    empresaLinks: { label: string; href: string }[];
    socialLinks: { label: string; href: string }[];
    newsletterTitle: string;
    newsletterDesc: string;
    legalLinks: { label: string; href: string }[];
    copyright: string;
  };
  queOfrecemos: {
    title: string;
    description: string;
    items: { title: string; desc: string; href: string }[];
    ctaText: string;
    ctaHref: string;
    image: string;
  };
  meta: { siteTitle: string; siteDescription: string };
};
