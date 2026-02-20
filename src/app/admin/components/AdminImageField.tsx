"use client";

import { useState } from "react";
import Image from "next/image";

type AdminImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
};

export default function AdminImageField({
  label,
  value,
  onChange,
  folder = "hero",
}: AdminImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    const uploads = files.map((file) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      return fetch("/api/admin/upload", { method: "POST", body: fd })
        .then((r) => r.json())
        .then((d) => d.url);
    });
    try {
      const results = await Promise.all(uploads);
      const url = results.find(Boolean);
      if (url) onChange(url);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[#333]">{label}</label>
      <div className="mt-2 flex flex-wrap items-start gap-4">
        {value && (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[#ddd] bg-[#f5f5f5]">
            <Image
              src={value}
              alt=""
              fill
              className="object-cover"
              unoptimized
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect fill='%23ddd' width='96' height='96'/%3E%3Ctext x='50%25' y='50%25' fill='%23999' text-anchor='middle' dy='.3em' font-size='10'%3E?%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        )}
        <div className="flex flex-1 flex-wrap gap-2">
          <label
            className={`flex cursor-pointer items-center gap-2 rounded-lg border border-[#ddd] bg-white px-4 py-2 text-sm font-medium text-[#333] hover:bg-[#f9f9f9] ${
              uploading ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              multiple
              disabled={uploading}
              onChange={handleUpload}
            />
            {uploading ? "⏳ Subiendo…" : "📤 Subir varias imágenes"}
          </label>
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="/images/... o https://..."
              className="w-48 rounded-lg border border-[#ddd] px-3 py-2 text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (urlInput.trim()) {
                    onChange(urlInput.trim());
                    setUrlInput("");
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (urlInput.trim()) {
                  onChange(urlInput.trim());
                  setUrlInput("");
                }
              }}
              className="rounded-lg bg-[#1a1a1a] px-3 py-2 text-sm text-white hover:bg-[#333]"
            >
              Agregar URL
            </button>
          </div>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-sm text-red-600 hover:underline"
            >
              Quitar imagen
            </button>
          )}
        </div>
      </div>
      {value && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm"
          placeholder="Ruta de la imagen"
        />
      )}
    </div>
  );
}
