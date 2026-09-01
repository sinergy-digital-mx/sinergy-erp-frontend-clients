export type InventoryBatchMovementType =
  | 'created'
  | 'purchase_received'
  | 'imported'
  | 'transfer_in'
  | 'transfer_out'
  | 'stock_sold'
  | 'inventory_adjusted';

export type InventoryBatchMovementDirection = 'in' | 'out' | 'adjust';

export type InventoryBatchMovementChipTone = 'in' | 'out' | 'sold' | 'adjust' | 'created';

export interface InventoryBatchMovementChange {
  field?: string;
  field_label?: string;
  from?: string | number | null;
  to?: string | number | null;
}

export interface InventoryBatchMovement {
  id: string;
  type: InventoryBatchMovementType | string;
  type_label: string;
  title: string;
  description: string;
  direction?: InventoryBatchMovementDirection | string | null;
  quantity?: string | number | null;
  actor_name?: string | null;
  authorized_by_name?: string | null;
  occurred_at: string;
  changes?: InventoryBatchMovementChange[];
  metadata?: Record<string, unknown> | null;
}

export interface InventoryBatchMovementsResponse {
  data: InventoryBatchMovement[];
  total: number;
}

export function normalizeInventoryBatchMovementsResponse(raw: unknown): InventoryBatchMovementsResponse {
  if (Array.isArray(raw)) {
    return { data: sortBatchMovements(raw as InventoryBatchMovement[]), total: raw.length };
  }
  if (!raw || typeof raw !== 'object') {
    return { data: [], total: 0 };
  }
  const obj = raw as Record<string, unknown>;
  const nested =
    obj['data'] && typeof obj['data'] === 'object' && !Array.isArray(obj['data'])
      ? (obj['data'] as Record<string, unknown>)
      : null;
  const listRaw = Array.isArray(obj['data'])
    ? obj['data']
    : Array.isArray(nested?.['data'])
      ? nested['data']
      : Array.isArray(obj['movements'])
        ? obj['movements']
        : [];
  const list = listRaw as InventoryBatchMovement[];
  const total = Number(obj['total'] ?? nested?.['total'] ?? obj['movements_count'] ?? list.length) || list.length;
  return { data: sortBatchMovements(list), total };
}

export function sortBatchMovements(list: InventoryBatchMovement[]): InventoryBatchMovement[] {
  return [...list].sort((a, b) => {
    const tb = Date.parse(b.occurred_at || '') || 0;
    const ta = Date.parse(a.occurred_at || '') || 0;
    return tb - ta;
  });
}

export function batchMovementChipTone(type: string | null | undefined): InventoryBatchMovementChipTone {
  switch (type) {
    case 'imported':
    case 'purchase_received':
    case 'transfer_in':
      return 'in';
    case 'stock_sold':
      return 'sold';
    case 'transfer_out':
      return 'out';
    case 'inventory_adjusted':
      return 'adjust';
    case 'created':
    default:
      return 'created';
  }
}

export function metadataString(metadata: Record<string, unknown> | null | undefined, key: string): string | null {
  const value = metadata?.[key];
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return null;
}
