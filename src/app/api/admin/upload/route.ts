import { NextRequest } from "next/server";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const ADMIN_COOKIE = "admin_session";

function isAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return true;
  return cookie === expected;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const subfolder = String(formData.get("folder") || "products").replace(
      /[^a-zA-Z0-9-_]/g,
      ""
    );
    if (!file || !(file instanceof File)) {
      return Response.json({ error: "Archivo requerido" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json(
        { error: "Tipo no permitido. Usá JPG, PNG, WebP o GIF." },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return Response.json(
        { error: "El archivo no puede superar 5 MB." },
        { status: 400 }
      );
    }
    const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
    const base = join(process.cwd(), "public", "images", subfolder);
    if (!existsSync(base)) mkdirSync(base, { recursive: true });
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
    const filePath = join(base, safeName);
    const bytes = await file.arrayBuffer();
    writeFileSync(filePath, Buffer.from(bytes));
    const url = `/images/${subfolder}/${safeName}`;
    return Response.json({ url });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Error al subir" },
      { status: 500 }
    );
  }
}
