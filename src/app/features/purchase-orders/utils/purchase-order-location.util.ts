import {
  PurchaseOrderLocationBranch,
  PurchaseOrderLocationFiscal,
  PurchaseOrderLocationWarehouse,
  PurchaseOrderLocationsResponse,
  PurchaseOrderWarehouseLookup,
} from '../models/purchase-order-location.model';

export function unwrapPurchaseOrderLocations(res: unknown): PurchaseOrderLocationsResponse {
  const body = (res && typeof res === 'object' ? res : {}) as Record<string, unknown>;
  const inner = body['data'] && !Array.isArray(body['data']) && typeof body['data'] === 'object'
    ? (body['data'] as Record<string, unknown>)
    : body;
  const data = Array.isArray(inner['data'])
    ? (inner['data'] as PurchaseOrderLocationFiscal[])
    : Array.isArray(body['data'])
      ? (body['data'] as PurchaseOrderLocationFiscal[])
      : [];
  const unassigned = Array.isArray(inner['unassigned_warehouses'])
    ? (inner['unassigned_warehouses'] as PurchaseOrderLocationWarehouse[])
    : Array.isArray(body['unassigned_warehouses'])
      ? (body['unassigned_warehouses'] as PurchaseOrderLocationWarehouse[])
      : [];
  return { data, unassigned_warehouses: unassigned };
}

export function activePurchaseOrderFiscals(
  tree: PurchaseOrderLocationFiscal[],
): PurchaseOrderLocationFiscal[] {
  return tree.filter((fiscal) => fiscal.status === 'active');
}

export function activePurchaseOrderBranches(
  fiscal: PurchaseOrderLocationFiscal | undefined,
): PurchaseOrderLocationBranch[] {
  return (fiscal?.branches ?? []).filter((branch) => Number(branch.status) === 1);
}

export function activePurchaseOrderWarehouses(
  branch: PurchaseOrderLocationBranch | undefined,
): PurchaseOrderLocationWarehouse[] {
  return (branch?.warehouses ?? []).filter((warehouse) => warehouse.status === 'active');
}

export function flattenPurchaseOrderWarehouses(
  tree: PurchaseOrderLocationFiscal[],
  unassigned: PurchaseOrderLocationWarehouse[] = [],
): PurchaseOrderWarehouseLookup[] {
  const items: PurchaseOrderWarehouseLookup[] = [];

  for (const fiscal of tree) {
    for (const branch of fiscal.branches ?? []) {
      for (const warehouse of branch.warehouses ?? []) {
        items.push({
          id: warehouse.id,
          name: warehouse.name,
          status: warehouse.status,
          fiscalId: fiscal.id,
          fiscalName: fiscal.razon_social?.trim() || fiscal.rfc || fiscal.id,
          branchId: branch.id,
          branchName: branch.name,
          assigned: true,
        });
      }
    }
  }

  for (const warehouse of unassigned) {
    items.push({
      id: warehouse.id,
      name: warehouse.name,
      status: warehouse.status,
      fiscalId: null,
      fiscalName: '',
      branchId: null,
      branchName: '',
      assigned: false,
    });
  }

  return items.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
}

export function filterWarehouseLookups(
  items: PurchaseOrderWarehouseLookup[],
  term: string,
): PurchaseOrderWarehouseLookup[] {
  const query = term.trim().toLowerCase();
  if (!query) {
    return items;
  }
  return items.filter((item) => {
    const haystack = [item.name, item.branchName, item.fiscalName].join(' ').toLowerCase();
    return haystack.includes(query);
  });
}

export function warehouseLookupLabel(item: PurchaseOrderWarehouseLookup): string {
  if (!item.assigned) {
    return `${item.name} (sin sucursal)`;
  }
  return [item.name, item.branchName, item.fiscalName].filter(Boolean).join(' · ');
}
