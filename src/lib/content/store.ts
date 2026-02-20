/**
 * Store de contenido editable.
 * - Local: lee/escribe JSON en content/ (fs).
 * - Vercel: usa Vercel Blob (BLOB_READ_WRITE_TOKEN).
 */
import { put, get } from "@vercel/blob";
import { readFile, writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const BLOB_PREFIX = "wesupply/";
const CONTENT_DIR = join(process.cwd(), "content");

const useBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN?.trim();

function blobPath(key: string) {
  return `${BLOB_PREFIX}${key}.json`;
}

async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

export async function readContent<T>(key: string): Promise<T | null> {
  if (useBlob()) {
    try {
      const pathname = blobPath(key);
      const result = await get(pathname, { access: "private" });
      if (!result || result.statusCode === 304 || !result.stream) return null;
      const body = await streamToText(result.stream);
      return JSON.parse(body) as T;
    } catch {
      return null;
    }
  }
  const filePath = join(CONTENT_DIR, `${key}.json`);
  if (!existsSync(filePath)) return null;
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeContent(key: string, data: unknown): Promise<void> {
  const body = JSON.stringify(data, null, 2);
  if (useBlob()) {
    const pathname = blobPath(key);
    await put(pathname, body, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  if (!existsSync(CONTENT_DIR)) mkdirSync(CONTENT_DIR, { recursive: true });
  const filePath = join(CONTENT_DIR, `${key}.json`);
  await writeFile(filePath, body, "utf-8");
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
