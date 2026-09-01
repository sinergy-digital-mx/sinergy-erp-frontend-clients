import { PaginatedResponse, PaginationParams } from './inventory-item.model';

export type InventoryAuditStatus = 'draft' | 'submitted' | 'posted' | 'cancelled';

export interface InventoryAuditUser {
  id?: string;
  name: string;
  email?: string;
}

export interface InventoryAuditWarehouse {
  id: string;
  name: string;
  code?: string;
  billing_branch_id?: string;
  billing_branch_code?: string;
  billing_branch_name?: string;
  fiscal_configuration_id?: string;
  fiscal_razon_social?: string;
  fiscal_rfc?: string;
}

export interface InventoryAuditTotals {
  total_lines: number;
  counted_lines: number;
  pending_lines: number;
  lines_with_variance: number;
  total_system_quantity: string;
  total_counted_quantity: string;
  total_variance: string;
}

export interface InventoryAuditLine {
  id: string;
  inventory_batch_id: string;
  batch_number: string;
  product_id?: string;
  product_name?: string;
  product_sku?: string;
  measure?: string | null;
  measure_label?: string | null;
  uom_name?: string;
  system_quantity: string;
  counted_quantity: string | number | null;
  variance: string | number | null;
  reason?: string | null;
  counted_by_user?: InventoryAuditUser | null;
  counted_at?: string | null;
  stock_moved_during_count?: boolean;
  quantity_before_post?: string | null;
  quantity_after_post?: string | null;
}

export interface InventoryAudit {
  id: string;
  folio: string;
  status: InventoryAuditStatus;
  warehouse: InventoryAuditWarehouse;
  product_id?: string | null;
  product_name?: string | null;
  product_sku?: string | null;
  include_empty_lots?: boolean;
  notes?: string | null;
  reject_reason?: string | null;
  cancel_reason?: string | null;
  created_by_user?: InventoryAuditUser | null;
  submitted_by_user?: InventoryAuditUser | null;
  authorized_by_user?: InventoryAuditUser | null;
  rejected_by_user?: InventoryAuditUser | null;
  cancelled_by_user?: InventoryAuditUser | null;
  created_at: string;
  submitted_at?: string | null;
  authorized_at?: string | null;
  rejected_at?: string | null;
  cancelled_at?: string | null;
  totals?: InventoryAuditTotals;
  lines?: InventoryAuditLine[];
}

export interface InventoryAuditContextLot {
  inventory_batch_id?: string;
  batch_id?: string;
  id?: string;
  batch_number: string;
  product_id?: string;
  product_name?: string;
  product_sku?: string;
  measure?: string | null;
  measure_label?: string | null;
  uom_name?: string;
  available_quantity: string | number;
}

export interface InventoryAuditOpenRef {
  id: string;
  folio?: string;
  status?: InventoryAuditStatus;
}

export interface InventoryAuditContext {
  open_audit_id?: string | null;
  open_audit_folio?: string | null;
  open_audit_status?: InventoryAuditStatus | null;
  open_audit?: InventoryAuditOpenRef | null;
  warehouse?: InventoryAuditWarehouse;
  product?: { id: string; name?: string; sku?: string } | null;
  lots?: InventoryAuditContextLot[];
  batches?: InventoryAuditContextLot[];
  preview_lots?: InventoryAuditContextLot[];
  total_lots?: number;
  total_lines?: number;
  total_quantity?: string;
  total_available_quantity?: string;
}

export interface CreateInventoryAuditDto {
  warehouse_id: string;
  product_id?: string;
  include_empty_lots?: boolean;
  notes?: string;
}

export interface PatchAuditLineDto {
  id: string;
  counted_quantity: number;
  reason?: string;
}

export interface AddAuditLineDto {
  inventory_batch_id: string;
  counted_quantity?: number;
  reason?: string;
}

export interface InventoryAuditFilters {
  search?: string;
  status?: InventoryAuditStatus | '';
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  warehouse_id?: string;
  product_id?: string;
  created_from?: string;
  created_to?: string;
}

export interface BatchAuditHistoryEntry {
  audit_id?: string;
  id?: string;
  folio: string;
  status?: InventoryAuditStatus;
  system_quantity: string | number;
  counted_quantity: string | number | null;
  variance: string | number | null;
  counted_by_user?: InventoryAuditUser | null;
  authorized_by_user?: InventoryAuditUser | null;
  counted_at?: string | null;
  authorized_at?: string | null;
  posted_at?: string | null;
  reason?: string | null;
}

export type InventoryAuditListResponse = PaginatedResponse<InventoryAudit>;

export type { PaginationParams };
