export type SalesReportPeriod = 'today' | 'week' | 'month' | 'year' | 'range';

export type SalesGoalMetricType = 'amount' | 'sales_count';

export interface SalesReportQueryParams {
  period: SalesReportPeriod;
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface SalesReportSummary {
  total_sellers: number;
  total_sales_count: number;
  total_amount: number;
}

export interface SalesReportFiltersApplied {
  fiscal_configuration_id: string | null;
  billing_branch_id: string | null;
  period: SalesReportPeriod;
  date_from: string | null;
  date_to: string | null;
  commission_rate: number;
}

export interface SalesReportRowGoal {
  has_goal: boolean;
  metric_type?: SalesGoalMetricType;
  target_value?: number;
  current_value?: number;
  progress_percentage?: number;
}

export interface SalesReportApiRow {
  billing_branch_id: string;
  branch_code: string;
  branch_initials: string;
  branch_name: string;
  seller_id: string;
  seller_name: string;
  seller_pos_user_code?: number | string | null;
  total_sales_count: number;
  amount_sold: number;
  commission_percentage: number;
  commission_amount: number;
  goal?: SalesReportRowGoal | null;
}

export interface SalesReportBranchGoal {
  goal_id: string;
  billing_branch_id: string;
  branch_name: string;
  metric_type: SalesGoalMetricType;
  target_value: number;
  current_value: number;
  progress_percentage: number;
}

export interface SalesReportUserRoleGoal {
  goal_id: string;
  role_name: string;
  metric_type: SalesGoalMetricType;
  target_value: number;
}

export interface SalesReportGoals {
  has_active_goals: boolean;
  message: string | null;
  branch_goal: SalesReportBranchGoal | null;
  user_role_goal: SalesReportUserRoleGoal | null;
}

export interface SalesReportResponse {
  summary: SalesReportSummary;
  filters_applied: SalesReportFiltersApplied;
  rows: SalesReportApiRow[];
  goals?: SalesReportGoals | null;
}

export interface SellerSalesRow {
  billingBranchId: string;
  branchCode: string;
  branchName: string;
  sellerId: string;
  sellerName: string;
  sellerPosUserCode: number | string | null;
  sellerDisplayName: string;
  salesCount: number;
  commissionRatePct: number;
  commissionAmount: number;
  totalSold: number;
  hasGoal: boolean;
  goalMetricType: SalesGoalMetricType | null;
  goalTargetValue: number | null;
  goalCurrentValue: number | null;
  goalProgressPct: number | null;
}

export interface SellerOrdersQueryParams {
  seller_id: string;
  billing_branch_id: string;
  period: SalesReportPeriod;
  fiscal_configuration_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface SellerOrderRow {
  id: string;
  folio?: string | null;
  created_at?: string | null;
  order_date?: string | null;
  customer_display_name?: string | null;
  customer_company_name?: string | null;
  customer_person_name?: string | null;
  customer_name?: string | null;
  is_walk_in?: boolean;
  total?: number | string | null;
  amount?: number | string | null;
  payment_status?: string | null;
}

export interface SellerOrdersSummary {
  total_orders?: number;
  total_sales_count?: number;
  total_amount?: number;
}

export interface SellerOrdersResponse {
  summary?: SellerOrdersSummary | null;
  orders?: SellerOrderRow[];
  data?: SellerOrderRow[];
  rows?: SellerOrderRow[];
}
