export type DashboardScope = 'period' | 'all_time';
export type DashboardFilterMode = 'all_time' | 'month' | 'year';
export type RevenueSeriesPeriod = 'monthly' | 'quarterly' | 'semiannual' | 'annual';

export interface DashboardFilters {
  scope: DashboardScope;
  year: number | null;
  month: number | null;
  mode: DashboardFilterMode;
}

export interface DashboardKpis {
  avg_price_per_m2: number;
  total_sold_amount: number;
  total_sold_m2: number;
  lots_sold: number;
  avg_list_price: number;
  avg_close_price: number;
  list_vs_close_diff_amount: number;
  list_vs_close_diff_pct: number;
  max_price_per_m2: number;
  min_price_per_m2: number;
  cash_pct: number;
  financed_pct: number;
  cash_count: number;
  financed_count: number;
  avg_down_payment: number;
  avg_monthly_payment: number;
}

/** KPIs por año (solo en summary con scope=all_time). */
export interface YearlyBreakdownRow extends DashboardKpis {
  year: number;
}

export interface DashboardSummaryResponse {
  filters: DashboardFilters;
  kpis: DashboardKpis;
  yearly_breakdown?: YearlyBreakdownRow[];
}

export interface SellerRow {
  seller_id: string;
  seller_name: string;
  lots_sold: number;
  revenue: number;
  m2_sold: number;
  tours_count: number;
}

export interface DashboardSellersResponse {
  filters: DashboardFilters;
  rows: SellerRow[];
}

export interface LeadOriginRow {
  origin: string;
  count: number;
  revenue: number;
  pct_of_sales: number;
}

export interface DashboardLeadOriginsResponse {
  filters: DashboardFilters;
  rows: LeadOriginRow[];
}

export interface RevenueSeriesBucket {
  bucket: string;
  revenue: number;
  lots_sold: number;
}

export interface DashboardRevenueSeriesResponse {
  period: RevenueSeriesPeriod | null;
  year: number | null;
  month: number | null;
  series: RevenueSeriesBucket[];
}

export interface DashboardQueryParams {
  scope: DashboardScope;
  year?: number;
  month?: number;
  period?: RevenueSeriesPeriod;
}
