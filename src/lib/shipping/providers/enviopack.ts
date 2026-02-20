/**
 * Proveedor Envíopack - Agrega múltiples correos (Andreani, OCA, Urbano, etc.)
 * Doc: https://developers.enviopack.com.ar/cotiza-un-envio
 */

import type { ShippingQuoteOption } from "../types";

const API_BASE = "https://api.enviopack.com";

async function getAccessToken(): Promise<string> {
  const apiKey = process.env.ENVIOPACK_API_KEY;
  const secretKey = process.env.ENVIOPACK_SECRET_KEY;
  if (!apiKey || !secretKey) {
    throw new Error("ENVIOPACK_API_KEY y ENVIOPACK_SECRET_KEY no configurados");
  }

  const params = new URLSearchParams({
    "api-key": apiKey,
    "secret-key": secretKey,
  });

  const res = await fetch(`${API_BASE}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Envíopack auth failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Envíopack: no access_token in response");
  }
  return data.access_token;
}

type EnviopackQuoteParams = {
  provincia: string;
  codigoPostal: string;
  pesoKg: number;
  paquetes: string;
};

/**
 * Cotiza precio a domicilio (lo que paga el comprador).
 * GET /cotizar/precio/a-domicilio
 */
export async function quoteEnviopack(params: EnviopackQuoteParams): Promise<ShippingQuoteOption[]> {
  const token = await getAccessToken();
  const searchParams = new URLSearchParams({
    access_token: token,
    provincia: params.provincia,
    codigo_postal: params.codigoPostal.replace(/\D/g, "").slice(0, 4) || "1000",
    peso: String(params.pesoKg),
    paquetes: params.paquetes,
  });

  const url = `${API_BASE}/cotizar/precio/a-domicilio?${searchParams}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Envíopack quote failed: ${res.status} ${text}`);
  }

  const raw = (await res.json()) as Array<{
    correo?: { id?: string; nombre?: string };
    valor?: string;
    horas_entrega?: number;
    servicio?: string;
    modalidad?: string;
  }>;

  if (!Array.isArray(raw)) return [];

  const serviceLabels: Record<string, string> = {
    N: "Estándar",
    P: "Prioritario",
    X: "Express",
    R: "Devoluciones",
  };

  return raw.map((r, i) => {
    const service = r.servicio ?? "N";
    const label = r.correo?.nombre ?? serviceLabels[service] ?? "Envío";
    return {
      carrierId: r.correo?.id ?? `enviopack-${service}-${i}`,
      carrierName: label,
      price: parseFloat(String(r.valor ?? 0)) || 0,
      currency: "ARS",
      estimatedDays: r.horas_entrega ? Math.ceil(r.horas_entrega / 24) : undefined,
      service,
      modalidad: r.modalidad ?? "domicilio",
    };
  });
}
