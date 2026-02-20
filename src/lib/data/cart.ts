/**
 * Capa de abstracción del carrito.
 * USE_MOCK = true → estado en memoria
 * USE_MOCK = false → Shopify Cart API (implementar en lib/shopify/cart.ts)
 */
import type { Cart, CartLine, CartLinesEdge, Money } from "./types";
import type { Product } from "./types";

export const USE_MOCK = true;

function createEmptyCart(): Cart {
  return {
    id: "mock-cart-" + Date.now(),
    lines: { edges: [] },
    cost: { subtotalAmount: { amount: "0", currencyCode: "ARS" } },
  };
}

function computeSubtotal(lines: CartLinesEdge[]): Money {
  let total = 0;
  for (const edge of lines) {
    const price = parseFloat(edge.node.merchandise.variant.price.amount);
    total += price * edge.node.quantity;
  }
  return {
    amount: total.toFixed(2),
    currencyCode: "ARS",
  };
}

export function createCart(): Cart {
  if (USE_MOCK) {
    return createEmptyCart();
  }
  // TODO: POST a Shopify cartCreate
  return createEmptyCart();
}

export function getCart(): Cart {
  if (USE_MOCK) {
    return createEmptyCart();
  }
  // TODO: GET Shopify cart por id (cookie/localStorage)
  return createEmptyCart();
}

export type AddToCartInput = {
  variantId: string;
  quantity: number;
  product: Pick<Product, "id" | "title">;
  variant: { id: string; title: string; price: Money };
};

export function addToCart(cart: Cart, input: AddToCartInput): Cart {
  if (USE_MOCK) {
    const { variantId, quantity, product, variant } = input;
    const edges = [...cart.lines.edges];
    const existing = edges.find(
      (e) => e.node.merchandise.variant.id === variantId
    );
    if (existing) {
      existing.node.quantity += quantity;
    } else {
      const lineId = `mock-line-${variantId}-${Date.now()}`;
      edges.push({
        node: {
          id: lineId,
          quantity,
          merchandise: {
            product: { title: product.title },
            variant: {
              id: variant.id,
              title: variant.title,
              price: variant.price,
            },
          },
        },
      });
    }
    return {
      ...cart,
      lines: { edges },
      cost: { subtotalAmount: computeSubtotal(edges) },
    };
  }
  // TODO: POST Shopify cartLinesAdd
  return cart;
}

export function updateCartLine(
  cart: Cart,
  lineId: string,
  quantity: number
): Cart {
  if (quantity < 1) return removeCartLine(cart, lineId);
  if (USE_MOCK) {
    const edges = cart.lines.edges.map((e) =>
      e.node.id === lineId ? { ...e, node: { ...e.node, quantity } } : e
    );
    return {
      ...cart,
      lines: { edges },
      cost: { subtotalAmount: computeSubtotal(edges) },
    };
  }
  // TODO: POST Shopify cartLinesUpdate
  return cart;
}

export function removeCartLine(cart: Cart, lineId: string): Cart {
  if (USE_MOCK) {
    const edges = cart.lines.edges.filter((e) => e.node.id !== lineId);
    return {
      ...cart,
      lines: { edges },
      cost: { subtotalAmount: computeSubtotal(edges) },
    };
  }
  // TODO: POST Shopify cartLinesRemove
  return cart;
}
