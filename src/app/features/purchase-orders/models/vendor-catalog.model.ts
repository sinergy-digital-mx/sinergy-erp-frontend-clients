/**
 * Catálogo de productos por proveedor (`GET /vendors/:id/products`).
 * Incluye productos activos sin costo (`has_vendor_cost: false`).
 */
export interface VendorCatalogUom {
  uom_id: string;
  uom_name: string;
  cost?: number;
  iva_percentage?: number;
  ieps_percentage?: number;
  /** MXN | USD si hay costo de ese proveedor; null si no hay costo. */
  currency?: 'MXN' | 'USD' | null;
}

export interface VendorCatalogProduct {
  product_id: string;
  product_name: string;
  sku?: string;
  product_sku?: string;
  has_vendor_cost?: boolean;
  uoms?: VendorCatalogUom[];
}

export interface VendorProductsQuery {
  search?: string;
  include_without_cost?: boolean;
  only_with_cost?: boolean;
}
