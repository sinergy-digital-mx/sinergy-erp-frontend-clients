import { SalesOrder, SalesOrderStatus } from '../models/sales-order.model';
import {
  getSalesOrderCompanyName,
  resolveSalesOrderCustomerName,
} from './customer-display.util';

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

/** Primera letra de cada palabra; conserva acrónimos cortos como POS. */
export function formatTitleCase(value: string | null | undefined): string {
  const text = value?.trim();
  if (!text) {
    return '';
  }
  if (text === '—' || text === 'N/A') {
    return text;
  }

  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getSalesOrderListCustomerName(order: SalesOrder, fallback = 'N/A'): string {
  return formatTitleCase(resolveSalesOrderCustomerName(order, fallback));
}

export function getSalesOrderListCompanyName(order: SalesOrder): string {
  const company = getSalesOrderCompanyName(order);
  return company ? formatTitleCase(company) : '';
}

export function getSalesOrderListFiscalLabel(order: SalesOrder): string {
  const label =
    order.fiscal_configuration?.razon_social ||
    order.razon_social ||
    order.fiscal_razon_social ||
    '—';
  return formatTitleCase(label) || '—';
}

export function getSalesOrderListBranchLabel(order: SalesOrder): string {
  const label = order.sucursal ?? order.billing_branch?.code;
  if (!label?.trim()) {
    return '—';
  }
  return formatTitleCase(label.trim());
}
