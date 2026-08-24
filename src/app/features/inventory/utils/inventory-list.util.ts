export function inventoryLocationLabel(value?: string | null): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : '—';
}

export function formatInventoryDate(dateString: string): string {
  if (!dateString) return '-';
  const d = new Date(dateString);
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
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
