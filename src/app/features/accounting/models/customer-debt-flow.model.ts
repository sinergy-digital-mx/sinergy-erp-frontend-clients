export type DebtFlowView = 'aging' | 'ledger';
export type DebtFlowPeriod = 'today' | 'week' | 'month' | 'year' | 'range';
export type DebtMovementType =
  | 'charge'
  | 'payment'
  | 'charge_reversal'
  | 'payment_reversal'
  | 'opening';

export interface DebtFlowQueryParams {
  fiscal_configuration_id: string;
  billing_branch_id?: string;
  customer_id?: number;
  search?: string;
  view: DebtFlowView;
  period: DebtFlowPeriod;
  date_from?: string;
  date_to?: string;
  page?: number;
  limit?: number;
}

export interface DebtFlowFiltersApplied {
  fiscal_configuration_id: string;
  billing_branch_id: string | null;
  customer_id: number | null;
  search: string | null;
  view: DebtFlowView;
  period: DebtFlowPeriod;
  date_from: string;
  date_to: string;
  period_label: string;
}

export interface DebtAgingRow {
  customer_id: number;
  customer_name: string;
  customer_rfc: string | null;
  billing_branch_name: string | null;
  open_order_count: number;
  current: number;
  d1_30: number;
  d31_60: number;
  d61_90: number;
  d91_plus: number;
  total: number;
  credit_days: number | null;
  credit_limit: number | null;
}

export interface DebtAgingTotals {
  customer_count: number;
  open_order_count: number;
  current: number;
  d1_30: number;
  d31_60: number;
  d61_90: number;
  d91_plus: number;
  total: number;
}

export interface DebtLedgerRow {
  id: string;
  occurred_at: string;
  movement_type: DebtMovementType;
  title: string;
  description: string;
  customer_id: number;
  customer_name: string;
  customer_rfc: string | null;
  billing_branch_name: string | null;
  sales_order_id: string | null;
  folio: string | null;
  payment_method: string | null;
  payment_method_label: string | null;
  reference_number: string | null;
  charge_amount: number | null;
  payment_amount: number | null;
  order_balance_after: number | null;
  balance_after: number | null;
  due_date: string | null;
  is_opening: boolean;
}

export interface DebtFlowResponse {
  filters_applied: DebtFlowFiltersApplied;
  aging: DebtAgingRow[];
  aging_totals: DebtAgingTotals;
  ledger: DebtLedgerRow[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
