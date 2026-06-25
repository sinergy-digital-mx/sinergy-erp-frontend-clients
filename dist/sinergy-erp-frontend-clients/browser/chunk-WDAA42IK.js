import {
  BranchService
} from "./chunk-CQ4BUXG7.js";
import {
  FiscalConfigurationService
} from "./chunk-CEL5SWQJ.js";
import {
  TabComponent
} from "./chunk-M65YKY4W.js";
import {
  WarehouseService
} from "./chunk-MBXKGEVM.js";
import {
  SelectComponent
} from "./chunk-DFLPJ3H7.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-C44BBKV6.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-EF42XV6X.js";
import {
  ButtonComponent
} from "./chunk-ZZJV4WZP.js";
import {
  CustomSnackbarComponent,
  MatSnackBar,
  ToastService
} from "./chunk-OP2NIPTP.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-EBDBUXLH.js";
import {
  CommonModule,
  DecimalPipe,
  HttpClient,
  NgForOf,
  NgIf,
  environment
} from "./chunk-MNFUR22A.js";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Injectable,
  NgZone,
  Output,
  __spreadProps,
  __spreadValues,
  catchError,
  finalize,
  forkJoin,
  map,
  of,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-CJAGDKD4.js";

// src/app/features/settings/services/product.service.ts
var ProductService = class _ProductService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  // ─── Products ───────────────────────────────────────────────
  getProducts(params) {
    const httpParams = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== void 0 && value !== null && value !== "") {
          httpParams[key] = value;
        }
      }
    }
    return this.http.get(`${this.api}/tenant/products`, { params: httpParams }).pipe(map((response) => this.normalizeProductListResponse(response, params)));
  }
  normalizeProductListResponse(response, params) {
    const defaultLimit = params?.limit ?? 20;
    if (Array.isArray(response)) {
      return {
        data: response,
        total: response.length,
        page: 1,
        limit: defaultLimit,
        totalPages: 1,
        hasNext: false,
        hasPrev: false
      };
    }
    const data = response?.data ?? [];
    const page = Number(response?.page) || params?.page || 1;
    const limit = Number(response?.limit) || params?.limit || defaultLimit;
    const total = Number(response?.total) || data.length;
    const totalPages = Number(response?.totalPages) || (total > 0 ? Math.ceil(total / limit) : 1);
    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext: response?.hasNext ?? page < totalPages,
      hasPrev: response?.hasPrev ?? page > 1
    };
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
  // ─── Product Attributes (Tenant) ────────────────────────────
  getProductAttributes(params) {
    return this.http.get(`${this.api}/tenant/products/attributes`, { params });
  }
  getProductAttributeById(attributeId) {
    return this.http.get(`${this.api}/tenant/products/attributes/${attributeId}`);
  }
  createProductAttribute(data) {
    return this.http.post(`${this.api}/tenant/products/attributes`, data);
  }
  updateProductAttribute(attributeId, data) {
    return this.http.patch(`${this.api}/tenant/products/attributes/${attributeId}`, data);
  }
  deleteProductAttribute(attributeId) {
    return this.http.delete(`${this.api}/tenant/products/attributes/${attributeId}`);
  }
  createProductAttributeValue(attributeId, data) {
    return this.http.post(`${this.api}/tenant/products/attributes/${attributeId}/values`, data);
  }
  getProductAttributeValues(attributeId) {
    return this.http.get(`${this.api}/tenant/products/attributes/${attributeId}/values`);
  }
  updateProductAttributeValue(attributeId, valueId, data) {
    return this.http.patch(`${this.api}/tenant/products/attributes/${attributeId}/values/${valueId}`, data);
  }
  deleteProductAttributeValue(attributeId, valueId) {
    return this.http.delete(`${this.api}/tenant/products/attributes/${attributeId}/values/${valueId}`);
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
    return this.http.get(`${this.api}/tenant/products/${productId}/uoms/catalog`).pipe(map((response) => {
      if (response && response.data && Array.isArray(response.data)) {
        return response.data;
      }
      if (Array.isArray(response)) {
        return response;
      }
      return [];
    }));
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
  uploadProductPhoto(productId, file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.api}/tenant/products/${productId}/photo`, formData).pipe(map((response) => {
      if (response?.data)
        return response.data;
      return response;
    }));
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
  // ─── Product Discounts ──────────────────────────────────────
  getProductDiscounts(productId) {
    return this.http.get(`${this.api}/tenant/products/${productId}/discounts`);
  }
  getProductDiscount(productId, discountId) {
    return this.http.get(`${this.api}/tenant/products/${productId}/discounts/${discountId}`);
  }
  createProductDiscount(productId, data) {
    return this.http.post(`${this.api}/tenant/products/${productId}/discounts`, data);
  }
  updateProductDiscount(productId, discountId, data) {
    return this.http.patch(`${this.api}/tenant/products/${productId}/discounts/${discountId}`, data);
  }
  deleteProductDiscount(productId, discountId) {
    return this.http.delete(`${this.api}/tenant/products/${productId}/discounts/${discountId}`);
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

// src/app/features/settings/components/categories-dialog/categories-dialog.component.ts
function CategoriesDialogComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "button", 16);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_14_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startCreating());
    });
    \u0275\u0275text(2, " + Crear Nueva ");
    \u0275\u0275elementEnd()();
  }
}
function CategoriesDialogComponent_form_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 17)(1, "div")(2, "label", 18);
    \u0275\u0275text(3, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "label", 18);
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "textarea", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 21)(10, "button", 22);
    \u0275\u0275listener("click", function CategoriesDialogComponent_form_15_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelCreating());
    });
    \u0275\u0275text(11, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 23);
    \u0275\u0275listener("click", function CategoriesDialogComponent_form_15_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCategory());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", ctx_r1.form.invalid || ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Guardando..." : "Guardar", " ");
  }
}
function CategoriesDialogComponent_div_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "p");
    \u0275\u0275text(2, "No hay categor\xEDas");
    \u0275\u0275elementEnd()();
  }
}
function CategoriesDialogComponent_div_16_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_16_div_2_div_1_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectCategory(cat_r5.id));
    });
    \u0275\u0275elementStart(2, "p", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "button", 36);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_16_div_2_div_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startEditingCategory(cat_r5));
    });
    \u0275\u0275element(8, "i", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 38);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_16_div_2_div_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r4);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteCategory(cat_r5));
    });
    \u0275\u0275element(10, "i", 39);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cat_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(cat_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r5.description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function CategoriesDialogComponent_div_16_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div")(2, "label", 18);
    \u0275\u0275text(3, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesDialogComponent_div_16_div_2_div_2_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingCategoryForm[cat_r5.id].name, $event) || (ctx_r1.editingCategoryForm[cat_r5.id].name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "label", 18);
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 42);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesDialogComponent_div_16_div_2_div_2_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingCategoryForm[cat_r5.id].description, $event) || (ctx_r1.editingCategoryForm[cat_r5.id].description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 21)(10, "button", 43);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_16_div_2_div_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelEditingCategory());
    });
    \u0275\u0275text(11, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 44);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_16_div_2_div_2_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveEditCategory(cat_r5));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cat_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingCategoryForm[cat_r5.id].name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingCategoryForm[cat_r5.id].description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Guardando..." : "Guardar", " ");
  }
}
function CategoriesDialogComponent_div_16_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275template(1, CategoriesDialogComponent_div_16_div_2_div_1_Template, 11, 3, "div", 29)(2, CategoriesDialogComponent_div_16_div_2_div_2_Template, 14, 4, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingCategoryId() !== cat_r5.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingCategoryId() === cat_r5.id);
  }
}
function CategoriesDialogComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275template(1, CategoriesDialogComponent_div_16_div_1_Template, 3, 0, "div", 25)(2, CategoriesDialogComponent_div_16_div_2_Template, 3, 2, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.categories().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.categories());
  }
}
function CategoriesDialogComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "button", 16);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_18_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startCreatingSubcategory());
    });
    \u0275\u0275text(2, " + Crear Nueva ");
    \u0275\u0275elementEnd()();
  }
}
function CategoriesDialogComponent_form_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 17)(1, "div")(2, "label", 18);
    \u0275\u0275text(3, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "label", 18);
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "textarea", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 21)(10, "button", 22);
    \u0275\u0275listener("click", function CategoriesDialogComponent_form_19_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelCreatingSubcategory());
    });
    \u0275\u0275text(11, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 23);
    \u0275\u0275listener("click", function CategoriesDialogComponent_form_19_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveSubcategory());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", ctx_r1.form.invalid || ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Guardando..." : "Guardar", " ");
  }
}
function CategoriesDialogComponent_div_20_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "p");
    \u0275\u0275text(2, "No hay subcategor\xEDas");
    \u0275\u0275elementEnd()();
  }
}
function CategoriesDialogComponent_div_20_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 46)(2, "p", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "button", 36);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_20_div_2_div_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r9);
      const subcat_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startEditingSubcategory(subcat_r10));
    });
    \u0275\u0275element(8, "i", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 38);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_20_div_2_div_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r9);
      const subcat_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteSubcategory(subcat_r10));
    });
    \u0275\u0275element(10, "i", 39);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const subcat_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(subcat_r10.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(subcat_r10.description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function CategoriesDialogComponent_div_20_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div")(2, "label", 18);
    \u0275\u0275text(3, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesDialogComponent_div_20_div_2_div_2_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const subcat_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingSubcategoryForm[subcat_r10.id].name, $event) || (ctx_r1.editingSubcategoryForm[subcat_r10.id].name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "label", 18);
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 42);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesDialogComponent_div_20_div_2_div_2_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r11);
      const subcat_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingSubcategoryForm[subcat_r10.id].description, $event) || (ctx_r1.editingSubcategoryForm[subcat_r10.id].description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 21)(10, "button", 43);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_20_div_2_div_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelEditingSubcategory());
    });
    \u0275\u0275text(11, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 44);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_20_div_2_div_2_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r11);
      const subcat_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveEditSubcategory(subcat_r10));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const subcat_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingSubcategoryForm[subcat_r10.id].name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingSubcategoryForm[subcat_r10.id].description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Guardando..." : "Guardar", " ");
  }
}
function CategoriesDialogComponent_div_20_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275template(1, CategoriesDialogComponent_div_20_div_2_div_1_Template, 11, 3, "div", 29)(2, CategoriesDialogComponent_div_20_div_2_div_2_Template, 14, 4, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const subcat_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingSubcategoryId() !== subcat_r10.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingSubcategoryId() === subcat_r10.id);
  }
}
function CategoriesDialogComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275template(1, CategoriesDialogComponent_div_20_div_1_Template, 3, 0, "div", 25)(2, CategoriesDialogComponent_div_20_div_2_Template, 3, 2, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.subcategories().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.subcategories());
  }
}
var CategoriesDialogComponent = class _CategoriesDialogComponent {
  fb;
  productService;
  snackBar;
  dialogRef;
  form;
  categories = signal([], ...ngDevMode ? [{ debugName: "categories" }] : []);
  subcategories = signal([], ...ngDevMode ? [{ debugName: "subcategories" }] : []);
  selectedCategoryId = signal(null, ...ngDevMode ? [{ debugName: "selectedCategoryId" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  activeTab = signal("categories", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  isCreating = signal(false, ...ngDevMode ? [{ debugName: "isCreating" }] : []);
  isCreatingSubcategory = signal(false, ...ngDevMode ? [{ debugName: "isCreatingSubcategory" }] : []);
  editingCategoryId = signal(null, ...ngDevMode ? [{ debugName: "editingCategoryId" }] : []);
  editingSubcategoryId = signal(null, ...ngDevMode ? [{ debugName: "editingSubcategoryId" }] : []);
  editingCategoryForm = {};
  editingSubcategoryForm = {};
  constructor(fb, productService, snackBar, dialogRef) {
    this.fb = fb;
    this.productService = productService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.form = this.fb.group({
      name: ["", Validators.required],
      description: [""]
    });
  }
  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar categor\xEDas", type: "error" },
          duration: 3e3
        });
      }
    });
  }
  startCreating() {
    this.isCreating.set(true);
    this.form.reset();
  }
  cancelCreating() {
    this.isCreating.set(false);
    this.form.reset();
  }
  saveCategory() {
    if (!this.form.valid)
      return;
    this.saving.set(true);
    const categoryData = {
      name: this.form.get("name")?.value,
      description: this.form.get("description")?.value || ""
    };
    this.productService.createCategory(categoryData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Categor\xEDa creada exitosamente", type: "success" },
          duration: 3e3
        });
        this.isCreating.set(false);
        this.form.reset();
        this.loadCategories();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al crear categor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  startEditingCategory(category) {
    this.editingCategoryId.set(category.id);
    this.editingCategoryForm[category.id] = { name: category.name, description: category.description };
  }
  cancelEditingCategory() {
    this.editingCategoryId.set(null);
    this.editingCategoryForm = {};
  }
  saveEditCategory(category) {
    if (!this.editingCategoryForm[category.id]?.name)
      return;
    this.saving.set(true);
    const updateData = {
      name: this.editingCategoryForm[category.id].name,
      description: this.editingCategoryForm[category.id].description || ""
    };
    this.productService.updateCategory(category.id, updateData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Categor\xEDa actualizada exitosamente", type: "success" },
          duration: 3e3
        });
        this.editingCategoryId.set(null);
        this.editingCategoryForm = {};
        this.loadCategories();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al actualizar categor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  deleteCategory(category) {
    if (!confirm("\xBFEst\xE1s seguro de que deseas eliminar esta categor\xEDa?"))
      return;
    this.saving.set(true);
    this.productService.deleteCategory(category.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Categor\xEDa eliminada exitosamente", type: "success" },
          duration: 3e3
        });
        this.loadCategories();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al eliminar categor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  startCreatingSubcategory() {
    this.isCreatingSubcategory.set(true);
    this.form.reset();
  }
  cancelCreatingSubcategory() {
    this.isCreatingSubcategory.set(false);
    this.form.reset();
  }
  saveSubcategory() {
    if (!this.form.valid || !this.selectedCategoryId())
      return;
    this.saving.set(true);
    const subcategoryData = {
      category_id: this.selectedCategoryId(),
      name: this.form.get("name")?.value,
      description: this.form.get("description")?.value || ""
    };
    this.productService.createSubCategory(subcategoryData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Subcategor\xEDa creada exitosamente", type: "success" },
          duration: 3e3
        });
        this.isCreatingSubcategory.set(false);
        this.form.reset();
        if (this.selectedCategoryId()) {
          this.loadSubcategories(this.selectedCategoryId());
        }
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al crear subcategor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  startEditingSubcategory(subcategory) {
    this.editingSubcategoryId.set(subcategory.id);
    this.editingSubcategoryForm[subcategory.id] = { name: subcategory.name, description: subcategory.description };
  }
  cancelEditingSubcategory() {
    this.editingSubcategoryId.set(null);
    this.editingSubcategoryForm = {};
  }
  saveEditSubcategory(subcategory) {
    if (!this.editingSubcategoryForm[subcategory.id]?.name)
      return;
    this.saving.set(true);
    const updateData = {
      name: this.editingSubcategoryForm[subcategory.id].name,
      description: this.editingSubcategoryForm[subcategory.id].description || ""
    };
    this.productService.updateSubCategory(subcategory.id, updateData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Subcategor\xEDa actualizada exitosamente", type: "success" },
          duration: 3e3
        });
        this.editingSubcategoryId.set(null);
        this.editingSubcategoryForm = {};
        if (this.selectedCategoryId()) {
          this.loadSubcategories(this.selectedCategoryId());
        }
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al actualizar subcategor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  deleteSubcategory(subcategory) {
    if (!confirm("\xBFEst\xE1s seguro de que deseas eliminar esta subcategor\xEDa?"))
      return;
    this.saving.set(true);
    this.productService.deleteSubCategory(subcategory.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Subcategor\xEDa eliminada exitosamente", type: "success" },
          duration: 3e3
        });
        if (this.selectedCategoryId()) {
          this.loadSubcategories(this.selectedCategoryId());
        }
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al eliminar subcategor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  selectCategory(categoryId) {
    this.selectedCategoryId.set(categoryId);
    this.activeTab.set("subcategories");
    this.loadSubcategories(categoryId);
  }
  loadSubcategories(categoryId) {
    this.productService.getSubCategories(categoryId).subscribe({
      next: (res) => {
        this.subcategories.set(res.data);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar subcategor\xEDas", type: "error" },
          duration: 3e3
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function CategoriesDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoriesDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoriesDialogComponent, selectors: [["app-categories-dialog"]], decls: 24, vars: 15, consts: [[1, "dialog"], [1, "dialog__header"], [1, "close", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "tabs"], [1, "tab", 3, "click"], [1, "tab", 3, "click", "disabled"], [1, "dialog__body"], [1, "tab-content"], ["class", "header-actions", 4, "ngIf"], ["class", "create-form", 3, "formGroup", 4, "ngIf"], ["class", "items-list", 4, "ngIf"], [1, "dialog__footer"], [1, "btn", "btn--secondary", 3, "click"], [1, "header-actions"], [1, "create-btn", 3, "click"], [1, "create-form", 3, "formGroup"], [1, "form-label"], ["type", "text", "formControlName", "name", "placeholder", "Nombre de la categor\xEDa", 1, "form-input"], ["formControlName", "description", "rows", "2", "placeholder", "Descripci\xF3n opcional", 1, "form-input"], [1, "form-actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "items-list"], ["class", "empty-state", 4, "ngIf"], ["class", "item-card", 4, "ngFor", "ngForOf"], [1, "empty-state"], [1, "item-card"], ["class", "item-view", 4, "ngIf"], ["class", "item-edit", 4, "ngIf"], [1, "item-view"], [1, "item-info", 3, "click"], [1, "item-name"], [1, "item-description"], [1, "item-actions"], ["title", "Editar", 1, "icon-btn", 3, "click"], [1, "fi", "fi-rr-pencil"], ["title", "Eliminar", 1, "icon-btn", "icon-btn--danger", 3, "click", "disabled"], [1, "fi", "fi-rr-trash"], [1, "item-edit"], ["type", "text", 1, "form-input", "form-input--sm", 3, "ngModelChange", "ngModel"], ["rows", "2", 1, "form-input", "form-input--sm", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn--sm", "btn--secondary", 3, "click"], [1, "btn", "btn--sm", "btn--primary", 3, "click", "disabled"], ["type", "text", "formControlName", "name", "placeholder", "Nombre de la subcategor\xEDa", 1, "form-input"], [1, "item-info"]], template: function CategoriesDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Gestionar Categor\xEDas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function CategoriesDialogComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 3);
      \u0275\u0275element(6, "path", 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 5)(8, "button", 6);
      \u0275\u0275listener("click", function CategoriesDialogComponent_Template_button_click_8_listener() {
        return ctx.activeTab.set("categories");
      });
      \u0275\u0275text(9, " Categor\xEDas ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 7);
      \u0275\u0275listener("click", function CategoriesDialogComponent_Template_button_click_10_listener() {
        return ctx.activeTab.set("subcategories");
      });
      \u0275\u0275text(11, " Subcategor\xEDas ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 8)(13, "div", 9);
      \u0275\u0275template(14, CategoriesDialogComponent_div_14_Template, 3, 0, "div", 10)(15, CategoriesDialogComponent_form_15_Template, 14, 3, "form", 11)(16, CategoriesDialogComponent_div_16_Template, 3, 2, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 9);
      \u0275\u0275template(18, CategoriesDialogComponent_div_18_Template, 3, 0, "div", 10)(19, CategoriesDialogComponent_form_19_Template, 14, 3, "form", 11)(20, CategoriesDialogComponent_div_20_Template, 3, 2, "div", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 13)(22, "button", 14);
      \u0275\u0275listener("click", function CategoriesDialogComponent_Template_button_click_22_listener() {
        return ctx.close();
      });
      \u0275\u0275text(23, " Cerrar ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275classProp("active", ctx.activeTab() === "categories");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "subcategories");
      \u0275\u0275property("disabled", !ctx.selectedCategoryId());
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.activeTab() === "categories");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isCreating());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isCreating());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isCreating());
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.activeTab() === "subcategories");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isCreatingSubcategory());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isCreatingSubcategory());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isCreatingSubcategory());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormsModule, NgModel], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  width: 600px;\n  height: 600px;\n  display: flex;\n  flex-direction: column;\n}\n.dialog__header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-shrink: 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.dialog__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n  background: none;\n  border: none;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n}\n.dialog__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.dialog__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px 20px;\n  min-height: 0;\n}\n.dialog__footer[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 2px solid #e5e7eb;\n  padding: 0 20px;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.tab[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #6b7280;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #374151;\n}\n.tab.active[_ngcontent-%COMP%] {\n  color: #7c3aed;\n  border-bottom-color: #7c3aed;\n}\n.tab[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.tab-content[_ngcontent-%COMP%] {\n  display: none;\n}\n.tab-content.active[_ngcontent-%COMP%] {\n  display: block;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 16px;\n}\n.create-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.create-btn[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.create-form[_ngcontent-%COMP%] {\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #f9fafb;\n  margin-bottom: 16px;\n}\n.create-form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.create-form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-of-type {\n  margin-bottom: 0;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 6px;\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  outline: none;\n  transition: border-color 0.2s;\n  font-family: inherit;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-input--sm[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  font-size: 12px;\n}\ntextarea.form-input[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 60px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n  font-family: inherit;\n  flex: 1;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n}\n.btn--secondary[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #374151;\n}\n.btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e5e7eb;\n}\n.btn--sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.item-card[_ngcontent-%COMP%] {\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  transition: all 0.15s;\n}\n.item-card[_ngcontent-%COMP%]:hover {\n  border-color: #d1d5db;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.item-card[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.item-view[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n.item-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  cursor: pointer;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0 0 4px 0;\n}\n.item-description[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  margin: 0;\n}\n.item-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  background: transparent;\n  color: #6b7280;\n  transition: all 0.15s;\n  font-size: 14px;\n}\n.icon-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  line-height: 1;\n}\n.icon-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #374151;\n}\n.icon-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.icon-btn--danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.item-edit[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n.item-edit[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-of-type {\n  margin-bottom: 0;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #9ca3af;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n}\n/*# sourceMappingURL=categories-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoriesDialogComponent, [{
    type: Component,
    args: [{ selector: "app-categories-dialog", standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule], template: `<div class="dialog">\r
  <div class="dialog__header">\r
    <h2>Gestionar Categor\xEDas</h2>\r
    <button (click)="close()" class="close">\r
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>\r
      </svg>\r
    </button>\r
  </div>\r
\r
  <div class="tabs">\r
    <button \r
      class="tab"\r
      [class.active]="activeTab() === 'categories'"\r
      (click)="activeTab.set('categories')">\r
      Categor\xEDas\r
    </button>\r
    <button \r
      class="tab"\r
      [class.active]="activeTab() === 'subcategories'"\r
      (click)="activeTab.set('subcategories')"\r
      [disabled]="!selectedCategoryId()">\r
      Subcategor\xEDas\r
    </button>\r
  </div>\r
\r
  <div class="dialog__body">\r
    <!-- Categories Tab -->\r
    <div class="tab-content" [class.active]="activeTab() === 'categories'">\r
      <!-- Create Button -->\r
      <div *ngIf="!isCreating()" class="header-actions">\r
        <button (click)="startCreating()" class="create-btn">\r
          + Crear Nueva\r
        </button>\r
      </div>\r
\r
      <!-- Create Form -->\r
      <form *ngIf="isCreating()" [formGroup]="form" class="create-form">\r
        <div>\r
          <label class="form-label">Nombre</label>\r
          <input type="text" formControlName="name" class="form-input" placeholder="Nombre de la categor\xEDa" />\r
        </div>\r
        <div>\r
          <label class="form-label">Descripci\xF3n</label>\r
          <textarea formControlName="description" class="form-input" rows="2" placeholder="Descripci\xF3n opcional"></textarea>\r
        </div>\r
        <div class="form-actions">\r
          <button (click)="cancelCreating()" type="button" class="btn btn--secondary">\r
            Cancelar\r
          </button>\r
          <button (click)="saveCategory()" [disabled]="form.invalid || saving()" class="btn btn--primary">\r
            {{ saving() ? 'Guardando...' : 'Guardar' }}\r
          </button>\r
        </div>\r
      </form>\r
\r
      <!-- Categories List -->\r
      <div *ngIf="!isCreating()" class="items-list">\r
        <div *ngIf="categories().length === 0" class="empty-state">\r
          <p>No hay categor\xEDas</p>\r
        </div>\r
\r
        <div *ngFor="let cat of categories()" class="item-card">\r
          <div *ngIf="editingCategoryId() !== cat.id" class="item-view">\r
            <div class="item-info" (click)="selectCategory(cat.id)">\r
              <p class="item-name">{{ cat.name }}</p>\r
              <p class="item-description">{{ cat.description }}</p>\r
            </div>\r
            <div class="item-actions">\r
              <button (click)="startEditingCategory(cat)" class="icon-btn" title="Editar">\r
                <i class="fi fi-rr-pencil"></i>\r
              </button>\r
              <button (click)="deleteCategory(cat)" [disabled]="saving()" class="icon-btn icon-btn--danger" title="Eliminar">\r
                <i class="fi fi-rr-trash"></i>\r
              </button>\r
            </div>\r
          </div>\r
\r
          <!-- Edit Mode -->\r
          <div *ngIf="editingCategoryId() === cat.id" class="item-edit">\r
            <div>\r
              <label class="form-label">Nombre</label>\r
              <input type="text" [(ngModel)]="editingCategoryForm[cat.id].name" class="form-input form-input--sm" />\r
            </div>\r
            <div>\r
              <label class="form-label">Descripci\xF3n</label>\r
              <textarea [(ngModel)]="editingCategoryForm[cat.id].description" class="form-input form-input--sm" rows="2"></textarea>\r
            </div>\r
            <div class="form-actions">\r
              <button (click)="cancelEditingCategory()" type="button" class="btn btn--sm btn--secondary">\r
                Cancelar\r
              </button>\r
              <button (click)="saveEditCategory(cat)" [disabled]="saving()" class="btn btn--sm btn--primary">\r
                {{ saving() ? 'Guardando...' : 'Guardar' }}\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Subcategories Tab -->\r
    <div class="tab-content" [class.active]="activeTab() === 'subcategories'">\r
      <!-- Create Button -->\r
      <div *ngIf="!isCreatingSubcategory()" class="header-actions">\r
        <button (click)="startCreatingSubcategory()" class="create-btn">\r
          + Crear Nueva\r
        </button>\r
      </div>\r
\r
      <!-- Create Form -->\r
      <form *ngIf="isCreatingSubcategory()" [formGroup]="form" class="create-form">\r
        <div>\r
          <label class="form-label">Nombre</label>\r
          <input type="text" formControlName="name" class="form-input" placeholder="Nombre de la subcategor\xEDa" />\r
        </div>\r
        <div>\r
          <label class="form-label">Descripci\xF3n</label>\r
          <textarea formControlName="description" class="form-input" rows="2" placeholder="Descripci\xF3n opcional"></textarea>\r
        </div>\r
        <div class="form-actions">\r
          <button (click)="cancelCreatingSubcategory()" type="button" class="btn btn--secondary">\r
            Cancelar\r
          </button>\r
          <button (click)="saveSubcategory()" [disabled]="form.invalid || saving()" class="btn btn--primary">\r
            {{ saving() ? 'Guardando...' : 'Guardar' }}\r
          </button>\r
        </div>\r
      </form>\r
\r
      <!-- Subcategories List -->\r
      <div *ngIf="!isCreatingSubcategory()" class="items-list">\r
        <div *ngIf="subcategories().length === 0" class="empty-state">\r
          <p>No hay subcategor\xEDas</p>\r
        </div>\r
\r
        <div *ngFor="let subcat of subcategories()" class="item-card">\r
          <div *ngIf="editingSubcategoryId() !== subcat.id" class="item-view">\r
            <div class="item-info">\r
              <p class="item-name">{{ subcat.name }}</p>\r
              <p class="item-description">{{ subcat.description }}</p>\r
            </div>\r
            <div class="item-actions">\r
              <button (click)="startEditingSubcategory(subcat)" class="icon-btn" title="Editar">\r
                <i class="fi fi-rr-pencil"></i>\r
              </button>\r
              <button (click)="deleteSubcategory(subcat)" [disabled]="saving()" class="icon-btn icon-btn--danger" title="Eliminar">\r
                <i class="fi fi-rr-trash"></i>\r
              </button>\r
            </div>\r
          </div>\r
\r
          <!-- Edit Mode -->\r
          <div *ngIf="editingSubcategoryId() === subcat.id" class="item-edit">\r
            <div>\r
              <label class="form-label">Nombre</label>\r
              <input type="text" [(ngModel)]="editingSubcategoryForm[subcat.id].name" class="form-input form-input--sm" />\r
            </div>\r
            <div>\r
              <label class="form-label">Descripci\xF3n</label>\r
              <textarea [(ngModel)]="editingSubcategoryForm[subcat.id].description" class="form-input form-input--sm" rows="2"></textarea>\r
            </div>\r
            <div class="form-actions">\r
              <button (click)="cancelEditingSubcategory()" type="button" class="btn btn--sm btn--secondary">\r
                Cancelar\r
              </button>\r
              <button (click)="saveEditSubcategory(subcat)" [disabled]="saving()" class="btn btn--sm btn--primary">\r
                {{ saving() ? 'Guardando...' : 'Guardar' }}\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="dialog__footer">\r
    <button (click)="close()" class="btn btn--secondary">\r
      Cerrar\r
    </button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/categories-dialog/categories-dialog.component.scss */\n.dialog {\n  width: 600px;\n  height: 600px;\n  display: flex;\n  flex-direction: column;\n}\n.dialog__header {\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-shrink: 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog__header h2 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.dialog__header .close {\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n  background: none;\n  border: none;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n}\n.dialog__header .close:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.dialog__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px 20px;\n  min-height: 0;\n}\n.dialog__footer {\n  padding: 12px 20px;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.tabs {\n  display: flex;\n  border-bottom: 2px solid #e5e7eb;\n  padding: 0 20px;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.tab {\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #6b7280;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab:hover:not(:disabled) {\n  color: #374151;\n}\n.tab.active {\n  color: #7c3aed;\n  border-bottom-color: #7c3aed;\n}\n.tab:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.tab-content {\n  display: none;\n}\n.tab-content.active {\n  display: block;\n}\n.header-actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 16px;\n}\n.create-btn {\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.create-btn:hover {\n  background: #4338ca;\n}\n.create-form {\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #f9fafb;\n  margin-bottom: 16px;\n}\n.create-form > div {\n  margin-bottom: 12px;\n}\n.create-form > div:last-of-type {\n  margin-bottom: 0;\n}\n.form-label {\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 6px;\n}\n.form-input {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  outline: none;\n  transition: border-color 0.2s;\n  font-family: inherit;\n}\n.form-input:focus {\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-input--sm {\n  padding: 6px 10px;\n  font-size: 12px;\n}\ntextarea.form-input {\n  resize: vertical;\n  min-height: 60px;\n}\n.form-actions {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n  font-family: inherit;\n  flex: 1;\n}\n.btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--primary {\n  background: #4f46e5;\n  color: white;\n}\n.btn--primary:hover:not(:disabled) {\n  background: #4338ca;\n}\n.btn--secondary {\n  background: #f3f4f6;\n  color: #374151;\n}\n.btn--secondary:hover:not(:disabled) {\n  background: #e5e7eb;\n}\n.btn--sm {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.item-card {\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  transition: all 0.15s;\n}\n.item-card:hover {\n  border-color: #d1d5db;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.item-card:last-child {\n  margin-bottom: 0;\n}\n.item-view {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n.item-info {\n  flex: 1;\n  min-width: 0;\n  cursor: pointer;\n}\n.item-name {\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0 0 4px 0;\n}\n.item-description {\n  font-size: 12px;\n  color: #6b7280;\n  margin: 0;\n}\n.item-actions {\n  display: flex;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.icon-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  background: transparent;\n  color: #6b7280;\n  transition: all 0.15s;\n  font-size: 14px;\n}\n.icon-btn i {\n  line-height: 1;\n}\n.icon-btn:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #374151;\n}\n.icon-btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.icon-btn--danger:hover:not(:disabled) {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.item-edit > div {\n  margin-bottom: 10px;\n}\n.item-edit > div:last-of-type {\n  margin-bottom: 0;\n}\n.empty-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #9ca3af;\n}\n.empty-state p {\n  font-size: 14px;\n  margin: 0;\n}\n/*# sourceMappingURL=categories-dialog.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ProductService }, { type: MatSnackBar }, { type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoriesDialogComponent, { className: "CategoriesDialogComponent", filePath: "src/app/features/settings/components/categories-dialog/categories-dialog.component.ts", lineNumber: 16 });
})();

// src/app/features/settings/components/product-detail-modal/product-detail-modal.component.ts
function ProductDetailModalComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "div", 13);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando producto...");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_3_option_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", cat_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r4.name);
  }
}
function ProductDetailModalComponent_div_8_div_3_option_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sub_r5 = ctx.$implicit;
    \u0275\u0275property("ngValue", sub_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sub_r5.name);
  }
}
function ProductDetailModalComponent_div_8_div_3_div_45_div_1_div_11_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 53)(1, "span", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 55);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_3_div_45_div_1_div_11_span_1_Template_button_click_3_listener() {
      const value_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const attr_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openAttributeValueModal(attr_r7.id, value_r9));
    });
    \u0275\u0275element(4, "i", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 56);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_3_div_45_div_1_div_11_span_1_Template_button_click_5_listener() {
      const value_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const attr_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deleteAttributeValue(attr_r7.id, value_r9));
    });
    \u0275\u0275element(6, "i", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const value_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(value_r9.value);
  }
}
function ProductDetailModalComponent_div_8_div_3_div_45_div_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275template(1, ProductDetailModalComponent_div_8_div_3_div_45_div_1_div_11_span_1_Template, 7, 1, "span", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const attr_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", attr_r7.values);
  }
}
function ProductDetailModalComponent_div_8_div_3_div_45_div_1_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275text(1, "Sin valores");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_3_div_45_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41)(2, "span", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 43)(5, "button", 44);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_3_div_45_div_1_Template_button_click_5_listener() {
      const attr_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openAttributeValueModal(attr_r7.id));
    });
    \u0275\u0275element(6, "i", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 46);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_3_div_45_div_1_Template_button_click_7_listener() {
      const attr_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openAttributeModal(attr_r7));
    });
    \u0275\u0275element(8, "i", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 48);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_3_div_45_div_1_Template_button_click_9_listener() {
      const attr_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deleteAttribute(attr_r7));
    });
    \u0275\u0275element(10, "i", 49);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(11, ProductDetailModalComponent_div_8_div_3_div_45_div_1_div_11_Template, 2, 1, "div", 50)(12, ProductDetailModalComponent_div_8_div_3_div_45_div_1_ng_template_12_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const attr_r7 = ctx.$implicit;
    const emptyValues_r10 = \u0275\u0275reference(13);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(attr_r7.name);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", attr_r7.values == null ? null : attr_r7.values.length)("ngIfElse", emptyValues_r10);
  }
}
function ProductDetailModalComponent_div_8_div_3_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275template(1, ProductDetailModalComponent_div_8_div_3_div_45_div_1_Template, 14, 3, "div", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.productAttributes);
  }
}
function ProductDetailModalComponent_div_8_div_3_ng_template_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275text(1, "No hay atributos configurados");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_3_span_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Guardar cambios");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_3_span_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Guardando...");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "div", 20)(3, "label", 21);
    \u0275\u0275text(4, "NOMBRE *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.name, $event) || (ctx_r1.product.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 23)(7, "label", 21);
    \u0275\u0275text(8, "SKU *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.sku, $event) || (ctx_r1.product.sku = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 23)(11, "label", 21);
    \u0275\u0275text(12, "SKU EXTERNO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.external_sku, $event) || (ctx_r1.product.external_sku = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 23)(15, "label", 21);
    \u0275\u0275text(16, "C\xD3DIGO SAT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.sat_code, $event) || (ctx_r1.product.sat_code = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 20)(19, "label", 21);
    \u0275\u0275text(20, "DESCRIPCI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "textarea", 27);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_textarea_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.description, $event) || (ctx_r1.product.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 23)(23, "div", 28)(24, "label", 21);
    \u0275\u0275text(25, "CATEGOR\xCDA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 29);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_3_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCategoriesDialog());
    });
    \u0275\u0275text(27, " Editar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "select", 30);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_select_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.category_id, $event) || (ctx_r1.product.category_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_select_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onCategoryChange($event));
    });
    \u0275\u0275elementStart(29, "option", 31);
    \u0275\u0275text(30, "Selecciona una categor\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, ProductDetailModalComponent_div_8_div_3_option_31_Template, 2, 2, "option", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 23)(33, "label", 21);
    \u0275\u0275text(34, "SUBCATEGOR\xCDA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "select", 33);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_select_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.subcategory_id, $event) || (ctx_r1.product.subcategory_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(36, "option", 31);
    \u0275\u0275text(37, "Selecciona una subcategor\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275template(38, ProductDetailModalComponent_div_8_div_3_option_38_Template, 2, 2, "option", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 20)(40, "div", 28)(41, "label", 21);
    \u0275\u0275text(42, "ATRIBUTOS PERSONALIZADOS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 29);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_3_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAttributeModal());
    });
    \u0275\u0275text(44, " + Agregar atributo ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(45, ProductDetailModalComponent_div_8_div_3_div_45_Template, 2, 1, "div", 34)(46, ProductDetailModalComponent_div_8_div_3_ng_template_46_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 35)(49, "button", 36);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_3_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275template(50, ProductDetailModalComponent_div_8_div_3_span_50_Template, 2, 0, "span", 37)(51, ProductDetailModalComponent_div_8_div_3_span_51_Template, 2, 0, "span", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const emptyAttributes_r11 = \u0275\u0275reference(47);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.sku);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.external_sku);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.sat_code);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.description);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.category_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.categories);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.subcategory_id);
    \u0275\u0275property("disabled", !ctx_r1.product.category_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.subcategories);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.productAttributes.length > 0)("ngIfElse", emptyAttributes_r11);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.saving);
  }
}
function ProductDetailModalComponent_div_8_div_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "p");
    \u0275\u0275text(2, "No hay UOMs configuradas");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const catalog_r15 = ctx.$implicit;
    \u0275\u0275property("value", catalog_r15.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(catalog_r15.name);
  }
}
function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const parentUom_r17 = ctx.$implicit;
    \u0275\u0275property("value", parentUom_r17.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((parentUom_r17.uom == null ? null : parentUom_r17.uom.name) || parentUom_r17.name || "Sin nombre");
  }
}
function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "select", 67);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_select_ngModelChange_2_listener($event) {
      const uom_r14 = \u0275\u0275restoreView(_r13).$implicit;
      \u0275\u0275twoWayBindingSet(uom_r14.uom_catalog_id, $event) || (uom_r14.uom_catalog_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_select_ngModelChange_2_listener($event) {
      const uom_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onUomCatalogChange(uom_r14, $event));
    });
    \u0275\u0275elementStart(3, "option", 68);
    \u0275\u0275text(4, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ProductDetailModalComponent_div_8_div_4_table_5_tr_13_option_5_Template, 2, 2, "option", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_input_ngModelChange_7_listener($event) {
      const uom_r14 = \u0275\u0275restoreView(_r13).$implicit;
      \u0275\u0275twoWayBindingSet(uom_r14.factor, $event) || (uom_r14.factor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "div", 71)(10, "input", 72);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_input_ngModelChange_10_listener($event) {
      const uom_r14 = \u0275\u0275restoreView(_r13).$implicit;
      \u0275\u0275twoWayBindingSet(uom_r14.is_base, $event) || (uom_r14.is_base = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_input_change_10_listener() {
      const i_r16 = \u0275\u0275restoreView(_r13).index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onBaseChange(i_r16));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "label", 73);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "td")(14, "select", 74);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_select_ngModelChange_14_listener($event) {
      const uom_r14 = \u0275\u0275restoreView(_r13).$implicit;
      \u0275\u0275twoWayBindingSet(uom_r14.parent_uom_id, $event) || (uom_r14.parent_uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "option", 75);
    \u0275\u0275text(16, "\u2014 Ninguno \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, ProductDetailModalComponent_div_8_div_4_table_5_tr_13_option_17_Template, 2, 2, "option", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td")(19, "button", 76);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_button_click_19_listener() {
      const i_r16 = \u0275\u0275restoreView(_r13).index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.removeUom(i_r16));
    });
    \u0275\u0275element(20, "i", 49);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const uom_r14 = ctx.$implicit;
    const i_r16 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", uom_r14.uom_catalog_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.uomCatalog);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", uom_r14.factor);
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "is-base-" + i_r16);
    \u0275\u0275twoWayProperty("ngModel", uom_r14.is_base);
    \u0275\u0275advance();
    \u0275\u0275property("for", "is-base-" + i_r16);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(uom_r14.is_base ? "S\xED" : "No");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", uom_r14.parent_uom_id);
    \u0275\u0275property("disabled", uom_r14.is_base);
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.getAvailableParentUoms(i_r16));
  }
}
function ProductDetailModalComponent_div_8_div_4_table_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 65)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "UNIDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "FACTOR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "BASE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "UOM PADRE");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template, 21, 11, "tr", 66);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.product.uoms)("ngForTrackBy", ctx_r1.trackByUomRow);
  }
}
function ProductDetailModalComponent_div_8_div_4_div_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Guardar UOMs");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_4_div_6_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Guardando...");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_4_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "button", 36);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_4_div_6_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.saveUoms());
    });
    \u0275\u0275template(2, ProductDetailModalComponent_div_8_div_4_div_6_span_2_Template, 2, 0, "span", 37)(3, ProductDetailModalComponent_div_8_div_4_div_6_span_3_Template, 2, 0, "span", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.saving);
  }
}
function ProductDetailModalComponent_div_8_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 59)(2, "button", 60);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_4_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.addUom());
    });
    \u0275\u0275text(3, "+ Agregar UOM");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, ProductDetailModalComponent_div_8_div_4_div_4_Template, 3, 0, "div", 61)(5, ProductDetailModalComponent_div_8_div_4_table_5_Template, 14, 2, "table", 62)(6, ProductDetailModalComponent_div_8_div_4_div_6_Template, 4, 3, "div", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r1.product.uoms || ctx_r1.product.uoms.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.uoms && ctx_r1.product.uoms.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.uoms && ctx_r1.product.uoms.length > 0);
  }
}
function ProductDetailModalComponent_div_8_div_5_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "p");
    \u0275\u0275text(2, "No hay precios configurados");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_5_table_5_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 80);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275pipe(14, "number");
    \u0275\u0275pipe(15, "number");
    \u0275\u0275pipe(16, "number");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td")(20, "div", 81)(21, "button", 82);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_5_table_5_tr_18_Template_button_click_21_listener() {
      const price_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openPriceModal(price_r21));
    });
    \u0275\u0275element(22, "i", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 76);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_5_table_5_tr_18_Template_button_click_23_listener() {
      const price_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deletePrice(price_r21.id));
    });
    \u0275\u0275element(24, "i", 49);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const price_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((price_r21.product_uom == null ? null : price_r21.product_uom.uom == null ? null : price_r21.product_uom.uom.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((price_r21.price_list == null ? null : price_r21.price_list.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("$", \u0275\u0275pipeBind2(7, 7, price_r21.price, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", price_r21.iva_percentage || 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", price_r21.ieps_percentage || 0, "%");
    \u0275\u0275advance();
    \u0275\u0275property("title", "Precio: $" + \u0275\u0275pipeBind2(13, 10, price_r21.price, "1.2-2") + "\nIVA: $" + \u0275\u0275pipeBind2(14, 13, price_r21.iva_unit_total || 0, "1.2-2") + "\nIEPS: $" + \u0275\u0275pipeBind2(15, 16, price_r21.ieps_unit_total || 0, "1.2-2") + "\nTotal: $" + \u0275\u0275pipeBind2(16, 19, ctx_r1.Number(price_r21.price) + ctx_r1.Number(price_r21.iva_unit_total || 0) + ctx_r1.Number(price_r21.ieps_unit_total || 0), "1.2-2"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" $", \u0275\u0275pipeBind2(18, 22, ctx_r1.Number(price_r21.price) + ctx_r1.Number(price_r21.iva_unit_total || 0) + ctx_r1.Number(price_r21.ieps_unit_total || 0), "1.2-2"), " ");
  }
}
function ProductDetailModalComponent_div_8_div_5_table_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 78)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "LISTA DE PRECIOS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "PRECIO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "TOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "ACCIONES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, ProductDetailModalComponent_div_8_div_5_table_5_tr_18_Template, 25, 25, "tr", 79);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r1.product.prices);
  }
}
function ProductDetailModalComponent_div_8_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 59)(2, "button", 60);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPriceModal());
    });
    \u0275\u0275text(3, "+ Agregar Precio");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, ProductDetailModalComponent_div_8_div_5_div_4_Template, 3, 0, "div", 61)(5, ProductDetailModalComponent_div_8_div_5_table_5_Template, 19, 1, "table", 77);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r1.product.prices || ctx_r1.product.prices.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.prices && ctx_r1.product.prices.length > 0);
  }
}
function ProductDetailModalComponent_div_8_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "button", 60);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_6_div_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openDiscountModal());
    });
    \u0275\u0275text(2, "+ Agregar descuento");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_6_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85)(1, "div", 86)(2, "p", 87);
    \u0275\u0275text(3, "Sin descuentos configurados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 88);
    \u0275\u0275text(5, "Los descuentos activos aparecer\xE1n disponibles en POS al vender este producto.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 89);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_6_div_2_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openDiscountModal());
    });
    \u0275\u0275text(7, "+ Agregar descuento");
    \u0275\u0275elementEnd()()();
  }
}
function ProductDetailModalComponent_div_8_div_6_table_3_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "span", 90);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td")(15, "div", 81)(16, "button", 82);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_6_table_3_tr_18_Template_button_click_16_listener() {
      const discount_r25 = \u0275\u0275restoreView(_r24).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openDiscountModal(discount_r25));
    });
    \u0275\u0275element(17, "i", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 76);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_6_table_3_tr_18_Template_button_click_18_listener() {
      const discount_r25 = \u0275\u0275restoreView(_r24).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deleteDiscount(discount_r25));
    });
    \u0275\u0275element(19, "i", 49);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const discount_r25 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(discount_r25.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getDiscountTypeLabel(discount_r25.discount_type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDiscountValue(discount_r25));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getDiscountUomLabel(discount_r25));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDiscountValidity(discount_r25));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("discount-badge--active", discount_r25.is_active)("discount-badge--inactive", !discount_r25.is_active);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", discount_r25.is_active ? "Activo" : "Inactivo", " ");
  }
}
function ProductDetailModalComponent_div_8_div_6_table_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 78)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "NOMBRE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "TIPO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "VALOR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "VIGENCIA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "ESTADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "ACCIONES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, ProductDetailModalComponent_div_8_div_6_table_3_tr_18_Template, 20, 10, "tr", 79);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r1.product.discounts);
  }
}
function ProductDetailModalComponent_div_8_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275template(1, ProductDetailModalComponent_div_8_div_6_div_1_Template, 3, 0, "div", 83)(2, ProductDetailModalComponent_div_8_div_6_div_2_Template, 8, 0, "div", 84)(3, ProductDetailModalComponent_div_8_div_6_table_3_Template, 19, 1, "table", 77);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.discounts && ctx_r1.product.discounts.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.product.discounts || ctx_r1.product.discounts.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.discounts && ctx_r1.product.discounts.length > 0);
  }
}
function ProductDetailModalComponent_div_8_div_7_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "p");
    \u0275\u0275text(2, "No hay costos de proveedor configurados");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_7_table_5_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 80);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275pipe(14, "number");
    \u0275\u0275pipe(15, "number");
    \u0275\u0275pipe(16, "number");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td")(20, "div", 81)(21, "button", 82);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_7_table_5_tr_18_Template_button_click_21_listener() {
      const cost_r28 = \u0275\u0275restoreView(_r27).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openCostModal(cost_r28));
    });
    \u0275\u0275element(22, "i", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 76);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_7_table_5_tr_18_Template_button_click_23_listener() {
      const cost_r28 = \u0275\u0275restoreView(_r27).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deleteCost(cost_r28.id));
    });
    \u0275\u0275element(24, "i", 49);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const cost_r28 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((cost_r28.product_uom == null ? null : cost_r28.product_uom.uom == null ? null : cost_r28.product_uom.uom.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((cost_r28.vendor == null ? null : cost_r28.vendor.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("$", \u0275\u0275pipeBind2(7, 7, cost_r28.cost, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", cost_r28.iva_percentage || 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", cost_r28.ieps_percentage || 0, "%");
    \u0275\u0275advance();
    \u0275\u0275property("title", "Costo: $" + \u0275\u0275pipeBind2(13, 10, cost_r28.cost, "1.2-2") + "\nIVA: $" + \u0275\u0275pipeBind2(14, 13, cost_r28.iva_unit_total || 0, "1.2-2") + "\nIEPS: $" + \u0275\u0275pipeBind2(15, 16, cost_r28.ieps_unit_total || 0, "1.2-2") + "\nTotal: $" + \u0275\u0275pipeBind2(16, 19, ctx_r1.Number(cost_r28.cost) + ctx_r1.Number(cost_r28.iva_unit_total || 0) + ctx_r1.Number(cost_r28.ieps_unit_total || 0), "1.2-2"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" $", \u0275\u0275pipeBind2(18, 22, ctx_r1.Number(cost_r28.cost) + ctx_r1.Number(cost_r28.iva_unit_total || 0) + ctx_r1.Number(cost_r28.ieps_unit_total || 0), "1.2-2"), " ");
  }
}
function ProductDetailModalComponent_div_8_div_7_table_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 78)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "PROVEEDOR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "COSTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "TOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "ACCIONES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, ProductDetailModalComponent_div_8_div_7_table_5_tr_18_Template, 25, 25, "tr", 79);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r1.product.vendor_costs);
  }
}
function ProductDetailModalComponent_div_8_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 59)(2, "button", 60);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCostModal());
    });
    \u0275\u0275text(3, "+ Agregar Costo");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, ProductDetailModalComponent_div_8_div_7_div_4_Template, 3, 0, "div", 61)(5, ProductDetailModalComponent_div_8_div_7_table_5_Template, 19, 1, "table", 77);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r1.product.vendor_costs || ctx_r1.product.vendor_costs.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.vendor_costs && ctx_r1.product.vendor_costs.length > 0);
  }
}
function ProductDetailModalComponent_div_8_div_8_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "a", 96);
    \u0275\u0275element(2, "img", 97);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const photoUrl_r30 = ctx.ngIf;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("href", photoUrl_r30, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("src", photoUrl_r30, \u0275\u0275sanitizeUrl)("alt", "Foto de " + (ctx_r1.product.name || "producto"));
  }
}
function ProductDetailModalComponent_div_8_div_8_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 98)(1, "p");
    \u0275\u0275text(2, "Sin im\xE1genes");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_8_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Subiendo...");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_8_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.productPhotoUrl ? "Reemplazar foto" : "Subir foto");
  }
}
function ProductDetailModalComponent_div_8_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 91)(2, "div", 92);
    \u0275\u0275template(3, ProductDetailModalComponent_div_8_div_8_ng_container_3_Template, 3, 3, "ng-container", 93)(4, ProductDetailModalComponent_div_8_div_8_ng_template_4_Template, 3, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 94, 3);
    \u0275\u0275listener("change", function ProductDetailModalComponent_div_8_div_8_Template_input_change_6_listener($event) {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPhotoSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 95);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_8_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r29);
      const productPhotoInput_r31 = \u0275\u0275reference(7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPhotoPicker(productPhotoInput_r31));
    });
    \u0275\u0275template(9, ProductDetailModalComponent_div_8_div_8_span_9_Template, 2, 0, "span", 37)(10, ProductDetailModalComponent_div_8_div_8_span_10_Template, 2, 1, "span", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const emptyPhoto_r32 = \u0275\u0275reference(5);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.productPhotoUrl)("ngIfElse", emptyPhoto_r32);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.uploadingPhoto || !ctx_r1.product.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.uploadingPhoto);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.uploadingPhoto);
  }
}
function ProductDetailModalComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "app-tab", 15);
    \u0275\u0275listener("tabChange", function ProductDetailModalComponent_div_8_Template_app_tab_tabChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTabChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 16);
    \u0275\u0275template(3, ProductDetailModalComponent_div_8_div_3_Template, 52, 17, "div", 17)(4, ProductDetailModalComponent_div_8_div_4_Template, 7, 3, "div", 17)(5, ProductDetailModalComponent_div_8_div_5_Template, 6, 2, "div", 17)(6, ProductDetailModalComponent_div_8_div_6_Template, 4, 3, "div", 17)(7, ProductDetailModalComponent_div_8_div_7_Template, 6, 2, "div", 17)(8, ProductDetailModalComponent_div_8_div_8_Template, 11, 5, "div", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("tabs", ctx_r1.tabs)("activeTabId", ctx_r1.activeTab);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "detalles");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "uoms");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "precios");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "descuentos");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "costos");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "fotos");
  }
}
function ProductDetailModalComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissAttributeModal());
    });
    \u0275\u0275elementStart(1, "div", 100);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r33);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 5)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissAttributeModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 7);
    \u0275\u0275element(7, "path", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 101)(9, "div", 19)(10, "div", 20)(11, "label", 21);
    \u0275\u0275text(12, "NOMBRE *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 102);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_9_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.attributeForm.name, $event) || (ctx_r1.attributeForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 35)(15, "button", 103);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissAttributeModal());
    });
    \u0275\u0275text(16, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 89);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveAttribute());
    });
    \u0275\u0275text(18, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.attributeForm.id ? "Editar Atributo" : "Nuevo Atributo");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.attributeForm.name);
  }
}
function ProductDetailModalComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_10_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissAttributeValueModal());
    });
    \u0275\u0275elementStart(1, "div", 100);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_10_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r34);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 5)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_10_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissAttributeValueModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 7);
    \u0275\u0275element(7, "path", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 101)(9, "div", 19)(10, "div", 20)(11, "label", 21);
    \u0275\u0275text(12, "VALOR *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 104);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_10_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.attributeValueForm.value, $event) || (ctx_r1.attributeValueForm.value = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 35)(15, "button", 103);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_10_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissAttributeValueModal());
    });
    \u0275\u0275text(16, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 89);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_10_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveAttributeValue());
    });
    \u0275\u0275text(18, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.attributeValueForm.id ? "Editar Valor" : "Nuevo Valor");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.attributeValueForm.value);
  }
}
function ProductDetailModalComponent_div_11_span_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 119);
    \u0275\u0275text(1, "$");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_11_span_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 120);
    \u0275\u0275text(1, "%");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_11_p_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 121);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275pipe(3, "number");
    \u0275\u0275pipe(4, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const preview_r36 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" Precio base: $", \u0275\u0275pipeBind2(2, 3, preview_r36.basePrice, "1.2-2"), " \u2192 Con descuento: $", \u0275\u0275pipeBind2(3, 6, preview_r36.discountedPrice, "1.2-2"), " (ahorro $", \u0275\u0275pipeBind2(4, 9, preview_r36.savings, "1.2-2"), ") ");
  }
}
function ProductDetailModalComponent_div_11_option_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r37 = ctx.$implicit;
    \u0275\u0275property("ngValue", uom_r37.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (uom_r37.uom == null ? null : uom_r37.uom.name) || uom_r37.name || "Sin nombre", " ");
  }
}
function ProductDetailModalComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_11_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.discountModalVisible = false);
    });
    \u0275\u0275elementStart(1, "div", 105);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_11_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r35);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 5)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.discountModalVisible = false);
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 7);
    \u0275\u0275element(7, "path", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 101)(9, "div", 19)(10, "div", 20)(11, "label", 21);
    \u0275\u0275text(12, "NOMBRE *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 106);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.discountForm.name, $event) || (ctx_r1.discountForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 20)(15, "label", 21);
    \u0275\u0275text(16, "TIPO DE DESCUENTO *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 107)(18, "label", 108)(19, "input", 109);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.discountForm.discount_type, $event) || (ctx_r1.discountForm.discount_type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "Porcentaje");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "label", 108)(23, "input", 110);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.discountForm.discount_type, $event) || (ctx_r1.discountForm.discount_type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "Monto fijo (MXN)");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "div", 20)(27, "label", 21);
    \u0275\u0275text(28, "VALOR *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 111);
    \u0275\u0275template(30, ProductDetailModalComponent_div_11_span_30_Template, 2, 0, "span", 112);
    \u0275\u0275elementStart(31, "input", 113);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.discountForm.value, $event) || (ctx_r1.discountForm.value = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(32, ProductDetailModalComponent_div_11_span_32_Template, 2, 0, "span", 114);
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, ProductDetailModalComponent_div_11_p_33_Template, 5, 12, "p", 115);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 20)(35, "label", 21);
    \u0275\u0275text(36, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 30);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.discountForm.product_uom_id, $event) || (ctx_r1.discountForm.product_uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(38, "option", 31);
    \u0275\u0275text(39, "Todas las UOMs");
    \u0275\u0275elementEnd();
    \u0275\u0275template(40, ProductDetailModalComponent_div_11_option_40_Template, 2, 2, "option", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 23)(42, "label", 21);
    \u0275\u0275text(43, "VIGENCIA DESDE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 116);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.discountForm.valid_from, $event) || (ctx_r1.discountForm.valid_from = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 23)(46, "label", 21);
    \u0275\u0275text(47, "VIGENCIA HASTA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "input", 116);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_input_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.discountForm.valid_to, $event) || (ctx_r1.discountForm.valid_to = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 20)(50, "div", 71)(51, "input", 117);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_input_ngModelChange_51_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.discountForm.is_active, $event) || (ctx_r1.discountForm.is_active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "label", 118);
    \u0275\u0275text(53, "Activo (disponible en ventas)");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(54, "div", 35)(55, "button", 103);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_11_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.discountModalVisible = false);
    });
    \u0275\u0275text(56, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "button", 89);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_11_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveDiscount());
    });
    \u0275\u0275text(58, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.discountForm.id ? "Editar descuento" : "Agregar descuento");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.discountForm.name);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.discountForm.discount_type);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.discountForm.discount_type);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.discountForm.discount_type === "fixed");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.discountForm.value);
    \u0275\u0275property("placeholder", ctx_r1.discountForm.discount_type === "percentage" ? "10" : "50.00")("step", ctx_r1.discountForm.discount_type === "percentage" ? "0.01" : "0.01")("min", ctx_r1.discountForm.discount_type === "percentage" ? "0.01" : "0.01")("max", ctx_r1.discountForm.discount_type === "percentage" ? "100" : null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.discountForm.discount_type === "percentage");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getDiscountPreview());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.discountForm.product_uom_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.product == null ? null : ctx_r1.product.uoms);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.discountForm.valid_from);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.discountForm.valid_to);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.discountForm.is_active);
  }
}
function ProductDetailModalComponent_div_12_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const list_r39 = ctx.$implicit;
    \u0275\u0275property("value", list_r39.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(list_r39.name);
  }
}
function ProductDetailModalComponent_div_12_option_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r40 = ctx.$implicit;
    \u0275\u0275property("value", uom_r40.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (uom_r40.uom == null ? null : uom_r40.uom.name) || uom_r40.name || "Sin nombre", " ");
  }
}
function ProductDetailModalComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_12_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceModalVisible = false);
    });
    \u0275\u0275elementStart(1, "div", 105);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_12_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r38);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 5)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceModalVisible = false);
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 7);
    \u0275\u0275element(7, "path", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 101)(9, "div", 19)(10, "div", 20)(11, "label", 21);
    \u0275\u0275text(12, "LISTA DE PRECIOS *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 122)(14, "select", 30);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_12_Template_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceForm.price_list_id, $event) || (ctx_r1.priceForm.price_list_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "option", 68);
    \u0275\u0275text(16, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, ProductDetailModalComponent_div_12_option_17_Template, 2, 2, "option", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 123);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_12_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPriceListModal());
    });
    \u0275\u0275element(19, "i", 45);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 20)(21, "label", 21);
    \u0275\u0275text(22, "UOM *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "select", 30);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_12_Template_select_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceForm.product_uom_id, $event) || (ctx_r1.priceForm.product_uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(24, "option", 68);
    \u0275\u0275text(25, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, ProductDetailModalComponent_div_12_option_26_Template, 2, 2, "option", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 23)(28, "label", 21);
    \u0275\u0275text(29, "PRECIO *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 124);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_12_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceForm.price, $event) || (ctx_r1.priceForm.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 23)(32, "label", 21);
    \u0275\u0275text(33, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 125);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_12_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceForm.iva_percentage, $event) || (ctx_r1.priceForm.iva_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 20)(36, "label", 21);
    \u0275\u0275text(37, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 125);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_12_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceForm.ieps_percentage, $event) || (ctx_r1.priceForm.ieps_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 35)(40, "button", 103);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_12_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceModalVisible = false);
    });
    \u0275\u0275text(41, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 89);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_12_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.savePrice());
    });
    \u0275\u0275text(43, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.priceForm.id ? "Editar Precio" : "Nuevo Precio");
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceForm.price_list_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.priceLists);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceForm.product_uom_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.product == null ? null : ctx_r1.product.uoms);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceForm.price);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceForm.iva_percentage);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceForm.ieps_percentage);
  }
}
function ProductDetailModalComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_13_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceListModalVisible = false);
    });
    \u0275\u0275elementStart(1, "div", 100);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_13_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r41);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 5)(3, "h2");
    \u0275\u0275text(4, "Nueva Lista de Precios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceListModalVisible = false);
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 7);
    \u0275\u0275element(7, "path", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 101)(9, "div", 19)(10, "div", 20)(11, "label", 21);
    \u0275\u0275text(12, "NOMBRE *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 126);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_13_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceListForm.name, $event) || (ctx_r1.priceListForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 20)(15, "label", 21);
    \u0275\u0275text(16, "DESCRIPCI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 127);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_13_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceListForm.description, $event) || (ctx_r1.priceListForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 35)(19, "button", 103);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_13_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceListModalVisible = false);
    });
    \u0275\u0275text(20, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 89);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_13_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.savePriceList());
    });
    \u0275\u0275text(22, "Crear");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceListForm.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceListForm.description);
  }
}
function ProductDetailModalComponent_div_14_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vendor_r43 = ctx.$implicit;
    \u0275\u0275property("value", vendor_r43.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(vendor_r43.name);
  }
}
function ProductDetailModalComponent_div_14_option_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r44 = ctx.$implicit;
    \u0275\u0275property("value", uom_r44.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(uom_r44.uom == null ? null : uom_r44.uom.name);
  }
}
function ProductDetailModalComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_14_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.costModalVisible = false);
    });
    \u0275\u0275elementStart(1, "div", 105);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_14_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r42);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 5)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_14_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.costModalVisible = false);
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 7);
    \u0275\u0275element(7, "path", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 14)(9, "div", 19)(10, "div", 20)(11, "label", 21);
    \u0275\u0275text(12, "PROVEEDOR *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 30);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_14_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.costForm.vendor_id, $event) || (ctx_r1.costForm.vendor_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "option", 68);
    \u0275\u0275text(15, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ProductDetailModalComponent_div_14_option_16_Template, 2, 2, "option", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 20)(18, "label", 21);
    \u0275\u0275text(19, "UOM *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "select", 30);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_14_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.costForm.product_uom_id, $event) || (ctx_r1.costForm.product_uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(21, "option", 68);
    \u0275\u0275text(22, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, ProductDetailModalComponent_div_14_option_23_Template, 2, 2, "option", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 20)(25, "label", 21);
    \u0275\u0275text(26, "COSTO *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 124);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_14_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.costForm.cost, $event) || (ctx_r1.costForm.cost = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 23)(29, "label", 21);
    \u0275\u0275text(30, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 128);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_14_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.costForm.iva_percentage, $event) || (ctx_r1.costForm.iva_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 23)(33, "label", 21);
    \u0275\u0275text(34, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "input", 128);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_14_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.costForm.ieps_percentage, $event) || (ctx_r1.costForm.ieps_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 35)(37, "button", 103);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_14_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.costModalVisible = false);
    });
    \u0275\u0275text(38, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 89);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_14_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCost());
    });
    \u0275\u0275text(40, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.costForm.id ? "Editar Costo" : "Nuevo Costo");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.costForm.vendor_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.vendors);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.costForm.product_uom_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.product == null ? null : ctx_r1.product.uoms);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.costForm.cost);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.costForm.iva_percentage);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.costForm.ieps_percentage);
  }
}
var ProductDetailModalComponent = class _ProductDetailModalComponent {
  productService;
  data;
  dialogRef;
  dialog;
  toast;
  cdr;
  ngZone;
  productUpdated = new EventEmitter();
  visible = true;
  loading = false;
  saving = false;
  uploadingPhoto = false;
  product = null;
  // Exponer Number para el template
  Number = Number;
  tabs = [
    { id: "detalles", title: "Detalles" },
    { id: "uoms", title: "UOMs" },
    { id: "precios", title: "Precios" },
    { id: "descuentos", title: "Descuentos" },
    { id: "costos", title: "Costos de Proveedor" },
    { id: "fotos", title: "Fotos" }
  ];
  activeTab = "detalles";
  onTabChange(tabId) {
    this.activeTab = tabId;
    if (tabId === "uoms") {
      if (this.product?.id) {
        this.loadUomCatalog(() => this.loadProductUoms());
      } else {
        this.loadUomCatalog();
      }
    }
    if (tabId === "descuentos" && this.product?.id) {
      this.loadProductDiscounts();
    }
  }
  get productPhotoUrl() {
    if (!this.product)
      return null;
    if (typeof this.product.photo === "string" && this.product.photo.trim().length > 0) {
      return this.product.photo;
    }
    const firstPhoto = this.product.photos?.[0];
    return firstPhoto?.signed_url || firstPhoto?.s3_key || null;
  }
  // Catálogos
  categories = [];
  subcategories = [];
  uomCatalog = [];
  vendors = [];
  priceLists = [];
  // Modales secundarios
  priceModalVisible = false;
  costModalVisible = false;
  discountModalVisible = false;
  priceListModalVisible = false;
  attributeModalVisible = false;
  attributeValueModalVisible = false;
  // Formularios de modales secundarios
  priceForm = this.getEmptyPriceForm();
  costForm = this.getEmptyCostForm();
  discountForm = this.getEmptyDiscountForm();
  priceListForm = { name: "", description: "" };
  attributeForm = this.getEmptyAttributeForm();
  attributeValueForm = this.getEmptyAttributeValueForm();
  productAttributes = [];
  constructor(productService, data, dialogRef, dialog, toast, cdr, ngZone) {
    this.productService = productService;
    this.data = data;
    this.dialogRef = dialogRef;
    this.dialog = dialog;
    this.toast = toast;
    this.cdr = cdr;
    this.ngZone = ngZone;
    console.log("ProductDetailModal constructor - data:", data);
    setTimeout(() => {
      if (this.loading) {
        console.error("Loading timeout - forcing loading to false");
        this.loading = false;
        this.showNotification("Error: El producto tard\xF3 demasiado en cargar. Por favor intenta de nuevo.", "error");
      }
    }, 1e4);
  }
  showNotification(message, type = "success") {
    const toastType = type === "info" ? "info" : type;
    this.toast.show(message, toastType);
  }
  ngOnInit() {
    console.log("ProductDetailModal ngOnInit - data:", this.data);
    if (this.data?.product) {
      console.log("Loading full product details for:", this.data.product.id);
      this.loadProduct(this.data.product.id);
    } else {
      console.log("Creating new product");
      this.product = {
        id: "",
        sku: "",
        external_sku: "",
        name: "",
        description: "",
        sat_code: "",
        category_id: "",
        subcategory_id: "",
        base_uom_id: "",
        category: null,
        subcategory: null,
        base_uom: null,
        uoms: [],
        prices: [],
        discounts: [],
        vendor_prices: [],
        photos: [],
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.loading = false;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.loadCatalogs();
        this.loadUomCatalog();
      }, 100);
    }
  }
  loadProduct(productId) {
    this.loading = true;
    this.cdr.detectChanges();
    console.log("Starting to load product:", productId);
    this.productService.getProduct(productId).subscribe({
      next: (product) => {
        console.log("Full product loaded:", product);
        this.product = this.normalizeProductSatFields(product);
        console.log("Product category_id:", this.product.category_id);
        console.log("Product subcategory_id:", this.product.subcategory_id);
        this.loading = false;
        this.cdr.detectChanges();
        console.log("Loading set to false and change detected");
        this.loadCatalogs();
        this.loadUomCatalog(() => this.loadProductUoms());
        this.loadProductPrices();
        this.loadVendorCosts();
        if (this.product.category_id) {
          console.log("Loading subcategories for category:", this.product.category_id);
          this.loadSubcategories(this.product.category_id);
        }
      },
      error: (error) => {
        console.error("Error loading product:", error);
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification("Error al cargar el producto", "error");
        this.hide();
      }
    });
  }
  loadProductPrices() {
    if (!this.product)
      return;
    this.productService.getProductPrices(this.product.id).subscribe({
      next: (prices) => {
        console.log("Product prices loaded:", prices);
        this.product.prices = prices;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error loading product prices:", error);
        if (this.product) {
          this.product.prices = [];
        }
      }
    });
  }
  loadProductDiscounts() {
    if (!this.product?.id)
      return;
    this.productService.getProductDiscounts(this.product.id).subscribe({
      next: (discounts) => {
        this.product.discounts = discounts;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error loading product discounts:", error);
        if (this.product) {
          this.product.discounts = [];
        }
      }
    });
  }
  loadVendorCosts() {
    if (!this.product)
      return;
    this.productService.getVendorCosts(this.product.id).subscribe({
      next: (costs) => {
        console.log("Vendor costs loaded:", costs);
        this.product.vendor_costs = costs;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error loading vendor costs:", error);
        if (this.product) {
          this.product.vendor_costs = [];
        }
      }
    });
  }
  loadVendors() {
    this.productService.getVendors({ is_active: true }).subscribe({
      next: (vendors) => {
        this.vendors = vendors;
        this.cdr.detectChanges();
        console.log("Vendors loaded:", this.vendors.length);
      },
      error: (error) => {
        console.error("Error loading vendors:", error);
      }
    });
  }
  /**
   * @param catalogSnapshot Tras guardar: ids de fila UOM → `uom_catalog_id` elegido en UI; si el GET viene
   * desfasado (sigue Pieza), se reaplica lo que el usuario guardó y se sincroniza `uom` con el catálogo.
   */
  loadProductUoms(catalogSnapshot) {
    if (!this.product)
      return;
    this.productService.getAssignedUoMs(this.product.id).subscribe({
      next: (uoms) => {
        console.log("Product UOMs loaded:", uoms);
        this.product.uoms = this.mapAssignedUomsResponse(uoms);
        this.reconcileUomsAfterLoad(catalogSnapshot);
        this.mergeAssignedUomIdsIntoCatalog();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error loading product UOMs:", error);
        if (this.product) {
          this.product.uoms = [];
        }
      }
    });
  }
  hide() {
    this.dialogRef.close(true);
  }
  loadCatalogs() {
    this.productService.getCategories().subscribe({
      next: (response) => {
        this.categories = [...response.data || []];
        this.cdr.detectChanges();
        console.log("Categories loaded:", this.categories.length);
      },
      error: (error) => {
        console.error("Error loading categories:", error);
      }
    });
    this.loadProductAttributes();
  }
  /**
   * Catálogo del <select>: mezcla catálogo global + catálogo por producto para que aparezcan
   * todas las unidades asignables (p. ej. FBM) y coincidan los UUID con `uom_catalog_id`.
   */
  loadUomCatalog(onComplete) {
    const productId = this.product?.id;
    if (!productId) {
      this.productService.getUOMCatalog().subscribe({
        next: (raw) => {
          this.uomCatalog = this.normalizeUomCatalogList(raw);
          this.cdr.detectChanges();
          onComplete?.();
        },
        error: () => {
          this.uomCatalog = [];
          onComplete?.();
        }
      });
      return;
    }
    forkJoin({
      global: this.productService.getUOMCatalog(),
      forProduct: this.productService.getUOMCatalogForProduct(productId).pipe(catchError(() => of([])))
    }).subscribe({
      next: ({ global, forProduct }) => {
        const g = Array.isArray(global) ? global : [];
        const p = Array.isArray(forProduct) ? forProduct : [];
        this.uomCatalog = this.mergeUomCatalogLists(g, p);
        this.mergeAssignedUomIdsIntoCatalog();
        this.cdr.detectChanges();
        console.log("UOM catalog merged:", this.uomCatalog.length);
        onComplete?.();
      },
      error: () => {
        this.productService.getUOMCatalog().subscribe({
          next: (raw) => {
            this.uomCatalog = this.normalizeUomCatalogList(raw);
            this.mergeAssignedUomIdsIntoCatalog();
            this.cdr.detectChanges();
            onComplete?.();
          },
          error: () => {
            this.uomCatalog = [];
            onComplete?.();
          }
        });
      }
    });
  }
  normalizeUomCatalogList(raw) {
    if (Array.isArray(raw))
      return raw;
    if (raw?.data && Array.isArray(raw.data))
      return raw.data;
    return [];
  }
  /** Une dos listas de catálogo UOM sin duplicar por id. */
  mergeUomCatalogLists(global, forProduct) {
    const map2 = /* @__PURE__ */ new Map();
    for (const c of global || []) {
      const row = this.normalizeCatalogOption(c);
      if (row?.id)
        map2.set(row.id, row);
    }
    for (const c of forProduct || []) {
      const row = this.normalizeCatalogOption(c);
      if (row?.id && !map2.has(row.id))
        map2.set(row.id, row);
    }
    return Array.from(map2.values());
  }
  /** Algunos APIs usan otra clave para el id del catálogo. */
  normalizeCatalogOption(c) {
    if (!c)
      return null;
    const id = c.id ?? c.uom_catalog_id ?? c.catalog_id;
    if (id == null || id === "")
      return null;
    const name = c.name ?? c.uom_name ?? c.description ?? String(id);
    return __spreadProps(__spreadValues({}, c), { id: String(id), name: String(name) });
  }
  /** Si el producto ya tiene un `uom_catalog_id` que no está en el catálogo, agrega opción para que el <select> no “rebote”. */
  mergeAssignedUomIdsIntoCatalog() {
    if (!this.product?.uoms?.length)
      return;
    const byId = new Map(this.uomCatalog.map((c) => [String(c.id), c]));
    for (const u of this.product.uoms) {
      const cid = String(u.uom_catalog_id || u.uom?.id || "").trim();
      if (!cid || byId.has(cid))
        continue;
      const name = u.uom?.name || u.uom_catalog?.name || "Unidad";
      const row = { id: cid, name: `${name} (${cid.slice(0, 8)}\u2026)` };
      byId.set(cid, row);
    }
    this.uomCatalog = Array.from(byId.values());
  }
  mapAssignedUomsResponse(uoms) {
    return (uoms || []).map((u) => {
      if (!u)
        return u;
      let cid = u.uom_catalog_id;
      if (cid == null || cid === "") {
        cid = u.uom?.id;
      }
      return __spreadProps(__spreadValues({}, u), { uom_catalog_id: cid != null && cid !== "" ? String(cid) : "" });
    });
  }
  /**
   * Corrige filas donde el API devuelve `uom_catalog_id` y `uom` desalineados, y opcionalmente reaplica
   * lo que el usuario acaba de guardar si el GET aún trae el catálogo anterior (típico al editar Pieza → FBM).
   */
  reconcileUomsAfterLoad(catalogSnapshot) {
    if (!this.product?.uoms?.length)
      return;
    for (const u of this.product.uoms) {
      if (!u?.id)
        continue;
      const rowId = String(u.id);
      const wanted = catalogSnapshot?.get(rowId);
      const flat = String(u.uom_catalog_id || "");
      const nested = String(u.uom?.id || "");
      if (wanted && flat !== wanted) {
        u.uom_catalog_id = wanted;
        this.onUomCatalogChange(u, wanted);
        continue;
      }
      if (flat && nested && flat !== nested) {
        this.onUomCatalogChange(u, flat);
      }
    }
  }
  /** Evita que Angular reutilice mal la fila al cambiar el modelo de UOM. */
  trackByUomRow(_index, uom) {
    return uom?.id || uom?._clientRowId || `row-${_index}`;
  }
  loadSubcategories(categoryId) {
    this.productService.getSubCategories(categoryId).subscribe({
      next: (response) => {
        this.subcategories = [...response.data || []];
        this.cdr.detectChanges();
        console.log("Subcategories loaded:", this.subcategories.length);
      },
      error: (error) => {
        console.error("Error loading subcategories:", error);
      }
    });
  }
  /** Unifica SAT del API (`sat_code` / `codigo_sat`) en `sat_code` para el formulario. */
  normalizeProductSatFields(product) {
    const p = product;
    if ((p.sat_code == null || p.sat_code === "") && p.codigo_sat) {
      p.sat_code = p.codigo_sat;
    }
    return p;
  }
  onCategoryChange(categoryId) {
    if (!this.product)
      return;
    this.product.subcategory_id = null;
    this.product.subcategory = null;
    this.subcategories = [];
    if (categoryId) {
      this.loadSubcategories(categoryId);
    }
  }
  openCategoriesDialog() {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      width: "600px",
      height: "600px",
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadCatalogs();
      if (this.product?.category_id) {
        this.loadSubcategories(this.product.category_id);
      } else {
        this.subcategories = [];
      }
    });
  }
  loadProductAttributes() {
    this.productService.getProductAttributes({
      limit: 200,
      include_values: true
    }).pipe(finalize(() => {
      this.ngZone.run(() => this.cdr.detectChanges());
    })).subscribe({
      next: (response) => {
        const list = this.parseProductAttributesResponse(response);
        this.ngZone.run(() => {
          this.productAttributes = [...list];
        });
      },
      error: (error) => {
        console.error("Error loading product attributes:", error);
        this.showNotification(error.error?.message || "Error al cargar atributos del cat\xE1logo", "error");
      }
    });
  }
  /** Cierra modal de atributo y sincroniza lista desde API (MatDialog + overlay). */
  dismissAttributeModal() {
    this.attributeModalVisible = false;
    this.refreshAttributesAfterModalClose();
  }
  /** Cierra modal de valor y sincroniza lista desde API. */
  dismissAttributeValueModal() {
    this.attributeValueModalVisible = false;
    this.refreshAttributesAfterModalClose();
  }
  /** Soporta varias formas de respuesta del listado de atributos. */
  parseProductAttributesResponse(res) {
    const rawList = this.extractAttributesArray(res);
    return rawList.map((a) => this.normalizeAttributeRow(a));
  }
  extractAttributesArray(res) {
    if (!res)
      return [];
    if (Array.isArray(res))
      return res;
    if (Array.isArray(res.data))
      return res.data;
    if (Array.isArray(res.items))
      return res.items;
    if (Array.isArray(res.attributes))
      return res.attributes;
    if (res.data && Array.isArray(res.data.data))
      return res.data.data;
    if (res.data && Array.isArray(res.data.items))
      return res.data.items;
    return [];
  }
  /** Normaliza `values` según distintas formas del API. */
  normalizeAttributeRow(raw) {
    const a = raw;
    return __spreadProps(__spreadValues({}, a), {
      values: this.parseAttributeValuesList(raw)
    });
  }
  parseAttributeValuesList(attr) {
    if (!attr)
      return [];
    if (Array.isArray(attr.values))
      return attr.values;
    if (Array.isArray(attr.attribute_values))
      return attr.attribute_values;
    if (Array.isArray(attr.product_attribute_values))
      return attr.product_attribute_values;
    if (attr.data && Array.isArray(attr.data.values))
      return attr.data.values;
    return [];
  }
  /** Tras cerrar modales overlay, forzar recarga en el siguiente tick para que la vista se actualice. */
  refreshAttributesAfterModalClose() {
    setTimeout(() => {
      this.ngZone.run(() => this.loadProductAttributes());
    }, 0);
  }
  /** Recarga categorías, subcategorías y atributos del tenant en la pestaña Detalles. */
  refreshDetallesSection() {
    this.loadCatalogs();
    if (this.product?.category_id) {
      this.loadSubcategories(this.product.category_id);
    } else {
      this.subcategories = [];
      this.cdr.detectChanges();
    }
  }
  openAttributeModal(attribute) {
    if (attribute) {
      this.attributeForm = {
        id: attribute.id,
        name: attribute.name,
        is_active: attribute.is_active ?? true
      };
    } else {
      this.attributeForm = this.getEmptyAttributeForm();
    }
    this.attributeModalVisible = true;
  }
  saveAttribute() {
    if (!this.attributeForm.name || !this.attributeForm.name.trim()) {
      this.showNotification("El nombre del atributo es requerido", "error");
      return;
    }
    const body = {
      name: this.attributeForm.name.trim(),
      description: "",
      is_active: this.attributeForm.is_active ?? true
    };
    if (this.attributeForm.id) {
      this.productService.updateProductAttribute(this.attributeForm.id, body).subscribe({
        next: () => {
          this.showNotification("Atributo actualizado correctamente", "success");
          this.dismissAttributeModal();
        },
        error: (error) => {
          console.error("Error updating attribute:", error);
          this.showNotification(error.error?.message || "Error al actualizar atributo", "error");
        }
      });
      return;
    }
    this.productService.createProductAttribute(body).subscribe({
      next: () => {
        this.showNotification("Atributo creado correctamente", "success");
        this.dismissAttributeModal();
      },
      error: (error) => {
        console.error("Error creating attribute:", error);
        this.showNotification(error.error?.message || "Error al crear atributo", "error");
      }
    });
  }
  deleteAttribute(attribute) {
    if (!confirm(`\xBFEliminar atributo "${attribute.name}"?`))
      return;
    this.productService.deleteProductAttribute(attribute.id).subscribe({
      next: () => {
        this.showNotification("Atributo eliminado correctamente", "success");
        this.refreshAttributesAfterModalClose();
      },
      error: (error) => {
        console.error("Error deleting attribute:", error);
        this.showNotification(error.error?.message || "Error al eliminar atributo", "error");
      }
    });
  }
  openAttributeValueModal(attributeId, value) {
    if (value) {
      this.attributeValueForm = {
        id: value.id,
        attribute_id: attributeId,
        value: value.value,
        is_active: value.is_active ?? true
      };
    } else {
      this.attributeValueForm = this.getEmptyAttributeValueForm();
      this.attributeValueForm.attribute_id = attributeId;
    }
    this.attributeValueModalVisible = true;
  }
  saveAttributeValue() {
    if (!this.attributeValueForm.attribute_id) {
      this.showNotification("Selecciona un atributo", "error");
      return;
    }
    if (!this.attributeValueForm.value || !this.attributeValueForm.value.trim()) {
      this.showNotification("El valor es requerido", "error");
      return;
    }
    const body = {
      value: this.attributeValueForm.value.trim(),
      is_active: this.attributeValueForm.is_active ?? true
    };
    if (this.attributeValueForm.id) {
      this.productService.updateProductAttributeValue(this.attributeValueForm.attribute_id, this.attributeValueForm.id, body).subscribe({
        next: () => {
          this.showNotification("Valor actualizado correctamente", "success");
          this.dismissAttributeValueModal();
        },
        error: (error) => {
          console.error("Error updating attribute value:", error);
          this.showNotification(error.error?.message || "Error al actualizar valor", "error");
        }
      });
      return;
    }
    this.productService.createProductAttributeValue(this.attributeValueForm.attribute_id, body).subscribe({
      next: () => {
        this.showNotification("Valor agregado correctamente", "success");
        this.dismissAttributeValueModal();
      },
      error: (error) => {
        console.error("Error creating attribute value:", error);
        this.showNotification(error.error?.message || "Error al agregar valor", "error");
      }
    });
  }
  deleteAttributeValue(attributeId, value) {
    if (!confirm(`\xBFEliminar valor "${value.value}"?`))
      return;
    this.productService.deleteProductAttributeValue(attributeId, value.id).subscribe({
      next: () => {
        this.showNotification("Valor eliminado correctamente", "success");
        this.refreshAttributesAfterModalClose();
      },
      error: (error) => {
        console.error("Error deleting attribute value:", error);
        this.showNotification(error.error?.message || "Error al eliminar valor", "error");
      }
    });
  }
  save() {
    if (!this.product)
      return;
    if (!this.product.sku || !this.product.sku.trim()) {
      this.showNotification("El SKU es requerido", "error");
      return;
    }
    if (!this.product.name || !this.product.name.trim()) {
      this.showNotification("El nombre es requerido", "error");
      return;
    }
    console.log("Starting save, setting saving = true");
    this.saving = true;
    this.cdr.detectChanges();
    const body = {
      sku: this.product.sku.trim(),
      external_sku: this.product.external_sku?.trim() || void 0,
      name: this.product.name.trim(),
      description: this.product.description?.trim() || "",
      sat_code: this.product.sat_code?.trim() || "",
      category_id: this.product.category_id || void 0,
      subcategory_id: this.product.subcategory_id || void 0,
      base_uom_id: this.product.base_uom_id || void 0
    };
    console.log("Saving product with body:", body);
    const isNew = !this.product.id || this.data?.isNew;
    if (isNew) {
      this.productService.createProduct(body).subscribe({
        next: (newProduct) => {
          console.log("Product created successfully:", newProduct);
          this.saving = false;
          this.cdr.detectChanges();
          this.showNotification("Producto creado correctamente", "success");
          this.dialogRef.close(newProduct);
        },
        error: (error) => {
          console.error("Error creating product:", error);
          this.saving = false;
          this.cdr.detectChanges();
          const errorMessage = error.error?.message || "Error al crear el producto";
          this.showNotification(errorMessage, "error");
        }
      });
    } else {
      this.productService.updateProduct(this.product.id, body).subscribe({
        next: () => {
          console.log("Product saved successfully, setting saving = false");
          this.saving = false;
          this.cdr.detectChanges();
          this.showNotification("Producto actualizado correctamente", "success");
          this.productUpdated.emit();
          this.reloadCurrentTab();
        },
        error: (error) => {
          console.error("Error updating product:", error);
          console.log("Error occurred, setting saving = false");
          this.saving = false;
          this.cdr.detectChanges();
          const errorMessage = error.error?.message || "Error al actualizar el producto";
          this.showNotification(errorMessage, "error");
        }
      });
    }
  }
  reloadCurrentTab() {
    if (!this.product)
      return;
    switch (this.activeTab) {
      case "detalles":
        this.refreshDetallesSection();
        break;
      case "uoms":
        this.loadProductUoms();
        break;
      case "precios":
        this.loadProductPrices();
        break;
      case "descuentos":
        this.loadProductDiscounts();
        break;
      case "costos":
        this.loadVendorCosts();
        break;
      case "fotos":
        this.loadProduct(this.product.id);
        break;
      default:
        break;
    }
  }
  openPhotoPicker(input) {
    if (this.uploadingPhoto || !this.product?.id)
      return;
    input.click();
  }
  onPhotoSelected(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file || !this.product?.id)
      return;
    const currentProduct = this.product;
    this.uploadingPhoto = true;
    this.productService.uploadProductPhoto(currentProduct.id, file).subscribe({
      next: (updatedProduct) => {
        this.product = __spreadValues(__spreadValues({}, currentProduct), updatedProduct);
        this.uploadingPhoto = false;
        this.cdr.detectChanges();
        this.showNotification("Foto del producto actualizada", "success");
      },
      error: (error) => {
        this.uploadingPhoto = false;
        this.cdr.detectChanges();
        const errorMessage = error?.error?.message || "No se pudo subir la foto del producto";
        this.showNotification(errorMessage, "error");
      }
    });
    input.value = "";
  }
  // ─── UOMs ───────────────────────────────────────────────────
  addUom() {
    if (!this.product)
      return;
    if (!this.product.uoms)
      this.product.uoms = [];
    const newUom = {
      id: "",
      // Vacío hasta que se guarde
      _clientRowId: `new-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      product_id: this.product.id,
      uom_catalog_id: "",
      factor: 1,
      is_base: this.product.uoms.length === 0,
      // Primera UOM es base por defecto
      parent_uom_id: null,
      uom_catalog: null,
      parent_uom: null
    };
    this.product.uoms.push(newUom);
  }
  removeUom(index) {
    if (!this.product || !this.product.uoms)
      return;
    const uom = this.product.uoms[index];
    if (uom.id) {
      if (!confirm("\xBFEst\xE1s seguro de eliminar esta UOM?"))
        return;
      this.productService.deleteUOM(this.product.id, uom.id).subscribe({
        next: () => {
          this.product.uoms.splice(index, 1);
          this.showNotification("UOM eliminada correctamente", "success");
        },
        error: (error) => {
          console.error("Error deleting UOM:", error);
          this.showNotification("Error al eliminar la UOM", "error");
        }
      });
    } else {
      this.product.uoms.splice(index, 1);
    }
  }
  onUomCatalogChange(uom, catalogId) {
    if (!catalogId) {
      uom.uom_catalog_id = "";
      uom.uom_catalog = null;
      uom.uom = null;
      return;
    }
    const id = String(catalogId);
    uom.uom_catalog_id = id;
    const catalog = this.uomCatalog.find((c) => String(c.id) === id);
    if (catalog) {
      uom.uom_catalog = catalog;
      uom.uom = catalog;
    }
  }
  onBaseChange(index) {
    if (!this.product || !this.product.uoms)
      return;
    const uom = this.product.uoms[index];
    if (uom.is_base) {
      this.product.uoms.forEach((u, i) => {
        if (i !== index) {
          u.is_base = false;
        }
      });
      uom.parent_uom_id = null;
      uom.factor = 1;
    }
  }
  getAvailableParentUoms(currentIndex) {
    if (!this.product || !this.product.uoms)
      return [];
    return this.product.uoms.map((uom, index) => __spreadProps(__spreadValues({}, uom), { originalIndex: index })).filter((uom, index) => {
      return index !== currentIndex && uom.uom_catalog_id && (uom.uom_catalog?.name || uom.id);
    });
  }
  saveUoms() {
    if (!this.product || !this.product.uoms)
      return;
    const hasBase = this.product.uoms.some((u) => u.is_base);
    if (!hasBase) {
      alert("Debe haber al menos una UOM marcada como base");
      return;
    }
    const allHaveCatalog = this.product.uoms.every((u) => u.uom_catalog_id);
    if (!allHaveCatalog) {
      alert("Todas las UOMs deben tener una unidad seleccionada");
      return;
    }
    const invalidFactors = this.product.uoms.filter((u) => !u.is_base && (!u.factor || u.factor <= 0));
    if (invalidFactors.length > 0) {
      alert("Las UOMs no base deben tener un factor mayor a 0");
      return;
    }
    this.saving = true;
    const newUoms = this.product.uoms.filter((u) => !u.id);
    const existingUoms = this.product.uoms.filter((u) => u.id);
    let completed = 0;
    const total = newUoms.length + existingUoms.length;
    if (total === 0) {
      this.saving = false;
      alert("No hay cambios para guardar");
      return;
    }
    const checkComplete = () => {
      completed++;
      if (completed === total) {
        this.saving = false;
        this.showNotification("UOMs guardadas correctamente", "success");
        const catalogSnapshot = /* @__PURE__ */ new Map();
        for (const u of this.product.uoms) {
          if (u.id && u.uom_catalog_id) {
            catalogSnapshot.set(String(u.id), String(u.uom_catalog_id));
          }
        }
        this.loadUomCatalog(() => this.loadProductUoms(catalogSnapshot));
      }
    };
    newUoms.forEach((uom) => {
      const data = {
        uom_catalog_id: String(uom.uom_catalog_id),
        factor: uom.factor || 1,
        is_base: uom.is_base || false,
        parent_uom_id: uom.parent_uom_id || null
      };
      this.productService.createUOM(this.product.id, data).subscribe({
        next: () => checkComplete(),
        error: (error) => {
          console.error("Error creating UOM:", error);
          this.showNotification("Error al crear UOM", "error");
          this.saving = false;
        }
      });
    });
    existingUoms.forEach((uom) => {
      const data = {
        uom_catalog_id: String(uom.uom_catalog_id),
        factor: uom.factor || 1,
        is_base: uom.is_base || false,
        parent_uom_id: uom.parent_uom_id || null
      };
      this.productService.updateUOM(this.product.id, uom.id, data).subscribe({
        next: () => checkComplete(),
        error: (error) => {
          console.error("Error updating UOM:", error);
          this.showNotification("Error al actualizar UOM", "error");
          this.saving = false;
        }
      });
    });
  }
  // ─── Precios ────────────────────────────────────────────────
  loadPriceLists() {
    this.productService.getPriceLists().subscribe({
      next: (lists) => {
        this.priceLists = Array.isArray(lists) ? lists : lists.data || [];
        this.cdr.detectChanges();
        console.log("Price lists loaded:", this.priceLists.length);
      },
      error: (error) => {
        console.error("Error loading price lists:", error);
      }
    });
  }
  openPriceListModal() {
    this.priceListForm = { name: "", description: "" };
    this.priceListModalVisible = true;
  }
  savePriceList() {
    if (!this.priceListForm.name || !this.priceListForm.name.trim()) {
      alert("Por favor ingresa un nombre para la lista de precios");
      return;
    }
    const data = {
      name: this.priceListForm.name.trim(),
      description: this.priceListForm.description?.trim() || ""
    };
    console.log("Creating price list:", data);
    this.productService.createPriceList(data).subscribe({
      next: (newList) => {
        console.log("Price list created:", newList);
        this.priceListModalVisible = false;
        this.showNotification("Lista de precios creada correctamente", "success");
        this.priceLists.push(newList);
        this.priceForm.price_list_id = newList.id;
      },
      error: (error) => {
        console.error("Error creating price list:", error);
        this.showNotification("Error al crear la lista de precios: " + (error.error?.message || error.message), "error");
      }
    });
  }
  openPriceModal(price) {
    console.log("Opening price modal - product.uoms:", this.product?.uoms);
    if (this.priceLists.length === 0) {
      this.loadPriceLists();
    }
    if (!this.product?.uoms || this.product.uoms.length === 0) {
      console.log("Loading product UOMs...");
      this.loadProductUoms();
    }
    if (price) {
      this.priceForm = {
        id: price.id,
        price_list_id: price.price_list_id,
        product_id: price.product_id,
        product_uom_id: price.product_uom_id,
        price: price.price,
        iva_percentage: price.iva_percentage || 16,
        ieps_percentage: price.ieps_percentage || 0
      };
    } else {
      this.priceForm = this.getEmptyPriceForm();
      if (this.product) {
        this.priceForm.product_id = this.product.id;
      }
    }
    this.priceModalVisible = true;
    this.cdr.detectChanges();
    console.log("Price form set:", this.priceForm);
  }
  savePrice() {
    if (!this.priceForm.price_list_id) {
      alert("Por favor selecciona una lista de precios");
      return;
    }
    if (!this.priceForm.product_uom_id) {
      alert("Por favor selecciona una UOM");
      return;
    }
    if (!this.priceForm.price || this.priceForm.price <= 0) {
      alert("Por favor ingresa un precio v\xE1lido");
      return;
    }
    const body = {
      price_list_id: this.priceForm.price_list_id,
      product_uom_id: this.priceForm.product_uom_id,
      price: Number(this.priceForm.price),
      iva_percentage: Number(this.priceForm.iva_percentage) || 0,
      ieps_percentage: Number(this.priceForm.ieps_percentage) || 0
    };
    if (this.priceForm.id) {
      const updateData = {
        price: body.price,
        iva_percentage: body.iva_percentage,
        ieps_percentage: body.ieps_percentage
      };
      this.productService.updateProductPrice(this.product.id, this.priceForm.id, updateData).subscribe({
        next: () => {
          this.priceModalVisible = false;
          this.showNotification("Precio actualizado correctamente", "success");
          this.reloadCurrentTab();
        },
        error: (error) => {
          console.error("Error updating price:", error);
          this.showNotification("Error al actualizar el precio", "error");
        }
      });
    } else {
      this.productService.createProductPrice(this.product.id, body).subscribe({
        next: () => {
          this.priceModalVisible = false;
          this.showNotification("Precio creado correctamente", "success");
          this.reloadCurrentTab();
        },
        error: (error) => {
          console.error("Error saving price:", error);
          this.showNotification("Error al guardar el precio", "error");
        }
      });
    }
  }
  deletePrice(priceId) {
    if (!confirm("\xBFEst\xE1s seguro de eliminar este precio?"))
      return;
    this.productService.deleteProductPrice(this.product.id, priceId).subscribe({
      next: () => {
        this.showNotification("Precio eliminado correctamente", "success");
        this.reloadCurrentTab();
      },
      error: (error) => {
        console.error("Error deleting price:", error);
        this.showNotification("Error al eliminar el precio", "error");
      }
    });
  }
  // ─── Costos ─────────────────────────────────────────────────
  openCostModal(cost) {
    if (this.vendors.length === 0) {
      this.loadVendors();
    }
    if (!this.product?.uoms || this.product.uoms.length === 0) {
      this.loadProductUoms();
    }
    if (cost) {
      this.costForm = {
        id: cost.id,
        vendor_id: cost.vendor_id,
        product_id: cost.product_id,
        product_uom_id: cost.product_uom_id,
        cost: cost.cost,
        iva_percentage: cost.iva_percentage || 16,
        ieps_percentage: cost.ieps_percentage || 0
      };
    } else {
      this.costForm = this.getEmptyCostForm();
      if (this.product) {
        this.costForm.product_id = this.product.id;
      }
    }
    this.costModalVisible = true;
    this.cdr.detectChanges();
  }
  saveCost() {
    if (!this.costForm.vendor_id) {
      this.showNotification("Por favor selecciona un proveedor", "error");
      return;
    }
    if (!this.costForm.product_uom_id) {
      this.showNotification("Por favor selecciona una UOM", "error");
      return;
    }
    if (!this.costForm.cost || this.costForm.cost <= 0) {
      this.showNotification("Por favor ingresa un costo v\xE1lido", "error");
      return;
    }
    const body = {
      vendor_id: this.costForm.vendor_id,
      product_uom_id: this.costForm.product_uom_id,
      cost: Number(this.costForm.cost),
      iva_percentage: Number(this.costForm.iva_percentage) || 0,
      ieps_percentage: Number(this.costForm.ieps_percentage) || 0
    };
    if (this.costForm.id) {
      this.productService.updateVendorCost(this.product.id, this.costForm.id, {
        cost: body.cost,
        iva_percentage: body.iva_percentage,
        ieps_percentage: body.ieps_percentage
      }).subscribe({
        next: () => {
          this.showNotification("Costo actualizado correctamente", "success");
          this.reloadCurrentTab();
          setTimeout(() => {
            this.costModalVisible = false;
            this.cdr.detectChanges();
          }, 100);
        },
        error: (error) => {
          console.error("Error updating cost:", error);
          const errorMessage = error.error?.message || "Error al actualizar el costo";
          this.showNotification(errorMessage, "error");
        }
      });
    } else {
      this.productService.createVendorCost(this.product.id, body).subscribe({
        next: () => {
          this.showNotification("Costo creado correctamente", "success");
          this.reloadCurrentTab();
          setTimeout(() => {
            this.costModalVisible = false;
            this.cdr.detectChanges();
          }, 100);
        },
        error: (error) => {
          console.error("Error saving cost:", error);
          const errorMessage = error.error?.message || "Error al guardar el costo";
          this.showNotification(errorMessage, "error");
        }
      });
    }
  }
  deleteCost(costId) {
    if (!confirm("\xBFEst\xE1s seguro de eliminar este costo?"))
      return;
    this.productService.deleteVendorCost(this.product.id, costId).subscribe({
      next: () => {
        this.showNotification("Costo eliminado correctamente", "success");
        this.reloadCurrentTab();
      },
      error: (error) => {
        console.error("Error deleting cost:", error);
        const errorMessage = error.error?.message || "Error al eliminar el costo";
        this.showNotification(errorMessage, "error");
      }
    });
  }
  // ─── Descuentos ─────────────────────────────────────────────
  openDiscountModal(discount) {
    if (!this.product?.id) {
      this.showNotification("Guarda el producto antes de configurar descuentos", "error");
      return;
    }
    if (!this.product.uoms || this.product.uoms.length === 0) {
      this.loadProductUoms();
    }
    if (!this.product.prices || this.product.prices.length === 0) {
      this.loadProductPrices();
    }
    if (discount) {
      this.discountForm = {
        id: discount.id,
        name: discount.name,
        discount_type: discount.discount_type,
        value: discount.value,
        product_uom_id: discount.product_uom_id,
        is_active: discount.is_active ?? true,
        valid_from: this.toDateInputValue(discount.valid_from),
        valid_to: this.toDateInputValue(discount.valid_to)
      };
    } else {
      this.discountForm = this.getEmptyDiscountForm();
    }
    this.discountModalVisible = true;
    this.cdr.detectChanges();
  }
  saveDiscount() {
    const name = (this.discountForm.name || "").trim();
    if (!name) {
      this.showNotification("El nombre es requerido", "error");
      return;
    }
    if (name.length > 120) {
      this.showNotification("El nombre no puede exceder 120 caracteres", "error");
      return;
    }
    const value = Number(this.discountForm.value);
    if (!value || value <= 0) {
      this.showNotification("Ingresa un valor mayor a 0", "error");
      return;
    }
    if (this.discountForm.discount_type === "percentage" && value > 100) {
      this.showNotification("El porcentaje no puede ser mayor a 100", "error");
      return;
    }
    const validFrom = this.discountForm.valid_from || null;
    const validTo = this.discountForm.valid_to || null;
    if (validFrom && validTo && validFrom > validTo) {
      this.showNotification("La fecha de inicio debe ser anterior o igual a la fecha de fin", "error");
      return;
    }
    const productUomId = this.discountForm.product_uom_id || null;
    if (productUomId && this.product?.uoms?.length) {
      const uomExists = this.product.uoms.some((u) => u.id === productUomId);
      if (!uomExists) {
        this.showNotification("La UOM seleccionada no existe en este producto", "error");
        return;
      }
    }
    const body = {
      name,
      discount_type: this.discountForm.discount_type,
      value,
      product_uom_id: productUomId,
      is_active: this.discountForm.is_active ?? true,
      valid_from: validFrom,
      valid_to: validTo
    };
    const productId = this.product.id;
    const request$ = this.discountForm.id ? this.productService.updateProductDiscount(productId, this.discountForm.id, body) : this.productService.createProductDiscount(productId, body);
    request$.subscribe({
      next: () => {
        this.discountModalVisible = false;
        this.showNotification(this.discountForm.id ? "Descuento actualizado correctamente" : "Descuento creado correctamente", "success");
        this.reloadCurrentTab();
      },
      error: (error) => {
        console.error("Error saving discount:", error);
        this.showNotification(this.getDiscountApiErrorMessage(error), "error");
      }
    });
  }
  deleteDiscount(discount) {
    if (!confirm(`\xBFEliminar el descuento \xAB${discount.name}\xBB?`))
      return;
    this.productService.deleteProductDiscount(this.product.id, discount.id).subscribe({
      next: () => {
        this.showNotification("Descuento eliminado correctamente", "success");
        this.reloadCurrentTab();
      },
      error: (error) => {
        console.error("Error deleting discount:", error);
        this.showNotification(this.getDiscountApiErrorMessage(error), "error");
      }
    });
  }
  getDiscountTypeLabel(type) {
    return type === "percentage" ? "Porcentaje" : "Monto fijo";
  }
  formatDiscountValue(discount) {
    if (discount.discount_type === "percentage") {
      return `${discount.value}%`;
    }
    return `$${discount.value.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  formatDiscountValidity(discount) {
    if (!discount.valid_from && !discount.valid_to) {
      return "Siempre";
    }
    const from = discount.valid_from ? this.formatShortDate(discount.valid_from) : "\u2014";
    const to = discount.valid_to ? this.formatShortDate(discount.valid_to, true) : "\u2014";
    return `${from} \u2013 ${to}`;
  }
  getDiscountUomLabel(discount) {
    return discount.product_uom?.uom?.name || "Todas";
  }
  getDiscountPreview() {
    const basePrice = this.getReferencePriceForDiscount();
    if (basePrice == null)
      return null;
    const value = Number(this.discountForm.value);
    if (!value || value <= 0)
      return null;
    let discountedPrice;
    if (this.discountForm.discount_type === "percentage") {
      discountedPrice = basePrice * (1 - value / 100);
    } else {
      discountedPrice = Math.max(0, basePrice - value);
    }
    return {
      basePrice,
      discountedPrice,
      savings: Math.max(0, basePrice - discountedPrice)
    };
  }
  getReferencePriceForDiscount() {
    const prices = this.product?.prices;
    if (!prices?.length)
      return null;
    const selectedUomId = this.discountForm.product_uom_id;
    const matchingPrices = selectedUomId ? prices.filter((p) => p.product_uom_id === selectedUomId) : prices;
    if (!matchingPrices.length)
      return null;
    const defaultListPrice = matchingPrices.find((p) => p.price_list?.is_default);
    const reference = defaultListPrice ?? matchingPrices[0];
    return Number(reference.price);
  }
  getDiscountApiErrorMessage(error) {
    const status = error?.status;
    if (status === 404) {
      return "Producto o descuento no encontrado";
    }
    if (status === 409) {
      return "Ya existe un descuento con ese nombre para este producto";
    }
    return error?.error?.message || "Error al procesar el descuento";
  }
  toDateInputValue(value) {
    if (!value)
      return "";
    return value.length >= 10 ? value.slice(0, 10) : value;
  }
  formatShortDate(value, includeYear = false) {
    const date = /* @__PURE__ */ new Date(`${value.slice(0, 10)}T00:00:00`);
    if (Number.isNaN(date.getTime()))
      return value;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    if (includeYear) {
      return `${day}/${month}/${date.getFullYear()}`;
    }
    return `${day}/${month}`;
  }
  // ─── Helpers ────────────────────────────────────────────────
  getEmptyPriceForm() {
    return {
      id: "",
      price_list_id: "",
      product_id: "",
      product_uom_id: "",
      price: 0,
      iva_percentage: 0,
      ieps_percentage: 0
    };
  }
  getEmptyDiscountForm() {
    return {
      id: "",
      name: "",
      discount_type: "percentage",
      value: null,
      product_uom_id: null,
      is_active: true,
      valid_from: "",
      valid_to: ""
    };
  }
  getEmptyCostForm() {
    return {
      id: "",
      vendor_id: "",
      product_id: "",
      product_uom_id: "",
      cost: 0,
      iva_percentage: 0,
      ieps_percentage: 0
    };
  }
  getEmptyAttributeForm() {
    return {
      id: "",
      name: "",
      is_active: true
    };
  }
  getEmptyAttributeValueForm() {
    return {
      id: "",
      attribute_id: "",
      value: "",
      is_active: true
    };
  }
  getUomName(uomId) {
    if (!this.product || !this.product.uoms)
      return "";
    const uom = this.product.uoms.find((u) => u.id === uomId);
    return uom?.name || "";
  }
  getPriceListName(priceListId) {
    const list = this.priceLists.find((l) => l.id === priceListId);
    return list?.name || "";
  }
  static \u0275fac = function ProductDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductDetailModalComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(NgZone));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailModalComponent, selectors: [["app-product-detail-modal"]], outputs: { productUpdated: "productUpdated" }, decls: 15, vars: 9, consts: [["emptyAttributes", ""], ["emptyValues", ""], ["emptyPhoto", ""], ["productPhotoInput", ""], [1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "currentColor"], ["d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"], ["class", "loading-container", 4, "ngIf"], ["class", "modal-content", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "loading-container"], [1, "spinner"], [1, "modal-content"], [3, "tabChange", "tabs", "activeTabId"], [1, "tab-content"], ["class", "tab-pane", 4, "ngIf"], [1, "tab-pane"], [1, "form-grid"], [1, "form-field", "form-field--full"], [1, "form-label"], ["type", "text", "placeholder", "Nombre del producto", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-field"], ["type", "text", "placeholder", "SKU", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "maxlength", "255", "placeholder", "SKU en sistema externo (opcional)", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Ej. 01010101", 1, "form-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Descripci\xF3n del producto", "rows", "3", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-label-row"], ["type", "button", 1, "form-label-action", 3, "click"], [1, "form-select", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "form-select", 3, "ngModelChange", "ngModel", "disabled"], ["class", "attributes-panel", 4, "ngIf", "ngIfElse"], [1, "form-actions"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [4, "ngIf"], [1, "attributes-panel"], ["class", "attribute-row", 4, "ngFor", "ngForOf"], [1, "attribute-row"], [1, "attribute-row__header"], [1, "attribute-row__name"], [1, "attribute-row__actions"], ["type", "button", "title", "Agregar valor", 1, "btn-icon", "btn-icon--compact", 3, "click"], [1, "fi", "fi-rr-plus"], ["type", "button", "title", "Editar atributo", 1, "btn-icon", "btn-icon--compact", 3, "click"], [1, "fi", "fi-rr-pencil"], ["type", "button", "title", "Eliminar atributo", 1, "btn-icon", "btn-icon--compact", "btn-icon--danger", 3, "click"], [1, "fi", "fi-rr-trash"], ["class", "attribute-values", 4, "ngIf", "ngIfElse"], [1, "attribute-values"], ["class", "attribute-chip", 4, "ngFor", "ngForOf"], [1, "attribute-chip"], [1, "attribute-chip__text"], ["type", "button", "title", "Editar valor", 1, "attribute-chip__btn", 3, "click"], ["type", "button", "title", "Eliminar valor", 1, "attribute-chip__btn", "attribute-chip__btn--danger", 3, "click"], [1, "attribute-empty-values"], [1, "attribute-empty"], [1, "tab-header"], ["type", "button", 1, "btn", "btn--sm", "btn--primary", 3, "click"], ["class", "empty-state", 4, "ngIf"], ["class", "data-table uom-table", 4, "ngIf"], ["class", "form-actions", 4, "ngIf"], [1, "empty-state"], [1, "data-table", "uom-table"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "form-select", "form-select--inline", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "number", "placeholder", "1", "step", "1", "min", "1", 1, "form-input", "form-input--inline", 3, "ngModelChange", "ngModel"], [1, "checkbox-wrapper"], ["type", "checkbox", 3, "ngModelChange", "change", "id", "ngModel"], [3, "for"], [1, "form-select", "form-select--inline", 3, "ngModelChange", "ngModel", "disabled"], [3, "value"], ["type", "button", "title", "Eliminar", 1, "btn-icon", "btn-icon--danger", 3, "click"], ["class", "data-table", 4, "ngIf"], [1, "data-table"], [4, "ngFor", "ngForOf"], [2, "cursor", "help", 3, "title"], [1, "row-actions"], ["type", "button", "title", "Editar", 1, "btn-icon", 3, "click"], ["class", "tab-header", 4, "ngIf"], ["class", "empty-state empty-state--discounts", 4, "ngIf"], [1, "empty-state", "empty-state--discounts"], [1, "empty-state__content"], [1, "empty-state__title"], [1, "empty-state__subtitle"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], [1, "discount-badge"], [1, "photo-tab"], [1, "photo-tab__preview"], [4, "ngIf", "ngIfElse"], ["type", "file", "accept", "image/*", 1, "hidden-file-input", 3, "change"], ["type", "button", 1, "btn", "btn--primary", "photo-tab__upload-btn", 3, "click", "disabled"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["loading", "lazy", 3, "src", "alt"], [1, "photo-tab__empty"], [1, "modal-overlay", 3, "click"], [1, "modal-container", "modal-container--xs", 3, "click"], [1, "modal-content", "modal-content--compact"], ["type", "text", "placeholder", "Ej. Color", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "text", "placeholder", "Ej. Rojo", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "modal-container", "modal-container--sm", 3, "click"], ["type", "text", "placeholder", "Promo mostrador", "maxlength", "120", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "radio-group"], [1, "radio-option"], ["type", "radio", "name", "discount_type", "value", "percentage", 3, "ngModelChange", "ngModel"], ["type", "radio", "name", "discount_type", "value", "fixed", 3, "ngModelChange", "ngModel"], [1, "input-with-suffix"], ["class", "input-prefix", 4, "ngIf"], ["type", "number", 1, "form-input", 3, "ngModelChange", "ngModel", "placeholder", "step", "min", "max"], ["class", "input-suffix", 4, "ngIf"], ["class", "form-hint discount-preview", 4, "ngIf"], ["type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "id", "discount-is-active", 3, "ngModelChange", "ngModel"], ["for", "discount-is-active"], [1, "input-prefix"], [1, "input-suffix"], [1, "form-hint", "discount-preview"], [1, "input-with-button"], ["type", "button", "title", "Crear lista de precios", 1, "btn-icon-add", 3, "click"], ["type", "number", "placeholder", "0.00", "step", "0.01", "min", "0", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "0", "step", "0.01", "min", "0", "max", "100", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Ej: Precio Comercial", 1, "form-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Descripci\xF3n opcional", "rows", "2", 1, "form-textarea", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "0", "step", "0.01", "min", "0", 1, "form-input", 3, "ngModelChange", "ngModel"]], template: function ProductDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 6);
      \u0275\u0275listener("click", function ProductDetailModalComponent_Template_button_click_4_listener() {
        return ctx.hide();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 7);
      \u0275\u0275element(6, "path", 8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(7, ProductDetailModalComponent_div_7_Template, 4, 0, "div", 9)(8, ProductDetailModalComponent_div_8_Template, 9, 8, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, ProductDetailModalComponent_div_9_Template, 19, 2, "div", 11)(10, ProductDetailModalComponent_div_10_Template, 19, 2, "div", 11)(11, ProductDetailModalComponent_div_11_Template, 59, 18, "div", 11)(12, ProductDetailModalComponent_div_12_Template, 44, 8, "div", 11)(13, ProductDetailModalComponent_div_13_Template, 23, 2, "div", 11)(14, ProductDetailModalComponent_div_14_Template, 41, 8, "div", 11);
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate((ctx.data == null ? null : ctx.data.isNew) ? "Crear Producto" : "Editar Producto");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.product);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.attributeModalVisible);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.attributeValueModalVisible);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.discountModalVisible);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.priceModalVisible);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.priceListModalVisible);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.costModalVisible);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, TabComponent, DecimalPipe], styles: [`

.modal-container[_ngcontent-%COMP%] {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 850px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.modal-container--sm[_ngcontent-%COMP%] {
  max-width: 480px;
}
.modal-container--xs[_ngcontent-%COMP%] {
  max-width: 400px;
}
.modal-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.close-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
}
.close-btn[_ngcontent-%COMP%]:hover {
  background: #f3f4f6;
  color: #374151;
}
.modal-content[_ngcontent-%COMP%] {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  position: relative;
}
.modal-content--compact[_ngcontent-%COMP%] {
  padding: 10px;
}
.loading-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6b7280;
}
.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin-top: 12px;
  font-size: 14px;
}
.spinner[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  to {
    transform: rotate(360deg);
  }
}
.tab-content[_ngcontent-%COMP%] {
  padding: 16px;
  position: relative;
}
.tab-pane[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;
}
@keyframes _ngcontent-%COMP%_fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.tab-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
.form-field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: 1;
}
.form-field--full[_ngcontent-%COMP%] {
  grid-column: 1/-1;
}
.form-label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.form-label-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.form-label-action[_ngcontent-%COMP%] {
  border: none;
  background: transparent;
  color: #3b82f6;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
.form-label-action[_ngcontent-%COMP%]:hover {
  color: #2563eb;
  text-decoration: underline;
}
.attributes-panel[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 6px 8px;
  background: #f9fafb;
}
.attribute-row[_ngcontent-%COMP%] {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  padding: 6px 8px;
}
.attribute-row__header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}
.attribute-row__name[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  color: #111827;
  line-height: 1.3;
  min-width: 0;
}
.attribute-row__actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}
.attribute-values[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.attribute-chip[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 2px 4px 2px 6px;
  font-size: 11px;
  color: #374151;
  max-width: 100%;
}
.attribute-chip__text[_ngcontent-%COMP%] {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 160px;
}
.attribute-chip__btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 3px;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: #6b7280;
  font-size: 10px;
  flex-shrink: 0;
}
.attribute-chip__btn[_ngcontent-%COMP%]:hover {
  background: #e5e7eb;
  color: #374151;
}
.attribute-chip__btn--danger[_ngcontent-%COMP%]:hover {
  background: #fee2e2;
  color: #dc2626;
}
.attribute-empty[_ngcontent-%COMP%], 
.attribute-empty-values[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #9ca3af;
  padding: 2px 0;
}
.form-input[_ngcontent-%COMP%], 
.form-select[_ngcontent-%COMP%], 
.form-textarea[_ngcontent-%COMP%] {
  width: 100%;
  padding: 8px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
  box-sizing: border-box;
}
.form-input[_ngcontent-%COMP%]:focus, 
.form-select[_ngcontent-%COMP%]:focus, 
.form-textarea[_ngcontent-%COMP%]:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.form-input[_ngcontent-%COMP%]:disabled, 
.form-select[_ngcontent-%COMP%]:disabled, 
.form-textarea[_ngcontent-%COMP%]:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}
.form-input--inline[_ngcontent-%COMP%], 
.form-select--inline[_ngcontent-%COMP%], 
.form-textarea--inline[_ngcontent-%COMP%] {
  padding: 6px 8px;
  font-size: 12px;
}
.form-select[_ngcontent-%COMP%] {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 20px;
  padding-right: 36px;
  appearance: none;
  width: 100%;
  box-sizing: border-box;
}
.form-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {
  padding: 8px;
}
.form-textarea[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 80px;
}
.form-actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}
.input-with-button[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  align-items: stretch;
}
.input-with-button[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.btn-icon-add[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  background: white;
  color: #3b82f6;
  transition: all 0.15s;
  font-size: 16px;
  flex-shrink: 0;
}
.btn-icon-add[_ngcontent-%COMP%]:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn--primary[_ngcontent-%COMP%] {
  background: #3b82f6;
  color: white;
}
.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #2563eb;
}
.btn--secondary[_ngcontent-%COMP%] {
  background: #f3f4f6;
  color: #374151;
}
.btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #e5e7eb;
}
.btn--sm[_ngcontent-%COMP%] {
  padding: 6px 12px;
  font-size: 12px;
}
.btn-icon[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  color: #6b7280;
  transition: all 0.15s;
}
.btn-icon[_ngcontent-%COMP%]:hover {
  background: #f3f4f6;
  color: #374151;
}
.btn-icon--danger[_ngcontent-%COMP%]:hover {
  background: #fee2e2;
  color: #dc2626;
}
.btn-icon--compact[_ngcontent-%COMP%] {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  font-size: 11px;
}
.data-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {
  background: #f9fafb;
}
.data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  border-bottom: 1px solid #f3f4f6;
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background: #f9fafb;
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 10px 12px;
  color: #374151;
}
.uom-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  vertical-align: middle;
  padding: 8px;
}
.uom-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(1), 
.uom-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(1) {
  width: 35%;
}
.uom-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(2), 
.uom-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(2) {
  width: 15%;
}
.uom-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(3), 
.uom-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(3) {
  width: 15%;
}
.uom-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(4), 
.uom-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(4) {
  width: 30%;
}
.uom-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(5), 
.uom-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(5) {
  width: 5%;
}
.row-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 4px;
  align-items: center;
}
.checkbox-wrapper[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.checkbox-wrapper[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
}
.checkbox-wrapper[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.form-input--inline[_ngcontent-%COMP%] {
  padding: 6px 8px;
  font-size: 12px;
  min-width: 60px;
  width: 100%;
}
.form-select--inline[_ngcontent-%COMP%] {
  padding: 6px 8px;
  font-size: 12px;
  width: 100%;
}
.empty-state[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #9ca3af;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  margin: 0;
}
.empty-state--discounts[_ngcontent-%COMP%]   .empty-state__content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  max-width: 360px;
}
.empty-state--discounts[_ngcontent-%COMP%]   .empty-state__title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}
.empty-state--discounts[_ngcontent-%COMP%]   .empty-state__subtitle[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
  line-height: 1.4;
}
.empty-state--discounts[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
  margin-top: 12px;
}
.discount-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.25rem;
  white-space: nowrap;
}
.discount-badge--active[_ngcontent-%COMP%] {
  background-color: #dcfce7;
  color: #15803d;
}
.discount-badge--inactive[_ngcontent-%COMP%] {
  background-color: #f3f4f6;
  color: #6b7280;
}
.radio-group[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.radio-option[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
}
.radio-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  margin: 0;
}
.input-with-suffix[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
}
.input-with-suffix[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {
  flex: 1;
}
.input-prefix[_ngcontent-%COMP%], 
.input-suffix[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}
.form-hint.discount-preview[_ngcontent-%COMP%] {
  margin: 8px 0 0;
  font-size: 12px;
  color: #6b7280;
}
.photo-tab[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 420px;
}
.photo-tab__preview[_ngcontent-%COMP%] {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  min-height: 230px;
  background: #f9fafb;
  overflow: hidden;
}
.photo-tab__preview[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], 
.photo-tab__preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  display: block;
  width: 100%;
  height: 100%;
}
.photo-tab__preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  object-fit: cover;
}
.photo-tab__empty[_ngcontent-%COMP%] {
  min-height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}
.hidden-file-input[_ngcontent-%COMP%] {
  display: none;
}
.photo-tab__upload-btn[_ngcontent-%COMP%] {
  align-self: flex-start;
}
@media (max-width: 768px) {
  .modal-container[_ngcontent-%COMP%] {
    max-width: 95vw;
  }
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .photo-tab[_ngcontent-%COMP%] {
    max-width: 100%;
  }
  .tab-content[_ngcontent-%COMP%] {
    padding: 16px;
  }
}
.modal-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}
[_nghost-%COMP%]     .snackbar-success {
  background-color: #10b981 !important;
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-success .mat-mdc-snack-bar-label {
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-success .mat-mdc-button {
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-error {
  background-color: #ef4444 !important;
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-error .mat-mdc-snack-bar-label {
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-error .mat-mdc-button {
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-info {
  background-color: #3b82f6 !important;
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-info .mat-mdc-snack-bar-label {
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-info .mat-mdc-button {
  color: white !important;
}
/*# sourceMappingURL=product-detail-modal.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-product-detail-modal", standalone: true, imports: [CommonModule, FormsModule, TabComponent], template: `<!-- Modal Principal -->
<div class="modal-container">
  <!-- Header -->
  <div class="modal-header">
    <h2>{{ data?.isNew ? 'Crear Producto' : 'Editar Producto' }}</h2>
    <button class="close-btn" (click)="hide()" type="button">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
      </svg>
    </button>
  </div>

  <!-- Loading -->
  <div *ngIf="loading" class="loading-container">
    <div class="spinner"></div>
    <p>Cargando producto...</p>
  </div>

  <!-- Content -->
  <div *ngIf="!loading && product" class="modal-content">
      <!-- Tabs -->
      <app-tab [tabs]="tabs" [activeTabId]="activeTab" (tabChange)="onTabChange($event)"></app-tab>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Tab: Detalles -->
        <div *ngIf="activeTab === 'detalles'" class="tab-pane">
          <div class="form-grid">
            <div class="form-field form-field--full">
              <label class="form-label">NOMBRE *</label>
              <input type="text" class="form-input" [(ngModel)]="product.name" placeholder="Nombre del producto">
            </div>

            <div class="form-field">
              <label class="form-label">SKU *</label>
              <input type="text" class="form-input" [(ngModel)]="product.sku" placeholder="SKU">
            </div>

            <div class="form-field">
              <label class="form-label">SKU EXTERNO</label>
              <input
                type="text"
                class="form-input"
                [(ngModel)]="product.external_sku"
                maxlength="255"
                placeholder="SKU en sistema externo (opcional)">
            </div>

            <div class="form-field">
              <label class="form-label">C\xD3DIGO SAT</label>
              <input type="text" class="form-input" [(ngModel)]="product.sat_code" placeholder="Ej. 01010101">
            </div>

            <div class="form-field form-field--full">
              <label class="form-label">DESCRIPCI\xD3N</label>
              <textarea class="form-textarea" [(ngModel)]="product.description" placeholder="Descripci\xF3n del producto" rows="3"></textarea>
            </div>

            <div class="form-field">
              <div class="form-label-row">
                <label class="form-label">CATEGOR\xCDA</label>
                <button class="form-label-action" (click)="openCategoriesDialog()" type="button">
                  Editar
                </button>
              </div>
              <select class="form-select" [(ngModel)]="product.category_id" (ngModelChange)="onCategoryChange($event)">
                <option [ngValue]="null">Selecciona una categor\xEDa</option>
                <option *ngFor="let cat of categories" [ngValue]="cat.id">{{ cat.name }}</option>
              </select>
            </div>

            <div class="form-field">
              <label class="form-label">SUBCATEGOR\xCDA</label>
              <select class="form-select" [(ngModel)]="product.subcategory_id" [disabled]="!product.category_id">
                <option [ngValue]="null">Selecciona una subcategor\xEDa</option>
                <option *ngFor="let sub of subcategories" [ngValue]="sub.id">{{ sub.name }}</option>
              </select>
            </div>

            <div class="form-field form-field--full">
              <div class="form-label-row">
                <label class="form-label">ATRIBUTOS PERSONALIZADOS</label>
                <button class="form-label-action" (click)="openAttributeModal()" type="button">
                  + Agregar atributo
                </button>
              </div>

              <div class="attributes-panel" *ngIf="productAttributes.length > 0; else emptyAttributes">
                <div class="attribute-row" *ngFor="let attr of productAttributes">
                  <div class="attribute-row__header">
                    <span class="attribute-row__name">{{ attr.name }}</span>
                    <div class="attribute-row__actions">
                      <button class="btn-icon btn-icon--compact" (click)="openAttributeValueModal(attr.id)" type="button" title="Agregar valor">
                        <i class="fi fi-rr-plus"></i>
                      </button>
                      <button class="btn-icon btn-icon--compact" (click)="openAttributeModal(attr)" type="button" title="Editar atributo">
                        <i class="fi fi-rr-pencil"></i>
                      </button>
                      <button class="btn-icon btn-icon--compact btn-icon--danger" (click)="deleteAttribute(attr)" type="button" title="Eliminar atributo">
                        <i class="fi fi-rr-trash"></i>
                      </button>
                    </div>
                  </div>

                  <div class="attribute-values" *ngIf="attr.values?.length; else emptyValues">
                    <span class="attribute-chip" *ngFor="let value of attr.values">
                      <span class="attribute-chip__text">{{ value.value }}</span>
                      <button class="attribute-chip__btn" (click)="openAttributeValueModal(attr.id, value)" type="button" title="Editar valor">
                        <i class="fi fi-rr-pencil"></i>
                      </button>
                      <button class="attribute-chip__btn attribute-chip__btn--danger" (click)="deleteAttributeValue(attr.id, value)" type="button" title="Eliminar valor">
                        <i class="fi fi-rr-trash"></i>
                      </button>
                    </span>
                  </div>

                  <ng-template #emptyValues>
                    <div class="attribute-empty-values">Sin valores</div>
                  </ng-template>
                </div>
              </div>

              <ng-template #emptyAttributes>
                <div class="attribute-empty">No hay atributos configurados</div>
              </ng-template>
            </div>
          </div>

          <div class="form-actions">
            <button class="btn btn--primary" (click)="save()" [disabled]="saving" type="button">
              <span *ngIf="!saving">Guardar cambios</span>
              <span *ngIf="saving">Guardando...</span>
            </button>
          </div>
        </div>

        <!-- Tab: UOMs -->
        <div *ngIf="activeTab === 'uoms'" class="tab-pane">
          <div class="tab-header">
            <button class="btn btn--sm btn--primary" (click)="addUom()" type="button">+ Agregar UOM</button>
          </div>

          <div *ngIf="!product.uoms || product.uoms.length === 0" class="empty-state">
            <p>No hay UOMs configuradas</p>
          </div>

          <table *ngIf="product.uoms && product.uoms.length > 0" class="data-table uom-table">
            <thead>
              <tr>
                <th>UNIDAD</th>
                <th>FACTOR</th>
                <th>BASE</th>
                <th>UOM PADRE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let uom of product.uoms; let i = index; trackBy: trackByUomRow">
                <td>
                  <select class="form-select form-select--inline" [(ngModel)]="uom.uom_catalog_id" (ngModelChange)="onUomCatalogChange(uom, $event)">
                    <option value="">Seleccionar...</option>
                    <option *ngFor="let catalog of uomCatalog" [value]="catalog.id">{{ catalog.name }}</option>
                  </select>
                </td>
                <td>
                  <input type="number" class="form-input form-input--inline" [(ngModel)]="uom.factor" placeholder="1" step="1" min="1">
                </td>
                <td>
                  <div class="checkbox-wrapper">
                    <input type="checkbox" [id]="'is-base-' + i" [(ngModel)]="uom.is_base" (change)="onBaseChange(i)">
                    <label [for]="'is-base-' + i">{{ uom.is_base ? 'S\xED' : 'No' }}</label>
                  </div>
                </td>
                <td>
                  <select class="form-select form-select--inline" [(ngModel)]="uom.parent_uom_id" [disabled]="uom.is_base">
                    <option [value]="null">\u2014 Ninguno \u2014</option>
                    <option *ngFor="let parentUom of getAvailableParentUoms(i)" [value]="parentUom.id">{{ parentUom.uom?.name || parentUom.name || 'Sin nombre' }}</option>
                  </select>
                </td>
                <td>
                  <button class="btn-icon btn-icon--danger" (click)="removeUom(i)" type="button" title="Eliminar">
                    <i class="fi fi-rr-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="form-actions" *ngIf="product.uoms && product.uoms.length > 0">
            <button class="btn btn--primary" (click)="saveUoms()" [disabled]="saving" type="button">
              <span *ngIf="!saving">Guardar UOMs</span>
              <span *ngIf="saving">Guardando...</span>
            </button>
          </div>
        </div>

        <!-- Tab: Precios -->
        <div *ngIf="activeTab === 'precios'" class="tab-pane">
          <div class="tab-header">
            <button class="btn btn--sm btn--primary" (click)="openPriceModal()" type="button">+ Agregar Precio</button>
          </div>

          <div *ngIf="!product.prices || product.prices.length === 0" class="empty-state">
            <p>No hay precios configurados</p>
          </div>

          <table *ngIf="product.prices && product.prices.length > 0" class="data-table">
            <thead>
              <tr>
                <th>UOM</th>
                <th>LISTA DE PRECIOS</th>
                <th>PRECIO</th>
                <th>IVA %</th>
                <th>IEPS %</th>
                <th>TOTAL</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let price of product.prices">
                <td>{{ price.product_uom?.uom?.name || '\u2014' }}</td>
                <td>{{ price.price_list?.name || '\u2014' }}</td>
                <td>\${{ price.price | number:'1.2-2' }}</td>
                <td>{{ price.iva_percentage || 0 }}%</td>
                <td>{{ price.ieps_percentage || 0 }}%</td>
                <td [title]="'Precio: $' + (price.price | number:'1.2-2') + '\\nIVA: $' + ((price.iva_unit_total || 0) | number:'1.2-2') + '\\nIEPS: $' + ((price.ieps_unit_total || 0) | number:'1.2-2') + '\\nTotal: $' + ((Number(price.price) + Number(price.iva_unit_total || 0) + Number(price.ieps_unit_total || 0)) | number:'1.2-2')" style="cursor: help;">
                  \${{ (Number(price.price) + Number(price.iva_unit_total || 0) + Number(price.ieps_unit_total || 0)) | number:'1.2-2' }}
                </td>
                <td>
                  <div class="row-actions">
                    <button class="btn-icon" (click)="openPriceModal(price)" type="button" title="Editar">
                      <i class="fi fi-rr-pencil"></i>
                    </button>
                    <button class="btn-icon btn-icon--danger" (click)="deletePrice(price.id)" type="button" title="Eliminar">
                      <i class="fi fi-rr-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Tab: Descuentos -->
        <div *ngIf="activeTab === 'descuentos'" class="tab-pane">
          <div class="tab-header" *ngIf="product.discounts && product.discounts.length > 0">
            <button class="btn btn--sm btn--primary" (click)="openDiscountModal()" type="button">+ Agregar descuento</button>
          </div>

          <div *ngIf="!product.discounts || product.discounts.length === 0" class="empty-state empty-state--discounts">
            <div class="empty-state__content">
              <p class="empty-state__title">Sin descuentos configurados</p>
              <p class="empty-state__subtitle">Los descuentos activos aparecer\xE1n disponibles en POS al vender este producto.</p>
              <button class="btn btn--primary" (click)="openDiscountModal()" type="button">+ Agregar descuento</button>
            </div>
          </div>

          <table *ngIf="product.discounts && product.discounts.length > 0" class="data-table">
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>TIPO</th>
                <th>VALOR</th>
                <th>UOM</th>
                <th>VIGENCIA</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let discount of product.discounts">
                <td>{{ discount.name }}</td>
                <td>{{ getDiscountTypeLabel(discount.discount_type) }}</td>
                <td>{{ formatDiscountValue(discount) }}</td>
                <td>{{ getDiscountUomLabel(discount) }}</td>
                <td>{{ formatDiscountValidity(discount) }}</td>
                <td>
                  <span
                    class="discount-badge"
                    [class.discount-badge--active]="discount.is_active"
                    [class.discount-badge--inactive]="!discount.is_active"
                  >
                    {{ discount.is_active ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td>
                  <div class="row-actions">
                    <button class="btn-icon" (click)="openDiscountModal(discount)" type="button" title="Editar">
                      <i class="fi fi-rr-pencil"></i>
                    </button>
                    <button class="btn-icon btn-icon--danger" (click)="deleteDiscount(discount)" type="button" title="Eliminar">
                      <i class="fi fi-rr-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Tab: Costos -->
        <div *ngIf="activeTab === 'costos'" class="tab-pane">
          <div class="tab-header">
            <button class="btn btn--sm btn--primary" (click)="openCostModal()" type="button">+ Agregar Costo</button>
          </div>

          <div *ngIf="!product.vendor_costs || product.vendor_costs.length === 0" class="empty-state">
            <p>No hay costos de proveedor configurados</p>
          </div>

          <table *ngIf="product.vendor_costs && product.vendor_costs.length > 0" class="data-table">
            <thead>
              <tr>
                <th>UOM</th>
                <th>PROVEEDOR</th>
                <th>COSTO</th>
                <th>IVA %</th>
                <th>IEPS %</th>
                <th>TOTAL</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let cost of product.vendor_costs">
                <td>{{ cost.product_uom?.uom?.name || '\u2014' }}</td>
                <td>{{ cost.vendor?.name || '\u2014' }}</td>
                <td>\${{ cost.cost | number:'1.2-2' }}</td>
                <td>{{ cost.iva_percentage || 0 }}%</td>
                <td>{{ cost.ieps_percentage || 0 }}%</td>
                <td [title]="'Costo: $' + (cost.cost | number:'1.2-2') + '\\nIVA: $' + ((cost.iva_unit_total || 0) | number:'1.2-2') + '\\nIEPS: $' + ((cost.ieps_unit_total || 0) | number:'1.2-2') + '\\nTotal: $' + ((Number(cost.cost) + Number(cost.iva_unit_total || 0) + Number(cost.ieps_unit_total || 0)) | number:'1.2-2')" style="cursor: help;">
                  \${{ (Number(cost.cost) + Number(cost.iva_unit_total || 0) + Number(cost.ieps_unit_total || 0)) | number:'1.2-2' }}
                </td>
                <td>
                  <div class="row-actions">
                    <button class="btn-icon" (click)="openCostModal(cost)" type="button" title="Editar">
                      <i class="fi fi-rr-pencil"></i>
                    </button>
                    <button class="btn-icon btn-icon--danger" (click)="deleteCost(cost.id)" type="button" title="Eliminar">
                      <i class="fi fi-rr-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Tab: Fotos -->
        <div *ngIf="activeTab === 'fotos'" class="tab-pane">
          <div class="photo-tab">
            <div class="photo-tab__preview">
              <ng-container *ngIf="productPhotoUrl as photoUrl; else emptyPhoto">
                <a [href]="photoUrl" target="_blank" rel="noopener noreferrer">
                  <img [src]="photoUrl" [alt]="'Foto de ' + (product.name || 'producto')" loading="lazy">
                </a>
              </ng-container>
              <ng-template #emptyPhoto>
                <div class="photo-tab__empty">
                  <p>Sin im\xE1genes</p>
                </div>
              </ng-template>
            </div>

            <input
              #productPhotoInput
              type="file"
              class="hidden-file-input"
              accept="image/*"
              (change)="onPhotoSelected($event)"
            >

            <button
              class="btn btn--primary photo-tab__upload-btn"
              type="button"
              (click)="openPhotoPicker(productPhotoInput)"
              [disabled]="uploadingPhoto || !product.id"
            >
              <span *ngIf="uploadingPhoto">Subiendo...</span>
              <span *ngIf="!uploadingPhoto">{{ productPhotoUrl ? 'Reemplazar foto' : 'Subir foto' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
</div>

<!-- Modal Secundario: Atributo -->
<div class="modal-overlay" *ngIf="attributeModalVisible" (click)="dismissAttributeModal()">
  <div class="modal-container modal-container--xs" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <h2>{{ attributeForm.id ? 'Editar Atributo' : 'Nuevo Atributo' }}</h2>
      <button class="close-btn" (click)="dismissAttributeModal()" type="button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
      </button>
    </div>

    <div class="modal-content modal-content--compact">
      <div class="form-grid">
        <div class="form-field form-field--full">
          <label class="form-label">NOMBRE *</label>
          <input type="text" class="form-input" [(ngModel)]="attributeForm.name" placeholder="Ej. Color">
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn--secondary" (click)="dismissAttributeModal()" type="button">Cancelar</button>
        <button class="btn btn--primary" (click)="saveAttribute()" type="button">Guardar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Secundario: Valor de Atributo -->
<div class="modal-overlay" *ngIf="attributeValueModalVisible" (click)="dismissAttributeValueModal()">
  <div class="modal-container modal-container--xs" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <h2>{{ attributeValueForm.id ? 'Editar Valor' : 'Nuevo Valor' }}</h2>
      <button class="close-btn" (click)="dismissAttributeValueModal()" type="button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
      </button>
    </div>

    <div class="modal-content modal-content--compact">
      <div class="form-grid">
        <div class="form-field form-field--full">
          <label class="form-label">VALOR *</label>
          <input type="text" class="form-input" [(ngModel)]="attributeValueForm.value" placeholder="Ej. Rojo">
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn--secondary" (click)="dismissAttributeValueModal()" type="button">Cancelar</button>
        <button class="btn btn--primary" (click)="saveAttributeValue()" type="button">Guardar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Secundario: Descuento -->
<div class="modal-overlay" *ngIf="discountModalVisible" (click)="discountModalVisible = false">
  <div class="modal-container modal-container--sm" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <h2>{{ discountForm.id ? 'Editar descuento' : 'Agregar descuento' }}</h2>
      <button class="close-btn" (click)="discountModalVisible = false" type="button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
      </button>
    </div>

    <div class="modal-content modal-content--compact">
      <div class="form-grid">
        <div class="form-field form-field--full">
          <label class="form-label">NOMBRE *</label>
          <input type="text" class="form-input" [(ngModel)]="discountForm.name" placeholder="Promo mostrador" maxlength="120">
        </div>

        <div class="form-field form-field--full">
          <label class="form-label">TIPO DE DESCUENTO *</label>
          <div class="radio-group">
            <label class="radio-option">
              <input type="radio" name="discount_type" value="percentage" [(ngModel)]="discountForm.discount_type">
              <span>Porcentaje</span>
            </label>
            <label class="radio-option">
              <input type="radio" name="discount_type" value="fixed" [(ngModel)]="discountForm.discount_type">
              <span>Monto fijo (MXN)</span>
            </label>
          </div>
        </div>

        <div class="form-field form-field--full">
          <label class="form-label">VALOR *</label>
          <div class="input-with-suffix">
            <span class="input-prefix" *ngIf="discountForm.discount_type === 'fixed'">$</span>
            <input
              type="number"
              class="form-input"
              [(ngModel)]="discountForm.value"
              [placeholder]="discountForm.discount_type === 'percentage' ? '10' : '50.00'"
              [step]="discountForm.discount_type === 'percentage' ? '0.01' : '0.01'"
              [min]="discountForm.discount_type === 'percentage' ? '0.01' : '0.01'"
              [max]="discountForm.discount_type === 'percentage' ? '100' : null"
            >
            <span class="input-suffix" *ngIf="discountForm.discount_type === 'percentage'">%</span>
          </div>
          <p class="form-hint discount-preview" *ngIf="getDiscountPreview() as preview">
            Precio base: \${{ preview.basePrice | number:'1.2-2' }}
            \u2192 Con descuento: \${{ preview.discountedPrice | number:'1.2-2' }}
            (ahorro \${{ preview.savings | number:'1.2-2' }})
          </p>
        </div>

        <div class="form-field form-field--full">
          <label class="form-label">UOM</label>
          <select class="form-select" [(ngModel)]="discountForm.product_uom_id">
            <option [ngValue]="null">Todas las UOMs</option>
            <option *ngFor="let uom of product?.uoms" [ngValue]="uom.id">
              {{ uom.uom?.name || uom.name || 'Sin nombre' }}
            </option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label">VIGENCIA DESDE</label>
          <input type="date" class="form-input" [(ngModel)]="discountForm.valid_from">
        </div>

        <div class="form-field">
          <label class="form-label">VIGENCIA HASTA</label>
          <input type="date" class="form-input" [(ngModel)]="discountForm.valid_to">
        </div>

        <div class="form-field form-field--full">
          <div class="checkbox-wrapper">
            <input type="checkbox" id="discount-is-active" [(ngModel)]="discountForm.is_active">
            <label for="discount-is-active">Activo (disponible en ventas)</label>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn--secondary" (click)="discountModalVisible = false" type="button">Cancelar</button>
        <button class="btn btn--primary" (click)="saveDiscount()" type="button">Guardar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Secundario: Precio -->
<div class="modal-overlay" *ngIf="priceModalVisible" (click)="priceModalVisible = false">
  <div class="modal-container modal-container--sm" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <h2>{{ priceForm.id ? 'Editar Precio' : 'Nuevo Precio' }}</h2>
      <button class="close-btn" (click)="priceModalVisible = false" type="button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
      </button>
    </div>

    <div class="modal-content modal-content--compact">
      <div class="form-grid">
        <div class="form-field form-field--full">
          <label class="form-label">LISTA DE PRECIOS *</label>
          <div class="input-with-button">
            <select class="form-select" [(ngModel)]="priceForm.price_list_id">
              <option value="">Seleccionar...</option>
              <option *ngFor="let list of priceLists" [value]="list.id">{{ list.name }}</option>
            </select>
            <button class="btn-icon-add" (click)="openPriceListModal()" type="button" title="Crear lista de precios">
              <i class="fi fi-rr-plus"></i>
            </button>
          </div>
        </div>

        <div class="form-field form-field--full">
          <label class="form-label">UOM *</label>
          <select class="form-select" [(ngModel)]="priceForm.product_uom_id">
            <option value="">Seleccionar...</option>
            <option *ngFor="let uom of product?.uoms" [value]="uom.id">
              {{ uom.uom?.name || uom.name || 'Sin nombre' }}
            </option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label">PRECIO *</label>
          <input type="number" class="form-input" [(ngModel)]="priceForm.price" placeholder="0.00" step="0.01" min="0">
        </div>

        <div class="form-field">
          <label class="form-label">IVA %</label>
          <input type="number" class="form-input" [(ngModel)]="priceForm.iva_percentage" placeholder="0" step="0.01" min="0" max="100">
        </div>

        <div class="form-field form-field--full">
          <label class="form-label">IEPS %</label>
          <input type="number" class="form-input" [(ngModel)]="priceForm.ieps_percentage" placeholder="0" step="0.01" min="0" max="100">
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn--secondary" (click)="priceModalVisible = false" type="button">Cancelar</button>
        <button class="btn btn--primary" (click)="savePrice()" type="button">Guardar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Terciario: Crear Lista de Precios -->
<div class="modal-overlay" *ngIf="priceListModalVisible" (click)="priceListModalVisible = false">
  <div class="modal-container modal-container--xs" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <h2>Nueva Lista de Precios</h2>
      <button class="close-btn" (click)="priceListModalVisible = false" type="button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
      </button>
    </div>

    <div class="modal-content modal-content--compact">
      <div class="form-grid">
        <div class="form-field form-field--full">
          <label class="form-label">NOMBRE *</label>
          <input type="text" class="form-input" [(ngModel)]="priceListForm.name" placeholder="Ej: Precio Comercial">
        </div>

        <div class="form-field form-field--full">
          <label class="form-label">DESCRIPCI\xD3N</label>
          <textarea class="form-textarea" [(ngModel)]="priceListForm.description" placeholder="Descripci\xF3n opcional" rows="2"></textarea>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn--secondary" (click)="priceListModalVisible = false" type="button">Cancelar</button>
        <button class="btn btn--primary" (click)="savePriceList()" type="button">Crear</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Secundario: Costo -->
<div class="modal-overlay" *ngIf="costModalVisible" (click)="costModalVisible = false">
  <div class="modal-container modal-container--sm" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <h2>{{ costForm.id ? 'Editar Costo' : 'Nuevo Costo' }}</h2>
      <button class="close-btn" (click)="costModalVisible = false" type="button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
      </button>
    </div>

    <div class="modal-content">
      <div class="form-grid">
        <div class="form-field form-field--full">
          <label class="form-label">PROVEEDOR *</label>
          <select class="form-select" [(ngModel)]="costForm.vendor_id">
            <option value="">Seleccionar...</option>
            <option *ngFor="let vendor of vendors" [value]="vendor.id">{{ vendor.name }}</option>
          </select>
        </div>

        <div class="form-field form-field--full">
          <label class="form-label">UOM *</label>
          <select class="form-select" [(ngModel)]="costForm.product_uom_id">
            <option value="">Seleccionar...</option>
            <option *ngFor="let uom of product?.uoms" [value]="uom.id">{{ uom.uom?.name }}</option>
          </select>
        </div>

        <div class="form-field form-field--full">
          <label class="form-label">COSTO *</label>
          <input type="number" class="form-input" [(ngModel)]="costForm.cost" placeholder="0.00" step="0.01" min="0">
        </div>

        <div class="form-field">
          <label class="form-label">IVA %</label>
          <input type="number" class="form-input" [(ngModel)]="costForm.iva_percentage" placeholder="0" step="0.01" min="0">
        </div>

        <div class="form-field">
          <label class="form-label">IEPS %</label>
          <input type="number" class="form-input" [(ngModel)]="costForm.ieps_percentage" placeholder="0" step="0.01" min="0">
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn--secondary" (click)="costModalVisible = false" type="button">Cancelar</button>
        <button class="btn btn--primary" (click)="saveCost()" type="button">Guardar</button>
      </div>
    </div>
  </div>
</div>
`, styles: [`/* src/app/features/settings/components/product-detail-modal/product-detail-modal.component.scss */
.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 850px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.modal-container--sm {
  max-width: 480px;
}
.modal-container--xs {
  max-width: 400px;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
}
.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}
.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  position: relative;
}
.modal-content--compact {
  padding: 10px;
}
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6b7280;
}
.loading-container p {
  margin-top: 12px;
  font-size: 14px;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.tab-content {
  padding: 16px;
  position: relative;
}
.tab-pane {
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.tab-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: 1;
}
.form-field--full {
  grid-column: 1/-1;
}
.form-label {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.form-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.form-label-action {
  border: none;
  background: transparent;
  color: #3b82f6;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
.form-label-action:hover {
  color: #2563eb;
  text-decoration: underline;
}
.attributes-panel {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 6px 8px;
  background: #f9fafb;
}
.attribute-row {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  padding: 6px 8px;
}
.attribute-row__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}
.attribute-row__name {
  font-size: 12px;
  font-weight: 600;
  color: #111827;
  line-height: 1.3;
  min-width: 0;
}
.attribute-row__actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}
.attribute-values {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.attribute-chip {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 2px 4px 2px 6px;
  font-size: 11px;
  color: #374151;
  max-width: 100%;
}
.attribute-chip__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 160px;
}
.attribute-chip__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 3px;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: #6b7280;
  font-size: 10px;
  flex-shrink: 0;
}
.attribute-chip__btn:hover {
  background: #e5e7eb;
  color: #374151;
}
.attribute-chip__btn--danger:hover {
  background: #fee2e2;
  color: #dc2626;
}
.attribute-empty,
.attribute-empty-values {
  font-size: 11px;
  color: #9ca3af;
  padding: 2px 0;
}
.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
  box-sizing: border-box;
}
.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.form-input:disabled,
.form-select:disabled,
.form-textarea:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}
.form-input--inline,
.form-select--inline,
.form-textarea--inline {
  padding: 6px 8px;
  font-size: 12px;
}
.form-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 20px;
  padding-right: 36px;
  appearance: none;
  width: 100%;
  box-sizing: border-box;
}
.form-select option {
  padding: 8px;
}
.form-textarea {
  resize: vertical;
  min-height: 80px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}
