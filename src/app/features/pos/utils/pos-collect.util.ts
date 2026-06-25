export type CollectPaymentMethod = 'cash' | 'card' | 'transfer' | 'mixed';

export const CASH_MXN_DENOMINATIONS = [1000, 500, 200, 100, 50, 20] as const;
export const CASH_USD_DENOMINATIONS = [100, 50, 20, 10, 5, 1] as const;

export type CashDenominationCounts = Record<string, number>;

export interface PosCollectForm {
  paymentMethod: CollectPaymentMethod;
  amountCashMxn: number;
  amountCashUsd: number;
  usdExchangeRate: number;
  receivedCashMxn: number;
  receivedCashUsd: number;
  amountTransferMxn: number;
  transferReference: string;
  amountCardMxn: number;
  cardReference: string;
  mixedCashMxn: number;
  mixedReceivedMxn: number;
  mixedTransferMxn: number;
  mixedTransferRef: string;
}

export interface CollectSalePayload {
  payment_method: CollectPaymentMethod;
  amount_cash_mxn?: number;
  amount_cash_usd?: number;
  usd_exchange_rate?: number;
  received_cash_mxn?: number;
  received_cash_usd?: number;
  amount_transfer_mxn?: number;
  transfer_reference?: string;
  amount_card_mxn?: number;
  card_reference?: string;
  customer_id?: number;
}

export function parseOrderTotal(total: number | string | undefined | null): number {
  const n = Number(total);
  return Number.isFinite(n) ? n : 0;
}

export function amountsMatch(orderTotal: number, paidTotal: number): boolean {
  return Math.abs(paidTotal - orderTotal) <= 0.01;
}

export function defaultCollectForm(orderTotal: number, usdExchangeRate?: number): PosCollectForm {
  return {
    paymentMethod: 'cash',
    amountCashMxn: orderTotal,
    amountCashUsd: 0,
    usdExchangeRate: usdExchangeRate ?? 0,
    receivedCashMxn: 0,
    receivedCashUsd: 0,
    amountTransferMxn: orderTotal,
    transferReference: '',
    amountCardMxn: orderTotal,
    cardReference: '',
    mixedCashMxn: 0,
    mixedReceivedMxn: 0,
    mixedTransferMxn: orderTotal,
    mixedTransferRef: '',
  };
}

export function cashDenomKey(currency: 'MXN' | 'USD', denomination: number): string {
  return `${currency}-${denomination}`;
}

export function sumCashDenominations(
  counts: CashDenominationCounts,
  currency: 'MXN' | 'USD',
  denominations: readonly number[]
): number {
  return denominations.reduce(
    (sum, denomination) => sum + denomination * Math.max(0, counts[cashDenomKey(currency, denomination)] ?? 0),
    0
  );
}

export function collectReceivedTotalMxn(form: PosCollectForm): number {
  const usdMxn = form.receivedCashUsd > 0 ? form.receivedCashUsd * form.usdExchangeRate : 0;
  return roundMoney(form.receivedCashMxn + usdMxn);
}

export function deriveCashPaymentSplit(
  orderTotal: number,
  receivedMxn: number,
  receivedUsd: number,
  rate: number
): { amountCashMxn: number; amountCashUsd: number } {
  const amountCashMxn = roundMoney(Math.min(receivedMxn, orderTotal));
  const remainderMxn = roundMoney(orderTotal - amountCashMxn);
  const amountCashUsd =
    remainderMxn > 0 && rate > 0 ? roundMoney(Math.min(receivedUsd, remainderMxn / rate)) : 0;
  return { amountCashMxn, amountCashUsd };
}

export function syncCashFormFromReceived(
  form: PosCollectForm,
  orderTotal: number
): Pick<PosCollectForm, 'receivedCashMxn' | 'receivedCashUsd' | 'amountCashMxn' | 'amountCashUsd'> {
  const split = deriveCashPaymentSplit(
    orderTotal,
    form.receivedCashMxn,
    form.receivedCashUsd,
    form.usdExchangeRate
  );
  return {
    receivedCashMxn: roundMoney(form.receivedCashMxn),
    receivedCashUsd: roundMoney(form.receivedCashUsd),
    amountCashMxn: split.amountCashMxn,
    amountCashUsd: split.amountCashUsd,
  };
}

export function validateCollectForm(form: PosCollectForm, orderTotal: number): string | null {
  if (orderTotal <= 0) {
    return 'El total de la orden no es válido';
  }

  if (form.paymentMethod === 'cash') {
    if (form.receivedCashMxn <= 0 && form.receivedCashUsd <= 0) {
      return 'Indica cuántos billetes entregó el cliente';
    }
    if (form.receivedCashUsd > 0 && form.usdExchangeRate <= 0) {
      return 'Ingresa tipo de cambio';
    }
    if (collectReceivedTotalMxn(form) + 0.01 < orderTotal) {
      return `El efectivo recibido no cubre ${formatMoney(orderTotal)}`;
    }
    return null;
  }

  if (form.paymentMethod === 'transfer') {
    if (!amountsMatch(orderTotal, form.amountTransferMxn)) {
      return `Los montos deben cubrir exactamente ${formatMoney(orderTotal)}`;
    }
    if (!form.transferReference.trim()) {
      return 'Ingresa referencia de transferencia';
    }
    return null;
  }

  if (form.paymentMethod === 'card') {
    if (!amountsMatch(orderTotal, form.amountCardMxn)) {
      return `Los montos deben cubrir exactamente ${formatMoney(orderTotal)}`;
    }
    return null;
  }

  const paid = form.mixedCashMxn + form.mixedTransferMxn;
  if (!amountsMatch(orderTotal, paid)) {
    return `Los montos deben cubrir exactamente ${formatMoney(orderTotal)}`;
  }
  const methods = [form.mixedCashMxn > 0, form.mixedTransferMxn > 0].filter(Boolean).length;
  if (methods < 2) {
    return 'En pago mixto usa al menos dos formas de pago con monto mayor a cero';
  }
  if (form.mixedTransferMxn > 0 && !form.mixedTransferRef.trim()) {
    return 'Ingresa referencia de transferencia';
  }
  if (form.mixedCashMxn > 0 && form.mixedReceivedMxn < form.mixedCashMxn) {
    return 'El efectivo recibido debe cubrir el monto en efectivo';
  }
  return null;
}

