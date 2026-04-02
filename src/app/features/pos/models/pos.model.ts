import { SalesOrder } from '../../sales-orders/models/sales-order.model';

/**
 * POS Cart Item
 */
export interface POSCartItem {
  product_id: string;
  product_name: string;
  product_sku: string;
  uom_id: string;
  uom_name: string;
  quantity: number;
  weight?: number; // Optional weight in kg
  unit_price: number;
  iva_percentage: number;
  ieps_percentage: number;
  subtotal: number;
  iva_amount: number;
  ieps_amount: number;
  line_total: number;
}

/**
 * POS Cart
 */
export interface POSCart {
  items: POSCartItem[];
  total_subtotal: number;
  total_iva: number;
  total_ieps: number;
  grand_total: number;
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
