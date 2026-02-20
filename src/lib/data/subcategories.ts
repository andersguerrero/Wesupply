/**
 * Subcategorías por categoría — Especialista en Embalaje.
 * Estructura preparada para filtros futuros (resistencia, micrones, industria, volumen).
 */

/** Campos de filtro futuros — no implementados aún */
export type FilterFieldDef = {
  key: string;
  label: string;
  type: "range" | "multi" | "single";
  options?: { value: string; label: string }[];
};

export type SubcategoryMeta = {
  slug: string;
  title: string;
  /** H1 para SEO — intención de búsqueda */
  description: string;
  productHandles: string[];
  hero: {
    headline: string;
    subheadline: string;
    image?: string;
  };
  comparisonTable?: {
    headers: string[];
    rows: { label: string; values: string[] }[];
  };
  idealFor: { title: string; desc: string }[];
  faq: { id: string; question: string; answer: string }[];
  /** Base para filtros futuros */
  filterFields?: FilterFieldDef[];
};

/** Subcategorías por categoría principal */
export const SUBCATEGORIES: Record<string, SubcategoryMeta[]> = {
  cintas: [
    {
      slug: "estandar",
      title: "Cinta de embalar estándar",
      description:
        "Cinta adhesiva estándar para cierre de cajas y paquetes. Versátil, económica y fácil de aplicar. Ideal para operaciones diarias de embalaje.",
      productHandles: ["6-cintas-para-embalar-48mm-x-100-metros"],
      hero: {
        headline: "Cinta de embalar estándar",
        subheadline: "Versátil y económica. Cierre seguro para operaciones diarias.",
        image: "/images/hero/hero-embalaje.webp",
      },
      comparisonTable: {
        headers: ["Producto", "Ancho", "Longitud", "Uso"],
        rows: [
          { label: "Pack 6 rollos", values: ["48 mm", "100 m c/u", "Estándar"] },
        ],
      },
      idealFor: [
        { title: "E-commerce", desc: "Pedidos en volumen diario." },
        { title: "Oficinas", desc: "Envío ocasional de documentación y paquetes." },
        { title: "Retail", desc: "Cierre de cajas en punto de venta." },
      ],
      faq: [
        { id: "ce1", question: "¿Qué ancho es más versátil?", answer: "48 mm cubre la mayoría de cajas estándar." },
      ],
      filterFields: [{ key: "resistencia", label: "Resistencia", type: "single" }],
    },
    {
      slug: "alta-resistencia",
      title: "Cinta de embalar alta resistencia",
      description:
        "Cinta reforzada con mayor resistencia a tracción y adherencia. Para cajas pesadas, pallets y envíos que requieren seguridad extra.",
      productHandles: ["caja-de-36-cintas-de-embalar-100-metros-x-48-mm"],
      hero: {
        headline: "Cinta de embalar alta resistencia",
        subheadline: "Para cajas pesadas y pallets. Mayor adherencia y tracción.",
        image: "/images/hero/hero-embalaje.webp",
      },
      idealFor: [
        { title: "Logística pesada", desc: "Pallets y bultos de mayor peso." },
        { title: "Industria", desc: "Operaciones de almacén intensivas." },
        { title: "Distribución", desc: "Centros de cumplimiento." },
      ],
      faq: [
        { id: "car1", question: "¿Qué diferencia tiene con la estándar?", answer: "Mayor espesor y adhesivo reforzado para cargas pesadas." },
      ],
      filterFields: [{ key: "resistencia", label: "Resistencia", type: "single" }],
    },
    {
      slug: "silenciosa",
      title: "Cinta silenciosa para embalaje",
      description:
        "Cinta que reduce el ruido al desenrollar. Ideal para entornos donde el silencio importa: oficinas, atención al cliente, despachos.",
      productHandles: [],
      hero: {
        headline: "Cinta silenciosa para embalaje",
        subheadline: "Menos ruido al desenrollar. Ideal para oficinas y despachos.",
        image: "/images/hero/hero-embalaje.webp",
      },
      idealFor: [
        { title: "Oficinas", desc: "Áreas de empaque en espacios compartidos." },
        { title: "Retail", desc: "Cajas en horario de atención al público." },
        { title: "Call centers", desc: "Envíos en entorno silencioso." },
      ],
      faq: [
        { id: "cs1", question: "¿Mantiene la misma adherencia?", answer: "Sí, la adhesión es equivalente a cintas estándar." },
      ],
    },
    {
      slug: "reforzada",
      title: "Cinta reforzada con hilos",
      description:
        "Cinta con refuerzo de fibra de vidrio o poliéster. Máxima resistencia al rasgado. Para embalaje de alto riesgo y exportación.",
      productHandles: [],
      hero: {
        headline: "Cinta reforzada con hilos",
        subheadline: "Máxima resistencia al rasgado. Para exportación y alto riesgo.",
        image: "/images/hero/hero-embalaje.webp",
      },
      idealFor: [
        { title: "Exportación", desc: "Envíos internacionales de largo tránsito." },
        { title: "Valores", desc: "Contenido de alto valor que requiere seguridad." },
        { title: "Almacenamiento", desc: "Bultos en depósito prolongado." },
      ],
      faq: [
        { id: "cr1", question: "¿Se puede cortar con dispensador estándar?", answer: "Sí, compatible con dispensadores manuales y automáticos." },
      ],
      filterFields: [{ key: "micrones", label: "Espesor (µm)", type: "range" }],
    },
    {
      slug: "personalizada",
      title: "Cinta personalizada con logo",
      description:
        "Cinta adhesiva con tu marca, logo o mensaje. Refuerza identidad en cada envío. Mínimos accesibles para operaciones medianas.",
      productHandles: [],
      hero: {
        headline: "Cinta personalizada con logo",
        subheadline: "Tu marca en cada envío. Mínimos accesibles.",
        image: "/images/hero/hero-embalaje.webp",
      },
      idealFor: [
        { title: "E-commerce con marca", desc: "Experiencia de unboxing coherente." },
        { title: "Empresas", desc: "Identidad corporativa en logística." },
        { title: "Eventos", desc: "Cierre identificado para envíos especiales." },
      ],
      faq: [
        { id: "cp1", question: "¿Cuál es el mínimo de pedido?", answer: "Consultar. Trabajamos con volúmenes accesibles para pymes." },
      ],
    },
    {
      slug: "logistica-pesada",
      title: "Cinta para logística pesada",
      description:
        "Cinta pensada para centros de distribución y operaciones de alto volumen. Rollos grandes, alto rendimiento, bajo costo por metro.",
      productHandles: ["caja-de-36-cintas-de-embalar-100-metros-x-48-mm"],
      hero: {
        headline: "Cinta para logística pesada",
        subheadline: "Alto volumen. Alto rendimiento. Bajo costo por metro.",
        image: "/images/hero/hero-logistica.webp",
      },
      idealFor: [
        { title: "Fulfillment", desc: "Centros de distribución." },
        { title: "Mayoristas", desc: "Operaciones de reabastecimiento." },
        { title: "E-commerce escalado", desc: "Pedidos diarios elevados." },
      ],
      faq: [
        { id: "clp1", question: "¿Ofrecen dispensadores automáticos?", answer: "Podemos asesorar en equipamiento según tu volumen." },
      ],
      filterFields: [{ key: "volumen", label: "Volumen", type: "single" }],
    },
    {
      slug: "retail",
      title: "Cinta para retail",
      description:
        "Cintas para punto de venta: cierre de bolsas, repuestos en mostrador, identificación rápida. Prácticas y accesibles.",
      productHandles: ["6-cintas-para-embalar-48mm-x-100-metros"],
      hero: {
        headline: "Cinta para retail",
        subheadline: "Cierre en mostrador. Práctica y accesible.",
        image: "/images/hero/hero-embalaje.webp",
      },
      idealFor: [
        { title: "Puntos de venta", desc: "Cierre de bolsas y paquetes." },
        { title: "Farmacias", desc: "Embalaje de productos frágiles." },
        { title: "Comercios", desc: "Uso diario en atención al cliente." },
      ],
      faq: [
        { id: "crt1", question: "¿Hay colores disponibles?", answer: "Consultar disponibilidad según producto." },
      ],
    },
  ],
  proteccion: [
    {
      slug: "papel-kraft",
      title: "Papel kraft para embalaje",
      description:
        "Papel kraft natural o tratado para relleno, protección y envoltura. Ecológico, reciclable y económico.",
      productHandles: [],
      hero: {
        headline: "Papel kraft para embalaje",
        subheadline: "Ecológico y reciclable. Protección y relleno versátil.",
        image: "/images/hero/hero-logistica.webp",
      },
      idealFor: [
        { title: "Relleno de cajas", desc: "Evitar movimiento interno." },
        { title: "Envoltura", desc: "Protección de superficies delicadas." },
        { title: "Sustentabilidad", desc: "Material reciclable y biodegradable." },
      ],
      faq: [
        { id: "pk1", question: "¿Es reciclable?", answer: "Sí, el kraft es 100% reciclable." },
      ],
    },
    {
      slug: "film-stretch",
      title: "Film stretch industrial",
      description:
        "Film estirable para paletización y agrupación de productos. Reduce movimientos y protege durante transporte y almacenamiento.",
      productHandles: [],
      hero: {
        headline: "Film stretch industrial",
        subheadline: "Paletización y estabilización de carga. Menos movimientos, más seguridad.",
        image: "/images/hero/hero-logistica.webp",
      },
      idealFor: [
        { title: "Paletización", desc: "Estabilización de pallets." },
        { title: "Almacén", desc: "Protección contra polvo y humedad." },
        { title: "Transporte", desc: "Agrupación de bultos." },
      ],
      faq: [
        { id: "fs1", question: "¿Manual o automático?", answer: "Ofrecemos ambos. El manual es ideal para volúmenes bajos." },
      ],
      filterFields: [{ key: "micrones", label: "Espesor (µm)", type: "range" }],
    },
    {
      slug: "burbuja",
      title: "Burbuja y material inflable",
      description:
        "Bolsas de burbuja e inflables para protección de productos frágiles. Reducen roturas y reclamos en envíos.",
      productHandles: [
        "bolsa-de-aire-inflable-para-vino",
        "50-bolsas-de-burbuja-proteccion-para-botella-de-vino-inflable",
      ],
      hero: {
        headline: "Burbuja y material inflable",
        subheadline: "Protección de frágiles. Menos roturas, menos reclamos.",
        image: "/images/hero/hero-logistica.webp",
      },
      comparisonTable: {
        headers: ["Producto", "Capacidad", "Cantidad"],
        rows: [
          { label: "Bolsa vino 1 u", values: ["1 botella", "Inflable"] },
          { label: "Pack 50 bolsas", values: ["1 botella c/u", "50 u"] },
        ],
      },
      idealFor: [
        { title: "Vinos y bebidas", desc: "Botellas en envío individual." },
        { title: "E-commerce", desc: "Productos delicados en pedidos." },
        { title: "Mudanzas", desc: "Objetos frágiles." },
      ],
      faq: [
        { id: "bb1", question: "¿Las inflables requieren maquinaria?", answer: "No, el inflado es manual y sencillo." },
      ],
    },
    {
      slug: "relleno-protector",
      title: "Relleno protector",
      description:
        "Chips, papel arrugado y materiales de relleno para evitar movimiento interno en cajas. Protección económica.",
      productHandles: [],
      hero: {
        headline: "Relleno protector",
        subheadline: "Evita movimiento interno. Protección económica en cada caja.",
        image: "/images/hero/hero-logistica.webp",
      },
      idealFor: [
        { title: "Relleno de huecos", desc: "Elimina movimientos en tránsito." },
        { title: "E-commerce", desc: "Cajas de diversos tamaños." },
        { title: "Envíos variados", desc: "Adaptable a distintos productos." },
      ],
      faq: [
        { id: "rp1", question: "¿Qué material es más económico?", answer: "El papel arrugado suele ser la opción más accesible." },
      ],
    },
    {
      slug: "espuma-tecnica",
      title: "Espuma técnica",
      description:
        "Espumas de polietileno y EVA para protección de piezas industriales, electrónica y equipos sensibles.",
      productHandles: ["base-protectora-silicona-para-termo-vaso-tyeso-o-generico"],
      hero: {
        headline: "Espuma técnica",
        subheadline: "Protección de equipos sensibles e industrial.",
        image: "/images/hero/hero-logistica.webp",
      },
      idealFor: [
        { title: "Electrónica", desc: "Protección de dispositivos." },
        { title: "Industrial", desc: "Piezas y equipos delicados." },
        { title: "OEM", desc: "Embalaje original de fábrica." },
      ],
      faq: [
        { id: "et1", question: "¿Hay opciones antistático?", answer: "Consultar según aplicación específica." },
      ],
      filterFields: [{ key: "industria", label: "Industria", type: "multi" }],
    },
  ],
  sellado: [
    {
      slug: "precintos",
      title: "Precintos de seguridad",
      description:
        "Precintos para cierre y trazabilidad de bultos. Identificación visual de manipulación. Logística y retail.",
      productHandles: [],
      hero: {
        headline: "Precintos de seguridad",
        subheadline: "Cierre trazable. Identificación de manipulación.",
        image: "/images/hero/hero-embalaje.webp",
      },
      idealFor: [
        { title: "Logística", desc: "Trazabilidad de bultos." },
        { title: "Retail", desc: "Seguridad en cierre de cajas." },
        { title: "Valores", desc: "Indicación de apertura." },
      ],
      faq: [
        { id: "ps1", question: "¿Son numerados?", answer: "Ofrecemos opciones numeradas para trazabilidad." },
      ],
    },
    {
      slug: "etiquetas-termicas",
      title: "Etiquetas térmicas para envíos",
      description:
        "Etiquetas autoadhesivas compatibles con impresoras térmicas. Tamaños estándar para etiquetado de envíos y códigos de barras.",
      productHandles: ["etiquetas-termicas-100mm-x-150mm-autoadhesivas-para-envios"],
      hero: {
        headline: "Etiquetas térmicas para envíos",
        subheadline: "Compatibles con impresoras estándar. Etiquetado de envíos en segundos.",
        image: "/images/hero/hero-embalaje.webp",
      },
      comparisonTable: {
        headers: ["Producto", "Tamaño", "Uso"],
        rows: [
          { label: "Etiquetas 100×150 mm", values: ["100 × 150 mm", "Envíos"] },
        ],
      },
      idealFor: [
        { title: "E-commerce", desc: "Etiquetas de envío en pedidos." },
        { title: "Correos", desc: "Cumplimiento de requisitos de carrier." },
        { title: "Logística", desc: "Identificación de bultos." },
      ],
      faq: [
        { id: "ett1", question: "¿Funcionan con mi impresora?", answer: "Las 100×150 mm son compatibles con la mayoría de impresoras térmicas de envíos." },
      ],
      filterFields: [{ key: "industria", label: "Industria", type: "multi" }],
    },
    {
      slug: "adhesivos-industriales",
      title: "Adhesivos industriales",
      description:
        "Adhesivos fuertes para sellado industrial, etiquetado de metal y superficies difíciles. Alta resistencia.",
      productHandles: [
        "etiquetas-autoadhesivas-fragil-50-8mm-x-76-2mm-para-envios",
      ],
      hero: {
        headline: "Adhesivos industriales",
        subheadline: "Alta adherencia en superficies difíciles.",
        image: "/images/hero/hero-embalaje.webp",
      },
      idealFor: [
        { title: "Señalización", desc: "Etiquetas Frágil, Manejar con cuidado." },
        { title: "Metal", desc: "Adhesión en superficies metálicas." },
        { title: "Exterior", desc: "Resistencia a intemperie." },
      ],
      faq: [
        { id: "ai1", question: "¿Hay opciones removibles?", answer: "Sí, para aplicaciones que requieran despegado sin residuo." },
      ],
    },
  ],
  envio: [
    {
      slug: "sobres",
      title: "Sobres y bolsas de envío",
      description:
        "Sobres acolchados y bolsas para envío de documentación y productos livianos. Prácticos y económicos.",
      productHandles: [],
      hero: {
        headline: "Sobres y bolsas de envío",
        subheadline: "Documentación y productos livianos. Prácticos y económicos.",
        image: "/images/hero/hero-logistica.webp",
      },
      idealFor: [
        { title: "Documentación", desc: "Envíos de papeles y sobres planos." },
        { title: "Productos livianos", desc: "Indumentaria, accesorios." },
        { title: "E-commerce pequeño", desc: "Pedidos que no requieren caja." },
      ],
      faq: [
        { id: "se1", question: "¿Qué tamaños tienen?", answer: "Desde sobres C5 hasta bolsas grandes. Consultar disponibilidad." },
      ],
    },
    {
      slug: "kits-logisticos",
      title: "Kits logísticos",
      description:
        "Kits prearmados con cinta, etiquetas y protección. Todo en uno para operaciones de fulfillment. Reduce tiempos de empaque.",
      productHandles: [
        "6-cintas-para-embalar-48mm-x-100-metros",
        "etiquetas-termicas-100mm-x-150mm-autoadhesivas-para-envios",
      ],
      hero: {
        headline: "Kits logísticos",
        subheadline: "Todo en uno. Cinta, etiquetas, protección. Menos tiempos de empaque.",
        image: "/images/hero/hero-logistica.webp",
      },
      idealFor: [
        { title: "Fulfillment", desc: "Embalaje estandarizado." },
        { title: "E-commerce", desc: "Todo lo necesario en un kit." },
        { title: "Startups", desc: "Solución rápida sin compras dispersas." },
      ],
      faq: [
        { id: "kl1", question: "¿Se pueden armar kits a medida?", answer: "Sí, para volúmenes mayores armamos kits según tu operación." },
      ],
      filterFields: [{ key: "volumen", label: "Volumen", type: "single" }],
    },
    {
      slug: "cajas-reforzadas",
      title: "Cajas reforzadas",
      description:
        "Cajas de cartón corrugado simple, doble y triple canal. Para envíos que requieren mayor resistencia y protección.",
      productHandles: [],
      hero: {
        headline: "Cajas reforzadas",
        subheadline: "Corrugado simple, doble y triple canal. Mayor resistencia.",
        image: "/images/hero/hero-logistica.webp",
      },
      idealFor: [
        { title: "Productos pesados", desc: "Electrónica, repuestos." },
        { title: "Exportación", desc: "Tránsito prolongado." },
        { title: "Almacenamiento", desc: "Apilamiento en depósito." },
      ],
      faq: [
        { id: "cr1", question: "¿Ofrecen medidas estándar?", answer: "Sí, tenemos medidas estándar y podemos cotizar a medida." },
      ],
      filterFields: [{ key: "resistencia", label: "Resistencia", type: "single" }],
    },
  ],
};

/** Rutas de categoría que tienen subcategorías */
export const CATEGORIES_WITH_SUBCATS = ["cintas", "proteccion", "sellado", "envio"] as const;

export function getSubcategory(
  categorySlug: string,
  subSlug: string
): SubcategoryMeta | undefined {
  return SUBCATEGORIES[categorySlug]?.find((s) => s.slug === subSlug);
}

export function getSubcategoriesForCategory(categorySlug: string): SubcategoryMeta[] {
  return SUBCATEGORIES[categorySlug] ?? [];
}
