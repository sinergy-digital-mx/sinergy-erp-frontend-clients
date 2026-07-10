import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { FinkokConfigurationService } from '../../settings/services/finkok-configuration.service';

import {
  CancelSalesOrderInvoicePayload,
  FinkokConfigurationsResponse,
  SalesOrderElectronicInvoice,
  SalesOrderInvoicePdfResponse,
  StampSalesOrderInvoicePayload,
} from '../models/sales-order-electronic-invoice.model';



@Injectable({ providedIn: 'root' })

export class SalesOrderInvoiceService {

  private readonly baseUrl = `${environment.api}/tenant/sales-orders`;



  constructor(

    private http: HttpClient,

    private finkokConfigurationService: FinkokConfigurationService

  ) {}



  getInvoices(orderId: string): Observable<SalesOrderElectronicInvoice[]> {

    return this.http.get<unknown>(`${this.baseUrl}/${orderId}/invoices`).pipe(

      map((response) => this.normalizeInvoiceList(response))

    );

  }



  getFinkokConfiguration(): Observable<FinkokConfigurationsResponse | null> {

    return this.finkokConfigurationService.getConfiguration();

  }



  stampInvoice(orderId: string, payload: StampSalesOrderInvoicePayload): Observable<SalesOrderElectronicInvoice> {

    return this.http

      .post<unknown>(`${this.baseUrl}/${orderId}/invoices/stamp`, payload)

      .pipe(map((response) => this.normalizeInvoice(response)));

  }



  cancelInvoice(

    orderId: string,

    invoiceId: string,

    payload: CancelSalesOrderInvoicePayload

  ): Observable<SalesOrderElectronicInvoice> {

    return this.http

      .post<unknown>(`${this.baseUrl}/${orderId}/invoices/${invoiceId}/cancel`, payload)

      .pipe(map((response) => this.normalizeInvoice(response)));

  }



  syncSat(orderId: string, invoiceId: string): Observable<SalesOrderElectronicInvoice> {

    return this.http

      .post<unknown>(`${this.baseUrl}/${orderId}/invoices/${invoiceId}/sync-sat`, {})

      .pipe(map((response) => this.normalizeInvoice(response)));

  }



  getInvoicePdf(

    orderId: string,

    invoiceId: string,

    options?: { preview?: boolean }

  ): Observable<SalesOrderInvoicePdfResponse> {

    const params: Record<string, string> = {};

    if (options?.preview) {

      params['preview'] = 'true';

    }



    return this.http

      .get<unknown>(`${this.baseUrl}/${orderId}/invoices/${invoiceId}/pdf`, { params })

      .pipe(map((response) => this.normalizeInvoicePdf(response)));

  }



  private normalizeInvoicePdf(response: unknown): SalesOrderInvoicePdfResponse {

    const body = this.unwrap(response);

    const signedUrl =

      (body['signedUrl'] as string | undefined) ||

      (body['signed_url'] as string | undefined) ||

      '';



    return {

      signedUrl,

      fileName: (body['fileName'] as string | undefined) || (body['file_name'] as string | undefined),

      preview: Boolean(body['preview']),

    };

  }



  private normalizeInvoiceList(response: unknown): SalesOrderElectronicInvoice[] {

    const body = this.unwrap(response);

    const list = body['invoices'] ?? body['data'] ?? response;

    return Array.isArray(list) ? (list as SalesOrderElectronicInvoice[]) : [];

  }



  private normalizeInvoice(response: unknown): SalesOrderElectronicInvoice {

    const body = this.unwrap(response);

    return (body['invoice'] ?? body['data'] ?? body) as SalesOrderElectronicInvoice;

  }



  private unwrap(response: unknown): Record<string, unknown> {

    if (!response || typeof response !== 'object') {

      return {};

    }

    const body = response as Record<string, unknown>;

    if (body['data'] && typeof body['data'] === 'object' && !Array.isArray(body['data'])) {

      return body['data'] as Record<string, unknown>;

    }

    return body;

  }

}

