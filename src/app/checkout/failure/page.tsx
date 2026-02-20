"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CheckoutFailurePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1
            className="text-2xl font-bold text-[var(--brand-black)] sm:text-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            No pudimos completar el pago
          </h1>
          <p className="mt-3 text-[var(--brand-black)]/70">
            El pago fue rechazado o cancelado. Tu carrito sigue disponible para que puedas intentar nuevamente.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/checkout"
              className="inline-block rounded-xl bg-[var(--brand-cta)] px-8 py-3 text-base font-semibold text-[var(--brand-black)] transition-opacity hover:opacity-95"
            >
              Intentar de nuevo
            </Link>
            <Link
              href="/"
              className="inline-block rounded-xl border-2 border-black/10 bg-white px-8 py-3 text-base font-semibold text-[var(--brand-black)] transition-colors hover:border-black/20"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
