import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { Product, ProductListResponse } from '../../models/product.model';
import { of, throwError } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: any;
  let dialog: any;
  let snackBar: any;

  const mockProducts: Product[] = [
    {
      id: '1',
      tenant_id: 'tenant1',
      sku: 'SKU001',
      name: 'Product 1',
      description: 'Description 1',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: '2',
      tenant_id: 'tenant1',
      sku: 'SKU002',
      name: 'Product 2',
      description: 'Description 2',
      created_at: '2024-01-02',
      updated_at: '2024-01-02'
    }
  ];

  const mockResponse: ProductListResponse = {
    data: mockProducts,
    total: 2,
    page: 1,
    limit: 20,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  };

  beforeEach(async () => {
    const productServiceSpy = {
      getProducts: vi.fn(),
      deleteProduct: vi.fn()
    };
    const dialogSpy = {
      open: vi.fn()
    };
    const snackBarSpy = {
      openFromComponent: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as any;
    dialog = TestBed.inject(MatDialog) as any;
    snackBar = TestBed.inject(MatSnackBar) as any;

    productService.getProducts.mockReturnValue(of(mockResponse));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.table_config().rows.length).toBe(2);
    expect(component.table_config().totalResults).toBe(2);
  });

  it('should display products in table', () => {
    const rows = component.table_config().rows;
    expect(rows[0].sku).toBe('SKU001');
    expect(rows[0].name).toBe('Product 1');
    expect(rows[1].sku).toBe('SKU002');
    expect(rows[1].name).toBe('Product 2');
  });

  it('should handle search', () => {
    const searchResponse: ProductListResponse = {
      data: [mockProducts[0]],
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    };
    productService.getProducts.mockReturnValue(of(searchResponse));

    component.onSearchChange('SKU001');

    expect(productService.getProducts).toHaveBeenCalledWith({ search: 'SKU001' });
    expect(component.table_config().rows.length).toBe(1);
  });

  it('should handle load error', () => {
    productService.getProducts.mockReturnValue(throwError(() => new Error('API Error')));

    component.loadProducts();

    expect(snackBar.openFromComponent).toHaveBeenCalled();
  });

  it('should open create modal', () => {
    const dialogRefSpyObj = {
      afterClosed: vi.fn().mockReturnValue(of(null))
    };
    dialog.open.mockReturnValue(dialogRefSpyObj);

    component.openCreateProductModal();

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should reload products after create', () => {
    const dialogRefSpyObj = {
      afterClosed: vi.fn().mockReturnValue(of(mockProducts[0]))
    };
    dialog.open.mockReturnValue(dialogRefSpyObj);
    productService.getProducts.mockClear();
    productService.getProducts.mockReturnValue(of(mockResponse));

    component.openCreateProductModal();

    expect(productService.getProducts).toHaveBeenCalled();
  });

  it('should open detail modal for edit', () => {
    const dialogRefSpyObj = {
      afterClosed: vi.fn().mockReturnValue(of(null))
    };
    dialog.open.mockReturnValue(dialogRefSpyObj);

    component.viewDetail(mockProducts[0]);

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should delete product with confirmation', () => {
    const dialogRefSpyObj = {
      afterClosed: vi.fn().mockReturnValue(of(true))
    };
    dialog.open.mockReturnValue(dialogRefSpyObj);
    productService.deleteProduct.mockReturnValue(of(void 0));
    productService.getProducts.mockClear();
    productService.getProducts.mockReturnValue(of(mockResponse));

    component.deleteProduct(mockProducts[0], new Event('click'));

    expect(dialog.open).toHaveBeenCalled();
    expect(productService.deleteProduct).toHaveBeenCalledWith('1');
  });

  it('should not delete product if cancelled', () => {
    const dialogRefSpyObj = {
      afterClosed: vi.fn().mockReturnValue(of(false))
    };
    dialog.open.mockReturnValue(dialogRefSpyObj);

    component.deleteProduct(mockProducts[0], new Event('click'));

    expect(productService.deleteProduct).not.toHaveBeenCalled();
  });

  it('should handle delete error', () => {
    const dialogRefSpyObj = {
      afterClosed: vi.fn().mockReturnValue(of(true))
    };
    dialog.open.mockReturnValue(dialogRefSpyObj);
    productService.deleteProduct.mockReturnValue(throwError(() => new Error('Delete failed')));

    component.deleteProduct(mockProducts[0], new Event('click'));

    expect(snackBar.openFromComponent).toHaveBeenCalled();
  });
});
