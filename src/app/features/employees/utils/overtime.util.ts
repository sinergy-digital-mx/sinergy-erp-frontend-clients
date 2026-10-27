/** Horas entre dos horas HH:mm. Si el término es menor, el turno cruza la medianoche. */
export function overtimeHours(
  start?: string | null,
  end?: string | null,
): number | null {
  const startMinutes = clockToMinutes(start);
  const endMinutes = clockToMinutes(end);
  if (startMinutes == null || endMinutes == null || startMinutes === endMinutes) {
    return null;
  }
  let diff = endMinutes - startMinutes;
  if (diff < 0) {
    diff += 24 * 60;
  }
  return Math.round((diff / 60) * 100) / 100;
}

export function formatOvertimeHours(value?: number | null): string {
  if (value == null || Number.isNaN(Number(value))) {
    return '—';
  }
  const formatted = new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value));
  return `${formatted} h`;
}

export function formatOvertimeMoney(value?: number | null): string {
  if (value == null || Number.isNaN(Number(value))) {
    return '—';
  }
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
}

export function formatOvertimeDate(iso?: string | null): string {
  if (!iso) {
    return '—';
  }
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  if (!year || !month || !day) {
    return iso;
  }
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

export function formatOvertimeWhen(value?: string | null): string {
  if (!value) {
    return '—';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  }).format(date);
}

export function todayInMexico(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function clockToMinutes(value?: string | null): number | null {
  if (!value) {
    return null;
  }
  const match = /^([01]\d|2[0-3]):([0-5]\d)/.exec(value.trim());
  if (!match) {
    return null;
  }
  return Number(match[1]) * 60 + Number(match[2]);
}
