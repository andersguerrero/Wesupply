"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteContent } from "@/context/SiteContentContext";

const FALLBACK_SHOP = [
  { label: "Cintas", href: "/cintas" },
  { label: "Paños y textiles", href: "/panos-textiles" },
  { label: "Tanzas", href: "/tanzas" },
  { label: "Etiquetas", href: "/etiquetas" },
  { label: "Embalaje", href: "/embalaje" },
  { label: "Exhibidores", href: "/exhibidores" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Mayoristas", href: "/mayoristas" },
];

const FALLBACK_EMPRESA = [
  { label: "Contacto", href: "/contacto" },
  { label: "FAQ", href: "/faq" },
  { label: "Impacto", href: "/impacto" },
  { label: "Soluciones", href: "/soluciones" },
];

const ICON_SVG: Record<string, string> = {
  Instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  TikTok:
    "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

export default function Footer() {
  const site = useSiteContent();
  const f = site?.footer;
  const shopLinks = f?.shopLinks?.length ? f.shopLinks : FALLBACK_SHOP;
  const empresaLinks = f?.empresaLinks?.length ? f.empresaLinks : FALLBACK_EMPRESA;
  const socialLinks = f?.socialLinks?.length
    ? f.socialLinks
    : [
        { label: "Instagram", href: "#" },
        { label: "TikTok", href: "#" },
        { label: "LinkedIn", href: "#" },
      ];
  const address = f?.address ?? "Au. Cam. del Buen Ayre 4600, Galpón 55-9\nJosé León Suárez, Buenos Aires, CP 1655";
  const newsletterTitle = f?.newsletterTitle ?? "Unite a nuestra comunidad";
  const newsletterDesc = f?.newsletterDesc ?? "Novedades, ofertas y descuentos por volumen.";
  const legalLinks = f?.legalLinks?.length
    ? f.legalLinks
    : [
        { label: "Términos de servicio", href: "/terminos" },
        { label: "Política de privacidad", href: "/privacidad" },
      ];
  const copyright = f?.copyright ?? "Todos los derechos reservados.";
  const afipRaw = f?.afipVerificationUrl?.trim();
  const afipUrl = afipRaw
    ? afipRaw.startsWith("http")
      ? afipRaw
      : /^\d{11}$/.test(afipRaw)
        ? `https://serviciosweb.afip.gob.ar/clavefiscal/qr/response.aspx?cuit=${afipRaw}`
        : afipRaw
    : null;
  const afipLabel = f?.afipLabel?.trim() || "Data Fiscal AFIP";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setNewsletterStatus("loading");
    setNewsletterMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, message: message.trim() || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setEmail("");
        setMessage("");
        setNewsletterStatus("ok");
        setNewsletterMessage(data.message ?? "¡Gracias por suscribirte!");
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(data.error ?? "Ocurrió un error. Intentá de nuevo.");
      }
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage("Error de conexión. Intentá más tarde.");
    }
  };

  return (
    <footer
      className="bg-[var(--brand-neutral)] px-6 py-16 text-white"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Logo + ubicación */}
          <div className="lg:max-w-[14rem]">
            <a href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="We supply"
                width={160}
                height={44}
                className="h-11 w-auto brightness-0 invert sm:h-12"
                unoptimized
              />
            </a>
            <p className="mt-5 whitespace-pre-line text-xs leading-relaxed text-white/50">
              {address}
            </p>
          </div>

          {/* Productos */}
          <div>
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/50"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              Productos
            </h3>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/50"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              Empresa
            </h3>
            <ul className="mt-4 space-y-2.5">
              {empresaLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/50"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              {newsletterTitle}
            </h3>
            <p className="mt-4 text-sm text-white/60">
              {newsletterDesc}
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-4 flex flex-col gap-2"
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  disabled={newsletterStatus === "loading"}
                  required
                  className="min-w-0 flex-1 rounded-[var(--radius)] border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--brand-primary)] focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="shrink-0 rounded-[var(--radius)] bg-[var(--brand-cta)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-black)] transition-transform hover:opacity-95 active:scale-[0.98] disabled:opacity-60"
                  style={{ fontFamily: "var(--font-subheading)" }}
                >
                  {newsletterStatus === "loading" ? "…" : "Suscribirse"}
                </button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dejanos un mensaje (opcional)"
                disabled={newsletterStatus === "loading"}
                rows={2}
                className="w-full rounded-[var(--radius)] border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[var(--brand-primary)] focus:outline-none disabled:opacity-60 resize-none"
              />
              {newsletterMessage && (
                <p
                  className={`text-sm ${
                    newsletterStatus === "ok" ? "text-green-400" : "text-amber-300"
                  }`}
                >
                  {newsletterMessage}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Social + legal + copyright */}
        <div className="mt-16 grid grid-cols-1 items-center gap-4 border-t border-white/[0.08] pt-10 text-[13px] md:grid-cols-3">
          <div className="flex gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                {ICON_SVG[s.label] ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d={ICON_SVG[s.label]} />
                  </svg>
                ) : (
                  <span className="text-xs">{s.label[0]}</span>
                )}
              </a>
            ))}
          </div>
          <div className="order-3 text-center text-white/40 md:order-none">
            © {new Date().getFullYear()} WESUPPLY. {copyright}
          </div>
          <div className="flex flex-wrap justify-end items-center gap-4 text-white/45">
            {legalLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white/70">
                {l.label}
              </a>
            ))}
            {afipUrl && (
              <a
                href={afipUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70"
              >
                {afipLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
