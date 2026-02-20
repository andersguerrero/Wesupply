/**
 * Genera los archivos content/*.json a partir de los datos estáticos actuales.
 * Ejecutar: npx tsx scripts/seed-content.ts
 */
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const CONTENT_DIR = join(process.cwd(), "content");
if (!existsSync(CONTENT_DIR)) mkdirSync(CONTENT_DIR, { recursive: true });

const products = [
  { sku: "WS100", handle: "ws100-cinta-embalar-transparente-48x100m", title: "Cinta embalar transparente 48x100m", image: "/images/products/cintas-6rollos-2.webp", price: 8500, categorySlug: "cintas" },
  { sku: "WS101", handle: "ws101-cinta-embalar-marron-48x100m", title: "Cinta embalar marrón 48x100m", image: "/images/products/cintas-6rollos-2.webp", price: 8500, categorySlug: "cintas" },
  { sku: "WS102", handle: "ws102-cinta-embalar-fragil-48x50m", title: "Cinta embalar frágil 48x50m", image: "/images/products/etiquetas-fragil-2.webp", price: 7200, categorySlug: "cintas" },
  { sku: "WS103", handle: "ws103-cinta-antideslizante-50x18m", title: "Cinta antideslizante 50x18m", image: "/images/products/cintas-6rollos-2.webp", price: 6500, categorySlug: "cintas" },
  { sku: "WS104", handle: "ws104-cinta-papel-24x50m", title: "Cinta de papel 24x50m", image: "/images/products/cintas-6rollos-2.webp", price: 5800, categorySlug: "cintas" },
  { sku: "WS105", handle: "ws105-cinta-papel-48x50m", title: "Cinta de papel 48x50m", image: "/images/products/cintas-6rollos-2.webp", price: 6200, categorySlug: "cintas" },
  { sku: "WS106", handle: "ws106-cinta-doble-faz-nano-tape-25x5m", title: "Cinta doble faz - Nano Tape 25x5m", image: "/images/products/cintas-6rollos-2.webp", price: 4200, categorySlug: "cintas" },
  { sku: "WS200", handle: "ws200-panos-microfibra-10pcs", title: "Paños microfibra 10 pcs", image: "/images/products/panio-joyeria-2.webp", price: 3500, categorySlug: "panos-textiles" },
  { sku: "WS201", handle: "ws201-repasador-cocina-5-patrones", title: "Repasador de cocina (5 patrones)", image: "/images/products/panio-joyeria-2.webp", price: 2800, categorySlug: "panos-textiles" },
  { sku: "WS400", handle: "ws400-tanza-bordeadora-cuadrada-3mm", title: "Tanza bordeadora cuadrada 3.0mm", image: "/images/products/tanza-cuadrada-2.webp", price: 1500, categorySlug: "tanzas" },
  { sku: "WS401", handle: "ws401-tanza-bordeadora-cuadrada-2-5mm", title: "Tanza bordeadora cuadrada 2.5mm", image: "/images/products/tanza-cuadrada-2.webp", price: 1400, categorySlug: "tanzas" },
  { sku: "WS402", handle: "ws402-tanza-bordeadora-redonda-2-5mm", title: "Tanza bordeadora redonda 2.5mm", image: "/images/products/tanza-redonda-2.webp", price: 1400, categorySlug: "tanzas" },
  { sku: "WS403", handle: "ws403-tanza-bordeadora-redonda-3mm", title: "Tanza bordeadora redonda 3.0mm", image: "/images/products/tanza-redonda-2.webp", price: 1500, categorySlug: "tanzas" },
  { sku: "WS500", handle: "ws500-etiquetas-termicas-100x150-330pcs", title: "Etiquetas térmicas 100x150 330 pcs", image: "/images/products/etiquetas-termicas-2.webp", price: 12500, categorySlug: "etiquetas" },
  { sku: "WS501", handle: "ws501-etiquetas-termicas-50x76-500pcs", title: "Etiquetas térmicas 50x76 500 pcs", image: "/images/products/etiquetas-termicas-2.webp", price: 9800, categorySlug: "etiquetas" },
  { sku: "WS600", handle: "ws600-caja-10pcs-empacado-vacio-bomba", title: "Caja 10 pcs empacado vacío + bomba", image: "/images/products/caja-36cintas-2.webp", price: 45000, categorySlug: "embalaje" },
  { sku: "WS601", handle: "ws601-5-bolsas-empacado-vacio-bomba", title: "5 bolsas empacado vacío + bomba", image: "/images/products/bolsa-vino-2.webp", price: 3200, categorySlug: "embalaje" },
  { sku: "WS602", handle: "ws602-joyeros", title: "Joyeros", image: "/images/products/bolsa-vino-2.webp", price: 2500, categorySlug: "embalaje" },
  { sku: "WS603", handle: "ws603-5-bolsas-50x70cm-bomba", title: "5 bolsas 50x70cm + bomba", image: "/images/products/50-bolsas-vino-2.webp", price: 5500, categorySlug: "embalaje" },
  { sku: "WS604", handle: "ws604-bolsas-aire-vino", title: "Bolsas de aire vino", image: "/images/products/bolsa-vino-2.webp", price: 1800, categorySlug: "embalaje" },
  { sku: "WS700", handle: "ws700-exhibidor-antecojos", title: "Exhibidor de anteojos", image: "/images/products/base-silicona-2.webp", price: 8900, categorySlug: "exhibidores" },
  { sku: "WS701", handle: "ws701-soporte-starlink", title: "Soporte Starlink", image: "/images/products/base-silicona-2.webp", price: 12500, categorySlug: "exhibidores" },
  { sku: "WS702", handle: "ws702-soporte", title: "Soporte", image: "/images/products/base-silicona-2.webp", price: 6500, categorySlug: "exhibidores" },
];

