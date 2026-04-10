import {
  HttpClient,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  Injectable,
  __spreadValues,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7ZU2RCPO.js";

// src/app/features/settings/services/product.service.ts
var ProductService = class _ProductService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  // ─── Products ───────────────────────────────────────────────
  getProducts(params) {
    return this.http.get(`${this.api}/tenant/products`, { params }).pipe(map((response) => {
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
    }));
  }
  getProduct(id) {
    return this.http.get(`${this.api}/tenant/products/${id}`);
  }
  getProductBySku(sku) {
    return this.http.get(`${this.api}/tenant/products?sku=${sku}`).pipe(map((response) => {
      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      throw new Error("Product not found");
    }));
  }
  getProductsByCategory(categoryId) {
    return this.http.get(`${this.api}/tenant/products?category_id=${categoryId}`).pipe(map((response) => response.data || response));
  }
  getProductsBySubcategory(subcategoryId) {
    return this.http.get(`${this.api}/tenant/products?subcategory_id=${subcategoryId}`).pipe(map((response) => response.data || response));
  }
  createProduct(data) {
    return this.http.post(`${this.api}/tenant/products`, data);
  }
  updateProduct(id, data) {
    return this.http.patch(`${this.api}/tenant/products/${id}`, data);
  }
  updateProductStatus(id, isActive) {
    return this.http.patch(`${this.api}/tenant/products/${id}/status`, { is_active: isActive });
  }
  deleteProduct(id) {
    return this.http.delete(`${this.api}/tenant/products/${id}`);
  }
  // ─── Categories ─────────────────────────────────────────────
  getCategories(params) {
    return this.http.get(`${this.api}/tenant/categories`, { params });
  }
  getCategoryById(id) {
    return this.http.get(`${this.api}/tenant/categories/${id}`);
  }
  createCategory(data) {
    return this.http.post(`${this.api}/tenant/categories`, data);
  }
  updateCategory(id, data) {
    return this.http.put(`${this.api}/tenant/categories/${id}`, data);
  }
  deleteCategory(id) {
    return this.http.delete(`${this.api}/tenant/categories/${id}`);
  }
  // ─── Subcategories ──────────────────────────────────────────
  getSubCategories(categoryId, params) {
    const queryParams = __spreadValues({}, params);
    if (categoryId) {
      queryParams.category_id = categoryId;
    }
    return this.http.get(`${this.api}/tenant/subcategories`, { params: queryParams });
  }
  getSubCategoryById(id) {
    return this.http.get(`${this.api}/tenant/subcategories/${id}`);
  }
  createSubCategory(data) {
    return this.http.post(`${this.api}/tenant/subcategories`, data);
  }
  updateSubCategory(id, data) {
    return this.http.put(`${this.api}/tenant/subcategories/${id}`, data);
  }
  deleteSubCategory(id) {
    return this.http.delete(`${this.api}/tenant/subcategories/${id}`);
  }
  // ─── UoM Catalog ────────────────────────────────────────────
  getUOMCatalog() {
    return this.http.get(`${this.api}/uom-catalog`).pipe(map((response) => {
      if (response && response.data && Array.isArray(response.data)) {
        return response.data;
      }
      if (Array.isArray(response)) {
        return response;
      }
      return [];
    }));
  }
  createUOMCatalogItem(data) {
    return this.http.post(`${this.api}/uom-catalog`, data);
  }
  updateUOMCatalogItem(id, data) {
    return this.http.patch(`${this.api}/uom-catalog/${id}`, data);
  }
  deleteUOMCatalogItem(id) {
    return this.http.delete(`${this.api}/uom-catalog/${id}`);
  }
  // ─── Product UoMs ───────────────────────────────────────────
  getAssignedUoMs(productId) {
    return this.http.get(`${this.api}/tenant/products/${productId}/uoms`);
  }
  getUOMCatalogForProduct(productId) {
    return this.http.get(`${this.api}/tenant/products/${productId}/uoms/catalog`);
  }
  createUOM(productId, data) {
    return this.http.post(`${this.api}/tenant/products/${productId}/uoms`, data);
  }
  updateUOM(productId, uomId, data) {
    return this.http.patch(`${this.api}/tenant/products/${productId}/uoms/${uomId}`, data);
  }
  deleteUOM(productId, uomId) {
    return this.http.delete(`${this.api}/tenant/products/${productId}/uoms/${uomId}`);
  }
  // ─── UoM Relationships / Conversions ────────────────────────
  getUOMRelationships(productId) {
    return this.http.get(`${this.api}/tenant/products/${productId}/uoms/relationships`);
  }
  createUOMRelationship(productId, data) {
    return this.http.post(`${this.api}/tenant/products/${productId}/uoms/relationships`, data);
  }
  deleteUOMRelationship(productId, relationshipId) {
    return this.http.delete(`${this.api}/tenant/products/${productId}/uoms/relationships/${relationshipId}`);
  }
  convertUoM(productId, data) {
    return this.http.post(`${this.api}/tenant/products/${productId}/uoms/convert`, data);
  }
  // ─── Product Photos ─────────────────────────────────────────
  getPhotos(productId) {
    return this.http.get(`${this.api}/products/${productId}/photos`);
  }
  getPrimaryPhoto(productId) {
    return this.http.get(`${this.api}/products/${productId}/photos/primary`);
  }
  uploadPhoto(productId, file, altText) {
    const formData = new FormData();
    formData.append("file", file);
    if (altText) {
      formData.append("alt_text", altText);
    }
    return this.http.post(`${this.api}/products/${productId}/photos`, formData);
  }
  getPhotoSignedUrl(productId, photoId) {
    return this.http.get(`${this.api}/products/${productId}/photos/${photoId}/signed-url`);
  }
  updatePhoto(productId, photoId, data) {
    return this.http.patch(`${this.api}/products/${productId}/photos/${photoId}`, data);
  }
  reorderPhotos(productId, photoIds) {
    return this.http.post(`${this.api}/products/${productId}/photos/reorder`, { photo_ids: photoIds });
  }
  deletePhoto(productId, photoId) {
    return this.http.delete(`${this.api}/products/${productId}/photos/${photoId}`);
  }
  // ─── Price Lists ────────────────────────────────────────────
  getPriceLists(params) {
    return this.http.get(`${this.api}/tenant/price-lists`, { params }).pipe(map((response) => {
      if (response && response.data && Array.isArray(response.data)) {
        return response.data;
      }
      if (Array.isArray(response)) {
        return response;
      }
      return [];
    }));
  }
  getDefaultPriceList() {
    return this.http.get(`${this.api}/tenant/price-lists/default`);
  }
  createPriceList(data) {
    return this.http.post(`${this.api}/tenant/price-lists`, data);
  }
  updatePriceList(id, data) {
    return this.http.patch(`${this.api}/tenant/price-lists/${id}`, data);
  }
  deletePriceList(id) {
    return this.http.delete(`${this.api}/tenant/price-lists/${id}`);
  }
  // ─── Product Prices (Price Lists) ──────────────────────────
  getProductPrices(productId) {
    return this.http.get(`${this.api}/tenant/products/${productId}/prices`);
  }
  getSpecificProductPrice(productId, priceId) {
    return this.http.get(`${this.api}/tenant/products/${productId}/prices/${priceId}`);
  }
  createProductPrice(productId, data) {
    return this.http.post(`${this.api}/tenant/products/${productId}/prices`, data);
  }
  updateProductPrice(productId, priceId, data) {
    return this.http.patch(`${this.api}/tenant/products/${productId}/prices/${priceId}`, data);
  }
  deleteProductPrice(productId, priceId) {
    return this.http.delete(`${this.api}/tenant/products/${productId}/prices/${priceId}`);
  }
  // ─── Vendor Product Prices ──────────────────────────────────
  // Métodos antiguos (deprecated)
  createVendorPrice(data) {
    return this.http.post(`${this.api}/tenant/vendor-product-prices`, data);
  }
  getVendorPricesByProduct(productId) {
    return this.http.get(`${this.api}/tenant/vendor-product-prices/products/${productId}`);
  }
  getVendorPricesByVendor(vendorId) {
    return this.http.get(`${this.api}/tenant/vendor-product-prices/vendors/${vendorId}`);
  }
  getSpecificVendorPrice(vendorId, productId, uomId) {
    return this.http.get(`${this.api}/tenant/vendor-product-prices/vendor/${vendorId}/product/${productId}/uom/${uomId}`);
  }
  updateVendorPrice(id, data) {
    return this.http.patch(`${this.api}/tenant/vendor-product-prices/${id}`, data);
  }
  deleteVendorPrice(id) {
    return this.http.delete(`${this.api}/tenant/vendor-product-prices/${id}`);
  }
  // ─── Vendor Costs (New) ─────────────────────────────────────
  getVendorCosts(productId) {
    return this.http.get(`${this.api}/tenant/products/${productId}/vendor-costs`);
  }
  getVendorCost(productId, costId) {
    return this.http.get(`${this.api}/tenant/products/${productId}/vendor-costs/${costId}`);
  }
  createVendorCost(productId, data) {
    return this.http.post(`${this.api}/tenant/products/${productId}/vendor-costs`, data);
  }
  updateVendorCost(productId, costId, data) {
    return this.http.patch(`${this.api}/tenant/products/${productId}/vendor-costs/${costId}`, data);
  }
  deleteVendorCost(productId, costId) {
    return this.http.delete(`${this.api}/tenant/products/${productId}/vendor-costs/${costId}`);
  }
  // ─── Vendors ────────────────────────────────────────────────
  getVendors(params) {
    return this.http.get(`${this.api}/tenant/vendors`, { params }).pipe(map((response) => {
      if (response && response.data && Array.isArray(response.data)) {
        return response.data;
      }
      if (Array.isArray(response)) {
        return response;
      }
      return [];
    }));
  }
  // ─── Inventory ──────────────────────────────────────────────
  checkInventoryMovements(productId) {
    return this.http.get(`${this.api}/tenant/inventory/reports/by-product/${productId}`).pipe(map((movements) => ({ has_movements: movements && movements.length > 0 })));
  }
  getInventoryMovementsByProduct(productId) {
    return this.http.get(`${this.api}/tenant/inventory/reports/by-product/${productId}`);
  }
  static \u0275fac = function ProductService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductService, factory: _ProductService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ProductService
};
//# sourceMappingURL=chunk-FIZPSH25.js.map
