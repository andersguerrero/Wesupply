"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Link from "next/link";

type Subscriber = { email: string; subscribedAt: string; message?: string };

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  useAdminAuth();

  const load = () => {
    fetch("/api/admin/newsletter")
      .then((r) => r.json())
      .then((data) => {
        setSubscribers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-[#666]">Cargando…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-[#666] hover:text-[#1a1a1a]">
          ← Panel
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-[#1a1a1a]">Newsletter</h1>
        <p className="mt-1 text-[#666]">
          Suscriptores al newsletter del footer. {subscribers.length} en total.
        </p>
      </div>

      {subscribers.length === 0 ? (
        <div className="rounded-xl bg-[#f5f5f5] px-6 py-12 text-center text-[#666]">
          Aún no hay suscriptores.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#e0e0e0] bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e0e0e0] bg-[#f9f9f9]">
                <th className="px-4 py-3 font-medium text-[#333]">Email</th>
                <th className="px-4 py-3 font-medium text-[#333]">Mensaje</th>
                <th className="px-4 py-3 font-medium text-[#333]">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr
                  key={`${s.email}-${i}`}
                  className="border-b border-[#eee] last:border-0"
                >
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="max-w-xs px-4 py-3 text-[#666] truncate" title={s.message}>
                    {s.message || "—"}
                  </td>
                  <td className="px-4 py-3 text-[#666]">
                    {formatDate(s.subscribedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
