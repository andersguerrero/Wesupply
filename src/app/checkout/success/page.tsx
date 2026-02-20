"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1
            className="text-2xl font-bold text-[var(--brand-black)] sm:text-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ¡Gracias por tu compra!
          </h1>
          <p className="mt-3 text-[var(--brand-black)]/70">
            Tu pago fue procesado correctamente. Te enviamos un email con los detalles del pedido.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-[var(--brand-cta)] px-8 py-3 text-base font-semibold text-[var(--brand-black)] transition-opacity hover:opacity-95"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
