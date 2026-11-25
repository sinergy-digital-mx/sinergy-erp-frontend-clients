export const CUSTOMER_LIST_PREFILTERS = ['off', 'sellers', 'everyone'] as const;

export type CustomerListPrefilter = (typeof CUSTOMER_LIST_PREFILTERS)[number];

export function normalizeCustomerListPrefilter(value: unknown): CustomerListPrefilter {
  if (value === 'off' || value === 'sellers' || value === 'everyone') {
    return value;
  }
  return 'sellers';
}

/** Quién abre Clientes con su razón y sucursal ya elegidas. */
export function shouldPrefilterCustomerList(
  prefilter: CustomerListPrefilter,
  skipsPrefilter: boolean,
): boolean {
  if (prefilter === 'off') return false;
  if (prefilter === 'everyone') return true;
  return !skipsPrefilter;
}
