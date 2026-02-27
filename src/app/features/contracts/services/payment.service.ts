import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Payment, PaymentStats, MarkPaymentPaidDto, UpdatePaymentDto, RegisterPartialPaymentDto } from '../models/payment.model';
import { PaymentDocument } from '../models/payment-document.model';

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

  registerPartialPayment(contractId: string, paymentId: string, data: RegisterPartialPaymentDto): Observable<Payment> {
    return this.http.post<Payment>(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/pay`, data);
  }

  uploadDocument(contractId: string, paymentId: string, file: File, document_type: string, notes?: string): Observable<PaymentDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', document_type);
    if (notes) {
      formData.append('notes', notes);
    }
    return this.http.post<PaymentDocument>(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents`, formData);
  }

  getDocuments(contractId: string, paymentId: string): Observable<PaymentDocument[]> {
    return this.http.get<PaymentDocument[]>(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents`);
  }

  getDocumentUrl(contractId: string, paymentId: string, documentId: string, expiresIn: number = 3600): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents/${documentId}/url?expiresIn=${expiresIn}`);
  }

  deleteDocument(contractId: string, paymentId: string, documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents/${documentId}`);
  }
}
