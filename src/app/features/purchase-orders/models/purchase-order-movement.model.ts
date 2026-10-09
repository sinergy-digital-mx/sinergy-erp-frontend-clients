export type PurchaseOrderMovementType =
  | 'created'
  | 'status_changed'
  | 'line_added'
  | 'line_updated'
  | 'line_removed'
  | 'notes_updated'
  | 'pedimento_updated'
  | 'vendor_invoice_updated'
  | 'real_cost_updated'
  | 'header_replaced'
  | 'received'
  | 'lot_received'
  | 'lot_migrated'
  | 'document_uploaded'
  | 'document_generated'
  | 'payment_recorded'
  | 'payment_deleted'
  | 'inventory_adjusted'
  | 'stock_sold';

export interface PurchaseOrderMovementChange {
  field?: string;
  field_label?: string;
  from?: string | number | null;
  to?: string | number | null;
}

export interface PurchaseOrderMovement {
  id: string;
  type: PurchaseOrderMovementType | string;
  type_label: string;
  title: string;
  description: string;
  actor_name?: string | null;
  occurred_at: string;
  changes?: PurchaseOrderMovementChange[];
  metadata?: Record<string, unknown> | null;
}

export interface PurchaseOrderMovementsResponse {
  data: PurchaseOrderMovement[];
  total: number;
}

export function normalizePurchaseOrderMovementsResponse(raw: unknown): PurchaseOrderMovementsResponse {
  if (Array.isArray(raw)) {
    return { data: sortMovements(raw as PurchaseOrderMovement[]), total: raw.length };
  }
  if (!raw || typeof raw !== 'object') {
    return { data: [], total: 0 };
  }
  const obj = raw as Record<string, unknown>;
  const nested = obj['data'] && typeof obj['data'] === 'object' && !Array.isArray(obj['data'])
    ? (obj['data'] as Record<string, unknown>)
    : null;
  const listRaw = Array.isArray(obj['data'])
    ? obj['data']
    : Array.isArray(nested?.['data'])
      ? nested['data']
      : Array.isArray(obj['movements'])
        ? obj['movements']
        : [];
  const list = listRaw as PurchaseOrderMovement[];
  const total = Number(obj['total'] ?? nested?.['total'] ?? obj['movements_count'] ?? list.length) || list.length;
  return { data: sortMovements(list), total };
}

function sortMovements(list: PurchaseOrderMovement[]): PurchaseOrderMovement[] {
  return [...list].sort((a, b) => {
    const tb = Date.parse(b.occurred_at || '') || 0;
    const ta = Date.parse(a.occurred_at || '') || 0;
    return tb - ta;
  });
}

export function movementChipTone(type: string | null | undefined): string {
  switch (type) {
    case 'created':
      return 'created';
    case 'status_changed':
    case 'header_replaced':
      return 'status';
    case 'line_added':
    case 'line_updated':
    case 'line_removed':
    case 'notes_updated':
    case 'pedimento_updated':
    case 'vendor_invoice_updated':
      return 'edit';
    case 'real_cost_updated':
      return 'cost';
    case 'payment_recorded':
      return 'money';
    case 'payment_deleted':
      return 'money-out';
    case 'received':
    case 'lot_received':
      return 'lot';
    case 'lot_migrated':
      return 'move';
    case 'document_uploaded':
    case 'document_generated':
      return 'document';
    case 'inventory_adjusted':
    case 'receipt_corrected':
      return 'adjust';
    case 'stock_sold':
      return 'sale';
    default:
      return 'neutral';
  }
}
