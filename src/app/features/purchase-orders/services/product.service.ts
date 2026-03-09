import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = `${environment.api}/tenant/products`;
  private productsCache$ = new BehaviorSubject<Product[] | null>(null);
  private cacheTimestamp = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient) {}

  /**
   * Get all products
   */
  getProducts(): Observable<Product[]> {
    const now = Date.now();
    const cached = this.productsCache$.value;

    if (cached && (now - this.cacheTimestamp) < this.CACHE_DURATION) {
      return of(cached);
    }

    return this.http.get<Product[] | { data: Product[] }>(this.baseUrl).pipe(
      map(response => {
        // Handle both array and {data: array} formats
        return Array.isArray(response) ? response : response.data;
      }),
      tap(products => {
        this.productsCache$.next(products);
        this.cacheTimestamp = now;
      })
    );
  }

  /**
   * Search products by name or SKU
   */
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[] | { data: Product[] }>(this.baseUrl, {
      params: { search: query }
    }).pipe(
      map(response => {
        // Handle both array and {data: array} formats
        return Array.isArray(response) ? response : response.data;
      })
    );
  }

  /**
   * Get product by ID with UOMs
   */
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.productsCache$.next(null);
    this.cacheTimestamp = 0;
  }
}
