import { SalesOrder } from '../../sales-orders/models/sales-order.model';
import { PosApplicableDiscount } from './pos-inventory-summary.model';
import { GlobalDiscount } from '../../global-discounts/models/global-discount.model';

/**
 * POS Cart Item
 */
export interface POSCartItem {
  product_id: string;
  product_name: string;
  product_sku: string;
  /** UUID de product_uom (se envía al crear la orden). */
  product_uom_id: string;
  /** UOM de catálogo; solo display. */
  uom_id: string;
  uom_name: string;
  quantity: number;
  weight?: number;
  unit_price: number;
  iva_percentage: number;
  ieps_percentage: number;
  /** Subtotal neto (después de descuento, antes de impuestos). */
  subtotal: number;
  line_gross_subtotal: number;
  line_discount_amount: number;
  iva_amount: number;
  ieps_amount: number;
  line_total: number;
  product_discount_id?: string | null;
  selected_discount?: PosApplicableDiscount | null;
  pricing_options?: Array<{
    price_list_id: string;
    price_list_name: string;
    price: string | number;
    iva_percentage: string | number;
    ieps_percentage: string | number;
    total?: string | number;
  }>;
  selected_price_list_id?: string;
  suggested_unit_price?: number;
  suggested_iva_percentage?: number;
  suggested_ieps_percentage?: number;
  applicable_discounts?: PosApplicableDiscount[];
}

/**
 * POS Cart
 */
export interface POSCart {
  items: POSCartItem[];
  total_gross_subtotal: number;
  /** Suma de descuentos por producto (línea). */
  total_discount: number;
  total_subtotal: number;
  total_iva: number;
  total_ieps: number;
  global_discount_id?: string | null;
  selected_global_discount?: GlobalDiscount | null;
  global_discount_amount: number;
  grand_total: number;
}

export interface PosSaleInProgressLine {
  id?: string;
  product_id: string;
  product_name?: string;
  product_sku?: string;
  product_uom_id: string;
  uom_id?: string;
  uom_name?: string;
  quantity: number;
  unit_price: number;
  iva_percentage?: number;
  ieps_percentage?: number;
  discount_percentage?: number;
  product_discount_id?: string | null;
  selected_discount?: PosApplicableDiscount | null;
}

export interface PosSaleInProgress {
  id: string;
  folio?: string;
  total?: number;
  subtotal?: number;
  created_at?: string;
  updated_at?: string;
  general_status?: string;
  payment_status?: string;
  pos_stage?: 'caja' | 'ventas' | null;
  customer_id?: number | null;
  walk_in_name?: string | null;
  walk_in_rfc?: string | null;
  customer?: {
    id?: number;
    name?: string;
    lastname?: string;
    company_name?: string;
    is_walk_in?: boolean;
  } | null;
  seller_user?: {
    id?: string;
    first_name?: string;
    last_name?: string;
    pos_user_code?: number | null;
  } | null;
  global_discount_id?: string | null;
  global_discount?: GlobalDiscount | null;
  line_items?: PosSaleInProgressLine[];
}

/**
 * Payment Method
 */
export type PaymentMethod = 'cash' | 'card' | 'transfer';

/**
 * POS Payment
 */
export interface POSPayment {
  method: PaymentMethod;
  amount: number;
  reference?: string;
}

/**
 * POS Order for payment
 */
export interface POSOrderForPayment extends SalesOrder {
  payments_made: number;
  remaining_amount: number;
}
