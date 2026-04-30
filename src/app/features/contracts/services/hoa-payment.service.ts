import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  GenerateHoaPaymentsDto,
  HoaPayment,
  HoaPaymentStats,
  RecordHoaPaymentDto,
  UpdateHoaPaymentDto
} from '../models/hoa-payment.model';

@Injectable({
  providedIn: 'root'
})
export class HoaPaymentService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  generatePayments(contractId: string, data: GenerateHoaPaymentsDto): Observable<HoaPayment[]> {
    return this.http.post<HoaPayment[]>(`${this.api}/tenant/contracts/${contractId}/hoa-payments/generate`, data);
  }

  getPayments(contractId: string): Observable<HoaPayment[]> {
    return this.http.get<HoaPayment[]>(`${this.api}/tenant/contracts/${contractId}/hoa-payments`);
  }

  getStats(contractId: string): Observable<HoaPaymentStats> {
    return this.http.get<HoaPaymentStats>(`${this.api}/tenant/contracts/${contractId}/hoa-payments/stats`);
  }

  updatePayment(contractId: string, paymentId: string, data: UpdateHoaPaymentDto): Observable<HoaPayment> {
    return this.http.put<HoaPayment>(`${this.api}/tenant/contracts/${contractId}/hoa-payments/${paymentId}`, data);
  }

  registerPayment(contractId: string, paymentId: string, data: RecordHoaPaymentDto): Observable<HoaPayment> {
    return this.http.post<HoaPayment>(`${this.api}/tenant/contracts/${contractId}/hoa-payments/${paymentId}/pay`, data);
  }

  cancelPayment(contractId: string, paymentId: string): Observable<HoaPayment> {
    return this.http.post<HoaPayment>(`${this.api}/tenant/contracts/${contractId}/hoa-payments/${paymentId}/cancel`, {});
  }

  resetPayment(contractId: string, paymentId: string): Observable<HoaPayment> {
    return this.http.post<HoaPayment>(`${this.api}/tenant/contracts/${contractId}/hoa-payments/${paymentId}/reset`, {});
  }

  deletePayment(contractId: string, paymentId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/contracts/${contractId}/hoa-payments/${paymentId}`);
  }

  markOverdue(contractId: string): Observable<void> {
    return this.http.post<void>(`${this.api}/tenant/contracts/${contractId}/hoa-payments/mark-overdue`, {});
  }
}
