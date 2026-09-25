export interface PurchaseOrderLocationWarehouse {
  id: string;
  name: string;
  status: string;
}

export interface PurchaseOrderLocationBranch {
  id: string;
  name: string;
  status: number;
  warehouses: PurchaseOrderLocationWarehouse[];
}

export interface PurchaseOrderLocationFiscal {
  id: string;
  razon_social: string;
  rfc: string;
  status: string;
  branches: PurchaseOrderLocationBranch[];
}

export interface PurchaseOrderLocationsResponse {
  data: PurchaseOrderLocationFiscal[];
  unassigned_warehouses: PurchaseOrderLocationWarehouse[];
}

export interface PurchaseOrderWarehouseLookup {
  id: string;
  name: string;
  status: string;
  fiscalId: string | null;
  fiscalName: string;
  branchId: string | null;
  branchName: string;
  assigned: boolean;
}
