/**
 * Catálogo de productos WESUPPLY.
 * Imágenes referenciales en /images/products/ — agregar assets según SKU.
 */

export type ProductPreview = {
  sku: string;
  handle: string;
  title: string;
  image?: string;
  /** Varias imágenes. La primera es la principal. */
  images?: string[];
  /** Precio unitario en ARS. Consultar por precios reales. */
  price?: number;
};

/** Cintas — agregar imágenes en /images/products/ws*.webp. Precios en ARS. */
const CINTAS: ProductPreview[] = [
  { sku: "WS100", handle: "ws100-cinta-embalar-transparente-48x100m", title: "Cinta embalar transparente 48x100m", image: "/images/products/cintas-6rollos-2.webp", price: 8500 },
  { sku: "WS101", handle: "ws101-cinta-embalar-marron-48x100m", title: "Cinta embalar marrón 48x100m", image: "/images/products/cintas-6rollos-2.webp", price: 8500 },
  { sku: "WS102", handle: "ws102-cinta-embalar-fragil-48x50m", title: "Cinta embalar frágil 48x50m", image: "/images/products/etiquetas-fragil-2.webp", price: 7200 },
  { sku: "WS103", handle: "ws103-cinta-antideslizante-50x18m", title: "Cinta antideslizante 50x18m", image: "/images/products/cintas-6rollos-2.webp", price: 6500 },
  { sku: "WS104", handle: "ws104-cinta-papel-24x50m", title: "Cinta de papel 24x50m", image: "/images/products/cintas-6rollos-2.webp", price: 5800 },
  { sku: "WS105", handle: "ws105-cinta-papel-48x50m", title: "Cinta de papel 48x50m", image: "/images/products/cintas-6rollos-2.webp", price: 6200 },
  { sku: "WS106", handle: "ws106-cinta-doble-faz-nano-tape-25x5m", title: "Cinta doble faz - Nano Tape 25x5m", image: "/images/products/cintas-6rollos-2.webp", price: 4200 },
];

/** Paños y textiles */
const PANOS: ProductPreview[] = [
  { sku: "WS200", handle: "ws200-panos-microfibra-10pcs", title: "Paños microfibra 10 pcs", image: "/images/products/panio-joyeria-2.webp", price: 3500 },
  { sku: "WS201", handle: "ws201-repasador-cocina-5-patrones", title: "Repasador de cocina (5 patrones)", image: "/images/products/panio-joyeria-2.webp", price: 2800 },
];

/** Tanzas */
const TANZAS: ProductPreview[] = [
  { sku: "WS400", handle: "ws400-tanza-bordeadora-cuadrada-3mm", title: "Tanza bordeadora cuadrada 3.0mm", image: "/images/products/tanza-cuadrada-2.webp", price: 1500 },
  { sku: "WS401", handle: "ws401-tanza-bordeadora-cuadrada-2-5mm", title: "Tanza bordeadora cuadrada 2.5mm", image: "/images/products/tanza-cuadrada-2.webp", price: 1400 },
  { sku: "WS402", handle: "ws402-tanza-bordeadora-redonda-2-5mm", title: "Tanza bordeadora redonda 2.5mm", image: "/images/products/tanza-redonda-2.webp", price: 1400 },
  { sku: "WS403", handle: "ws403-tanza-bordeadora-redonda-3mm", title: "Tanza bordeadora redonda 3.0mm", image: "/images/products/tanza-redonda-2.webp", price: 1500 },
];

/** Etiquetas */
const ETIQUETAS: ProductPreview[] = [
  { sku: "WS500", handle: "ws500-etiquetas-termicas-100x150-330pcs", title: "Etiquetas térmicas 100x150 330 pcs", image: "/images/products/etiquetas-termicas-2.webp", price: 12500 },
  { sku: "WS501", handle: "ws501-etiquetas-termicas-50x76-500pcs", title: "Etiquetas térmicas 50x76 500 pcs", image: "/images/products/etiquetas-termicas-2.webp", price: 9800 },
];

/** Embalaje y envío */
const EMBALAJE: ProductPreview[] = [
  { sku: "WS600", handle: "ws600-caja-10pcs-empacado-vacio-bomba", title: "Caja 10 pcs empacado vacío + bomba", image: "/images/products/caja-36cintas-2.webp", price: 45000 },
  { sku: "WS601", handle: "ws601-5-bolsas-empacado-vacio-bomba", title: "5 bolsas empacado vacío + bomba", image: "/images/products/bolsa-vino-2.webp", price: 3200 },
  { sku: "WS602", handle: "ws602-joyeros", title: "Joyeros", image: "/images/products/bolsa-vino-2.webp", price: 2500 },
  { sku: "WS603", handle: "ws603-5-bolsas-50x70cm-bomba", title: "5 bolsas 50x70cm + bomba", image: "/images/products/50-bolsas-vino-2.webp", price: 5500 },
  { sku: "WS604", handle: "ws604-bolsas-aire-vino", title: "Bolsas de aire vino", image: "/images/products/bolsa-vino-2.webp", price: 1800 },
];

/** Exhibidores y retail — agregar imágenes específicas */
const EXHIBIDORES: ProductPreview[] = [
  { sku: "WS700", handle: "ws700-exhibidor-antecojos", title: "Exhibidor de anteojos", image: "/images/products/base-silicona-2.webp", price: 8900 },
  { sku: "WS701", handle: "ws701-soporte-starlink", title: "Soporte Starlink", image: "/images/products/base-silicona-2.webp", price: 12500 },
  { sku: "WS702", handle: "ws702-soporte", title: "Soporte", image: "/images/products/base-silicona-2.webp", price: 6500 },
];

export const NAV_CATEGORIES = [
  { slug: "cintas", label: "Cintas", href: "/cintas", products: CINTAS },
  { slug: "panos-textiles", label: "Paños y textiles", href: "/panos-textiles", products: PANOS },
  { slug: "tanzas", label: "Tanzas", href: "/tanzas", products: TANZAS },
  { slug: "etiquetas", label: "Etiquetas", href: "/etiquetas", products: ETIQUETAS },
  { slug: "embalaje", label: "Embalaje y envío", href: "/embalaje", products: EMBALAJE },
  { slug: "exhibidores", label: "Exhibidores", href: "/exhibidores", products: EXHIBIDORES },
] as const;

export const ALL_PRODUCT_HANDLES = [
  ...CINTAS.map((p) => p.handle),
  ...PANOS.map((p) => p.handle),
  ...TANZAS.map((p) => p.handle),
  ...ETIQUETAS.map((p) => p.handle),
  ...EMBALAJE.map((p) => p.handle),
  ...EXHIBIDORES.map((p) => p.handle),
];
