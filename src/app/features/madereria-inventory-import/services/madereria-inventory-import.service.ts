import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  MadereriaInventoryImportJob,
  MadereriaInventoryImportJobStatus,
  MadereriaInventoryImportResult,
} from '../models/madereria-inventory-import.model';

@Injectable({
  providedIn: 'root',
})
export class MadereriaInventoryImportService {
  private readonly apiUrl = `${environment.api}/tenant/madereria-inventory-import`;

  constructor(private http: HttpClient) {}

  startImport(payload: {
    file: File;
    fiscal_configuration_id: string;
    billing_branch_id: string;
    warehouse_id: string;
  }): Observable<MadereriaInventoryImportJob> {
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('fiscal_configuration_id', payload.fiscal_configuration_id);
    formData.append('billing_branch_id', payload.billing_branch_id);
    formData.append('warehouse_id', payload.warehouse_id);

    return this.http.post<unknown>(this.apiUrl, formData).pipe(
      map((response) => this.unwrapJob(response))
    );
  }

  getJob(jobId: string): Observable<MadereriaInventoryImportJob> {
    return this.http.get<unknown>(`${this.apiUrl}/jobs/${jobId}`).pipe(
      map((response) => this.unwrapJob(response))
    );
  }

  private unwrapJob(response: unknown): MadereriaInventoryImportJob {
    const raw = this.unwrapData(response);
    const job = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
    const status = this.normalizeStatus(job['status']);

    return {
      id: String(job['id'] ?? ''),
      status,
      total: this.toNumber(job['total']),
      processed: this.toNumber(job['processed']),
      percent: this.toNumber(job['percent']),
      current_sku: this.toNullableString(job['current_sku']),
      message: this.toNullableString(job['message']),
      result: job['result'] ? this.unwrapResult(job['result']) : null,
      error: this.toNullableString(job['error']),
    };
  }

  private unwrapResult(response: unknown): MadereriaInventoryImportResult {
    const raw = this.unwrapData(response);
    const result = (raw && typeof raw === 'object' ? raw : {}) as Partial<MadereriaInventoryImportResult>;
    return {
      warehouse_id: result.warehouse_id ?? '',
      warehouse_name: result.warehouse_name ?? '',
      file_rows: result.file_rows ?? 0,
      products_created: result.products_created ?? [],
      prices_created: result.prices_created ?? 0,
      costs_created: result.costs_created ?? 0,
      costs_updated: result.costs_updated ?? 0,
      batches_created: result.batches_created ?? 0,
      skipped: result.skipped ?? [],
      errors: result.errors ?? [],
    };
  }

  private unwrapData(response: unknown): unknown {
    if (response && typeof response === 'object' && 'data' in response) {
      const data = (response as { data: unknown }).data;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        return data;
      }
    }
    return response;
  }

  private normalizeStatus(value: unknown): MadereriaInventoryImportJobStatus {
    const status = String(value ?? '').toLowerCase();
    if (status === 'queued' || status === 'processing' || status === 'completed' || status === 'failed') {
      return status;
    }
    return 'queued';
  }

  private toNumber(value: unknown): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  private toNullableString(value: unknown): string | null {
    if (value == null) {
      return null;
    }
    const text = String(value).trim();
    return text || null;
  }
}
