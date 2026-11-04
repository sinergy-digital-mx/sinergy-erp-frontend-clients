export type StockReplenishmentTrend = 'up' | 'down' | 'flat' | 'none';

export type StockReplenishmentStatus =
  | 'no_movement'
  | 'out'
  | 'reorder'
  | 'fill'
  | 'healthy'
  | 'overstock';

export type StockReplenishmentPriceSource = 'sales' | 'list' | 'none';

export interface StockReplenishmentVendor {
  id: string;
  legal_name: string;
  rfc: string | null;
  product_count: number;
}

export interface StockReplenishmentVendorsResponse {
  vendors: StockReplenishmentVendor[];
}

export interface StockReplenishmentBranch {
  id: string;
  name: string;
}

export interface StockReplenishmentBranchCell {
  branch_id: string;
  on_hand: number;
  sold_qty: number;
  difference: number;
}

export interface StockReplenishmentRow {
  product_id: string;
  sku: string;
  external_sku: string | null;
  name: string;
  uom_name: string | null;
  branches: StockReplenishmentBranchCell[];
  on_hand: number;
  sold_qty: number;
  previous_sold_qty: number;
  difference: number;
  average_price: number | null;
  price_source: StockReplenishmentPriceSource;
  unit_cost: number | null;
  cost_currency: string;
  unit_margin: number | null;
  margin_percent: number | null;
  daily_rate: number;
  trend: StockReplenishmentTrend;
  trend_factor: number;
  min_stock: number;
  max_stock: number;
  days_of_cover: number | null;
  recommended_qty: number;
  status: StockReplenishmentStatus;
  transfer_hint: boolean;
}

export interface StockReplenishmentSummary {
  product_count: number;
  reorder_count: number;
  out_of_stock_count: number;
  no_movement_count: number;
}

export interface StockReplenishmentReport {
  vendor: {
    id: string;
    legal_name: string;
    rfc: string | null;
  };
  period_days: number;
  cover_days: number;
  safety_days: number;
  period_from: string;
  period_to: string;
  period_label: string;
  exchange_rate: number | null;
  formula: string;
  branches: StockReplenishmentBranch[];
  rows: StockReplenishmentRow[];
  summary: StockReplenishmentSummary;
}

export interface StockReplenishmentQuery {
  vendor_id: string;
  period_days: number;
  cover_days: number;
}

export interface PurchaseTotals {
  orderQty: number;
  recommendedQty: number;
  investment: number;
  potentialSales: number;
  potentialProfit: number;
  marginPercent: number | null;
  missingPriceCount: number;
  toBuyCount: number;
}

export function buildPurchaseTotals(
  rows: StockReplenishmentRow[],
  qtyOf: (productId: string) => number,
): PurchaseTotals {
  let orderQty = 0;
  let recommendedQty = 0;
  let investment = 0;
  let potentialSales = 0;
  let potentialProfit = 0;
  let missingPriceCount = 0;
  let toBuyCount = 0;

  for (const row of rows) {
    const qty = Math.max(0, qtyOf(row.product_id) || 0);
    orderQty += qty;
    recommendedQty += row.recommended_qty;
    if (qty > 0) {
      toBuyCount += 1;
    }
    if (qty > 0 && (row.average_price == null || row.unit_cost == null)) {
      missingPriceCount += 1;
    }
    if (qty > 0 && row.unit_cost != null) {
      investment += qty * row.unit_cost;
    }
    if (qty > 0 && row.average_price != null) {
      potentialSales += qty * row.average_price;
    }
    if (qty > 0 && row.unit_margin != null) {
      potentialProfit += qty * row.unit_margin;
    }
  }

  return {
    orderQty,
    recommendedQty,
    investment,
    potentialSales,
    potentialProfit,
    marginPercent: potentialSales > 0 ? (potentialProfit / potentialSales) * 100 : null,
    missingPriceCount,
    toBuyCount,
  };
}
