import { ReportPeriod } from '../../../core/components/report-period-selector/report-period-selector.component';
import { PosUserSummary } from '../../sales-orders/models/sales-order.model';

export type AccountingPeriod = Exclude<ReportPeriod, 'year'>;

export type PosCollectionDateBasis = 'shift' | 'collected';

export interface AccountingPeriodQuery {
  period: AccountingPeriod;
  billing_branch_id?: string;
  date_from?: string;
  date_to?: string;
  /** `collected` = día de cobro. `shift` = fecha del corte. */
  date_basis?: PosCollectionDateBasis;
}

export interface AccountingFiltersApplied {
  billing_branch_id?: string | null;
  period: AccountingPeriod;
  date_from?: string | null;
  date_to?: string | null;
  date_basis?: PosCollectionDateBasis | null;
}

export type PosTerminalType = 'VENTAS' | 'COBRANZA';

export interface PosOpenDailyShiftSummary {
  id: string;
  shift_date: string;
  status: string;
  partial_shifts_count?: number;
}

export interface SalesTerminalSummary {
  terminal_user_id: string;
  terminal_name: string;
  terminal_type: PosTerminalType;
  sales_count: number;
  amount_sold: number;
  orders_collected?: number;
  amount_collected?: number;
  daily_shifts_count: number;
  partial_shifts_count: number;
  open_daily_shift: PosOpenDailyShiftSummary | null;
}

export interface CollectionTerminalSummary {
  terminal_user_id: string | null;
  terminal_name: string | null;
  orders_collected: number;
  amount_collected: number;
  walk_in_count: number;
  invoiced_count: number;
  daily_shifts_count: number;
  partial_shifts_count: number;
  open_daily_shift: PosOpenDailyShiftSummary | null;
}

export interface PosDaySummary {
  orders_entered: number;
  amount_entered: number;
  orders_collected: number;
  amount_collected: number;
  orders_pending: number;
  amount_pending: number;
}

export interface PosEnteredOrder {
  id: string;
  folio?: string | null;
  created_at: string;
  total: number;
  payment_status?: string | null;
  channel?: 'caja' | 'branch' | null;
  terminal_name?: string | null;
  customer_display_name?: string | null;
  amount_collected: number;
}

export interface PosSummaryResponse {
  filters_applied: AccountingFiltersApplied;
  summary: PosDaySummary;
  entered_orders: PosEnteredOrder[];
  sales_terminals: SalesTerminalSummary[];
  collection_terminal: CollectionTerminalSummary | null;
}

export interface PosTerminalSaleRow {
  id: string;
  folio?: string;
  created_at: string;
  customer_company_name?: string | null;
  customer_person_name?: string | null;
  customer_display_name?: string;
  is_walk_in?: boolean;
  seller_user?: PosUserSummary | null;
  total?: number | string;
  payment_status?: string;
}

export type CollectionCustomerType = 'all' | 'walk_in' | 'invoiced';

export interface PosCollectionBranch {
  id?: string | null;
  code?: string | null;
  city?: string | null;
  label?: string | null;
}

export interface PosCollectionsSummary {
  orders_collected: number;
  amount_collected: number;
  walk_in_count: number;
  invoiced_count: number;
}

export interface PosCollectionsPage extends AccountingPaginatedResponse<PosCollectionRow, PosCollectionsSummary> {
  filtered_amount: number;
  filters_applied: AccountingFiltersApplied;
}

export interface PosCollectionRow {
  id: string;
  folio?: string;
  created_at: string;
  collected_at?: string;
  shift_date?: string | null;
  billing_branch?: PosCollectionBranch | null;
  customer_company_name?: string | null;
  customer_person_name?: string | null;
  customer_display_name?: string;
  walk_in_name?: string | null;
  walk_in_rfc?: string | null;
  is_walk_in?: boolean;
  has_stamped_invoice?: boolean;
  seller_user?: PosUserSummary | null;
  collected_by_user?: PosUserSummary | null;
  payment_method?: string | null;
  payment_method_label?: string | null;
  total?: number | string;
  payment_status?: string;
}

export type PayableCurrencyView = 'all' | 'mxn' | 'usd';

