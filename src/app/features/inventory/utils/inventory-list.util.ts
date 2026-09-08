import { formatApiDate } from '../../../core/utils/api-datetime.util';

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
