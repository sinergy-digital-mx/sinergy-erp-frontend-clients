import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { skipAuthContext } from '../../../core/http/skip-auth.context';
import {
  SelfInvoiceIdentifyResponse,
  SelfInvoicePdfLink,
  SelfInvoicePreview,
  SelfInvoiceStampPayload,
  SelfInvoiceStampResult,
  normalizePublicInvoiceCode,
  normalizeSelfInvoiceIdentify,
  normalizeSelfInvoicePdfLink,
  normalizeSelfInvoicePreview,
  normalizeSelfInvoiceStamp,
} from '../models/self-invoice.model';

@Injectable({ providedIn: 'root' })
export class SelfInvoiceService {
  private readonly baseUrl = `${environment.api}/public/self-invoice`;

  constructor(private http: HttpClient) {}

  getPreview(code: string): Observable<SelfInvoicePreview> {
    return this.http
      .get<unknown>(this.resourceUrl(code), { context: skipAuthContext() })
      .pipe(map((response) => normalizeSelfInvoicePreview(response)));
  }

  identify(code: string, payload: { email: string; phone: string }): Observable<SelfInvoiceIdentifyResponse> {
    return this.http
      .post<unknown>(`${this.resourceUrl(code)}/identify`, payload, { context: skipAuthContext() })
      .pipe(map((response) => normalizeSelfInvoiceIdentify(response)));
  }

  stamp(code: string, payload: SelfInvoiceStampPayload): Observable<SelfInvoiceStampResult> {
    return this.http
      .post<unknown>(`${this.resourceUrl(code)}/stamp`, payload, { context: skipAuthContext() })
      .pipe(map((response) => normalizeSelfInvoiceStamp(response)));
  }

  getInvoicePdf(code: string): Observable<SelfInvoicePdfLink> {
    return this.http
      .get<unknown>(`${this.resourceUrl(code)}/invoice/pdf`, { context: skipAuthContext() })
      .pipe(map((response) => normalizeSelfInvoicePdfLink(response)));
  }

  getInvoiceXml(code: string): Observable<{ blob: Blob; filename: string }> {
    return this.http
      .get(`${this.resourceUrl(code)}/invoice/xml`, {
        context: skipAuthContext(),
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Blob>) => ({
          blob: response.body ?? new Blob(),
          filename:
            this.parseFilename(response.headers.get('content-disposition')) ??
            `${normalizePublicInvoiceCode(code)}.xml`,
        }))
      );
  }

  private resourceUrl(code: string): string {
    return `${this.baseUrl}/${encodeURIComponent(normalizePublicInvoiceCode(code))}`;
  }

  private parseFilename(header: string | null): string | null {
    if (!header) {
      return null;
    }
    const utfMatch = /filename\*=UTF-8''([^;]+)/i.exec(header);
    if (utfMatch?.[1]) {
      try {
        return decodeURIComponent(utfMatch[1].trim());
      } catch {
        return utfMatch[1].trim();
      }
    }
    const asciiMatch = /filename="?([^";]+)"?/i.exec(header);
    return asciiMatch?.[1]?.trim() || null;
  }
}
