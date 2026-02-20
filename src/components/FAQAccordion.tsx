"use client";

import { useState } from "react";

export type FAQItem = { id: string; question: string; answer: string };

export default function FAQAccordion({
  items,
}: {
  items: FAQItem[];
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-[var(--radius)] border border-black/[0.06] bg-white"
            style={{
              boxShadow: isOpen ? "var(--shadow-card)" : "var(--shadow-subtle)",
            }}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between py-5 pl-6 pr-6 text-left"
              aria-expanded={isOpen}
            >
              <span
                className="text-base font-semibold text-[var(--brand-black)]"
                style={{
                  fontFamily: "var(--font-subheading)",
                  letterSpacing: "var(--heading-tracking)",
                }}
              >
                {item.question}
              </span>
              <span
                className="ml-3 shrink-0 text-[var(--brand-black)]/50 transition-transform duration-200"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transitionTimingFunction: "var(--ease-out-expo)",
                }}
              >
                ▼
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transitionTimingFunction: "var(--ease-out-expo)",
              }}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="border-t border-black/[0.06] px-6 pb-5 pt-0 text-[15px] leading-relaxed text-[var(--brand-black)]/75">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
