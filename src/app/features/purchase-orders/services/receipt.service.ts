import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ReceiptRequest, ReceiptResponse, UomCatalogItem } from '../models/receipt.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private apiUrl = `${environment.api}/tenant/purchase-orders`;

  constructor(private http: HttpClient) {}

  /**
   * Recibir items de una orden de compra
   */
  receiveItems(purchaseOrderId: string, request: ReceiptRequest): Observable<ReceiptResponse> {
    return this.http.post<ReceiptResponse>(
      `${this.apiUrl}/${purchaseOrderId}/receipt`,
      request
    );
  }

  /** Catálogo global de UoM para el tamaño (Foot, PIES). No son las UOM del producto. */
  getUomCatalog(limit = 200): Observable<UomCatalogItem[]> {
    return this.http.get<unknown>(`${environment.api}/uom-catalog`, {
      params: { limit: String(limit) }
    }).pipe(
      map((response) => {
        if (response && typeof response === 'object' && 'data' in response) {
          const data = (response as { data: unknown }).data;
          if (Array.isArray(data)) {
            return data as UomCatalogItem[];
          }
        }
        if (Array.isArray(response)) {
          return response as UomCatalogItem[];
        }
        return [];
      })
    );
  }
}
