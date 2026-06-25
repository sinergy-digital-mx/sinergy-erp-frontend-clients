import { formatPosMoney } from './pos-daily-shift.model';

export type PosPaymentMethod = 'cash' | 'card' | 'transfer' | 'mixed' | string;

export interface CollectedSalePayment {
  payment_method?: PosPaymentMethod;
  order_total_mxn?: number | string;
  amount_cash_mxn?: number | string;
  amount_cash_usd?: number | string;
  usd_exchange_rate?: number | string;
  amount_transfer_mxn?: number | string;
  transfer_reference?: string | null;
  amount_card_mxn?: number | string;
  card_reference?: string | null;
  received_cash_mxn?: number | string;
  received_cash_usd?: number | string;
  change_cash_mxn?: number | string;
  change_cash_usd?: number | string;
}

export interface CollectedSaleItem {
  collection_id?: string;
  collected_at?: string;
  payment?: CollectedSalePayment;
  sales_order?: {
    id?: string;
    folio?: string;
    total?: number | string;
  };
  customer?: {
    id?: number;
    name?: string;
    is_walk_in?: boolean;
  };
  seller_user?: {
    first_name?: string;
    last_name?: string;
    pos_user_code?: number | null;
  };
  collected_by_user?: {
    first_name?: string;
    last_name?: string;
  };
}

export interface CollectedSalesSummary {
  count?: number;
  total_mxn?: number | string;
  cash_mxn?: number | string;
  cash_usd?: number | string;
  transfer_mxn?: number | string;
  card_mxn?: number | string;
}

export interface CollectedSalesResponse {
  daily_shift: unknown | null;
  collected_sales: CollectedSaleItem[];
  summary: CollectedSalesSummary | null;
}

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash: 'Efectivo',
  transfer: 'Transferencia',
  card: 'Tarjeta',
  mixed: 'Mixto',
};

export function paymentMethodLabel(method?: string | null): string {
  if (!method) {
    return '—';
  }
  return PAYMENT_METHOD_LABELS[method] ?? method;
}

export function collectedSaleFolio(item: CollectedSaleItem): string {
  return item.sales_order?.folio || item.sales_order?.id?.substring(0, 8) || '—';
}

export function collectedSaleTotal(item: CollectedSaleItem): string {
  const total = item.payment?.order_total_mxn ?? item.sales_order?.total;
  return formatPosMoney(total);
}

export function collectedSaleCustomerLabel(item: CollectedSaleItem): string {
  const c = item.customer;
  if (!c?.name) {
    return 'Mostrador';
  }
  return c.is_walk_in ? `${c.name} (mostrador)` : c.name;
}

export function collectedSaleSellerLabel(item: CollectedSaleItem): string {
  const s = item.seller_user;
  if (!s) {
    return '—';
  }
  const name = `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim();
  if (name && s.pos_user_code) {
    return `${name} (${s.pos_user_code})`;
  }
  return name || (s.pos_user_code ? `Código ${s.pos_user_code}` : '—');
}

export function collectedByLabel(item: CollectedSaleItem): string {
  const u = item.collected_by_user;
  if (!u) {
    return '—';
  }
  return `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() || '—';
}

export function normalizeCollectedSalesResponse(payload: unknown): CollectedSalesResponse {
  const obj = (payload ?? {}) as Record<string, unknown>;
  const raw =
    obj['collected_sales'] ??
    obj['data'] ??
    (Array.isArray(payload) ? payload : []);
  const collected_sales = Array.isArray(raw) ? (raw as CollectedSaleItem[]) : [];
  const summary = (obj['summary'] as CollectedSalesSummary) ?? null;
  return {
    daily_shift: obj['daily_shift'] ?? null,
    collected_sales,
    summary,
  };
}
