import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin_session";

export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    const c = await cookies();
    c.set(ADMIN_COOKIE, "dev", { path: "/", maxAge: 60 * 60 * 24 });
    return Response.json({ ok: true });
  }
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Body inválido" }, { status: 400 });
  }
  const password = body?.password;
  if (!password) {
    return Response.json({ error: "Contraseña requerida" }, { status: 400 });
  }
  if (password !== expected) {
    return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }
  const c = await cookies();
  c.set(ADMIN_COOKIE, password, { path: "/", maxAge: 60 * 60 * 24 * 7 });
  return Response.json({ ok: true });
}

export async function DELETE() {
  const c = await cookies();
  c.delete(ADMIN_COOKIE);
  return Response.json({ ok: true });
}
