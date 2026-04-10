/**
 * Inventory Item entity
 */
export interface InventoryItem {
  id: string;
  tenant_id: string;
  product_id: string;
  warehouse_id: string;
  quantity_on_hand: number;
  quantity_reserved: number;
  quantity_available: number;
  location?: string;
  unit_cost: number;
  total_value: number;
  last_movement_date?: string;
  product?: {
    id: string;
    name: string;
    sku: string;
    base_uom?: string;
  };
  warehouse?: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Inventory filters
 */
export interface InventoryFilters {
  search?: string;
  warehouse_id?: string;
  low_stock?: boolean;
  product_id?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Inventory Summary Batch
 */
export interface InventorySummaryBatch {
  batch_id: string;
  batch_number: string;
  available_quantity: string;
  initial_quantity: string;
  purchase_order_folio: string;
  created_at: string;
}

/**
 * Inventory Summary Item
 */
export interface InventorySummaryItem {
  product_id: string;
  product_name: string;
  product_sku: string;
  warehouse_id: string;
  warehouse_name: string;
  uom_id: string;
  uom_name: string;
  total_available_quantity: string;
  total_initial_quantity: string;
  total_batches: number;
  batches: InventorySummaryBatch[];
}

/**
 * Inventory Summary Filters
 */
export interface InventorySummaryFilters {
  search?: string;
  warehouse_id?: string;
  product_id?: string;
  only_available?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}
