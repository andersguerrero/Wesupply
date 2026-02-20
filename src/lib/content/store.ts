/**
 * Store de contenido editable.
 * Lee/escribe JSON en content/ (fallback a datos estáticos).
 * En Railway: montar un Volume en /app/content; o setear CONTENT_DIR.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const CONTENT_DIR =
  process.env.CONTENT_DIR?.trim() ||
  process.env.RAILWAY_VOLUME_MOUNT_PATH?.trim() ||
  join(process.cwd(), "content");

function ensureDir() {
  if (!existsSync(CONTENT_DIR)) mkdirSync(CONTENT_DIR, { recursive: true });
}

export function readContent<T>(key: string): T | null {
  const path = join(CONTENT_DIR, `${key}.json`);
  if (!existsSync(path)) return null;
  try {
    const raw = readFileSync(path, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeContent(key: string, data: unknown): void {
  ensureDir();
  const path = join(CONTENT_DIR, `${key}.json`);
  writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
}

export const CONTENT_KEYS = [
  "products",
  "categories",
  "site",
  "reviews",
  "shipping-zones",
  "orders",
] as const;
export type ContentKey = (typeof CONTENT_KEYS)[number];
