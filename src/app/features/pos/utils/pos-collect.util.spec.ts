import { describe, expect, it } from 'vitest';
import {
  resolvePosCollectCustomerId,
  addMixedCardPayment,
  applyMixedRemainderToLast,
  buildCollectPayload,
  canDocumentOrderInUsd,
  usdAmountCoveringMxn,
  collectCashShortfallMxn,
  collectCashShortfallUsd,
  collectChangeDisplay,
  collectChangeMxn,
  collectChangeUsd,
  displayCashChange,
  collectReceivedTotalMxn,
  defaultCollectForm,
  enableMixedCard,
  fillMixedMethodWithRemainder,
  mixedAppliedTotal,
  mixedRemainderMxn,
  mixedRemainderTarget,
  mixedSelectedCount,
  validateCollectForm,
} from './pos-collect.util';

describe('resolvePosCollectCustomerId', () => {
  it('usa el id del cliente y no el id legado', () => {
    expect(resolvePosCollectCustomerId({ id: 1500, legacy_customer_id: 42 })).toBe(1500);
  });

  it('usa el id legado solo si no hay id', () => {
    expect(resolvePosCollectCustomerId({ legacy_customer_id: 42 })).toBe(42);
  });
});

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

  it('un cheque en dólares cubre la orden con el tipo de cambio', () => {
    const total = 1079.65;
    const form = defaultCollectForm(total, 16.8);
    form.paymentMethod = 'check';
    form.checkCurrency = 'USD';
    form.amountCheckMxn = 0;
    form.amountCheckUsd = usdAmountCoveringMxn(total, 16.8);
    form.checkReference = 'CH-USD';
    form.checkPayerName = 'Luis Gómez';
    form.checkPayerPhone = '6640001122';

    expect(validateCollectForm(form, total)).toBeNull();
    expect(canDocumentOrderInUsd(form, total)).toBe(true);

    const payload = buildCollectPayload(form, total, undefined, 'USD');
    expect(payload.payment_method).toBe('check');
    expect(payload.amount_check_usd).toBe(form.amountCheckUsd);
    expect(payload.amount_check_mxn).toBeUndefined();
    expect(payload.usd_exchange_rate).toBe(16.8);
    expect(payload.order_currency).toBe('USD');
    expect(payload.check_payer_name).toBe('Luis Gómez');
  });

  it('en mixto el cheque en dólares entra al total', () => {
    const total = 1000;
    const form = defaultCollectForm(total, 20);
    form.paymentMethod = 'mixed';
    form.mixedUsesCash = true;
    form.mixedCashMxn = 400;
    form.mixedReceivedMxn = 400;
    form.mixedUsesCheck = true;
    form.mixedCheckCurrency = 'USD';
    form.mixedCheckMxn = 0;
    form.mixedCheckUsd = 30;
    form.mixedCheckRef = 'CH-2';
    form.checkPayerName = 'Luis Gómez';
    form.checkPayerPhone = '6640001122';

    expect(mixedAppliedTotal(form)).toBe(1000);
    expect(validateCollectForm(form, total)).toBeNull();

    const payload = buildCollectPayload(form, total);
    expect(payload.payment_method).toBe('mixed');
    expect(payload.amount_check_usd).toBe(30);
    expect(payload.amount_cash_mxn).toBe(400);
    expect(payload.usd_exchange_rate).toBe(20);
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
    expect(validateCollectForm(form, total)).toBe('Ingresa el nombre de quien paga con cheque');

    form.checkPayerName = 'Luis Gómez';
    form.checkPayerPhone = '6640001122';
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
    form.cardPayerName = 'Ana López';
    form.cardPayerPhone = '6641234567';

    expect(validateCollectForm(form, total)).toBeNull();

    const payload = buildCollectPayload(form, total);
    expect(payload.payment_method).toBe('mixed');
    expect(payload.amount_card_mxn).toBe(830.5);
    expect(payload.card_payments).toEqual([
      { amount_mxn: 400, reference: '4242' },
      { amount_mxn: 430.5, reference: '1111' },
    ]);
    expect(payload.card_payer_name).toBe('Ana López');
    expect(payload.card_payer_phone).toBe('6641234567');
  });

  it('transferencia pide nombre o razón social y no teléfono', () => {
    const total = 500;
    const form = defaultCollectForm(total);
    form.paymentMethod = 'transfer';
    form.transferReference = 'SPEI-1';

    expect(validateCollectForm(form, total)).toBe(
      'Ingresa el nombre o la razón social de la transferencia',
    );

    form.transferPayerBusinessName = 'Maderería del Norte';
    expect(validateCollectForm(form, total)).toBeNull();
    expect(buildCollectPayload(form, total).transfer_payer_business_name).toBe('Maderería del Norte');
    expect(buildCollectPayload(form, total).transfer_payer_name).toBeUndefined();
  });

  it('el faltante en pesos se convierte a dólares con el tipo de cambio', () => {
    const total = 4215.3;
    const form = defaultCollectForm(total, 16.6);
    form.paymentMethod = 'cash';
    form.usdExchangeRate = 16.6;
    form.receivedCashMxn = 1000;

    expect(collectCashShortfallMxn(form, total)).toBe(3215.3);
    expect(collectCashShortfallUsd(form, total)).toBe(193.69);
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
    expect(collectChangeDisplay(form, total)).toEqual({ mxn: 600.43, usd: 35.74 });
    expect(validateCollectForm(form, total)).toBeNull();

    const payload = buildCollectPayload(form, total);
    expect(payload.amount_cash_mxn).toBe(0);
    expect(payload.amount_cash_usd).toBe(64.26);
    expect(payload.received_cash_usd).toBe(100);
    expect(payload.usd_exchange_rate).toBe(16.8);
    expect(canDocumentOrderInUsd(form, total)).toBe(true);
    expect(buildCollectPayload(form, total, undefined, 'USD').order_currency).toBe('USD');
  });

  it('no deja la orden en dólares si los pesos cubren más', () => {
    const total = 1000;
    const form = defaultCollectForm(total, 20);
    form.paymentMethod = 'cash';
    form.receivedCashMxn = 800;
    form.receivedCashUsd = 20;
    form.usdExchangeRate = 20;
    expect(canDocumentOrderInUsd(form, total)).toBe(false);
  });

  it('el cambio en pesos también se muestra en dólares', () => {
    expect(displayCashChange(169.5, 0, 16.8)).toEqual({ mxn: 169.5, usd: 10.09 });
  });

  it('en mixto el efectivo en dólares entra al total con el tipo de cambio', () => {
    const total = 1000;
    const form = defaultCollectForm(total, 20);
    form.paymentMethod = 'mixed';
    form.mixedUsesCash = true;
    form.mixedUsesTransfer = true;
    form.mixedCashMxn = 200;
    form.mixedReceivedMxn = 200;
    form.mixedCashUsd = 10;
    form.mixedReceivedUsd = 15;
    form.usdExchangeRate = 20;
    form.mixedTransferMxn = 600;
    form.mixedTransferRef = 'SPEI-1';
    form.transferPayerName = 'Ana';

    expect(mixedAppliedTotal(form)).toBe(1000);
    expect(collectChangeUsd(form, total)).toBe(5);
    expect(validateCollectForm(form, total)).toBeNull();

    const payload = buildCollectPayload(form, total);
    expect(payload.payment_method).toBe('mixed');
    expect(payload.amount_cash_mxn).toBe(200);
    expect(payload.amount_cash_usd).toBe(10);
    expect(payload.received_cash_usd).toBe(15);
    expect(payload.usd_exchange_rate).toBe(20);
    expect(payload.amount_transfer_mxn).toBe(600);
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

  it('a crédito en USD envía la moneda y el tipo de cambio del cobro', () => {
    const form = { ...defaultCollectForm(3465, 17.9), paymentMethod: 'credit' as const };
    const payload = buildCollectPayload(form, 3465, 15487, 'USD');
    expect(payload).toMatchObject({
      payment_method: 'credit',
      order_currency: 'USD',
      amount_credit_mxn: 3465,
      usd_exchange_rate: 17.9,
    });
  });

  it('a crédito en MXN no envía tipo de cambio', () => {
    const form = { ...defaultCollectForm(3465, 17.9), paymentMethod: 'credit' as const };
    const payload = buildCollectPayload(form, 3465, 15487, 'MXN');
    expect(payload.order_currency).toBe('MXN');
    expect(payload.usd_exchange_rate).toBeUndefined();
  });
});

