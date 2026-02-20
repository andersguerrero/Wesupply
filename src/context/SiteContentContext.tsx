"use client";

import { createContext, useContext } from "react";

export type SiteContentContextValue = {
  homeHero?: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaHref: string;
    trustText: string;
    heroImage: string;
  };
  trustBar?: { message: string };
  footer?: {
    address: string;
    shopLinks: { label: string; href: string }[];
    empresaLinks: { label: string; href: string }[];
    socialLinks: { label: string; href: string }[];
    newsletterTitle: string;
    newsletterDesc: string;
    legalLinks: { label: string; href: string }[];
    copyright: string;
    afipVerificationUrl?: string;
    afipLabel?: string;
  };
  termsContent?: string;
  privacyContent?: string;
  queOfrecemos?: {
    title: string;
    description: string;
    items: { title: string; desc: string; href: string }[];
    ctaText: string;
    ctaHref: string;
    image: string;
  };
  categoryBlocks?: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  navCategories?: { slug: string; label: string; href: string; products: { handle: string; sku: string; title: string; image?: string; images?: string[] }[] }[];
  /** Menú principal del header (editable desde admin). Si está vacío, se usan navCategories + enlaces por defecto. */
  headerNav?: { label: string; href: string }[];
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({
  children,
  content,
}: {
  children: React.ReactNode;
  content: SiteContentContextValue | null;
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
