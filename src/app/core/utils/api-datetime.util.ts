const MONTHS_ES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
] as const;

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;
const MIDNIGHT_RE = /^\d{4}-\d{2}-\d{2}[T ]00:00:00(\.0+)?(Z|[+-]00:?00)?$/i;
const HAS_ZONE_RE = /[zZ]$|[+-]\d{2}:?\d{2}$/;

export type ApiDateKind =
  | 'date'
  | 'datetime'
  | 'human'
  | 'short'
  | 'long'
  | 'month-day'
  | 'month-year'
  | 'medium';

/** Fecha de calendario (pago, entrega). No desplazar por UTC. */
export function isApiCalendarDate(value: string): boolean {
  const raw = value.trim();
  return DATE_ONLY_RE.test(raw) || MIDNIGHT_RE.test(raw);
}

/**
 * TypeORM `dateStrings` manda `YYYY-MM-DD HH:mm:ss` sin zona (UTC).
 * Sin la Z el browser lo toma como local y las tardes se ven de noche.
 * `YYYY-MM-DD` y medianoche UTC se tratan como día de calendario.
 */
export function parseApiDateTime(value: string | Date | null | undefined): Date | null {
  if (value == null || value === '') {
    return null;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  const raw = String(value).trim();
  if (!raw) {
    return null;
  }
  if (isApiCalendarDate(raw)) {
    const [year, month, day] = raw.slice(0, 10).split('-').map(Number);
    const local = new Date(year, month - 1, day);
    return Number.isNaN(local.getTime()) ? null : local;
  }
  if (HAS_ZONE_RE.test(raw)) {
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const iso = raw.includes('T') ? raw : raw.replace(' ', 'T');
  const parsed = new Date(`${iso}Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatApiDate(
  value: string | Date | null | undefined,
  kind: ApiDateKind = 'datetime',
): string {
  const date = parseApiDateTime(value);
  if (!date) {
    return '—';
  }
  switch (kind) {
    case 'date':
      return new Intl.DateTimeFormat('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date);
    case 'medium':
      return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    case 'human':
      return `${MONTHS_ES[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    case 'long':
      return date.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    case 'month-day':
      return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'long' });
    case 'month-year':
      return date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
    case 'short':
      return date.toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' });
    case 'datetime':
    default:
      return new Intl.DateTimeFormat('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(date);
  }
}

export function formatApiDateTime(value: string | Date | null | undefined): string {
  return formatApiDate(value, 'datetime');
}
