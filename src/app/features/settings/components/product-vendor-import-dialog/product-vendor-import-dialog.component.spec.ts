import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToastService } from '../../../../core/services/toast.service';
import { ProductService } from '../../services/product.service';
import { VendorService } from '../../services/vendor.service';
import { Vendor } from '../../models/vendor.model';
import {
  ProductVendorImportDialogComponent,
  formatImportSummary,
} from './product-vendor-import-dialog.component';

describe('formatImportSummary', () => {
  it('should format updated and skipped', () => {
    expect(
      formatImportSummary({ updated: 12, created: 0, skipped: 40, errors: [] })
    ).toBe('12 actualizados, 40 sin cambios');
  });

  it('should include created prices when greater than zero', () => {
    expect(
      formatImportSummary({ updated: 12, created: 3, skipped: 40, errors: [] })
    ).toBe('12 actualizados, 3 creados, 40 sin cambios');
  });

  it('should format unified cost and price counters', () => {
    expect(
      formatImportSummary({
        updated: 8,
        created: 2,
        skipped: 10,
        costs_updated: 3,
        prices_updated: 5,
        prices_created: 2,
        errors: [],
      })
    ).toBe('3 costos actualizados, 5 precios actualizados, 2 precios creados, 10 sin cambios');
  });
});

describe('ProductVendorImportDialogComponent', () => {
  let fixture: ComponentFixture<ProductVendorImportDialogComponent>;
  let component: ProductVendorImportDialogComponent;
  let productService: {
    previewVendorCatalog: ReturnType<typeof vi.fn>;
    downloadVendorCatalogTemplate: ReturnType<typeof vi.fn>;
    importVendorCatalog: ReturnType<typeof vi.fn>;
    getPriceLists: ReturnType<typeof vi.fn>;
  };
  let vendorService: { getVendors: ReturnType<typeof vi.fn> };
  let dialogRef: { close: ReturnType<typeof vi.fn> };
  let toast: { success: ReturnType<typeof vi.fn>; warning: ReturnType<typeof vi.fn>; error: ReturnType<typeof vi.fn> };

  const vendor: Vendor = {
    id: 'vendor-1',
    tenant_id: 't1',
    vendor_type: 'NATIONAL',
    name: 'Acme',
    status: 'active',
    created_at: '2026-01-01',
    updated_at: '2026-01-01',
  };

  beforeEach(async () => {
    productService = {
      previewVendorCatalog: vi.fn().mockReturnValue(
        of({ vendor_id: 'vendor-1', vendor_name: 'Acme', product_count: 4, row_count: 7 })
      ),
      downloadVendorCatalogTemplate: vi.fn(),
      importVendorCatalog: vi.fn(),
      getPriceLists: vi.fn().mockReturnValue(
        of([{ id: 'pl-1', name: 'Lista general', is_default: true }])
      ),
    };
    vendorService = {
      getVendors: vi.fn().mockReturnValue(of({ data: [vendor], total: 1, page: 1, limit: 100, totalPages: 1, hasNext: false, hasPrev: false })),
    };
    dialogRef = { close: vi.fn() };
    toast = { success: vi.fn(), warning: vi.fn(), error: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ProductVendorImportDialogComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductService, useValue: productService },
        { provide: VendorService, useValue: vendorService },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: ToastService, useValue: toast },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductVendorImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should preview after selecting a vendor when a price list is selected', () => {
    component.onVendorSelected(vendor);
    fixture.detectChanges();

    expect(productService.previewVendorCatalog).toHaveBeenCalledWith('vendor-1', 'pl-1');
    expect(component.previewText()).toBe('Se actualizarán 4 productos (7 renglones por UOM).');
  });

  it('should keep the modal open and warn when the import has row errors', () => {
    const file = new File(['x'], 'costos-precios.xlsx');
    component.onVendorSelected(vendor);
    component.selectedFile.set(file);
    productService.importVendorCatalog.mockReturnValue(
      of({
        updated: 12,
        created: 0,
        skipped: 40,
        costs_updated: 12,
        prices_updated: 0,
        prices_created: 0,
        errors: [{ row: 8, sku: 'AJENO', message: 'El SKU no pertenece a este proveedor.' }],
      })
    );

    component.importFile();

    expect(toast.warning).toHaveBeenCalledWith(
      '12 costos actualizados, 0 precios actualizados, 40 sin cambios'
    );
    expect(dialogRef.close).not.toHaveBeenCalled();
    expect(component.result()?.errors).toHaveLength(1);
  });

  it('should close and toast success when the import has no errors', () => {
    const file = new File(['x'], 'costos-precios.xlsx');
    component.onVendorSelected(vendor);
    component.selectedFile.set(file);
    productService.importVendorCatalog.mockReturnValue(
      of({
        updated: 5,
        created: 0,
        skipped: 2,
        costs_updated: 3,
        prices_updated: 2,
        prices_created: 0,
        errors: [],
      })
    );

    component.importFile();

    expect(toast.success).toHaveBeenCalledWith(
      '3 costos actualizados, 2 precios actualizados, 2 sin cambios'
    );
    expect(dialogRef.close).toHaveBeenCalledWith({ imported: true });
  });

  it('should show the preview error without closing', () => {
    productService.previewVendorCatalog.mockReturnValue(
      throwError(() => new Error('Este proveedor no tiene productos con costo.'))
    );
    component.onVendorSelected(vendor);
    fixture.detectChanges();

    expect(component.previewError()).toBe('Este proveedor no tiene productos con costo.');
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should load price lists on open and pick the default', () => {
    expect(productService.getPriceLists).toHaveBeenCalled();
    expect(component.selectedPriceListId()).toBe('pl-1');
    expect(component.priceLists()[0].id).toBe('pl-1');
  });
});
