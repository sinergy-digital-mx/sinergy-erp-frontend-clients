import { PurchaseOrder } from '../models/purchase-order.model';
import { formatTitleCase } from '../../sales-orders/utils/sales-order-display.util';

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
