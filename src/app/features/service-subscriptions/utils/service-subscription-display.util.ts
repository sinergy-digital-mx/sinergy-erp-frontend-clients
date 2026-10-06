import {
  CFDI_FORMA_PAGO_OPTIONS,
  CFDI_REGIMEN_RECEPTOR_OPTIONS,
  CFDI_USO_OPTIONS,
} from '../../sales-orders/models/sales-order-electronic-invoice.model';

export { CFDI_FORMA_PAGO_OPTIONS, CFDI_REGIMEN_RECEPTOR_OPTIONS, CFDI_USO_OPTIONS };

export const PAYMENT_METHOD_OPTIONS = [
  { id: 'PUE', name: 'PUE - Pago en una sola exhibición' },
  { id: 'PPD', name: 'PPD - Pago en parcialidades o diferido' },
];

export const SUBSCRIPTION_MONTH_OPTIONS = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' },
];

const SHORT_MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const STATUS_LABELS: Record<string, string> = {
  active: 'Activa',
  completed: 'Terminada',
  cancelled: 'Cancelada',
  pending: 'Pendiente',
  linked: 'Con orden',
  invoiced: 'Facturado',
  skipped: 'Omitido',
};

export const BILLING_DAYS = Array.from({ length: 28 }, (_, index) => index + 1);

export function subscriptionStatusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

export function moneyMx(value: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(value) || 0);
}

export function withTax(amount: number, ivaPercentage: number): number {
  return (Number(amount) || 0) * (1 + (Number(ivaPercentage) || 0) / 100);
}

export function coveragePercent(covered: number, total: number): number {
  if (!total) return 0;
  return Math.max(0, Math.min(100, Math.round((covered / total) * 100)));
}

export function catalogLabel(options: ReadonlyArray<{ id: string; name: string }>, id: string): string {
  return options.find((item) => item.id === id)?.name || id || '—';
}

export function formatShortDate(value: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function subscriptionYearOptions(now = new Date()): string[] {
  const year = now.getFullYear();
  return [year - 1, year, year + 1, year + 2].map(String);
}

export function defaultSubscriptionRange(now = new Date()): { start: string; end: string } {
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 11, 1);
  return { start: formatYearMonth(start), end: formatYearMonth(end) };
}

export function yearOf(value: string): string {
  return /^(\d{4})-/.exec(value || '')?.[1] ?? '';
}

export function monthOf(value: string): string {
  return /^\d{4}-(\d{2})/.exec(value || '')?.[1] ?? '';
}

export function joinYearMonth(year: string, month: string): string {
  if (!/^\d{4}$/.test(year) || !/^(0[1-9]|1[0-2])$/.test(month)) return '';
  return `${year}-${month}`;
}

export function countMonths(start: string, end: string): number | null {
  const from = monthIndex(start);
  const to = monthIndex(end);
  if (from === null || to === null) return null;
  return to - from + 1;
}

export function monthRangeIssue(start: string, end: string): string | null {
  const count = countMonths(start, end);
  if (count === null) return 'Elige el mes inicial y el final';
  if (count < 1) return 'El mes final no puede ser anterior al inicial';
  if (count > 12) return 'La suscripción cubre como máximo 12 meses';
  return null;
}

export function listMonthLabels(start: string, end: string): string[] {
  const count = countMonths(start, end);
  const match = /^(\d{4})-(\d{2})/.exec(start || '');
  if (count === null || count < 1 || count > 12 || !match) return [];
  let year = Number(match[1]);
  let month = Number(match[2]);
  const labels: string[] = [];
  for (let index = 0; index < count; index += 1) {
    labels.push(`${SHORT_MONTHS[month - 1]} ${year}`);
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return labels;
}

function formatYearMonth(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function monthIndex(value: string): number | null {
  const match = /^(\d{4})-(\d{2})/.exec(value || '');
  if (!match) return null;
  const month = Number(match[2]);
  if (month < 1 || month > 12) return null;
  return Number(match[1]) * 12 + month - 1;
}
