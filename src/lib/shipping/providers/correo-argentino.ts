/**
 * Proveedor Correo Argentino - API MiCorreo
 * Doc: https://api.correoargentino.com.ar/micorreo/v1
 * Endpoint rates: POST /rates
 * Requiere: userToken, passwordToken, customerId, CP origen.
 */

import type { ShippingQuoteOption } from "../types";

const API_BASE =
  process.env.CORREO_ARGENTINO_TEST === "1"
    ? "https://apitest.correoargentino.com.ar/micorreo/v1"
    : "https://api.correoargentino.com.ar/micorreo/v1";

async function getCorreoArgentinoToken(): Promise<string> {
  const user = process.env.CORREO_ARGENTINO_USER ?? process.env.CORREO_ARGENTINO_USER_TOKEN;
  const pass = process.env.CORREO_ARGENTINO_PASSWORD ?? process.env.CORREO_ARGENTINO_PASSWORD_TOKEN;
  if (!user || !pass) {
    throw new Error("CORREO_ARGENTINO_USER y CORREO_ARGENTINO_PASSWORD (o USER_TOKEN/PASSWORD_TOKEN) no configurados");
  }

  const auth = Buffer.from(`${user}:${pass}`).toString("base64");
  const params = new URLSearchParams({ grant_type: "client_credentials" });
  const res = await fetch(`${API_BASE}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Correo Argentino token failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Correo Argentino: no access_token in response");
  }
  return data.access_token;
}

type CorreoArgentinoQuoteParams = {
  codigoPostalDestino: string;
  pesoKg: number;
  /** Dimensiones en cm */
  altoCm?: number;
  anchoCm?: number;
  largoCm?: number;
};

let cachedCustomerId: string | null = null;

async function getCustomerId(): Promise<string> {
  if (process.env.CORREO_ARGENTINO_CUSTOMER_ID) {
    return process.env.CORREO_ARGENTINO_CUSTOMER_ID;
  }
  if (cachedCustomerId) return cachedCustomerId;

  const user = process.env.CORREO_ARGENTINO_USER ?? process.env.CORREO_ARGENTINO_USER_TOKEN;
  const pass = process.env.CORREO_ARGENTINO_PASSWORD ?? process.env.CORREO_ARGENTINO_PASSWORD_TOKEN;
  if (!user || !pass) throw new Error("CORREO_ARGENTINO_CUSTOMER_ID no configurado. Obtenerlo en MiCorreo o con GET /api/shipping/correo-customer-id");

  const token = await getCorreoArgentinoToken();
  const res = await fetch(`${API_BASE}/users/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email: user, password: pass }),
  });

  const data = (await res.json()) as { customerId?: string; id?: string; customer_id?: string };
  const id = data.customerId ?? data.id ?? data.customer_id;
  if (id) {
    cachedCustomerId = String(id);
    return cachedCustomerId;
  }
  throw new Error(
    "CORREO_ARGENTINO_CUSTOMER_ID no configurado. Obtenerlo en MiCorreo o ejecutando: GET /api/shipping/correo-customer-id"
  );
}

/**
 * Cotiza envío Correo Argentino vía POST /rates
 * dimensions: weight en gramos, height/width/length en cm
 */
export async function quoteCorreoArgentino(params: CorreoArgentinoQuoteParams): Promise<ShippingQuoteOption[]> {
  const token = await getCorreoArgentinoToken();
  const customerId = await getCustomerId();
  const cpOrigen = process.env.SHIPPING_ORIGIN_CP ?? process.env.CORREO_ARGENTINO_ORIGIN_CP ?? "1414";

  const cp = params.codigoPostalDestino.replace(/\D/g, "").slice(0, 4) || "1000";
  const weightG = Math.round((params.pesoKg || 0.5) * 1000);
  const h = params.altoCm ?? 15;
  const w = params.anchoCm ?? 15;
  const l = params.largoCm ?? 10;

  const body = {
    customerId,
    postalCodeOrigin: cpOrigen,
    postalCodeDestination: cp,
    deliveredType: "D",
    dimensions: [{
      weight: weightG,
      height: h,
      width: w,
      length: l,
      quantity: 1,
    }],
  };

  const res = await fetch(`${API_BASE}/rates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Correo Argentino quote failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    rates?: Array<{ price?: number; productName?: string }>;
    valor?: number;
  };

  const rates = Array.isArray(data?.rates) ? data.rates : "valor" in data && data.valor != null ? [{ price: data.valor }] : [];

  return rates
    .filter((r) => Number(r.price ?? 0) > 0)
    .map((r) => ({
      carrierId: "correo-argentino",
      carrierName: (r as { productName?: string }).productName ?? "Correo Argentino",
      price: Number(r.price ?? 0),
      currency: "ARS",
      modalidad: "domicilio",
    }));
}
