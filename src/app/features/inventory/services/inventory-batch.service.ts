import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryBatchResponse } from '../models/inventory-batch.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryBatchService {
  private apiUrl = `${environment.api}/tenant/inventory-batches`;

  constructor(private http: HttpClient) {}

  /**
   * Get inventory batches with pagination
   */
  getBatches(page: number = 1, limit: number = 20): Observable<InventoryBatchResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<InventoryBatchResponse>(this.apiUrl, { params });
  }

  /**
   * Get batch by ID
   */
  getBatchById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
