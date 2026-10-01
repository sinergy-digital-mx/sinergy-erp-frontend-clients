import { Customer, SalesOrder, SalesOrderCustomerSummary } from '../models/sales-order.model';

function joinPersonName(name?: string | null, lastname?: string | null): string {
  return `${name || ''} ${lastname || ''}`.trim();
}

function withWalkInSuffix(name: string, isWalkIn?: boolean): string {
  return isWalkIn ? `${name} (mostrador)` : name;
}

export function getCustomerDisplayName(
  customer?: Customer | null,
  fallback = 'N/A',
): string {
  if (!customer) return fallback;
  const fullName = joinPersonName(customer.name, customer.lastname);
  return fullName || customer.company_name || fallback;
}

export function getCustomerSummaryDisplayName(
  summary?: SalesOrderCustomerSummary | null,
  fallback = 'N/A',
): string {
  if (!summary) {
    return fallback;
  }
  const name =
    joinPersonName(summary.name, summary.lastname) || summary.display_name?.trim() || '';
  if (!name) {
    return fallback;
  }
  return withWalkInSuffix(name, summary.is_walk_in);
}

function isGenericCustomerLabel(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return (
    normalized === 'público en general' ||
    normalized === 'publico en general' ||
    normalized === 'venta de mostrador' ||
    normalized === 'mostrador'
  );
}

export function resolveSalesOrderCustomerName(
  order?: SalesOrder | null,
  fallback = 'N/A',
): string {
  if (!order) {
    return fallback;
  }

  const walkInTicket = (order as { walk_in_name?: string | null }).walk_in_name?.trim();
  if (walkInTicket && !isGenericCustomerLabel(walkInTicket)) {
    return walkInTicket;
  }

  const fiscalName = (
    order.customer?.fiscal_razon_social ||
    order.customer_summary?.company_name ||
    order.customer?.company_name ||
    ''
  ).trim();
  const personName =
    joinPersonName(order.customer_summary?.name, order.customer_summary?.lastname) ||
    joinPersonName(order.customer?.name, order.customer?.lastname);

  if (personName && !isGenericCustomerLabel(personName)) {
    return withWalkInSuffix(personName, order.customer_summary?.is_walk_in);
  }
  if (fiscalName && !isGenericCustomerLabel(fiscalName)) {
    return fiscalName;
  }
  if (order.customer_display_name?.trim() && !isGenericCustomerLabel(order.customer_display_name)) {
    return order.customer_display_name.trim();
  }
  if (personName) {
    return withWalkInSuffix(personName, order.customer_summary?.is_walk_in);
  }
  return fallback;
}

export function getSalesOrderCompanyName(order?: SalesOrder | null): string {
  const company = (
    order?.customer_summary?.company_name ||
    order?.customer?.company_name ||
    order?.customer?.fiscal_razon_social ||
    ''
  ).trim();
  if (!company) {
    return '';
  }
  const display = resolveSalesOrderCustomerName(order, '');
  if (display && display.toLowerCase() === company.toLowerCase()) {
    return '';
  }
  return company;
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
