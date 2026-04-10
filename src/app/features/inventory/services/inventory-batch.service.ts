import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryBatch, InventoryBatchResponse } from '../models/inventory-batch.model';
import { environment } from '../../../../environments/environment';

export interface BatchFilters {
  search?: string;
  batch_number?: string;
  product_id?: string;
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
    return this.http.get<InventoryBatch>(`${this.apiUrl}/${id}`);
  }
}
