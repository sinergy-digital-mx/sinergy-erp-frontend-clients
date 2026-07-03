import { SalesOrder, SalesOrderStatus } from '../models/sales-order.model';

export function parseSalesOrderNumber(value: string | number | undefined | null): number {
  if (value == null || value === '') {
    return 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function getSalesOrderStatus(order: SalesOrder): SalesOrderStatus | string {
  return order.general_status ?? order.status ?? '';
}

/** Total a mostrar en listados — alineado con detalle de OV. */
export function getSalesOrderTotal(order: SalesOrder): number {
  const status = getSalesOrderStatus(order);
  const hasDeliveredTotals =
    order.delivered_total != null ||
    order.delivered_subtotal != null ||
    order.delivered_iva_total != null;

  if (status === 'Surtida' && hasDeliveredTotals) {
    return parseSalesOrderNumber(
      order.delivered_total ?? order.total ?? order.requested_total ?? order.grand_total
    );
  }

  return parseSalesOrderNumber(
    order.requested_total ?? order.total ?? order.delivered_total ?? order.grand_total
  );
}
