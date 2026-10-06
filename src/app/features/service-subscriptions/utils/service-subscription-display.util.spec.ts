import { describe, expect, it } from 'vitest';
import {
  countMonths,
  defaultSubscriptionRange,
  listMonthLabels,
  monthRangeIssue,
  withTax,
} from './service-subscription-display.util';

describe('service-subscription-display', () => {
  it('arma un plazo de 12 meses a partir del mes actual', () => {
    const range = defaultSubscriptionRange(new Date(2026, 9, 6));
    expect(range).toEqual({ start: '2026-10', end: '2027-09' });
    expect(countMonths(range.start, range.end)).toBe(12);
    expect(monthRangeIssue(range.start, range.end)).toBeNull();
  });

  it('rechaza un mes final anterior y un plazo de más de 12 meses', () => {
    expect(monthRangeIssue('2026-10', '2026-09')).toBe('El mes final no puede ser anterior al inicial');
    expect(monthRangeIssue('2026-01', '2027-01')).toBe('La suscripción cubre como máximo 12 meses');
  });

  it('lista los meses del plazo', () => {
    expect(listMonthLabels('2026-11', '2027-01')).toEqual(['nov 2026', 'dic 2026', 'ene 2027']);
  });

  it('suma el IVA al monto mensual', () => {
    expect(withTax(1000, 16)).toBeCloseTo(1160);
  });
});
