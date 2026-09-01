import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  InventoryBatch,
  InventoryBatchResponse,
  UpdateInventoryBatchPayload,
  normalizeInventoryBatchMovementSummary,
} from '../models/inventory-batch.model';
import {
  InventoryBatchMovementsResponse,
  normalizeInventoryBatchMovementsResponse,
} from '../models/inventory-batch-movement.model';
import { environment } from '../../../../environments/environment';

function firstDefined<T>(...values: T[]): T | undefined {
  return values.find((value) => value !== undefined && value !== null);
}

function coerceFlag(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.trim().toLowerCase() === 'true' || value.trim() === '1';
  }
  return value === true || value === 1;
}

function pickFlag(body: Record<string, unknown>, root: Record<string, unknown>, ...keys: string[]): unknown {
  return firstDefined(...keys.flatMap((key) => [body[key], root[key]]));
}

function isMeasureUnset(batch: InventoryBatch): boolean {
  return batch.measure === null || batch.measure === undefined || batch.measure === '';
}

function unwrapInventoryBatch(res: unknown): InventoryBatch {
  if (!res || typeof res !== 'object') {
    return res as InventoryBatch;
  }
  const root = res as Record<string, unknown>;
  const nested = root['data'];
  const body =
    nested && typeof nested === 'object' && !Array.isArray(nested)
      ? (nested as Record<string, unknown>)
      : root;
  const batch = { ...body } as unknown as InventoryBatch;
  const canEditTag = pickFlag(body, root, 'can_edit_tag', 'canEditTag');
  const canEditMeasure = pickFlag(body, root, 'can_edit_measure', 'canEditMeasure');
  const canTransfer = pickFlag(body, root, 'can_transfer', 'canTransfer');
  batch.can_edit_tag = canEditTag !== undefined ? coerceFlag(canEditTag) : true;
  batch.can_edit_measure = canEditMeasure !== undefined ? coerceFlag(canEditMeasure) : isMeasureUnset(batch);
  if (canTransfer !== undefined) batch.can_transfer = coerceFlag(canTransfer);

  const summary = normalizeInventoryBatchMovementSummary(
    firstDefined(body['movement_summary'], root['movement_summary'], body['movements_summary'], root['movements_summary'])
  );
  if (summary) {
    batch.movement_summary = summary;
  }

  const movementsRaw = firstDefined(body['movements'], root['movements']);
  if (movementsRaw != null) {
    const normalized = normalizeInventoryBatchMovementsResponse(movementsRaw);
    batch.movements = normalized.data;
    if (batch.movements_count == null && normalized.data.length) {
      batch.movements_count = normalized.total;
    }
  }
  const movementsCount = firstDefined(body['movements_count'], root['movements_count']);
  if (movementsCount != null) {
    batch.movements_count = Number(movementsCount) || 0;
  } else if (batch.movements_count == null && Array.isArray(batch.movements)) {
    batch.movements_count = batch.movements.length;
  }

  return batch;
}

export interface BatchFilters {
  search?: string;
  batch_number?: string;
  product_id?: string;
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
  warehouse_id?: string;
  purchase_order_batch_id?: string;
  purchase_order_id?: string;
  created_from?: string;
  created_to?: string;
  page?: number;
  limit?: number;
  sort_by?: 'batch_number' | 'created_at' | 'quantity';
  sort_order?: 'ASC' | 'DESC';
}

@Injectable({
  providedIn: 'root'
})
export class InventoryBatchService {
  private apiUrl = `${environment.api}/tenant/inventory/batches`;

  constructor(private http: HttpClient) {}

  getBatches(filters: BatchFilters = {}): Observable<InventoryBatchResponse> {
    let params = new HttpParams();
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', filters.limit.toString());
    if (filters.search) params = params.set('search', filters.search);
    if (filters.batch_number) params = params.set('batch_number', filters.batch_number);
    if (filters.product_id) params = params.set('product_id', filters.product_id);
    if (filters.fiscal_configuration_id) params = params.set('fiscal_configuration_id', filters.fiscal_configuration_id);
    if (filters.billing_branch_id) params = params.set('billing_branch_id', filters.billing_branch_id);
    if (filters.warehouse_id) params = params.set('warehouse_id', filters.warehouse_id);
    if (filters.purchase_order_batch_id) params = params.set('purchase_order_batch_id', filters.purchase_order_batch_id);
    if (filters.purchase_order_id) params = params.set('purchase_order_id', filters.purchase_order_id);
    if (filters.created_from) params = params.set('created_from', filters.created_from);
    if (filters.created_to) params = params.set('created_to', filters.created_to);
    if (filters.sort_by) params = params.set('sort_by', filters.sort_by);
    if (filters.sort_order) params = params.set('sort_order', filters.sort_order);
    return this.http.get<InventoryBatchResponse>(this.apiUrl, { params });
  }

  getBatchesByPurchaseOrder(poId: string, filters: Omit<BatchFilters, 'purchase_order_batch_id' | 'purchase_order_id'> = {}): Observable<InventoryBatchResponse> {
    let params = new HttpParams();
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', filters.limit.toString());
    if (filters.search) params = params.set('search', filters.search);
    if (filters.batch_number) params = params.set('batch_number', filters.batch_number);
    if (filters.product_id) params = params.set('product_id', filters.product_id);
    if (filters.warehouse_id) params = params.set('warehouse_id', filters.warehouse_id);
    if (filters.created_from) params = params.set('created_from', filters.created_from);
    if (filters.created_to) params = params.set('created_to', filters.created_to);
    if (filters.sort_by) params = params.set('sort_by', filters.sort_by);
    if (filters.sort_order) params = params.set('sort_order', filters.sort_order);
    return this.http.get<InventoryBatchResponse>(`${this.apiUrl}/purchase-order/${poId}`, { params });
  }

  getBatchById(id: string): Observable<InventoryBatch> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((res) => unwrapInventoryBatch(res))
    );
  }

  getBatchMovements(id: string): Observable<InventoryBatchMovementsResponse> {
    return this.http.get<unknown>(`${this.apiUrl}/${id}/movements`).pipe(
      map((raw) => normalizeInventoryBatchMovementsResponse(raw))
    );
  }

  updateBatch(id: string, payload: UpdateInventoryBatchPayload): Observable<InventoryBatch> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, payload).pipe(
      map((res) => unwrapInventoryBatch(res)),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(this.extractErrorMessage(error))))
    );
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    const body = error.error;
    if (typeof body?.message === 'string' && body.message.trim()) {
      return body.message;
    }
    if (Array.isArray(body?.message)) {
      return body.message.filter((item: unknown) => typeof item === 'string').join(', ');
    }
    if (body?.errors) {
      return (Object.values(body.errors).flat() as string[]).join(', ');
    }
    if (error.status === 403) {
      return 'No tienes permisos para realizar esta acción';
    }
    return 'No se pudo actualizar el lote';
  }

  uploadBatchPhoto(batchId: string, file: File): Observable<{ message: string; data: Record<string, unknown> }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ message: string; data: Record<string, unknown> }>(
      `${environment.api}/tenant/inventory-batches/${batchId}/photo`,
      formData
    );
  }
}
