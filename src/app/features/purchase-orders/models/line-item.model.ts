import { Product } from './product.model';

/**
 * Line item entity
 */
export interface LineItem {
  id: string;
  purchase_order_id: string;
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

/**
 * Unit of Measure entity
 */
export interface UnitOfMeasure {
  id: string;
  product_id?: string;
  uom_catalog_id?: string | null;
  code: string;
  name: string;
  abbreviation?: string;
  created_at?: string;
  updated_at?: string;
}
