import { POSCartItem } from '../models/pos.model';
import { PosSession } from '../models/pos-session.model';
import { SalesOrderFormData } from '../../sales-orders/models/sales-order.model';

export type PosUiPaymentMethod = 'cash' | 'card' | 'credit';

export interface PosSalesOrderContext {
  session: PosSession;
  warehouseId: string;
  fiscalConfigurationId: string;
  customerId: number | string;
  fiscalRazonSocial?: string;
  terminalLabel?: string;
  paymentMethod: PosUiPaymentMethod;
}

export function resolvePosFiscalConfigurationId(session: PosSession | null | undefined): string | null {
  const branch = session?.posConfiguration?.branch as
    | { fiscal_configuration_id?: string; fiscalConfigurationId?: string }
    | undefined;
  const fromBranch = branch?.fiscal_configuration_id ?? branch?.fiscalConfigurationId;
  if (fromBranch) {
    return String(fromBranch);
  }
  const cfg = session?.posConfiguration as { fiscal_configuration_id?: string } | undefined;
  if (cfg?.fiscal_configuration_id) {
    return String(cfg.fiscal_configuration_id);
  }
  return null;
}

export function todayIsoDate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function mapPosPaymentToApi(method: PosUiPaymentMethod): {
  payment_status: 'Pagado' | 'Pendiente';
  paymentNote: string;
} {
  switch (method) {
    case 'cash':
      return { payment_status: 'Pagado', paymentNote: 'Pago: Efectivo' };
    case 'card':
      return { payment_status: 'Pagado', paymentNote: 'Pago: Tarjeta' };
    case 'credit':
      return { payment_status: 'Pendiente', paymentNote: 'Pago: Crédito' };
    default:
      return { payment_status: 'Pendiente', paymentNote: 'Pago: Pendiente' };
  }
}

export function buildPosSalesOrderPayload(
  cartItems: POSCartItem[],
  ctx: PosSalesOrderContext
): SalesOrderFormData {
  const { payment_status, paymentNote } = mapPosPaymentToApi(ctx.paymentMethod);
  const terminal = ctx.terminalLabel?.trim() || 'POS';
  const notes = `POS - ${terminal} - ${paymentNote}`;

  return {
    fiscal_configuration_id: ctx.fiscalConfigurationId,
    warehouse_id: ctx.warehouseId,
    customer_id: ctx.customerId,
    expected_delivery_date: todayIsoDate(),
    sales_order_type: 'POS',
    payment_status,
    ...(ctx.fiscalRazonSocial?.trim() ? { fiscal_razon_social: ctx.fiscalRazonSocial.trim() } : {}),
    notes,
    line_items: cartItems.map((item) => ({
      product_id: item.product_id,
      product_uom_id: item.uom_id,
      quantity: item.quantity,
      unit_price: Number(item.unit_price),
      discount_percentage: 0,
      iva_percentage: Number(item.iva_percentage ?? 0),
      ieps_percentage: Number(item.ieps_percentage ?? 0),
    })),
  };
}

export function isPosOrderFulfilled(order: { general_status?: string; status?: string } | null): boolean {
  const status = String(order?.general_status ?? order?.status ?? '');
  return status === 'Surtida';
}