.input-with-button {
  display: flex;
  gap: 8px;
  align-items: stretch;
}
.input-with-button .form-select {
  flex: 1;
  min-width: 0;
}
.btn-icon-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  background: white;
  color: #3b82f6;
  transition: all 0.15s;
  font-size: 16px;
  flex-shrink: 0;
}
.btn-icon-add:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn--primary {
  background: #3b82f6;
  color: white;
}
.btn--primary:hover:not(:disabled) {
  background: #2563eb;
}
.btn--secondary {
  background: #f3f4f6;
  color: #374151;
}
.btn--secondary:hover:not(:disabled) {
  background: #e5e7eb;
}
.btn--sm {
  padding: 6px 12px;
  font-size: 12px;
}
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  color: #6b7280;
  transition: all 0.15s;
}
.btn-icon:hover {
  background: #f3f4f6;
  color: #374151;
}
.btn-icon--danger:hover {
  background: #fee2e2;
  color: #dc2626;
}
.btn-icon--compact {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  font-size: 11px;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.data-table thead {
  background: #f9fafb;
}
.data-table thead th {
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}
.data-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
}
.data-table tbody tr:last-child {
  border-bottom: none;
}
.data-table tbody tr:hover {
  background: #f9fafb;
}
.data-table tbody td {
  padding: 10px 12px;
  color: #374151;
}
.uom-table td {
  vertical-align: middle;
  padding: 8px;
}
.uom-table thead th:nth-child(1),
.uom-table tbody td:nth-child(1) {
  width: 35%;
}
.uom-table thead th:nth-child(2),
.uom-table tbody td:nth-child(2) {
  width: 15%;
}
.uom-table thead th:nth-child(3),
.uom-table tbody td:nth-child(3) {
  width: 15%;
}
.uom-table thead th:nth-child(4),
.uom-table tbody td:nth-child(4) {
  width: 30%;
}
.uom-table thead th:nth-child(5),
.uom-table tbody td:nth-child(5) {
  width: 5%;
}
.row-actions {
  display: flex;
  gap: 4px;
  align-items: center;
}
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.checkbox-wrapper input[type=checkbox] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
}
.checkbox-wrapper label {
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.form-input--inline {
  padding: 6px 8px;
  font-size: 12px;
  min-width: 60px;
  width: 100%;
}
.form-select--inline {
  padding: 6px 8px;
  font-size: 12px;
  width: 100%;
}
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #9ca3af;
}
.empty-state p {
  font-size: 14px;
  margin: 0;
}
.empty-state--discounts .empty-state__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  max-width: 360px;
}
.empty-state--discounts .empty-state__title {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}
.empty-state--discounts .empty-state__subtitle {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
  line-height: 1.4;
}
.empty-state--discounts .btn {
  margin-top: 12px;
}
.discount-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.25rem;
  white-space: nowrap;
}
.discount-badge--active {
  background-color: #dcfce7;
  color: #15803d;
}
.discount-badge--inactive {
  background-color: #f3f4f6;
  color: #6b7280;
}
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.radio-option {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
}
.radio-option input {
  margin: 0;
}
.input-with-suffix {
  display: flex;
  align-items: center;
  gap: 6px;
}
.input-with-suffix .form-input {
  flex: 1;
}
.input-prefix,
.input-suffix {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}
.form-hint.discount-preview {
  margin: 8px 0 0;
  font-size: 12px;
  color: #6b7280;
}
.photo-tab {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 420px;
}
.photo-tab__preview {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  min-height: 230px;
  background: #f9fafb;
  overflow: hidden;
}
.photo-tab__preview a,
.photo-tab__preview img {
  display: block;
  width: 100%;
  height: 100%;
}
.photo-tab__preview img {
  object-fit: cover;
}
.photo-tab__empty {
  min-height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}
