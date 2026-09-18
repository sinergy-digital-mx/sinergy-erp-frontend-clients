import { formatPosMoney } from './pos-daily-shift.model';
import { paymentMethodLabel } from './pos-collected-sales.model';

export interface PosSaleCollectionCustomer {
  id?: number;
  display_name?: string;
  name?: string;
  is_walk_in?: boolean;
}

export interface PosSaleCollection {
  customer_id?: number;
  customer?: PosSaleCollectionCustomer;
  payment_method?: string;
  order_total_mxn?: number | string;
  amount_cash_mxn?: number | string;
  amount_cash_usd?: number | string;
  usd_exchange_rate?: number | string;
  amount_transfer_mxn?: number | string;
  transfer_reference?: string | null;
  amount_card_mxn?: number | string;
  card_reference?: string | null;
  card_payments?: Array<{ amount_mxn?: number | string; reference?: string | null }>;
  amount_check_mxn?: number | string;
  check_reference?: string | null;
  amount_credit_mxn?: number | string;
  received_cash_mxn?: number | string;
  received_cash_usd?: number | string;
  change_cash_mxn?: number | string;
  change_cash_usd?: number | string;
  collected_at?: string;
}

export type PosCardPaymentRow = {
  amount_mxn: number;
  reference: string | null;
};

export function posCollectionCardRows(
  pay:
    | Pick<PosSaleCollection, 'amount_card_mxn' | 'card_reference' | 'card_payments'>
    | Record<string, unknown>
    | null
    | undefined,
): PosCardPaymentRow[] {
  if (!pay) {
    return [];
  }
  const record = pay as Record<string, unknown>;
  const raw = record['card_payments'];
  if (Array.isArray(raw) && raw.length > 0) {
    return raw
      .map((item) => {
        const row = (item ?? {}) as Record<string, unknown>;
        return {
          amount_mxn: Number(row['amount_mxn'] ?? 0),
          reference: row['reference'] != null && String(row['reference']).trim()
            ? String(row['reference']).trim()
            : null,
        };
      })
      .filter((item) => item.amount_mxn > 0);
  }
  const amount = Number(record['amount_card_mxn'] ?? 0);
  if (!(amount > 0)) {
    return [];
  }
  const reference =
    record['card_reference'] != null && String(record['card_reference']).trim()
      ? String(record['card_reference']).trim()
      : null;
  return [{ amount_mxn: amount, reference }];
}

export function normalizePosSaleCollection(raw: unknown): PosSaleCollection | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  return raw as PosSaleCollection;
}

export function posCollectionMoneyLabel(value: unknown): string {
  return formatPosMoney(value as number | string);
}

export function posCollectionUsdLabel(value: unknown): string {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function posCollectionMethodLabel(method?: string | null): string {
  return paymentMethodLabel(method);
}

export function posCollectionCustomerLabel(collection?: PosSaleCollection | null): string | null {
  const customer = collection?.customer;
  if (customer?.display_name?.trim()) {
    return customer.is_walk_in
      ? `${customer.display_name.trim()} (mostrador)`
      : customer.display_name.trim();
  }
  if (customer?.name?.trim()) {
    return customer.is_walk_in ? `${customer.name.trim()} (mostrador)` : customer.name.trim();
  }
  return null;
}
