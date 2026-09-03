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
  pos_user_type?: 'VENTAS' | 'COBRANZA' | 'AMBOS';
}

export interface PosDailyShiftBranch {
  id: string;
  code?: string;
  display_name?: string;
}

export interface UnclosedShiftAlert {
  active: true;
  daily_shift_id: string;
  shift_date: string;
  today: string;
  days_open: number;
  title: string;
  message: string;
  severity: 'blocking';
}

export interface CurrentDailyShiftResponse {
  daily_shift: PosDailyShiftDetail | null;
  requires_previous_close: boolean;
  unclosed_shift_alert: UnclosedShiftAlert | null;
}

export interface PosDailyShiftListItem {
  id: string;
  shift_date: string;
  status: PosDailyShiftStatus | string;
  is_previous_day?: boolean;
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
    removed_total_usd?: number | string;
    sales_total_mxn?: number | string;
  } | null;
  partial_shifts_count?: number;
  partial_shifts?: PosDailyShiftPartial[];
}

export interface PosDailyShiftDenomination {
  currency: 'MXN' | 'USD';
  denomination: number;
  bill_count: number;
  amount?: number | string;
}

export interface PosDailyShiftPartial {
  id: string;
  sequence?: number;
  partial_number?: number;
  total_mxn?: number | string;
  total_usd?: number | string;
  removed_total_mxn?: number | string;
  removed_total_usd?: number | string;
  notes?: string | null;
  created_at?: string;
  performed_by_user?: PosDailyShiftUser & { pos_user_code?: number | null };
  denominations?: PosDailyShiftDenomination[];
}

export interface PosDailyShiftCashDrawer {
  opening_cash_mxn?: number | string;
  opening_cash_usd?: number | string;
  collected_cash_mxn?: number | string;
  collected_cash_usd?: number | string;
  collected_transfer_mxn?: number | string;
  collected_card_mxn?: number | string;
  collected_credit_mxn?: number | string;
  removed_total_mxn?: number | string;
  removed_total_usd?: number | string;
  expected_cash_mxn?: number | string;
  expected_cash_usd?: number | string;
  closing_cash_mxn?: number | string | null;
  closing_cash_usd?: number | string | null;
  cash_difference_mxn?: number | string | null;
  cash_difference_usd?: number | string | null;
  closing_denominations?: Array<{
    currency: 'MXN' | 'USD';
    denomination: number;
    bill_count: number;
    amount?: number | string;
  }> | null;
}

export interface PosDailyShiftDetail extends PosDailyShiftListItem {
  notes?: string | null;
  closed_at?: string | null;
  partial_shifts?: PosDailyShiftPartial[];
  cash_drawer?: PosDailyShiftCashDrawer | null;
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

export function expectedCashInDrawer(
  opening: number,
  collectedCash: number,
  removed: number,
): number {
  return Math.round((opening + collectedCash - removed + Number.EPSILON) * 100) / 100;
}

export function cashDifferenceType(
  counted: number,
  expected: number,
): 'exact' | 'surplus' | 'shortage' {
  const diff = Math.round((counted - expected + Number.EPSILON) * 100) / 100;
  if (diff > 0.009) {
    return 'surplus';
  }
  if (diff < -0.009) {
    return 'shortage';
  }
  return 'exact';
}

export function formatPosMoney(value: unknown): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
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

export function dailyShiftMatchesBranch(
  shift: PosDailyShiftListItem | null | undefined,
  billingBranchId: string | null | undefined,
): boolean {
  if (!shift || !billingBranchId) {
    return false;
  }
  const shiftId = shift.billing_branch?.id;
  return !!shiftId && String(shiftId) === String(billingBranchId);
}

export function dailyShiftBranchLabel(shift: PosDailyShiftListItem): string {
  const branch = shift.billing_branch;
  if (!branch) {
    return '—';
  }
  return branch.display_name?.trim() || branch.code?.trim() || '—';
}

export function posUserDisplayLabel(
  user: (PosDailyShiftUser & { pos_user_code?: number | null }) | null | undefined,
  fallback = '—'
): string {
  if (!user) {
    return fallback;
  }
  const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
  const code = user.pos_user_code != null ? ` (${user.pos_user_code})` : '';
  if (name) {
    return `${name}${code}`;
  }
  return user.email || fallback;
}

export function partialPerformedByLabel(
  partial: PosDailyShiftPartial,
  terminalFallback?: PosDailyShiftUser | null
): string {
  if (partial.performed_by_user) {
    return posUserDisplayLabel(partial.performed_by_user);
  }
  if (terminalFallback) {
    return posUserDisplayLabel(terminalFallback, 'Terminal cobranza');
  }
  return 'Terminal cobranza';
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

export function parseUnclosedShiftAlert(raw: unknown): UnclosedShiftAlert | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return null;
  }
  const source = raw as Record<string, unknown>;
  const dailyShiftId = String(source['daily_shift_id'] ?? '').trim();
  const shiftDate = String(source['shift_date'] ?? '').slice(0, 10);
  if (!dailyShiftId) {
    return null;
  }

