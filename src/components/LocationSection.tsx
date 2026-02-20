export default function LocationSection() {
  return (
    <section
      className="border-b border-black/[0.04] bg-[var(--brand-gray)] px-6 py-24 md:py-32"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          id="location-heading"
          className="text-[var(--brand-black)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 700,
            letterSpacing: "var(--heading-tracking)",
            lineHeight: "var(--line-height-heading)",
          }}
        >
          Ubicación
        </h2>
        <div
          className="mt-14 overflow-hidden rounded-[var(--radius)] border border-black/[0.04] bg-white p-8 md:p-10"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3
                className="text-base font-semibold text-[var(--brand-black)]"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                WESUPPLY
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--brand-black)]/75">
                Au. Cam. del Buen Ayre 4600, Galpón 55-9
                <br />
                José León Suárez, Buenos Aires, CP 1655
              </p>
              <p className="mt-6 text-sm text-[var(--brand-black)]/60">
                Horario: Lun–Vie 9:00–18:00
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-[var(--radius)] bg-[var(--brand-gray)]">
              <iframe
                src="https://maps.google.com/maps?q=Camino+del+Buen+Ayre+4600,+Jos%C3%A9+Le%C3%B3n+Su%C3%A1rez,+Buenos+Aires,+Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación WESUPPLY en Google Maps"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
