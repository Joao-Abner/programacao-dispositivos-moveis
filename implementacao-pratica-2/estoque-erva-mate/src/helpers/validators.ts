export function isValidPrice(price: number): boolean {
  return price > 0 && !isNaN(price);
}

export function isValidStock(qty: number): boolean {
  return Number.isInteger(qty) && qty >= 0;
}

export function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}
