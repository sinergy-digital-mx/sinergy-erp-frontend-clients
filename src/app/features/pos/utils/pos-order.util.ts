import { POSCartItem } from '../models/pos.model';
import { SalesOrderFormData } from '../../sales-orders/models/sales-order.model';

export interface VentasPosOrderContext {
  warehouseId: string;
  fiscalConfigurationId: string;
  customerId?: number | string;
  sellerUserId: string;
  terminalLabel?: string;
}

export function todayIsoDate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function mapCartLineToOrderLine(item: POSCartItem): SalesOrderFormData['line_items'][number] {
  const line: SalesOrderFormData['line_items'][number] = {
    product_id: item.product_id,
    product_uom_id: item.product_uom_id || item.uom_id,
    quantity: item.quantity,
    unit_price: Number(item.unit_price),
    iva_percentage: Number(item.iva_percentage ?? 0),
    ieps_percentage: Number(item.ieps_percentage ?? 0),
  };

  if (item.product_discount_id) {
    line.product_discount_id = item.product_discount_id;
  }

  return line;
}

export function buildVentasPosOrderPayload(
  cartItems: POSCartItem[],
  ctx: VentasPosOrderContext
): SalesOrderFormData {
  const terminal = ctx.terminalLabel?.trim() || 'POS Ventas';
  return {
    fiscal_configuration_id: ctx.fiscalConfigurationId,
    warehouse_id: ctx.warehouseId,
    ...(ctx.customerId != null && ctx.customerId !== ''
      ? { customer_id: ctx.customerId }
      : {}),
    expected_delivery_date: todayIsoDate(),
    sales_order_type: 'POS',
    seller_user_id: ctx.sellerUserId,
    notes: `POS Ventas - ${terminal}`,
    line_items: cartItems.map(mapCartLineToOrderLine),
  } as SalesOrderFormData;
}

export function buildCobranzaPosOrderPayload(
  cartItems: POSCartItem[],
  ctx: VentasPosOrderContext
): SalesOrderFormData {
  const terminal = ctx.terminalLabel?.trim() || 'POS Cobranza';
  return {
    fiscal_configuration_id: ctx.fiscalConfigurationId,
    warehouse_id: ctx.warehouseId,
    customer_id: ctx.customerId,
    expected_delivery_date: todayIsoDate(),
    sales_order_type: 'POS',
    seller_user_id: ctx.sellerUserId,
    payment_status: 'Pagado',
    notes: `POS Cobranza - ${terminal}`,
    line_items: cartItems.map(mapCartLineToOrderLine),
  };
}

export function isPosOrderQueued(order: { general_status?: string; status?: string } | null): boolean {
  const status = String(order?.general_status ?? order?.status ?? '').toLowerCase();
  return status === 'en cola';
}

export function isPosOrderFulfilled(order: { general_status?: string; status?: string } | null): boolean {
  const status = String(order?.general_status ?? order?.status ?? '');
  return status === 'Surtida';
}

export function resolveFiscalConfigurationIdFromBranch(branch: unknown): string | null {
  if (!branch || typeof branch !== 'object') {
    return null;
  }
  const b = branch as {
    fiscal_configuration_id?: string;
    fiscalConfigurationId?: string;
    fiscal_configuration?: { id?: string };
  };
  return (
    b.fiscal_configuration_id ??
    b.fiscalConfigurationId ??
    b.fiscal_configuration?.id ??
    null
  );
}