.hidden-file-input {
  display: none;
}
.photo-tab__upload-btn {
  align-self: flex-start;
}
@media (max-width: 768px) {
  .modal-container {
    max-width: 95vw;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .photo-tab {
    max-width: 100%;
  }
  .tab-content {
    padding: 16px;
  }
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}
:host ::ng-deep .snackbar-success {
  background-color: #10b981 !important;
  color: white !important;
}
:host ::ng-deep .snackbar-success .mat-mdc-snack-bar-label {
  color: white !important;
}
:host ::ng-deep .snackbar-success .mat-mdc-button {
  color: white !important;
}
:host ::ng-deep .snackbar-error {
  background-color: #ef4444 !important;
  color: white !important;
}
:host ::ng-deep .snackbar-error .mat-mdc-snack-bar-label {
  color: white !important;
}
:host ::ng-deep .snackbar-error .mat-mdc-button {
  color: white !important;
}
:host ::ng-deep .snackbar-info {
  background-color: #3b82f6 !important;
  color: white !important;
}
:host ::ng-deep .snackbar-info .mat-mdc-snack-bar-label {
  color: white !important;
}
:host ::ng-deep .snackbar-info .mat-mdc-button {
  color: white !important;
}
/*# sourceMappingURL=product-detail-modal.component.css.map */
`] }]
  }], () => [{ type: ProductService }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: MatDialog }, { type: ToastService }, { type: ChangeDetectorRef }, { type: NgZone }], { productUpdated: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailModalComponent, { className: "ProductDetailModalComponent", filePath: "src/app/features/settings/components/product-detail-modal/product-detail-modal.component.ts", lineNumber: 31 });
})();

// src/app/features/settings/components/warehouse-detail-modal/warehouse-detail-modal.component.ts
function WarehouseDetailModalComponent_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, " Nombre requerido (m\xEDn. 2 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
var WarehouseDetailModalComponent = class _WarehouseDetailModalComponent {
  fb;
  warehouseService;
  branchService;
  snackBar;
  dialogRef;
  data;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  isNew = true;
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  loadingBranches = signal(false, ...ngDevMode ? [{ debugName: "loadingBranches" }] : []);
  statusOptions = [
    { id: "active", name: "Activo" },
    { id: "inactive", name: "Inactivo" }
  ];
  countryOptions = [
    { id: "M\xE9xico", name: "M\xE9xico" },
    { id: "Estados Unidos", name: "Estados Unidos" },
    { id: "Canad\xE1", name: "Canad\xE1" },
    { id: "Espa\xF1a", name: "Espa\xF1a" },
    { id: "Argentina", name: "Argentina" },
    { id: "Brasil", name: "Brasil" },
    { id: "Chile", name: "Chile" },
    { id: "Colombia", name: "Colombia" },
    { id: "Per\xFA", name: "Per\xFA" },
    { id: "Venezuela", name: "Venezuela" },
    { id: "Guatemala", name: "Guatemala" },
    { id: "Honduras", name: "Honduras" },
    { id: "El Salvador", name: "El Salvador" },
    { id: "Nicaragua", name: "Nicaragua" },
    { id: "Costa Rica", name: "Costa Rica" },
    { id: "Panam\xE1", name: "Panam\xE1" },
    { id: "Cuba", name: "Cuba" },
    { id: "Rep\xFAblica Dominicana", name: "Rep\xFAblica Dominicana" },
    { id: "Puerto Rico", name: "Puerto Rico" }
  ];
  // Select configurations
  statusSelectConfig;
  countrySelectConfig;
  branchSelectConfig;
  constructor(fb, warehouseService, branchService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.warehouseService = warehouseService;
    this.branchService = branchService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isNew = !data.warehouse;
    this.form = this.createForm();
  }
  ngOnInit() {
    this.initializeSelectConfigs();
    this.loadBranches();
  }
  initializeSelectConfigs() {
    this.statusSelectConfig = {
      placeholder: "Selecciona status",
      data: this.statusOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("status"),
      name_select: "status"
    };
    this.countrySelectConfig = {
      placeholder: "Selecciona un pa\xEDs",
      data: this.countryOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("country"),
      name_select: "country"
    };
    this.branchSelectConfig = {
      placeholder: "Selecciona una sucursal (opcional)",
      data: this.branches(),
      value: "id",
      option: "display_name",
      form_control: this.form.get("billing_branch_id"),
      name_select: "billing_branch_id"
    };
  }
  loadBranches() {
    this.loadingBranches.set(true);
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches.set(branches);
        this.loadingBranches.set(false);
        this.branchSelectConfig = __spreadProps(__spreadValues({}, this.branchSelectConfig), {
          data: branches
        });
        if (this.data.warehouse) {
          this.form.patchValue(this.data.warehouse);
        }
      },
      error: () => {
        this.loadingBranches.set(false);
        if (this.data.warehouse) {
          this.form.patchValue(this.data.warehouse);
        }
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar sucursales", type: "error" },
          duration: 3e3
        });
      }
    });
  }
  getBranchLabel(branch) {
    return `${branch.code} - ${branch.city}, ${branch.state}`;
  }
  createForm() {
    return this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      code: [""],
      description: [""],
      street: [""],
      city: [""],
      state: [""],
      zip_code: [""],
      country: [""],
      billing_branch_id: [""],
      status: ["active"]
    });
  }
  save() {
    if (this.form.invalid || this.saving())
      return;
    this.saving.set(true);
    const formValue = this.form.value;
    if (this.isNew) {
      this.warehouseService.createWarehouse(formValue).subscribe({
        next: (warehouse) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Almac\xE9n creado correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(warehouse);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al crear almac\xE9n", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    } else {
      this.warehouseService.updateWarehouse(this.data.warehouse.id, formValue).subscribe({
        next: (warehouse) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Almac\xE9n actualizado correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(warehouse);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al actualizar almac\xE9n", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
  onStatusChange(event) {
    this.form.get("status")?.setValue(event.value, { emitEvent: false });
  }
  onCountryChange(event) {
    this.form.get("country")?.setValue(event.value, { emitEvent: false });
  }
  onBranchChange(event) {
    this.form.get("billing_branch_id")?.setValue(event.value, { emitEvent: false });
  }
  static \u0275fac = function WarehouseDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WarehouseDetailModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WarehouseDetailModalComponent, selectors: [["app-warehouse-detail-modal"]], decls: 51, vars: 10, consts: [[1, "warehouse-modal"], [1, "warehouse-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "warehouse-modal__body"], [3, "formGroup"], [1, "col-span-2"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "name", "placeholder", "Nombre del almac\xE9n", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["type", "text", "formControlName", "code", "placeholder", "Ej: ALM-001", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "uppercase"], [3, "changeOption", "config"], ["formControlName", "description", "placeholder", "Descripci\xF3n del almac\xE9n", "rows", "2", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "street", "placeholder", "Calle y n\xFAmero", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "city", "placeholder", "Ciudad", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "state", "placeholder", "Estado", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "zip_code", "placeholder", "C\xF3digo postal", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], [1, "warehouse-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading", "disabled"], [1, "text-xs", "text-red-600", "mt-1"]], template: function WarehouseDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function WarehouseDetailModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "form", 4)(7, "div", 5)(8, "label", 6);
      \u0275\u0275text(9, "Nombre *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "input", 7);
      \u0275\u0275template(11, WarehouseDetailModalComponent_p_11_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div")(13, "label", 6);
      \u0275\u0275text(14, "C\xF3digo");
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "input", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div")(17, "label", 6);
      \u0275\u0275text(18, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "app-select", 10);
      \u0275\u0275listener("changeOption", function WarehouseDetailModalComponent_Template_app_select_changeOption_19_listener($event) {
        return ctx.onStatusChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 5)(21, "label", 6);
      \u0275\u0275text(22, "Descripci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "textarea", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 5)(25, "label", 6);
      \u0275\u0275text(26, "Calle");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "input", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div")(29, "label", 6);
      \u0275\u0275text(30, "Ciudad");
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "input", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div")(33, "label", 6);
      \u0275\u0275text(34, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div")(37, "label", 6);
      \u0275\u0275text(38, "Pa\xEDs");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "app-select", 10);
      \u0275\u0275listener("changeOption", function WarehouseDetailModalComponent_Template_app_select_changeOption_39_listener($event) {
        return ctx.onCountryChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div")(41, "label", 6);
      \u0275\u0275text(42, "CP");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "input", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 5)(45, "label", 6);
      \u0275\u0275text(46, "Sucursal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "app-select", 10);
      \u0275\u0275listener("changeOption", function WarehouseDetailModalComponent_Template_app_select_changeOption_47_listener($event) {
        return ctx.onBranchChange($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(48, "div", 16)(49, "app-button", 17);
      \u0275\u0275listener("clicked", function WarehouseDetailModalComponent_Template_app_button_clicked_49_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "app-button", 18);
      \u0275\u0275listener("clicked", function WarehouseDetailModalComponent_Template_app_button_clicked_50_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isNew ? "Nuevo Almac\xE9n" : "Editar Almac\xE9n");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("name")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("name")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(8);
      \u0275\u0275property("config", ctx.statusSelectConfig);
      \u0275\u0275advance(20);
      \u0275\u0275property("config", ctx.countrySelectConfig);
      \u0275\u0275advance(8);
      \u0275\u0275property("config", ctx.branchSelectConfig);
      \u0275\u0275advance(3);
      \u0275\u0275property("text", ctx.isNew ? "Crear Almac\xE9n" : "Guardar Cambios")("loading", ctx.saving())("disabled", ctx.form.invalid || ctx.saving());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, ButtonComponent, SelectComponent, LucideAngularModule, LucideAngularComponent], styles: ["\n\n.warehouse-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n}\n.warehouse-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.warehouse-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.warehouse-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.warehouse-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.warehouse-modal__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div.col-span-2[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.warehouse-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=warehouse-detail-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WarehouseDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-warehouse-detail-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, LucideAngularModule], template: `<div class="warehouse-modal">\r
  <div class="warehouse-modal__header">\r
    <h2>{{ isNew ? 'Nuevo Almac\xE9n' : 'Editar Almac\xE9n' }}</h2>\r
    <lucide-icon\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="close()">\r
    </lucide-icon>\r
  </div>\r
\r
  <div class="warehouse-modal__body">\r
    <form [formGroup]="form">\r
      <!-- Nombre -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>\r
        <input\r
          type="text"\r
          formControlName="name"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Nombre del almac\xE9n">\r
        <p *ngIf="form.get('name')?.invalid && form.get('name')?.touched" class="text-xs text-red-600 mt-1">\r
          Nombre requerido (m\xEDn. 2 caracteres)\r
        </p>\r
      </div>\r
\r
      <!-- C\xF3digo -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">C\xF3digo</label>\r
        <input\r
          type="text"\r
          formControlName="code"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 uppercase"\r
          placeholder="Ej: ALM-001">\r
      </div>\r
\r
      <!-- Status -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>\r
        <app-select\r
          [config]="statusSelectConfig"\r
          (changeOption)="onStatusChange($event)">\r
        </app-select>\r
      </div>\r
\r
      <!-- Descripci\xF3n -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripci\xF3n</label>\r
        <textarea\r
          formControlName="description"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Descripci\xF3n del almac\xE9n"\r
          rows="2"></textarea>\r
      </div>\r
\r
      <!-- Direcci\xF3n -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Calle</label>\r
        <input\r
          type="text"\r
          formControlName="street"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Calle y n\xFAmero">\r
      </div>\r
\r
      <!-- Ciudad y Estado -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>\r
        <input\r
          type="text"\r
          formControlName="city"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ciudad">\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>\r
        <input\r
          type="text"\r
          formControlName="state"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Estado">\r
      </div>\r
\r
      <!-- Pa\xEDs y CP -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Pa\xEDs</label>\r
        <app-select\r
          [config]="countrySelectConfig"\r
          (changeOption)="onCountryChange($event)">\r
        </app-select>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">CP</label>\r
        <input\r
          type="text"\r
          formControlName="zip_code"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="C\xF3digo postal">\r
      </div>\r
\r
      <!-- Sucursal -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>\r
        <app-select\r
          [config]="branchSelectConfig"\r
          (changeOption)="onBranchChange($event)">\r
        </app-select>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <div class="warehouse-modal__footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      [text]="isNew ? 'Crear Almac\xE9n' : 'Guardar Cambios'"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      [disabled]="form.invalid || saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/warehouse-detail-modal/warehouse-detail-modal.component.scss */\n.warehouse-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n}\n.warehouse-modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.warehouse-modal__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.warehouse-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.warehouse-modal__header .close:hover {\n  color: #1f2937;\n}\n.warehouse-modal__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.warehouse-modal__body form {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.warehouse-modal__body form > div {\n  display: flex;\n  flex-direction: column;\n}\n.warehouse-modal__body form > div.col-span-2 {\n  grid-column: 1/-1;\n}\n.warehouse-modal__body form label {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.warehouse-modal__body form input,\n.warehouse-modal__body form select,\n.warehouse-modal__body form textarea {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.warehouse-modal__body form input:focus,\n.warehouse-modal__body form select:focus,\n.warehouse-modal__body form textarea:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.warehouse-modal__body form input:disabled,\n.warehouse-modal__body form select:disabled,\n.warehouse-modal__body form textarea:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.warehouse-modal__body form textarea {\n  resize: vertical;\n  font-family: inherit;\n}\n.warehouse-modal__body form p {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.warehouse-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=warehouse-detail-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: WarehouseService }, { type: BranchService }, { type: MatSnackBar }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WarehouseDetailModalComponent, { className: "WarehouseDetailModalComponent", filePath: "src/app/features/settings/components/warehouse-detail-modal/warehouse-detail-modal.component.ts", lineNumber: 23 });
})();