const categories = [
  { slug: "cintas", label: "Cintas", title: "Cintas para embalaje", shortTitle: "Cintas", description: "Cintas adhesivas para cierre de cajas, paquetes y envíos.", productHandles: products.filter(p => p.categorySlug === "cintas").map(p => p.handle), hero: { headline: "Cintas para embalaje", subheadline: "Cierre seguro de cajas y paquetes. Rollos de alta resistencia.", image: "/images/hero/hero-embalaje.webp" }, comparisonTable: { headers: ["Producto", "Ancho", "Longitud"], rows: [{ label: "Pack 6 rollos", values: ["48 mm", "100 m c/u"] }] }, applications: [{ title: "Cierre de cajas", desc: "Sellado de cartones para envío." }], faq: [{ id: "c1", question: "¿Qué ancho necesito?", answer: "Para cajas estándar, 48 mm es el más versátil." }] },
  { slug: "panos-textiles", label: "Paños y textiles", title: "Paños y textiles", shortTitle: "Paños", description: "Paños de microfibra y repasadores de cocina.", productHandles: products.filter(p => p.categorySlug === "panos-textiles").map(p => p.handle), hero: { headline: "Paños y textiles", subheadline: "Calidad y durabilidad.", image: "/images/products/panio-joyeria-2.webp" }, comparisonTable: undefined, applications: [], faq: [] },
  { slug: "tanzas", label: "Tanzas", title: "Tanzas", shortTitle: "Tanzas", description: "Tanzas bordeadoras para distintos usos.", productHandles: products.filter(p => p.categorySlug === "tanzas").map(p => p.handle), hero: { headline: "Tanzas", subheadline: "Cuadradas y redondas.", image: "/images/products/tanza-cuadrada-2.webp" }, comparisonTable: undefined, applications: [], faq: [] },
  { slug: "etiquetas", label: "Etiquetas", title: "Etiquetas", shortTitle: "Etiquetas", description: "Etiquetas térmicas para logística.", productHandles: products.filter(p => p.categorySlug === "etiquetas").map(p => p.handle), hero: { headline: "Etiquetas", subheadline: "Etiquetas térmicas para impresoras.", image: "/images/products/etiquetas-termicas-2.webp" }, comparisonTable: undefined, applications: [], faq: [] },
  { slug: "embalaje", label: "Embalaje y envío", title: "Embalaje y envío", shortTitle: "Embalaje", description: "Cajas, bolsas y materiales para envío.", productHandles: products.filter(p => p.categorySlug === "embalaje").map(p => p.handle), hero: { headline: "Embalaje y envío", subheadline: "Todo para tu logística.", image: "/images/products/caja-36cintas-2.webp" }, comparisonTable: undefined, applications: [], faq: [] },
  { slug: "exhibidores", label: "Exhibidores", title: "Exhibidores", shortTitle: "Exhibidores", description: "Exhibidores y soportes para retail.", productHandles: products.filter(p => p.categorySlug === "exhibidores").map(p => p.handle), hero: { headline: "Exhibidores", subheadline: "Presentación profesional.", image: "/images/products/base-silicona-2.webp" }, comparisonTable: undefined, applications: [], faq: [] },
];

