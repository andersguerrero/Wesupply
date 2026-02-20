"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export const MAX_COMPARE = 3;

export type CompareItem = {
  handle: string;
  title: string;
  image?: string;
  price: number;
  currencyCode: string;
  spec?: string;
  filterValues?: Record<string, string | string[]>;
  applications?: { title: string; desc: string }[];
};

type CompareContextValue = {
  items: CompareItem[];
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (handle: string) => void;
  clearCompare: () => void;
  isInCompare: (handle: string) => boolean;
  canAddMore: boolean;
};

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);

  const addToCompare = useCallback((item: CompareItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.handle === item.handle)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromCompare = useCallback((handle: string) => {
    setItems((prev) => prev.filter((i) => i.handle !== handle));
  }, []);

  const clearCompare = useCallback(() => setItems([]), []);

  const isInCompare = useCallback(
    (handle: string) => items.some((i) => i.handle === handle),
    [items]
  );

  return (
    <CompareContext.Provider
      value={{
        items,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        canAddMore: items.length < MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
