export type CustomerSalesReportPeriod = 'today' | 'week' | 'month' | 'year' | 'range';

export interface CustomerSalesReportQueryParams {
  period: CustomerSalesReportPeriod;
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  date_from?: string;
  date_to?: string;
  limit?: number;
}

export interface CustomerSalesReportSummaryTop {
  customer_id: number;
  name: string;
  amount: number;
  sales_count: number;
}

export interface CustomerSalesReportSummaryBranch {
  billing_branch_id: string;
  branch_name: string;
  sales_count: number;
  amount: number;
}

export interface CustomerSalesReportSummary {
  customers_count: number;
  total_sales_count: number;
  total_amount: number;
  average_ticket?: number | null;
  top?: CustomerSalesReportSummaryTop | null;
  branches?: CustomerSalesReportSummaryBranch[] | null;
}

export interface CustomerSalesReportFiltersApplied {
  fiscal_configuration_id: string | null;
  billing_branch_id: string | null;
  period: CustomerSalesReportPeriod;
  period_label?: string | null;
  date_from: string | null;
  date_to: string | null;
  limit: number;
}

export interface CustomerSalesReportApiRow {
  rank: number;
  customer_id: number;
  customer_name: string;
  customer_rfc?: string | null;
  total_sales_count: number;
  total_purchased: number;
  average_ticket?: number | null;
  last_purchased_at?: string | null;
}

export interface CustomerSalesReportResponse {
  view_label?: string | null;
  summary: CustomerSalesReportSummary;
  filters_applied: CustomerSalesReportFiltersApplied;
  rows: CustomerSalesReportApiRow[];
}

export interface CustomerSalesRow {
  rank: number;
  customerId: number;
  customerName: string;
  customerRfc: string | null;
  salesCount: number;
  totalPurchased: number;
  averageTicket: number | null;
}
