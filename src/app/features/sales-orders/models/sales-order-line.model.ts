import { Product } from '../../purchase-orders/models/product.model';
import { UnitOfMeasure } from '../../purchase-orders/models/line-item.model';

/**
 * Sales Order Line entity
 */
export interface SalesOrderLine {
  id: string;
  sales_order_id: string;
  product_id: string;
  uom_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  iva_percentage: number;
  iva_amount: number;
  ieps_percentage: number;
  ieps_amount: number;
  line_total: number;
  product?: Product;
  uom?: UnitOfMeasure;
  created_at: string;
  updated_at: string;
}
