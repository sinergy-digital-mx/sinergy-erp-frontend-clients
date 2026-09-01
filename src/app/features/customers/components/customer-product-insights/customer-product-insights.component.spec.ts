import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CustomerProductInsightsComponent } from './customer-product-insights.component';
import { CustomerProductInsightsService } from '../../services/customer-product-insights.service';
import { CustomerProductInsights } from '../../models/customer-product-insights.model';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';

describe('CustomerProductInsightsComponent', () => {
  let component: CustomerProductInsightsComponent;
  let fixture: ComponentFixture<CustomerProductInsightsComponent>;
  const mockService = { getInsights: vi.fn() };
  const mockDialog = { open: vi.fn() };

  const mockInsights: CustomerProductInsights = {
    customer_id: 15043,
    most_purchased: [
      {
        product_id: 'prod-1',
        name: 'Producto A',
        sku: 'SKU-001',
        photo: null,
        category_id: 'cat-1',
        category_name: 'Herramientas',
        subcategory_id: 'sub-1',
        subcategory_name: 'Manuales',
        times_ordered: 5,
        total_quantity: 12,
        total_amount: 720,
        last_purchased_at: '2026-08-01T18:00:00.000Z',
      },
    ],
    recommended: [
      {
        product_id: 'prod-2',
        name: 'Producto B',
        sku: 'SKU-002',
        photo: null,
        category_id: 'cat-1',
        category_name: 'Herramientas',
        subcategory_id: 'sub-1',
        subcategory_name: 'Manuales',
        reason: 'same_subcategory',
        reason_label: 'Misma subcategoría',
      },
    ],
  };

  beforeEach(async () => {
    mockService.getInsights.mockReset();
    mockDialog.open.mockReset();
    mockService.getInsights.mockReturnValue(of(mockInsights));

    await TestBed.configureTestingModule({
      imports: [CustomerProductInsightsComponent],
      providers: [
        { provide: CustomerProductInsightsService, useValue: mockService },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerProductInsightsComponent);
    component = fixture.componentInstance;
    component.customerId = 15043;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load insights on init', () => {
    component.ngOnInit();

    expect(mockService.getInsights).toHaveBeenCalledWith(15043, {
      most_purchased_limit: 8,
      recommended_limit: 8,
    });
    expect(component.mostPurchased().length).toBe(1);
    expect(component.recommended().length).toBe(1);
    expect(component.loading()).toBe(false);
  });

  it('should show purchase empty copy when there is no history', () => {
    mockService.getInsights.mockReturnValue(
      of({ customer_id: 15043, most_purchased: [], recommended: [] })
    );

    component.ngOnInit();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Aún no hay compras registradas');
    expect(component.recommendedEmptyMessage()).toBe('Aún no hay compras registradas');
  });

  it('should show recommended empty copy when there are purchases but no suggestions', () => {
    mockService.getInsights.mockReturnValue(
      of({
        customer_id: 15043,
        most_purchased: mockInsights.most_purchased,
        recommended: [],
      })
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.recommendedEmptyMessage()).toBe(
      'No hay sugerencias por categoría por ahora'
    );
    expect(fixture.nativeElement.textContent).toContain(
      'No hay sugerencias por categoría por ahora'
    );
  });

  it('should open product detail modal on card click', () => {
    component.ngOnInit();
    component.openProduct(mockInsights.most_purchased[0]);

    expect(mockDialog.open).toHaveBeenCalledWith(
      ProductDetailModalComponent,
      expect.objectContaining({
        data: expect.objectContaining({
          product: expect.objectContaining({ id: 'prod-1' }),
          isNew: false,
        }),
      })
    );
  });

  it('should show error state when the request fails', () => {
    mockService.getInsights.mockReturnValue(throwError(() => new Error('fail')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.error()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain(
      'No se pudieron cargar los productos del cliente'
    );
  });
});
