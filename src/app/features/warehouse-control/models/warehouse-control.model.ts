export interface WarehouseControlUserSummary {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface WarehouseControlCustomerSummary {
  id?: string | number;
  display_name?: string;
  name?: string;
  lastname?: string;
  company_name?: string;
}

export interface WarehouseControlBranchSummary {
  id?: string;
  display_name?: string;
  code?: string;
}

export interface WarehouseControlWarehouseSummary {
  id?: string;
  name?: string;
  code?: string;
}

export interface WarehouseControlLine {
  id?: string;
  product_id?: string;
  product_name?: string;
  product_sku?: string;
  uom_name?: string;
  quantity?: number | string;
  quantity_base_uom?: number | string;
  warehouse_id?: string;
  warehouse_name?: string;
  available_quantity?: number | string;
}

export interface WarehouseControlOrder {
  id: string;
  folio?: string;
  expected_delivery_date?: string | null;
  total?: number | string;
  payment_status?: string;
  notes?: string | null;
  general_status?: string;
  created_at?: string;
  customer?: WarehouseControlCustomerSummary;
  billing_branch?: WarehouseControlBranchSummary;
  warehouse?: WarehouseControlWarehouseSummary;
  created_by_user?: WarehouseControlUserSummary | null;
  line_items?: WarehouseControlLine[];
  lines?: WarehouseControlLine[];
}

export interface WarehouseControlFilters {
  search?: string;
  billing_branch_id?: string;
  warehouse_id?: string;
}

export interface WarehouseControlPagination {
  page: number;
  limit: number;
}

export interface WarehouseControlListResponse {
  data: WarehouseControlOrder[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface CorroboratePayload {
  notes?: string;
}
