export default function TestimonialSection() {
  return (
    <section
      className="border-b border-black/[0.04] bg-[var(--brand-gray)] px-6 py-24 md:py-32"
      aria-labelledby="testimonial-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2 id="testimonial-heading" className="sr-only">
          Lo que dicen de nosotros
        </h2>
        <blockquote className="text-center">
          <p
            className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-[var(--brand-black)]/85 md:text-2xl"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            &ldquo;WESUPPLY trae embalaje de calidad a tu puerta—a precios competitivos y con envío confiable.&rdquo;
          </p>
          <footer className="mt-8">
            <cite
              className="not-italic text-[14px] text-[var(--brand-black)]/55"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              Cliente B2B, Logística
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
