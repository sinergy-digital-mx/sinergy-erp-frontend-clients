import { BUSINESS_TIME_ZONE, formatBusinessDateTime, parseApiDateTime } from '../../../core/utils/api-datetime.util';
import { PurchaseOrderMovement } from '../models/purchase-order-movement.model';

const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
] as const;

export interface MovementClock {
  dayKey: string;
  dayLabel: string;
  timeLabel: string;
}

export interface MovementDayGroup {
  key: string;
  label: string;
  items: PurchaseOrderMovement[];
}

export function movementClock(
  value: string | Date | null | undefined,
  now: Date = new Date(),
): MovementClock | null {
  const instant = parseApiDateTime(value);
  const clock = formatBusinessDateTime(value);
  if (!instant || !clock) {
    return null;
  }
  const day = businessYmd(instant);
  const today = businessYmd(now);
  const diff = calendarDayNumber(today) - calendarDayNumber(day);
  let dayLabel = `${day.d} de ${MONTHS[day.m - 1] ?? ''}`;
  if (diff === 0) {
    dayLabel = 'Hoy';
  } else if (diff === 1) {
    dayLabel = 'Ayer';
  } else if (day.y !== today.y) {
    dayLabel = `${dayLabel} de ${day.y}`;
  }
  return {
    dayKey: `${day.y}-${String(day.m).padStart(2, '0')}-${String(day.d).padStart(2, '0')}`,
    dayLabel,
    timeLabel: clock.time,
  };
}

export function groupMovementsByDay(
  items: PurchaseOrderMovement[],
  now: Date = new Date(),
): MovementDayGroup[] {
  const groups: MovementDayGroup[] = [];
  for (const item of items) {
    const clock = movementClock(item.occurred_at, now);
    const key = clock?.dayKey ?? 'unknown';
    const label = clock?.dayLabel ?? 'Sin fecha';
    const current = groups[groups.length - 1];
    if (current?.key === key) {
      current.items.push(item);
    } else {
      groups.push({ key, label, items: [item] });
    }
  }
  return groups;
}

/** Texto del movimiento, sin códigos internos ni ceros de más. */
export function humanizeMovementText(value: string | null | undefined): string {
  const raw = value?.trim() ?? '';
  if (!raw) {
    return '—';
  }
  let text = raw
    .replace(/\s*\((?:DOCUMENTO_[^)]+|[^)]*_ODC-[^)]*)\.pdf\)/gi, '')
    .replace(/\bDOCUMENTO_ORIGINAL\b/g, 'PDF original')
    .replace(/\bDOCUMENTO_RECEPCION\b/g, 'PDF de recepción')
    .replace(/RECEPCIÓN/g, 'recepción')
    .replace(/(\d+)\.(\d+)/g, (_match, whole: string, fraction: string) => {
      const trimmed = fraction.replace(/0+$/, '');
      return trimmed ? `${whole}.${trimmed}` : whole;
    })
    .replace(/(\d+)\s+lote\(s\)/g, (_match, count: string) =>
      Number(count) === 1 ? '1 lote' : `${count} lotes`,
    )
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+\./g, '.')
    .trim();

  text = text.replace(/^Se generó PDF original\b/, 'Se generó el PDF original');
  text = text.replace(/^Se generó recepción\b/, 'Se generó el PDF de recepción');
  return text;
}

export function actorInitials(name: string | null | undefined): string {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '';
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

function businessYmd(instant: Date): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(instant);
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? '0');
  return { y: pick('year'), m: pick('month'), d: pick('day') };
}

function calendarDayNumber(day: { y: number; m: number; d: number }): number {
  return Math.floor(Date.UTC(day.y, day.m - 1, day.d) / 86_400_000);
}
