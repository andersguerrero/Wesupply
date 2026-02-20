import { NextRequest } from "next/server";
import { readContent } from "@/lib/content/store";
import { computeShipmentFromCart } from "@/lib/shipping/products-shipping";
import { getProvinciaIso } from "@/lib/shipping/provincias";
import { quoteByZone } from "@/lib/shipping/zones-ml";
import type { ShippingQuoteOption } from "@/lib/shipping/types";

type QuoteBody = {
  provincia: string;
  codigoPostal: string;
  items: { productHandle: string; quantity: number }[];
};

/**
 * POST /api/shipping/quote
 * Cotiza envío propio para CABA y GBA (3 zonas estilo Mercado Libre Flex).
 */
export async function POST(req: NextRequest) {
  try {
    let body: QuoteBody;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Body inválido" }, { status: 400 });
    }

    const { provincia, codigoPostal, items } = body;
    if (!provincia || !codigoPostal || !Array.isArray(items) || items.length === 0) {
      return Response.json(
        { error: "Se requieren provincia, codigoPostal e items" },
        { status: 400 }
      );
    }

    const provinciaIso = getProvinciaIso(provincia);
    if (!provinciaIso) {
      return Response.json(
        { error: "Provincia no válida" },
        { status: 400 }
      );
    }

    const cp = codigoPostal.replace(/\D/g, "").slice(0, 4);
    if (!cp || cp.length < 4) {
      return Response.json(
        { error: "Código postal inválido (4 dígitos)" },
        { status: 400 }
      );
    }

    const products = readContent<Array<{ handle: string; weightKg?: number; heightCm?: number; widthCm?: number; lengthCm?: number }>>("products");
    const overrides: Record<string, { weightKg?: number; heightCm?: number; widthCm?: number; lengthCm?: number }> = {};
    if (products && Array.isArray(products)) {
      for (const p of products) {
        if (p.handle && (p.weightKg != null || p.heightCm != null || p.widthCm != null || p.lengthCm != null)) {
          overrides[p.handle] = {
            ...(p.weightKg != null && { weightKg: p.weightKg }),
            ...(p.heightCm != null && { heightCm: p.heightCm }),
            ...(p.widthCm != null && { widthCm: p.widthCm }),
            ...(p.lengthCm != null && { lengthCm: p.lengthCm }),
          };
        }
      }
    }

    const { totalWeightKg, paquetesString } = computeShipmentFromCart(items, Object.keys(overrides).length ? overrides : undefined);
    const allQuotes: ShippingQuoteOption[] = [];

    const zonePrices = readContent<{ cercana?: number; media?: number; lejana?: number }>("shipping-zones");
    const isCabaOrGba = provinciaIso === "C" || provinciaIso === "B";

    if (isCabaOrGba) {
      const zoneQuote = quoteByZone(cp, provinciaIso, zonePrices ?? undefined);
      if (zoneQuote) {
        const zoneLabels = { cercana: "CABA (zona cercana)", media: "GBA (media distancia)", lejana: "GBA (zona lejana)" };
        allQuotes.push({
          carrierId: "wesupply-zona",
          carrierName: `Envío propio · ${zoneLabels[zoneQuote.zone]}`,
          price: zoneQuote.price,
          currency: "ARS",
          modalidad: "domicilio",
        });
      }
    }

    if (!isCabaOrGba) {
      return Response.json(
        { error: "Por el momento solo enviamos a CABA y GBA.", meta: { totalWeightKg, paquetes: paquetesString } },
        { status: 503 }
      );
    }

    if (allQuotes.length === 0) {
      return Response.json(
        { error: "Código postal fuera de zona de cobertura en CABA/GBA.", meta: { totalWeightKg, paquetes: paquetesString } },
        { status: 503 }
      );
    }

    const sorted = [...allQuotes].sort((a, b) => a.price - b.price);
    return Response.json({
      quotes: sorted,
      meta: { totalWeightKg, paquetes: paquetesString, provincia, codigoPostal: cp },
    });
  } catch (err) {
    console.error("[shipping] Error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Error al cotizar envío" },
      { status: 500 }
    );
  }
}
