export interface PosSummaryWarehouse {
  id: string;
  name: string;
  status?: string;
}

export type PosApplicableDiscountType = 'percentage' | 'fixed';

export interface PosApplicableDiscount {
  id: string;
  name: string;
  discount_type: PosApplicableDiscountType;
  value: number;
  product_uom_id: string | null;
}

export interface PosSummaryProductRow {
  product_id: string;
  product_name: string;
  product_sku?: string;
  uom_id?: string;
  uom_name?: string;
  product_uom_id: string;
  suggested_unit_price?: string | number | null;
  suggested_iva_percentage?: string | number | null;
  suggested_ieps_percentage?: string | number | null;
  total_available_quantity?: string | number | null;
  product_photo?: string | null;
  pricing_options?: unknown[];
  has_applicable_discounts?: boolean;
  applicable_discounts?: PosApplicableDiscount[];
  [key: string]: unknown;
}

export interface PosInventorySummaryResponse {
  billing_branch_id: string | null;
  warehouses: PosSummaryWarehouse[];
  applied_warehouse_id: string | null;
  data: unknown[];
}

function normalizeWarehouse(raw: unknown): PosSummaryWarehouse | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const row = raw as Record<string, unknown>;
  const id = String(row['id'] ?? row['warehouse_id'] ?? '').trim();
  if (!id) {
    return null;
  }
  return {
    id,
    name: String(row['name'] ?? row['warehouse_name'] ?? 'Almacén'),
    status: row['status'] != null ? String(row['status']) : undefined,
  };
}

function normalizeRows(raw: unknown): unknown[] {
  if (Array.isArray(raw)) {
    return raw;
  }
  if (!raw || typeof raw !== 'object') {
    return [];
  }
  const obj = raw as Record<string, unknown>;
  const candidates = [obj['data'], obj['items'], obj['products'], obj['results']];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }
  return [];
}

export function normalizePosInventorySummary(raw: unknown): PosInventorySummaryResponse {
  if (Array.isArray(raw)) {
    return {
      billing_branch_id: null,
      warehouses: [],
      applied_warehouse_id: null,
      data: raw,
    };
  }

  if (!raw || typeof raw !== 'object') {
    return {
      billing_branch_id: null,
      warehouses: [],
      applied_warehouse_id: null,
      data: [],
    };
  }

  const obj = raw as Record<string, unknown>;
  const nested =
    obj['data'] && typeof obj['data'] === 'object' && !Array.isArray(obj['data'])
      ? (obj['data'] as Record<string, unknown>)
      : null;
  const source = nested ?? obj;

  const warehousesRaw = source['warehouses'] ?? obj['warehouses'];
  const warehouses = Array.isArray(warehousesRaw)
    ? warehousesRaw
        .map(normalizeWarehouse)
        .filter((w): w is PosSummaryWarehouse => w != null)
    : [];

  const billingBranchId =
    source['billing_branch_id'] ?? obj['billing_branch_id'];
  const appliedWarehouseId =
    source['applied_warehouse_id'] ?? obj['applied_warehouse_id'];

  return {
    billing_branch_id:
      billingBranchId != null && String(billingBranchId).trim()
        ? String(billingBranchId).trim()
        : null,
    warehouses,
    applied_warehouse_id:
      appliedWarehouseId != null && String(appliedWarehouseId).trim()
        ? String(appliedWarehouseId).trim()
        : null,
    data: normalizeRows(source),
  };
}

export function extractWarehouseIdFromRow(row: unknown): string | null {
  if (!row || typeof row !== 'object') {
    return null;
  }
  const record = row as Record<string, unknown>;
  const direct = record['warehouse_id'] ?? record['warehouseId'];
  if (direct != null && String(direct).trim()) {
    return String(direct).trim();
  }
  const warehouse = record['warehouse'];
  if (warehouse && typeof warehouse === 'object') {
    const id = (warehouse as Record<string, unknown>)['id'];
    if (id != null && String(id).trim()) {
      return String(id).trim();
    }
  }
  return null;
}

export function extractWarehouseNameFromRow(row: unknown): string | null {
  if (!row || typeof row !== 'object') {
    return null;
  }
  const record = row as Record<string, unknown>;
  const direct = record['warehouse_name'] ?? record['warehouseName'];
  if (direct != null && String(direct).trim()) {
    return String(direct).trim();
  }
  const warehouse = record['warehouse'];
  if (warehouse && typeof warehouse === 'object') {
    const name = (warehouse as Record<string, unknown>)['name'];
    if (name != null && String(name).trim()) {
      return String(name).trim();
    }
  }
  return null;
}

export function collectWarehousesFromRows(rows: unknown[]): PosSummaryWarehouse[] {
  const map = new Map<string, PosSummaryWarehouse>();
  for (const row of rows) {
    const id = extractWarehouseIdFromRow(row);
    if (!id) {
      continue;
    }
    map.set(id, {
      id,
      name: extractWarehouseNameFromRow(row) ?? 'Almacén',
    });
  }
  return [...map.values()];
}

export function enrichPosInventorySummary(
  summary: PosInventorySummaryResponse
): PosInventorySummaryResponse {
  if (summary.warehouses.length > 0) {
    return summary;
  }
  const fromRows = collectWarehousesFromRows(summary.data);
  if (fromRows.length === 0) {
    return summary;
  }
  return {
    ...summary,
    warehouses: fromRows,
  };
}
export function resolvePosWarehouseId(summary: PosInventorySummaryResponse): string {
  const enriched = enrichPosInventorySummary(summary);
  const warehouses = enriched.warehouses ?? [];
  const validIds = new Set(warehouses.map((w) => w.id));

  const applied = enriched.applied_warehouse_id?.trim();
  if (applied && (validIds.size === 0 || validIds.has(applied))) {
    return applied;
  }

  for (const row of enriched.data) {
    const rowWarehouseId = extractWarehouseIdFromRow(row);
    if (rowWarehouseId && (validIds.size === 0 || validIds.has(rowWarehouseId))) {
      return rowWarehouseId;
    }
  }

  const stored = localStorage.getItem('pos_warehouse_id')?.trim();
  if (stored && (validIds.size === 0 || validIds.has(stored))) {
    return stored;
  }

  return warehouses[0]?.id ?? applied ?? '';
}

export function persistPosWarehouseId(warehouseId: string): void {
  const id = warehouseId?.trim();
  if (id) {
    localStorage.setItem('pos_warehouse_id', id);
  } else {
    localStorage.removeItem('pos_warehouse_id');
  }
}
