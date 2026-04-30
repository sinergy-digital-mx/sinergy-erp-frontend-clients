/**
 * Catálogo de productos por proveedor (`GET /tenant/vendors/:id/products`),
 * misma forma que usa el modal de creación de OC.
 */
export interface VendorCatalogUom {
  uom_id: string;
  uom_name: string;
  cost?: number;
  iva_percentage?: number;
  ieps_percentage?: number;
}

export interface VendorCatalogProduct {
  product_id: string;
  product_name: string;
  sku?: string;
  uoms?: VendorCatalogUom[];
}
