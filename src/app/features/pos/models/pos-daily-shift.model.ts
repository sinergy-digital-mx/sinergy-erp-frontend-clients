export interface PosSellerUser {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  pos_user_code?: number | null;
}

export interface ValidateSellerCodeResponse {
  seller: PosSellerUser;
  terminal_user?: {
    id?: string;
    pos_user_type?: string;
    billing_branch?: PosDailyShiftBranch & {
      fiscal_configuration_id?: string;
      fiscal_configuration?: { id?: string; razon_social?: string; rfc?: string };
    };
  };
  daily_shift?: PosDailyShiftDetail | null;
  requires_daily_shift?: boolean;
}

export type PosDailyShiftStatus = 'open' | 'closed';

export interface PosDailyShiftUser {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  pos_user_type?: 'VENTAS' | 'COBRANZA';
}

export interface PosDailyShiftBranch {
  id: string;
  code?: string;
  display_name?: string;
}

export interface PosDailyShiftListItem {
  id: string;
  shift_date: string;
  status: PosDailyShiftStatus | string;
  opening_cash_mxn?: number | string | null;
  opening_cash_usd?: number | string | null;
  terminal_user?: PosDailyShiftUser | null;
  billing_branch?: PosDailyShiftBranch | null;
  sales_summary?: {
    total_mxn?: number | string;
    sales_count?: number;
  } | null;
  totals?: {
    partial_shifts_count?: number;
    removed_total_mxn?: number | string;
    sales_total_mxn?: number | string;
  } | null;
  partial_shifts_count?: number;
}

export interface PosDailyShiftDenomination {
  currency: 'MXN' | 'USD';
  denomination: number;
  bill_count: number;
}

export interface PosDailyShiftPartial {
  id: string;
  sequence?: number;
  total_mxn?: number | string;
  total_usd?: number | string;
  notes?: string | null;
  created_at?: string;
  denominations?: PosDailyShiftDenomination[];
}

export interface PosDailyShiftDetail extends PosDailyShiftListItem {
  notes?: string | null;
  closed_at?: string | null;
  partial_shifts?: PosDailyShiftPartial[];
}

export interface OpenDailyShiftResponse {
  message?: string;
  daily_shift: PosDailyShiftDetail;
  queued_sales_assigned?: number;
}

export interface PosDailyShiftListResponse {
  data: PosDailyShiftListItem[];
  total: number;
}

export function parsePosMoney(value: unknown): number {
  if (value == null || value === '') {
    return 0;
  }
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function formatPosMoney(value: unknown): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(parsePosMoney(value));
}

export function dailyShiftTerminalLabel(shift: PosDailyShiftListItem): string {
  const user = shift.terminal_user;
  if (!user) {
    return '—';
  }
  const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
  return name || user.email || '—';
}

export function dailyShiftBranchLabel(shift: PosDailyShiftListItem): string {
  const branch = shift.billing_branch;
  if (!branch) {
    return '—';
  }
  return branch.display_name?.trim() || branch.code?.trim() || '—';
}

export function normalizeDailyShiftStatus(status: unknown): PosDailyShiftStatus | string | null {
  if (status == null) {
    return null;
  }
  if (typeof status === 'object') {
    const obj = status as Record<string, unknown>;
    return normalizeDailyShiftStatus(obj['code'] ?? obj['name'] ?? obj['value'] ?? obj['status']);
  }
  const normalized = String(status).trim().toLowerCase();
  if (normalized === 'open' || normalized === 'abierto' || normalized === 'opened' || normalized === 'activo') {
    return 'open';
  }
  if (normalized === 'closed' || normalized === 'cerrado' || normalized === 'closed_day') {
    return 'closed';
  }
  return String(status);
}

export function normalizeDailyShiftDetail(raw: unknown): PosDailyShiftDetail | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return null;
  }

  const source = raw as Record<string, unknown>;
  if (!source['id'] && !source['status'] && !source['is_open']) {
    return null;
  }

  const shift = { ...(source as unknown as PosDailyShiftDetail) };
  const normalizedStatus = normalizeDailyShiftStatus(
    source['is_open'] === true ? 'open' : source['is_open'] === false ? 'closed' : shift.status
  );
  if (normalizedStatus) {
    shift.status = normalizedStatus;
  }
  return shift;
}

export function dailyShiftStatusLabel(status: string | undefined): string {
  const normalized = normalizeDailyShiftStatus(status);
  return normalized === 'open' ? 'Abierto' : normalized === 'closed' ? 'Cerrado' : status ?? '—';
}

export function dailyShiftIsOpen(shift: PosDailyShiftListItem | null | undefined): boolean {
  if (!shift) {
    return false;
  }
  const record = shift as PosDailyShiftListItem & { is_open?: boolean };
  if (typeof record.is_open === 'boolean') {
    return record.is_open;
  }
  return normalizeDailyShiftStatus(shift.status) === 'open';
}

export function dailyShiftSalesTotal(shift: PosDailyShiftListItem): number {
  return (
    parsePosMoney(shift.totals?.sales_total_mxn) ||
    parsePosMoney(shift.sales_summary?.total_mxn)
  );
}

export function dailyShiftPartialCount(shift: PosDailyShiftListItem): number {
  return shift.totals?.partial_shifts_count ?? shift.partial_shifts_count ?? 0;
}
