import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ProductService } from './product.service';
import { Product, CreateProductDto, UpdateProductDto, ProductListResponse } from '../models/product.model';
import { environment } from '../../../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const api = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
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
});
