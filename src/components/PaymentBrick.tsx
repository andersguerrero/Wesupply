"use client";

import { useEffect } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY ?? "";

type PaymentBrickProps = {
  preferenceId: string;
  amount: number;
  onError?: (msg: string) => void;
};

export default function PaymentBrick({ preferenceId, amount, onError }: PaymentBrickProps) {
  const router = useRouter();

  useEffect(() => {
    if (PUBLIC_KEY) initMercadoPago(PUBLIC_KEY);
  }, []);

  if (!PUBLIC_KEY) {
    return (
      <p className="text-sm text-amber-600">
        Configurá NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY para pagar con tarjeta en esta página.
      </p>
    );
  }

  return (
    <Payment
      initialization={{
        amount,
        preferenceId,
      }}
      customization={{
        paymentMethods: {
          mercadoPago: "disabled",
          ticket: "all",
          creditCard: "all",
          debitCard: "all",
          prepaidCard: "all",
        },
      }}
      onSubmit={async ({ formData }) => {
        return new Promise<void>((resolve, reject) => {
          fetch("/api/mercadopago/process-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.ok) {
                router.push("/checkout/success");
                resolve();
              } else {
                onError?.(data.error ?? "Error al procesar el pago");
                reject();
              }
            })
            .catch((err) => {
              onError?.(err?.message ?? "Error de conexión");
              reject();
            });
        });
      }}
      onReady={() => {}}
      onError={(error) => {
        onError?.(error?.message ?? "Error en el formulario de pago");
      }}
    />
  );
}
