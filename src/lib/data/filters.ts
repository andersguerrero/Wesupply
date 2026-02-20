/**
 * Configuración de filtros por categoría.
 * Extensible para Protección, Sellado, Envío.
 * Mapeable desde Shopify metafields (custom.tipo_cinta, etc.).
 */

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterGroup = {
  key: string;
  label: string;
  options: FilterOption[];
};

export type FilterConfig = {
  categorySlug: string;
  groups: FilterGroup[];
};

export type SortOption = {
  value: string;
  label: string;
};

export const SORT_OPTIONS: SortOption[] = [
  { value: "recomendado", label: "Recomendado" },
  { value: "mayor-resistencia", label: "Mayor resistencia" },
  { value: "mejor-precio", label: "Mejor precio por unidad" },
  { value: "mayor-volumen", label: "Mayor volumen" },
];

/** Filtros para Cintas */
export const CINTAS_FILTERS: FilterConfig = {
  categorySlug: "cintas",
  groups: [
    {
      key: "tipo_cinta",
      label: "Tipo de cinta",
      options: [
        { value: "estandar", label: "Estándar" },
        { value: "alta-resistencia", label: "Alta resistencia" },
        { value: "silenciosa", label: "Silenciosa" },
        { value: "reforzada", label: "Reforzada" },
        { value: "personalizada", label: "Personalizada" },
      ],
    },
    {
      key: "nivel_uso",
      label: "Nivel de uso",
      options: [
        { value: "liviano", label: "Liviano" },
        { value: "medio", label: "Medio" },
        { value: "pesado", label: "Pesado" },
        { value: "industrial-extremo", label: "Industrial extremo" },
      ],
    },
    {
      key: "micrones",
      label: "Micrones",
      options: [
        { value: "40-45", label: "40–45" },
        { value: "46-50", label: "46–50" },
        { value: "51-60", label: "51–60" },
        { value: "60-plus", label: "60+" },
      ],
    },
    {
      key: "tipo_adhesivo",
      label: "Tipo de adhesivo",
      options: [
        { value: "acrilico", label: "Acrílico" },
        { value: "hot-melt", label: "Hot melt" },
        { value: "solvente", label: "Solvente" },
      ],
    },
    {
      key: "industria",
      label: "Industria",
      options: [
        { value: "logistica", label: "Logística" },
        { value: "retail", label: "Retail" },
        { value: "construccion", label: "Construcción" },
        { value: "industrial", label: "Industrial" },
      ],
    },
    {
      key: "pack",
      label: "Pack",
      options: [
        { value: "individual", label: "Individual" },
        { value: "pack-10", label: "Pack 10" },
        { value: "pack-25", label: "Pack 25" },
        { value: "pack-50-plus", label: "Pack 50+" },
      ],
    },
  ],
};

/** Config por categoría — extensible */
export const FILTER_CONFIGS: Record<string, FilterConfig> = {
  cintas: CINTAS_FILTERS,
  proteccion: { categorySlug: "proteccion", groups: [] },
  sellado: { categorySlug: "sellado", groups: [] },
  envio: { categorySlug: "envio", groups: [] },
};

export function getFilterConfig(categorySlug: string): FilterConfig | null {
  return FILTER_CONFIGS[categorySlug] ?? null;
}
