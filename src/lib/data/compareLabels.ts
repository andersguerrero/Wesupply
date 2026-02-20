/**
 * Labels para valores de filtros en comparador.
 * Mapeable desde metafields Shopify.
 */

export const COMPARE_LABELS: Record<string, Record<string, string>> = {
  tipo_cinta: {
    estandar: "Estándar",
    "alta-resistencia": "Alta resistencia",
    silenciosa: "Silenciosa",
    reforzada: "Reforzada",
    personalizada: "Personalizada",
  },
  nivel_uso: {
    liviano: "Liviano",
    medio: "Medio",
    pesado: "Pesado",
    "industrial-extremo": "Industrial extremo",
  },
  micrones: {
    "40-45": "40–45",
    "46-50": "46–50",
    "51-60": "51–60",
    "60-plus": "60+",
  },
  tipo_adhesivo: {
    acrilico: "Acrílico",
    "hot-melt": "Hot melt",
    solvente: "Solvente",
  },
  industria: {
    logistica: "Logística",
    retail: "Retail",
    construccion: "Construcción",
    industrial: "Industrial",
  },
  pack: {
    individual: "Individual",
    "pack-10": "Pack 10",
    "pack-25": "Pack 25",
    "pack-50-plus": "Pack 50+",
  },
};

function formatValue(
  key: string,
  val: string | string[]
): string {
  const labels = COMPARE_LABELS[key];
  const arr = Array.isArray(val) ? val : [val];
  return arr
    .map((v) => labels?.[v] ?? v)
    .filter(Boolean)
    .join(", ") || "—";
}

export function getCompareDisplayValue(
  filterValues: Record<string, string | string[]> | undefined,
  key: string
): string {
  if (!filterValues) return "—";
  const val = filterValues[key];
  if (val === undefined) return "—";
  return formatValue(key, val);
}
