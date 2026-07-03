import { SalesPaymentStatus } from './sales-order.model';

export type SalesOrderPaymentMethod = 'cash' | 'card' | 'transfer' | 'mixed';
export type SalesOrderPaymentSource = 'manual' | 'pos_cobranza';
export type SalesOrderPaymentCurrency = 'MXN' | 'USD';

export interface SalesOrderPaymentDocument {
  id: string;
  payment_id?: string;
  file_name?: string;
  file_size?: number;
  notes?: string | null;
  url?: string;
  uploaded_at?: string;
}

export interface SalesOrderPayment {
  id: string;
  amount: number | string;
  payment_date: string;
  payment_method: SalesOrderPaymentMethod | string;
  currency?: SalesOrderPaymentCurrency | string;
  reference_number?: string | null;
  notes?: string | null;
  source?: SalesOrderPaymentSource | string;
  documents?: SalesOrderPaymentDocument[];
  created_by?: string;
  created_by_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SalesOrderPaymentsSummary {
  order_total?: number | string;
  amount_paid: number | string;
  amount_pending: number | string;
  payment_status: SalesPaymentStatus | string;
  currency?: SalesOrderPaymentCurrency | string;
}

export interface RegisterSalesOrderPaymentPayload {
  amount: number;
  payment_date: string;
  payment_method: SalesOrderPaymentMethod;
  currency?: SalesOrderPaymentCurrency;
  reference_number?: string;
  notes?: string;
}

export interface RegisterSalesOrderPaymentResponse {
  payment: SalesOrderPayment;
  summary: SalesOrderPaymentsSummary;
}

export interface SalesOrderPaymentsListResponse {
  payments?: SalesOrderPayment[];
  summary?: SalesOrderPaymentsSummary;
  data?: {
    payments?: SalesOrderPayment[];
    summary?: SalesOrderPaymentsSummary;
  };
}

export const SALES_ORDER_PAYMENT_METHOD_LABELS: Record<SalesOrderPaymentMethod, string> = {
  cash: 'Efectivo',
  card: 'Tarjeta',
  transfer: 'Transferencia',
  mixed: 'Mixto',
};

export function salesOrderPaymentMethodLabel(method?: string | null): string {
  if (!method) return '—';
  const key = method.toLowerCase() as SalesOrderPaymentMethod;
  return SALES_ORDER_PAYMENT_METHOD_LABELS[key] ?? method;
}

export function isManualSalesOrderPayment(payment: SalesOrderPayment): boolean {
  return (payment.source ?? 'manual') === 'manual';
}
