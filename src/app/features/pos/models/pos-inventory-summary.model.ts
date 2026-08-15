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

export interface PosPricingOption {
  price_list_id: string;
  price_list_name: string;
  price: number;
  iva_percentage: number;
  ieps_percentage: number;
}

function toMoney(value: unknown): number | null {
  if (value == null || value === '') {
    return null;
  }
  const n = typeof value === 'number' ? value : Number(String(value).trim().replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

export function resolvePricingOptionId(raw: Record<string, unknown>): string {
  const nested =
    raw['price_list'] && typeof raw['price_list'] === 'object'
      ? (raw['price_list'] as Record<string, unknown>)
      : null;
  return String(
    raw['price_list_id'] ?? raw['priceListId'] ?? raw['id'] ?? nested?.['id'] ?? ''
  ).trim();
}

export function resolvePricingOptionPrice(raw: Record<string, unknown>): number {
  const nestedPrice =
    raw['price'] && typeof raw['price'] === 'object'
      ? (raw['price'] as Record<string, unknown>)
      : null;
  return (
    toMoney(raw['price']) ??
    toMoney(raw['unit_price']) ??
    toMoney(raw['unitPrice']) ??
    toMoney(raw['list_price']) ??
    toMoney(raw['net_price']) ??
    toMoney(raw['subtotal']) ??
    toMoney(raw['amount']) ??
    toMoney(nestedPrice?.['amount']) ??
    toMoney(nestedPrice?.['value']) ??
    0
  );
}

export function collectPosPricingOptions(row: unknown): unknown[] {
  if (!row || typeof row !== 'object') {
    return [];
  }
  const record = row as Record<string, unknown>;
  const buckets = [
    record['pricing_options'],
    record['prices'],
    record['product_prices'],
    record['price_lists'],
  ];
  for (const bucket of buckets) {
    if (Array.isArray(bucket) && bucket.length > 0) {
      return bucket;
    }
  }

  const uoms = record['uoms'];
  if (!Array.isArray(uoms) || uoms.length === 0) {
    return [];
  }
  const uomId = String(record['product_uom_id'] ?? record['uom_id'] ?? '').trim();
  const match = uomId
    ? uoms.find((uom) => {
        if (!uom || typeof uom !== 'object') {
          return false;
        }
        const ur = uom as Record<string, unknown>;
        return [ur['product_uom_id'], ur['id'], ur['uom_id']].some(
          (value) => String(value ?? '') === uomId
        );
      })
    : uoms[0];
  const source =
    match && typeof match === 'object'
      ? (match as Record<string, unknown>)
      : (uoms[0] as Record<string, unknown> | undefined);
  const nested = source?.['pricing_options'];
  return Array.isArray(nested) ? nested : [];
}

export function unwrapProductPriceList(raw: unknown): unknown[] {
  if (Array.isArray(raw)) {
    return raw;
  }
  if (raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    if (Array.isArray(obj['data'])) {
      return obj['data'];
    }
    if (Array.isArray(obj['prices'])) {
      return obj['prices'];
    }
  }
  return [];
}

export function filterProductPricesForUom(prices: unknown[], productUomId: string): unknown[] {
  const uomId = String(productUomId ?? '').trim();
  if (!uomId) {
    return prices;
  }
  const matched = prices.filter((item) => {
    if (!item || typeof item !== 'object') {
      return false;
    }
    const row = item as Record<string, unknown>;
    const nestedUom =
      row['product_uom'] && typeof row['product_uom'] === 'object'
        ? (row['product_uom'] as Record<string, unknown>)['id']
        : undefined;
    return [row['product_uom_id'], row['uom_id'], nestedUom].some(
      (value) => value != null && String(value) === uomId
    );
  });
  return matched.length > 0 ? matched : prices;
}

export function normalizePosPricingOptions(raw: unknown): PosPricingOption[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const options: PosPricingOption[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    if (!item || typeof item !== 'object') {
      continue;
    }
    const row = item as Record<string, unknown>;
    const nested =
      row['price_list'] && typeof row['price_list'] === 'object'
        ? (row['price_list'] as Record<string, unknown>)
        : null;
    const price_list_name = String(
      row['price_list_name'] ?? row['name'] ?? nested?.['name'] ?? 'Lista'
    ).trim() || 'Lista';
    const price_list_id =
      resolvePricingOptionId(row) || `opt-${options.length}-${price_list_name}`;
    if (seen.has(price_list_id)) {
      continue;
    }
    seen.add(price_list_id);
    options.push({
      price_list_id,
      price_list_name,
      price: resolvePricingOptionPrice(row),
      iva_percentage: toMoney(row['iva_percentage']) ?? 16,
      ieps_percentage: toMoney(row['ieps_percentage']) ?? 0,
    });
  }
  return options;
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
  fiscal_configuration_id: string | null;
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
      fiscal_configuration_id: null,
      warehouses: [],
      applied_warehouse_id: null,
      data: raw,
    };
  }

  if (!raw || typeof raw !== 'object') {
    return {
      billing_branch_id: null,
      fiscal_configuration_id: null,
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
  let warehouses = Array.isArray(warehousesRaw)
    ? warehousesRaw
        .map(normalizeWarehouse)
        .filter((w): w is PosSummaryWarehouse => w != null)
    : [];
  if (warehouses.length === 0) {
    const single = normalizeWarehouse(source['warehouse'] ?? obj['warehouse']);
    if (single) {
      warehouses = [single];
    }
  }

  const billingBranchId =
    source['billing_branch_id'] ?? obj['billing_branch_id'];
  const appliedWarehouseId =
    source['applied_warehouse_id'] ??
    obj['applied_warehouse_id'] ??
    source['warehouse_id'] ??
    obj['warehouse_id'];
  const fiscalConfigurationId =
    source['fiscal_configuration_id'] ??
    obj['fiscal_configuration_id'] ??
    (source['fiscal_configuration'] && typeof source['fiscal_configuration'] === 'object'
      ? (source['fiscal_configuration'] as Record<string, unknown>)['id']
      : undefined) ??
    (source['billing_branch'] && typeof source['billing_branch'] === 'object'
      ? (source['billing_branch'] as Record<string, unknown>)['fiscal_configuration_id']
      : undefined);

  return {
    billing_branch_id:
      billingBranchId != null && String(billingBranchId).trim()
        ? String(billingBranchId).trim()
        : null,
    fiscal_configuration_id:
      fiscalConfigurationId != null && String(fiscalConfigurationId).trim()
        ? String(fiscalConfigurationId).trim()
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
export function firstPosSummaryWarehouseId(
  summary: PosInventorySummaryResponse | null | undefined
): string {
  if (!summary) {
    return '';
  }
  const enriched = enrichPosInventorySummary(summary);
  const id = enriched.warehouses?.[0]?.id?.trim();
  if (id) {
    return id;
  }
  return enriched.applied_warehouse_id?.trim() || '';
}

export function resolvePosWarehouseId(summary: PosInventorySummaryResponse): string {
  const enriched = enrichPosInventorySummary(summary);
  const fromSummary = firstPosSummaryWarehouseId(enriched);
  if (fromSummary) {
    return fromSummary;
  }
  return '';
}

export function syncPosWarehouseContext(summary: PosInventorySummaryResponse): string {
  const enriched = enrichPosInventorySummary(summary);
  const branchId = enriched.billing_branch_id?.trim();

  if (branchId) {
    const storedBranch = localStorage.getItem('pos_billing_branch_id')?.trim();
    if (storedBranch && storedBranch !== branchId) {
      localStorage.removeItem('pos_warehouse_id');
    }
    localStorage.setItem('pos_billing_branch_id', branchId);
  }

  const warehouseId = resolvePosWarehouseId(enriched);
  if (!warehouseId) {
    localStorage.removeItem('pos_warehouse_id');
    return '';
  }

  persistPosWarehouseId(warehouseId);
  return warehouseId;
}

export function resetPosWarehouseForBranch(billingBranchId: string | null | undefined): void {
  const branchId = billingBranchId?.trim();
  if (!branchId) {
    return;
  }
  const storedBranch = localStorage.getItem('pos_billing_branch_id')?.trim();
  if (!storedBranch || storedBranch !== branchId) {
    localStorage.removeItem('pos_warehouse_id');
    localStorage.setItem('pos_billing_branch_id', branchId);
  }
}

export function persistPosWarehouseId(warehouseId: string): void {
  const id = warehouseId?.trim();
  if (id) {
    localStorage.setItem('pos_warehouse_id', id);
  } else {
    localStorage.removeItem('pos_warehouse_id');
  }
}
