import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomerDocument, DocumentType, UpdateDocumentStatusDto } from '../models/customer-document.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerDocumentService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getDocumentTypes(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(`${this.api}/tenant/document-types`);
  }

  getCustomerDocuments(customerId: string): Observable<CustomerDocument[]> {
    return this.http.get<CustomerDocument[]>(`${this.api}/tenant/customers/${customerId}/documents`);
  }

  uploadDocument(customerId: string, formData: FormData): Observable<CustomerDocument> {
    return this.http.post<CustomerDocument>(`${this.api}/tenant/customers/${customerId}/documents`, formData);
  }

  updateDocumentStatus(customerId: string, documentId: string, data: UpdateDocumentStatusDto): Observable<CustomerDocument> {
    return this.http.patch<CustomerDocument>(`${this.api}/tenant/customers/${customerId}/documents/${documentId}/status`, data);
  }

  deleteDocument(customerId: string, documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/customers/${customerId}/documents/${documentId}`);
  }
}
