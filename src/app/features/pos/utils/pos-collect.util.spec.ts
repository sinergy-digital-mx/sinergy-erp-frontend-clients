import { describe, expect, it } from 'vitest';
import {
  addMixedCardPayment,
  applyMixedRemainderToLast,
  buildCollectPayload,
  collectChangeMxn,
  collectChangeUsd,
  collectReceivedTotalMxn,
  defaultCollectForm,
  enableMixedCard,
  fillMixedMethodWithRemainder,
  mixedRemainderMxn,
  mixedRemainderTarget,
  mixedSelectedCount,
  validateCollectForm,
} from './pos-collect.util';

describe('pago mixto — resto automático', () => {
  it('al capturar efectivo asigna la diferencia al último método', () => {
    const total = 12904.99;
    let form = defaultCollectForm(total);
    form.paymentMethod = 'mixed';
    form.mixedUsesCash = true;
    form = enableMixedCard(form);
    form.mixedCardPayments = [{ amountMxn: 0, reference: '' }];
    form.mixedCashMxn = 12000;

    form = applyMixedRemainderToLast(form, total, 'cash');

    expect(form.mixedCardPayments[0].amountMxn).toBe(904.99);
    expect(mixedRemainderMxn(form, total)).toBe(0);
    expect(mixedRemainderTarget(form)).toBe('card:0');
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
    form = enableMixedCard(form);
    form.mixedCardPayments = [{ amountMxn: 0, reference: '' }];
    form.mixedCashMxn = 400;
    form.mixedTransferMxn = 150;

    form = fillMixedMethodWithRemainder(form, total, 'card:0');

    expect(form.mixedCardPayments[0].amountMxn).toBe(450);
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

  it('dos tarjetas cubren el mixto sin otra forma', () => {
    const total = 830.5;
    let form = defaultCollectForm(total);
    form.paymentMethod = 'mixed';
    form = enableMixedCard(form);
    expect(form.mixedCardPayments).toHaveLength(2);
    expect(mixedSelectedCount(form)).toBe(2);

    form.mixedCardPayments = [
      { amountMxn: 400, reference: '4242' },
      { amountMxn: 430.5, reference: '1111' },
    ];

    expect(validateCollectForm(form, total)).toBeNull();

    const payload = buildCollectPayload(form, total);
    expect(payload.payment_method).toBe('mixed');
    expect(payload.amount_card_mxn).toBe(830.5);
    expect(payload.card_payments).toEqual([
      { amount_mxn: 400, reference: '4242' },
      { amount_mxn: 430.5, reference: '1111' },
    ]);
  });

  it('100 USD a 16.80 sobre 1079.65 da cambio 35.74 USD y no traba el cobro', () => {
    const total = 1079.65;
    const form = defaultCollectForm(total, 16.8);
    form.paymentMethod = 'cash';
    form.receivedCashMxn = 0;
    form.receivedCashUsd = 100;
    form.usdExchangeRate = 16.8;

    expect(collectReceivedTotalMxn(form)).toBe(1680);
    expect(collectChangeMxn(form, total)).toBe(0);
    expect(collectChangeUsd(form, total)).toBe(35.74);
    expect(validateCollectForm(form, total)).toBeNull();

    const payload = buildCollectPayload(form, total);
    expect(payload.amount_cash_mxn).toBe(0);
    expect(payload.amount_cash_usd).toBe(64.26);
    expect(payload.received_cash_usd).toBe(100);
    expect(payload.usd_exchange_rate).toBe(16.8);
  });

  it('agregar otra tarjeta cuenta como un pago más', () => {
    let form = defaultCollectForm(1000);
    form.paymentMethod = 'mixed';
    form.mixedUsesCash = true;
    form = enableMixedCard(form);
    expect(form.mixedCardPayments).toHaveLength(1);
    form = addMixedCardPayment(form);
    expect(form.mixedCardPayments).toHaveLength(2);
    expect(mixedSelectedCount(form)).toBe(3);
  });
});
