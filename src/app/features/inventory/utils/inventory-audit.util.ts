import { TransferLocationView } from './transfer-location.util';
import {
  InventoryAudit,
  InventoryAuditContext,
  InventoryAuditContextLot,
  InventoryAuditLine,
  InventoryAuditStatus,
  InventoryAuditUser,
  InventoryAuditWarehouse,
} from '../models/inventory-audit.model';

export const AUDIT_STATUS_LABEL: Record<InventoryAuditStatus, string> = {
  draft: 'Borrador',
  submitted: 'En revisión',
  posted: 'Aplicada',
  cancelled: 'Cancelada',
};

export function auditStatusLabel(status: InventoryAuditStatus | string | null | undefined): string {
  if (!status) return '—';
  return AUDIT_STATUS_LABEL[status as InventoryAuditStatus] ?? status;
}

export function parseAuditQty(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null;
  const num = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
  return Number.isFinite(num) ? num : null;
}

export function roundAuditQty(value: number): number {
  return Math.round(value * 1000) / 1000;
}

export function lineVariance(counted: string | number | null | undefined, system: string | number): number | null {
  const countedQty = parseAuditQty(counted);
  if (countedQty === null) return null;
  const systemQty = parseAuditQty(system) ?? 0;
  return roundAuditQty(countedQty - systemQty);
}

export function auditProductLabel(audit: Pick<InventoryAudit, 'product_id' | 'product_name' | 'product_sku'>): string {
  if (!audit.product_id) return 'Todo el almacén';
  const name = audit.product_name?.trim();
  const sku = audit.product_sku?.trim();
  if (name && sku) return `${name} · ${sku}`;
  return name || sku || 'Producto';
}

export function auditUserName(user: InventoryAuditUser | null | undefined): string {
  return user?.name?.trim() || '—';
}

export function contextLots(ctx: InventoryAuditContext | null | undefined): InventoryAuditContextLot[] {
  if (!ctx) return [];
  return ctx.lots ?? ctx.batches ?? ctx.preview_lots ?? [];
}

export function contextOpenAuditId(ctx: InventoryAuditContext | null | undefined): string | null {
  if (!ctx) return null;
  return ctx.open_audit_id || ctx.open_audit?.id || null;
}

export function contextOpenAuditFolio(ctx: InventoryAuditContext | null | undefined): string {
  if (!ctx) return '';
  return ctx.open_audit_folio || ctx.open_audit?.folio || '';
}

export function contextLotId(lot: InventoryAuditContextLot): string {
  return lot.inventory_batch_id || lot.batch_id || lot.id || '';
}

export function fromAuditWarehouse(wh: InventoryAuditWarehouse | null | undefined): TransferLocationView {
  return {
    warehouseId: wh?.id ?? '',
    warehouseName: wh?.name?.trim() || '—',
    warehouseCode: wh?.code?.trim() || '',
    branchId: wh?.billing_branch_id ?? '',
    branchCode: (wh?.billing_branch_code || wh?.billing_branch_name || '').trim(),
    city: '',
    state: '',
    fiscalId: wh?.fiscal_configuration_id ?? '',
    fiscalName: wh?.fiscal_razon_social?.trim() || '',
    rfc: wh?.fiscal_rfc?.trim() || '',
  };
}

export function countedInputFromLine(line: InventoryAuditLine): string {
  const qty = parseAuditQty(line.counted_quantity);
  if (qty === null) return '';
  return String(qty);
}