export function buildCollectPayload(
  form: PosCollectForm,
  orderTotal: number,
  customerId?: number
): CollectSalePayload {
  const base: CollectSalePayload = { payment_method: form.paymentMethod };
  if (customerId != null && Number.isFinite(customerId) && customerId > 0) {
    base.customer_id = Math.floor(customerId);
  }

  if (form.paymentMethod === 'cash') {
    const synced = syncCashFormFromReceived(form, orderTotal);
    return {
      ...base,
      amount_cash_mxn: roundMoney(synced.amountCashMxn),
      ...(synced.amountCashUsd > 0
        ? {
            amount_cash_usd: roundMoney(synced.amountCashUsd),
            usd_exchange_rate: form.usdExchangeRate,
            received_cash_usd: roundMoney(synced.receivedCashUsd),
          }
        : {}),
      received_cash_mxn: roundMoney(synced.receivedCashMxn),
    };
  }

  if (form.paymentMethod === 'transfer') {
    return {
      ...base,
      amount_transfer_mxn: roundMoney(form.amountTransferMxn),
      transfer_reference: form.transferReference.trim(),
    };
  }

  if (form.paymentMethod === 'card') {
    return {
      ...base,
      amount_card_mxn: roundMoney(form.amountCardMxn),
      ...(form.cardReference.trim() ? { card_reference: form.cardReference.trim() } : {}),
    };
  }

  return {
    ...base,
    payment_method: 'mixed',
    ...(form.mixedCashMxn > 0
      ? {
          amount_cash_mxn: roundMoney(form.mixedCashMxn),
          received_cash_mxn: roundMoney(form.mixedReceivedMxn),
        }
      : {}),
    ...(form.mixedTransferMxn > 0
      ? {
          amount_transfer_mxn: roundMoney(form.mixedTransferMxn),
          transfer_reference: form.mixedTransferRef.trim(),
        }
      : {}),
  };
}

export function collectAppliedTotal(form: PosCollectForm): number {
  if (form.paymentMethod === 'cash') {
    return collectReceivedTotalMxn(form);
  }
  if (form.paymentMethod === 'transfer') {
    return form.amountTransferMxn;
  }
  if (form.paymentMethod === 'card') {
    return form.amountCardMxn;
  }
  return form.mixedCashMxn + form.mixedTransferMxn;
}

export function collectChangeMxn(form: PosCollectForm, orderTotal = 0): number {
  if (form.paymentMethod === 'cash') {
    const split = deriveCashPaymentSplit(
      orderTotal,
      form.receivedCashMxn,
      form.receivedCashUsd,
      form.usdExchangeRate
    );
    return Math.max(0, roundMoney(form.receivedCashMxn - split.amountCashMxn));
  }
  if (form.paymentMethod === 'mixed' && form.mixedCashMxn > 0) {
    return Math.max(0, roundMoney(form.mixedReceivedMxn - form.mixedCashMxn));
  }
  return 0;
}

export function collectChangeUsd(form: PosCollectForm, orderTotal = 0): number {
  if (form.paymentMethod === 'cash') {
    const split = deriveCashPaymentSplit(
      orderTotal,
      form.receivedCashMxn,
      form.receivedCashUsd,
      form.usdExchangeRate
    );
    return Math.max(0, roundMoney(form.receivedCashUsd - split.amountCashUsd));
  }
  return 0;
}

export function collectCashShortfallMxn(form: PosCollectForm, orderTotal = 0): number {
  if (form.paymentMethod === 'cash') {
    return Math.max(0, roundMoney(orderTotal - collectReceivedTotalMxn(form)));
  }
  if (form.paymentMethod === 'mixed' && form.mixedCashMxn > 0) {
    return Math.max(0, roundMoney(form.mixedCashMxn - form.mixedReceivedMxn));
  }
  return 0;
}

export function collectCashShortfallUsd(form: PosCollectForm): number {
  return 0;
}

export function collectAppliedDelta(form: PosCollectForm, orderTotal: number): number {
  return roundMoney(collectAppliedTotal(form) - orderTotal);
}

export function splitMixedPaymentDefault(orderTotal: number): Pick<
  PosCollectForm,
  'mixedCashMxn' | 'mixedTransferMxn' | 'mixedReceivedMxn'
> {
  const cash = roundMoney(orderTotal / 2);
  const transfer = roundMoney(orderTotal - cash);
  return {
    mixedCashMxn: cash,
    mixedTransferMxn: transfer,
    mixedReceivedMxn: cash,
  };
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
}
