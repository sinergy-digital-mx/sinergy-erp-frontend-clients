import { Customer } from '../models/sales-order.model';

export function getCustomerDisplayName(
  customer?: Customer | null,
  fallback = 'N/A',
): string {
  if (!customer) return fallback;
  const fullName = `${customer.name || ''} ${customer.lastname || ''}`.trim();
  return fullName || customer.company_name || fallback;
}
