import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  AccountingPeriod,
  CollectionCustomerType,
  PayableCurrencyView,
  PosCollectionPaymentMethodKey,
} from '../models/accounting.model';
import { DebtFlowPeriod, DebtFlowView } from '../models/customer-debt-flow.model';

export const ACCOUNTING_TAB_IDS = [
  'pos',
  'pos-collections',
  'payable',
  'receivable',
  'debt-flow',
  'average-cost',
  'global-invoices',
] as const;

export type AccountingTabId = (typeof ACCOUNTING_TAB_IDS)[number];

const PERIODS: AccountingPeriod[] = ['today', 'week', 'month', 'range'];
const CUSTOMER_TYPES: CollectionCustomerType[] = ['all', 'walk_in', 'invoiced'];
const PAYMENT_METHODS: PosCollectionPaymentMethodKey[] = ['cash', 'transfer', 'card', 'check', 'credit'];
const CURRENCIES: PayableCurrencyView[] = ['all', 'mxn', 'usd'];
const DEBT_VIEWS: DebtFlowView[] = ['aging', 'ledger'];
const DEBT_PERIODS: DebtFlowPeriod[] = ['today', 'week', 'month', 'year', 'range'];

export type QueryPatch = Record<string, string | number | null | undefined>;

export function accountingTabFromQuery(raw: string | null | undefined): AccountingTabId | null {
  const value = raw?.trim() || '';
  return ACCOUNTING_TAB_IDS.includes(value as AccountingTabId) ? (value as AccountingTabId) : null;
}

export function accountingPeriodFromQuery(raw: string | null | undefined): AccountingPeriod | null {
  const value = raw?.trim() || '';
  return PERIODS.includes(value as AccountingPeriod) ? (value as AccountingPeriod) : null;
}

export function customerTypeFromQuery(raw: string | null | undefined): CollectionCustomerType {
  const value = raw?.trim() || '';
  return CUSTOMER_TYPES.includes(value as CollectionCustomerType) ? (value as CollectionCustomerType) : 'all';
}

export function paymentMethodFromQuery(raw: string | null | undefined): PosCollectionPaymentMethodKey | null {
  const value = raw?.trim() || '';
  return PAYMENT_METHODS.includes(value as PosCollectionPaymentMethodKey)
    ? (value as PosCollectionPaymentMethodKey)
    : null;
}

export function currencyViewFromQuery(raw: string | null | undefined): PayableCurrencyView {
  const value = raw?.trim() || '';
  return CURRENCIES.includes(value as PayableCurrencyView) ? (value as PayableCurrencyView) : 'all';
}

export function debtViewFromQuery(raw: string | null | undefined): DebtFlowView | null {
  const value = raw?.trim() || '';
  return DEBT_VIEWS.includes(value as DebtFlowView) ? (value as DebtFlowView) : null;
}

export function debtPeriodFromQuery(raw: string | null | undefined): DebtFlowPeriod | null {
  const value = raw?.trim() || '';
  return DEBT_PERIODS.includes(value as DebtFlowPeriod) ? (value as DebtFlowPeriod) : null;
}

export function monthFromQuery(raw: string | null | undefined): string | null {
  const value = raw?.trim() || '';
  return /^\d{4}-\d{2}$/.test(value) ? value : null;
}

export function pageFromQuery(raw: string | null | undefined): number {
  const page = Number(raw);
  return Number.isInteger(page) && page > 1 ? page : 1;
}

/** Solo las claves que cambiaron. `null` o vacío quita el parámetro. */
export function diffQuery(current: ParamMap, patch: QueryPatch): Record<string, string | null> | null {
  const queryParams: Record<string, string | null> = {};
  let changed = false;
  for (const [key, raw] of Object.entries(patch)) {
    const next = raw == null || String(raw).trim() === '' ? null : String(raw);
    const now = current.get(key);
    if ((now ?? null) !== next) {
      changed = true;
      queryParams[key] = next;
    }
  }
  return changed ? queryParams : null;
}

export function replaceQuery(router: Router, route: ActivatedRoute, patch: QueryPatch): Promise<boolean> {
  const queryParams = diffQuery(route.snapshot.queryParamMap, patch);
  if (!queryParams) return Promise.resolve(false);
  return router.navigate([], {
    relativeTo: route,
    queryParams,
    queryParamsHandling: 'merge',
    replaceUrl: true,
  });
}
