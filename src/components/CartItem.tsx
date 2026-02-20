"use client";

import type { CartLineItem } from "@/components/CartContext";
import { formatMoney } from "@/lib/formatMoney";

export type CartItemProps = {
  item: CartLineItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <div
      className="flex gap-4 border-b border-black/[0.06] py-5"
      style={{ animation: "cart-item-in 0.25s var(--ease-out-expo)" }}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[var(--radius)] bg-[var(--brand-gray)]">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <h3
          className="truncate text-[15px] font-semibold text-[var(--brand-black)]"
          style={{ fontFamily: "var(--font-subheading)" }}
        >
          {item.name}
        </h3>
        <p className="mt-0.5 truncate text-[13px] text-[var(--brand-black)]/60">
          {item.spec}
        </p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Reducir"
              className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--brand-black)]/60 transition-colors hover:bg-[var(--brand-gray)] hover:text-[var(--brand-black)] disabled:opacity-40"
            >
              <span className="text-lg leading-none">−</span>
            </button>
            <span
              className="min-w-[1.5rem] text-center text-sm font-medium tabular-nums text-[var(--brand-black)]"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              aria-label="Aumentar"
              className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--brand-black)]/60 transition-colors hover:bg-[var(--brand-gray)] hover:text-[var(--brand-black)]"
            >
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
          <p
            className="text-sm font-semibold text-[var(--brand-black)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {formatMoney(lineTotal, "ARS")}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label="Eliminar"
        className="shrink-0 self-start p-1 text-[var(--brand-black)]/40 transition-colors hover:text-[var(--brand-black)]/80"
      >
        <span className="text-sm">×</span>
      </button>
    </div>
  );
}
