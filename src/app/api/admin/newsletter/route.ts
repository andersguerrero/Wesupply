import { NextRequest } from "next/server";
import { readContent } from "@/lib/content/store";

const ADMIN_COOKIE = "admin_session";

function isAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return true;
  return cookie === expected;
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }
  const data = readContent<{ email: string; subscribedAt: string }[]>("newsletter-subscribers");
  const subscribers = Array.isArray(data) ? data : [];
  return Response.json(subscribers);
}
