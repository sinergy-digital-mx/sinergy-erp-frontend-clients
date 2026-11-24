import { describe, expect, it } from 'vitest';
import { convertToParamMap } from '@angular/router';
import {
  accountingPeriodFromQuery,
  accountingTabFromQuery,
  customerTypeFromQuery,
  diffQuery,
  monthFromQuery,
  pageFromQuery,
  paymentMethodFromQuery,
} from './accounting-view-query.util';

describe('vista de cobranza en la URL', () => {
  it('reconoce la pestaña y el periodo', () => {
    expect(accountingTabFromQuery('pos-collections')).toBe('pos-collections');
    expect(accountingTabFromQuery('otra')).toBeNull();
    expect(accountingPeriodFromQuery('range')).toBe('range');
    expect(accountingPeriodFromQuery('year')).toBeNull();
  });

  it('restaura filtros de cobranza POS y la página', () => {
    expect(customerTypeFromQuery('invoiced')).toBe('invoiced');
    expect(customerTypeFromQuery('x')).toBe('all');
    expect(paymentMethodFromQuery('card')).toBe('card');
    expect(paymentMethodFromQuery('mixto')).toBeNull();
    expect(pageFromQuery('3')).toBe(3);
    expect(pageFromQuery('1')).toBe(1);
    expect(monthFromQuery('2026-11')).toBe('2026-11');
    expect(monthFromQuery('noviembre')).toBeNull();
  });

  it('solo manda a la URL lo que cambió', () => {
    const current = convertToParamMap({ tab: 'pos-collections', pq: 'OSV' });
    expect(diffQuery(current, { tab: 'pos-collections', pq: 'OSV-1', ctype: null })).toEqual({
      pq: 'OSV-1',
    });
    expect(diffQuery(current, { tab: 'pos-collections' })).toBeNull();
  });
});
