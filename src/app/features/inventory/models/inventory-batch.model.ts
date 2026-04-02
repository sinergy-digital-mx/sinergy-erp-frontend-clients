export interface InventoryBatch {
  id: string;
  batch_number: string;
  warehouse: {
    id: string;
    name: string;
  };
  product: {
    id: string;
    name: string;
    sku?: string;
  };
  uom: {
    id: string;
    name: string;
  };
  quantity: number;
  purchase_order?: {
    id: string;
    folio: string;
  };
  created_by: string;
  created_at: string;
}

export interface InventoryBatchResponse {
  data: InventoryBatch[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
