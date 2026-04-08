import { Product } from './product.model';

/**
 * Product UOM entity
 */
export interface ProductUOM {
  id: string;
  product_id: string;
  uom_catalog_id: string;
  factor: number;
  is_base: boolean;
  parent_uom_id?: string | null;
  uom?: UnitOfMeasure;
  created_at?: string;
  updated_at?: string;
}

/**
 * Line item entity
 */
export interface LineItem {
  id: string;
  purchase_order_batch_id?: string;
  purchase_order_id?: string;
  product_id: string;
  product_uom_id?: string;
  product_uom?: ProductUOM;
  uom_id: string;
  quantity: number | string;
  unit_price?: number;
  unit_total?: number;
  subtotal?: number;
  iva_percentage: number;
  iva_unit?: number;
  iva_amount?: number;
  ieps_percentage: number;
  ieps_unit?: number;
  ieps_amount?: number;
  line_total?: number;
  received_product?: Product;
  received_original_product_id?: string;
  received_uom?: UnitOfMeasure;
  received_original_uom_id?: string;
  received_original_quantity?: number | string;
  received_original_unit_total?: number;
  received_original_iva_percentage?: number;
  received_original_iva_unit?: number;
  received_original_ieps_percentage?: number;
  received_original_ieps_unit?: number;
  received_converted_uom?: UnitOfMeasure;
  received_converted_uom_id?: string;
  received_converted_quantity?: number | string;
  product?: Product;
  uom?: UnitOfMeasure;
  created_by?: string;
  created_at: string;
  updated_by?: string;
  updated_at: string;
}

/**
 * Unit of Measure entity
 */
export interface UnitOfMeasure {
  id: string;
  product_id?: string;
  uom_catalog_id?: string | null;
  code?: string;
  name: string;
  abbreviation?: string;
  description?: string;
  tenant_id?: string;
  created_at?: string;
  updated_at?: string;
}
