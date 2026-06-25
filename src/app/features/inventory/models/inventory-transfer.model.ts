import { PaginatedResponse, PaginationParams } from './inventory-item.model';

export interface TransferContextBatch {
  batch_id: string;
  batch_number: string;
  available_quantity: string;
  purchase_order_folio?: string | null;
  source_tag_identifier?: string | null;
}

export interface TransferContextWarehouse {
  id: string;
  name: string;
  billing_branch: {
    id: string;
    code: string;
    city: string;
    state: string;
  };
}

export interface TransferContext {
  product_id: string;
  product_name: string;
  product_sku: string;
  uom_id: string;
  uom_name: string;
  total_available_quantity: string;
  total_batches: number;
  source_warehouse: TransferContextWarehouse;
  batches: TransferContextBatch[];
}

export interface CreateTransferLineDto {
  inventory_batch_id: string;
  quantity: number;
}

export interface CreateTransferDto {
  product_id: string;
  uom_id: string;
  source_warehouse_id: string;
  destination_warehouse_id: string;
  notes?: string;
  lines: CreateTransferLineDto[];
}

export interface TransferWarehouseSummary {
  id: string;
  name: string;
  billing_branch_code: string;
}

export interface TransferLine {
  source_batch_id?: string;
  source_batch_number: string;
  destination_batch_id?: string;
  destination_batch_number: string;
  quantity: string;
}

export interface InventoryTransfer {
  id: string;
  folio: string;
  product_id: string;
  product_name: string;
  product_sku: string;
  uom_id?: string;
  uom_name: string;
  total_quantity: string;
  notes?: string | null;
  source_warehouse: TransferWarehouseSummary;
  destination_warehouse: TransferWarehouseSummary;
  lines?: TransferLine[];
  created_by_user: { name: string; email: string };
  created_at: string;
}

export interface TransferFilters {
  search?: string;
  product_id?: string;
  source_warehouse_id?: string;
  destination_warehouse_id?: string;
  source_billing_branch_id?: string;
  destination_billing_branch_id?: string;
  created_from?: string;
  created_to?: string;
}

export interface BatchTransferHistoryEntry {
  transfer_id?: string;
  transfer_folio: string;
  direction: 'in' | 'out';
  quantity: string;
  related_batch_id?: string;
  related_batch_number: string;
  warehouse_name: string;
  created_at?: string;
}

export interface CreateTransferDialogData {
  product_id: string;
  warehouse_id: string;
  preselected_batch_id?: string;
  preselected_quantity?: number;
}

export type TransferListResponse = PaginatedResponse<InventoryTransfer>;

export type { PaginationParams };
