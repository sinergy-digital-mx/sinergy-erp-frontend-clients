/** Precio/costo unitario y totales comerciales: hasta 4 decimales. No recorta a 1 ni a 2. */
export function parseUnitAmount(value: number | string | null | undefined): number {
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatUnitAmount(value: number | string | null | undefined): string {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(parseUnitAmount(value));
}

export function formatUnitCurrency(
  value: number | string | null | undefined,
  currency: 'MXN' | 'USD' = 'MXN',
): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(parseUnitAmount(value));
}
