/** TypeORM manda `YYYY-MM-DD HH:mm:ss` sin zona (UTC). Sin la Z el browser lo toma como local. */
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
  if (/[zZ]$/.test(raw) || /[+-]\d{2}:?\d{2}$/.test(raw)) {
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const iso = raw.includes('T') ? raw : raw.replace(' ', 'T');
  const parsed = new Date(`${iso}Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatApiDateTime(value: string | Date | null | undefined): string {
  const date = parseApiDateTime(value);
  if (!date) {
    return '—';
  }
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}
