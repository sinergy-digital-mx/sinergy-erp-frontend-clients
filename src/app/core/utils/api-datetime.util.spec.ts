import { describe, expect, it } from 'vitest';
import { formatApiDate, formatApiDateTime, isApiCalendarDate, parseApiDateTime } from './api-datetime.util';

describe('parseApiDateTime', () => {
  it('trata el datetime de MySQL sin zona como UTC', () => {
    const date = parseApiDateTime('2026-09-07 23:46:00');
    expect(date?.toISOString()).toBe('2026-09-07T23:46:00.000Z');
  });

  it('no vuelve a desplazar un ISO con Z', () => {
    const date = parseApiDateTime('2026-09-07T22:58:00.000Z');
    expect(date?.toISOString()).toBe('2026-09-07T22:58:00.000Z');
  });

  it('no corre el día en fechas de calendario', () => {
    expect(isApiCalendarDate('2026-09-07')).toBe(true);
    expect(isApiCalendarDate('2024-01-15T00:00:00Z')).toBe(true);
    const date = parseApiDateTime('2024-01-15T00:00:00Z');
    expect(date?.getFullYear()).toBe(2024);
    expect(date?.getMonth()).toBe(0);
    expect(date?.getDate()).toBe(15);
    expect(formatApiDate('2024-01-15T00:00:00Z', 'medium')).toContain('2024');
    expect(formatApiDate('2026-01-01T00:00:00Z', 'month-year')).toMatch(/enero/i);
    expect(formatApiDate('2026-01-01T00:00:00Z', 'month-year')).toContain('2026');
  });
});

describe('formatApiDateTime', () => {
  it('usa hora de 12 horas, no militar', () => {
    const formatted = formatApiDateTime(new Date(2026, 8, 7, 17, 3));
    expect(formatted).not.toMatch(/17:03/);
    expect(formatted).toMatch(/5:03/i);
    expect(formatted.toLowerCase()).toMatch(/p\.?\s*m/);
  });
});
