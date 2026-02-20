"use client";

export default function MayoristasForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Próximamente: integración backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="empresa"
          className="block text-[13px] font-medium uppercase tracking-wider text-[var(--brand-black)]/60"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          Nombre empresa
        </label>
        <input
          id="empresa"
          name="empresa"
          type="text"
          required
          className="mt-2 w-full rounded-[var(--radius)] border border-black/[0.1] bg-white px-4 py-3.5 text-[15px] text-[var(--brand-black)] placeholder:text-[var(--brand-black)]/40 focus:border-[var(--brand-primary)]/50 focus:outline-none"
          placeholder="Razón social"
        />
      </div>
      <div>
        <label
          htmlFor="cuit"
          className="block text-[13px] font-medium uppercase tracking-wider text-[var(--brand-black)]/60"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          CUIT
        </label>
        <input
          id="cuit"
          name="cuit"
          type="text"
          required
          className="mt-2 w-full rounded-[var(--radius)] border border-black/[0.1] bg-white px-4 py-3.5 text-[15px] text-[var(--brand-black)] placeholder:text-[var(--brand-black)]/40 focus:border-[var(--brand-primary)]/50 focus:outline-none"
          placeholder="20-12345678-9"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="block text-[13px] font-medium uppercase tracking-wider text-[var(--brand-black)]/60"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-[var(--radius)] border border-black/[0.1] bg-white px-4 py-3.5 text-[15px] text-[var(--brand-black)] placeholder:text-[var(--brand-black)]/40 focus:border-[var(--brand-primary)]/50 focus:outline-none"
            placeholder="contacto@empresa.com"
          />
        </div>
        <div>
          <label
            htmlFor="telefono"
            className="block text-[13px] font-medium uppercase tracking-wider text-[var(--brand-black)]/60"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            className="mt-2 w-full rounded-[var(--radius)] border border-black/[0.1] bg-white px-4 py-3.5 text-[15px] text-[var(--brand-black)] placeholder:text-[var(--brand-black)]/40 focus:border-[var(--brand-primary)]/50 focus:outline-none"
            placeholder="+54 11 1234-5678"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="volumen"
          className="block text-[13px] font-medium uppercase tracking-wider text-[var(--brand-black)]/60"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          Volumen mensual estimado
        </label>
        <select
          id="volumen"
          name="volumen"
          className="mt-2 w-full rounded-[var(--radius)] border border-black/[0.1] bg-white px-4 py-3.5 text-[15px] text-[var(--brand-black)] focus:border-[var(--brand-primary)]/50 focus:outline-none"
        >
          <option value="">Seleccionar</option>
          <option value="hasta-100">Hasta 100 unidades/mes</option>
          <option value="100-500">100–500 unidades/mes</option>
          <option value="500-2000">500–2.000 unidades/mes</option>
          <option value="2000-plus">+2.000 unidades/mes</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="mensaje"
          className="block text-[13px] font-medium uppercase tracking-wider text-[var(--brand-black)]/60"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          className="mt-2 w-full resize-none rounded-[var(--radius)] border border-black/[0.1] bg-white px-4 py-3.5 text-[15px] text-[var(--brand-black)] placeholder:text-[var(--brand-black)]/40 focus:border-[var(--brand-primary)]/50 focus:outline-none"
          placeholder="Necesidades específicas, productos de interés, condiciones solicitadas…"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-[var(--radius)] bg-[var(--brand-cta)] py-4 text-base font-semibold text-[var(--brand-black)] transition-transform active:scale-[0.99] hover:opacity-95 sm:w-auto sm:min-w-[240px]"
        style={{
          fontFamily: "var(--font-subheading)",
          boxShadow: "var(--shadow-cta)",
        }}
      >
        Solicitar lista mayorista
      </button>
    </form>
  );
}
