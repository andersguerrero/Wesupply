import { NextRequest } from "next/server";

const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

/**
 * POST /api/mercadopago/process-payment
 * Recibe formData del Payment Brick y crea el pago en Mercado Pago.
 */
export async function POST(req: NextRequest) {
  if (!MP_ACCESS_TOKEN) {
    return Response.json({ error: "MERCADOPAGO_ACCESS_TOKEN no configurado" }, { status: 500 });
  }

  let formData: Record<string, unknown>;
  try {
    formData = await req.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  const idempotencyKey = crypto.randomUUID();

  try {
    const res = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        "X-Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data.message ?? data.cause?.[0]?.description ?? data.error ?? "Error al procesar el pago";
      return Response.json(
        { error: typeof msg === "string" ? msg : JSON.stringify(msg) },
        { status: res.status >= 400 && res.status < 500 ? res.status : 500 }
      );
    }

    const status = data.status as string;
    const detail = data.status_detail as string | undefined;

    if (status === "approved") {
      return Response.json({ ok: true, status: "approved", payment_id: data.id });
    }
    if (status === "pending" || status === "in_process") {
      return Response.json({ ok: true, status, payment_id: data.id, detail });
    }

    return Response.json(
      { error: detail ?? "El pago fue rechazado" },
      { status: 400 }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error al conectar con Mercado Pago";
    return Response.json({ error: msg }, { status: 500 });
  }
}
