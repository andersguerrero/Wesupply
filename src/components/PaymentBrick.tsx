"use client";

import { useEffect, useState } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY ?? "";

type PaymentBrickProps = {
  preferenceId: string;
  amount: number;
  onSuccess: () => void;
  onError: (message: string) => void;
};

export default function PaymentBrick({ preferenceId, amount, onSuccess, onError }: PaymentBrickProps) {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!PUBLIC_KEY) {
      onError("NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY no configurado");
      return;
    }
    initMercadoPago(PUBLIC_KEY);
    const t = setTimeout(() => setSdkReady(true), 500);
    return () => clearTimeout(t);
  }, [onError]);

  if (!PUBLIC_KEY) return null;
  if (!sdkReady) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-black/10 bg-white p-12">
        <p className="text-[var(--brand-black)]/60">Cargando formulario de pago…</p>
      </div>
    );
  }

  return (
    <div className="payment-brick-container rounded-xl border border-black/10 bg-white p-4 sm:p-6">
      <Payment
        initialization={{ preferenceId, amount }}
        customization={{
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
          },
        }}
        onSubmit={async (param) => {
          const { formData } = param;
          if (!formData) {
            onError("No se recibieron datos del pago");
            throw new Error("No formData");
          }
          const res = await fetch("/api/mercadopago/process-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            const msg = data.error ?? "Error al procesar el pago";
            onError(msg);
            throw new Error(msg);
          }
          const status = data.status;
          if (status === "approved" || status === "pending") {
            onSuccess();
          } else {
            const msg = data.status_detail ?? "El pago no pudo completarse. Intentá de nuevo.";
            onError(msg);
            throw new Error(msg);
          }
        }}
        onReady={() => {}}
        onError={(error) => {
          const msg = typeof error === "string" ? error : (error as { message?: string })?.message ?? "Error al cargar el pago";
          onError(msg);
        }}
      />
    </div>
  );
}
