export interface BranchReportProductHit {
  id: string;
  sku: string;
  name: string;
}

export interface BranchReportSettingsBranch {
  id: string;
  name: string;
  city: string | null;
  razon_social: string | null;
  visible: boolean;
}

export interface BranchReportSettings {
  configured: boolean;
  branches: BranchReportSettingsBranch[];
}

export interface BranchReportLine {
  billing_branch_id: string;
  name: string;
  city: string | null;
  razon_social: string | null;
  uom_name: string | null;
  quantity: string;
  average_unit_cost: string | null;
  total_cost: string | null;
  cost_complete: boolean;
}

export interface BranchStockReport {
  product: BranchReportProductHit;
  uom_name: string | null;
  mixed_uom: boolean;
  total_quantity: string | null;
  average_unit_cost: string | null;
  total_cost: string | null;
  cost_complete: boolean;
  lines: BranchReportLine[];
}
