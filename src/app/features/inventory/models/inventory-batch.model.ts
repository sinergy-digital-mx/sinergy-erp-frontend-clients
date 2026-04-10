export interface InventoryBatchMovementSummary {
  total_movements: number;
  total_out: number;
  total_in: number;
  by_type: {
    orders: number;
    transfers_out: number;
    transfers_in: number;
    adjustments: number;
  };
}

export interface InventoryBatch {
  id: string;
  batch_number: string;
  warehouse_id: string;
  warehouse_name: string;
  product_id: string;
  product_name: string;
  product_sku: string;
  uom_id: string;
  uom_name: string;
  quantity: number | string;
  // Detail-only fields
  initial_quantity?: string;
  available_quantity?: string;
  quantity_consumed?: string;
  availability_percentage?: number;
  movement_summary?: InventoryBatchMovementSummary;
  // Optional legacy
  quantity_available?: number | string;
  purchase_order_batch_id: string | null;
  purchase_order_id: string | null;
  purchase_order_detail_id: string | null;
  purchase_order_folio: string | null;
  created_by: string;
  created_at: string;
}

export interface InventoryBatchResponse {
  data: InventoryBatch[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
