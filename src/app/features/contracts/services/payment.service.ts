import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Payment, PaymentStats, MarkPaymentPaidDto, UpdatePaymentDto } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  generatePayments(contractId: string): Observable<Payment[]> {
    return this.http.post<Payment[]>(`${this.api}/tenant/contracts/${contractId}/payments/generate`, {});
  }

  getPayments(contractId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.api}/tenant/contracts/${contractId}/payments`);
  }

  getPaymentStats(contractId: string): Observable<PaymentStats> {
    return this.http.get<PaymentStats>(`${this.api}/tenant/contracts/${contractId}/payments/stats`);
  }

  getPayment(contractId: string, paymentId: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}`);
  }

  updatePayment(contractId: string, paymentId: string, data: UpdatePaymentDto): Observable<Payment> {
    return this.http.put<Payment>(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}`, data);
  }

  markAsPaid(contractId: string, paymentId: string, data: MarkPaymentPaidDto): Observable<Payment> {
    return this.http.post<Payment>(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/pay`, data);
  }

  cancelPayment(contractId: string, paymentId: string): Observable<Payment> {
    return this.http.post<Payment>(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/cancel`, {});
  }

  deletePayment(contractId: string, paymentId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}`);
  }
}
