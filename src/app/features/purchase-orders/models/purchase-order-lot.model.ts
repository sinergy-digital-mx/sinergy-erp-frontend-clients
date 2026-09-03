export type PurchaseOrderLotOrigin = 'receipt' | 'migration';

export interface PurchaseOrderLotTransfer {
  transfer_id?: string | null;
  transfer_folio?: string | null;
  quantity?: string | number | null;
  transferred_by_name?: string | null;
  transferred_at?: string | null;
  destination_sucursal?: string | null;
  destination_warehouse_name?: string | null;
}

/** Nodo del árbol de lotes: padre = recibo, hijos = migraciones. */
export interface PurchaseOrderLotNode {
  id: string;
  batch_number: string;
  origin?: PurchaseOrderLotOrigin | string | null;
  origin_label?: string | null;
  product_id?: string | null;
  product_name?: string | null;
  product_sku?: string | null;
  product?: { id?: string; name?: string; sku?: string } | null;
  sucursal?: string | null;
  warehouse_name?: string | null;
  warehouse?: { id?: string; name?: string } | null;
  razon_social?: string | null;
  uom_name?: string | null;
  uom?: { id?: string; name?: string } | null;
  measure_label?: string | null;
  unit_cost?: number | string | null;
  real_unit_cost_usd?: number | string | null;
  real_unit_cost_mxn?: number | string | null;
  amount?: number | string | null;
  ordered_quantity?: string | number | null;
  received_quantity?: string | number | null;
  remaining_quantity?: string | number | null;
  migrated_quantity?: string | number | null;
  consumed_quantity?: string | number | null;
  available_quantity?: string | number | null;
  transfer?: PurchaseOrderLotTransfer | null;
  migrated_to?: PurchaseOrderLotNode[];
}

export interface PurchaseOrderBatchesSummary {
  received_lots: number;
  migrated_lots: number;
  received_quantity: string | number;
  remaining_on_received_lots: string | number;
  remaining_total: string | number;
  migrated_quantity: string | number;
  amount_total: number | string;
}

export function isPurchaseOrderMigrationLot(lot: PurchaseOrderLotNode | null | undefined): boolean {
  return (lot?.origin ?? 'receipt') === 'migration';
}

/** Solo padres recibidos. Nunca pintar `origin: migration` en primer nivel. */
export function purchaseOrderReceivedLots(
  batches: PurchaseOrderLotNode[] | null | undefined
): PurchaseOrderLotNode[] {
  if (!batches?.length) {
    return [];
  }
  return batches.filter((lot) => !isPurchaseOrderMigrationLot(lot));
}

export function purchaseOrderLotHasChildren(lot: PurchaseOrderLotNode | null | undefined): boolean {
  return (lot?.migrated_to?.length ?? 0) > 0;
}

export function purchaseOrderQtyNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  const parsed = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}
