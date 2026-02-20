export function formatMoney(amount: number, currencyCode: string = "ARS"): string {
  const symbol = currencyCode === "EUR" ? "€" : "$";
  return `${amount.toLocaleString("es-AR")} ${symbol}`;
}
