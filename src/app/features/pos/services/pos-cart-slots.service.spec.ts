import { describe, expect, it } from 'vitest';
import {
  acceptSlotReprice,
  PosCartSlotState,
  PosCartSlotsService,
} from './pos-cart-slots.service';

function slot(productId: string): PosCartSlotState {
  return {
    customerId: null,
    customerName: 'Público en General',
    walkInName: '',
    walkInRfc: '',
    globalDiscountId: null,
    lines: [
      {
        productId,
        productUomId: 'uom-1',
        quantity: 2,
        priceListId: null,
        productDiscountId: null,
        priceDiscountPercentage: 0,
        productName: productId,
      },
    ],
  };
}

describe('carritos C1 C2 C3', () => {
  it('guardar un carrito no cambia el activo ni pisa a los otros', () => {
    const service = new PosCartSlotsService();
    const key = 'user:branch:fiscal';
    service.bind(key);
    service.writeSlot(key, 1, slot('producto-a'));
    service.setActive(key, 1);
    service.writeSlot(key, 2, slot('producto-b'));

    const snap = service.snapshot();
    expect(snap.active).toBe(1);
    expect(snap.slots[1].lines[0].productId).toBe('producto-a');
    expect(snap.slots[2].lines[0].productId).toBe('producto-b');
    expect(snap.slots[3].lines).toEqual([]);
  });

  it('un reprecio viejo no se aplica si ya cambiaste de carrito', () => {
    const started = { token: 1, slot: 1 as const };
    expect(
      acceptSlotReprice(started, { token: 2, slot: 2, editing: false }),
    ).toBe(false);
    expect(
      acceptSlotReprice({ token: 2, slot: 2 }, { token: 2, slot: 2, editing: false }),
    ).toBe(true);
    expect(
      acceptSlotReprice({ token: 4, slot: 1 }, { token: 4, slot: 2, editing: false }),
    ).toBe(false);
  });

  it('cambiar rápido deja cada carrito con lo suyo', () => {
    const service = new PosCartSlotsService();
    const key = 'user:branch:fiscal';
    service.bind(key);
    service.writeSlot(key, 1, slot('producto-a'));
    service.writeSlot(key, 2, slot('producto-b'));
    service.setActive(key, 1);

    const repriceC1 = { token: 1, slot: 1 as const };
    service.setActive(key, 2);
    const repriceC2 = { token: 2, slot: 2 as const };
    service.setActive(key, 1);
    const current = { token: 3, slot: 1 as const, editing: false };

    expect(acceptSlotReprice(repriceC1, current)).toBe(false);
    expect(acceptSlotReprice(repriceC2, current)).toBe(false);
    expect(service.snapshot().slots[1].lines[0].productId).toBe('producto-a');
    expect(service.snapshot().slots[2].lines[0].productId).toBe('producto-b');
    expect(service.snapshot().active).toBe(1);
  });
});
