import { describe, expect, it } from 'vitest';
import { buildVentasPosOrderPayload } from './pos-order.util';

const cart = {
  items: [
    {
      product_id: 'p1',
      product_uom_id: 'u1',
      uom_id: 'u1',
      quantity: 2,
      unit_price: 10,
      iva_percentage: 16,
      ieps_percentage: 0,
    },
  ],
  global_discount_id: null,
};

const ctx = {
  warehouseId: 'wh-1',
  fiscalConfigurationId: 'fc-1',
  sellerUserId: 'seller-1',
  terminalLabel: 'ventas1',
};

describe('buildVentasPosOrderPayload', () => {
  it('omite customer_id cuando no hay preselección (mostrador)', () => {
    const payload = buildVentasPosOrderPayload(cart as any, ctx);
    expect(payload.customer_id).toBeUndefined();
    expect(payload.sales_order_type).toBe('POS');
  });

  it('incluye customer_id cuando ventas preselecciona cliente', () => {
    const payload = buildVentasPosOrderPayload(cart as any, {
      ...ctx,
      customerId: 42,
    });
    expect(payload.customer_id).toBe(42);
  });

  it('omite customer_id vacío', () => {
    const payload = buildVentasPosOrderPayload(cart as any, {
      ...ctx,
      customerId: '',
    });
    expect(payload.customer_id).toBeUndefined();
  });
});
