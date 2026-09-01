import { BatchAuditHistoryEntry } from './inventory-audit.model';
import { InventoryBatchMovement } from './inventory-batch-movement.model';
import { BatchTransferHistoryEntry } from './inventory-transfer.model';

export interface InventoryBatchMovementSummary {
  total_movements: number;
  total_out: number;
  total_in: number;
  by_type: {
    orders: number;
    transfers_out: number;
    transfers_in: number;
    adjustments: number;
  };
}

function toSummaryCount(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

/** Une `movement_summary` del detalle (data o raíz) y fuerza números en `by_type`. */
export function normalizeInventoryBatchMovementSummary(raw: unknown): InventoryBatchMovementSummary | undefined {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return undefined;
  }
  const obj = raw as Record<string, unknown>;
  const byTypeSrc = obj['by_type'] ?? obj['byType'];
  const byType =
    byTypeSrc && typeof byTypeSrc === 'object' && !Array.isArray(byTypeSrc)
      ? (byTypeSrc as Record<string, unknown>)
      : {};
  return {
    total_movements: toSummaryCount(obj['total_movements'] ?? obj['totalMovements']),
    total_out: toSummaryCount(obj['total_out'] ?? obj['totalOut']),
    total_in: toSummaryCount(obj['total_in'] ?? obj['totalIn']),
    by_type: {
      orders: toSummaryCount(byType['orders']),
      transfers_out: toSummaryCount(byType['transfers_out'] ?? byType['transfersOut']),
      transfers_in: toSummaryCount(byType['transfers_in'] ?? byType['transfersIn']),
      adjustments: toSummaryCount(byType['adjustments']),
    },
  };
}

export interface InventoryBatch {
  id: string;
  batch_number: string;
  photo?: string | null;
  photo_url?: string | null;
  photo_signed_url?: string | null;
  source_tag_identifier?: string | null;
  warehouse_id: string;
  warehouse_name: string;
  fiscal_configuration_id?: string | null;
  billing_branch_id?: string | null;
  razon_social?: string | null;
  sucursal?: string | null;
  product_id: string;
  product_name: string;
  product_sku: string;
  uom_id: string;
  uom_name: string;
  /** Tamaño de la pieza. Independiente de uom_name (PT / ft²). */
  measure?: string | null;
  measure_uom_id?: string | null;
  measure_uom_name?: string | null;
  /** Etiqueta para pintar, p. ej. "8 Foot". */
  measure_label?: string | null;
  quantity: number | string;
  // Detail-only fields
  initial_quantity?: string;
  available_quantity?: string;
  quantity_consumed?: string;
  availability_percentage?: number;
  movement_summary?: InventoryBatchMovementSummary;
  movements?: InventoryBatchMovement[];
  movements_count?: number;
  transferred_from_batch_id?: string | null;
  transferred_from_batch_number?: string | null;
  transfer_history?: BatchTransferHistoryEntry[];
  audit_history?: BatchAuditHistoryEntry[];
  // Optional legacy
  quantity_available?: number | string;
  purchase_order_batch_id: string | null;
  purchase_order_id: string | null;
  purchase_order_detail_id: string | null;
  purchase_order_folio: string | null;
  /** Pedimento de la OC de origen. null si no hay OC o la OC no tiene pedimento. */
  pedimento_number?: string | null;
  created_by: string;
  created_at: string;
  can_edit_tag?: boolean;
  can_edit_measure?: boolean;
  can_transfer?: boolean;
}

export interface UpdateInventoryBatchPayload {
  source_tag_identifier?: string | null;
  measure?: number;
  measure_uom_id?: string;
}

export interface InventoryBatchResponse {
  data: InventoryBatch[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