  const daysOpen = Number(source['days_open']);
  return {
    active: true,
    daily_shift_id: dailyShiftId,
    shift_date: shiftDate,
    today: String(source['today'] ?? '').slice(0, 10),
    days_open: Number.isFinite(daysOpen) && daysOpen > 0 ? daysOpen : 1,
    title: String(source['title'] ?? 'Corte del día anterior sin cerrar'),
    message:
      String(source['message'] ?? '').trim() ||
      `No se cerró el corte del ${shiftDate || 'día anterior'}. Es necesario cerrarlo para continuar.`,
    severity: 'blocking',
  };
}

export function unclosedAlertFromShift(shift: PosDailyShiftListItem): UnclosedShiftAlert {
  const shiftDate = String(shift.shift_date ?? '').slice(0, 10);
  return {
    active: true,
    daily_shift_id: shift.id,
    shift_date: shiftDate,
    today: '',
    days_open: 1,
    title: 'Corte del día anterior sin cerrar',
    message: `No se cerró el corte del ${shiftDate || 'día anterior'}. Cobranza debe cerrarlo para continuar.`,
    severity: 'blocking',
  };
}

export function dailyShiftSalesTotal(shift: PosDailyShiftListItem): number {
  return (
    parsePosMoney(shift.totals?.sales_total_mxn) ||
    parsePosMoney(shift.sales_summary?.total_mxn)
  );
}

export function dailyShiftPartialCount(shift: PosDailyShiftListItem): number {
  const fromPartials = shift.partial_shifts?.length;
  if (typeof fromPartials === 'number' && fromPartials > 0) {
    return fromPartials;
  }
  return shift.totals?.partial_shifts_count ?? shift.partial_shifts_count ?? 0;
}

export function sumPartialDenominations(
  denominations: PosDailyShiftDenomination[] | undefined,
  currency: 'MXN' | 'USD'
): number {
  if (!denominations?.length) {
    return 0;
  }
  return denominations.reduce((sum, item) => {
    if (item.currency !== currency) {
      return sum;
    }
    const amount =
      item.amount != null && item.amount !== ''
        ? parsePosMoney(item.amount)
        : parsePosMoney(item.denomination) * parsePosMoney(item.bill_count);
    return sum + amount;
  }, 0);
}

export function partialShiftTotalMxn(partial: PosDailyShiftPartial): number {
  const fromTotal = parsePosMoney(partial.total_mxn);
  if (fromTotal > 0) {
    return fromTotal;
  }
  const fromRemoved = parsePosMoney(partial.removed_total_mxn);
  if (fromRemoved > 0) {
    return fromRemoved;
  }
  return sumPartialDenominations(partial.denominations, 'MXN');
}

export function partialShiftTotalUsd(partial: PosDailyShiftPartial): number {
  const fromTotal = parsePosMoney(partial.total_usd);
  if (fromTotal > 0) {
    return fromTotal;
  }
  const fromRemoved = parsePosMoney(partial.removed_total_usd);
  if (fromRemoved > 0) {
    return fromRemoved;
  }
  return sumPartialDenominations(partial.denominations, 'USD');
}

export function partialShiftSequence(partial: PosDailyShiftPartial, index: number): number {
  return partial.partial_number ?? partial.sequence ?? index + 1;
}

export function dailyShiftRemovedTotal(shift: PosDailyShiftListItem): number {
  if (shift.totals?.removed_total_mxn != null) {
    const fromTotals = parsePosMoney(shift.totals.removed_total_mxn);
    if (fromTotals > 0) {
      return fromTotals;
    }
  }
  if (!shift.partial_shifts?.length) {
    return 0;
  }
  return shift.partial_shifts.reduce(
    (sum, partial) => sum + partialShiftTotalMxn(partial),
    0
  );
}

export function partialShiftTotalLabel(partial: PosDailyShiftPartial): string {
  const mxn = partialShiftTotalMxn(partial);
  const usd = partialShiftTotalUsd(partial);
  if (usd > 0 && mxn > 0) {
    return `${formatPosMoney(mxn)} + USD ${usd.toFixed(2)}`;
  }
  if (usd > 0) {
    return `USD ${usd.toFixed(2)}`;
  }
  return formatPosMoney(mxn);
}
