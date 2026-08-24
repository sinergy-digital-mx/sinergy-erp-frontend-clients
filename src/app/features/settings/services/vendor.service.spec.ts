import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { VendorService } from './vendor.service';
import { environment } from '../../../../environments/environment';

describe('VendorService', () => {
  let service: VendorService;
  let httpMock: HttpTestingController;
  const api = environment.api;
  const routerMock = { navigate: vi.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VendorService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock },
      ]
    });
    service = TestBed.inject(VendorService);
    httpMock = TestBed.inject(HttpTestingController);
    routerMock.navigate.mockClear();
  });

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('exportVendorsExcel', () => {
    it('should download the report with the current filters', () => {
      const blob = new Blob(['xlsx'], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      service
        .exportVendorsExcel({ search: 'acme', status: 'active', vendor_type: 'NATIONAL' })
        .subscribe((result) => {
          expect(result.blob).toBe(blob);
          expect(result.filename).toBe('proveedores-2026-08-24.xlsx');
        });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${api}/tenant/vendors/export/excel` &&
          request.params.get('search') === 'acme' &&
          request.params.get('status') === 'active' &&
          request.params.get('vendor_type') === 'NATIONAL'
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toBe('blob');
      req.flush(blob, {
        headers: {
          'content-disposition': 'attachment; filename="proveedores-2026-08-24.xlsx"',
        },
      });
    });

    it('should show a permission error on 403', () => {
      service.exportVendorsExcel().subscribe({
        next: () => {
          throw new Error('should not succeed');
        },
        error: (error: Error) => {
          expect(error.message).toBe('No tienes permiso para exportar');
        },
      });

      const req = httpMock.expectOne(`${api}/tenant/vendors/export/excel`);
      req.flush(new Blob([JSON.stringify({ message: 'forbidden' })]), {
        status: 403,
        statusText: 'Forbidden',
      });
    });
  });
});
