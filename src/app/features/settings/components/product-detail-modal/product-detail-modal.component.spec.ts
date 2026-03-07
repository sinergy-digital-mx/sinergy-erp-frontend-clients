import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductDetailModalComponent } from './product-detail-modal.component';
import { ProductService } from '../../services/product.service';
import { Product, ProductListResponse } from '../../models/product.model';
import { of, throwError } from 'rxjs';

describe('ProductDetailModalComponent', () => {
  let component: ProductDetailModalComponent;
  let fixture: ComponentFixture<ProductDetailModalComponent>;
  let productService: any;
  let dialogRef: any;
  let snackBar: any;

  const mockProduct: Product = {
    id: '1',
    tenant_id: 'tenant1',
    sku: 'SKU001',
    name: 'Product 1',
    description: 'Description 1',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  };

  beforeEach(async () => {
    const productServiceSpy = {
      createProduct: vi.fn(),
      updateProduct: vi.fn(),
      getProducts: vi.fn()
    };
    const dialogRefSpy = {
      close: vi.fn()
    };
    const snackBarSpy = {
      openFromComponent: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailModalComponent, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MAT_DIALOG_DATA, useValue: { product: null } }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as any;
    dialogRef = TestBed.inject(MatDialogRef) as any;
    snackBar = TestBed.inject(MatSnackBar) as any;

    productService.getProducts.mockReturnValue(of({
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
      hasNext: false,
      hasPrev: false
    }));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form in create mode', () => {
    expect(component.isNew).toBe(true);
    expect(component.form.get('sku')?.value).toBe('');
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('description')?.value).toBe('');
  });

  it('should initialize form in edit mode', async () => {
    await TestBed.resetTestingModule();
    const productServiceSpy = {
      createProduct: vi.fn(),
      updateProduct: vi.fn(),
      getProducts: vi.fn()
    };
    const dialogRefSpy = {
      close: vi.fn()
    };
    const snackBarSpy = {
      openFromComponent: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailModalComponent, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MAT_DIALOG_DATA, useValue: { product: mockProduct } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isNew).toBe(false);
    expect(component.form.get('sku')?.value).toBe('SKU001');
    expect(component.form.get('name')?.value).toBe('Product 1');
  });

  it('should validate required fields', () => {
    const form = component.form;
    expect(form.valid).toBe(false);

    form.get('sku')?.setValue('SKU001');
    form.get('name')?.setValue('Product 1');
    expect(form.valid).toBe(true);
  });

  it('should validate name minimum length', () => {
    const form = component.form;
    form.get('sku')?.setValue('SKU001');
    form.get('name')?.setValue('P');
    expect(form.valid).toBe(false);

    form.get('name')?.setValue('Product 1');
    expect(form.valid).toBe(true);
  });

  it('should disable save button when form is invalid', () => {
    expect(component.form.valid).toBe(false);
    expect(component.form.get('sku')?.invalid).toBe(true);
  });

  it('should create product', () => {
    productService.createProduct.mockReturnValue(of(mockProduct));

    component.form.patchValue({
      sku: 'SKU001',
      name: 'Product 1',
      description: 'Description 1'
    });

    component.save();

    expect(productService.createProduct).toHaveBeenCalledWith({
      sku: 'SKU001',
      name: 'Product 1',
      description: 'Description 1'
    });
    expect(dialogRef.close).toHaveBeenCalledWith(mockProduct);
  });

  it('should update product', async () => {
    await TestBed.resetTestingModule();
    const productServiceSpy = {
      createProduct: vi.fn(),
      updateProduct: vi.fn(),
      getProducts: vi.fn()
    };
    const dialogRefSpy = {
      close: vi.fn()
    };
    const snackBarSpy = {
      openFromComponent: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailModalComponent, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MAT_DIALOG_DATA, useValue: { product: mockProduct } }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as any;
    dialogRef = TestBed.inject(MatDialogRef) as any;

    productService.updateProduct.mockReturnValue(of(mockProduct));

    fixture = TestBed.createComponent(ProductDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.form.patchValue({
      name: 'Updated Product'
    });

    component.save();

    expect(productService.updateProduct).toHaveBeenCalledWith('1', {
      sku: 'SKU001',
      name: 'Updated Product',
      description: 'Description 1'
    });
  });

  it('should handle create error', () => {
    productService.createProduct.mockReturnValue(throwError(() => new Error('Create failed')));

    component.form.patchValue({
      sku: 'SKU001',
      name: 'Product 1'
    });

    component.save();

    expect(snackBar.openFromComponent).toHaveBeenCalled();
  });

  it('should close modal', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should display error message for required field', () => {
    const skuControl = component.form.get('sku');
    skuControl?.markAsTouched();
    fixture.detectChanges();

    const errorMsg = component.getErrorMessage('sku');
    expect(errorMsg).toContain('requerido');
  });

  it('should display error message for minimum length', () => {
    const nameControl = component.form.get('name');
    nameControl?.setValue('P');
    nameControl?.markAsTouched();
    fixture.detectChanges();

    const errorMsg = component.getErrorMessage('name');
    expect(errorMsg).toContain('al menos');
  });
});
