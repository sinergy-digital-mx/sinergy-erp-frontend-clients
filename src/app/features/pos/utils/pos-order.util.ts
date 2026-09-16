import { POSCartItem, POSCart } from '../models/pos.model';
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
  cart: Pick<POSCart, 'items' | 'global_discount_id'>,
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
    line_items: cart.items.map(mapCartLineToOrderLine),
    ...(cart.global_discount_id ? { global_discount_id: cart.global_discount_id } : {}),
  } as SalesOrderFormData;
}

export function buildCobranzaPosOrderPayload(
  cartItems: POSCartItem[],
  ctx: VentasPosOrderContext
): SalesOrderFormData {
  const terminal = ctx.terminalLabel?.trim() || 'POS Caja';
  return {
    fiscal_configuration_id: ctx.fiscalConfigurationId,
    warehouse_id: ctx.warehouseId,
    customer_id: ctx.customerId,
    expected_delivery_date: todayIsoDate(),
    sales_order_type: 'POS',
    seller_user_id: ctx.sellerUserId,
    payment_status: 'Pagado',
    notes: `POS Caja - ${terminal}`,
    line_items: cartItems.map(mapCartLineToOrderLine),
  };
}

export function mapInProgressLineToCartItem(line: {
  product_id: string;
  product_name?: string;
  product_sku?: string;
  product_uom_id: string;
  uom_id?: string;
  uom_name?: string;
  quantity: number;
  unit_price: number;
  iva_percentage?: number;
  ieps_percentage?: number;
  product_discount_id?: string | null;
  selected_discount?: POSCartItem['selected_discount'];
}): POSCartItem {
  return {
    product_id: line.product_id,
    product_name: line.product_name || 'Producto',
    product_sku: line.product_sku || '',
    product_uom_id: line.product_uom_id,
    uom_id: line.uom_id || line.product_uom_id,
    uom_name: line.uom_name || 'Pieza',
    quantity: Number(line.quantity),
    unit_price: Number(line.unit_price),
    iva_percentage: Number(line.iva_percentage ?? 0),
    ieps_percentage: Number(line.ieps_percentage ?? 0),
    subtotal: 0,
    line_gross_subtotal: 0,
    line_discount_amount: 0,
    iva_amount: 0,
    ieps_amount: 0,
    line_total: 0,
    product_discount_id: line.product_discount_id ?? null,
    selected_discount: line.selected_discount ?? null,
    pricing_options: [],
    selected_price_list_id: '',
    suggested_unit_price: Number(line.unit_price),
    suggested_iva_percentage: Number(line.iva_percentage ?? 0),
    suggested_ieps_percentage: Number(line.ieps_percentage ?? 0),
    applicable_discounts: line.selected_discount ? [line.selected_discount] : [],
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
