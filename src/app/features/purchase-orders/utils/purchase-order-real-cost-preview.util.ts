import { PaymentCurrency } from '../models/purchase-order.model';

export interface RealCostPreviewLineInput {
  id: string;
  quantity: number;
  vendor_unit_cost: number;
  igi_percentage: number;
}

export interface RealCostPreviewExtraInput {
  amount: number;
  currency: PaymentCurrency;
  include_in_invoice?: boolean;
}

export interface RealCostPreviewLine {
  id: string;
  quantity: number;
  vendor_importe: number;
  real_unit_cost_usd: number | null;
  real_unit_cost_mxn: number | null;
  real_importe_mxn: number | null;
}

export interface RealCostPreview {
  increment_percentage: number;
  extras_mxn: number | null;
  extras_usd: number | null;
  merchandise_usd: number | null;
  merchandise_mxn: number | null;
  contracted_usd: number | null;
  contracted_mxn: number | null;
  invoice_usd: number | null;
  invoice_mxn: number | null;
  operating_extras_usd: number | null;
  operating_extras_mxn: number | null;
  total_usd: number | null;
  total_mxn: number | null;
  lines: RealCostPreviewLine[];
}

function convert(
  amount: number,
  from: PaymentCurrency,
  to: PaymentCurrency,
  rate: number | null
): number | null {
  if (from === to) {
    return amount;
  }
  if (rate == null || rate <= 0) {
    return null;
  }
  return from === 'USD' ? amount * rate : amount / rate;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function sumExtraGroup(
  extras: RealCostPreviewExtraInput[],
  includeInInvoice: boolean,
  to: PaymentCurrency,
  rate: number | null,
  extrasMxn: number | null
): number | null {
  const group = extras.filter((extra) => Boolean(extra.include_in_invoice) === includeInInvoice);
  if (group.length === 0) {
    return extrasMxn == null && includeInInvoice ? null : 0;
  }
  const converted = sumConvertedExtras(group, to, rate);
  if (converted == null) {
    return null;
  }
  if (includeInInvoice && extrasMxn != null) {
    return Math.min(converted, extrasMxn);
  }
  return converted;
}

function sumConvertedExtras(
  extras: RealCostPreviewExtraInput[],
  to: PaymentCurrency,
  rate: number | null
): number | null {
  let sum = 0;
  for (const extra of extras) {
    const converted = convert(extra.amount, extra.currency, to, rate);
    if (converted == null) {
      return null;
    }
    sum += converted;
  }
  return roundMoney(sum);
}

/** Misma fórmula que la hoja / el backend, para pintar en vivo. */
export function previewPurchaseOrderRealCost(input: {
  payment_currency: PaymentCurrency;
  customs_exchange_rate: number | null;
  lines: RealCostPreviewLineInput[];
  extras: RealCostPreviewExtraInput[];
}): RealCostPreview {
  const rate =
    input.customs_exchange_rate != null && input.customs_exchange_rate > 0
      ? input.customs_exchange_rate
      : null;
  const extras = input.extras.filter((extra) => extra.amount > 0);
  const merchandiseVendor = input.lines.reduce(
    (sum, line) => sum + line.quantity * line.vendor_unit_cost,
    0
  );
  const merchandiseMxn = convert(merchandiseVendor, input.payment_currency, 'MXN', rate);
  const merchandiseUsd = convert(merchandiseVendor, input.payment_currency, 'USD', rate);
  const extrasMxn = sumConvertedExtras(extras, 'MXN', rate);
  const extrasUsd =
    extrasMxn != null && rate != null
      ? roundMoney(extrasMxn / rate)
      : sumConvertedExtras(extras, 'USD', rate);
  const invoiceExtrasMxn = sumExtraGroup(extras, true, 'MXN', rate, extrasMxn);
  const operatingExtrasMxn =
    extrasMxn != null && invoiceExtrasMxn != null
      ? roundMoney(extrasMxn - invoiceExtrasMxn)
      : sumExtraGroup(extras, false, 'MXN', rate, extrasMxn);
  const merchandiseMxnRounded = merchandiseMxn == null ? null : roundMoney(merchandiseMxn);
  const merchandiseUsdRounded = merchandiseUsd == null ? null : roundMoney(merchandiseUsd);
  const invoiceMxn =
    merchandiseMxnRounded != null && invoiceExtrasMxn != null
      ? roundMoney(merchandiseMxnRounded + invoiceExtrasMxn)
      : null;
  const invoiceUsd = invoiceMxn != null && rate != null ? roundMoney(invoiceMxn / rate) : null;
  const operatingExtrasUsd =
    operatingExtrasMxn != null && rate != null ? roundMoney(operatingExtrasMxn / rate) : null;
  const extrasMxnForRatio = extrasMxn ?? 0;
  const merchandiseForRatio = merchandiseMxnRounded ?? merchandiseVendor;
  const incrementRatio =
    merchandiseForRatio > 0 && extrasMxnForRatio > 0 ? extrasMxnForRatio / merchandiseForRatio : 0;

  return {
    increment_percentage: incrementRatio * 100,
    extras_mxn: extrasMxn,
    extras_usd: extrasUsd,
    merchandise_usd: merchandiseUsdRounded,
    merchandise_mxn: merchandiseMxnRounded,
    contracted_usd: merchandiseUsdRounded,
    contracted_mxn: merchandiseMxnRounded,
    invoice_usd: invoiceUsd,
    invoice_mxn: invoiceMxn,
    operating_extras_usd: operatingExtrasUsd,
    operating_extras_mxn: operatingExtrasMxn,
    total_usd:
      merchandiseUsdRounded != null && extrasUsd != null
        ? roundMoney(merchandiseUsdRounded + extrasUsd)
        : null,
    total_mxn:
      merchandiseMxnRounded != null && extrasMxn != null
        ? roundMoney(merchandiseMxnRounded + extrasMxn)
        : null,
    lines: input.lines.map((line) => {
      const taxed = line.vendor_unit_cost * (1 + Math.max(line.igi_percentage, 0) / 100);
      const landed = taxed * (1 + incrementRatio);
      const realUsd = convert(landed, input.payment_currency, 'USD', rate);
      const realMxn = convert(landed, input.payment_currency, 'MXN', rate);
      return {
        id: line.id,
        quantity: line.quantity,
        vendor_importe: line.quantity * line.vendor_unit_cost,
        real_unit_cost_usd: realUsd,
        real_unit_cost_mxn: realMxn,
        real_importe_mxn: realMxn == null ? null : realMxn * line.quantity,
      };
    }),
  };
}

export function convertExtraAmount(
  amount: number | null,
  from: PaymentCurrency,
  to: PaymentCurrency,
  rate: number | null
): number | null {
  if (amount == null) {
    return null;
  }
  const converted = convert(amount, from, to, rate);
  return converted == null ? null : Number(converted.toFixed(2));
}

