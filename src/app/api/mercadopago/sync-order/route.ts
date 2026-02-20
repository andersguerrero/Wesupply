import { NextRequest } from "next/server";
import { processAndSaveOrder } from "@/lib/mercadopago/order-sync";

/**
 * POST /api/mercadopago/sync-order
 * Sincroniza un pedido desde MP cuando el usuario llega a la página de éxito.
 * Body: { payment_id: number } o query: ?payment_id=123
 */
export async function POST(req: NextRequest) {
  try {
    let paymentId: number;
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await req.json();
      paymentId = Number(body?.payment_id ?? body?.paymentId);
    } else {
      const { searchParams } = new URL(req.url);
      paymentId = Number(searchParams.get("payment_id"));
    }
    if (!paymentId || isNaN(paymentId)) {
      return Response.json({ ok: false, error: "payment_id requerido" }, { status: 400 });
    }
    const saved = await processAndSaveOrder(paymentId);
    return Response.json({ ok: true, saved });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
