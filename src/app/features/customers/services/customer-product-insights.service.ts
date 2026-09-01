import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  CustomerProductInsights,
  CustomerProductInsightsQuery,
  MostPurchasedProduct,
  RecommendedProduct,
} from '../models/customer-product-insights.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerProductInsightsService {
  private readonly api = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Productos más comprados y sugerencias del cliente.
   * GET /tenant/customers/:id/product-insights — customers:Read.
   */
  getInsights(
    customerId: string | number,
    query: CustomerProductInsightsQuery = {}
  ): Observable<CustomerProductInsights> {
    let params = new HttpParams();
    if (query.most_purchased_limit != null) {
      params = params.set('most_purchased_limit', String(query.most_purchased_limit));
    }
    if (query.recommended_limit != null) {
      params = params.set('recommended_limit', String(query.recommended_limit));
    }

    return this.http
      .get<unknown>(`${this.api}/tenant/customers/${customerId}/product-insights`, { params })
      .pipe(map((raw) => this.normalize(raw, customerId)));
  }

  private normalize(raw: unknown, fallbackCustomerId: string | number): CustomerProductInsights {
    const root = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
    const nested =
      root['data'] && typeof root['data'] === 'object' && !Array.isArray(root['data'])
        ? (root['data'] as Record<string, unknown>)
        : root;

    const customerId = Number(nested['customer_id'] ?? fallbackCustomerId);
    return {
      customer_id: Number.isFinite(customerId) ? customerId : 0,
      most_purchased: this.asMostPurchasedList(nested['most_purchased']),
      recommended: this.asRecommendedList(nested['recommended']),
    };
  }

  private asMostPurchasedList(raw: unknown): MostPurchasedProduct[] {
    if (!Array.isArray(raw)) return [];
    return raw.map((item) => {
      const row = (item ?? {}) as Record<string, unknown>;
      return {
        ...this.baseFields(row),
        times_ordered: this.asNumber(row['times_ordered']),
        total_quantity: this.asNumber(row['total_quantity']),
        total_amount: this.asNumber(row['total_amount']),
        last_purchased_at: this.asNullableString(row['last_purchased_at']),
      };
    });
  }

  private asRecommendedList(raw: unknown): RecommendedProduct[] {
    if (!Array.isArray(raw)) return [];
    return raw.map((item) => {
      const row = (item ?? {}) as Record<string, unknown>;
      return {
        ...this.baseFields(row),
        reason: this.asNullableString(row['reason']) ?? '',
        reason_label: this.asNullableString(row['reason_label']) ?? '',
      };
    });
  }

  private baseFields(row: Record<string, unknown>) {
    return {
      product_id: String(row['product_id'] ?? '').trim(),
      name: this.asNullableString(row['name']),
      sku: this.asNullableString(row['sku']),
      photo: this.asNullableString(row['photo']),
      category_id: this.asNullableString(row['category_id']),
      category_name: this.asNullableString(row['category_name']),
      subcategory_id: this.asNullableString(row['subcategory_id']),
      subcategory_name: this.asNullableString(row['subcategory_name']),
    };
  }

  private asNumber(value: unknown): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  private asNullableString(value: unknown): string | null {
    if (value == null) return null;
    const text = String(value).trim();
    return text.length ? text : null;
  }
}
