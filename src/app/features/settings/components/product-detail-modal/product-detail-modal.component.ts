import { Component, EventEmitter, Output, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { ProductService } from '../../services/product.service';
import { Product, UoM, ProductPrice, VendorProductPrice } from '../../models/product.model';

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
  product: Product | null = null;

  // Exponer Number para el template
  Number = Number;

  tabs: TabItem[] = [
    { id: 'detalles', title: 'Detalles' },
    { id: 'uoms', title: 'UOMs' },
    { id: 'precios', title: 'Precios' },
    { id: 'costos', title: 'Costos de Proveedor' },
    { id: 'fotos', title: 'Fotos' }
  ];
  activeTab = 'detalles';

  // Catálogos
  categories: any[] = [];
  subcategories: any[] = [];
  uomCatalog: any[] = [];
  vendors: any[] = [];
  priceLists: any[] = [];

  // Modales secundarios
  priceModalVisible = false;
  costModalVisible = false;
  priceListModalVisible = false;

  // Formularios de modales secundarios
  priceForm: any = this.getEmptyPriceForm();
  costForm: any = this.getEmptyCostForm();
  priceListForm: any = { name: '', description: '' };

  constructor(
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product; isNew?: boolean },
    private dialogRef: MatDialogRef<ProductDetailModalComponent>,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
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

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`]
    });
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
        name: '',
        description: '',
        category_id: '',
        subcategory_id: '',
        base_uom_id: '',
        category: null,
        subcategory: null,
        base_uom: null,
        uoms: [],
        prices: [],
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
        this.product = product;
        console.log('Product category_id:', this.product.category_id);
        console.log('Product subcategory_id:', this.product.subcategory_id);
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Loading set to false and change detected');
        
        // Cargar catálogos
        this.loadCatalogs();
        
        // Cargar UOMs del producto
        this.loadProductUoms();
        
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

  loadProductUoms(): void {
    if (!this.product) return;
    
    this.productService.getAssignedUoMs(this.product.id).subscribe({
      next: (uoms) => {
        console.log('Product UOMs loaded:', uoms);
        this.product!.uoms = uoms;
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
    this.productService.getCategories({ status: 'active' }).subscribe({
      next: (response) => {
        this.categories = response.data || [];
        this.cdr.detectChanges();
        console.log('Categories loaded:', this.categories.length);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });

    // Cargar UOMs
    this.productService.getUOMCatalog().subscribe({
      next: (uoms) => {
        this.uomCatalog = uoms;
        this.cdr.detectChanges();
        console.log('UOM catalog loaded:', this.uomCatalog.length);
      },
      error: (error) => {
        console.error('Error loading UOMs:', error);
      }
    });

    // No cargar price lists aquí, se cargarán solo cuando se abra el tab de precios
  }

  loadSubcategories(categoryId: string): void {
    this.productService.getSubCategories(categoryId, { status: 'active' }).subscribe({
      next: (response) => {
        this.subcategories = response.data || [];
        this.cdr.detectChanges();
        console.log('Subcategories loaded:', this.subcategories.length);
      },
      error: (error) => {
        console.error('Error loading subcategories:', error);
      }
    });
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

  save(): void {
    if (!this.product) return;

    console.log('Starting save, setting saving = true');
    this.saving = true;
    this.cdr.detectChanges();
    
    const body: any = {
      sku: this.product.sku,
      name: this.product.name,
      description: this.product.description,
      category_id: this.product.category_id || undefined,
      subcategory_id: this.product.subcategory_id || undefined,
      base_uom_id: this.product.base_uom_id || undefined
    };

    console.log('Saving product with body:', body);

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
        this.showNotification('Error al actualizar el producto', 'error');
      }
    });
  }

  reloadCurrentTab(): void {
    if (!this.product) return;
    
    switch (this.activeTab) {
      case 'uoms':
        this.loadProductUoms();
        break;
      case 'precios':
        this.loadProductPrices();
        break;
      case 'costos':
        this.loadVendorCosts();
        break;
      default:
        // For detalles tab, no need to reload
        break;
    }
  }

  // ─── UOMs ───────────────────────────────────────────────────

  addUom(): void {
    if (!this.product) return;
    if (!this.product.uoms) this.product.uoms = [];
    
    // Crear nueva UOM vacía (temporal, sin ID hasta que se guarde)
    const newUom: any = {
      id: '', // Vacío hasta que se guarde
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
    const catalog = this.uomCatalog.find(c => c.id === catalogId);
    if (catalog) {
      uom.uom_catalog = catalog;
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
        this.loadProductUoms(); // Recargar UOMs
      }
    };
    
    // Crear nuevas UOMs
    newUoms.forEach(uom => {
      const data = {
        uom_catalog_id: uom.uom_catalog_id,
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
    
    // Actualizar UOMs existentes
    existingUoms.forEach(uom => {
      const data = {
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
