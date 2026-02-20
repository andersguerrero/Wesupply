import { NextRequest } from "next/server";
import { readContent, writeContent } from "@/lib/content/store";

const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

export type StoredOrderItem = { title: string; quantity: number; unit_price: number };
export type StoredOrder = {
  id: string;
  paymentId: number;
  status: "approved" | "pending" | "rejected";
  email: string;
  nombre?: string;
  total: number;
  currency: string;
  items: StoredOrderItem[];
  shipping?: {
    calle?: string;
    numero?: string;
    cp?: string;
    ciudad?: string;
    provincia?: string;
    pais?: string;
    notas?: string;
  };
  dateApproved: string;
  createdAt: string;
};

/**
 * IPN de Mercado Pago: recibe GET con ?topic=payment&id=123456
 * Responder 200 rápido; luego procesar y guardar el pedido.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic");
  const id = searchParams.get("id");

  if (topic !== "payment" || !id) {
    return new Response(null, { status: 200 });
  }

  const paymentId = parseInt(id, 10);
  if (isNaN(paymentId)) {
    return new Response(null, { status: 200 });
  }

  if (!MP_ACCESS_TOKEN) {
    return new Response(null, { status: 200 });
  }

  const existing = (await readContent<StoredOrder[]>("orders")) ?? [];
  if (existing.some((o) => o.paymentId === paymentId)) {
    return new Response(null, { status: 200 });
  }

  try {
    const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });
    const payment = await res.json();

    if (!res.ok) {
      return new Response(null, { status: 200 });
    }

    if (payment.status !== "approved") {
      return new Response(null, { status: 200 });
    }

    const payer = payment.payer ?? {};
    const payerEmail = payer.email ?? "";

    let items: StoredOrderItem[] = [];
    let receiverAddress: Record<string, unknown> = {};
    const orderId = (payment as { order?: { id?: number } }).order?.id;

    if (orderId && MP_ACCESS_TOKEN) {
      try {
        const orderRes = await fetch(`https://api.mercadopago.com/merchant_orders/${orderId}`, {
          headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
        });
        const merchantOrder = await orderRes.json();
        if (orderRes.ok && Array.isArray(merchantOrder.items)) {
          items = merchantOrder.items.map((i: { title?: string; id?: string; quantity?: number; unit_price?: number }) => ({
            title: String(i.title ?? i.id ?? "Producto"),
            quantity: Number(i.quantity) || 1,
            unit_price: Number(i.unit_price) || 0,
          }));
        }
        const ship = merchantOrder.shipments?.[0]?.receiver_address;
        if (ship) {
          const addr = ship;
          receiverAddress = {
            street_name: typeof addr.street_name === "object" ? (addr.street_name as Record<string, string>)?.es : addr.street_name,
            street_number: addr.street_number,
            zip_code: addr.zip_code,
            city_name: typeof addr.city === "object" ? (addr.city as { name?: string })?.name : addr.city_name,
            state_name: typeof addr.state === "object" ? (addr.state as { name?: string })?.name : addr.state_name,
            country_name: typeof addr.country === "object" ? (addr.country as { name?: string })?.name : addr.country_name,
          };
        }
      } catch {
        // usar datos del payment como fallback
      }
    }

    if (items.length === 0) {
      const addInfo = payment.additional_info ?? {};
      if (Array.isArray(addInfo.items)) {
        items = addInfo.items.map((i: { title?: string; quantity?: number; unit_price?: number }) => ({
          title: String(i.title ?? "Producto"),
          quantity: Number(i.quantity) || 1,
          unit_price: Number(i.unit_price) || 0,
        }));
      }
      if (items.length === 0 && payment.description) {
        items = [{
          title: payment.description,
          quantity: 1,
          unit_price: Number(payment.transaction_amount) || 0,
        }];
      }
    }
    if (Object.keys(receiverAddress).length === 0) {
      const addInfo = payment.additional_info ?? {};
      receiverAddress = addInfo.receiver_address ?? {};
    }

    const ship = receiverAddress as Record<string, unknown>;
    const order: StoredOrder = {
      id: `WES-${Date.now()}-${paymentId}`,
      paymentId,
      status: "approved",
      email: payerEmail,
      nombre: [payer.first_name, payer.last_name].filter(Boolean).join(" ") || undefined,
      total: Number(payment.transaction_amount) || 0,
      currency: payment.currency_id ?? "ARS",
      items,
      shipping: {
        calle: String(ship.street_name ?? ""),
        numero: String(ship.street_number ?? ""),
        cp: String(ship.zip_code ?? ""),
        ciudad: String(ship.city_name ?? ""),
        provincia: String(ship.state_name ?? ""),
        pais: String(ship.country_name ?? ""),
        notas: (payment.additional_info as { paddle_dept?: string } | undefined)?.paddle_dept,
      },
      dateApproved: payment.date_approved ?? new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const orders = (await readContent<StoredOrder[]>("orders")) ?? [];
    orders.unshift(order);
    await writeContent("orders", orders);
  } catch {
    // silenciar errores para no romper reintentos de MP
  }

  return new Response(null, { status: 200 });
}
