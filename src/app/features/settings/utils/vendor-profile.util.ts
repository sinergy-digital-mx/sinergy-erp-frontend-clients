import { Vendor, VendorMatchReason, VendorType } from '../models/vendor.model';

function isFilled(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return Boolean(trimmed) && trimmed !== '0' && trimmed !== '0.00';
  }
  return Boolean(value);
}

/** Misma regla que el API: 0–100 según identidad, dirección, banco y crédito. */
export function computeVendorCompleteness(
  vendor: Partial<Vendor> & { vendor_type?: VendorType },
): number {
  const isInternational = vendor.vendor_type === 'INTERNATIONAL';
  const slots: boolean[] = [
    isFilled(vendor.name),
    isFilled(vendor.company_name),
    isInternational ? isFilled(vendor.tax_id) : isFilled(vendor.rfc),
    isInternational ? isFilled(vendor.legal_name) : isFilled(vendor.razon_social),
    isFilled(vendor.street),
    isFilled(vendor.city),
    isFilled(vendor.state),
    isFilled(vendor.zip_code),
    isFilled(vendor.bank_name),
    isFilled(vendor.bank_account_holder),
    isInternational
      ? isFilled(vendor.bank_swift_bic) ||
        isFilled(vendor.bank_iban) ||
        isFilled(vendor.bank_account_number)
      : isFilled(vendor.bank_clabe) || isFilled(vendor.bank_account_number),
    isFilled(vendor.credit_days) || isFilled(vendor.credit_limit),
  ];
  if (isInternational) {
    slots.push(isFilled(vendor.country));
  }
  const filled = slots.filter(Boolean).length;
  return Math.round((filled / slots.length) * 100);
}

export function completenessLevel(value?: number): 'high' | 'mid' | 'low' {
  const percent = Number(value) || 0;
  if (percent >= 80) return 'high';
  if (percent >= 50) return 'mid';
  return 'low';
}

export const VENDOR_MATCH_REASON_LABELS: Record<VendorMatchReason, string> = {
  rfc: 'RFC',
  tax_id: 'ID fiscal',
  name: 'Nombre',
  company: 'Empresa',
  bank: 'Cuenta / CLABE',
};
