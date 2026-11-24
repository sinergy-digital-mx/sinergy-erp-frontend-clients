import { describe, expect, it } from 'vitest';
import {
  buildVentasPosOrderPayload,
  mapInProgressLineToCartItem,
  posSaleObservation,
  resolvePosSaleNotes,
} from './pos-order.util';

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

  it('incluye nombre y RFC de mostrador si no hay cliente registrado', () => {
    const payload = buildVentasPosOrderPayload(cart as any, {
      ...ctx,
      walkInName: ' Juan Pérez ',
      walkInRfc: 'XAXX010101000',
    });
    expect(payload.walk_in_name).toBe('Juan Pérez');
    expect(payload.walk_in_rfc).toBe('XAXX010101000');
  });

  it('omite nombre y RFC de mostrador si hay cliente registrado', () => {
    const payload = buildVentasPosOrderPayload(cart as any, {
      ...ctx,
      customerId: 42,
      walkInName: 'Juan Pérez',
      walkInRfc: 'XAXX010101000',
    });
    expect(payload.walk_in_name).toBeUndefined();
    expect(payload.walk_in_rfc).toBeUndefined();
  });

  it('guarda las observaciones del vendedor en notes', () => {
    const payload = buildVentasPosOrderPayload(cart as any, {
      ...ctx,
      notes: '  Cortar a 2.40 m  ',
    });
    expect(payload.notes).toBe('Cortar a 2.40 m');
  });

  it('guarda el descuento de precio en la línea y no como descuento de producto', () => {
    const payload = buildVentasPosOrderPayload({
      ...cart,
      items: [{ ...cart.items[0], price_discount_percentage: 5 }],
    } as any, ctx);
    expect(payload.line_items[0].discount_percentage).toBe(5);
    expect(payload.line_items[0].product_discount_id).toBeUndefined();
    expect(payload.line_items[0].unit_price).toBe(10);
  });

  it('si hay descuento de producto no manda el porcentaje de precio', () => {
    const payload = buildVentasPosOrderPayload({
      ...cart,
      items: [{
        ...cart.items[0],
        price_discount_percentage: 5,
        product_discount_id: 'disc-1',
      }],
    } as any, ctx);
    expect(payload.line_items[0].product_discount_id).toBe('disc-1');
    expect(payload.line_items[0].discount_percentage).toBeUndefined();
  });

  it('restaura el porcentaje al reabrir el ticket', () => {
    const item = mapInProgressLineToCartItem({
      product_id: 'p1',
      product_uom_id: 'u1',
      quantity: 1,
      unit_price: 100,
      discount_percentage: 3,
    });
    expect(item.price_discount_percentage).toBe(3);
    expect(item.unit_price).toBe(100);
  });

  it('no trata el descuento de producto como descuento de precio', () => {
    const item = mapInProgressLineToCartItem({
      product_id: 'p1',
      product_uom_id: 'u1',
      quantity: 1,
      unit_price: 100,
      discount_percentage: 10,
      product_discount_id: 'disc-1',
    });
    expect(item.price_discount_percentage).toBe(0);
    expect(item.product_discount_id).toBe('disc-1');
  });

  it('usa la nota de terminal si no hay observaciones', () => {
    expect(resolvePosSaleNotes('ventas1', '   ')).toBe('POS Ventas - ventas1');
    expect(posSaleObservation('POS Ventas - ventas1')).toBe('');
    expect(posSaleObservation('Entregar en andén')).toBe('Entregar en andén');
  });
});
