/**
 * Peso y dimensiones por producto para cotización de envíos.
 * Valores en kg (peso) y cm (alto, ancho, largo).
 * Pueden sobreescribirse desde content/products.json si se agregan los campos.
 */

export type ShippingSpec = {
  /** Peso en kg */
  weightKg: number;
  /** Dimensiones en cm: alto x ancho x largo */
  heightCm: number;
  widthCm: number;
  lengthCm: number;
};

const DEFAULT_SPEC: ShippingSpec = {
  weightKg: 0.5,
  heightCm: 15,
  widthCm: 15,
  lengthCm: 10,
};

/** Especificaciones de envío por handle de producto */
const PRODUCT_SHIPPING: Record<string, ShippingSpec> = {
  // Cintas - rollos compactos
  "ws100-cinta-embalar-transparente-48x100m": { weightKg: 0.6, heightCm: 12, widthCm: 12, lengthCm: 8 },
  "ws101-cinta-embalar-marron-48x100m": { weightKg: 0.6, heightCm: 12, widthCm: 12, lengthCm: 8 },
  "ws102-cinta-embalar-fragil-48x50m": { weightKg: 0.4, heightCm: 10, widthCm: 10, lengthCm: 6 },
  "ws103-cinta-antideslizante-50x18m": { weightKg: 0.3, heightCm: 8, widthCm: 8, lengthCm: 5 },
  "ws104-cinta-papel-24x50m": { weightKg: 0.35, heightCm: 8, widthCm: 8, lengthCm: 5 },
  "ws105-cinta-papel-48x50m": { weightKg: 0.4, heightCm: 10, widthCm: 10, lengthCm: 5 },
  "ws106-cinta-doble-faz-nano-tape-25x5m": { weightKg: 0.2, heightCm: 6, widthCm: 6, lengthCm: 3 },
  // Paños y textiles
  "ws200-panos-microfibra-10pcs": { weightKg: 0.4, heightCm: 20, widthCm: 15, lengthCm: 5 },
  "ws201-repasador-cocina-5-patrones": { weightKg: 0.3, heightCm: 18, widthCm: 15, lengthCm: 4 },
  // Tanzas
  "ws400-tanza-bordeadora-cuadrada-3mm": { weightKg: 0.15, heightCm: 10, widthCm: 10, lengthCm: 2 },
  "ws401-tanza-bordeadora-cuadrada-2-5mm": { weightKg: 0.12, heightCm: 10, widthCm: 10, lengthCm: 2 },
  "ws402-tanza-bordeadora-redonda-2-5mm": { weightKg: 0.12, heightCm: 10, widthCm: 10, lengthCm: 2 },
  "ws403-tanza-bordeadora-redonda-3mm": { weightKg: 0.15, heightCm: 10, widthCm: 10, lengthCm: 2 },
  // Etiquetas
  "ws500-etiquetas-termicas-100x150-330pcs": { weightKg: 0.8, heightCm: 15, widthCm: 12, lengthCm: 8 },
  "ws501-etiquetas-termicas-50x76-500pcs": { weightKg: 0.6, heightCm: 12, widthCm: 10, lengthCm: 6 },
  // Embalaje
  "ws600-caja-10pcs-empacado-vacio-bomba": { weightKg: 2.5, heightCm: 40, widthCm: 30, lengthCm: 25 },
  "ws601-5-bolsas-empacado-vacio-bomba": { weightKg: 0.5, heightCm: 25, widthCm: 20, lengthCm: 5 },
  "ws602-joyeros": { weightKg: 0.2, heightCm: 15, widthCm: 10, lengthCm: 3 },
  "ws603-5-bolsas-50x70cm-bomba": { weightKg: 0.8, heightCm: 35, widthCm: 25, lengthCm: 8 },
  "ws604-bolsas-aire-vino": { weightKg: 0.3, heightCm: 20, widthCm: 15, lengthCm: 5 },
  // Exhibidores
  "ws700-exhibidor-antecojos": { weightKg: 0.6, heightCm: 25, widthCm: 20, lengthCm: 10 },
  "ws701-soporte-starlink": { weightKg: 0.8, heightCm: 30, widthCm: 25, lengthCm: 12 },
  "ws702-soporte": { weightKg: 0.5, heightCm: 22, widthCm: 18, lengthCm: 8 },
};

/**
 * Obtiene la spec de envío para un producto por handle.
 * Si se pasa overrides (desde content/products), se usa esa data cuando exista.
 */
export function getProductShippingSpec(
  handle: string,
  overrides?: Record<string, Partial<ShippingSpec>>
): ShippingSpec {
  const override = overrides?.[handle];
  if (override && (override.weightKg != null || override.heightCm != null)) {
    const base = PRODUCT_SHIPPING[handle] ?? DEFAULT_SPEC;
    return {
      weightKg: override.weightKg ?? base.weightKg,
      heightCm: override.heightCm ?? base.heightCm,
      widthCm: override.widthCm ?? base.widthCm,
      lengthCm: override.lengthCm ?? base.lengthCm,
    };
  }
  return PRODUCT_SHIPPING[handle] ?? DEFAULT_SPEC;
}

export type CartItemForShipping = {
  productHandle: string;
  quantity: number;
};

/**
 * Calcula peso total y dimensiones del paquete (alto x ancho x largo) para el carrito.
 * Usa la caja mínima que engloba el volumen total (suma aproximada de volúmenes).
 * overrides: datos de productos desde content (weightKg, heightCm, widthCm, lengthCm por handle).
 */
export function computeShipmentFromCart(
  items: CartItemForShipping[],
  overrides?: Record<string, Partial<ShippingSpec>>
): {
  totalWeightKg: number;
  /** Formato para Envíopack: "altoxanchoxlargo" o "20x15x10,5x5x5" para múltiples bultos */
  paquetesString: string;
} {
  if (items.length === 0) {
    return {
      totalWeightKg: 0.5,
      paquetesString: "15x15x10",
    };
  }

  let totalWeightKg = 0;
  const volumes: { h: number; w: number; l: number }[] = [];

  for (const item of items) {
    const spec = getProductShippingSpec(item.productHandle, overrides);
    totalWeightKg += spec.weightKg * item.quantity;
    for (let i = 0; i < item.quantity; i++) {
      volumes.push({
        h: spec.heightCm,
        w: spec.widthCm,
        l: spec.lengthCm,
      });
    }
  }

  // Envíopack acepta múltiples paquetes. Para simplificar, sumamos volúmenes
  // y aproximamos a un solo bulto equivalente (raíz cúbica del volumen total).
  // Otra opción: enviar cada producto como bulto separado (puede dar cotizaciones más precisas).
  const totalVolumeCm3 = volumes.reduce(
    (acc, v) => acc + v.h * v.w * v.l,
    0
  );
  const sideCm = Math.max(1, Math.ceil(Math.cbrt(totalVolumeCm3)));
  const h = Math.min(150, Math.max(1, sideCm));
  const w = Math.min(150, Math.max(1, sideCm));
  const l = Math.min(150, Math.max(1, Math.ceil(totalVolumeCm3 / (h * w))));

  const paquetesString = `${h}x${w}x${l}`;

  return {
    totalWeightKg: Math.max(0.1, Math.round(totalWeightKg * 100) / 100),
    paquetesString,
  };
}
