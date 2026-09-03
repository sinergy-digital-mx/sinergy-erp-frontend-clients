import { formatUnitAmount } from '../../../core/utils/unit-money.util';
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

/** Valor numérico para inputs de captura: vacío si falta o es 0 (no prellenar). */
export function catalogInputNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n) || n === 0) {
    return null;
  }
  return n;
}

/** Costo unitario persistido: hasta 4 decimales. No redondear a 2. */
export function formatPurchaseOrderUnitCost(value: number | string | null | undefined): string {
  return formatUnitAmount(value);
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
