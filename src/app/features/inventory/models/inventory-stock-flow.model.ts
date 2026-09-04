export type StockFlowPeriod = 'today' | 'week' | 'month' | 'year' | 'range';
export type StockFlowView = 'summary' | 'ledger';

export interface StockFlowQueryParams {
  period: StockFlowPeriod;
  view: StockFlowView;
  date_from?: string;
  date_to?: string;
  fiscal_configuration_id: string;
  billing_branch_id?: string;
  product_id?: string;
  search?: string;
}

export interface StockFlowFiltersApplied {
  period: string;
  period_label: string;
  date_from: string;
  date_to: string;
  fiscal_configuration_id: string;
  billing_branch_id: string | null;
  product_id: string | null;
  view: string;
}

export interface StockFlowSummaryRow {
  product_id: string;
  product_sku: string;
  product_name: string;
  billing_branch_id: string;
  billing_branch_name: string;
  fiscal_configuration_name: string;
  uom_id: string;
  uom_name: string;
  opening_qty: string;
  purchases_qty: string;
  sales_qty: string;
  transfer_in_qty: string;
  transfer_out_qty: string;
  adjustments_qty: string;
  closing_qty: string;
}

export interface StockFlowLedgerRow {
  id: string;
  occurred_at: string;
  product_id: string;
  product_sku: string;
  product_name: string;
  billing_branch_id: string;
  billing_branch_name: string;
  uom_name: string;
  movement_type: string;
  movement_type_label: string;
  title: string;
  description: string;
  quantity_in: string | null;
  quantity_out: string | null;
  balance_after: string;
  reference_folio: string | null;
  is_opening: boolean;
}

export interface StockFlowResponse {
  filters_applied: StockFlowFiltersApplied;
  summary: StockFlowSummaryRow[];
  ledger: StockFlowLedgerRow[];
  total_summary_rows: number;
  total_ledger_rows: number;
}
