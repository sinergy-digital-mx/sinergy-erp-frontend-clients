import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SalesReportService } from './sales-report.service';
import { environment } from '../../../../environments/environment';

describe('SalesReportService', () => {
  let service: SalesReportService;
  let httpMock: HttpTestingController;
  const api = `${environment.api}/tenant/sales-reports`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesReportService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SalesReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  it('manda view=sales y period=month sin fechas ni commission_rate', () => {
    service.getBySeller({ view: 'sales', period: 'month' }).subscribe();

    const req = httpMock.expectOne((request) => request.url === `${api}/by-seller`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('view')).toBe('sales');
    expect(req.request.params.get('period')).toBe('month');
    expect(req.request.params.get('date_from')).toBeNull();
    expect(req.request.params.get('date_to')).toBeNull();
    expect(req.request.params.get('commission_rate')).toBeNull();
    req.flush({ summary: { total_sellers: 0, total_sales_count: 0, total_amount: 0 }, filters_applied: {}, rows: [] });
  });

  it('manda view=commissions y fechas solo en period=range', () => {
    service
      .getBySeller({
        view: 'commissions',
        period: 'range',
        fiscal_configuration_id: 'fc-1',
        billing_branch_id: 'br-1',
        date_from: '2026-09-01',
        date_to: '2026-09-30',
      })
      .subscribe();

    const req = httpMock.expectOne((request) => request.url === `${api}/by-seller`);
    expect(req.request.params.get('view')).toBe('commissions');
    expect(req.request.params.get('fiscal_configuration_id')).toBe('fc-1');
    expect(req.request.params.get('billing_branch_id')).toBe('br-1');
    expect(req.request.params.get('date_from')).toBe('2026-09-01T00:00:00');
    expect(req.request.params.get('date_to')).toBe('2026-09-30T23:59:59');
    expect(req.request.params.get('commission_rate')).toBeNull();
    req.flush({ summary: { total_sellers: 0, total_sales_count: 0, total_amount: 0 }, filters_applied: {}, rows: [] });
  });

  it('exporta Excel con los mismos params y el filename del header', () => {
    const blob = new Blob(['xlsx'], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    service.exportBySellerExcel({ view: 'commissions', period: 'month' }).subscribe((result) => {
      expect(result.blob).toBe(blob);
      expect(result.filename).toBe('reporte-comisiones-2026-09-01.xlsx');
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url === `${api}/by-seller/export/excel` &&
        request.params.get('view') === 'commissions' &&
        request.params.get('period') === 'month'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    expect(req.request.params.get('date_from')).toBeNull();
    req.flush(blob, {
      headers: {
        'content-disposition': 'attachment; filename="reporte-comisiones-2026-09-01.xlsx"',
      },
    });
  });

  it('el drill-down de órdenes manda el mismo view', () => {
    service
      .getBySellerOrders({
        view: 'sales',
        seller_id: 'seller-1',
        billing_branch_id: 'br-1',
        period: 'week',
      })
      .subscribe();

    const req = httpMock.expectOne((request) => request.url === `${api}/by-seller/orders`);
    expect(req.request.params.get('view')).toBe('sales');
    expect(req.request.params.get('seller_id')).toBe('seller-1');
    expect(req.request.params.get('billing_branch_id')).toBe('br-1');
    expect(req.request.params.get('period')).toBe('week');
    req.flush({ orders: [] });
  });
});
