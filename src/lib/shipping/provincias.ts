/**
 * Mapeo de nombres de provincia a ID ISO 3166-2:AR (sin prefijo AR-)
 * usado por Envíopack y otras APIs de envío en Argentina.
 */
export const PROVINCIA_TO_ISO: Record<string, string> = {
  "Buenos Aires": "B",
  "Capital Federal": "C",
  "Ciudad Autónoma de Buenos Aires": "C",
  "Ciudad de Buenos Aires": "C",
  "CABA": "C",
  Catamarca: "K",
  Chaco: "H",
  Chubut: "U",
  Córdoba: "X",
  Corrientes: "W",
  "Entre Ríos": "E",
  Formosa: "P",
  Jujuy: "Y",
  "La Pampa": "L",
  "La Rioja": "F",
  Mendoza: "M",
  Misiones: "N",
  Neuquén: "Q",
  "Río Negro": "R",
  Salta: "A",
  "San Juan": "J",
  "San Luis": "D",
  "Santa Cruz": "Z",
  "Santa Fe": "S",
  "Santiago del Estero": "G",
  "Tierra del Fuego": "V",
  Tucumán: "T",
};

/**
 * Obtiene el ID de provincia para APIs de envío.
 */
export function getProvinciaIso(provinciaNombre: string): string | null {
  const trimmed = provinciaNombre.trim();
  return PROVINCIA_TO_ISO[trimmed] ?? null;
}
