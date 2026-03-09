import { SalesOrderLine } from './sales-order-line.model';

/**
 * Sales Order status enum
 */
export type SalesOrderStatus = 
  | 'draft' 
  | 'confirmed' 
  | 'processing' 
  | 'completed' 
  | 'cancelled';

/**
 * Customer entity (simplified)
 */
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

/**
 * Warehouse entity (simplified)
 */
export interface Warehouse {
  id: string;
  name: string;
  code?: string;
}

/**
 * Sales Order entity
 */
export interface SalesOrder {
  id: string;
  tenant_id: string;
  customer_id?: number;
  warehouse_id: string;
  delivery_date?: string;
  status: SalesOrderStatus;
  total_subtotal: number;
  total_iva: number;
  total_ieps: number;
  grand_total: number;
  lines: SalesOrderLine[];
  customer?: Customer;
  warehouse?: Warehouse;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * Sales Order filters
 */
export interface SalesOrderFilters {
  search?: string;
  status?: SalesOrderStatus;
  customer_id?: number;
  warehouse_id?: string;
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
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Sales Order form data
 */
export interface SalesOrderFormData {
  customer_id?: number;
  warehouse_id: string;
  delivery_date?: string;
  status?: SalesOrderStatus;
  line_items: Array<{
    product_id: string;
    uom_id: string;
    quantity: number;
    unit_price: number;
    iva_percentage: number;
    ieps_percentage: number;
  }>;
  metadata?: Record<string, any>;
}
