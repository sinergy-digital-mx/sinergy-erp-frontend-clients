import {
  TransferContextWarehouse,
  TransferDestinationBranch,
  TransferDestinationFiscal,
  TransferWarehouseSummary,
} from '../models/inventory-transfer.model';

export interface TransferLocationView {
  warehouseId: string;
  warehouseName: string;
  warehouseCode: string;
  branchId: string;
  branchCode: string;
  city: string;
  state: string;
  fiscalId: string;
  fiscalName: string;
  rfc: string;
}

export function fromTransferWarehouse(wh: TransferWarehouseSummary | null | undefined): TransferLocationView {
  return {
    warehouseId: wh?.id ?? '',
    warehouseName: wh?.name?.trim() || '—',
    warehouseCode: wh?.code?.trim() || '',
    branchId: wh?.billing_branch_id ?? '',
    branchCode: wh?.billing_branch_code?.trim() || '',
    city: wh?.billing_branch_city?.trim() || '',
    state: wh?.billing_branch_state?.trim() || '',
    fiscalId: wh?.fiscal_configuration_id ?? '',
    fiscalName: wh?.fiscal_razon_social?.trim() || '',
    rfc: wh?.fiscal_rfc?.trim() || '',
  };
}

export function fromContextWarehouse(wh: TransferContextWarehouse | null | undefined): TransferLocationView {
  const branch = wh?.billing_branch;
  const fiscal = branch?.fiscal_configuration;
  return {
    warehouseId: wh?.id ?? '',
    warehouseName: wh?.name?.trim() || '—',
    warehouseCode: wh?.code?.trim() || '',
    branchId: branch?.id ?? '',
    branchCode: (branch?.code || branch?.name || wh?.billing_branch_code || '').trim(),
    city: branch?.city?.trim() || wh?.billing_branch_city?.trim() || '',
    state: branch?.state?.trim() || wh?.billing_branch_state?.trim() || '',
    fiscalId: fiscal?.id || wh?.fiscal_configuration_id || '',
    fiscalName: fiscal?.razon_social?.trim() || wh?.fiscal_razon_social?.trim() || '',
    rfc: fiscal?.rfc?.trim() || wh?.fiscal_rfc?.trim() || '',
  };
}

export function branchLine(view: TransferLocationView, withState = false): string {
  const code = view.branchCode || '—';
  if (withState && view.city && view.state) {
    return `${code} — ${view.city}, ${view.state}`;
  }
  if (view.city) {
    return `${code} — ${view.city}`;
  }
  return code;
}

export function isSameFiscal(a: TransferLocationView, b: TransferLocationView): boolean | null {
  if (a.fiscalId && b.fiscalId) {
    return a.fiscalId === b.fiscalId;
  }
  const left = a.fiscalName.trim().toLowerCase();
  const right = b.fiscalName.trim().toLowerCase();
  if (left && right) {
    return left === right;
  }
  return null;
}

export function shortFiscalLabel(view: TransferLocationView): string {
  const letters = view.rfc.replace(/[^A-Za-zÑñ]/g, '');
  if (letters) return letters.toUpperCase();
  return view.fiscalName || '—';
}

export function fiscalOptionLabel(fiscal: { razon_social?: string; rfc?: string }): string {
  const name = fiscal.razon_social?.trim() || 'Sin razón social';
  const rfc = fiscal.rfc?.trim();
  return rfc ? `${name} (${rfc})` : name;
}

export function destinationBranchLabel(branch: TransferDestinationBranch): string {
  const name = (branch.code || branch.name || '').trim() || '—';
  if (branch.city && branch.state) return `${name} — ${branch.city}, ${branch.state}`;
  if (branch.city) return `${name} — ${branch.city}`;
  return name;
}

export function destinationWarehouseLabel(name: string, code?: string): string {
  const trimmed = name?.trim() || '—';
  return code?.trim() ? `${code} — ${trimmed}` : trimmed;
}

export function destinationToLocationView(
  fiscal: TransferDestinationFiscal | null,
  branch: TransferDestinationBranch | null,
  warehouseName: string,
  warehouseId = '',
  warehouseCode = ''
): TransferLocationView {
  return {
    warehouseId,
    warehouseName: warehouseName || '—',
    warehouseCode,
    branchId: branch?.id ?? '',
    branchCode: (branch?.code || branch?.name || '').trim(),
    city: branch?.city?.trim() || '',
    state: branch?.state?.trim() || '',
    fiscalId: fiscal?.id ?? '',
    fiscalName: fiscal?.razon_social?.trim() || '',
    rfc: fiscal?.rfc?.trim() || '',
  };
}
