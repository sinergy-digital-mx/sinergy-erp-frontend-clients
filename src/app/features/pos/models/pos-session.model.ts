export interface PosSessionUser {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface PosSessionBranch {
  id?: string;
  code?: string;
  display_name?: string;
  name?: string;
  fiscal_configuration_id?: string;
}

export interface PosSessionConfiguration {
  id: string;
  code?: string;
  modelo?: string;
  sucursal?: string;
  branch?: PosSessionBranch;
}

export interface PosSession {
  id: string;
  session_number?: number;
  status?: string;
  opened_at?: string;
  closed_at?: string;
  opening_cash?: number | string;
  initial_cash?: number | string;
  closing_cash?: number | string;
  total_sales?: number | string;
  cash_difference?: number | string;
  expected_cash?: number | string;
  user_id?: string;
  user?: PosSessionUser;
  closed_by?: PosSessionUser;
  posConfiguration?: PosSessionConfiguration;
}

export type PosSessionListItem = PosSession;

export type OpenShiftDialogResult =
  | {
      action: 'open';
      warehouse_id: string;
      opening_balance: number;
      notes: string;
      pos_configuration_id: string;
      pos_configuration_code?: string;
    }
  | {
      action: 'resume';
      session: PosSession;
      warehouse_id: string;
      pos_configuration_id: string;
      pos_configuration_code?: string;
    };

export function posSessionUserLabel(session: PosSession | null | undefined): string {
  const user = session?.user;
  if (!user) {
    return 'Usuario desconocido';
  }
  const name = [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
  return name || user.email || 'Usuario desconocido';
}

export function posSessionEquipmentLabel(
  session: PosSession | null | undefined,
  fallback?: string
): string {
  const cfg = session?.posConfiguration;
  if (!cfg) {
    return fallback || 'Equipo POS';
  }
  const parts = [cfg.code, cfg.modelo].filter(Boolean);
  return parts.join(' · ') || fallback || 'Equipo POS';
}

export function parsePosMoney(value: unknown): number {
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }
  const parsed = parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatPosCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
}

export function sessionTurnLabel(session: PosSession | null | undefined): string {
  if (session?.session_number != null) {
    return `#${session.session_number}`;
  }
  return '—';
}

export function sessionIsOpen(session: PosSession | null | undefined): boolean {
  if (!session) {
    return false;
  }
  const status = String(session.status || '').toLowerCase();
  if (status === 'open') {
    return true;
  }
  if (status === 'closed') {
    return false;
  }
  return !session.closed_at;
}

export function sessionOpeningCash(session: PosSession | null | undefined): number {
  return parsePosMoney(session?.opening_cash ?? session?.initial_cash);
}

export function sessionTotalSales(session: PosSession | null | undefined): number {
  return parsePosMoney(session?.total_sales);
}

export function sessionExpectedCash(session: PosSession | null | undefined): number {
  const explicit = parsePosMoney(session?.expected_cash);
  if (explicit > 0) {
    return explicit;
  }
  return sessionOpeningCash(session) + sessionTotalSales(session);
}

export function resolveSessionBranchLabel(
  session: PosSession | null | undefined,
  branches: Array<{ id: string; display_name?: string; code?: string }>
): string {
  const cfg = session?.posConfiguration;
  const branchFromCfg = cfg?.branch;
  if (branchFromCfg) {
    const name = branchFromCfg.display_name || branchFromCfg.name || branchFromCfg.code;
    if (name) {
      return name;
    }
  }
  const sucursalId = cfg?.sucursal?.trim();
  if (sucursalId && branches.length) {
    const match = branches.find((b) => b.id === sucursalId);
    if (match) {
      return match.display_name || match.code || '—';
    }
  }
  return '—';
}

export function formatPosDateTime(value?: string): string {
  if (!value) {
    return '—';
  }
  return new Date(value).toLocaleString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
