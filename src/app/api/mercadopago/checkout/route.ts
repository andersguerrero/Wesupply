import { NextRequest } from "next/server";

const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

type PayerInput = {
  email?: string;
  name?: string;
  surname?: string;
  phone?: { area_code?: string; number?: string };
  address?: { zip_code?: string; street_name?: string; street_number?: string };
};

type ShipmentsInput = {
  receiver_address?: {
    zip_code?: string;
    street_name?: string;
    street_number?: string;
    city_name?: string;
    state_name?: string;
    country_name?: string;
  };
};

/**
 * POST /api/mercadopago/checkout
 * Crea una preferencia de Mercado Pago y devuelve init_point.
 * Body: { items, payer?, shipments? }
 */
export async function POST(req: NextRequest) {
  if (!MP_ACCESS_TOKEN) {
    return Response.json(
      { error: "MERCADOPAGO_ACCESS_TOKEN no configurado" },
      { status: 500 }
    );
  }

  let body: {
    items: { title: string; quantity: number; unit_price: number; currency_id?: string }[];
    payer?: PayerInput;
    shipments?: ShipmentsInput;
    additional_info?: string;
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  const items = body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ error: "Items requeridos" }, { status: 400 });
  }

  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";
  if (!baseUrl) {
    const host = req.headers.get("host") || req.headers.get("x-forwarded-host");
    const proto = req.headers.get("x-forwarded-proto") || "http";
    if (host) baseUrl = `${proto === "https" ? "https" : "http"}://${host}`;
  }
  if (!baseUrl || !baseUrl.startsWith("http")) {
    baseUrl = "http://localhost:3000";
  }
  const base = baseUrl.replace(/\/$/, "");
  const successUrl = base + "/checkout/success";
  const failureUrl = base + "/checkout/failure";
  const pendingUrl = base + "/checkout/failure";
  const webhookUrl = base + "/api/mercadopago/webhook";
  const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(baseUrl);

  const preference: Record<string, unknown> = {
    items: items.map((i: { title: string; quantity: number; unit_price: number; currency_id?: string }) => {
      const unitPrice = Math.max(1, Number(i.unit_price) || 1);
      return {
        title: String(i.title ?? "Producto").slice(0, 256),
        quantity: Math.max(1, Number(i.quantity) || 1),
        unit_price: unitPrice,
        currency_id: i.currency_id ?? "ARS",
      };
    }),
    back_urls: {
      success: successUrl,
      failure: failureUrl,
      pending: pendingUrl,
    },
    notification_url: webhookUrl,
  };

  if (body.payer && typeof body.payer === "object") {
    const p = body.payer;
    preference.payer = {
      ...(p.email && { email: String(p.email).trim() }),
      ...(p.name && { name: String(p.name).trim() }),
      ...(p.surname && { surname: String(p.surname).trim() }),
      ...(p.phone && { phone: { area_code: p.phone.area_code || "11", number: p.phone.number || "00000000" } }),
      ...(p.address && {
        address: {
          zip_code: p.address.zip_code || "0000",
          street_name: p.address.street_name || "",
          street_number: p.address.street_number || "0",
        },
      }),
    };
  }

  if (body.additional_info) {
    preference.additional_info = String(body.additional_info).slice(0, 500);
  }

  if (body.shipments?.receiver_address) {
    const r = body.shipments.receiver_address;
    preference.shipments = {
      receiver_address: {
        zip_code: r.zip_code || "0000",
        street_name: r.street_name || "",
        street_number: r.street_number || "0",
        city_name: r.city_name || "",
        state_name: r.state_name || "",
        country_name: r.country_name || "Argentina",
      },
    };
  }

  // Con localhost, MP rechaza auto_return (exige dominio público). En prod sí lo usamos.
  if (!isLocalhost) {
    preference.auto_return = "approved";
  }

  try {
    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data.message ?? data.error ?? "Error de Mercado Pago";
      return Response.json(
        { error: typeof msg === "string" ? msg : JSON.stringify(msg) },
        { status: res.status >= 400 && res.status < 500 ? res.status : 500 }
      );
    }

    const initPoint = data.sandbox_init_point ?? data.init_point;
    return Response.json({ init_point: initPoint });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error al conectar con Mercado Pago";
    return Response.json({ error: msg }, { status: 500 });
  }
}
