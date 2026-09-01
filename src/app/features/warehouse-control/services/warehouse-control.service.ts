import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  AssignPositionPayload,
  CompleteTaskPayload,
  CorroboratePayload,
  EMPTY_WAREHOUSE_CONTROL_STATS,
  WarehouseControlBoardFilters,
  AssignedWarehouse,
  WarehouseControlBillingBranch,
  WarehouseControlBoardResponse,
  WarehouseControlCustomerSummary,
  WarehouseControlJob,
  WarehouseControlJobStatus,
  WarehouseControlMissingItem,
  WarehouseControlPosition,
  WarehouseControlPositionPayload,
  WarehouseControlStats,
  WarehouseControlTask,
  WarehouseControlTaskLine,
  WarehouseControlTaskStatus,
  WarehouseControlWarehouseStats,
  firstPositiveQty,
} from '../models/warehouse-control.model';

@Injectable({
  providedIn: 'root',
})
export class WarehouseControlService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.api}/tenant/warehouse-control`;

  getBoard(filters: WarehouseControlBoardFilters): Observable<WarehouseControlBoardResponse> {
    return this.http
      .get<unknown>(this.baseUrl, { params: this.boardParams(filters) })
      .pipe(map((raw) => this.normalizeBoard(raw, filters)));
  }

  getStats(filters: WarehouseControlBoardFilters): Observable<WarehouseControlStats> {
    return this.http
      .get<unknown>(`${this.baseUrl}/stats`, { params: this.boardParams(filters, false) })
      .pipe(map((raw) => this.normalizeStats(this.unwrapRecord(raw)?.['stats'] ?? this.unwrapRecord(raw))));
  }

  getJob(jobId: string): Observable<WarehouseControlJob> {
    return this.http
      .get<unknown>(`${this.baseUrl}/${jobId}`)
      .pipe(map((raw) => this.normalizeJob(this.unwrapRecord(raw))));
  }

  assignPosition(jobId: string, payload?: AssignPositionPayload): Observable<WarehouseControlJob> {
    return this.http
      .post<unknown>(`${this.baseUrl}/${jobId}/assign-position`, payload ?? {})
      .pipe(map((raw) => this.normalizeJob(this.unwrapRecord(raw))));
  }

  assemble(jobId: string): Observable<WarehouseControlJob> {
    return this.http
      .post<unknown>(`${this.baseUrl}/${jobId}/assemble`, {})
      .pipe(map((raw) => this.normalizeJob(this.unwrapRecord(raw))));
  }

  corroborate(jobId: string, payload?: CorroboratePayload): Observable<WarehouseControlJob> {
    return this.http
      .post<unknown>(`${this.baseUrl}/${jobId}/corroborate`, payload ?? {})
      .pipe(map((raw) => this.normalizeJob(this.unwrapRecord(raw))));
  }

  startTask(jobId: string, taskId: string): Observable<WarehouseControlJob> {
    return this.http
      .post<unknown>(`${this.baseUrl}/${jobId}/tasks/${taskId}/start`, {})
      .pipe(map((raw) => this.normalizeJob(this.unwrapRecord(raw))));
  }

  completeTask(
    jobId: string,
    taskId: string,
    payload?: CompleteTaskPayload
  ): Observable<WarehouseControlJob> {
    return this.http
      .post<unknown>(`${this.baseUrl}/${jobId}/tasks/${taskId}/complete`, payload ?? {})
      .pipe(map((raw) => this.normalizeJob(this.unwrapRecord(raw))));
  }

  listPositions(billingBranchId: string): Observable<WarehouseControlPosition[]> {
    const params = new HttpParams().set('billing_branch_id', billingBranchId);
    return this.http
      .get<unknown>(`${this.baseUrl}/positions`, { params })
      .pipe(map((raw) => this.normalizePositions(raw)));
  }

  createPosition(payload: WarehouseControlPositionPayload): Observable<WarehouseControlPosition> {
    return this.http
      .post<unknown>(`${this.baseUrl}/positions`, payload)
      .pipe(map((raw) => this.normalizePosition(this.unwrapRecord(raw))));
  }

  updatePosition(
    positionId: string,
    payload: Partial<WarehouseControlPositionPayload>
  ): Observable<WarehouseControlPosition> {
    return this.http
      .put<unknown>(`${this.baseUrl}/positions/${positionId}`, payload)
      .pipe(map((raw) => this.normalizePosition(this.unwrapRecord(raw))));
  }

  deletePosition(positionId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/positions/${positionId}`);
  }

  private boardParams(filters: WarehouseControlBoardFilters, includePaging = true): HttpParams {
    let params = new HttpParams();
    if (includePaging) {
      params = params
        .set('page', String(filters.page ?? 1))
        .set('limit', String(filters.limit ?? 50));
    }
    if (filters.billing_branch_id) {
      params = params.set('billing_branch_id', filters.billing_branch_id);
    }
    if (filters.search?.trim()) {
      params = params.set('search', filters.search.trim());
    }
    if (filters.status?.trim()) {
      params = params.set('status', filters.status.trim());
    }
    if (filters.view) {
      params = params.set('view', filters.view);
    }
    return params;
  }

  private unwrapRecord(raw: unknown): Record<string, unknown> {
    if (!raw || typeof raw !== 'object') {
      return {};
    }
    const source = raw as Record<string, unknown>;
    const data = source['data'];
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const nested = data as Record<string, unknown>;
      const header =
        nested['header'] && typeof nested['header'] === 'object'
          ? (nested['header'] as Record<string, unknown>)
          : null;
      return header ? { ...nested, ...header } : nested;
    }
    return source;
  }

  private asArray(value: unknown): unknown[] {
    if (Array.isArray(value)) {
      return value;
    }
    if (value && typeof value === 'object') {
      const row = value as Record<string, unknown>;
      if (Array.isArray(row['data'])) {
        return row['data'];
      }
      if (Array.isArray(row['items'])) {
        return row['items'];
      }
    }
    return [];
  }

  private normalizeBoard(
    raw: unknown,
    filters: WarehouseControlBoardFilters
  ): WarehouseControlBoardResponse {
    const root = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
    const data =
      root['data'] && typeof root['data'] === 'object' && !Array.isArray(root['data'])
        ? (root['data'] as Record<string, unknown>)
        : root;

    const jobs = this.asArray(data['jobs'] ?? data['data']).map((item) =>
      this.normalizeJob(item)
    );
    const queue = this.asArray(data['queue']).map((item) => this.normalizeJob(item));
    const positions = this.normalizePositions(data['positions'] ?? data);

    const page = Number(data['page'] ?? root['page'] ?? filters.page ?? 1);
    const limit = Number(data['limit'] ?? root['limit'] ?? filters.limit ?? 50);
    const total = Number(data['total'] ?? root['total'] ?? jobs.length);
    const totalPages = Number(data['totalPages'] ?? root['totalPages'] ?? Math.max(1, Math.ceil(total / limit)));

    return {
      stats: this.normalizeStats(data['stats']),
      jobs,
      positions,
      queue,
      page: Number.isFinite(page) ? page : 1,
      limit: Number.isFinite(limit) ? limit : 50,
      total: Number.isFinite(total) ? total : 0,
      totalPages: Number.isFinite(totalPages) ? totalPages : 1,
      hasNext: Boolean(data['hasNext'] ?? root['hasNext'] ?? page < totalPages),
      hasPrev: Boolean(data['hasPrev'] ?? root['hasPrev'] ?? page > 1),
      scope_label: this.firstString(data['scope_label'], root['scope_label']) || undefined,
      assigned_warehouses: this.normalizeAssignedWarehouses(
        data['assigned_warehouses'] ?? root['assigned_warehouses']
      ),
      billing_branches: this.normalizeBillingBranches(
        data['billing_branches'] ?? root['billing_branches']
      ),
      billing_branch_id:
        this.firstString(data['billing_branch_id'], root['billing_branch_id']) || undefined,
    };
  }

  private normalizeAssignedWarehouses(raw: unknown): AssignedWarehouse[] {
    return this.asArray(raw)
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const row = item as Record<string, unknown>;
        const id = row['id'] ?? row['warehouse_id'];
        if (id == null || String(id).trim() === '') return null;
        return {
          id: String(id),
          name: this.firstString(row['name']) || undefined,
          code: this.firstString(row['code']) || undefined,
          billing_branch_id:
            row['billing_branch_id'] != null ? String(row['billing_branch_id']) : null,
        } as AssignedWarehouse;
      })
      .filter((item): item is AssignedWarehouse => item != null);
  }

  private normalizeBillingBranches(raw: unknown): WarehouseControlBillingBranch[] {
    return this.asArray(raw)
      .map((item): WarehouseControlBillingBranch | null => {
        if (!item || typeof item !== 'object') return null;
        const row = item as Record<string, unknown>;
        const id = row['id'];
        if (id == null || String(id).trim() === '') return null;
        return {
          id: String(id),
          display_name: this.firstString(row['display_name'], row['name']) || undefined,
          name: this.firstString(row['name']) || undefined,
          code: this.firstString(row['code']) || undefined,
        };
      })
      .filter((item): item is WarehouseControlBillingBranch => item != null);
  }

  private normalizeStats(raw: unknown): WarehouseControlStats {
    if (!raw || typeof raw !== 'object') {
      return { ...EMPTY_WAREHOUSE_CONTROL_STATS, warehouse: { ...EMPTY_WAREHOUSE_CONTROL_STATS.warehouse } };
    }
    const row = raw as Record<string, unknown>;
    const warehouseRaw =
      row['warehouse'] && typeof row['warehouse'] === 'object'
        ? (row['warehouse'] as WarehouseControlWarehouseStats)
        : {};
    return {
      in_desk: Number(row['in_desk'] ?? 0),
      released: Number(row['released'] ?? 0),
      picking: Number(row['picking'] ?? 0),
      waiting_assembly: Number(row['waiting_assembly'] ?? 0),
      assembling: Number(row['assembling'] ?? 0),
      assembled: Number(row['assembled'] ?? 0),
      with_shortage: Number(row['with_shortage'] ?? 0),
      positions_free: Number(row['positions_free'] ?? 0),
      positions_occupied: Number(row['positions_occupied'] ?? 0),
      warehouse: {
        pending: Number(warehouseRaw.pending ?? 0),
        in_progress: Number(warehouseRaw.in_progress ?? 0),
        picked_today: Number(warehouseRaw.picked_today ?? 0),
      },
    };
  }

  private normalizePositions(raw: unknown): WarehouseControlPosition[] {
    const list = this.asArray(
      Array.isArray(raw) ? raw : (raw as Record<string, unknown> | undefined)?.['positions'] ?? raw
    );
    return list
      .map((item) => this.normalizePosition(item))
      .filter((item) => !!item.id);
  }

  private normalizePosition(raw: unknown): WarehouseControlPosition {
    if (!raw || typeof raw !== 'object') {
      return { id: '', code: '', row: 0, col: 0 };
    }
    const row = raw as Record<string, unknown>;
    const jobRaw = row['job'];
    return {
      id: String(row['id'] ?? ''),
      billing_branch_id: row['billing_branch_id'] != null ? String(row['billing_branch_id']) : undefined,
      code: String(row['code'] ?? ''),
      name: row['name'] != null ? String(row['name']) : undefined,
      row: Number(row['row'] ?? 0),
      col: Number(row['col'] ?? 0),
      sort_order: row['sort_order'] != null ? Number(row['sort_order']) : undefined,
      occupied: Boolean(row['occupied'] ?? jobRaw),
      job: jobRaw && typeof jobRaw === 'object' ? this.normalizeJob(jobRaw) : null,
    };
  }

  normalizeJob(raw: unknown): WarehouseControlJob {
    if (!raw || typeof raw !== 'object') {
      return { id: '', status: 'released' };
    }
    const source = raw as Record<string, unknown>;
    const data =
      source['data'] && typeof source['data'] === 'object' && !Array.isArray(source['data'])
        ? (source['data'] as Record<string, unknown>)
        : source;
    const header =
      data['header'] && typeof data['header'] === 'object'
        ? { ...data, ...(data['header'] as Record<string, unknown>) }
        : data;

    const tasks = this.asArray(header['tasks']).map((item) => this.normalizeTask(item));
    const pickTasks = this.asArray(header['pick_tasks']).map((item) => this.normalizeTask(item));
    const missing = this.asArray(header['missing']).map((item) => this.normalizeMissing(item));
    const position = this.normalizePositionRef(header['position']);
    const customer = this.normalizeCustomer(header);
    const customerName = this.firstString(
      header['customer_name'],
      customer?.name,
      customer?.customer_name,
      header['customer_display_name'],
      customer?.customer_display_name,
      customer?.display_name
    );

    return {
      ...(header as unknown as WarehouseControlJob),
      id: String(header['id'] ?? ''),
      folio: header['folio'] != null ? String(header['folio']) : undefined,
      status: (header['status'] as WarehouseControlJobStatus) || 'released',
      has_shortage: Boolean(header['has_shortage']),
      sales_order_id:
        header['sales_order_id'] != null ? String(header['sales_order_id']) : undefined,
      customer,
      customer_name: customerName || undefined,
      customer_display_name:
        this.firstString(header['customer_display_name'], customer?.customer_display_name, customerName) ||
        undefined,
      position,
      position_id:
        header['position_id'] != null
          ? String(header['position_id'])
          : position?.id ?? null,
      tasks,
      pick_tasks: pickTasks,
      missing,
    };
  }

  private normalizeCustomer(header: Record<string, unknown>): WarehouseControlCustomerSummary | undefined {
    const raw = header['customer'];
    const customer =
      raw && typeof raw === 'object' && !Array.isArray(raw)
        ? (raw as Record<string, unknown>)
        : {};
    const salesOrder =
      header['sales_order'] && typeof header['sales_order'] === 'object'
        ? (header['sales_order'] as Record<string, unknown>)
        : {};
    const salesCustomer =
      salesOrder['customer'] && typeof salesOrder['customer'] === 'object'
        ? (salesOrder['customer'] as Record<string, unknown>)
        : {};
    const name = this.firstString(
      customer['name'],
      salesCustomer['name'],
      customer['customer_name'],
      header['customer_name'],
      salesOrder['customer_name'],
      customer['customer_display_name'],
      header['customer_display_name'],
      salesOrder['customer_display_name'],
      customer['display_name']
    );
    const id = customer['id'] ?? header['customer_id'];
    if (!name && id == null) {
      return undefined;
    }
    return {
      id: id != null ? (id as string | number) : undefined,
      name: name || undefined,
      lastname: this.firstString(customer['lastname']) || undefined,
      company_name: this.firstString(customer['company_name']) || undefined,
      display_name: this.firstString(customer['display_name'], name) || undefined,
      customer_name: this.firstString(customer['customer_name'], header['customer_name'], name) || undefined,
      customer_display_name:
        this.firstString(customer['customer_display_name'], header['customer_display_name']) || undefined,
    };
  }

  private firstString(...values: unknown[]): string {
    for (const value of values) {
      const text = String(value ?? '').trim();
      if (text) return text;
    }
    return '';
  }

  private normalizePositionRef(raw: unknown): WarehouseControlJob['position'] {
    if (!raw || typeof raw !== 'object') {
      return null;
    }
    const row = raw as Record<string, unknown>;
    if (row['id'] == null && row['code'] == null) {
      return null;
    }
    return {
      id: row['id'] != null ? String(row['id']) : undefined,
      code: row['code'] != null ? String(row['code']) : undefined,
      name: row['name'] != null ? String(row['name']) : undefined,
      row: row['row'] != null ? Number(row['row']) : undefined,
      col: row['col'] != null ? Number(row['col']) : undefined,
    };
  }

  private normalizeTask(raw: unknown): WarehouseControlTask {
    if (!raw || typeof raw !== 'object') {
      return { id: '', status: 'pending' };
    }
    const row = raw as Record<string, unknown>;
    const warehouse =
      row['warehouse'] && typeof row['warehouse'] === 'object'
        ? (row['warehouse'] as WarehouseControlTask['warehouse'])
        : undefined;
    return {
      id: String(row['id'] ?? ''),
      status: (row['status'] as WarehouseControlTaskStatus) || 'pending',
      warehouse_id:
        row['warehouse_id'] != null
          ? String(row['warehouse_id'])
          : warehouse?.id,
      warehouse,
      warehouse_name:
        row['warehouse_name'] != null
          ? String(row['warehouse_name'])
          : warehouse?.name,
      lines: this.asArray(row['lines']).map((item) => this.normalizeTaskLine(item)),
      lines_closed: row['lines_closed'] != null ? Number(row['lines_closed']) : undefined,
      lines_total: row['lines_total'] != null ? Number(row['lines_total']) : undefined,
    };
  }

  private normalizeTaskLine(raw: unknown): WarehouseControlTaskLine {
    if (!raw || typeof raw !== 'object') {
      return { id: '' };
    }
    const row = raw as Record<string, unknown>;
    const nested =
      row['sales_order_line'] && typeof row['sales_order_line'] === 'object'
        ? (row['sales_order_line'] as Record<string, unknown>)
        : {};
    const ordered = firstPositiveQty(
      this.asQty(row['quantity_base_ordered']),
      this.asQty(row['quantity_ordered']),
      this.asQty(row['ordered_qty']),
      this.asQty(row['qty_ordered']),
      this.asQty(row['quantity_requested']),
      this.asQty(row['requested_qty']),
      this.asQty(row['qty']),
      this.asQty(row['quantity']),
      this.asQty(row['quantity_base_uom']),
      this.asQty(row['quantity_base']),
      this.asQty(nested['quantity_base_ordered']),
      this.asQty(nested['quantity_ordered']),
      this.asQty(nested['quantity']),
      this.asQty(nested['qty'])
    );
    return {
      id: String(row['id'] ?? ''),
      product_id: row['product_id'] != null ? String(row['product_id']) : undefined,
      product_name: this.firstString(row['product_name'], nested['product_name']) || undefined,
      product_sku: this.firstString(row['product_sku'], nested['sku'], nested['product_sku']) || undefined,
      uom_name: this.firstString(row['uom_name'], nested['uom_name']) || undefined,
      quantity: ordered || this.asQty(row['quantity']),
      quantity_base_uom: this.asQty(row['quantity_base_uom']),
      quantity_base_ordered: ordered || undefined,
      quantity_base_picked: this.asQty(row['quantity_base_picked'] ?? row['quantity_picked'] ?? row['picked_qty']),
      quantity_base_short: this.asQty(row['quantity_base_short'] ?? row['quantity_short'] ?? row['short_qty']),
      warehouse_id: row['warehouse_id'] != null ? String(row['warehouse_id']) : undefined,
      warehouse_name: row['warehouse_name'] != null ? String(row['warehouse_name']) : undefined,
    };
  }

  private asQty(value: unknown): number | undefined {
    if (value == null || value === '') return undefined;
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  }

  private normalizeMissing(raw: unknown): WarehouseControlMissingItem {
    if (!raw || typeof raw !== 'object') {
      return {};
    }
    const row = raw as Record<string, unknown>;
    return {
      product_name: row['product_name'] != null ? String(row['product_name']) : undefined,
      warehouse_name: row['warehouse_name'] != null ? String(row['warehouse_name']) : undefined,
      warehouse_id: row['warehouse_id'] != null ? String(row['warehouse_id']) : undefined,
      product_id: row['product_id'] != null ? String(row['product_id']) : undefined,
    };
  }
}
