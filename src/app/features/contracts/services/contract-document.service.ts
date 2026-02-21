import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ContractDocument, UpdateDocumentStatusDto } from '../models/contract-document.model';

@Injectable({
  providedIn: 'root',
})
export class ContractDocumentService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getContractDocuments(contractId: string): Observable<ContractDocument[]> {
    return this.http.get<ContractDocument[]>(`${this.api}/tenant/contracts/${contractId}/documents`);
  }

  uploadDocument(contractId: string, formData: FormData): Observable<ContractDocument> {
    return this.http.post<ContractDocument>(`${this.api}/tenant/contracts/${contractId}/documents`, formData);
  }

  updateDocumentStatus(contractId: string, documentId: string, data: UpdateDocumentStatusDto): Observable<ContractDocument> {
    return this.http.patch<ContractDocument>(`${this.api}/tenant/contracts/${contractId}/documents/${documentId}/status`, data);
  }

  deleteDocument(contractId: string, documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/contracts/${contractId}/documents/${documentId}`);
  }
}
