import { ReportPeriod } from '../../../core/components/report-period-selector/report-period-selector.component';
import { PosUserSummary } from '../../sales-orders/models/sales-order.model';

export type AccountingPeriod = Exclude<ReportPeriod, 'year'>;

export interface AccountingPeriodQuery {
  period: AccountingPeriod;
  billing_branch_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface AccountingFiltersApplied {
  billing_branch_id?: string | null;
  period: AccountingPeriod;
  date_from?: string | null;
  date_to?: string | null;
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

export interface PosSummaryResponse {
  filters_applied: AccountingFiltersApplied;
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

export interface PosCollectionRow {
  id: string;
  folio?: string;
  created_at: string;
  collected_at?: string;
  customer_company_name?: string | null;
  customer_person_name?: string | null;
  customer_display_name?: string;
  is_walk_in?: boolean;
  has_stamped_invoice?: boolean;
  seller_user?: PosUserSummary | null;
  collected_by_user?: PosUserSummary | null;
  payment_method?: string | null;
  total?: number | string;
  payment_status?: string;
}

export interface AccountsPayableVendorRow {
  vendor_id: string;
  vendor_name?: string;
  razon_social?: string;
  company_name?: string;
  pending_order_count: number;
  amount_pending: number;
  progress_percentage: number;
  credit_limit?: number | null;
  total_committed?: number | null;
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
  fiscal_rfc?: string;
  pending_order_count: number;
  amount_pending: number;
}

export interface AccountsReceivableDetail {
  razon_social: string;
  fiscal_rfc?: string;
  amount_pending: number;
  pending_order_count: number;
  orders: AccountsReceivableOrderRow[];
}

export interface AccountsReceivableOrderRow {
  id: string;
  folio?: string;
  created_at?: string;
  customer_display_name?: string;
  seller_user?: PosUserSummary | null;
  total?: number | string;
  expected_delivery_date?: string;
  delivery_date?: string;
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
  total_vendors?: number;
  total_amount_pending?: number;
}

export interface AccountsReceivableListSummary {
  total_accounts?: number;
  total_amount_pending?: number;
}
