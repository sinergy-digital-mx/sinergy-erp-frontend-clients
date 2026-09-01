import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProductService } from './product.service';
import { Product, CreateProductDto, UpdateProductDto, ProductListResponse } from '../models/product.model';
import { environment } from '../../../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const api = environment.api;
  const routerMock = { navigate: vi.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock },
      ]
    });
    service = TestBed.inject(ProductService);
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

  describe('getProducts', () => {
    it('should fetch products list', () => {
      const mockResponse: ProductListResponse = {
        data: [
          { id: '1', tenant_id: 'tenant1', sku: 'SKU001', name: 'Product 1', description: 'Desc 1', created_at: '2024-01-01', updated_at: '2024-01-01' }
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
        hasNext: false,
        hasPrev: false
      };

      service.getProducts().subscribe(result => {
        expect(result.data.length).toBe(1);
        expect(result.data[0].sku).toBe('SKU001');
      });

      const req = httpMock.expectOne(`${api}/tenant/products`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should pass search params', () => {
      const mockResponse: ProductListResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      };

      service.getProducts({ search: 'SKU001' }).subscribe();

      const req = httpMock.expectOne(request => 
        request.url === `${api}/tenant/products` && request.params.get('search') === 'SKU001'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should derive hasNext from totalPages when backend omits it', () => {
      service.getProducts({ page: 1, limit: 20 }).subscribe(result => {
        expect(result.hasNext).toBe(true);
        expect(result.hasPrev).toBe(false);
        expect(result.totalPages).toBe(8);
      });

      const req = httpMock.expectOne(`${api}/tenant/products?page=1&limit=20`);
      req.flush({
        data: [{ id: '1', sku: 'SKU001', name: 'Product 1' }],
        total: 150,
        page: 1,
        limit: 20,
        totalPages: 8
      });
    });
  });

  describe('getProduct', () => {
    it('should fetch single product', () => {
      const mockProduct: Product = {
        id: '1',
        tenant_id: 'tenant1',
        sku: 'SKU001',
        name: 'Product 1',
        description: 'Desc 1',
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      };

      service.getProduct('1').subscribe(result => {
        expect(result.id).toBe('1');
        expect(result.sku).toBe('SKU001');
      });

      const req = httpMock.expectOne(`${api}/tenant/products/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProduct);
    });
  });

  describe('createProduct', () => {
    it('should create a product', () => {
      const createDto: CreateProductDto = {
        sku: 'SKU001',
        name: 'Product 1',
        description: 'Desc 1'
      };

      const mockProduct: Product = {
        id: '1',
        tenant_id: 'tenant1',
        ...createDto,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      };

      service.createProduct(createDto).subscribe(result => {
        expect(result.id).toBe('1');
        expect(result.sku).toBe('SKU001');
      });

      const req = httpMock.expectOne(`${api}/tenant/products`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(createDto);
      req.flush(mockProduct);
    });

    it('should unwrap a nested create response and keep the product id', () => {
      const createDto: CreateProductDto = {
        sku: 'SKU002',
        name: 'Product 2'
      };

      service.createProduct(createDto).subscribe(result => {
        expect(result.id).toBe('abc-123');
        expect(result.sku).toBe('SKU002');
      });

      const req = httpMock.expectOne(`${api}/tenant/products`);
      req.flush({
        data: {
          id: 'abc-123',
          sku: 'SKU002',
          name: 'Product 2',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        }
      });
    });
  });

  describe('updateProduct', () => {
    it('should update a product', () => {
      const updateDto: UpdateProductDto = {
        name: 'Updated Product',
        description: 'Updated Desc'
      };

      const mockProduct: Product = {
        id: '1',
        tenant_id: 'tenant1',
        sku: 'SKU001',
        name: 'Updated Product',
        description: 'Updated Desc',
        created_at: '2024-01-01',
        updated_at: '2024-01-02'
      };

      service.updateProduct('1', updateDto).subscribe(result => {
        expect(result.name).toBe('Updated Product');
      });

      const req = httpMock.expectOne(`${api}/tenant/products/1`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(updateDto);
      req.flush(mockProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', () => {
      service.deleteProduct('1').subscribe();

      const req = httpMock.expectOne(`${api}/tenant/products/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('exportProductCatalogExcel', () => {
    it('should download the catalog with the current filters', () => {
      const blob = new Blob(['xlsx'], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      service.exportProductCatalogExcel({ search: 'titebond', is_active: true }).subscribe((result) => {
        expect(result.blob).toBe(blob);
        expect(result.filename).toBe('catalogo-productos-2026-08-24.xlsx');
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${api}/tenant/products/export/excel` &&
          request.params.get('search') === 'titebond' &&
          request.params.get('is_active') === 'true'
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toBe('blob');
      req.flush(blob, {
        headers: {
          'content-disposition': 'attachment; filename="catalogo-productos-2026-08-24.xlsx"',
        },
      });
    });

    it('should show a permission error on 403', () => {
      service.exportProductCatalogExcel().subscribe({
        next: () => {
          throw new Error('should not succeed');
        },
        error: (error: Error) => {
          expect(error.message).toBe('No tienes permiso para descargar el catálogo');
        },
      });

      const req = httpMock.expectOne(`${api}/tenant/products/export/excel`);
      req.flush(new Blob([JSON.stringify({ message: 'forbidden' })]), { status: 403, statusText: 'Forbidden' });
    });
  });

  describe('vendor catalog import', () => {
    it('should preview vendor costs', () => {
      service.previewVendorCosts('vendor-1').subscribe((result) => {
        expect(result.product_count).toBe(12);
        expect(result.row_count).toBe(20);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${api}/tenant/products/import/vendor-costs/preview` &&
          request.params.get('vendor_id') === 'vendor-1'
      );
      expect(req.request.method).toBe('GET');
      req.flush({
        vendor_id: 'vendor-1',
        vendor_name: 'Acme',
        product_count: 12,
        row_count: 20,
      });
    });

    it('should unwrap nested preview payloads', () => {
      service.previewVendorPrices('vendor-1', 'list-1').subscribe((result) => {
        expect(result.vendor_name).toBe('Acme');
        expect(result.product_count).toBe(3);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${api}/tenant/products/import/vendor-prices/preview` &&
          request.params.get('vendor_id') === 'vendor-1' &&
          request.params.get('price_list_id') === 'list-1'
      );
      req.flush({
        data: {
          vendor_id: 'vendor-1',
          vendor_name: 'Acme',
          product_count: 3,
          row_count: 5,
        },
      });
    });

    it('should show a fallback message when the vendor has no cost products', () => {
      service.previewVendorCosts('vendor-empty').subscribe({
        next: () => {
          throw new Error('should not succeed');
        },
        error: (error: Error) => {
          expect(error.message).toBe('Este proveedor no tiene productos con costo.');
        },
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${api}/tenant/products/import/vendor-costs/preview` &&
          request.params.get('vendor_id') === 'vendor-empty'
      );
      req.flush({}, { status: 400, statusText: 'Bad Request' });
    });

    it('should show No encontrado on 404', () => {
      service.previewVendorCosts('missing').subscribe({
        next: () => {
          throw new Error('should not succeed');
        },
        error: (error: Error) => {
          expect(error.message).toBe('No encontrado');
        },
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${api}/tenant/products/import/vendor-costs/preview` &&
          request.params.get('vendor_id') === 'missing'
      );
      req.flush({}, { status: 404, statusText: 'Not Found' });
    });

    it('should download the cost template as a blob and use Content-Disposition', () => {
      const blob = new Blob(['xlsx'], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      service.downloadVendorCostTemplate('vendor-1').subscribe((result) => {
        expect(result.blob).toBe(blob);
        expect(result.filename).toBe('costos-acme.xlsx');
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${api}/tenant/products/import/vendor-costs/template` &&
          request.params.get('vendor_id') === 'vendor-1'
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toBe('blob');
      req.flush(blob, {
        headers: { 'content-disposition': 'attachment; filename="costos-acme.xlsx"' },
      });
    });

    it('should post multipart vendor costs', () => {
      const file = new File(['x'], 'costos.xlsx', {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      service.importVendorCosts('vendor-1', file).subscribe((result) => {
        expect(result.updated).toBe(12);
        expect(result.skipped).toBe(40);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].sku).toBe('AJENO');
      });

      const req = httpMock.expectOne(`${api}/tenant/products/import/vendor-costs`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBeInstanceOf(FormData);
      expect(req.request.body.get('vendor_id')).toBe('vendor-1');
      expect(req.request.body.get('file')).toBe(file);
      req.flush({
        updated: 12,
        created: 0,
        skipped: 40,
        errors: [{ row: 8, sku: 'AJENO', message: 'El SKU no pertenece a este proveedor.' }],
      });
    });

    it('should post multipart vendor prices with price_list_id', () => {
      const file = new File(['x'], 'precios.xlsx', {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      service.importVendorPrices('vendor-1', 'list-9', file).subscribe((result) => {
        expect(result.created).toBe(3);
      });

      const req = httpMock.expectOne(`${api}/tenant/products/import/vendor-prices`);
      expect(req.request.body.get('vendor_id')).toBe('vendor-1');
      expect(req.request.body.get('price_list_id')).toBe('list-9');
      expect(req.request.body.get('file')).toBe(file);
      req.flush({ updated: 2, created: 3, skipped: 1, errors: [] });
    });
  });
});
