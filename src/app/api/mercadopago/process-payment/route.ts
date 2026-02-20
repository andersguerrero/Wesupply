import { NextRequest } from "next/server";
import { randomUUID } from "crypto";

const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

/**
 * POST /api/mercadopago/process-payment
 * Recibe formData del Payment Brick y crea el pago en Mercado Pago.
 */
export async function POST(req: NextRequest) {
  if (!MP_ACCESS_TOKEN) {
    return Response.json(
      { error: "MERCADOPAGO_ACCESS_TOKEN no configurado" },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }

  // Normalizar camelCase del Brick a snake_case de la API
  const token = String(body.token ?? "").trim();
  const transaction_amount = Number(body.transaction_amount ?? body.transactionAmount ?? 0);
  const payment_method_id = String(body.payment_method_id ?? body.paymentMethodId ?? "").trim();
  const installments = body.installments ?? 1;
  const payerObj = (body.payer ?? {}) as Record<string, unknown>;
  const idObj = (payerObj.identification ?? {}) as Record<string, unknown>;
  const payer = {
    email: String(payerObj.email ?? body.cardholderEmail ?? "").trim(),
    identification: {
      type: String(idObj.type ?? body.identificationType ?? "DNI").trim() || "DNI",
      number: String(idObj.number ?? body.identificationNumber ?? "").replace(/\D/g, ""),
    },
    first_name: String(payerObj.first_name ?? payerObj.firstName ?? "").trim(),
    last_name: String(payerObj.last_name ?? payerObj.lastName ?? body.cardholderName ?? "").trim(),
  };

  if (!token || !payment_method_id || !payer.email) {
    return Response.json(
      { error: "Faltan campos requeridos (token, payment_method_id, payer)" },
      { status: 400 }
    );
  }

  const amount = Number(transaction_amount) || 0;
  if (amount <= 0) {
    return Response.json({ error: "Monto inválido" }, { status: 400 });
  }

  const paymentPayload = {
    transaction_amount: amount,
    token: String(token),
    description: body.description || "Compra WESUPPLY",
    installments: Math.max(1, Math.min(12, Number(installments) || 1)),
    payment_method_id: String(payment_method_id),
    issuer_id: body.issuer_id ? Number(body.issuer_id) : undefined,
    payer: {
      email: payer.email,
      identification: {
        type: payer.identification?.type || "DNI",
        number: payer.identification?.number || "12345678",
      },
      first_name: payer.first_name || "Comprador",
      last_name: payer.last_name || "WESUPPLY",
    },
  };

  const idempotencyKey = randomUUID();

  try {
    const res = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        "X-Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(paymentPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data.message ?? data.cause?.[0]?.description ?? data.error ?? "Error de Mercado Pago";
      return Response.json(
        { error: typeof msg === "string" ? msg : JSON.stringify(msg) },
        { status: res.status >= 400 && res.status < 500 ? res.status : 500 }
      );
    }

    return Response.json({
      status: data.status,
      status_detail: data.status_detail,
      id: data.id,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error al procesar el pago";
    return Response.json({ error: msg }, { status: 500 });
  }
}
