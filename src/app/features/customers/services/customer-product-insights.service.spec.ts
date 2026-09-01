import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CustomerProductInsightsService } from './customer-product-insights.service';
import { environment } from '../../../../environments/environment';
import { CustomerProductInsights } from '../models/customer-product-insights.model';

describe('CustomerProductInsightsService', () => {
  let service: CustomerProductInsightsService;
  let httpMock: HttpTestingController;

  const customerId = 15043;
  const url = `${environment.api}/tenant/customers/${customerId}/product-insights`;

  const payload: CustomerProductInsights = {
    customer_id: customerId,
    most_purchased: [
      {
        product_id: 'prod-1',
        name: 'Producto A',
        sku: 'SKU-001',
        photo: 'https://cdn.example/a.jpg',
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerProductInsightsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CustomerProductInsightsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  it('should GET product-insights with default limits', () => {
    let result: CustomerProductInsights | undefined;
    service
      .getInsights(customerId, { most_purchased_limit: 8, recommended_limit: 8 })
      .subscribe((data) => {
        result = data;
      });

    const req = httpMock.expectOne(`${url}?most_purchased_limit=8&recommended_limit=8`);
    expect(req.request.method).toBe('GET');
    req.flush(payload);

    expect(result?.customer_id).toBe(customerId);
    expect(result?.most_purchased.length).toBe(1);
    expect(result?.recommended[0].reason_label).toBe('Misma subcategoría');
  });

  it('should unwrap nested data envelope', () => {
    let result: CustomerProductInsights | undefined;
    service.getInsights(customerId).subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne(url);
    req.flush({ data: payload });

    expect(result?.most_purchased[0].name).toBe('Producto A');
    expect(result?.recommended.length).toBe(1);
  });

  it('should return empty arrays when payload is malformed', () => {
    let result: CustomerProductInsights | undefined;
    service.getInsights(customerId).subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne(url);
    req.flush({ customer_id: customerId });

    expect(result?.most_purchased).toEqual([]);
    expect(result?.recommended).toEqual([]);
  });
});
