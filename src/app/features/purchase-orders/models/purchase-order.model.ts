import { LineItem } from './line-item.model';
import { Payment } from './payment.model';
import { Warehouse } from './warehouse.model';
import { Vendor } from './vendor.model';

// Re-export LineItem for convenience
export type { LineItem } from './line-item.model';

/**
 * Batch entity for inventory tracking
 */
export interface Batch {
  id: string;
  batch_number: string;
  warehouse_id: string;
  warehouse_name?: string;
  product_id: string;
  product_name?: string;
  product_sku?: string;
  uom_id: string;
  uom_name?: string;
  quantity: number | string;
  purchase_order_batch_id: string;
  purchase_order_id?: string;
  purchase_order_detail_id: string;
  created_by: string;
  created_at: string;
}

/**
 * Order status enum
 */
export type OrderStatus = 'Creada' | 'En Proceso' | 'Recibida' | 'Cancelada';

/**
 * Payment status enum
 */
export type PaymentStatus = 'Pagada' | 'Parcial' | 'Pendiente' | 'No pagado';

/**
 * Document entity
 */
export interface Document {
  id: string;
  purchase_order_id: string;
  document_type_id: number;
  document_name: string;
  document_type_name: string;
  file_path: string;
  file_key: string;
  uploaded_by: string;
  uploaded_by_name: string;
  uploaded_at: string;
  key: string;
  path: string;
  name?: string;
  url?: string;
  type?: string;
  size?: number;
}

/**
 * User entity
 */
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

/**
 * Purchase Order main entity
 */
export interface PurchaseOrder {
  id: string;
  tenant_id: string;
  vendor_id: string;
  creator_id: string;
  purpose: string;
  warehouse_id: string;
  folio?: string;
  tentative_receipt_date: string; // ISO 8601 date string
  expected_delivery_date?: string;
  status: OrderStatus;
  general_status?: OrderStatus;
  cancellation_date?: string;
  cancellation_reason?: string;
  payment_status: PaymentStatus;
  payment_date?: string;
  payment_amount?: number;
  payment_method?: string;
  remaining_amount: number;
  total_subtotal: number;
  total_iva: number;
  total_ieps: number;
  grand_total: number;
  requested_subtotal?: string;
  requested_iva_total?: string;
  requested_ieps_total?: string;
  requested_total?: string;
  received_subtotal?: string;
  received_iva_total?: string;
  received_ieps_total?: string;
  received_total?: string;
  notes?: string;
  line_items: LineItem[];
  batches?: Batch[];
  payments: Payment[];
  documents?: Document[];
  warehouse?: Warehouse;
  vendor?: Vendor;
  fiscal_configuration?: any;
  creator?: User;
  created_at: string;
  updated_at: string;
}