// src/app/features/settings/models/fiscal-configuration.model.ts
var FISCAL_REGIMES = [
  { id: "601", name: "601 - R\xE9gimen General de Ley Personas Morales" },
  { id: "603", name: "603 - Personas Morales con R\xE9gimen de Intereses" },
  { id: "605", name: "605 - Personas Morales con R\xE9gimen de Actividades Agr\xEDcolas" },
  { id: "606", name: "606 - Personas Morales con R\xE9gimen de Actividades Ganaderas" },
  { id: "607", name: "607 - Personas Morales con R\xE9gimen de Actividades Pesqueras" },
  { id: "608", name: "608 - Personas Morales con R\xE9gimen de Actividades Silv\xEDcolas" },
  { id: "609", name: "609 - Personas Morales con R\xE9gimen de Actividades Forestales" },
  { id: "610", name: "610 - Personas Morales con R\xE9gimen de Actividades Mineras" },
  { id: "611", name: "611 - Personas Morales con R\xE9gimen de Actividades Petroleras" },
  { id: "614", name: "614 - Personas Morales con R\xE9gimen de Actividades de Transporte" },
  { id: "616", name: "616 - Personas Morales con R\xE9gimen de Actividades de Telecomunicaciones" },
  { id: "620", name: "620 - Personas Morales con R\xE9gimen de Actividades de Servicios Financieros" },
  { id: "621", name: "621 - Personas Morales con R\xE9gimen de Actividades de Seguros" },
  { id: "622", name: "622 - Personas Morales con R\xE9gimen de Actividades de Fianzas" },
  { id: "623", name: "623 - Personas Morales con R\xE9gimen de Actividades de Fondos de Pensiones" },
  { id: "624", name: "624 - Personas Morales con R\xE9gimen de Actividades de Administraci\xF3n de Fondos" },
  { id: "625", name: "625 - Personas Morales con R\xE9gimen de Actividades de Sociedades de Inversi\xF3n" },
  { id: "626", name: "626 - Personas Morales con R\xE9gimen de Actividades de Sociedades de Cr\xE9dito" },
  { id: "627", name: "627 - Personas Morales con R\xE9gimen de Actividades de Uniones de Cr\xE9dito" },
  { id: "628", name: "628 - Personas Morales con R\xE9gimen de Actividades de Instituciones de Cr\xE9dito" },
  { id: "629", name: "629 - Personas Morales con R\xE9gimen de Actividades de Casas de Bolsa" },
  { id: "630", name: "630 - Personas Morales con R\xE9gimen de Actividades de Mercados de Futuros" }
];

