export type InventoryMarginSource = 'purchase' | 'configuration' | 'mixed' | 'none';

export interface InventoryMarginSnapshot {
  unit_price: string | null;
  price_list_name: string | null;
  unit_cost: string | null;
  margin_amount: string | null;
  margin_percentage: string | null;
  source: InventoryMarginSource;
  source_label: string;
  hint: string;
  purchase_count: number;
  configuration_count: number;
  missing_count: number;
  cost_basis: string;
  purchase_folio: string | null;
}

export interface InventoryMarginLine {
  label: string;
  detail: string | null;
  amount: string | null;
  currency: 'MXN' | 'USD' | null;
  included: boolean;
}

export interface InventoryMarginGroup {
  title: string;
  note: string | null;
  lines: InventoryMarginLine[];
}

export interface InventoryMarginExplanation {
  margin: InventoryMarginSnapshot;
  headline: string;
  formula_sentence: string;
  price_note: string;
  cost_note: string;
  groups: InventoryMarginGroup[];
}

export interface ProductMarginUom {
  uom_id: string;
  uom_name: string;
  margin_detail: InventoryMarginExplanation;
}

export interface ProductMarginResponse {
  product_id: string;
  product_name: string;
  product_sku: string;
  uoms: ProductMarginUom[];
  empty_reason: string | null;
}
