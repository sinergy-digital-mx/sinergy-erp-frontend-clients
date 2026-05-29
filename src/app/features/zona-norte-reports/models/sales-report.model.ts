export type SalesReportPeriod = 'today' | 'week' | 'month' | 'year' | 'range';

export interface SalesReportQueryParams {
  period: SalesReportPeriod;
  commission_rate?: number;
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

export interface SalesReportApiRow {
  billing_branch_id: string;
  branch_code: string;
  branch_initials: string;
  branch_name: string;
  seller_id: string;
  seller_name: string;
  total_sales_count: number;
  amount_sold: number;
  commission_percentage: number;
  commission_amount: number;
}

export interface SalesReportResponse {
  summary: SalesReportSummary;
  filters_applied: SalesReportFiltersApplied;
  rows: SalesReportApiRow[];
}

export interface SellerSalesRow {
  billingBranchId: string;
  branchCode: string;
  branchName: string;
  sellerId: string;
  sellerName: string;
  salesCount: number;
  commissionRatePct: number;
  commissionAmount: number;
  totalSold: number;
}
