export type WarehouseControlView = 'admin' | 'warehouse';

export type WarehouseControlJobStatus =
  | 'released'
  | 'picking'
  | 'waiting_assembly'
  | 'assembling'
  | 'assembled';

export type WarehouseControlTaskStatus = 'pending' | 'in_progress' | 'picked' | 'short';

export interface AssignedWarehouse {
  id: string;
  name?: string;
  code?: string;
  billing_branch_id?: string | null;
}

export interface WarehouseControlUserSummary {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface WarehouseControlCustomerSummary {
  id?: string | number;
  display_name?: string;
  name?: string;
  lastname?: string;
  company_name?: string;
  customer_name?: string;
  customer_display_name?: string;
}

export interface WarehouseControlBranchSummary {
  id?: string;
  display_name?: string;
  code?: string;
}

export interface WarehouseControlWarehouseSummary {
  id?: string;
  name?: string;
  code?: string;
}

export interface WarehouseControlMissingItem {
  product_name?: string;
  warehouse_name?: string;
  warehouse_id?: string;
  product_id?: string;
}

export interface WarehouseControlTaskLine {
  id: string;
  product_id?: string;
  product_name?: string;
  product_sku?: string;
  uom_name?: string;
  /** Cantidad pedida en la UOM de la OV. */
  quantity?: number | string;
  /** Cantidad ya surtida en la UOM de la OV. */
  quantity_picked?: number | string;
  quantity_base_uom?: number | string;
  quantity_base_ordered?: number | string;
  quantity_base_picked?: number | string;
  quantity_base_short?: number | string;
  warehouse_id?: string;
  warehouse_name?: string;
}

export interface WarehouseControlTask {
  id: string;
  status: WarehouseControlTaskStatus | string;
  warehouse_id?: string;
  warehouse?: WarehouseControlWarehouseSummary;
  warehouse_name?: string;
  lines?: WarehouseControlTaskLine[];
  lines_closed?: number;
  lines_total?: number;
  lines_count?: number;
  quantity_requested_total?: number;
}

export interface WarehouseControlPositionRef {
  id?: string;
  code?: string;
  name?: string;
  row?: number;
  col?: number;
}

export interface WarehouseControlJob {
  id: string;
  folio?: string;
  status: WarehouseControlJobStatus | string;
  has_shortage?: boolean;
  sales_order_id?: string;
  sales_order?: { id?: string; general_status?: string; folio?: string };
  expected_delivery_date?: string | null;
  notes?: string | null;
  created_at?: string;
  customer?: WarehouseControlCustomerSummary;
  customer_name?: string;
  customer_display_name?: string;
  billing_branch?: WarehouseControlBranchSummary;
  billing_branch_id?: string;
  position?: WarehouseControlPositionRef | null;
  position_id?: string | null;
  tasks?: WarehouseControlTask[];
  pick_tasks?: WarehouseControlTask[];
  missing?: WarehouseControlMissingItem[];
  created_by_user?: WarehouseControlUserSummary | null;
  progress?: {
    warehouses_done?: number;
    warehouses_total?: number;
  };
}

export interface WarehouseControlPosition {
  id: string;
  billing_branch_id?: string;
  code: string;
  name?: string;
  row: number;
  col: number;
  sort_order?: number;
  occupied?: boolean;
  job?: WarehouseControlJob | null;
}

export interface WarehouseControlWarehouseStats {
  pending?: number;
  in_progress?: number;
  picked_today?: number;
}

export interface WarehouseControlStats {
  in_desk?: number;
  released?: number;
  picking?: number;
  waiting_assembly?: number;
  assembling?: number;
  assembled?: number;
  queue?: number;
  assembled_today?: number;
  with_shortage?: number;
  positions_free?: number;
  positions_occupied?: number;
  warehouse?: WarehouseControlWarehouseStats;
}

export interface WarehouseControlBoardFilters {
  billing_branch_id?: string;
  search?: string;
  status?: string;
  stage?: string;
  view?: WarehouseControlView;
  page?: number;
  limit?: number;
}

export interface WarehouseControlBillingBranch {
  id: string;
  display_name?: string;
  name?: string;
  code?: string;
}

export interface WarehouseControlBoardResponse {
  stats: WarehouseControlStats;
  jobs: WarehouseControlJob[];
  positions: WarehouseControlPosition[];
  queue: WarehouseControlJob[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  scope_label?: string;
  assigned_warehouses?: AssignedWarehouse[];
  billing_branches?: WarehouseControlBillingBranch[];
  billing_branch_id?: string;
}

export interface WarehouseControlPositionPayload {
  billing_branch_id: string;
  code: string;
  name?: string;
  row: number;
  col: number;
  sort_order?: number;
}

export interface CompleteTaskPayload {
  lines?: Array<{
    id: string;
    quantity_base_picked: number;
  }>;
}

export interface CorroboratePayload {
  notes?: string;
}

export interface AssignPositionPayload {
  position_id?: string;
}

export const WAREHOUSE_CONTROL_JOB_STATUS_LABEL: Record<string, string> = {
  released: 'Por surtir',
  picking: 'Picking',
  waiting_assembly: 'Armando',
  assembling: 'Armando',
  assembled: 'Armada',
};

export const WAREHOUSE_CONTROL_JOB_STATUS_TOOLTIP: Record<string, string> = {
  released: 'En la cola, sin posición. Pasa a picking al asignarle piso.',
  picking: 'Ya tiene posición. Sigue aquí hasta que cada almacén surta lo suyo.',
  waiting_assembly: 'Todos los almacenes surtieron. Se arma en la caja.',
  assembling: 'Todos los almacenes surtieron. Se arma en la caja.',
  assembled: 'Armada. Se puede agregar a un viaje en Creado.',
  queue: 'En la cola, sin posición. Pasa a picking al asignarle piso.',
  today: 'Armadas hoy. Desde aquí se agregan a un viaje en Creado.',
};

export function warehouseControlJobStatusTooltip(status?: string | null): string {
  if (!status) return '';
  return WAREHOUSE_CONTROL_JOB_STATUS_TOOLTIP[status] || '';
}

export const WAREHOUSE_CONTROL_TASK_STATUS_LABEL: Record<string, string> = {
  pending: 'Pendiente',
  in_progress: 'En curso',
  picked: 'Surtida',
  short: 'Faltante',
};

export const EMPTY_WAREHOUSE_CONTROL_STATS: WarehouseControlStats = {
  in_desk: 0,
  released: 0,
  queue: 0,
  picking: 0,
  waiting_assembly: 0,
  assembling: 0,
  assembled: 0,
  assembled_today: 0,
  with_shortage: 0,
  positions_free: 0,
  positions_occupied: 0,
  warehouse: { pending: 0, in_progress: 0, picked_today: 0 },
};

export function warehouseControlJobStatusLabel(status?: string | null): string {
  if (!status) return '—';
  return WAREHOUSE_CONTROL_JOB_STATUS_LABEL[status] || status;
}

export function warehouseControlTaskStatusLabel(status?: string | null): string {
  if (!status) return '—';
  return WAREHOUSE_CONTROL_TASK_STATUS_LABEL[status] || status;
}

export function toWarehouseControlNumber(value: number | string | null | undefined): number {
  if (value == null || value === '') return 0;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function firstPositiveQty(...values: Array<number | string | null | undefined>): number {
  for (const value of values) {
    if (value == null || value === '') continue;
    const n = toWarehouseControlNumber(value);
    if (n > 0) return n;
  }
  return 0;
}

export function taskLineOrderedQty(line: WarehouseControlTaskLine): number {
  return firstPositiveQty(
    line.quantity,
    line.quantity_base_ordered,
    line.quantity_base_uom
  );
}

/** Pedido en la UOM que ve el jefe (la de la OV). */
export function taskLineSalesOrderedQty(line: WarehouseControlTaskLine): number {
  return firstPositiveQty(line.quantity, line.quantity_base_ordered, line.quantity_base_uom);
}

/** Pedido en UOM base, que es lo que recibe `complete`. */
export function taskLineBaseOrderedQty(line: WarehouseControlTaskLine): number {
  return firstPositiveQty(line.quantity_base_ordered, line.quantity_base_uom, line.quantity);
}

export function salesQtyToBase(line: WarehouseControlTaskLine, salesQty: number): number {
  const salesOrdered = firstPositiveQty(line.quantity);
  const baseOrdered = firstPositiveQty(line.quantity_base_ordered, line.quantity_base_uom);
  const qty = Number.isFinite(salesQty) ? Math.max(0, salesQty) : 0;
  if (salesOrdered > 0 && baseOrdered > 0) {
    return parseFloat(((qty * baseOrdered) / salesOrdered).toFixed(3));
  }
  return parseFloat(qty.toFixed(3));
}

export type WarehousePickStatusFilter = 'all' | WarehouseControlTaskStatus;

export function matchesPickStatus(
  status: string | null | undefined,
  filter: WarehousePickStatusFilter
): boolean {
  if (filter === 'all') return true;
  return status === filter;
}

export function matchesPickPosition(code: string | null | undefined, filter: string): boolean {
  if (!filter || filter === 'all') return true;
  const value = String(code ?? '').trim();
  if (filter === 'none') return !value;
  return value === filter;
}

export function taskLinePickedQty(line: WarehouseControlTaskLine): number {
  if (line.quantity_picked != null && line.quantity_picked !== '') {
    return toWarehouseControlNumber(line.quantity_picked);
  }
  const basePicked = toWarehouseControlNumber(line.quantity_base_picked);
  const salesOrdered = firstPositiveQty(line.quantity);
  const baseOrdered = firstPositiveQty(line.quantity_base_ordered, line.quantity_base_uom);
  if (salesOrdered > 0 && baseOrdered > 0 && basePicked > 0) {
    return parseFloat(((basePicked * salesOrdered) / baseOrdered).toFixed(3));
  }
  return basePicked;
}

export function taskLineShortQty(line: WarehouseControlTaskLine): number {
  const explicit = line.quantity_base_short;
  if (explicit != null && explicit !== '') {
    return toWarehouseControlNumber(explicit);
  }
  return Math.max(0, taskLineOrderedQty(line) - taskLinePickedQty(line));
}

export function isTaskClosed(status?: string | null): boolean {
  return status === 'picked' || status === 'short';
}

export function taskProgress(task: WarehouseControlTask): { closed: number; total: number } {
  const lines = task.lines ?? [];
  if (lines.length > 0) {
    const closed = isTaskClosed(task.status)
      ? lines.length
      : lines.filter((line) => taskLinePickedQty(line) > 0 || taskLineShortQty(line) > 0).length;
    return { closed, total: lines.length };
  }
  const total = toWarehouseControlNumber(task.lines_total);
  const closed = toWarehouseControlNumber(task.lines_closed);
  if (total > 0) {
    return { closed, total };
  }
  return { closed: isTaskClosed(task.status) ? 1 : 0, total: 1 };
}

export function allTasksClosed(tasks: WarehouseControlTask[] | undefined): boolean {
  const list = tasks ?? [];
  return list.length > 0 && list.every((task) => isTaskClosed(task.status));
}

export function warehouseNameOf(task: WarehouseControlTask): string {
  return task.warehouse?.name || task.warehouse_name || 'Almacén';
}

export type WarehouseKind = 'frio' | 'seco' | 'other';

export function warehouseKindFromLabel(value?: string | null): WarehouseKind {
  const raw = String(value ?? '').toLowerCase();
  if (/(fr[ií]o|cold)/.test(raw)) return 'frio';
  if (/seco|dry/.test(raw)) return 'seco';
  return 'other';
}

export function warehouseKindOf(task: WarehouseControlTask): WarehouseKind {
  return warehouseKindFromLabel(`${task.warehouse?.code || ''} ${warehouseNameOf(task)}`);
}

export function warehouseKindLabel(task: WarehouseControlTask): string {
  const kind = warehouseKindOf(task);
  if (kind === 'frio') return 'Frío';
  if (kind === 'seco') return 'Seco';
  return warehouseNameOf(task);
}

function firstNonEmpty(...values: Array<string | null | undefined>): string {
  for (const value of values) {
    const text = String(value ?? '').trim();
    if (text) return text;
  }
  return '';
}

export function customerDisplayName(customer?: WarehouseControlCustomerSummary | null): string {
  if (!customer) return '—';
  const person = [customer.name, customer.lastname].filter(Boolean).join(' ').trim();
  return (
    firstNonEmpty(
      person,
      customer.customer_name,
      customer.customer_display_name,
      customer.display_name,
      customer.company_name
    ) || '—'
  );
}

export function jobCustomerName(job?: WarehouseControlJob | null): string {
  if (!job) return '—';
  const nested = customerDisplayName(job.customer);
  if (nested !== '—') return nested;
  return firstNonEmpty(job.customer_name, job.customer_display_name) || '—';
}

export const WAREHOUSE_CONTROL_BRANCH_STORAGE_KEY = 'warehouse_control_billing_branch_id';

export function readCachedWarehouseControlBranchId(): string {
  try {
    return localStorage.getItem(WAREHOUSE_CONTROL_BRANCH_STORAGE_KEY)?.trim() || '';
  } catch {
    return '';
  }
}

export function writeCachedWarehouseControlBranchId(branchId: string | null | undefined): void {
  try {
    const value = String(branchId ?? '').trim();
    if (!value) {
      localStorage.removeItem(WAREHOUSE_CONTROL_BRANCH_STORAGE_KEY);
      return;
    }
    localStorage.setItem(WAREHOUSE_CONTROL_BRANCH_STORAGE_KEY, value);
  } catch {
    return;
  }
}

export function resolveWarehouseControlView(
  assignedWarehouses: AssignedWarehouse[] | null | undefined,
  isAdmin: boolean,
  requested?: string | null
): WarehouseControlView {
  const assigned = Array.isArray(assignedWarehouses) ? assignedWarehouses : [];
  if (requested === 'warehouse' && assigned.length > 0) {
    return 'warehouse';
  }
  if (requested === 'admin' && isAdmin) {
    return 'admin';
  }
  if (assigned.length === 0 || isAdmin) {
    return 'admin';
  }
  return 'warehouse';
}

export function normalizeAssignedWarehouses(raw: unknown): AssignedWarehouse[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }
      const row = item as Record<string, unknown>;
      const id = row['id'] ?? row['warehouse_id'];
      if (id == null || String(id).trim() === '') {
        return null;
      }
      return {
        id: String(id),
        name: row['name'] != null ? String(row['name']) : undefined,
        code: row['code'] != null ? String(row['code']) : undefined,
        billing_branch_id:
          row['billing_branch_id'] != null ? String(row['billing_branch_id']) : null,
      } as AssignedWarehouse;
    })
    .filter((item): item is AssignedWarehouse => item != null);
}
