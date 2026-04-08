import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryBatchResponse } from '../models/inventory-batch.model';
import { environment } from '../../../../environments/environment';

export interface BatchFilters {
  warehouse_id?: string;
  batch_number?: string;
  product_id?: string;
  purchase_order_id?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class InventoryBatchService {
  private apiUrl = `${environment.api}/tenant/inventory-batches`;

  constructor(private http: HttpClient) {}

  /**
   * Get inventory batches with pagination and filters
   */
  getBatches(filters: BatchFilters = {}): Observable<InventoryBatchResponse> {
    let params = new HttpParams();

    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', filters.limit.toString());
    if (filters.warehouse_id) params = params.set('warehouse_id', filters.warehouse_id);
    if (filters.batch_number) params = params.set('batch_number', filters.batch_number);
    if (filters.product_id) params = params.set('product_id', filters.product_id);
    if (filters.purchase_order_id) params = params.set('purchase_order_id', filters.purchase_order_id);
    if (filters.sort_by) params = params.set('sort_by', filters.sort_by);
    if (filters.sort_order) params = params.set('sort_order', filters.sort_order);

    return this.http.get<InventoryBatchResponse>(this.apiUrl, { params });
  }

  /**
   * Get batch by ID
   */
  getBatchById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /**
   * Get batches for a specific purchase order
   */
  getBatchesByPurchaseOrder(poId: string, filters: BatchFilters = {}): Observable<InventoryBatchResponse> {
    let params = new HttpParams();

    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', filters.limit.toString());
    if (filters.warehouse_id) params = params.set('warehouse_id', filters.warehouse_id);
    if (filters.batch_number) params = params.set('batch_number', filters.batch_number);
    if (filters.sort_by) params = params.set('sort_by', filters.sort_by);
    if (filters.sort_order) params = params.set('sort_order', filters.sort_order);

    return this.http.get<InventoryBatchResponse>(`${this.apiUrl}/purchase-order/${poId}`, { params });
  }
}
