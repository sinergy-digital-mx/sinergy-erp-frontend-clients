import { describe, expect, it } from 'vitest';
import { previewPurchaseOrderRealCost } from './purchase-order-real-cost-preview.util';

describe('previewPurchaseOrderRealCost', () => {
  it('repite la hoja Encino: valor aduana, gastos y total final', () => {
    const result = previewPurchaseOrderRealCost({
      payment_currency: 'USD',
      customs_exchange_rate: 16.9593,
      extras: [{ amount: 23295.01, currency: 'MXN' }],
      lines: [{ id: 'aduana', quantity: 1, vendor_unit_cost: 24600.22, igi_percentage: 0 }],
    });

    expect(result.merchandise_mxn).toBe(417202.51);
    expect(result.extras_mxn).toBe(23295.01);
    expect(result.extras_usd).toBe(1373.58);
    expect(result.total_usd).toBe(25973.8);
    expect(result.total_mxn).toBe(440497.52);
  });

  it('suma el gasto extra al total final', () => {
    const result = previewPurchaseOrderRealCost({
      payment_currency: 'USD',
      customs_exchange_rate: 16.9593,
      extras: [
        { amount: 23295.01, currency: 'MXN' },
        { amount: 10000, currency: 'MXN' },
      ],
      lines: [{ id: 'aduana', quantity: 1, vendor_unit_cost: 24600.22, igi_percentage: 0 }],
    });

    expect(result.extras_mxn).toBe(33295.01);
    expect(result.extras_usd).toBe(1963.23);
    expect(result.total_usd).toBe(26563.45);
    expect(result.total_mxn).toBe(450497.52);
  });
});
