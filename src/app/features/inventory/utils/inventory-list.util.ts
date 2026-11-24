import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { formatApiDate } from '../../../core/utils/api-datetime.util';

/** Razón social en la URL cuando el usuario eligió todas. */
export const INVENTORY_ALL_FISCAL = 'all';

export function inventoryFiscalFromQuery(raw: string | null): string | 'all' | null {
  if (raw == null) return null;
  const value = raw.trim();
  if (!value || value === INVENTORY_ALL_FISCAL) return 'all';
  return value;
}

export function inventoryPageFromQuery(raw: string | null): number {
  const page = Number(raw);
  return Number.isInteger(page) && page > 1 ? page : 1;
}

export function replaceInventoryQuery(
  router: Router,
  route: ActivatedRoute,
  patch: Record<string, string | number | null | undefined>,
): void {
  const current: ParamMap = route.snapshot.queryParamMap;
  const queryParams: Record<string, string | null> = {};
  let changed = false;
  for (const [key, raw] of Object.entries(patch)) {
    const next = raw == null || String(raw).trim() === '' ? null : String(raw);
    if ((current.get(key) ?? null) !== next) {
      changed = true;
      queryParams[key] = next;
    }
  }
  if (!changed) return;
  void router.navigate([], {
    relativeTo: route,
    queryParams,
    queryParamsHandling: 'merge',
    replaceUrl: true,
  });
}

export function inventoryLocationLabel(value?: string | null): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : '—';
}

export function formatInventoryDate(dateString: string): string {
  if (!dateString) return '-';
  const formatted = formatApiDate(dateString, 'human');
  if (formatted === '—') return '-';
  const parts = formatted.split(' ');
  if (parts.length < 3) return formatted;
  return `${parts[0]} ${parts[1]}, ${parts[2]}`;
}

/** Lotes con existencia. Existencia 0 no se muestra en Totalizado. */
export function stockedSummaryBatches<T extends { available_quantity?: string | number | null }>(
  batches: T[] | null | undefined,
): T[] {
  return (batches ?? [])
    .filter((batch) => {
      const qty = Number(batch.available_quantity);
      return Number.isFinite(qty) && qty > 0;
    })
    .sort((a, b) => Number(b.available_quantity) - Number(a.available_quantity));
}

export function formatInventoryNumber(value: string | number | undefined): string {
  if (value === undefined || value === null) return '0';
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '0';

  const hasDecimals = numValue % 1 !== 0;
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 0,
    maximumFractionDigits: hasDecimals ? 3 : 0,
  }).format(numValue);
}
