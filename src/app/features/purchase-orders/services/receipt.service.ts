import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceiptRequest, ReceiptResponse } from '../models/receipt.model';
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
}