export interface AccountsPayableVendorRow {
  vendor_id: string;
  vendor_name?: string;
  razon_social?: string | null;
  company_name?: string | null;
  pending_order_count: number;
  pending_order_count_mxn: number;
  pending_order_count_usd: number;
  amount_pending: number;
  amount_pending_mxn: number;
  amount_pending_usd: number;
  progress_percentage: number;
  progress_percentage_mxn: number;
  progress_percentage_usd: number;
  amount_pending_total_mxn?: number | null;
  credit_limit?: number | null;
  total_committed?: number | null;
  total_committed_mxn?: number | null;
  total_committed_usd?: number | null;
}

export interface AccountsPayableVendorDetail {
  vendor_id: string;
  vendor_name?: string;
  razon_social?: string;
  company_name?: string;
  amount_pending: number;
  pending_order_count: number;
  orders: AccountsPayableOrderRow[];
}

export interface AccountsPayableOrderRow {
  id: string;
  folio?: string;
  created_at?: string;
  expected_delivery_date?: string;
  amount_paid?: number | string;
  amount_pending?: number | string;
  status?: string;
  general_status?: string;
}

export interface AccountsReceivableRow {
  razon_social: string;
  fiscal_rfc?: string | null;
  pending_order_count: number;
  pending_order_count_mxn?: number;
  pending_order_count_usd?: number;
  amount_pending: number;
  amount_pending_mxn?: number;
  amount_pending_usd?: number;
  amount_pending_total_mxn?: number | null;
  customer_count?: number;
}

export interface AccountsReceivableDetail {
  razon_social: string;
  fiscal_rfc?: string;
  amount_pending: number;
  amount_pending_mxn?: number;
  amount_pending_usd?: number;
  pending_order_count: number;
  pending_order_count_mxn?: number;
  pending_order_count_usd?: number;
  orders: AccountsReceivableOrderRow[];
}

export interface AccountsReceivableOrderRow {
  id: string;
  folio?: string;
  currency?: 'MXN' | 'USD' | string;
  created_at?: string;
  customer_display_name?: string;
  seller_user?: PosUserSummary | null;
  total?: number | string;
  expected_delivery_date?: string;
  delivery_date?: string;
}

export interface AccountingDailyShiftPartial {
  id: string;
  partial_number?: number;
  removed_total_mxn?: number;
  removed_total_usd?: number;
  created_at?: string;
  notes?: string | null;
  performed_by_user?: PosUserSummary | null;
}

export interface AccountingDailyShiftRow {
  id: string;
  shift_date: string;
  status: string;
  is_previous_day?: boolean;
  opening_cash_mxn?: number;
  opening_cash_usd?: number;
  terminal_name?: string | null;
  terminal_user?: PosUserSummary | null;
  billing_branch?: { id?: string; code?: string; display_name?: string } | null;
  partial_shifts_count: number;
  removed_total_mxn?: number;
  partial_shifts?: AccountingDailyShiftPartial[];
}

export interface AccountingPaginatedResponse<T, S = undefined> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
  summary?: S;
}

export interface AccountsPayableListSummary {
  currency?: PayableCurrencyView;
  total_vendors?: number;
  total_amount_pending?: number;
  total_amount_pending_mxn?: number;
  total_amount_pending_usd?: number;
  total_pending_orders_mxn?: number;
  total_pending_orders_usd?: number;
  exchange_rate?: number | null;
  exchange_rate_date?: string | null;
  total_amount_pending_total_mxn?: number | null;
}

export interface AccountsReceivableListSummary {
  currency?: PayableCurrencyView;
  total_accounts?: number;
  total_amount_pending?: number;
  total_amount_pending_mxn?: number;
  total_amount_pending_usd?: number;
  total_pending_orders_mxn?: number;
  total_pending_orders_usd?: number;
  exchange_rate?: number | null;
  exchange_rate_date?: string | null;
  total_amount_pending_total_mxn?: number | null;
}

export interface AverageCostReportRow {
  id: string;
  sales_order_id: string | null;
  customer_name: string;
  document: string;
  date: string;
  type_code: number;
  type_label: string;
  status_code: number;
  status_label: string;
  amount: number;
  discount: number;
  tax: number;
  sale_total: number;
  cost_total: number;
  margin_amount: number;
  margin_percent: number | null;
  source_currency: string;
  exchange_rate: number | null;
  currency: string;
  reversal: boolean;
}

export interface AverageCostReportSummary {
  document_count: number;
  amount: number;
  discount: number;
  tax: number;
  sale_total: number;
  cost_total: number;
  profit: number;
  margin_percent: number | null;
  has_foreign_currency: boolean;
  date_from?: string;
  date_to?: string;
  branch_label?: string;
}
