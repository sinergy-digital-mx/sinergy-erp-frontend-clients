import { describe, expect, it } from 'vitest';
import {
  applyMixedRemainderToLast,
  defaultCollectForm,
  fillMixedMethodWithRemainder,
  mixedRemainderMxn,
  mixedRemainderTarget,
  validateCollectForm,
} from './pos-collect.util';

describe('pago mixto — resto automático', () => {
  it('al capturar efectivo asigna la diferencia al último método', () => {
    const total = 12904.99;
    let form = defaultCollectForm(total);
    form.paymentMethod = 'mixed';
    form.mixedUsesCash = true;
    form.mixedUsesCard = true;
    form.mixedCashMxn = 12000;

    form = applyMixedRemainderToLast(form, total, 'cash');

    expect(form.mixedCardMxn).toBe(904.99);
    expect(mixedRemainderMxn(form, total)).toBe(0);
    expect(mixedRemainderTarget(form)).toBe('card');
  });

  it('si el cajero edita el último método, no pisa ese monto', () => {
    const total = 929.03;
    let form = defaultCollectForm(total);
    form.paymentMethod = 'mixed';
    form.mixedUsesCash = true;
    form.mixedUsesCheck = true;
    form.mixedCashMxn = 500;
    form.mixedCheckMxn = 200;

    form = applyMixedRemainderToLast(form, total, 'check');

    expect(form.mixedCheckMxn).toBe(200);
    expect(form.mixedCashMxn).toBe(500);
  });

  it('Aplicar resto manda la diferencia al método elegido', () => {
    const total = 1000;
    let form = defaultCollectForm(total);
    form.paymentMethod = 'mixed';
    form.mixedUsesCash = true;
    form.mixedUsesTransfer = true;
    form.mixedUsesCard = true;
    form.mixedCashMxn = 400;
    form.mixedTransferMxn = 150;
    form.mixedCardMxn = 0;

    form = fillMixedMethodWithRemainder(form, total, 'card');

    expect(form.mixedCardMxn).toBe(450);
  });

  it('exige número de cheque en mixto', () => {
    const total = 200;
    const form = defaultCollectForm(total);
    form.paymentMethod = 'mixed';
    form.mixedUsesCash = true;
    form.mixedUsesCheck = true;
    form.mixedCashMxn = 80;
    form.mixedReceivedMxn = 80;
    form.mixedCheckMxn = 120;

    expect(validateCollectForm(form, total)).toBe('Ingresa el número de cheque');

    form.mixedCheckRef = 'CH-1';
    expect(validateCollectForm(form, total)).toBeNull();
  });
});
