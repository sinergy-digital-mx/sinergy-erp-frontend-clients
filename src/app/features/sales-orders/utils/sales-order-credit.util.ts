import { SalesOrder } from '../models/sales-order.model';

export function isSalesOrderCredit(order?: Pick<SalesOrder, 'is_credit'> | null): boolean {
  return order?.is_credit === true;
}

export function salesOrderCreditChipLabel(order?: Pick<SalesOrder, 'is_credit' | 'payment_status'> | null): string {
  if (!isSalesOrderCredit(order)) {
    return '';
  }
  const status = String(order?.payment_status ?? '').trim();
  if (status === 'Pendiente') {
    return 'Crédito / Pendiente';
  }
  if (status === 'Pagado') {
    return 'Crédito / Pagado';
  }
  return 'Crédito';
}
