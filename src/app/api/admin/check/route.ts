import { NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_session";

export async function GET(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return Response.json({ authenticated: true });
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  return Response.json({ authenticated: cookie === expected });
}
