import { describe, expect, it } from 'vitest';
import {
  getHoaOverdueAmount,
  getHoaPaymentMonthLabel,
  sortHoaPaymentsByDueDate,
  summarizeHoaCoverage,
} from './hoa-payment.model';
import type { HoaPayment } from './hoa-payment.model';

function payment(partial: Partial<HoaPayment>): HoaPayment {
  return {
    id: '1',
    tenant_id: 't',
    contract_id: 'c',
    payment_number: 1,
    amount: 100,
    amount_paid: 0,
    amount_pending: 100,
    due_date: '2026-01-05',
    paid_date: null,
    first_partial_payment_date: null,
    payment_method: null,
    status: 'pendiente',
    is_overdue: false,
    notes: null,
    created_at: '',
    updated_at: '',
    ...partial,
  };
}

describe('sortHoaPaymentsByDueDate', () => {
  it('ordena por vencimiento, no por número de pago', () => {
    const sorted = sortHoaPaymentsByDueDate([
      payment({ payment_number: 1, due_date: '2026-01-05' }),
      payment({ payment_number: 2, due_date: '2025-03-05' }),
      payment({ payment_number: 3, due_date: '2026-02-05' }),
    ]);

    expect(sorted.map((item) => item.due_date)).toEqual([
      '2025-03-05',
      '2026-01-05',
      '2026-02-05',
    ]);
  });
});

describe('getHoaPaymentMonthLabel', () => {
  it('no corre el mes en medianoche UTC', () => {
    expect(getHoaPaymentMonthLabel(payment({ due_date: '2026-01-01T00:00:00.000Z' }))).toMatch(
      /enero/i,
    );
    expect(getHoaPaymentMonthLabel(payment({ due_date: '2026-01-01T00:00:00.000Z' }))).toContain(
      '2026',
    );
  });
});

describe('getHoaOverdueAmount', () => {
  it('suma el pendiente de cuotas vencidas', () => {
    const total = getHoaOverdueAmount([
      payment({
        due_date: '2026-01-05',
        status: 'pendiente',
        is_overdue: true,
        amount_pending: 150,
      }),
      payment({
        due_date: '2026-02-05',
        status: 'pagado',
        is_overdue: false,
        amount_pending: 0,
      }),
    ]);
    expect(total).toBe(150);
  });
});

describe('summarizeHoaCoverage', () => {
  it('describe el rango cronológico', () => {
    expect(
      summarizeHoaCoverage([
        payment({ due_date: '2026-01-05' }),
        payment({ due_date: '2025-12-05' }),
      ]),
    ).toMatch(/diciembre 2025/i);
  });
});
