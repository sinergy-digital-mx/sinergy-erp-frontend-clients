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
  purchase_order_batch_id: string;
  purchase_order_id: string;
  purchase_order_detail_id: string;
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
