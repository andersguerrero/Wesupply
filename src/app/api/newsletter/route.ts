import { NextRequest } from "next/server";
import { readContent, writeContent } from "@/lib/content/store";

type Subscriber = { email: string; subscribedAt: string; message?: string };

const NEWSLETTER_KEY = "newsletter-subscribers";

function getSubscribers(): Subscriber[] {
  const data = readContent<Subscriber[]>(NEWSLETTER_KEY);
  return Array.isArray(data) ? data : [];
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(req: NextRequest) {
  let body: { email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "Cuerpo inválido" },
      { status: 400 }
    );
  }

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email) {
    return Response.json(
      { error: "Ingresá tu email" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { error: "Email inválido" },
      { status: 400 }
    );
  }

  const subscribers = getSubscribers();
  const exists = subscribers.some((s) => s.email === email);
  if (exists) {
    return Response.json(
      { error: "Este email ya está suscrito" },
      { status: 409 }
    );
  }

  const message = typeof body?.message === "string" ? body.message.trim() : undefined;
  subscribers.push({
    email,
    subscribedAt: new Date().toISOString(),
    ...(message && { message }),
  });

  try {
    writeContent(NEWSLETTER_KEY, subscribers);
  } catch (err) {
    console.error("Newsletter write error:", err);
    return Response.json(
      { error: "Error al guardar. Intentá de nuevo." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true, message: "¡Gracias por suscribirte!" });
}