const site = {
  homeHero: {
    headline: "Explorá soluciones de embalaje para tu operación",
    subheadline: "Cintas, protección, sellado y envío. Descuentos por volumen. Envío a todo el país.",
    ctaText: "Ver productos",
    ctaHref: "/cintas",
    trustText: "Pago seguro · MercadoPago",
    heroImage: "/images/hero/hero-embalaje.webp",
  },
  trustBar: { message: "ENVÍOS A TODO ARGENTINA" },
  categoryBlocks: {
    title: "Explorá por categoría",
    subtitle: "Combiná y sumá a tu carrito. Sin mínimos. Descuentos automáticos por volumen.",
    ctaText: "Ver categoría →",
  },
  footer: {
    address: "Au. Cam. del Buen Ayre 4600, Galpón 55-9\nJosé León Suárez, Buenos Aires, CP 1655",
    shopLinks: [
      { label: "Cintas", href: "/cintas" },
      { label: "Paños y textiles", href: "/panos-textiles" },
      { label: "Tanzas", href: "/tanzas" },
      { label: "Etiquetas", href: "/etiquetas" },
      { label: "Embalaje", href: "/embalaje" },
      { label: "Exhibidores", href: "/exhibidores" },
      { label: "Soluciones", href: "/soluciones" },
      { label: "Mayoristas", href: "/mayoristas" },
    ],
    empresaLinks: [
      { label: "Contacto", href: "/contacto" },
      { label: "FAQ", href: "/faq" },
      { label: "Impacto", href: "/impacto" },
      { label: "Soluciones", href: "/soluciones" },
    ],
    socialLinks: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    newsletterTitle: "Unite a nuestra comunidad",
    newsletterDesc: "Novedades, ofertas y descuentos por volumen.",
    legalLinks: [
      { label: "Términos de servicio", href: "/terminos" },
      { label: "Política de privacidad", href: "/privacidad" },
    ],
    copyright: "Todos los derechos reservados.",
  },
  queOfrecemos: {
    title: "¿Qué te ofrecemos?",
    description: "Evitá el almacén: cintas, protección y sellado a tu puerta. Combiná categorías y aprovechá descuentos por volumen.",
    items: [
      { title: "Cintas para embalaje", desc: "Cierre seguro de cajas y paquetes.", href: "/cintas" },
      { title: "Protección y amortiguación", desc: "Burbuja, relleno y materiales que reducen roturas.", href: "/proteccion" },
      { title: "Sellado e identificación", desc: "Etiquetas térmicas y adhesivos industriales.", href: "/sellado" },
      { title: "Soluciones para envío", desc: "Todo lo necesario para fulfillment y logística.", href: "/envio" },
    ],
    ctaText: "Explorar productos",
    ctaHref: "/cintas",
    image: "/images/hero/hero-logistica.webp",
  },
  meta: {
    siteTitle: "WESUPPLY - Especialista en Embalaje",
    siteDescription: "Cintas, protección, sellado y envío. Descuentos por volumen. Envío a todo el país.",
  },
};

writeFileSync(join(CONTENT_DIR, "products.json"), JSON.stringify(products, null, 2));
writeFileSync(join(CONTENT_DIR, "categories.json"), JSON.stringify(categories, null, 2));
writeFileSync(join(CONTENT_DIR, "site.json"), JSON.stringify(site, null, 2));
console.log("✅ Content seed creado en content/");
console.log("   - products.json");
console.log("   - categories.json");
console.log("   - site.json");
