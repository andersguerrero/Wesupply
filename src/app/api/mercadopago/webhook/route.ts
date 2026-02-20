import { NextRequest } from "next/server";
import { processAndSaveOrder, type StoredOrder } from "@/lib/mercadopago/order-sync";

export type { StoredOrder, StoredOrderItem } from "@/lib/mercadopago/order-sync";

function getTopicAndId(req: NextRequest): { topic: string | null; id: string | null } {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic");
  const id = searchParams.get("id");
  return topic && id ? { topic, id } : { topic: null, id: null };
}

async function getTopicAndIdFromPost(req: NextRequest): Promise<{ topic: string | null; id: string | null }> {
  try {
    const body = await req.json();
    const type = body?.type ?? body?.topic;
    const dataId = body?.data?.id ?? body?.id;
    if (type === "payment" && dataId) return { topic: "payment", id: String(dataId) };
  } catch {
    //
  }
  return { topic: null, id: null };
}

async function handleNotification(topic: string | null, id: string | null) {
  if (topic !== "payment" || !id) return new Response(null, { status: 200 });
  const paymentId = parseInt(id, 10);
  if (isNaN(paymentId)) return new Response(null, { status: 200 });
  await processAndSaveOrder(paymentId);
  return new Response(null, { status: 200 });
}

export async function GET(req: NextRequest) {
  const { topic, id } = getTopicAndId(req);
  return handleNotification(topic, id);
}

export async function POST(req: NextRequest) {
  let { topic, id } = await getTopicAndIdFromPost(req);
  if (!topic || !id) {
    const g = getTopicAndId(req);
    topic = g.topic;
    id = g.id;
  }
  return handleNotification(topic, id);
}
