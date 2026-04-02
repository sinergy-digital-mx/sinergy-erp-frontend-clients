import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  Product, CreateProductDto, UpdateProductDto, ProductListResponse, ProductQueryParams,
  Category, SubCategory, CategoryQueryParams, SubCategoryQueryParams,
  ProductPhoto, ProductPrice, PriceList, CreatePriceListDto, CreateProductPriceDto,
  VendorProductPrice, CreateVendorPriceDto,
  ConvertUoMRequest, ConvertUoMResponse,
  UoMCatalog
} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = environment.api;

  constructor(private http: HttpClient) { }

  // ─── Products ───────────────────────────────────────────────

  getProducts(params?: ProductQueryParams): Observable<ProductListResponse> {
    return this.http.get<any>(`${this.api}/tenant/products`, { params: params as any }).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return {
            data: response,
            total: response.length,
            page: 1,
            limit: 20,
            totalPages: 1,
            hasNext: false,
            hasPrev: false
          };
        }
        return response;
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.api}/tenant/products/${id}`);
  }

  getProductBySku(sku: string): Observable<Product> {
    return this.http.get<Product>(`${this.api}/tenant/products?sku=${sku}`).pipe(
      map((response: any) => {
        if (response.data && response.data.length > 0) {
          return response.data[0];
        }
        throw new Error('Product not found');
      })
    );
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.http.get<any>(`${this.api}/tenant/products?category_id=${categoryId}`).pipe(
      map(response => response.data || response)
    );
  }

  getProductsBySubcategory(subcategoryId: string): Observable<Product[]> {
    return this.http.get<any>(`${this.api}/tenant/products?subcategory_id=${subcategoryId}`).pipe(
      map(response => response.data || response)
    );
  }

  createProduct(data: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(`${this.api}/tenant/products`, data);
  }

  updateProduct(id: string, data: UpdateProductDto): Observable<Product> {
    return this.http.patch<Product>(`${this.api}/tenant/products/${id}`, data);
  }

  updateProductStatus(id: string, isActive: boolean): Observable<Product> {
    return this.http.patch<Product>(`${this.api}/tenant/products/${id}/status`, { is_active: isActive });
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/products/${id}`);
  }

  // ─── Categories ─────────────────────────────────────────────

  getCategories(params?: CategoryQueryParams): Observable<{ data: Category[] }> {
    return this.http.get<{ data: Category[] }>(`${this.api}/tenant/categories`, { params: params as any });
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.api}/tenant/categories/${id}`);
  }

  createCategory(data: { name: string; description?: string; status?: string }): Observable<Category> {
    return this.http.post<Category>(`${this.api}/tenant/categories`, data);
  }

  updateCategory(id: string, data: Partial<{ name: string; description: string; status: string }>): Observable<Category> {
    return this.http.put<Category>(`${this.api}/tenant/categories/${id}`, data);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/categories/${id}`);
  }

  // ─── Subcategories ──────────────────────────────────────────

  getSubCategories(categoryId?: string, params?: SubCategoryQueryParams): Observable<{ data: SubCategory[] }> {
    const queryParams: any = { ...params };
    if (categoryId) {
      queryParams.category_id = categoryId;
    }
    return this.http.get<{ data: SubCategory[] }>(`${this.api}/tenant/subcategories`, { params: queryParams });
  }

  getSubCategoryById(id: string): Observable<SubCategory> {
    return this.http.get<SubCategory>(`${this.api}/tenant/subcategories/${id}`);
  }

  createSubCategory(data: { category_id: string; name: string; description?: string; status?: string }): Observable<SubCategory> {
    return this.http.post<SubCategory>(`${this.api}/tenant/subcategories`, data);
  }

  updateSubCategory(id: string, data: Partial<{ name: string; description: string; status: string }>): Observable<SubCategory> {
    return this.http.put<SubCategory>(`${this.api}/tenant/subcategories/${id}`, data);
  }

  deleteSubCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/subcategories/${id}`);
  }

  // ─── UoM Catalog ────────────────────────────────────────────

  getUOMCatalog(): Observable<UoMCatalog[]> {
    return this.http.get<any>(`${this.api}/uom-catalog`).pipe(
      map(response => {
        // Handle paginated response with data property
        if (response && response.data && Array.isArray(response.data)) {
          return response.data;
        }
        // Handle direct array response
        if (Array.isArray(response)) {
          return response;
        }
        return [];
      })
    );
  }

  createUOMCatalogItem(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/uom-catalog`, data);
  }

  updateUOMCatalogItem(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.api}/uom-catalog/${id}`, data);
  }

  deleteUOMCatalogItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/uom-catalog/${id}`);
  }

  // ─── Product UoMs ───────────────────────────────────────────

  getAssignedUoMs(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/tenant/products/${productId}/uoms`);
  }

  getUOMCatalogForProduct(productId: string): Observable<UoMCatalog[]> {
    return this.http.get<UoMCatalog[]>(`${this.api}/tenant/products/${productId}/uoms/catalog`);
  }

  createUOM(productId: string, data: { uom_catalog_id: string; factor?: number; is_base?: boolean; parent_uom_id?: string | null }): Observable<any> {
    return this.http.post<any>(`${this.api}/tenant/products/${productId}/uoms`, data);
  }

  updateUOM(productId: string, uomId: string, data: { factor?: number; is_base?: boolean; parent_uom_id?: string | null }): Observable<any> {
    return this.http.patch<any>(`${this.api}/tenant/products/${productId}/uoms/${uomId}`, data);
  }

  deleteUOM(productId: string, uomId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/products/${productId}/uoms/${uomId}`);
  }

  // ─── UoM Relationships / Conversions ────────────────────────

  getUOMRelationships(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/tenant/products/${productId}/uoms/relationships`);
  }

  createUOMRelationship(productId: string, data: { source_uom_id: string; target_uom_id: string; conversion_factor: number }): Observable<any> {
    return this.http.post<any>(`${this.api}/tenant/products/${productId}/uoms/relationships`, data);
  }

  deleteUOMRelationship(productId: string, relationshipId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/products/${productId}/uoms/relationships/${relationshipId}`);
  }

  convertUoM(productId: string, data: ConvertUoMRequest): Observable<ConvertUoMResponse> {
    return this.http.post<ConvertUoMResponse>(`${this.api}/tenant/products/${productId}/uoms/convert`, data);
  }

  // ─── Product Photos ─────────────────────────────────────────

  getPhotos(productId: string): Observable<ProductPhoto[]> {
    return this.http.get<ProductPhoto[]>(`${this.api}/products/${productId}/photos`);
  }

  getPrimaryPhoto(productId: string): Observable<ProductPhoto> {
    return this.http.get<ProductPhoto>(`${this.api}/products/${productId}/photos/primary`);
  }

  uploadPhoto(productId: string, file: File, altText?: string): Observable<ProductPhoto> {
    const formData = new FormData();
    formData.append('file', file);
    if (altText) {
      formData.append('alt_text', altText);
    }
    return this.http.post<ProductPhoto>(`${this.api}/products/${productId}/photos`, formData);
  }

  getPhotoSignedUrl(productId: string, photoId: string): Observable<{ signed_url: string }> {
    return this.http.get<{ signed_url: string }>(`${this.api}/products/${productId}/photos/${photoId}/signed-url`);
  }

  updatePhoto(productId: string, photoId: string, data: Partial<{ alt_text: string; is_primary: boolean }>): Observable<ProductPhoto> {
    return this.http.patch<ProductPhoto>(`${this.api}/products/${productId}/photos/${photoId}`, data);
  }

  reorderPhotos(productId: string, photoIds: string[]): Observable<void> {
    return this.http.post<void>(`${this.api}/products/${productId}/photos/reorder`, { photo_ids: photoIds });
  }

  deletePhoto(productId: string, photoId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/products/${productId}/photos/${photoId}`);
  }

  // ─── Price Lists ────────────────────────────────────────────

  getPriceLists(params?: { is_active?: boolean }): Observable<PriceList[]> {
    return this.http.get<any>(`${this.api}/tenant/price-lists`, { params: params as any }).pipe(
      map(response => {
        // Handle paginated response with data property
        if (response && response.data && Array.isArray(response.data)) {
          return response.data;
        }
        // Handle direct array response
        if (Array.isArray(response)) {
          return response;
        }
        return [];
      })
    );
  }

  getDefaultPriceList(): Observable<PriceList> {
    return this.http.get<PriceList>(`${this.api}/tenant/price-lists/default`);
  }

  createPriceList(data: CreatePriceListDto): Observable<PriceList> {
    return this.http.post<PriceList>(`${this.api}/tenant/price-lists`, data);
  }

  updatePriceList(id: string, data: Partial<CreatePriceListDto>): Observable<PriceList> {
    return this.http.patch<PriceList>(`${this.api}/tenant/price-lists/${id}`, data);
  }

  deletePriceList(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/price-lists/${id}`);
  }

  // ─── Product Prices (Price Lists) ──────────────────────────

  getProductPrices(productId: string): Observable<ProductPrice[]> {
    return this.http.get<ProductPrice[]>(`${this.api}/tenant/products/${productId}/prices`);
  }

  getSpecificProductPrice(productId: string, priceId: string): Observable<ProductPrice> {
    return this.http.get<ProductPrice>(`${this.api}/tenant/products/${productId}/prices/${priceId}`);
  }

  createProductPrice(productId: string, data: { price_list_id: string; product_uom_id: string; price: number; iva_percentage?: number; ieps_percentage?: number }): Observable<ProductPrice> {
    return this.http.post<ProductPrice>(`${this.api}/tenant/products/${productId}/prices`, data);
  }

  updateProductPrice(productId: string, priceId: string, data: { price?: number; iva_percentage?: number; ieps_percentage?: number }): Observable<ProductPrice> {
    return this.http.patch<ProductPrice>(`${this.api}/tenant/products/${productId}/prices/${priceId}`, data);
  }

  deleteProductPrice(productId: string, priceId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/products/${productId}/prices/${priceId}`);
  }

  // ─── Vendor Product Prices ──────────────────────────────────

  // Métodos antiguos (deprecated)
  createVendorPrice(data: CreateVendorPriceDto): Observable<VendorProductPrice> {
    return this.http.post<VendorProductPrice>(`${this.api}/tenant/vendor-product-prices`, data);
  }

  getVendorPricesByProduct(productId: string): Observable<VendorProductPrice[]> {
    return this.http.get<VendorProductPrice[]>(`${this.api}/tenant/vendor-product-prices/products/${productId}`);
  }

  getVendorPricesByVendor(vendorId: string): Observable<VendorProductPrice[]> {
    return this.http.get<VendorProductPrice[]>(`${this.api}/tenant/vendor-product-prices/vendors/${vendorId}`);
  }

  getSpecificVendorPrice(vendorId: string, productId: string, uomId: string): Observable<VendorProductPrice> {
    return this.http.get<VendorProductPrice>(`${this.api}/tenant/vendor-product-prices/vendor/${vendorId}/product/${productId}/uom/${uomId}`);
  }

  updateVendorPrice(id: string, data: { price: number }): Observable<VendorProductPrice> {
    return this.http.patch<VendorProductPrice>(`${this.api}/tenant/vendor-product-prices/${id}`, data);
  }

  deleteVendorPrice(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/vendor-product-prices/${id}`);
  }

  // ─── Vendor Costs (New) ─────────────────────────────────────

  getVendorCosts(productId: string): Observable<VendorProductPrice[]> {
    return this.http.get<VendorProductPrice[]>(`${this.api}/tenant/products/${productId}/vendor-costs`);
  }

  getVendorCost(productId: string, costId: string): Observable<VendorProductPrice> {
    return this.http.get<VendorProductPrice>(`${this.api}/tenant/products/${productId}/vendor-costs/${costId}`);
  }

  createVendorCost(productId: string, data: { vendor_id: string; product_uom_id: string; cost: number; iva_percentage?: number; ieps_percentage?: number }): Observable<VendorProductPrice> {
    return this.http.post<VendorProductPrice>(`${this.api}/tenant/products/${productId}/vendor-costs`, data);
  }

  updateVendorCost(productId: string, costId: string, data: { cost?: number; iva_percentage?: number; ieps_percentage?: number }): Observable<VendorProductPrice> {
    return this.http.patch<VendorProductPrice>(`${this.api}/tenant/products/${productId}/vendor-costs/${costId}`, data);
  }

  deleteVendorCost(productId: string, costId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/products/${productId}/vendor-costs/${costId}`);
  }

  // ─── Vendors ────────────────────────────────────────────────

  getVendors(params?: { is_active?: boolean }): Observable<any> {
    return this.http.get<any>(`${this.api}/tenant/vendors`, { params: params as any }).pipe(
      map(response => {
        // Handle paginated response with data property
        if (response && response.data && Array.isArray(response.data)) {
          return response.data;
        }
        // Handle direct array response
        if (Array.isArray(response)) {
          return response;
        }
        return [];
      })
    );
  }

  // ─── Inventory ──────────────────────────────────────────────

  checkInventoryMovements(productId: string): Observable<{ has_movements: boolean }> {
    // Use the correct inventory endpoint to check if product has movements
    return this.http.get<any[]>(`${this.api}/tenant/inventory/reports/by-product/${productId}`).pipe(
      map(movements => ({ has_movements: movements && movements.length > 0 }))
    );
  }

  getInventoryMovementsByProduct(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/tenant/inventory/reports/by-product/${productId}`);
  }
}
