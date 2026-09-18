import { Customer, CustomerFiscalCredit } from '../models/customer-group.model';

export function isTruthyFlag(value: unknown): boolean {
  return value === true || value === 1 || value === '1' || value === 'true';
}

export function isCustomerCreditEnabled(customer?: Customer | null): boolean {
  if (!customer) {
    return false;
  }
  const enabled = customer.credit_enabled as unknown;
  if (isTruthyFlag(enabled)) {
    return true;
  }
  if (enabled === false || enabled === 0 || enabled === 'false') {
    return false;
  }
  return Number(customer.credit_amount ?? 0) > 0 || Number(customer.credit_days ?? 0) > 0;
}

export function unwrapCustomerPayload(raw: unknown): Customer | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const root = raw as Record<string, unknown>;
  const nested = root['data'] ?? root['customer'];
  if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
    const nestedRecord = nested as Record<string, unknown>;
    const inner = nestedRecord['data'] ?? nestedRecord['customer'];
    if (inner && typeof inner === 'object' && !Array.isArray(inner) && 'id' in (inner as object)) {
      return inner as Customer;
    }
    if ('id' in nestedRecord || 'credit_enabled' in nestedRecord || 'name' in nestedRecord) {
      return nested as Customer;
    }
  }
  if ('id' in root || 'credit_enabled' in root || 'name' in root) {
    return raw as Customer;
  }
  return null;
}

export function formatCreditMoney(value: number | string | null | undefined): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(value) || 0);
}

export function creditsFromCustomer(customer?: Customer | null): CustomerFiscalCredit[] {
  if (!customer) {
    return [];
  }
  if (Array.isArray(customer.credits) && customer.credits.length > 0) {
    return customer.credits;
  }
  return [];
}

/** Crédito de una razón social: fila de `credits[]` o campos aplanados del GET. */
export function pickCustomerCreditForFiscal(
  customer: Customer | null | undefined,
  fiscalConfigurationId: string | null | undefined,
): CustomerFiscalCredit | null {
  if (!customer) {
    return null;
  }

  const fiscalId = fiscalConfigurationId?.trim() || '';
  const rows = creditsFromCustomer(customer);
  if (fiscalId) {
    const match = rows.find((row) => String(row.fiscal_configuration_id) === fiscalId);
    if (match) {
      return match;
    }
  }

  if (
    customer.credit_enabled == null &&
    customer.credit_amount == null &&
    customer.credit_used == null &&
    !fiscalId
  ) {
    return rows[0] ?? null;
  }

  return {
    fiscal_configuration_id: fiscalId || String(rows[0]?.fiscal_configuration_id || ''),
    razon_social: rows[0]?.razon_social,
    rfc: rows[0]?.rfc,
    credit_enabled: customer.credit_enabled,
    credit_days: customer.credit_days,
    credit_amount: customer.credit_amount,
    credit_used: customer.credit_used,
    credit_available: customer.credit_available,
    credit_usage_percent: customer.credit_usage_percent,
  };
}
