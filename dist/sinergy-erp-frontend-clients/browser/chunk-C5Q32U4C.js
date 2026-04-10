import {
  HttpClient,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  BehaviorSubject,
  Injectable,
  __spreadProps,
  __spreadValues,
  catchError,
  forkJoin,
  map,
  of,
  setClassMetadata,
  signal,
  switchMap,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7ZU2RCPO.js";

// src/app/features/pos/services/price-list.service.ts
var PriceListService = class _PriceListService {
  http;
  API_URL = "/api/tenant/price-lists";
  CACHE_DURATION_MS = 5 * 60 * 1e3;
  // 5 minutes
  // Cache
  defaultPriceListCache = signal(null, ...ngDevMode ? [{ debugName: "defaultPriceListCache" }] : []);
  productPricesCache = /* @__PURE__ */ new Map();
  constructor(http) {
    this.http = http;
  }
  /**
   * Get the default price list for the tenant
   * Returns cached value if available and not expired
   */
  getDefaultPriceList() {
    const cached = this.defaultPriceListCache();
    if (cached && !this.isCacheExpired(cached.cached_at)) {
      return of(cached.price_list);
    }
    return this.http.get(`${this.API_URL}?is_default=true`).pipe(map((response) => {
      const lists = Array.isArray(response) ? response : response.data;
      return lists.length > 0 ? lists[0] : null;
    }), tap((priceList) => {
      if (priceList) {
        this.defaultPriceListCache.set({
          price_list: priceList,
          cached_at: /* @__PURE__ */ new Date()
        });
      }
    }), catchError((error) => {
      console.error("Error fetching default price list:", error);
      return of(null);
    }));
  }
  /**
   * Get price for a specific product, UoM, and price list
   * Returns null if no price is configured
   */
  getProductPrice(productId, uomId, priceListId) {
    const cacheKey = `${productId}-${uomId}-${priceListId}`;
    const cached = this.productPricesCache.get(cacheKey);
    if (cached && !this.isCacheExpired(cached.cached_at)) {
      return of(cached.price);
    }
    return this.http.get(`${this.API_URL}/products/${productId}/prices`).pipe(map((response) => {
      const priceEntry = response.prices.find((p) => p.uom_id === uomId && p.price_list_id === priceListId);
      return priceEntry ? priceEntry.price : null;
    }), tap((price) => {
      if (price !== null) {
        this.productPricesCache.set(cacheKey, {
          price,
          cached_at: /* @__PURE__ */ new Date(),
          product_id: productId,
          uom_id: uomId,
          price_list_id: priceListId
        });
      }
    }), catchError((error) => {
      console.error(`Error fetching price for product ${productId}:`, error);
      return of(null);
    }));
  }
  /**
   * Clear all caches
   */
  clearCache() {
    this.defaultPriceListCache.set(null);
    this.productPricesCache.clear();
  }
  /**
   * Check if cache entry is expired
   */
  isCacheExpired(cachedAt) {
    return Date.now() - cachedAt.getTime() > this.CACHE_DURATION_MS;
  }
  static \u0275fac = function PriceListService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PriceListService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PriceListService, factory: _PriceListService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PriceListService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/pos/services/product-photo.service.ts
var ProductPhotoService = class _ProductPhotoService {
  http;
  API_URL = "/api/products";
  PREFETCH_THRESHOLD_MS = 5 * 60 * 1e3;
  // 5 minutes
  // Cache: Map<product_id, CachedPhotoUrl>
  photoUrlCache = /* @__PURE__ */ new Map();
  cleanupInterval;
  constructor(http) {
    this.http = http;
    this.cleanupInterval = setInterval(() => this.cleanExpiredUrls(), 60 * 1e3);
  }
  /**
   * Get primary photo signed URL for a product
   * Returns cached URL if available and not expired
   * Prefetches new URL if expiring soon
   */
  getPrimaryPhotoUrl(productId) {
    const cached = this.photoUrlCache.get(productId);
    if (cached && !this.isUrlExpired(cached.expires_at)) {
      if (this.isUrlExpiringSoon(cached.expires_at)) {
        this.prefetchPhotoUrl(productId);
      }
      return of(cached.url);
    }
    return this.fetchPhotoUrl(productId);
  }
  /**
   * Fetch photo URL from backend
   */
  fetchPhotoUrl(productId) {
    return this.http.get(`${this.API_URL}/${productId}/photos/primary`).pipe(map((response) => {
      const url = response.signed_url;
      const expiresAt = new Date(response.expires_at);
      this.photoUrlCache.set(productId, {
        url,
        expires_at: expiresAt,
        product_id: productId
      });
      return url;
    }), catchError((error) => {
      if (error.status === 404) {
        return of(null);
      }
      console.error(`Error fetching photo for product ${productId}:`, error);
      return of(null);
    }));
  }
  /**
   * Prefetch photo URL in background
   */
  prefetchPhotoUrl(productId) {
    this.fetchPhotoUrl(productId).subscribe();
  }
  /**
   * Check if URL is expired
   */
  isUrlExpired(expiresAt) {
    return Date.now() >= expiresAt.getTime();
  }
  /**
   * Check if URL is expiring soon (within threshold)
   */
  isUrlExpiringSoon(expiresAt) {
    return expiresAt.getTime() - Date.now() < this.PREFETCH_THRESHOLD_MS;
  }
  /**
   * Clean expired URLs from cache
   */
  cleanExpiredUrls() {
    const now = Date.now();
    for (const [productId, cached] of this.photoUrlCache.entries()) {
      if (now >= cached.expires_at.getTime()) {
        this.photoUrlCache.delete(productId);
      }
    }
  }
  /**
   * Clear all cached URLs
   */
  clearCache() {
    this.photoUrlCache.clear();
  }
  /**
   * Get cache statistics (for debugging)
   */
  getCacheStats() {
    const now = Date.now();
    let expired = 0;
    for (const cached of this.photoUrlCache.values()) {
      if (now >= cached.expires_at.getTime()) {
        expired++;
      }
    }
    return {
      total: this.photoUrlCache.size,
      expired
    };
  }
  /**
   * Cleanup on service destroy
   */
  ngOnDestroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
  static \u0275fac = function ProductPhotoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductPhotoService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductPhotoService, factory: _ProductPhotoService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductPhotoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/purchase-orders/services/product.service.ts
var ProductService = class _ProductService {
  http;
  priceListService;
  productPhotoService;
  baseUrl = `${environment.api}/tenant/products`;
  productsCache$ = new BehaviorSubject(null);
  cacheTimestamp = 0;
  CACHE_DURATION = 5 * 60 * 1e3;
  // 5 minutes
  constructor(http, priceListService, productPhotoService) {
    this.http = http;
    this.priceListService = priceListService;
    this.productPhotoService = productPhotoService;
  }
  /**
   * Get all products
   * Products are enriched with photos and prices from default price list
   */
  getProducts() {
    const now = Date.now();
    const cached = this.productsCache$.value;
    if (cached && now - this.cacheTimestamp < this.CACHE_DURATION) {
      return of(cached);
    }
    return this.http.get(this.baseUrl).pipe(
      map((response) => {
        return Array.isArray(response) ? response : response.data;
      }),
      // Enrich products with photos and prices
      switchMap((products) => this.enrichProducts(products)),
      tap((products) => {
        this.productsCache$.next(products);
        this.cacheTimestamp = now;
      })
    );
  }
  /**
   * Search products by name or SKU
   */
  searchProducts(query) {
    return this.http.get(this.baseUrl, {
      params: { search: query }
    }).pipe(map((response) => {
      return Array.isArray(response) ? response : response.data;
    }));
  }
  /**
   * Get product by ID with UOMs
   */
  getProductById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  /**
   * Clear cache
   */
  clearCache() {
    this.productsCache$.next(null);
    this.cacheTimestamp = 0;
    this.priceListService.clearCache();
    this.productPhotoService.clearCache();
  }
  /**
   * Enrich products with photos and prices in parallel
   */
  enrichProducts(products) {
    return this.priceListService.getDefaultPriceList().pipe(switchMap((priceList) => {
      const enrichedProducts$ = products.map((product) => this.enrichSingleProduct(product, priceList?.id));
      return forkJoin(enrichedProducts$);
    }), catchError((error) => {
      console.error("Error enriching products:", error);
      return of(products.map((p) => this.extractPriceFromProduct(p, null)));
    }));
  }
  /**
   * Enrich a single product with photo and price
   */
  enrichSingleProduct(product, priceListId) {
    return this.productPhotoService.getPrimaryPhotoUrl(product.id).pipe(map((photoUrl) => {
      const enrichedProduct = this.extractPriceFromProduct(product, priceListId);
      return __spreadProps(__spreadValues({}, enrichedProduct), {
        primary_photo_url: photoUrl,
        photo_url_expires_at: photoUrl ? new Date(Date.now() + 36e5) : null
      });
    }));
  }
  /**
   * Extract price from product.prices array based on price list
   */
  extractPriceFromProduct(product, priceListId) {
    let price = null;
    if (product.prices && Array.isArray(product.prices) && product.prices.length > 0) {
      if (priceListId) {
        const priceEntry = product.prices.find((p) => p.price_list_id === priceListId);
        if (priceEntry) {
          price = parseFloat(priceEntry.price);
        }
      }
      if (price === null && product.prices.length > 0) {
        price = parseFloat(product.prices[0].price);
      }
    }
    return __spreadProps(__spreadValues({}, product), {
      has_price: price !== null,
      cost: price ?? product.cost ?? 0
    });
  }
  static \u0275fac = function ProductService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(PriceListService), \u0275\u0275inject(ProductPhotoService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductService, factory: _ProductService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: PriceListService }, { type: ProductPhotoService }], null);
})();

// src/app/features/purchase-orders/services/warehouse.service.ts
var WarehouseService = class _WarehouseService {
  http;
  baseUrl = `${environment.api}/tenant/warehouses`;
  warehousesCache$ = new BehaviorSubject(null);
  cacheTimestamp = 0;
  CACHE_DURATION = 5 * 60 * 1e3;
  // 5 minutes
  constructor(http) {
    this.http = http;
  }
  /**
   * Get all warehouses
   */
  getWarehouses() {
    const now = Date.now();
    const cached = this.warehousesCache$.value;
    if (cached && now - this.cacheTimestamp < this.CACHE_DURATION) {
      return of(cached);
    }
    return this.http.get(this.baseUrl).pipe(tap((warehouses) => {
      this.warehousesCache$.next(warehouses);
      this.cacheTimestamp = now;
    }));
  }
  /**
   * Clear cache
   */
  clearCache() {
    this.warehousesCache$.next(null);
    this.cacheTimestamp = 0;
  }
  static \u0275fac = function WarehouseService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WarehouseService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WarehouseService, factory: _WarehouseService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WarehouseService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ProductService,
  WarehouseService
};
//# sourceMappingURL=chunk-C5Q32U4C.js.map
