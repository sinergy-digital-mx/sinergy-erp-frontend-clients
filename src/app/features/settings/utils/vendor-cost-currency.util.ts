export type VendorCostCurrency = 'MXN' | 'USD';

export const VENDOR_COST_CURRENCIES: VendorCostCurrency[] = ['MXN', 'USD'];

export function normalizeVendorCostCurrency(value?: string | null): VendorCostCurrency | null {
  return value === 'USD' || value === 'MXN' ? value : null;
}

export function vendorCostCurrencyLabel(value?: string | null): string {
  return normalizeVendorCostCurrency(value) ?? '—';
}

export function currencyMismatchMessage(
  orderCurrency: VendorCostCurrency,
  productCurrency: VendorCostCurrency
): string {
  return `Esta orden está en ${orderCurrency}. No puedes agregar un producto en ${productCurrency}.`;
}
