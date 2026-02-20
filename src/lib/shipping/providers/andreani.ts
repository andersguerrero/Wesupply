/**
 * Proveedor Andreani - API v1 Tarifas
 * Doc: https://developers.andreani.com/documentacion
 * Requiere: usuario, contraseña, número de cliente, número de contrato.
 */

import type { ShippingQuoteOption } from "../types";

const API_BASE = process.env.ANDREANI_API_QA === "1" ? "https://apisqa.andreani.com" : "https://apis.andreani.com";

async function getAndreaniToken(): Promise<string> {
  const user = process.env.ANDREANI_USER;
  const pass = process.env.ANDREANI_PASSWORD;
  if (!user || !pass) {
    throw new Error("ANDREANI_USER y ANDREANI_PASSWORD no configurados");
  }

  const auth = Buffer.from(`${user}:${pass}`).toString("base64");
  const res = await fetch(`${API_BASE}/login`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Andreani login failed: ${res.status} ${text}`);
  }

  const token = res.headers.get("x-authorization-token") ?? res.headers.get("X-Authorization-token");
  if (!token) {
    const data = (await res.json().catch(() => ({}))) as { token?: string };
    if (data.token) return data.token;
    throw new Error("Andreani: no token in response");
  }
  return token;
}

type AndreaniQuoteParams = {
  codigoPostalDestino: string;
  pesoKg: number;
  /** Alto, ancho, largo en cm */
  altoCm?: number;
  anchoCm?: number;
  largoCm?: number;
};

/**
 * Cotiza envío Andreani vía GET /v1/tarifas
 * Parámetros: cpDestino, contrato, cliente, bultos (kilos, volumen, valorDeclarado)
 */
export async function quoteAndreani(params: AndreaniQuoteParams): Promise<ShippingQuoteOption[]> {
  const token = await getAndreaniToken();
  const contrato = process.env.ANDREANI_CONTRATO;
  const cliente = process.env.ANDREANI_CLIENTE;
  if (!contrato || !cliente) {
    throw new Error("ANDREANI_CONTRATO y ANDREANI_CLIENTE no configurados");
  }

  const cp = params.codigoPostalDestino.replace(/\D/g, "").slice(0, 4) || "1000";
  const h = params.altoCm ?? 15;
  const w = params.anchoCm ?? 15;
  const l = params.largoCm ?? 10;
  const volumenCm3 = h * w * l;
  const valorDeclarado = 1000;

  const bulto = {
    kilos: params.pesoKg,
    volumen: volumenCm3,
    pesoAforado: Math.max(params.pesoKg, volumenCm3 / 5000),
    valorDeclarado,
  };

  const paramsArr = new URLSearchParams({
    cpDestino: cp,
    contrato,
    cliente,
  });
  Object.entries(bulto).forEach(([k, v]) => {
    paramsArr.append(`bultos[0][${k}]`, String(v));
  });

  const res = await fetch(`${API_BASE}/v1/tarifas?${paramsArr}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-authorization-token": token,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Andreani quote failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    tarifaConIva?: { total?: number };
    tarifaSinIva?: { total?: number };
    valor?: number;
  };

  const price = Number(data?.tarifaConIva?.total ?? data?.tarifaSinIva?.total ?? data?.valor ?? 0);
  if (price <= 0) return [];

  return [{
    carrierId: "andreani",
    carrierName: "Andreani",
    price,
    currency: "ARS",
    modalidad: "domicilio",
  }];
}
