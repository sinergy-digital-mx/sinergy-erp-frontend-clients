import { Component, EventEmitter, Output, Inject, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { ToastType } from '../../../../core/models/toast.model';
import { AuthService } from '../../../../core/services/auth.service';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { ProductService } from '../../services/product.service';
import { SETTINGS_PERMISSIONS } from '../../config/permissions.config';
import {
  Product,
  UoM,
  UoMCatalog,
  ProductPrice,
  ProductDiscount,
  ProductDiscountType,
  VendorProductPrice,
  ProductAttribute,
  ProductAttributeValue
} from '../../models/product.model';
import { CategoriesDialogComponent } from '../categories-dialog/categories-dialog.component';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TabComponent],
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss']
})
export class ProductDetailModalComponent implements OnInit {
  @Output() productUpdated = new EventEmitter<void>();

  visible = true;
  loading = false;
  saving = false;
  uploadingPhoto = false;
  product: Product | null = null;

  // Exponer Number para el template
  Number = Number;

  tabs: TabItem[] = [
    { id: 'detalles', title: 'Detalles' },
    { id: 'uoms', title: 'UOMs' },
    { id: 'precios', title: 'Precios' },
    { id: 'descuentos', title: 'Descuentos' },
    { id: 'costos', title: 'Costos de Proveedor' },
    { id: 'fotos', title: 'Fotos' }
  ];
  activeTab = 'detalles';

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
    if (tabId === 'uoms') {
      if (this.product?.id) {
        this.loadUomCatalog(() => this.loadProductUoms());
      } else {
        this.loadUomCatalog();
      }
    }
    if (tabId === 'descuentos' && this.product?.id) {
      this.loadProductDiscounts();
    }
  }

  get productPhotoUrl(): string | null {
    if (!this.product) return null;
    if (typeof this.product.photo === 'string' && this.product.photo.trim().length > 0) {
      return this.product.photo;
    }
    const firstPhoto = this.product.photos?.[0];
    return firstPhoto?.signed_url || firstPhoto?.s3_key || null;
  }

  // Catálogos
  categories: any[] = [];
  subcategories: any[] = [];
  uomCatalog: any[] = [];
  vendors: any[] = [];
  priceLists: any[] = [];

  readonly canUpdateProduct: boolean;
  readonly canDeleteProduct: boolean;

  // Modales secundarios
  priceModalVisible = false;
  costModalVisible = false;
  discountModalVisible = false;
  priceListModalVisible = false;
  attributeModalVisible = false;
  attributeValueModalVisible = false;

  // Formularios de modales secundarios
  priceForm: any = this.getEmptyPriceForm();
  costForm: any = this.getEmptyCostForm();
  discountForm: any = this.getEmptyDiscountForm();
  priceListForm: any = { name: '', description: '' };
  attributeForm: any = this.getEmptyAttributeForm();
  attributeValueForm: any = this.getEmptyAttributeValueForm();

  productAttributes: ProductAttribute[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product; isNew?: boolean },
    private dialogRef: MatDialogRef<ProductDetailModalComponent>,
    private dialog: MatDialog,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.canUpdateProduct = this.authService.hasPermission(SETTINGS_PERMISSIONS.products.update);
    this.canDeleteProduct = this.authService.hasPermission(SETTINGS_PERMISSIONS.products.delete);
    console.log('ProductDetailModal constructor - data:', data);
    
    // Timeout de seguridad para evitar loading infinito
    setTimeout(() => {
      if (this.loading) {
        console.error('Loading timeout - forcing loading to false');
        this.loading = false;
        this.showNotification('Error: El producto tardó demasiado en cargar. Por favor intenta de nuevo.', 'error');
      }
    }, 10000); // 10 segundos
  }

  showNotification(message: string, type: ToastType | 'info' = 'success'): void {
    const toastType: ToastType = type === 'info' ? 'info' : type;
    this.toast.show(message, toastType);
  }

  ngOnInit(): void {
    console.log('ProductDetailModal ngOnInit - data:', this.data);
    
    // Si recibimos un producto, cargar su detalle completo del backend
    if (this.data?.product) {
      console.log('Loading full product details for:', this.data.product.id);
      this.loadProduct(this.data.product.id);
    } else {
      // Crear nuevo producto
      console.log('Creating new product');
      this.product = {
        id: '',
        sku: '',
        external_sku: '',
        name: '',
        description: '',
        sat_code: '',
        category_id: '',
        subcategory_id: '',
        base_uom_id: '',
        category: null,
        subcategory: null,
        base_uom: null,
        uoms: [],
        prices: [],
        discounts: [],
        vendor_prices: [],
        photos: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as any;
      this.loading = false;
      this.cdr.detectChanges();
      
      // Cargar catálogos en background
      setTimeout(() => {
        this.loadCatalogs();
        this.loadUomCatalog();
      }, 100);
    }
  }

  loadProduct(productId: string): void {
    this.loading = true;
    this.cdr.detectChanges();
    console.log('Starting to load product:', productId);
    
    this.productService.getProduct(productId).subscribe({
      next: (product) => {
        console.log('Full product loaded:', product);
        this.product = this.normalizeProductSatFields(product);
        console.log('Product category_id:', this.product.category_id);
        console.log('Product subcategory_id:', this.product.subcategory_id);
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Loading set to false and change detected');
        
        // Cargar catálogos (sin UOM duplicado; UOM se encadena abajo)
        this.loadCatalogs();

        // Catálogo UOM (merge) y luego filas asignadas — evita que el <select> no tenga la opción del UUID guardado
        this.loadUomCatalog(() => this.loadProductUoms());
        
        // Cargar precios del producto
        this.loadProductPrices();
        
        // Cargar costos de proveedor
        this.loadVendorCosts();
        
        // Cargar subcategorías si tiene categoría
        if (this.product.category_id) {
          console.log('Loading subcategories for category:', this.product.category_id);
          this.loadSubcategories(this.product.category_id);
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Error al cargar el producto', 'error');
        this.hide();
      }
    });
  }

  loadProductPrices(): void {
    if (!this.product) return;
    
    this.productService.getProductPrices(this.product.id).subscribe({
      next: (prices) => {
        console.log('Product prices loaded:', prices);
        this.product!.prices = prices;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading product prices:', error);
        // Si falla, inicializar array vacío
        if (this.product) {
          this.product.prices = [];
        }
      }
    });
  }

  loadProductDiscounts(): void {
    if (!this.product?.id) return;

    this.productService.getProductDiscounts(this.product.id).subscribe({
      next: (discounts) => {
        this.product!.discounts = discounts;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading product discounts:', error);
        if (this.product) {
          this.product.discounts = [];
        }
      }
    });
  }

  loadVendorCosts(): void {
    if (!this.product) return;
    
    this.productService.getVendorCosts(this.product.id).subscribe({
      next: (costs) => {
        console.log('Vendor costs loaded:', costs);
        this.product!.vendor_costs = costs;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading vendor costs:', error);
        // Si falla, inicializar array vacío
        if (this.product) {
          this.product.vendor_costs = [];
        }
      }
    });
  }

  loadVendors(): void {
    this.productService.getVendors({ is_active: true }).subscribe({
      next: (vendors) => {
        this.vendors = vendors;
        this.cdr.detectChanges();
        console.log('Vendors loaded:', this.vendors.length);
      },
      error: (error) => {
        console.error('Error loading vendors:', error);
      }
    });
  }

  /**
   * @param catalogSnapshot Tras guardar: ids de fila UOM → `uom_catalog_id` elegido en UI; si el GET viene
   * desfasado (sigue Pieza), se reaplica lo que el usuario guardó y se sincroniza `uom` con el catálogo.
   */
  loadProductUoms(catalogSnapshot?: Map<string, string>): void {
    if (!this.product) return;

    this.productService.getAssignedUoMs(this.product.id).subscribe({
      next: (uoms) => {
        console.log('Product UOMs loaded:', uoms);
        this.product!.uoms = this.mapAssignedUomsResponse(uoms);
        this.reconcileUomsAfterLoad(catalogSnapshot);
        this.mergeAssignedUomIdsIntoCatalog();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading product UOMs:', error);
        // Si falla, inicializar array vacío
        if (this.product) {
          this.product.uoms = [];
        }
      }
    });
  }

  hide(): void {
    this.dialogRef.close(true);
  }

  loadCatalogs(): void {
    // Cargar categorías
    this.productService.getCategories().subscribe({
      next: (response) => {
        this.categories = [...(response.data || [])];
        this.cdr.detectChanges();
        console.log('Categories loaded:', this.categories.length);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });

    // No cargar price lists aquí, se cargarán solo cuando se abra el tab de precios
    this.loadProductAttributes();
  }

  /**
   * Catálogo del <select>: mezcla catálogo global + catálogo por producto para que aparezcan
   * todas las unidades asignables (p. ej. FBM) y coincidan los UUID con `uom_catalog_id`.
   */
  private loadUomCatalog(onComplete?: () => void): void {
    const productId = this.product?.id;

    if (!productId) {
      this.productService.getUOMCatalog().subscribe({
        next: (raw: any) => {
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
      forProduct: this.productService
        .getUOMCatalogForProduct(productId)
        .pipe(catchError(() => of([] as UoMCatalog[])))
    }).subscribe({
      next: ({ global, forProduct }) => {
        const g = Array.isArray(global) ? global : [];
        const p = Array.isArray(forProduct) ? forProduct : [];
        this.uomCatalog = this.mergeUomCatalogLists(g, p);
        this.mergeAssignedUomIdsIntoCatalog();
        this.cdr.detectChanges();
        console.log('UOM catalog merged:', this.uomCatalog.length);
        onComplete?.();
      },
      error: () => {
        this.productService.getUOMCatalog().subscribe({
          next: (raw: any) => {
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

  private normalizeUomCatalogList(raw: any): any[] {
    if (Array.isArray(raw)) return raw;
    if (raw?.data && Array.isArray(raw.data)) return raw.data;
    return [];
  }

  /** Une dos listas de catálogo UOM sin duplicar por id. */
  private mergeUomCatalogLists(global: any[], forProduct: any[]): any[] {
    const map = new Map<string, any>();
    for (const c of global || []) {
      const row = this.normalizeCatalogOption(c);
      if (row?.id) map.set(row.id, row);
    }
    for (const c of forProduct || []) {
      const row = this.normalizeCatalogOption(c);
      if (row?.id && !map.has(row.id)) map.set(row.id, row);
    }
    return Array.from(map.values());
  }

  /** Algunos APIs usan otra clave para el id del catálogo. */
  private normalizeCatalogOption(c: any): { id: string; name: string } | null {
    if (!c) return null;
    const id = c.id ?? c.uom_catalog_id ?? c.catalog_id;
    if (id == null || id === '') return null;
    const name = c.name ?? c.uom_name ?? c.description ?? String(id);
    return { ...c, id: String(id), name: String(name) };
  }

  /** Si el producto ya tiene un `uom_catalog_id` que no está en el catálogo, agrega opción para que el <select> no “rebote”. */
  private mergeAssignedUomIdsIntoCatalog(): void {
    if (!this.product?.uoms?.length) return;
    const byId = new Map<string, any>(this.uomCatalog.map((c: any) => [String(c.id), c]));
    for (const u of this.product.uoms) {
      const cid = String(u.uom_catalog_id || u.uom?.id || '').trim();
      if (!cid || byId.has(cid)) continue;
      const name = u.uom?.name || u.uom_catalog?.name || 'Unidad';
      const row = { id: cid, name: `${name} (${cid.slice(0, 8)}…)` };
      byId.set(cid, row);
    }
    this.uomCatalog = Array.from(byId.values());
  }

  private mapAssignedUomsResponse(uoms: any[] | null | undefined): any[] {
    return (uoms || []).map((u: any) => {
      if (!u) return u;
      let cid = u.uom_catalog_id;
      if (cid == null || cid === '') {
        cid = u.uom?.id;
      }
      return { ...u, uom_catalog_id: cid != null && cid !== '' ? String(cid) : '' };
    });
  }

  /**
   * Corrige filas donde el API devuelve `uom_catalog_id` y `uom` desalineados, y opcionalmente reaplica
   * lo que el usuario acaba de guardar si el GET aún trae el catálogo anterior (típico al editar Pieza → FBM).
   */
  private reconcileUomsAfterLoad(catalogSnapshot?: Map<string, string>): void {
    if (!this.product?.uoms?.length) return;

    for (const u of this.product.uoms) {
      if (!u?.id) continue;
      const rowId = String(u.id);
      const wanted = catalogSnapshot?.get(rowId);
      const flat = String(u.uom_catalog_id || '');
      const nested = String(u.uom?.id || '');

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
  trackByUomRow(_index: number, uom: any): string {
    return uom?.id || uom?._clientRowId || `row-${_index}`;
  }

  loadSubcategories(categoryId: string): void {
    this.productService.getSubCategories(categoryId).subscribe({
      next: (response) => {
        this.subcategories = [...(response.data || [])];
        this.cdr.detectChanges();
        console.log('Subcategories loaded:', this.subcategories.length);
      },
      error: (error) => {
        console.error('Error loading subcategories:', error);
      }
    });
  }

  /** Unifica SAT del API (`sat_code` / `codigo_sat`) en `sat_code` para el formulario. */
  private normalizeProductSatFields(product: Product): Product {
    const p = product as Product & { codigo_sat?: string | null };
    if ((p.sat_code == null || p.sat_code === '') && p.codigo_sat) {
      p.sat_code = p.codigo_sat;
    }
    return p;
  }

  onCategoryChange(categoryId: string): void {
    if (!this.product) return;
    this.product.subcategory_id = null;
    this.product.subcategory = null;
    this.subcategories = [];
    if (categoryId) {
      this.loadSubcategories(categoryId);
    }
  }

  openCategoriesDialog(): void {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      width: '600px',
      height: '600px',
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

  loadProductAttributes(): void {
    this.productService
      .getProductAttributes({
        limit: 200,
        include_values: true
      })
      .pipe(
        finalize(() => {
          this.ngZone.run(() => this.cdr.detectChanges());
        })
      )
      .subscribe({
        next: (response) => {
          const list = this.parseProductAttributesResponse(response);
          // Nueva referencia para que *ngFor detecte cambios tras guardar
          this.ngZone.run(() => {
            this.productAttributes = [...list];
          });
        },
        error: (error) => {
          console.error('Error loading product attributes:', error);
          this.showNotification(
            error.error?.message || 'Error al cargar atributos del catálogo',
            'error'
          );
        }
      });
  }

  /** Cierra modal de atributo y sincroniza lista desde API (MatDialog + overlay). */
  dismissAttributeModal(): void {
    this.attributeModalVisible = false;
    this.refreshAttributesAfterModalClose();
  }

  /** Cierra modal de valor y sincroniza lista desde API. */
  dismissAttributeValueModal(): void {
    this.attributeValueModalVisible = false;
    this.refreshAttributesAfterModalClose();
  }

  /** Soporta varias formas de respuesta del listado de atributos. */
  private parseProductAttributesResponse(res: any): ProductAttribute[] {
    const rawList = this.extractAttributesArray(res);
    return rawList.map((a) => this.normalizeAttributeRow(a));
  }

  private extractAttributesArray(res: any): any[] {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.items)) return res.items;
    if (Array.isArray(res.attributes)) return res.attributes;
    if (res.data && Array.isArray(res.data.data)) return res.data.data;
    if (res.data && Array.isArray(res.data.items)) return res.data.items;
    return [];
  }

  /** Normaliza `values` según distintas formas del API. */
  private normalizeAttributeRow(raw: any): ProductAttribute {
    const a = raw as ProductAttribute;
    return {
      ...a,
      values: this.parseAttributeValuesList(raw)
    };
  }

  private parseAttributeValuesList(attr: any): ProductAttributeValue[] {
    if (!attr) return [];
    if (Array.isArray(attr.values)) return attr.values;
    if (Array.isArray(attr.attribute_values)) return attr.attribute_values;
    if (Array.isArray(attr.product_attribute_values)) return attr.product_attribute_values;
    if (attr.data && Array.isArray(attr.data.values)) return attr.data.values;
    return [];
  }

  /** Tras cerrar modales overlay, forzar recarga en el siguiente tick para que la vista se actualice. */
  private refreshAttributesAfterModalClose(): void {
    setTimeout(() => {
      this.ngZone.run(() => this.loadProductAttributes());
    }, 0);
  }

  /** Recarga categorías, subcategorías y atributos del tenant en la pestaña Detalles. */
  private refreshDetallesSection(): void {
    this.loadCatalogs();
    if (this.product?.category_id) {
      this.loadSubcategories(this.product.category_id);
    } else {
      this.subcategories = [];
      this.cdr.detectChanges();
    }
  }

  openAttributeModal(attribute?: ProductAttribute): void {
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

  saveAttribute(): void {
    if (!this.attributeForm.name || !this.attributeForm.name.trim()) {
      this.showNotification('El nombre del atributo es requerido', 'error');
      return;
    }

    const body = {
      name: this.attributeForm.name.trim(),
      description: '',
      is_active: this.attributeForm.is_active ?? true
    };

    if (this.attributeForm.id) {
      this.productService.updateProductAttribute(this.attributeForm.id, body).subscribe({
        next: () => {
          this.showNotification('Atributo actualizado correctamente', 'success');
          this.dismissAttributeModal();
        },
        error: (error) => {
          console.error('Error updating attribute:', error);
          this.showNotification(error.error?.message || 'Error al actualizar atributo', 'error');
        }
      });
      return;
    }

    this.productService.createProductAttribute(body).subscribe({
      next: () => {
        this.showNotification('Atributo creado correctamente', 'success');
        this.dismissAttributeModal();
      },
      error: (error) => {
        console.error('Error creating attribute:', error);
        this.showNotification(error.error?.message || 'Error al crear atributo', 'error');
      }
    });
  }

  deleteAttribute(attribute: ProductAttribute): void {
    if (!confirm(`¿Eliminar atributo "${attribute.name}"?`)) return;

    this.productService.deleteProductAttribute(attribute.id).subscribe({
      next: () => {
        this.showNotification('Atributo eliminado correctamente', 'success');
        this.refreshAttributesAfterModalClose();
      },
      error: (error) => {
        console.error('Error deleting attribute:', error);
        this.showNotification(error.error?.message || 'Error al eliminar atributo', 'error');
      }
    });
  }

  openAttributeValueModal(attributeId: string, value?: ProductAttributeValue): void {
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

  saveAttributeValue(): void {
    if (!this.attributeValueForm.attribute_id) {
      this.showNotification('Selecciona un atributo', 'error');
      return;
    }
    if (!this.attributeValueForm.value || !this.attributeValueForm.value.trim()) {
      this.showNotification('El valor es requerido', 'error');
      return;
    }

    const body = {
      value: this.attributeValueForm.value.trim(),
      is_active: this.attributeValueForm.is_active ?? true
    };

    if (this.attributeValueForm.id) {
      this.productService.updateProductAttributeValue(
        this.attributeValueForm.attribute_id,
        this.attributeValueForm.id,
        body
      ).subscribe({
        next: () => {
          this.showNotification('Valor actualizado correctamente', 'success');
          this.dismissAttributeValueModal();
        },
        error: (error) => {
          console.error('Error updating attribute value:', error);
          this.showNotification(error.error?.message || 'Error al actualizar valor', 'error');
        }
      });
      return;
    }

    this.productService.createProductAttributeValue(
      this.attributeValueForm.attribute_id,
      body
    ).subscribe({
      next: () => {
        this.showNotification('Valor agregado correctamente', 'success');
        this.dismissAttributeValueModal();
      },
      error: (error) => {
        console.error('Error creating attribute value:', error);
        this.showNotification(error.error?.message || 'Error al agregar valor', 'error');
      }
    });
  }

  deleteAttributeValue(attributeId: string, value: ProductAttributeValue): void {
    if (!confirm(`¿Eliminar valor "${value.value}"?`)) return;

    this.productService.deleteProductAttributeValue(attributeId, value.id).subscribe({
      next: () => {
        this.showNotification('Valor eliminado correctamente', 'success');
        this.refreshAttributesAfterModalClose();
      },
      error: (error) => {
        console.error('Error deleting attribute value:', error);
        this.showNotification(error.error?.message || 'Error al eliminar valor', 'error');
      }
    });
  }

  save(): void {
    if (!this.product) return;

    // Validar campos requeridos
    if (!this.product.sku || !this.product.sku.trim()) {
      this.showNotification('El SKU es requerido', 'error');
      return;
    }
    if (!this.product.name || !this.product.name.trim()) {
      this.showNotification('El nombre es requerido', 'error');
      return;
    }

    console.log('Starting save, setting saving = true');
    this.saving = true;
    this.cdr.detectChanges();
    
    const body: any = {
      sku: this.product.sku.trim(),
      external_sku: this.product.external_sku?.trim() || undefined,
      name: this.product.name.trim(),
      description: this.product.description?.trim() || '',
      sat_code: this.product.sat_code?.trim() || '',
      category_id: this.product.category_id || undefined,
      subcategory_id: this.product.subcategory_id || undefined,
      base_uom_id: this.product.base_uom_id || undefined
    };

    console.log('Saving product with body:', body);

    // Determinar si es creación o actualización
    const isNew = !this.product.id || this.data?.isNew;

    if (isNew) {
      // Crear nuevo producto
      this.productService.createProduct(body).subscribe({
        next: (newProduct) => {
          console.log('Product created successfully:', newProduct);
          this.saving = false;
          this.cdr.detectChanges();
          this.showNotification('Producto creado correctamente', 'success');
          this.dialogRef.close(newProduct);
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.saving = false;
          this.cdr.detectChanges();
          const errorMessage = error.error?.message || 'Error al crear el producto';
          this.showNotification(errorMessage, 'error');
        }
      });
    } else {
      // Actualizar producto existente
      this.productService.updateProduct(this.product.id, body).subscribe({
        next: () => {
          console.log('Product saved successfully, setting saving = false');
          this.saving = false;
          this.cdr.detectChanges();
          this.showNotification('Producto actualizado correctamente', 'success');
          this.productUpdated.emit();
          this.reloadCurrentTab();
        },
        error: (error) => {
          console.error('Error updating product:', error);
          console.log('Error occurred, setting saving = false');
          this.saving = false;
          this.cdr.detectChanges();
          const errorMessage = error.error?.message || 'Error al actualizar el producto';
          this.showNotification(errorMessage, 'error');
        }
      });
    }
  }

  reloadCurrentTab(): void {
    if (!this.product) return;
    
    switch (this.activeTab) {
      case 'detalles':
        this.refreshDetallesSection();
        break;
      case 'uoms':
        this.loadProductUoms();
        break;
      case 'precios':
        this.loadProductPrices();
        break;
      case 'descuentos':
        this.loadProductDiscounts();
        break;
      case 'costos':
        this.loadVendorCosts();
        break;
      case 'fotos':
        this.loadProduct(this.product.id);
        break;
      default:
        break;
    }
  }

  openPhotoPicker(input: HTMLInputElement): void {
    if (this.uploadingPhoto || !this.product?.id) return;
    input.click();
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.product?.id) return;

    const currentProduct = this.product;
    this.uploadingPhoto = true;

    this.productService.uploadProductPhoto(currentProduct.id, file).subscribe({
      next: (updatedProduct) => {
        this.product = {
          ...currentProduct,
          ...updatedProduct
        };
        this.uploadingPhoto = false;
        this.cdr.detectChanges();
        this.showNotification('Foto del producto actualizada', 'success');
      },
      error: (error) => {
        this.uploadingPhoto = false;
        this.cdr.detectChanges();
        const errorMessage = error?.error?.message || 'No se pudo subir la foto del producto';
        this.showNotification(errorMessage, 'error');
      }
    });

    input.value = '';
  }

  // ─── UOMs ───────────────────────────────────────────────────

  addUom(): void {
    if (!this.product) return;
    if (!this.product.uoms) this.product.uoms = [];
    
    // Crear nueva UOM vacía (temporal, sin ID hasta que se guarde)
    const newUom: any = {
      id: '', // Vacío hasta que se guarde
      _clientRowId: `new-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      product_id: this.product.id,
      uom_catalog_id: '',
      factor: 1,
      is_base: this.product.uoms.length === 0, // Primera UOM es base por defecto
      parent_uom_id: null,
      uom_catalog: null,
      parent_uom: null
    };
    
    this.product.uoms.push(newUom);
  }

  removeUom(index: number): void {
    if (!this.product || !this.product.uoms) return;
    const uom = this.product.uoms[index];
    
    if (uom.id) {
      // UOM existente, eliminar del backend
      if (!confirm('¿Estás seguro de eliminar esta UOM?')) return;
      this.productService.deleteUOM(this.product.id, uom.id).subscribe({
        next: () => {
          this.product!.uoms!.splice(index, 1);
          this.showNotification('UOM eliminada correctamente', 'success');
        },
        error: (error) => {
          console.error('Error deleting UOM:', error);
          this.showNotification('Error al eliminar la UOM', 'error');
        }
      });
    } else {
      // UOM nueva (no guardada), solo remover del array
      this.product.uoms.splice(index, 1);
    }
  }

  onUomCatalogChange(uom: any, catalogId: string): void {
    if (!catalogId) {
      uom.uom_catalog_id = '';
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

  onBaseChange(index: number): void {
    if (!this.product || !this.product.uoms) return;
    
    const uom = this.product.uoms[index];
    
    // Si se marca como base, desmarcar las demás y limpiar parent
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

  getAvailableParentUoms(currentIndex: number): any[] {
    if (!this.product || !this.product.uoms) return [];
    
    // Retornar todas las UOMs excepto la actual y las que no tienen catalog_id
    return this.product.uoms
      .map((uom, index) => ({ ...uom, originalIndex: index }))
      .filter((uom, index) => {
        return index !== currentIndex && 
               uom.uom_catalog_id && 
               (uom.uom_catalog?.name || uom.id); // Tiene nombre o está guardada
      });
  }

  saveUoms(): void {
    if (!this.product || !this.product.uoms) return;
    
    // Validar que haya al menos una UOM base
    const hasBase = this.product.uoms.some(u => u.is_base);
    if (!hasBase) {
      alert('Debe haber al menos una UOM marcada como base');
      return;
    }

    // Validar que todas las UOMs tengan catalog_id
    const allHaveCatalog = this.product.uoms.every(u => u.uom_catalog_id);
    if (!allHaveCatalog) {
      alert('Todas las UOMs deben tener una unidad seleccionada');
      return;
    }

    // Validar que las UOMs no base tengan factor > 0
    const invalidFactors = this.product.uoms.filter(u => !u.is_base && (!u.factor || u.factor <= 0));
    if (invalidFactors.length > 0) {
      alert('Las UOMs no base deben tener un factor mayor a 0');
      return;
    }
    
    this.saving = true;
    
    // Separar UOMs nuevas de las existentes
    const newUoms = this.product.uoms.filter(u => !u.id);
    const existingUoms = this.product.uoms.filter(u => u.id);
    
    // Contador de operaciones completadas
    let completed = 0;
    const total = newUoms.length + existingUoms.length;
    
    if (total === 0) {
      this.saving = false;
      alert('No hay cambios para guardar');
      return;
    }
    
    const checkComplete = () => {
      completed++;
      if (completed === total) {
        this.saving = false;
        this.showNotification('UOMs guardadas correctamente', 'success');
        // Lo que había en pantalla al guardar (evita que un GET desfasado vuelva a “Pieza” al editar una fila existente)
        const catalogSnapshot = new Map<string, string>();
        for (const u of this.product!.uoms) {
          if (u.id && u.uom_catalog_id) {
            catalogSnapshot.set(String(u.id), String(u.uom_catalog_id));
          }
        }
        this.loadUomCatalog(() => this.loadProductUoms(catalogSnapshot));
      }
    };
    
    // Crear nuevas UOMs
    newUoms.forEach(uom => {
      const data = {
        uom_catalog_id: String(uom.uom_catalog_id),
        factor: uom.factor || 1,
        is_base: uom.is_base || false,
        parent_uom_id: uom.parent_uom_id || null
      };
      
      this.productService.createUOM(this.product!.id, data).subscribe({
        next: () => checkComplete(),
        error: (error) => {
          console.error('Error creating UOM:', error);
          this.showNotification('Error al crear UOM', 'error');
          this.saving = false;
        }
      });
    });
    
    // Actualizar UOMs existentes (incl. cambio de unidad del catálogo)
    existingUoms.forEach(uom => {
      const data = {
        uom_catalog_id: String(uom.uom_catalog_id),
        factor: uom.factor || 1,
        is_base: uom.is_base || false,
        parent_uom_id: uom.parent_uom_id || null
      };

      this.productService.updateUOM(this.product!.id, uom.id, data).subscribe({
        next: () => checkComplete(),
        error: (error) => {
          console.error('Error updating UOM:', error);
          this.showNotification('Error al actualizar UOM', 'error');
          this.saving = false;
        }
      });
    });
  }

  // ─── Precios ────────────────────────────────────────────────

  loadPriceLists(): void {
    this.productService.getPriceLists().subscribe({
      next: (lists) => {
        this.priceLists = Array.isArray(lists) ? lists : (lists as any).data || [];
        this.cdr.detectChanges();
        console.log('Price lists loaded:', this.priceLists.length);
      },
      error: (error) => {
        console.error('Error loading price lists:', error);
      }
    });
  }

  openPriceListModal(): void {
    this.priceListForm = { name: '', description: '' };
    this.priceListModalVisible = true;
  }

  savePriceList(): void {
    if (!this.priceListForm.name || !this.priceListForm.name.trim()) {
      alert('Por favor ingresa un nombre para la lista de precios');
      return;
    }

    const data = {
      name: this.priceListForm.name.trim(),
      description: this.priceListForm.description?.trim() || ''
    };

    console.log('Creating price list:', data);

    this.productService.createPriceList(data).subscribe({
      next: (newList) => {
        console.log('Price list created:', newList);
        this.priceListModalVisible = false;
        this.showNotification('Lista de precios creada correctamente', 'success');
        // Agregar la nueva lista al array
        this.priceLists.push(newList);
        // Seleccionar la nueva lista
        this.priceForm.price_list_id = newList.id;
      },
      error: (error) => {
        console.error('Error creating price list:', error);
        this.showNotification('Error al crear la lista de precios: ' + (error.error?.message || error.message), 'error');
      }
    });
  }

  openPriceModal(price?: ProductPrice): void {
    console.log('Opening price modal - product.uoms:', this.product?.uoms);
    
    // Cargar listas de precios si no están cargadas
    if (this.priceLists.length === 0) {
      this.loadPriceLists();
    }

    // Asegurarse de que las UOMs estén cargadas
    if (!this.product?.uoms || this.product.uoms.length === 0) {
      console.log('Loading product UOMs...');
      this.loadProductUoms();
    }

    if (price) {
      this.priceForm = {
        id: price.id,
        price_list_id: price.price_list_id,
        product_id: price.product_id,
        product_uom_id: price.product_uom_id,
        price: price.price,
        iva_percentage: (price as any).iva_percentage || 16,
        ieps_percentage: (price as any).ieps_percentage || 0
      };
    } else {
      this.priceForm = this.getEmptyPriceForm();
      if (this.product) {
        this.priceForm.product_id = this.product.id;
      }
    }
    this.priceModalVisible = true;
    this.cdr.detectChanges();
    console.log('Price form set:', this.priceForm);
  }

  savePrice(): void {
    if (!this.priceForm.price_list_id) {
      alert('Por favor selecciona una lista de precios');
      return;
    }
    if (!this.priceForm.product_uom_id) {
      alert('Por favor selecciona una UOM');
      return;
    }
    if (!this.priceForm.price || this.priceForm.price <= 0) {
      alert('Por favor ingresa un precio válido');
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
      // Update existing price
      const updateData = {
        price: body.price,
        iva_percentage: body.iva_percentage,
        ieps_percentage: body.ieps_percentage
      };
      
      this.productService.updateProductPrice(this.product!.id, this.priceForm.id, updateData).subscribe({
        next: () => {
          this.priceModalVisible = false;
          this.showNotification('Precio actualizado correctamente', 'success');
          this.reloadCurrentTab();
        },
        error: (error) => {
          console.error('Error updating price:', error);
          this.showNotification('Error al actualizar el precio', 'error');
        }
      });
    } else {
      // Create new price
      this.productService.createProductPrice(this.product!.id, body).subscribe({
        next: () => {
          this.priceModalVisible = false;
          this.showNotification('Precio creado correctamente', 'success');
          this.reloadCurrentTab();
        },
        error: (error) => {
          console.error('Error saving price:', error);
          this.showNotification('Error al guardar el precio', 'error');
        }
      });
    }
  }

  deletePrice(priceId: string): void {
    if (!confirm('¿Estás seguro de eliminar este precio?')) return;
    
    this.productService.deleteProductPrice(this.product!.id, priceId).subscribe({
      next: () => {
        this.showNotification('Precio eliminado correctamente', 'success');
        this.reloadCurrentTab();
      },
      error: (error) => {
        console.error('Error deleting price:', error);
        this.showNotification('Error al eliminar el precio', 'error');
      }
    });
  }

  // ─── Costos ─────────────────────────────────────────────────

  openCostModal(cost?: VendorProductPrice): void {
    // Cargar vendors si no están cargados
    if (this.vendors.length === 0) {
      this.loadVendors();
    }

    // Asegurarse de que las UOMs estén cargadas
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

  saveCost(): void {
    if (!this.costForm.vendor_id) {
      this.showNotification('Por favor selecciona un proveedor', 'error');
      return;
    }
    if (!this.costForm.product_uom_id) {
      this.showNotification('Por favor selecciona una UOM', 'error');
      return;
    }
    if (!this.costForm.cost || this.costForm.cost <= 0) {
      this.showNotification('Por favor ingresa un costo válido', 'error');
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
      // Update existing cost
      this.productService.updateVendorCost(this.product!.id, this.costForm.id, {
        cost: body.cost,
        iva_percentage: body.iva_percentage,
        ieps_percentage: body.ieps_percentage
      }).subscribe({
        next: () => {
          this.showNotification('Costo actualizado correctamente', 'success');
          this.reloadCurrentTab();
          setTimeout(() => {
            this.costModalVisible = false;
            this.cdr.detectChanges();
          }, 100);
        },
        error: (error) => {
          console.error('Error updating cost:', error);
          const errorMessage = error.error?.message || 'Error al actualizar el costo';
          this.showNotification(errorMessage, 'error');
        }
      });
    } else {
      // Create new cost
      this.productService.createVendorCost(this.product!.id, body).subscribe({
        next: () => {
          this.showNotification('Costo creado correctamente', 'success');
          this.reloadCurrentTab();
          setTimeout(() => {
            this.costModalVisible = false;
            this.cdr.detectChanges();
          }, 100);
        },
        error: (error) => {
          console.error('Error saving cost:', error);
          const errorMessage = error.error?.message || 'Error al guardar el costo';
          this.showNotification(errorMessage, 'error');
        }
      });
    }
  }

  deleteCost(costId: string): void {
    if (!confirm('¿Estás seguro de eliminar este costo?')) return;
    
    this.productService.deleteVendorCost(this.product!.id, costId).subscribe({
      next: () => {
        this.showNotification('Costo eliminado correctamente', 'success');
        this.reloadCurrentTab();
      },
      error: (error) => {
        console.error('Error deleting cost:', error);
        const errorMessage = error.error?.message || 'Error al eliminar el costo';
        this.showNotification(errorMessage, 'error');
      }
    });
  }

  // ─── Descuentos ─────────────────────────────────────────────

  openDiscountModal(discount?: ProductDiscount): void {
    if (!this.product?.id) {
      this.showNotification('Guarda el producto antes de configurar descuentos', 'error');
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

  saveDiscount(): void {
    const name = (this.discountForm.name || '').trim();
    if (!name) {
      this.showNotification('El nombre es requerido', 'error');
      return;
    }
    if (name.length > 120) {
      this.showNotification('El nombre no puede exceder 120 caracteres', 'error');
      return;
    }

    const value = Number(this.discountForm.value);
    if (!value || value <= 0) {
      this.showNotification('Ingresa un valor mayor a 0', 'error');
      return;
    }
    if (this.discountForm.discount_type === 'percentage' && value > 100) {
      this.showNotification('El porcentaje no puede ser mayor a 100', 'error');
      return;
    }

    const validFrom = this.discountForm.valid_from || null;
    const validTo = this.discountForm.valid_to || null;
    if (validFrom && validTo && validFrom > validTo) {
      this.showNotification('La fecha de inicio debe ser anterior o igual a la fecha de fin', 'error');
      return;
    }

    const productUomId = this.discountForm.product_uom_id || null;
    if (productUomId && this.product?.uoms?.length) {
      const uomExists = this.product.uoms.some(u => u.id === productUomId);
      if (!uomExists) {
        this.showNotification('La UOM seleccionada no existe en este producto', 'error');
        return;
      }
    }

    const body = {
      name,
      discount_type: this.discountForm.discount_type as ProductDiscountType,
      value,
      product_uom_id: productUomId,
      is_active: this.discountForm.is_active ?? true,
      valid_from: validFrom,
      valid_to: validTo
    };

    const productId = this.product!.id;
    const request$ = this.discountForm.id
      ? this.productService.updateProductDiscount(productId, this.discountForm.id, body)
      : this.productService.createProductDiscount(productId, body);

    request$.subscribe({
      next: () => {
        this.discountModalVisible = false;
        this.showNotification(
          this.discountForm.id ? 'Descuento actualizado correctamente' : 'Descuento creado correctamente',
          'success'
        );
        this.reloadCurrentTab();
      },
      error: (error) => {
        console.error('Error saving discount:', error);
        this.showNotification(this.getDiscountApiErrorMessage(error), 'error');
      }
    });
  }

  deleteDiscount(discount: ProductDiscount): void {
    if (!confirm(`¿Eliminar el descuento «${discount.name}»?`)) return;

    this.productService.deleteProductDiscount(this.product!.id, discount.id).subscribe({
      next: () => {
        this.showNotification('Descuento eliminado correctamente', 'success');
        this.reloadCurrentTab();
      },
      error: (error) => {
        console.error('Error deleting discount:', error);
        this.showNotification(this.getDiscountApiErrorMessage(error), 'error');
      }
    });
  }

  getDiscountTypeLabel(type: ProductDiscountType): string {
    return type === 'percentage' ? 'Porcentaje' : 'Monto fijo';
  }

  formatDiscountValue(discount: ProductDiscount): string {
    if (discount.discount_type === 'percentage') {
      return `${discount.value}%`;
    }
    return `$${discount.value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  formatDiscountValidity(discount: ProductDiscount): string {
    if (!discount.valid_from && !discount.valid_to) {
      return 'Siempre';
    }
    const from = discount.valid_from ? this.formatShortDate(discount.valid_from) : '—';
    const to = discount.valid_to ? this.formatShortDate(discount.valid_to, true) : '—';
    return `${from} – ${to}`;
  }

  getDiscountUomLabel(discount: ProductDiscount): string {
    return discount.product_uom?.uom?.name || 'Todas';
  }

  getDiscountPreview(): { basePrice: number; discountedPrice: number; savings: number } | null {
    const basePrice = this.getReferencePriceForDiscount();
    if (basePrice == null) return null;

    const value = Number(this.discountForm.value);
    if (!value || value <= 0) return null;

    let discountedPrice: number;
    if (this.discountForm.discount_type === 'percentage') {
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

  private getReferencePriceForDiscount(): number | null {
    const prices = this.product?.prices;
    if (!prices?.length) return null;

    const selectedUomId = this.discountForm.product_uom_id;
    const matchingPrices = selectedUomId
      ? prices.filter(p => p.product_uom_id === selectedUomId)
      : prices;

    if (!matchingPrices.length) return null;

    const defaultListPrice = matchingPrices.find(p => p.price_list?.is_default);
    const reference = defaultListPrice ?? matchingPrices[0];
    return Number(reference.price);
  }

  private getDiscountApiErrorMessage(error: any): string {
    const status = error?.status;
    if (status === 404) {
      return 'Producto o descuento no encontrado';
    }
    if (status === 409) {
      return 'Ya existe un descuento con ese nombre para este producto';
    }
    return error?.error?.message || 'Error al procesar el descuento';
  }

  private toDateInputValue(value?: string | null): string {
    if (!value) return '';
    return value.length >= 10 ? value.slice(0, 10) : value;
  }

  private formatShortDate(value: string, includeYear = false): string {
    const date = new Date(`${value.slice(0, 10)}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    if (includeYear) {
      return `${day}/${month}/${date.getFullYear()}`;
    }
    return `${day}/${month}`;
  }

  // ─── Helpers ────────────────────────────────────────────────

  getEmptyPriceForm(): any {
    return {
      id: '',
      price_list_id: '',
      product_id: '',
      product_uom_id: '',
      price: 0,
      iva_percentage: 0,
      ieps_percentage: 0
    };
  }

  getEmptyDiscountForm(): any {
    return {
      id: '',
      name: '',
      discount_type: 'percentage' as ProductDiscountType,
      value: null,
      product_uom_id: null,
      is_active: true,
      valid_from: '',
      valid_to: ''
    };
  }

  getEmptyCostForm(): any {
    return {
      id: '',
      vendor_id: '',
      product_id: '',
      product_uom_id: '',
      cost: 0,
      iva_percentage: 0,
      ieps_percentage: 0
    };
  }

  getEmptyAttributeForm(): any {
    return {
      id: '',
      name: '',
      is_active: true
    };
  }

  getEmptyAttributeValueForm(): any {
    return {
      id: '',
      attribute_id: '',
      value: '',
      is_active: true
    };
  }

  getUomName(uomId: string): string {
    if (!this.product || !this.product.uoms) return '';
    const uom = this.product.uoms.find(u => u.id === uomId);
    return uom?.name || '';
  }

  getPriceListName(priceListId: string): string {
    const list = this.priceLists.find(l => l.id === priceListId);
    return list?.name || '';
  }
}
