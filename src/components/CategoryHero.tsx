import Image from "next/image";
import Link from "next/link";

type CategoryHeroProps = {
  headline: string;
  subheadline: string;
  image?: string;
};

export default function CategoryHero({
  headline,
  subheadline,
  image = "/images/hero/hero-embalaje.webp",
}: CategoryHeroProps) {
  return (
    <section
      className="relative min-h-[50vh] overflow-hidden bg-[var(--brand-primary)]"
      aria-label="Presentación"
    >
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/95 via-[var(--brand-primary)]/75 to-transparent"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[var(--max-width)] items-center px-6 py-16">
        <div className="max-w-2xl">
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "var(--heading-tracking)",
              fontWeight: 700,
            }}
          >
            {headline}
          </h1>
          <p
            className="mt-6 text-lg leading-relaxed text-white/95"
            style={{
              fontFamily: "var(--font-subheading)",
              letterSpacing: "var(--heading-tracking)",
            }}
          >
            {subheadline}
          </p>
          <Link
            href="#productos"
            className="mt-8 inline-flex rounded-[var(--radius)] bg-[var(--brand-cta)] px-6 py-3.5 text-base font-semibold text-[var(--brand-black)] transition-transform active:scale-[0.98] hover:opacity-95"
            style={{
              fontFamily: "var(--font-subheading)",
              boxShadow: "var(--shadow-cta)",
            }}
          >
            Ver productos
          </Link>
        </div>
      </div>
    </section>
  );
}
