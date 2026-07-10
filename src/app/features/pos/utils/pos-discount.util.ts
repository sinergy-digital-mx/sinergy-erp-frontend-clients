import { PosApplicableDiscount } from '../models/pos-inventory-summary.model';
import { GlobalDiscount } from '../../global-discounts/models/global-discount.model';

export interface LineDiscountPreview {
  discountUnit: number;
  lineDiscount: number;
  lineGrossSubtotal: number;
  lineNetSubtotal: number;
}

export function previewLineDiscount(
  unitPrice: number,
  qty: number,
  discount?: PosApplicableDiscount | null
): LineDiscountPreview {
  const lineGrossSubtotal = unitPrice * qty;
  if (!discount) {
    return {
      discountUnit: 0,
      lineDiscount: 0,
      lineGrossSubtotal,
      lineNetSubtotal: lineGrossSubtotal,
    };
  }

  let discountUnit = 0;
  if (discount.discount_type === 'percentage') {
    discountUnit = unitPrice * discount.value / 100;
  } else {
    discountUnit = Math.min(discount.value, unitPrice);
  }

  const lineDiscount = discountUnit * qty;
  return {
    discountUnit,
    lineDiscount,
    lineGrossSubtotal,
    lineNetSubtotal: Math.max(lineGrossSubtotal - lineDiscount, 0),
  };
}

export function formatApplicableDiscountLabel(discount: PosApplicableDiscount): string {
  if (discount.discount_type === 'percentage') {
    return `${discount.name} (-${discount.value}%)`;
  }
  const value = Number(discount.value);
  const formatted = value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${discount.name} (-$${formatted} c/u)`;
}

export function previewGlobalDiscount(
  netSubtotalAfterLineDiscounts: number,
  discount?: GlobalDiscount | null
): { amount: number } {
  if (!discount || netSubtotalAfterLineDiscounts <= 0) {
    return { amount: 0 };
  }

  let amount = 0;
  if (discount.discount_type === 'percentage') {
    amount = netSubtotalAfterLineDiscounts * discount.value / 100;
  } else {
    amount = Math.min(discount.value, netSubtotalAfterLineDiscounts);
  }

  return { amount: Math.max(amount, 0) };
}

export function formatGlobalDiscountLabel(discount: GlobalDiscount): string {
  if (discount.discount_type === 'percentage') {
    return `${discount.name} (-${discount.value}%)`;
  }
  const value = Number(discount.value);
  const formatted = value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${discount.name} (-$${formatted})`;
}

export function isDiscountApiError(message: unknown): boolean {
  const text = String(message ?? '').toLowerCase();
  return text.includes('descuento') || text.includes('discount');
}
