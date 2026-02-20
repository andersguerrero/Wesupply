export type ShippingQuoteOption = {
  carrierId: string;
  carrierName: string;
  price: number;
  currency: string;
  estimatedDays?: number;
  service?: string;
  /** "domicilio" | "sucursal" */
  modalidad?: string;
};
