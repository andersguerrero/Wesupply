"use client";

import { useSiteContent } from "@/context/SiteContentContext";

export default function TrustBar() {
  const site = useSiteContent();
  const message = site?.trustBar?.message ?? "ENVÍOS A TODO ARGENTINA";
  // Repetir varias veces para que el bucle sea continuo y sin espacios vacíos
  const separator = "  •••  ";
  const segment = Array(6).fill(message).join(separator);
  const track = `${segment}${separator}${segment}`;

  return (
    <div
      className="overflow-hidden border-b border-white/10 bg-[var(--brand-black)] py-2"
      role="complementary"
      aria-label="Promociones y beneficios"
    >
      <div
        className="trustbar-track"
        style={{
          fontFamily: "var(--font-subheading)",
        }}
      >
        <span className="trustbar-content">{track}</span>
        <span className="trustbar-content" aria-hidden>
          {track}
        </span>
      </div>
      <style>{`
        .trustbar-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          animation: trustbar-scroll 55s linear infinite;
          will-change: transform;
        }
        .trustbar-content {
          padding: 0 1rem;
          flex-shrink: 0;
        }
        @keyframes trustbar-scroll {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .trustbar-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
