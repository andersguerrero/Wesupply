/**
 * Zonas estilo Mercado Libre Envíos Flex para CABA y GBA.
 * 3 precios según distancia: cercana, media, lejana.
 * Cobertura: Capital Federal + GBA (mapa similar a ML).
 */

export type ZoneId = "cercana" | "media" | "lejana";

export type ZonePrices = {
  cercana: number;
  media: number;
  lejana: number;
};

const DEFAULT_PRICES: ZonePrices = {
  cercana: 4611,
  media: 7371,
  lejana: 10246,
};

/**
 * Determina la zona según CP. Solo aplica si provincia es C (CABA) o B (Buenos Aires).
 * La zona se define por CP para evitar errores si el usuario elige mal la provincia.
 * Origen: Palermo CP 1414 (CABA).
 * - 1000-1499: CABA = cercana
 * - 1500-1650: GBA norte = media
 * - 1651-1999: GBA resto = lejana
 */
function getZoneByCp(cp: string, provinciaIso: string): ZoneId | null {
  if (provinciaIso !== "C" && provinciaIso !== "B") return null;

  const n = parseInt(cp.replace(/\D/g, "").slice(0, 4), 10) || 0;

  if (n >= 1000 && n <= 1499) return "cercana";
  if (n >= 1500 && n <= 1650) return "media";
  if (n >= 1651 && n <= 2999) return "lejana";

  return null;
}

/**
 * Verifica si el CP está en zona cubierta (CABA o GBA).
 */
export function isCovered(cp: string, provinciaIso: string): boolean {
  return getZoneByCp(cp, provinciaIso) !== null;
}

/**
 * Obtiene la cotización por zona para CABA/GBA.
 */
export function quoteByZone(
  cp: string,
  provinciaIso: string,
  prices?: Partial<ZonePrices>
): { zone: ZoneId; price: number } | null {
  const zone = getZoneByCp(cp, provinciaIso);
  if (!zone) return null;

  const p = { ...DEFAULT_PRICES, ...prices };
  const price = p[zone];
  return price > 0 ? { zone, price } : null;
}
