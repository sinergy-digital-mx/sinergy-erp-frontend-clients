/**
 * Catálogo jerárquico de ubicaciones de inventario
 * (razón social → sucursal → almacén).
 */
export interface InventoryLocationWarehouse {
  id: string;
  name: string;
  status: string;
}

export interface InventoryLocationBranch {
  id: string;
  name: string;
  status: number | string;
  warehouses: InventoryLocationWarehouse[];
}

export interface InventoryLocationFiscal {
  id: string;
  razon_social: string;
  rfc: string;
  status: string;
  iva_enabled?: boolean | number;
  ieps_enabled?: boolean | number;
  multi_fiscal_transfers_enabled?: boolean | number;
  branches: InventoryLocationBranch[];
}

export interface InventoryLocationFilters {
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  warehouse_id?: string;
}
