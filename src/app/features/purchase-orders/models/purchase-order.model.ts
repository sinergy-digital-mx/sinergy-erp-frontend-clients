import { LineItem } from './line-item.model';
import { Payment } from './payment.model';
import { Warehouse } from './warehouse.model';
import { Vendor } from './vendor.model';

/**
 * Order status enum
 */
export type OrderStatus = 'En Proceso' | 'Recibida' | 'Cancelada';

/**
 * Payment status enum
 */
export type PaymentStatus = 'Pagada' | 'Parcial' | 'No pagado';

/**
 * Document entity
 */
export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploaded_at: string;
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
  tentative_receipt_date: string; // ISO 8601 date string
  status: OrderStatus;
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
  line_items: LineItem[];
  payments: Payment[];
  documents?: Document[];
  warehouse?: Warehouse;
  vendor?: Vendor;
  created_at: string;
  updated_at: string;
}
