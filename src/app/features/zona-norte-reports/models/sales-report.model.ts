export type SalesReportPeriod = 'today' | 'week' | 'month' | 'year' | 'range';

export type SalesReportView = 'sales' | 'commissions';

export type SalesGoalMetricType = 'amount' | 'sales_count';

export interface SalesReportQueryParams {
  view?: SalesReportView;
  period: SalesReportPeriod;
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface SalesReportSummaryTop {
  id: string;
  name: string;
  pos_user_code?: number | string | null;
  amount: number;
  sales_count: number;
}

export interface SalesReportSummaryBranch {
  billing_branch_id: string;
  branch_name: string;
  sales_count: number;
  amount: number;
}

export interface SalesReportSummary {
  total_sellers: number;
  people_count?: number;
  people_label?: string | null;
  total_sales_count: number;
  total_amount: number;
  average_ticket?: number | null;
  total_commission?: number | null;
  commission_rate?: number | null;
  top?: SalesReportSummaryTop | null;
  branches?: SalesReportSummaryBranch[] | null;
}

export interface SalesReportFiltersApplied {
  view?: SalesReportView;
  fiscal_configuration_id: string | null;
  billing_branch_id: string | null;
  period: SalesReportPeriod;
  period_label?: string | null;
  date_from: string | null;
  date_to: string | null;
  commission_rate: number | null;
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
  average_ticket?: number | null;
  commission_percentage?: number | null;
  commission_amount?: number | null;
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
  view?: SalesReportView;
  view_label?: string | null;
  summary: SalesReportSummary;
  filters_applied: SalesReportFiltersApplied;
  rows: SalesReportApiRow[];
  goals?: SalesReportGoals | null;
}

export interface SellerSalesRow {
  billingBranchId: string;
  branchCode: string;
  branchName: string;
  branchInitials: string;
  sellerId: string;
  sellerName: string;
  sellerPosUserCode: number | string | null;
  sellerDisplayName: string;
  salesCount: number;
  averageTicket: number | null;
  commissionRatePct: number | null;
  commissionAmount: number | null;
  totalSold: number;
  hasGoal: boolean;
  goalMetricType: SalesGoalMetricType | null;
  goalTargetValue: number | null;
  goalCurrentValue: number | null;
  goalProgressPct: number | null;
}

export interface SellerOrdersQueryParams {
  view?: SalesReportView;
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
  seller_name?: string | null;
  assigned_seller_name?: string | null;
  branch_name?: string | null;
  total?: number | string | null;
  amount?: number | string | null;
  payment_status?: string | null;
}

export interface SellerOrdersSummary {
  total_orders?: number;
  total_sales_count?: number;
  total_amount?: number;
}

export interface SellerOrdersSeller {
  id?: string;
  name?: string;
  pos_user_code?: number | string | null;
  role_label?: string | null;
}

export interface SellerOrdersResponse {
  summary?: SellerOrdersSummary | null;
  seller?: SellerOrdersSeller | null;
  orders?: SellerOrderRow[];
  data?: SellerOrderRow[];
  rows?: SellerOrderRow[];
}