// src/app/features/settings/components/branch-modal/branch-modal.component.ts
function BranchModalComponent_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " C\xF3digo requerido (m\xEDn. 2 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function BranchModalComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " Direcci\xF3n requerida (m\xEDn. 5 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function BranchModalComponent_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " Ciudad requerida ");
    \u0275\u0275elementEnd();
  }
}
function BranchModalComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " Estado requerido ");
    \u0275\u0275elementEnd();
  }
}
function BranchModalComponent_p_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " Pa\xEDs requerido ");
    \u0275\u0275elementEnd();
  }
}
function BranchModalComponent_p_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " C\xF3digo postal inv\xE1lido (5 d\xEDgitos) ");
    \u0275\u0275elementEnd();
  }
}
var BranchModalComponent = class _BranchModalComponent {
  fb;
  branchService;
  snackBar;
  dialogRef;
  data;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  isNew = true;
  statusOptions = [
    { id: 1, name: "Activo" },
    { id: 0, name: "Inactivo" }
  ];
  statusSelectConfig;
  constructor(fb, branchService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.branchService = branchService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isNew = !data.branch;
    this.form = this.createForm();
  }
  ngOnInit() {
    this.initializeSelectConfigs();
    if (this.data.branch) {
      this.form.patchValue(this.data.branch);
    }
  }
  initializeSelectConfigs() {
    this.statusSelectConfig = {
      placeholder: "Selecciona status",
      data: this.statusOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("status"),
      name_select: "status"
    };
  }
  createForm() {
    return this.fb.group({
      code: ["", [Validators.required, Validators.minLength(2)]],
      address: ["", [Validators.required, Validators.minLength(5)]],
      city: ["", [Validators.required, Validators.minLength(2)]],
      state: ["", [Validators.required, Validators.minLength(2)]],
      country: ["M\xE9xico", [Validators.required, Validators.minLength(2)]],
      postal_code: ["", [Validators.required, Validators.pattern(/^\d{5}$/)]],
      status: [1]
    });
  }
  save() {
    if (this.form.invalid || this.saving())
      return;
    this.saving.set(true);
    const formValue = this.form.value;
    if (this.isNew) {
      this.branchService.createBranch(this.data.fiscalConfigId, formValue).subscribe({
        next: (branch) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Sucursal creada correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(branch);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al crear sucursal", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    } else {
      this.branchService.updateBranch(this.data.fiscalConfigId, this.data.branch.id, formValue).subscribe({
        next: (branch) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Sucursal actualizada correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(branch);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al actualizar sucursal", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
  onStatusChange(event) {
    this.form.get("status")?.setValue(event.value, { emitEvent: false });
  }
  static \u0275fac = function BranchModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BranchModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BranchModalComponent, selectors: [["app-branch-modal"]], decls: 44, vars: 13, consts: [[1, "branch-modal"], [1, "branch-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "branch-modal__body"], [3, "formGroup"], [1, "col-span-2"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "code", "placeholder", "Ej: BRANCH-001", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["type", "text", "formControlName", "address", "placeholder", "Ej: Av. Principal 123", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "city", "placeholder", "Ej: Monterrey", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "state", "placeholder", "Ej: Nuevo Le\xF3n", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "country", "placeholder", "M\xE9xico", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "postal_code", "placeholder", "64000", "maxlength", "5", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], [3, "changeOption", "config"], [1, "branch-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading", "disabled"], [1, "text-xs", "text-red-600", "mt-1"]], template: function BranchModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function BranchModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "form", 4)(7, "div", 5)(8, "label", 6);
      \u0275\u0275text(9, "C\xF3digo *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "input", 7);
      \u0275\u0275template(11, BranchModalComponent_p_11_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 5)(13, "label", 6);
      \u0275\u0275text(14, "Direcci\xF3n *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "input", 9);
      \u0275\u0275template(16, BranchModalComponent_p_16_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div")(18, "label", 6);
      \u0275\u0275text(19, "Ciudad *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "input", 10);
      \u0275\u0275template(21, BranchModalComponent_p_21_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "label", 6);
      \u0275\u0275text(24, "Estado *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "input", 11);
      \u0275\u0275template(26, BranchModalComponent_p_26_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div")(28, "label", 6);
      \u0275\u0275text(29, "Pa\xEDs *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "input", 12);
      \u0275\u0275template(31, BranchModalComponent_p_31_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div")(33, "label", 6);
      \u0275\u0275text(34, "C\xF3digo Postal *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 13);
      \u0275\u0275template(36, BranchModalComponent_p_36_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 5)(38, "label", 6);
      \u0275\u0275text(39, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "app-select", 14);
      \u0275\u0275listener("changeOption", function BranchModalComponent_Template_app_select_changeOption_40_listener($event) {
        return ctx.onStatusChange($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(41, "div", 15)(42, "app-button", 16);
      \u0275\u0275listener("clicked", function BranchModalComponent_Template_app_button_clicked_42_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "app-button", 17);
      \u0275\u0275listener("clicked", function BranchModalComponent_Template_app_button_clicked_43_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isNew ? "Nueva Sucursal" : "Editar Sucursal");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("code")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("code")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.form.get("address")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.form.get("address")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.form.get("city")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.form.get("city")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.form.get("state")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.form.get("state")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.form.get("country")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("country")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.form.get("postal_code")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("postal_code")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275property("config", ctx.statusSelectConfig);
      \u0275\u0275advance(3);
      \u0275\u0275property("text", ctx.isNew ? "Crear Sucursal" : "Guardar Cambios")("loading", ctx.saving())("disabled", ctx.form.invalid || ctx.saving());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, ButtonComponent, SelectComponent, LucideAngularModule, LucideAngularComponent], styles: ["\n\n.branch-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n  width: 600px;\n}\n.branch-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.branch-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.branch-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.branch-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.branch-modal__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div.col-span-2[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.branch-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=branch-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchModalComponent, [{
    type: Component,
    args: [{ selector: "app-branch-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, LucideAngularModule], template: `<div class="branch-modal">\r
  <div class="branch-modal__header">\r
    <h2>{{ isNew ? 'Nueva Sucursal' : 'Editar Sucursal' }}</h2>\r
    <lucide-icon\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="close()">\r
    </lucide-icon>\r
  </div>\r
\r
  <div class="branch-modal__body">\r
    <form [formGroup]="form">\r
      <!-- C\xF3digo -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">C\xF3digo *</label>\r
        <input\r
          type="text"\r
          formControlName="code"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ej: BRANCH-001">\r
        <p *ngIf="form.get('code')?.invalid && form.get('code')?.touched" class="text-xs text-red-600 mt-1">\r
          C\xF3digo requerido (m\xEDn. 2 caracteres)\r
        </p>\r
      </div>\r
\r
      <!-- Direcci\xF3n -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Direcci\xF3n *</label>\r
        <input\r
          type="text"\r
          formControlName="address"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ej: Av. Principal 123">\r
        <p *ngIf="form.get('address')?.invalid && form.get('address')?.touched" class="text-xs text-red-600 mt-1">\r
          Direcci\xF3n requerida (m\xEDn. 5 caracteres)\r
        </p>\r
      </div>\r
\r
      <!-- Ciudad -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad *</label>\r
        <input\r
          type="text"\r
          formControlName="city"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ej: Monterrey">\r
        <p *ngIf="form.get('city')?.invalid && form.get('city')?.touched" class="text-xs text-red-600 mt-1">\r
          Ciudad requerida\r
        </p>\r
      </div>\r
\r
      <!-- Estado -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Estado *</label>\r
        <input\r
          type="text"\r
          formControlName="state"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ej: Nuevo Le\xF3n">\r
        <p *ngIf="form.get('state')?.invalid && form.get('state')?.touched" class="text-xs text-red-600 mt-1">\r
          Estado requerido\r
        </p>\r
      </div>\r
\r
      <!-- Pa\xEDs -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Pa\xEDs *</label>\r
        <input\r
          type="text"\r
          formControlName="country"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="M\xE9xico">\r
        <p *ngIf="form.get('country')?.invalid && form.get('country')?.touched" class="text-xs text-red-600 mt-1">\r
          Pa\xEDs requerido\r
        </p>\r
      </div>\r
\r
      <!-- C\xF3digo Postal -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">C\xF3digo Postal *</label>\r
        <input\r
          type="text"\r
          formControlName="postal_code"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="64000"\r
          maxlength="5">\r
        <p *ngIf="form.get('postal_code')?.invalid && form.get('postal_code')?.touched" class="text-xs text-red-600 mt-1">\r
          C\xF3digo postal inv\xE1lido (5 d\xEDgitos)\r
        </p>\r
      </div>\r
\r
      <!-- Status -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>\r
        <app-select\r
          [config]="statusSelectConfig"\r
          (changeOption)="onStatusChange($event)">\r
        </app-select>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <div class="branch-modal__footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      [text]="isNew ? 'Crear Sucursal' : 'Guardar Cambios'"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      [disabled]="form.invalid || saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/branch-modal/branch-modal.component.scss */\n.branch-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n  width: 600px;\n}\n.branch-modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.branch-modal__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.branch-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.branch-modal__header .close:hover {\n  color: #1f2937;\n}\n.branch-modal__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.branch-modal__body form {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.branch-modal__body form > div {\n  display: flex;\n  flex-direction: column;\n}\n.branch-modal__body form > div.col-span-2 {\n  grid-column: 1/-1;\n}\n.branch-modal__body form label {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.branch-modal__body form input,\n.branch-modal__body form select,\n.branch-modal__body form textarea {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.branch-modal__body form input:focus,\n.branch-modal__body form select:focus,\n.branch-modal__body form textarea:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.branch-modal__body form input:disabled,\n.branch-modal__body form select:disabled,\n.branch-modal__body form textarea:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.branch-modal__body form textarea {\n  resize: vertical;\n  font-family: inherit;\n}\n.branch-modal__body form p {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.branch-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=branch-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: BranchService }, { type: MatSnackBar }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BranchModalComponent, { className: "BranchModalComponent", filePath: "src/app/features/settings/components/branch-modal/branch-modal.component.ts", lineNumber: 21 });
})();

// src/app/features/settings/components/fiscal-configuration-modal/fiscal-configuration-modal.component.ts
function FiscalConfigurationModalComponent_div_8_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, " Raz\xF3n social requerida (m\xEDn. 2 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function FiscalConfigurationModalComponent_div_8_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, " RFC inv\xE1lido (formato: 3-4 letras + 6 d\xEDgitos + 3 alfanum\xE9ricos) ");
    \u0275\u0275elementEnd();
  }
}
function FiscalConfigurationModalComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "form", 13)(2, "div", 14)(3, "label", 15);
    \u0275\u0275text(4, "Raz\xF3n Social *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 16);
    \u0275\u0275template(6, FiscalConfigurationModalComponent_div_8_p_6_Template, 2, 0, "p", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "label", 15);
    \u0275\u0275text(9, "RFC *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 18);
    \u0275\u0275template(11, FiscalConfigurationModalComponent_div_8_p_11_Template, 2, 0, "p", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "label", 15);
    \u0275\u0275text(14, "Tipo de Persona *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "app-select", 19);
    \u0275\u0275listener("changeOption", function FiscalConfigurationModalComponent_div_8_Template_app_select_changeOption_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPersonaTypeChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 14)(17, "label", 15);
    \u0275\u0275text(18, "R\xE9gimen Fiscal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "app-select", 19);
    \u0275\u0275listener("changeOption", function FiscalConfigurationModalComponent_div_8_Template_app_select_changeOption_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFiscalRegimeChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 14)(21, "label", 15);
    \u0275\u0275text(22, "Sello Digital");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "textarea", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 14)(25, "label", 15);
    \u0275\u0275text(26, "Contrase\xF1a del Sello Digital");
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "input", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 14)(29, "label", 15);
    \u0275\u0275text(30, "Llave Privada");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "textarea", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 14)(33, "label", 15);
    \u0275\u0275text(34, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "app-select", 19);
    \u0275\u0275listener("changeOption", function FiscalConfigurationModalComponent_div_8_Template_app_select_changeOption_35_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onStatusChange($event));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.form.get("razon_social")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.form.get("razon_social")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.form.get("rfc")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.form.get("rfc")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(4);
    \u0275\u0275property("config", ctx_r1.personaTypeSelectConfig);
    \u0275\u0275advance(4);
    \u0275\u0275property("config", ctx_r1.fiscalRegimeSelectConfig);
    \u0275\u0275advance(16);
    \u0275\u0275property("config", ctx_r1.statusSelectConfig);
  }
}
function FiscalConfigurationModalComponent_div_9_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "p");
    \u0275\u0275text(2, "Cargando sucursales...");
    \u0275\u0275elementEnd()();
  }
}
function FiscalConfigurationModalComponent_div_9_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "p");
    \u0275\u0275text(2, "No hay sucursales configuradas");
    \u0275\u0275elementEnd()();
  }
}
function FiscalConfigurationModalComponent_div_9_table_6_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 33);
    \u0275\u0275listener("click", function FiscalConfigurationModalComponent_div_9_table_6_tr_16_Template_tr_click_0_listener() {
      const branch_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openBranchModal(branch_r5));
    });
    \u0275\u0275elementStart(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const branch_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r5.code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r5.address);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r5.city);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r5.state);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r5.postal_code);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("status-badge " + ctx_r1.getStatusClass(branch_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(branch_r5.status), " ");
  }
}
function FiscalConfigurationModalComponent_div_9_table_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 31)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "C\xD3DIGO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "DIRECCI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "CIUDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "ESTADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "C.P.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "STATUS");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275template(16, FiscalConfigurationModalComponent_div_9_table_6_tr_16_Template, 14, 8, "tr", 32);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.branches);
  }
}
function FiscalConfigurationModalComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 24)(2, "button", 25);
    \u0275\u0275listener("click", function FiscalConfigurationModalComponent_div_9_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openBranchModal());
    });
    \u0275\u0275text(3, " + Agregar Sucursal ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, FiscalConfigurationModalComponent_div_9_div_4_Template, 3, 0, "div", 26)(5, FiscalConfigurationModalComponent_div_9_div_5_Template, 3, 0, "div", 27)(6, FiscalConfigurationModalComponent_div_9_table_6_Template, 17, 1, "table", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.loadingBranches);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loadingBranches && ctx_r1.branches.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loadingBranches && ctx_r1.branches.length > 0);
  }
}
function FiscalConfigurationModalComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "p");
    \u0275\u0275text(2, "Guarda la configuraci\xF3n fiscal antes de subir un logo.");
    \u0275\u0275elementEnd()();
  }
}
function FiscalConfigurationModalComponent_div_10_div_2_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 43);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx_r1.logoUrl, \u0275\u0275sanitizeUrl);
  }
}
function FiscalConfigurationModalComponent_div_10_div_2_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, "Sin logo");
    \u0275\u0275elementEnd();
  }
}
function FiscalConfigurationModalComponent_div_10_div_2_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.logoFileName);
  }
}
function FiscalConfigurationModalComponent_div_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36);
    \u0275\u0275template(2, FiscalConfigurationModalComponent_div_10_div_2_img_2_Template, 1, 1, "img", 37)(3, FiscalConfigurationModalComponent_div_10_div_2_ng_template_3_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 38, 1);
    \u0275\u0275listener("change", function FiscalConfigurationModalComponent_div_10_div_2_Template_input_change_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLogoSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 39)(8, "button", 40);
    \u0275\u0275listener("click", function FiscalConfigurationModalComponent_div_10_div_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r6);
      const logoFileInput_r7 = \u0275\u0275reference(6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openLogoPicker(logoFileInput_r7));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, FiscalConfigurationModalComponent_div_10_div_2_p_10_Template, 2, 1, "p", 41);
    \u0275\u0275elementStart(11, "small", 42);
    \u0275\u0275text(12, "Formatos recomendados: PNG o JPG. Si el logo expira, vuelve a abrir esta configuraci\xF3n.");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const emptyLogo_r8 = \u0275\u0275reference(4);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.logoUrl)("ngIfElse", emptyLogo_r8);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.uploadingLogo());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.uploadingLogo() ? "Subiendo..." : "Subir logo", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.logoFileName);
  }
}
function FiscalConfigurationModalComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275template(1, FiscalConfigurationModalComponent_div_10_div_1_Template, 3, 0, "div", 27)(2, FiscalConfigurationModalComponent_div_10_div_2_Template, 13, 5, "div", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isNew);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isNew);
  }
}
function FiscalConfigurationModalComponent_app_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 46);
    \u0275\u0275listener("clicked", function FiscalConfigurationModalComponent_app_button_13_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("text", ctx_r1.isNew ? "Crear Configuraci\xF3n" : "Guardar Cambios")("loading", ctx_r1.saving())("disabled", ctx_r1.form.invalid || ctx_r1.saving());
  }
}
var FiscalConfigurationModalComponent = class _FiscalConfigurationModalComponent {
  fb;
  fiscalConfigService;
  branchService;
  snackBar;
  dialog;
  cdr;
  dialogRef;
  data;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  uploadingLogo = signal(false, ...ngDevMode ? [{ debugName: "uploadingLogo" }] : []);
  isNew = true;
  logoUrl = null;
  logoFileName = null;
  // Tabs
  tabs = [
    { id: "configuracion", title: "Configuraci\xF3n" },
    { id: "sucursales", title: "Sucursales" },
    { id: "logo", title: "Logo" }
  ];
  activeTab = "configuracion";
  // Branches
  branches = [];
  loadingBranches = false;
  personaTypeOptions = [
    { id: "Persona F\xEDsica", name: "Persona F\xEDsica" },
    { id: "Persona Moral", name: "Persona Moral" }
  ];
  statusOptions = [
    { id: "active", name: "Activo" },
    { id: "inactive", name: "Inactivo" }
  ];
  fiscalRegimes = FISCAL_REGIMES;
  // Select configurations
  personaTypeSelectConfig;
  fiscalRegimeSelectConfig;
  statusSelectConfig;
  constructor(fb, fiscalConfigService, branchService, snackBar, dialog, cdr, dialogRef, data) {
    this.fb = fb;
    this.fiscalConfigService = fiscalConfigService;
    this.branchService = branchService;
    this.snackBar = snackBar;
    this.dialog = dialog;
    this.cdr = cdr;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isNew = !data.fiscalConfig;
    this.form = this.createForm();
  }
  ngOnInit() {
    this.initializeSelectConfigs();
    if (this.data.fiscalConfig) {
      this.form.patchValue(this.data.fiscalConfig);
      this.logoUrl = this.data.fiscalConfig.logo || null;
      this.loadBranches();
    }
  }
  openLogoPicker(input) {
    if (this.uploadingLogo() || this.isNew)
      return;
    input.click();
  }
  onLogoSelected(event) {
    const input = event.target;
    const file = input.files?.[0];
    const fiscalConfig = this.data.fiscalConfig;
    if (!file || !fiscalConfig) {
      return;
    }
    this.logoFileName = file.name;
    this.uploadingLogo.set(true);
    this.fiscalConfigService.uploadFiscalLogo(fiscalConfig.id, file).subscribe({
      next: () => {
        this.fiscalConfigService.getFiscalConfiguration(fiscalConfig.id).subscribe({
          next: (updatedConfig) => {
            this.data.fiscalConfig = updatedConfig;
            this.logoUrl = updatedConfig.logo || null;
            this.uploadingLogo.set(false);
            input.value = "";
            this.cdr.detectChanges();
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: "Logo subido correctamente", type: "success" },
              duration: 3e3
            });
          },
          error: (error) => {
            this.uploadingLogo.set(false);
            input.value = "";
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: error.error?.message || "Logo subido, pero no se pudo refrescar la vista", type: "error" },
              duration: 4e3
            });
          }
        });
      },
      error: (error) => {
        this.uploadingLogo.set(false);
        input.value = "";
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || "Error al subir logo", type: "error" },
          duration: 5e3
        });
      }
    });
  }
  loadBranches() {
    if (!this.data.fiscalConfig)
      return;
    this.loadingBranches = true;
    this.branchService.getBranches(this.data.fiscalConfig.id).subscribe({
      next: (branches) => {
        this.branches = branches;
        this.loadingBranches = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error loading branches:", error);
        this.loadingBranches = false;
        this.cdr.detectChanges();
      }
    });
  }
  openBranchModal(branch) {
    if (!this.data.fiscalConfig) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: "Debes guardar la configuraci\xF3n fiscal antes de agregar sucursales", type: "error" },
        duration: 3e3
      });
      return;
    }
    const dialogRef = this.dialog.open(BranchModalComponent, {
      width: "600px",
      data: {
        fiscalConfigId: this.data.fiscalConfig.id,
        branch: branch || null
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadBranches();
      }
    });
  }
  getStatusLabel(status) {
    return status === 1 ? "Activo" : "Inactivo";
  }
  getStatusClass(status) {
    return status === 1 ? "status-active" : "status-inactive";
  }
  initializeSelectConfigs() {
    this.personaTypeSelectConfig = {
      placeholder: "Selecciona tipo de persona",
      data: this.personaTypeOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("persona_type"),
      name_select: "persona_type"
    };
    this.fiscalRegimeSelectConfig = {
      placeholder: "Selecciona un r\xE9gimen fiscal",
      data: this.fiscalRegimes,
      value: "id",
      option: "name",
      form_control: this.form.get("fiscal_regime"),
      name_select: "fiscal_regime"
    };
    this.statusSelectConfig = {
      placeholder: "Selecciona status",
      data: this.statusOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("status"),
      name_select: "status"
    };
  }
  createForm() {
    return this.fb.group({
      razon_social: ["", [Validators.required, Validators.minLength(2)]],
      rfc: ["", [Validators.required, Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/)]],
      persona_type: ["Persona Moral", [Validators.required]],
      fiscal_regime: [""],
      digital_seal: [""],
      digital_seal_password: [""],
      private_key: [""],
      status: ["active"]
    });
  }
  save() {
    if (this.form.invalid || this.saving())
      return;
    this.saving.set(true);
    const formValue = this.form.value;
    if (this.isNew) {
      this.fiscalConfigService.createFiscalConfiguration(formValue).subscribe({
        next: (config) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Configuraci\xF3n fiscal creada correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(config);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al crear configuraci\xF3n fiscal", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    } else {
      this.fiscalConfigService.updateFiscalConfiguration(this.data.fiscalConfig.id, formValue).subscribe({
        next: (config) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Configuraci\xF3n fiscal actualizada correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(config);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al actualizar configuraci\xF3n fiscal", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
  onPersonaTypeChange(event) {
    this.form.get("persona_type")?.setValue(event.value, { emitEvent: false });
  }
  onFiscalRegimeChange(event) {
    this.form.get("fiscal_regime")?.setValue(event.value, { emitEvent: false });
  }
  onStatusChange(event) {
    this.form.get("status")?.setValue(event.value, { emitEvent: false });
  }
  static \u0275fac = function FiscalConfigurationModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FiscalConfigurationModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(FiscalConfigurationService), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FiscalConfigurationModalComponent, selectors: [["app-fiscal-configuration-modal"]], decls: 14, vars: 8, consts: [["emptyLogo", ""], ["logoFileInput", ""], [1, "fiscal-modal"], [1, "fiscal-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "fiscal-modal__body"], [3, "tabChange", "tabs", "activeTabId"], [1, "tab-content"], ["class", "tab-pane", 4, "ngIf"], [1, "fiscal-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "text", "loading", "disabled", "clicked", 4, "ngIf"], [1, "tab-pane"], [3, "formGroup"], [1, "col-span-2"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "razon_social", "placeholder", "Raz\xF3n social de la empresa", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["type", "text", "formControlName", "rfc", "placeholder", "Ej: GMM140115PIA", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "uppercase"], [3, "changeOption", "config"], ["formControlName", "digital_seal", "placeholder", "Certificado digital (PEM format)", "rows", "3", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "font-mono", "text-xs"], ["type", "password", "formControlName", "digital_seal_password", "placeholder", "Contrase\xF1a del certificado", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["formControlName", "private_key", "placeholder", "Llave privada (PEM format)", "rows", "3", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "font-mono", "text-xs"], [1, "text-xs", "text-red-600", "mt-1"], [1, "tab-header"], ["type", "button", 1, "btn", "btn--sm", "btn--primary", 3, "click"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "data-table", 4, "ngIf"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], ["class", "clickable-row", 3, "click", 4, "ngFor", "ngForOf"], [1, "clickable-row", 3, "click"], ["class", "logo-tab", 4, "ngIf"], [1, "logo-tab"], [1, "logo-preview"], ["alt", "Logo fiscal", 3, "src", 4, "ngIf", "ngIfElse"], ["type", "file", "accept", "image/png,image/jpeg,image/jpg,image/webp", 1, "hidden-file-input", 3, "change"], [1, "logo-actions"], ["type", "button", 1, "logo-upload-btn", 3, "click", "disabled"], ["class", "logo-file-name", 4, "ngIf"], [1, "logo-help"], ["alt", "Logo fiscal", 3, "src"], [1, "logo-placeholder"], [1, "logo-file-name"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading", "disabled"]], template: function FiscalConfigurationModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 4);
      \u0275\u0275listener("click", function FiscalConfigurationModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 5)(6, "app-tab", 6);
      \u0275\u0275listener("tabChange", function FiscalConfigurationModalComponent_Template_app_tab_tabChange_6_listener($event) {
        return ctx.activeTab = $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 7);
      \u0275\u0275template(8, FiscalConfigurationModalComponent_div_8_Template, 36, 6, "div", 8)(9, FiscalConfigurationModalComponent_div_9_Template, 7, 3, "div", 8)(10, FiscalConfigurationModalComponent_div_10_Template, 3, 2, "div", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 9)(12, "app-button", 10);
      \u0275\u0275listener("clicked", function FiscalConfigurationModalComponent_Template_app_button_clicked_12_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(13, FiscalConfigurationModalComponent_app_button_13_Template, 1, 3, "app-button", 11);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isNew ? "Nueva Configuraci\xF3n Fiscal" : "Editar Configuraci\xF3n Fiscal");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("tabs", ctx.tabs)("activeTabId", ctx.activeTab);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.activeTab === "configuracion");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeTab === "sucursales");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeTab === "logo");
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.activeTab === "configuracion");
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, ButtonComponent, SelectComponent, TabComponent, LucideAngularModule, LucideAngularComponent], styles: ["\n\n.fiscal-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n}\n.fiscal-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.fiscal-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.fiscal-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.fiscal-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.fiscal-modal__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-pane[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-in;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 1rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-header[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: none;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-header[_ngcontent-%COMP%]   .btn--primary[_ngcontent-%COMP%] {\n  background-color: #3b82f6;\n  color: white;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-header[_ngcontent-%COMP%]   .btn--primary[_ngcontent-%COMP%]:hover {\n  background-color: #2563eb;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-header[_ngcontent-%COMP%]   .btn--sm[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.8125rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  text-align: center;\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .logo-tab[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  max-width: 420px;\n  margin: 0 auto;\n  align-items: center;\n  text-align: center;\n  width: 100%;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .logo-preview[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 180px;\n  border: 1px dashed #d1d5db;\n  border-radius: 8px;\n  background: #f9fafb;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .logo-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 260px;\n  object-fit: contain;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .logo-preview[_ngcontent-%COMP%]   .logo-placeholder[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .logo-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  align-items: center;\n  width: 100%;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .logo-file-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: #4b5563;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .logo-help[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.75rem;\n  text-align: center;\n  max-width: 420px;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .logo-upload-btn[_ngcontent-%COMP%] {\n  min-width: 180px;\n  padding: 0.55rem 1rem;\n  border: none;\n  border-radius: 8px;\n  background: #3b82f6;\n  color: #ffffff;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .logo-upload-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #2563eb;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .logo-upload-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1rem;\n  text-align: center;\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background-color: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  text-align: left;\n  font-weight: 600;\n  color: #374151;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n  transition: background-color 0.15s;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.clickable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.clickable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  color: #1f2937;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .status-badge.status-active[_ngcontent-%COMP%] {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .status-badge.status-inactive[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 1.5rem;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div.col-span-2[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.fiscal-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n.hidden-file-input[_ngcontent-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=fiscal-configuration-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FiscalConfigurationModalComponent, [{
    type: Component,
    args: [{ selector: "app-fiscal-configuration-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, TabComponent, LucideAngularModule], template: `<div class="fiscal-modal">
  <div class="fiscal-modal__header">
    <h2>{{ isNew ? 'Nueva Configuraci\xF3n Fiscal' : 'Editar Configuraci\xF3n Fiscal' }}</h2>
    <lucide-icon
      [img]="X"
      class="close cursor-pointer"
      (click)="close()">
    </lucide-icon>
  </div>

  <div class="fiscal-modal__body">
    <!-- Tabs -->
    <app-tab [tabs]="tabs" [activeTabId]="activeTab" (tabChange)="activeTab = $event"></app-tab>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Tab: Configuraci\xF3n -->
      <div *ngIf="activeTab === 'configuracion'" class="tab-pane">
        <form [formGroup]="form">
          <!-- Raz\xF3n Social -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Raz\xF3n Social *</label>
            <input
              type="text"
              formControlName="razon_social"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Raz\xF3n social de la empresa">
            <p *ngIf="form.get('razon_social')?.invalid && form.get('razon_social')?.touched" class="text-xs text-red-600 mt-1">
              Raz\xF3n social requerida (m\xEDn. 2 caracteres)
            </p>
          </div>

          <!-- RFC -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">RFC *</label>
            <input
              type="text"
              formControlName="rfc"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 uppercase"
              placeholder="Ej: GMM140115PIA">
            <p *ngIf="form.get('rfc')?.invalid && form.get('rfc')?.touched" class="text-xs text-red-600 mt-1">
              RFC inv\xE1lido (formato: 3-4 letras + 6 d\xEDgitos + 3 alfanum\xE9ricos)
            </p>
          </div>

          <!-- Tipo de Persona -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Persona *</label>
            <app-select
              [config]="personaTypeSelectConfig"
              (changeOption)="onPersonaTypeChange($event)">
            </app-select>
          </div>

          <!-- R\xE9gimen Fiscal -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">R\xE9gimen Fiscal</label>
            <app-select
              [config]="fiscalRegimeSelectConfig"
              (changeOption)="onFiscalRegimeChange($event)">
            </app-select>
          </div>

          <!-- Sello Digital -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Sello Digital</label>
            <textarea
              formControlName="digital_seal"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              placeholder="Certificado digital (PEM format)"
              rows="3"></textarea>
          </div>

          <!-- Contrase\xF1a del Sello -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Contrase\xF1a del Sello Digital</label>
            <input
              type="password"
              formControlName="digital_seal_password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Contrase\xF1a del certificado">
          </div>

          <!-- Llave Privada -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Llave Privada</label>
            <textarea
              formControlName="private_key"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              placeholder="Llave privada (PEM format)"
              rows="3"></textarea>
          </div>

          <!-- Status -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <app-select
              [config]="statusSelectConfig"
              (changeOption)="onStatusChange($event)">
            </app-select>
          </div>
        </form>
      </div>

      <!-- Tab: Sucursales -->
      <div *ngIf="activeTab === 'sucursales'" class="tab-pane">
        <div class="tab-header">
          <button class="btn btn--sm btn--primary" (click)="openBranchModal()" type="button">
            + Agregar Sucursal
          </button>
        </div>

        <div *ngIf="loadingBranches" class="loading-state">
          <p>Cargando sucursales...</p>
        </div>

        <div *ngIf="!loadingBranches && branches.length === 0" class="empty-state">
          <p>No hay sucursales configuradas</p>
        </div>

        <table *ngIf="!loadingBranches && branches.length > 0" class="data-table">
          <thead>
            <tr>
              <th>C\xD3DIGO</th>
              <th>DIRECCI\xD3N</th>
              <th>CIUDAD</th>
              <th>ESTADO</th>
              <th>C.P.</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let branch of branches" (click)="openBranchModal(branch)" class="clickable-row">
              <td>{{ branch.code }}</td>
              <td>{{ branch.address }}</td>
              <td>{{ branch.city }}</td>
              <td>{{ branch.state }}</td>
              <td>{{ branch.postal_code }}</td>
              <td>
                <span [class]="'status-badge ' + getStatusClass(branch.status)">
                  {{ getStatusLabel(branch.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Tab: Logo -->
      <div *ngIf="activeTab === 'logo'" class="tab-pane">
        <div *ngIf="isNew" class="empty-state">
          <p>Guarda la configuraci\xF3n fiscal antes de subir un logo.</p>
        </div>

        <div *ngIf="!isNew" class="logo-tab">
          <div class="logo-preview">
            <img *ngIf="logoUrl; else emptyLogo" [src]="logoUrl" alt="Logo fiscal" />
            <ng-template #emptyLogo>
              <div class="logo-placeholder">Sin logo</div>
            </ng-template>
          </div>

          <input
            #logoFileInput
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            class="hidden-file-input"
            (change)="onLogoSelected($event)"
          />

          <div class="logo-actions">
            <button
              type="button"
              class="logo-upload-btn"
              (click)="openLogoPicker(logoFileInput)"
              [disabled]="uploadingLogo()"
            >
              {{ uploadingLogo() ? 'Subiendo...' : 'Subir logo' }}
            </button>
            <p *ngIf="logoFileName" class="logo-file-name">{{ logoFileName }}</p>
            <small class="logo-help">Formatos recomendados: PNG o JPG. Si el logo expira, vuelve a abrir esta configuraci\xF3n.</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="fiscal-modal__footer">
    <app-button
      text="Cancelar"
      custom_class="btn_secondary"
      (clicked)="close()">
    </app-button>
    <app-button
      *ngIf="activeTab === 'configuracion'"
      [text]="isNew ? 'Crear Configuraci\xF3n' : 'Guardar Cambios'"
      custom_class="btn_primary"
      [loading]="saving()"
      [disabled]="form.invalid || saving()"
      (clicked)="save()">
    </app-button>
  </div>
</div>
`, styles: ["/* src/app/features/settings/components/fiscal-configuration-modal/fiscal-configuration-modal.component.scss */\n.fiscal-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n}\n.fiscal-modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.fiscal-modal__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.fiscal-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.fiscal-modal__header .close:hover {\n  color: #1f2937;\n}\n.fiscal-modal__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.fiscal-modal__body .tab-content {\n  margin-top: 1rem;\n}\n.fiscal-modal__body .tab-pane {\n  animation: fadeIn 0.2s ease-in;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.fiscal-modal__body .tab-header {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 1rem;\n}\n.fiscal-modal__body .tab-header .btn {\n  padding: 0.5rem 1rem;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: none;\n}\n.fiscal-modal__body .tab-header .btn--primary {\n  background-color: #3b82f6;\n  color: white;\n}\n.fiscal-modal__body .tab-header .btn--primary:hover {\n  background-color: #2563eb;\n}\n.fiscal-modal__body .tab-header .btn--sm {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.8125rem;\n}\n.fiscal-modal__body .empty-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  text-align: center;\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body .logo-tab {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  max-width: 420px;\n  margin: 0 auto;\n  align-items: center;\n  text-align: center;\n  width: 100%;\n}\n.fiscal-modal__body .logo-preview {\n  width: 100%;\n  min-height: 180px;\n  border: 1px dashed #d1d5db;\n  border-radius: 8px;\n  background: #f9fafb;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n.fiscal-modal__body .logo-preview img {\n  width: 100%;\n  max-height: 260px;\n  object-fit: contain;\n}\n.fiscal-modal__body .logo-preview .logo-placeholder {\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.fiscal-modal__body .logo-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  align-items: center;\n  width: 100%;\n}\n.fiscal-modal__body .logo-file-name {\n  margin: 0;\n  font-size: 0.8rem;\n  color: #4b5563;\n}\n.fiscal-modal__body .logo-help {\n  color: #6b7280;\n  font-size: 0.75rem;\n  text-align: center;\n  max-width: 420px;\n}\n.fiscal-modal__body .logo-upload-btn {\n  min-width: 180px;\n  padding: 0.55rem 1rem;\n  border: none;\n  border-radius: 8px;\n  background: #3b82f6;\n  color: #ffffff;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.fiscal-modal__body .logo-upload-btn:hover:not(:disabled) {\n  background: #2563eb;\n}\n.fiscal-modal__body .logo-upload-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.fiscal-modal__body .loading-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1rem;\n  text-align: center;\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body .data-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body .data-table thead {\n  background-color: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n.fiscal-modal__body .data-table thead th {\n  padding: 0.75rem 1rem;\n  text-align: left;\n  font-weight: 600;\n  color: #374151;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.fiscal-modal__body .data-table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n  transition: background-color 0.15s;\n}\n.fiscal-modal__body .data-table tbody tr.clickable-row {\n  cursor: pointer;\n}\n.fiscal-modal__body .data-table tbody tr.clickable-row:hover {\n  background-color: #f3f4f6;\n}\n.fiscal-modal__body .data-table tbody tr:hover {\n  background-color: #f9fafb;\n}\n.fiscal-modal__body .data-table tbody tr td {\n  padding: 0.75rem 1rem;\n  color: #1f2937;\n}\n.fiscal-modal__body .data-table .status-badge {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.fiscal-modal__body .data-table .status-badge.status-active {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.fiscal-modal__body .data-table .status-badge.status-inactive {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.fiscal-modal__body .form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 1.5rem;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.fiscal-modal__body form {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.fiscal-modal__body form > div {\n  display: flex;\n  flex-direction: column;\n}\n.fiscal-modal__body form > div.col-span-2 {\n  grid-column: 1/-1;\n}\n.fiscal-modal__body form label {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.fiscal-modal__body form input,\n.fiscal-modal__body form select,\n.fiscal-modal__body form textarea {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.fiscal-modal__body form input:focus,\n.fiscal-modal__body form select:focus,\n.fiscal-modal__body form textarea:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.fiscal-modal__body form input:disabled,\n.fiscal-modal__body form select:disabled,\n.fiscal-modal__body form textarea:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.fiscal-modal__body form textarea {\n  resize: vertical;\n  font-family: inherit;\n}\n.fiscal-modal__body form p {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.fiscal-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n.hidden-file-input {\n  display: none;\n}\n/*# sourceMappingURL=fiscal-configuration-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: FiscalConfigurationService }, { type: BranchService }, { type: MatSnackBar }, { type: MatDialog }, { type: ChangeDetectorRef }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FiscalConfigurationModalComponent, { className: "FiscalConfigurationModalComponent", filePath: "src/app/features/settings/components/fiscal-configuration-modal/fiscal-configuration-modal.component.ts", lineNumber: 25 });
})();

export {
  ProductService,
  CategoriesDialogComponent,
  ProductDetailModalComponent,
  WarehouseDetailModalComponent,
  FiscalConfigurationModalComponent
};
//# sourceMappingURL=chunk-WDAA42IK.js.map
