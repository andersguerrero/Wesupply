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
 * Obtiene el pago de MP, lo procesa y guarda el pedido.
 * Retorna true si se guardó, false si ya existía o falló.
 */
export async function processAndSaveOrder(paymentId: number): Promise<boolean> {
  if (!MP_ACCESS_TOKEN) return false;

  const existing = (await readContent<StoredOrder[]>("orders")) ?? [];
  if (existing.some((o) => o.paymentId === paymentId)) return true;

  try {
    const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });
    const payment = await res.json();

    if (!res.ok || payment.status !== "approved") return false;

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
          receiverAddress = {
            street_name: typeof ship.street_name === "object" ? (ship.street_name as Record<string, string>)?.es : ship.street_name,
            street_number: ship.street_number,
            zip_code: ship.zip_code,
            city_name: typeof ship.city === "object" ? (ship.city as { name?: string })?.name : ship.city_name,
            state_name: typeof ship.state === "object" ? (ship.state as { name?: string })?.name : ship.state_name,
            country_name: typeof ship.country === "object" ? (ship.country as { name?: string })?.name : ship.country_name,
          };
        }
      } catch {
        // fallback
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
        items = [{ title: payment.description, quantity: 1, unit_price: Number(payment.transaction_amount) || 0 }];
      }
    }
    if (Object.keys(receiverAddress).length === 0) {
      receiverAddress = payment.additional_info?.receiver_address ?? {};
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
      },
      dateApproved: payment.date_approved ?? new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const orders = (await readContent<StoredOrder[]>("orders")) ?? [];
    orders.unshift(order);
    await writeContent("orders", orders);

    // Enviar email de confirmación (fire and forget)
    if (payerEmail) {
      sendOrderConfirmationEmail(order).catch(() => {});
    }
    return true;
  } catch {
    return false;
  }
}

async function sendOrderConfirmationEmail(order: StoredOrder): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return;

  const from = process.env.EMAIL_FROM?.trim() || "WESUPPLY <onboarding@resend.dev>";
  const itemsList = order.items.map((i) => `- ${i.title} x${i.quantity}: $${(i.quantity * i.unit_price).toLocaleString("es-AR")}`).join("\n");

  const html = `
    <h1>¡Gracias por tu compra!</h1>
    <p>Tu pedido <strong>${order.id}</strong> fue confirmado.</p>
    <p><strong>Total:</strong> $${order.total.toLocaleString("es-AR")} ${order.currency}</p>
    <h2>Productos</h2>
    <pre>${itemsList}</pre>
    ${order.shipping?.calle ? `<p><strong>Envío a:</strong> ${order.shipping.calle} ${order.shipping.numero}, ${order.shipping.ciudad} (CP ${order.shipping.cp})</p>` : ""}
    <p>— WESUPPLY</p>
  `;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: order.email,
        subject: `Pedido confirmado ${order.id} - WESUPPLY`,
        html,
      }),
    });
  } catch {
    // silenciar
  }
}
