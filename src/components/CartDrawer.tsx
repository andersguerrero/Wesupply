"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import CartItem from "@/components/CartItem";
import { formatMoney } from "@/lib/formatMoney";

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, removeItem, updateQuantity } =
    useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden
        onClick={closeCart}
        className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-[2px] md:bg-black/25"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s var(--ease-out-expo)",
        }}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal
        aria-label="Carrito"
        className="fixed right-0 top-0 z-[101] flex h-full w-full flex-col bg-white shadow-[var(--shadow-hero-block)] md:w-[420px]"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          borderRadius: isOpen ? "24px 0 0 24px" : "0",
          marginLeft: "auto",
          transition: "transform 0.35s var(--ease-out-expo)",
        }}
      >
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-black/[0.04] px-6 py-5">
            <h2
              className="text-lg font-semibold text-[var(--brand-black)]"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "var(--heading-tracking)",
              }}
            >
              Carrito
            </h2>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Cerrar"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--brand-black)]/60 transition-colors hover:bg-[var(--brand-gray)] hover:text-[var(--brand-black)]"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-[15px] text-[var(--brand-black)]/65">
                  Tu carrito está vacío.
                </p>
                <Link
                  href="/cintas"
                  onClick={closeCart}
                  className="mt-8 rounded-[var(--radius)] border border-black/[0.12] px-6 py-3 text-sm font-medium text-[var(--brand-black)] transition-colors hover:bg-[var(--brand-gray)]"
                >
                  Volver a productos
                </Link>
              </div>
            ) : (
              <div className="py-6">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer — solo si hay items */}
          {items.length > 0 && (
            <div className="shrink-0 border-t border-black/[0.06] bg-white px-6 py-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-[var(--brand-black)]/65">
                  Subtotal
                </span>
                <span
                  className="text-lg font-semibold text-[var(--brand-black)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {formatMoney(subtotal, "ARS")}
                </span>
              </div>
              <p className="mb-6 text-[12px] text-[var(--brand-black)]/50">
                Ingresá tus datos y dirección en el checkout.
              </p>
              <p className="mb-4 text-center text-[12px] text-[var(--brand-black)]/60">
                El descuento por volumen se aplica automáticamente.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full rounded-[var(--radius-lg)] bg-[var(--brand-cta)] py-4 text-center text-base font-semibold text-[var(--brand-black)] transition-transform active:scale-[0.99] hover:opacity-95"
                style={{
                  fontFamily: "var(--font-subheading)",
                  boxShadow: "var(--shadow-cta)",
                }}
              >
                Finalizar compra
              </Link>
              <p className="mt-3 text-center text-[12px] text-[var(--brand-black)]/50">
                Pago seguro · MercadoPago
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
