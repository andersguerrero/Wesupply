"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";
import CartItem from "@/components/CartItem";
import { formatMoney } from "@/lib/formatMoney";

type ShippingQuote = {
  carrierId: string;
  carrierName: string;
  price: number;
  currency: string;
  estimatedDays?: number;
};

const PROVINCIAS = [
  "Buenos Aires",
  "Capital Federal",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

type CheckoutForm = {
  email: string;
  phone: string;
  nombre: string;
  calle: string;
  numero: string;
  pisoDepto: string;
  ciudad: string;
  provincia: string;
  cp: string;
  notas: string;
};

const INITIAL_FORM: CheckoutForm = {
  email: "",
  phone: "",
  nombre: "",
  calle: "",
  numero: "",
  pisoDepto: "",
  ciudad: "",
  provincia: "Capital Federal",
  cp: "",
  notas: "",
};

export default function CheckoutPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingQuotes, setShippingQuotes] = useState<ShippingQuote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<ShippingQuote | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);

  const update = (field: keyof CheckoutForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError(null);
    if (field === "cp" || field === "provincia") {
      setSelectedQuote(null);
      setShippingQuotes([]);
      setShippingError(null);
    }
  };

  const fetchShippingQuotes = useCallback(async () => {
    const cp = form.cp.replace(/\D/g, "").slice(0, 4);
    if (!form.provincia || cp.length < 4 || items.length === 0) return;
    setShippingLoading(true);
    setShippingError(null);
    try {
      const res = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provincia: form.provincia,
          codigoPostal: cp,
          items: items.map((i) => ({ productHandle: i.productHandle, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al cotizar envío");
      setShippingQuotes(data.quotes ?? []);
      if (data.quotes?.length > 0) {
        setSelectedQuote(data.quotes[0]);
      } else {
        setSelectedQuote(null);
      }
    } catch (e) {
      setShippingError(e instanceof Error ? e.message : "No se pudo cotizar el envío");
      setShippingQuotes([]);
      setSelectedQuote(null);
    } finally {
      setShippingLoading(false);
    }
  }, [form.cp, form.provincia, items]);

  useEffect(() => {
    const t = setTimeout(fetchShippingQuotes, 500);
    return () => clearTimeout(t);
  }, [fetchShippingQuotes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setError(null);
    const cpOk = form.cp.replace(/\D/g, "").length >= 4;
    const needsShipping = cpOk && (form.provincia === "Capital Federal" || form.provincia === "Buenos Aires");
    if (needsShipping && (shippingLoading || !selectedQuote)) {
      setError("Esperá a que se cargue el costo de envío antes de pagar.");
      return;
    }
    setIsLoading(true);

    const phone = form.phone.replace(/\D/g, "");
    const areaCode = phone.length >= 10 ? phone.slice(0, 2) || "11" : "11";
    const number = phone.length >= 10 ? phone.slice(2) : phone || "00000000";

    const mpItems = items.map((i) => ({
      title: i.name,
      quantity: i.quantity,
      unit_price: i.price,
      currency_id: "ARS" as const,
    }));
    if (selectedQuote) {
      mpItems.push({
        title: `Envío ${selectedQuote.carrierName}`,
        quantity: 1,
        unit_price: Math.max(0, selectedQuote.price),
        currency_id: "ARS" as const,
      });
    }

    try {
      const res = await fetch("/api/mercadopago/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: mpItems,
          payer: {
            email: form.email.trim(),
            name: form.nombre.trim().split(" ")[0] || form.nombre.trim(),
            surname: form.nombre.trim().split(" ").slice(1).join(" ") || ".",
            phone: { area_code: areaCode, number },
            address: {
              zip_code: form.cp.trim() || "0000",
              street_name: form.calle.trim(),
              street_number: form.numero.trim() || "0",
            },
          },
          shipments: {
            receiver_address: {
              zip_code: form.cp.trim() || "0000",
              street_name: form.calle.trim(),
              street_number: form.numero.trim() || "0",
              city_name: form.ciudad.trim(),
              state_name: form.provincia.trim(),
              country_name: "Argentina",
            },
          },
          ...((form.notas.trim() || form.pisoDepto.trim()) && {
            additional_info: [form.pisoDepto.trim() && `Piso/Depto: ${form.pisoDepto.trim()}`, form.notas.trim()].filter(Boolean).join(". "),
          }),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al crear el checkout");
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("No se obtuvo URL de pago");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al procesar");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0 && !isLoading) {
    return (
      <>
        <Header />
        <main className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-20">
          <h1
            className="text-xl font-semibold text-[var(--brand-black)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tu carrito está vacío
          </h1>
          <Link
            href="/cintas"
            className="mt-6 rounded-[var(--radius)] bg-[var(--brand-cta)] px-6 py-3 text-sm font-semibold text-[var(--brand-black)]"
          >
            Ver productos
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-[15px] transition-colors placeholder:text-black/40 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--brand-gray)] px-4 py-6 sm:py-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--brand-black)]/60 hover:text-[var(--brand-black)]"
          >
            ← Volver al inicio
          </Link>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
              {/* Formulario */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1
                    className="text-xl font-bold text-[var(--brand-black)] sm:text-2xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Finalizar compra
                  </h1>
                  <p className="mt-1 text-sm text-[var(--brand-black)]/60">
                    Enviamos solo a CABA y GBA
                  </p>
                </div>

                {/* Contacto */}
                <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--brand-black)]/70">
                    Contacto
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputClass}
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
                        Teléfono <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={inputClass}
                        placeholder="11 1234-5678"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
                        Nombre completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.nombre}
                        onChange={(e) => update("nombre", e.target.value)}
                        className={inputClass}
                        placeholder="Nombre y apellido"
                      />
                    </div>
                  </div>
                </div>

                {/* Dirección */}
                <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--brand-black)]/70">
                    Dirección de entrega
                  </h2>
                  <div className="space-y-4 sm:space-y-5">
                    <div className="grid gap-4 sm:grid-cols-[1fr,80px]">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
                          Calle <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.calle}
                          onChange={(e) => update("calle", e.target.value)}
                          className={inputClass}
                          placeholder="Av. Corrientes"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
                          Nº <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.numero}
                          onChange={(e) => update("numero", e.target.value)}
                          className={inputClass}
                          placeholder="1234"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
                        Piso / Depto
                      </label>
                      <input
                        type="text"
                        value={form.pisoDepto}
                        onChange={(e) => update("pisoDepto", e.target.value)}
                        className={inputClass}
                        placeholder="2B"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
                          Localidad <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.ciudad}
                          onChange={(e) => update("ciudad", e.target.value)}
                          className={inputClass}
                          placeholder="Buenos Aires"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
                          CP <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.cp}
                          onChange={(e) => update("cp", e.target.value)}
                          className={inputClass}
                          placeholder="1414"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
                        Provincia <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={form.provincia}
                        onChange={(e) => update("provincia", e.target.value)}
                        className={inputClass}
                      >
                        {PROVINCIAS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Cotización de envío */}
                    {form.cp.replace(/\D/g, "").length >= 4 && (
                      <div className="rounded-xl border border-black/5 bg-[var(--brand-gray)]/50 p-4">
                        <h3 className="mb-3 text-sm font-semibold text-[var(--brand-black)]">
                          Costo de envío
                        </h3>
                        {shippingLoading ? (
                          <p className="text-sm text-[var(--brand-black)]/60">Calculando…</p>
                        ) : shippingError ? (
                          <p className="text-sm text-amber-600">{shippingError}</p>
                        ) : shippingQuotes.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {shippingQuotes.map((q) => (
                              <button
                                key={`${q.carrierId}-${q.price}`}
                                type="button"
                                onClick={() => setSelectedQuote(q)}
                                className={`rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                                  selectedQuote?.carrierId === q.carrierId && selectedQuote?.price === q.price
                                    ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-black)]"
                                    : "border-black/10 bg-white text-[var(--brand-black)]/80 hover:border-black/20"
                                }`}
                              >
                                <span className="block text-xs font-normal opacity-80">{q.carrierName.split("·")[1]?.trim() || q.carrierName}</span>
                                <span>{formatMoney(q.price, q.currency)}</span>
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    )}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
                        Indicaciones (opcional)
                      </label>
                      <textarea
                        value={form.notas}
                        onChange={(e) => update("notas", e.target.value)}
                        rows={2}
                        className={inputClass}
                        placeholder="Timbre 5, horario preferido, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumen lateral */}
              <div className="lg:w-[360px] lg:shrink-0">
                <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--brand-black)]/70">
                    Tu pedido
                  </h2>
                  <div className="max-h-[220px] space-y-0 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="border-b border-black/[0.06] py-3 last:border-0">
                        <CartItem
                          item={item}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeItem}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 space-y-2 border-t border-black/[0.06] pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--brand-black)]/70">Subtotal</span>
                      <span className="font-medium">{formatMoney(subtotal, "ARS")}</span>
                    </div>
                    {selectedQuote && selectedQuote.price > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--brand-black)]/70">Envío</span>
                        <span className="font-medium">{formatMoney(selectedQuote.price, "ARS")}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-black/[0.06] pt-2 text-base font-semibold">
                      <span>Total</span>
                      <span style={{ fontFamily: "var(--font-heading)" }}>
                        {formatMoney(subtotal + (selectedQuote?.price ?? 0), "ARS")}
                      </span>
                    </div>
                    {form.cp.replace(/\D/g, "").length < 4 && (
                      <p className="text-xs text-[var(--brand-black)]/50">Ingresá tu CP para ver el envío</p>
                    )}
                    {form.cp.replace(/\D/g, "").length >= 4 &&
                      (form.provincia === "Capital Federal" || form.provincia === "Buenos Aires") &&
                      shippingLoading && (
                        <p className="text-xs text-[var(--brand-black)]/50">Calculando envío…</p>
                      )}
                  </div>
                  {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      (form.cp.replace(/\D/g, "").length >= 4 &&
                        (form.provincia === "Capital Federal" || form.provincia === "Buenos Aires") &&
                        (shippingLoading || !selectedQuote))
                    }
                    className="mt-5 w-full rounded-xl bg-[var(--brand-cta)] py-4 text-base font-semibold text-[var(--brand-black)] transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 hover:opacity-95"
                    style={{ fontFamily: "var(--font-subheading)", boxShadow: "var(--shadow-cta)" }}
                  >
                    {isLoading ? "Procesando…" : "Ir a pagar"}
                  </button>
                  <p className="mt-2 text-center text-xs text-[var(--brand-black)]/50">
                    Pago seguro con Mercado Pago
                  </p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-center text-xs text-[var(--brand-black)]/40 hover:text-[var(--brand-black)]/60">
                      Modo prueba: tarjetas y datos
                    </summary>
                    <div className="mt-2 rounded-lg bg-[var(--brand-gray)]/80 p-3 text-left text-[11px] text-[var(--brand-black)]/70">
                      <p className="mb-1 font-medium">Tarjetas de prueba (Argentina):</p>
                      <p>Visa: 4509 9535 6623 3704 | Master: 5031 7557 3453 0604</p>
                      <p>CVV: 123 | Vto: 11/25 | Titular: APRO (aprobado)</p>
                      <p className="mt-1">
                        Iniciá sesión en{" "}
                        <a
                          href="https://sandbox.mercadopago.com.ar"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          sandbox.mercadopago.com.ar
                        </a>{" "}
                        antes de pagar.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
