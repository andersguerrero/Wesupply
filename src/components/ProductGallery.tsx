"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export type ProductGalleryProps = {
  images?: string[];
  alt?: string;
};

const PLACEHOLDER_COUNT = 4;
const ZOOM_SCALE = 2.5;

export default function ProductGallery({
  images,
  alt = "Producto",
}: ProductGalleryProps) {
  const count = images?.length ?? PLACEHOLDER_COUNT;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const mainImage = images?.[selectedIndex];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    },
    []
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Thumbnails — vertical en desktop */}
      <div className="flex flex-row gap-2 sm:flex-col sm:gap-3">
        {images
          ? images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius)] border-2 transition-colors duration-200 sm:h-20 sm:w-20"
                style={{
                  borderColor:
                    selectedIndex === i
                      ? "var(--brand-primary)"
                      : "transparent",
                  boxShadow: "var(--shadow-subtle)",
                }}
                aria-label={`Ver imagen ${i + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized
                />
              </button>
            ))
          : Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius)] border-2 transition-colors duration-200 sm:h-20 sm:w-20"
                style={{
                  borderColor:
                    selectedIndex === i
                      ? "var(--brand-primary)"
                      : "transparent",
                  boxShadow: "var(--shadow-subtle)",
                }}
                aria-label={`Ver imagen ${i + 1}`}
              >
                <div
                  className="h-full w-full bg-[var(--brand-gray)]"
                  aria-hidden
                />
              </button>
            ))}
      </div>
      {/* Imagen principal con zoom al pasar el cursor */}
      <div
        ref={containerRef}
        className="group relative flex aspect-square w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-lg)] bg-[var(--brand-gray)] transition-opacity duration-300 sm:cursor-crosshair"
        style={{
          boxShadow: "var(--shadow-card)",
          transitionTimingFunction: "var(--ease-out-expo)",
        }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {mainImage ? (
          <div
            className="absolute inset-0 transition-transform duration-100"
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: isZoomed ? `scale(${ZOOM_SCALE})` : "scale(1)",
            }}
          >
            <Image
              src={mainImage}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
              draggable={false}
            />
          </div>
        ) : (
          <span className="m-auto text-sm text-[var(--brand-black)]/30">
            Vista {selectedIndex + 1}
          </span>
        )}
        {mainImage && isZoomed && (
          <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
            Zoom {ZOOM_SCALE}×
          </span>
        )}
      </div>
    </div>
  );
}
