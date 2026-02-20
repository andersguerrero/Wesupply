"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

const CART_STORAGE_KEY = "wesupply_cart";

export type CartLineItem = {
  id: string;
  productHandle: string;
  name: string;
  spec: string;
  price: number;
  quantity: number;
  image?: string;
};

export type AddItemInput = {
  variantId: string;
  productTitle: string;
  variantTitle?: string;
  price?: number;
  quantity?: number;
  image?: string;
};

function loadCart(): CartLineItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartLineItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

type CartContextValue = {
  items: CartLineItem[];
  addItem: (input: AddItemInput) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  checkout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  const persist = useCallback((next: CartLineItem[]) => {
    setItems(next);
    saveCart(next);
  }, []);

  const addItem = useCallback(
    (input: AddItemInput) => {
      setError(null);
      const price = input.price ?? 0;
      const qty = input.quantity ?? 1;
      const lineId = `${input.variantId}-${Date.now()}`;

      const next = [...items];
      const existing = next.find((i) => i.productHandle === input.variantId);
      if (existing) {
        existing.quantity += qty;
      } else {
        next.push({
          id: lineId,
          productHandle: input.variantId,
          name: input.productTitle,
          spec: input.variantTitle ?? "",
          price,
          quantity: qty,
          image: input.image,
        });
      }
      persist(next);
      setIsOpen(true);
    },
    [items, persist]
  );

  const removeItem = useCallback(
    (id: string) => {
      persist(items.filter((i) => i.id !== id));
    },
    [items, persist]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(id);
        return;
      }
      const next = items.map((i) => (i.id === id ? { ...i, quantity } : i));
      persist(next);
    },
    [items, persist, removeItem]
  );

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const checkout = useCallback(async () => {
    if (items.length === 0) return;
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/mercadopago/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            title: i.name,
            quantity: i.quantity,
            unit_price: i.price,
            currency_id: "ARS",
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Error al crear el checkout");
      }
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
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
    isOpen,
    openCart,
    closeCart,
    checkout,
    isLoading,
    error,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
