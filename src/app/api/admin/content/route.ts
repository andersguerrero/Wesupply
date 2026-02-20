import { NextRequest } from "next/server";
import { readContent, writeContent, CONTENT_KEYS } from "@/lib/content/store";

const ADMIN_COOKIE = "admin_session";

function isAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return true; // Sin contraseña configurada = acceso abierto en dev
  return cookie === expected;
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key || !CONTENT_KEYS.includes(key as (typeof CONTENT_KEYS)[number])) {
    return Response.json({ error: "Clave inválida" }, { status: 400 });
  }
  const data = await readContent(key);
  return Response.json(data ?? {});
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key || !CONTENT_KEYS.includes(key as (typeof CONTENT_KEYS)[number])) {
    return Response.json({ error: "Clave inválida" }, { status: 400 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }
  try {
    await writeContent(key, body);
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Error al guardar" },
      { status: 500 }
    );
  }
}
