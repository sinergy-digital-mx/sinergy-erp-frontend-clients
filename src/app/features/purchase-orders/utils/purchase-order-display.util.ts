import { PurchaseOrder } from '../models/purchase-order.model';
import { formatTitleCase } from '../../sales-orders/utils/sales-order-display.util';

export const PEDIMENTO_MAX_LENGTH = 30;

export function parsePurchaseOrderDecimal(value: number | string | null | undefined): number {
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Costo unitario persistido: no redondear a 2 decimales. */
export function formatPurchaseOrderUnitCost(value: number | string | null | undefined): string {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(parsePurchaseOrderDecimal(value));
}

export function isInternationalPurchaseOrder(order: PurchaseOrder | null | undefined): boolean {
  if (!order) {
    return false;
  }
  return order.is_international_vendor === true || order.vendor?.vendor_type === 'INTERNATIONAL';
}

export function formatPedimentoDisplay(value?: string | null): string {
  const trimmed = value?.trim() ?? '';
  return trimmed || 'Sin pedimento';
}

export function getPurchaseOrderListFiscalLabel(order: PurchaseOrder): string {
  const label =
    order.razon_social ??
    order.fiscal_configuration?.razon_social ??
    '—';
  return formatTitleCase(label) || '—';
}

export function getPurchaseOrderListBranchLabel(order: PurchaseOrder): string {
  const label = order.sucursal ?? order.billing_branch?.code;
  if (!label?.trim()) {
    return '—';
  }
  return formatTitleCase(label.trim());
}

export function getPurchaseOrderListWarehouseLabel(order: PurchaseOrder): string {
  const label = order.warehouse?.name;
  if (!label?.trim()) {
    return '—';
  }
  return formatTitleCase(label.trim());
}
