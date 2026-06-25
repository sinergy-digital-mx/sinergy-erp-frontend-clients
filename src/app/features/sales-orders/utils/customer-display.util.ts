import { Customer, SalesOrder, SalesOrderCustomerSummary } from '../models/sales-order.model';

export function getCustomerDisplayName(
  customer?: Customer | null,
  fallback = 'N/A',
): string {
  if (!customer) return fallback;
  const fullName = `${customer.name || ''} ${customer.lastname || ''}`.trim();
  return fullName || customer.company_name || fallback;
}

export function getCustomerSummaryDisplayName(
  summary?: SalesOrderCustomerSummary | null,
  fallback = 'N/A',
): string {
  if (!summary?.display_name?.trim()) {
    return fallback;
  }
  const name = summary.display_name.trim();
  return summary.is_walk_in ? `${name} (mostrador)` : name;
}

export function resolveSalesOrderCustomerName(
  order?: SalesOrder | null,
  fallback = 'N/A',
): string {
  if (!order) {
    return fallback;
  }
  if (order.customer_display_name?.trim()) {
    const name = order.customer_display_name.trim();
    if (order.customer_summary?.is_walk_in) {
      return `${name} (mostrador)`;
    }
    return name;
  }
  const summaryName = getCustomerSummaryDisplayName(order.customer_summary, '');
  if (summaryName) {
    return summaryName;
  }
  return getCustomerDisplayName(order.customer, fallback);
}

export function resolveSalesOrderCustomerId(order?: SalesOrder | null): number | string | null {
  if (!order) {
    return null;
  }
  if (order.customer_summary?.id != null) {
    return order.customer_summary.id;
  }
  if (order.customer_id != null && order.customer_id !== '') {
    return order.customer_id;
  }
  if (order.customer?.id != null) {
    return order.customer.id;
  }
  return null;
}
