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
    expect(result.invoice_mxn).toBe(417202.51);
    expect(result.operating_extras_mxn).toBe(33295.01);
  });

  it('suma al total de factura solo el gasto marcado', () => {
    const result = previewPurchaseOrderRealCost({
      payment_currency: 'USD',
      customs_exchange_rate: 16.9593,
      extras: [
        { amount: 10000, currency: 'MXN', include_in_invoice: true },
        { amount: 23295.01, currency: 'MXN' },
      ],
      lines: [{ id: 'aduana', quantity: 1, vendor_unit_cost: 24600.22, igi_percentage: 0 }],
    });

    expect(result.contracted_mxn).toBe(417202.51);
    expect(result.invoice_mxn).toBe(427202.51);
    expect(result.invoice_usd).toBe(25189.87);
    expect(result.operating_extras_mxn).toBe(23295.01);
    expect(result.operating_extras_usd).toBe(1373.58);
    expect(result.total_mxn).toBe(450497.52);
  });

  it('suma IGI% y GTOS% sobre el precio e incluye el IGI en el total (ODC-000048)', () => {
    const result = previewPurchaseOrderRealCost({
      payment_currency: 'USD',
      customs_exchange_rate: 18.667,
      extras: [
        { amount: 84001.5, currency: 'MXN', include_in_invoice: true },
        { amount: 54779.54, currency: 'MXN' },
      ],
      lines: [{ id: 'triplay', quantity: 1130, vendor_unit_cost: 17.15, igi_percentage: 5 }],
    });

    expect(result.increment_percentage).toBeCloseTo(38.36, 2);
    // 17.15 × (1 + 0.05 + 0.3836); antes se multiplicaba y daba 24.9157
    expect(result.lines[0].real_unit_cost_usd).toBeCloseTo(24.5868, 3);
    expect(result.igi_usd).toBe(968.98);
    expect(result.total_usd).toBeCloseTo(26814.07 + 968.98, 1);
  });
});
