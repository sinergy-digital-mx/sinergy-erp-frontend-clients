/** Tamaño de pieza (8 Foot). Independiente de la UOM de inventario / OC. */

export interface MeasureLabelSource {
  measure_label?: string | null;
  measure?: string | number | null;
  measure_uom_name?: string | null;
}

export interface MeasureTotal {
  measure?: string | number | null;
  measure_uom_id?: string | null;
  measure_uom_name?: string | null;
  measure_label?: string | null;
  total_available_quantity?: string | number | null;
  total_initial_quantity?: string | number | null;
  total_batches?: number;
}

/** Solo `measure_label`. Nunca concatenar tamaño + UOM del producto. */
export function inventoryMeasureLabel(
  source: MeasureLabelSource | null | undefined,
  empty = '—'
): string {
  const label = source?.measure_label?.trim();
  return label || empty;
}

export function measureTotalLabel(total: MeasureTotal): string {
  const label = total.measure_label?.trim();
  if (label) {
    return label;
  }
  return 'Sin medida';
}

export function hasMeasureTotals(totals: MeasureTotal[] | null | undefined): boolean {
  return Array.isArray(totals) && totals.length > 0;
}

export function formatMeasureTotalsLine(
  totals: MeasureTotal[] | null | undefined,
  formatQty: (quantity: string | number | undefined) => string
): string {
  if (!hasMeasureTotals(totals)) {
    return '';
  }
  return totals!
    .map((total) => `${measureTotalLabel(total)} → ${formatQty(total.total_available_quantity ?? undefined)}`)
    .join(' · ');
}
