"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";

type OrderItem = { title: string; quantity: number; unit_price: number };
type Order = {
  id: string;
  paymentId: number;
  status: string;
  email: string;
  nombre?: string;
  total: number;
  currency: string;
  items: OrderItem[];
  shipping?: {
    calle?: string;
    numero?: string;
    cp?: string;
    ciudad?: string;
    provincia?: string;
    pais?: string;
    notas?: string;
  };
  dateApproved: string;
  createdAt: string;
};

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency || "ARS",
  }).format(amount);
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  useAdminAuth();

  const load = () => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

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
        <h1 className="mt-2 text-2xl font-bold text-[#1a1a1a]">Pedidos</h1>
        <p className="mt-1 text-[#666]">
          Pedidos confirmados por Mercado Pago. {orders.length} en total.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl bg-[#f5f5f5] px-6 py-12 text-center text-[#666]">
          Aún no hay pedidos. Los pedidos aparecen aquí cuando el cliente paga exitosamente.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="overflow-hidden rounded-xl border border-[#e0e0e0] bg-white"
            >
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-[#fafafa]"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-sm font-medium text-[#1a1a1a]">
                    {order.id}
                  </span>
                  <span className="mx-2 text-[#999]">·</span>
                  <span className="text-sm text-[#666]">{order.email}</span>
                  {order.nombre && (
                    <>
                      <span className="mx-2 text-[#999]">·</span>
                      <span className="text-sm text-[#666]">{order.nombre}</span>
                    </>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-semibold text-[#1a1a1a]">
                    {formatMoney(order.total, order.currency)}
                  </span>
                  <span className="ml-2 text-xs text-[#666]">
                    {formatDate(order.dateApproved || order.createdAt)}
                  </span>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    order.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {order.status}
                </span>
                <span className="text-[#999]">
                  {expandedId === order.id ? "▼" : "▶"}
                </span>
              </button>
              {expandedId === order.id && (
                <div className="border-t border-[#e0e0e0] bg-[#fafafa] px-4 py-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#666]">
                        Items
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {order.items.map((item, i) => (
                          <li key={i} className="flex justify-between">
                            <span>
                              {item.quantity}× {item.title}
                            </span>
                            <span className="text-[#666]">
                              {formatMoney(item.quantity * item.unit_price, order.currency)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {order.shipping && (
                      <div>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#666]">
                          Envío
                        </h4>
                        <p className="text-sm text-[#333]">
                          {[
                            order.shipping.calle,
                            order.shipping.numero,
                            order.shipping.cp,
                            order.shipping.ciudad,
                            order.shipping.provincia,
                            order.shipping.pais,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                        {order.shipping.notas && (
                          <p className="mt-1 text-xs text-[#666]">
                            Notas: {order.shipping.notas}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-[#999]">
                    ID de pago MP: {order.paymentId}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
