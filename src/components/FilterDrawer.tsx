"use client";

import { useEffect } from "react";

type FilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function FilterDrawer({
  isOpen,
  onClose,
  children,
}: FilterDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[110] bg-black/25 transition-opacity"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />
      <div
        role="dialog"
        aria-modal
        aria-label="Filtros"
        className="fixed bottom-0 left-0 right-0 z-[111] max-h-[85vh] overflow-y-auto rounded-t-[var(--radius-lg)] bg-white shadow-[var(--shadow-hero-block)]"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s var(--ease-out-expo)",
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/[0.06] bg-white px-6 py-4">
          <span
            className="text-sm font-semibold text-[var(--brand-black)]"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            Filtros
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--brand-black)]/60 hover:bg-[var(--brand-gray)] hover:text-[var(--brand-black)]"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-6 pb-10">{children}</div>
      </div>
    </>
  );
}
