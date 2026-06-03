import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CreateManualDownPaymentDto,
  DownPaymentPayment,
  DownPaymentStats,
  GenerateDownPaymentInstallmentsDto
} from '../models/downpayment-payment.model';

@Injectable({
  providedIn: 'root'
})
export class DownpaymentPaymentService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  createManualPayment(contractId: string, data: CreateManualDownPaymentDto): Observable<DownPaymentPayment> {
    return this.http.post<DownPaymentPayment>(`${this.api}/tenant/contracts/${contractId}/downpayment-payments`, data);
  }

  generate(contractId: string, data: GenerateDownPaymentInstallmentsDto): Observable<DownPaymentPayment[]> {
    return this.http.post<DownPaymentPayment[]>(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/generate`, data);
  }

  getPayments(contractId: string): Observable<DownPaymentPayment[]> {
    return this.http.get<DownPaymentPayment[]>(`${this.api}/tenant/contracts/${contractId}/downpayment-payments`);
  }

  getStats(contractId: string): Observable<DownPaymentStats> {
    return this.http.get<DownPaymentStats>(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/stats`);
  }

  registerPayment(contractId: string, paymentId: string, data: {
    amount: number;
    payment_date: string;
    payment_method: string;
    reference_number?: string;
    notes?: string;
  }): Observable<DownPaymentPayment> {
    return this.http.post<DownPaymentPayment>(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/${paymentId}/pay`, data);
  }

  updatePayment(contractId: string, paymentId: string, data: {
    amount_paid?: number;
    paid_date?: string | null;
    payment_method?: string | null;
    notes?: string | null;
  }): Observable<DownPaymentPayment> {
    return this.http.put<DownPaymentPayment>(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/${paymentId}`, data);
  }

  cancelPayment(contractId: string, paymentId: string): Observable<DownPaymentPayment> {
    return this.http.post<DownPaymentPayment>(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/${paymentId}/cancel`, {});
  }

  resetPayment(contractId: string, paymentId: string): Observable<DownPaymentPayment> {
    return this.http.post<DownPaymentPayment>(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/${paymentId}/reset`, {});
  }

  deletePayment(contractId: string, paymentId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/${paymentId}`);
  }

  markOverdue(contractId: string): Observable<void> {
    return this.http.post<void>(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/mark-overdue`, {});
  }
}
