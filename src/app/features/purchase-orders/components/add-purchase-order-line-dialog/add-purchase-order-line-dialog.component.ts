import { ChangeDetectorRef, Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, ExternalLink } from 'lucide-angular';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import {
  VendorCostCurrency,
  currencyMismatchMessage,
  normalizeVendorCostCurrency,
} from '../../../settings/utils/vendor-cost-currency.util';
import { CreatePurchaseOrderLineItemDto } from '../../models/filters.model';
import { PaymentCurrency, PurchaseOrder } from '../../models/purchase-order.model';
import { VendorCatalogProduct, VendorCatalogUom } from '../../models/vendor-catalog.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { catalogInputNumber } from '../../utils/purchase-order-display.util';

export interface AddPurchaseOrderLineDialogData {
  orderId: string;
  vendorId: string;
  currency: PaymentCurrency;
  folio?: string;
}

@Component({
  selector: 'app-add-purchase-order-line-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatAutocompleteModule, LucideAngularModule],
  templateUrl: './add-purchase-order-line-dialog.component.html',
  styleUrl: './add-purchase-order-line-dialog.component.scss',
})
export class AddPurchaseOrderLineDialogComponent implements OnInit {
  readonly ExternalLink = ExternalLink;
  readonly taxPresets = [0, 8, 16];

  vendorProducts: VendorCatalogProduct[] = [];
  loadingProducts = signal(false);
  saving = signal(false);
  errorMessage = signal('');

  productSearchTerm: string | VendorCatalogProduct = '';
  selectedProduct: VendorCatalogProduct | null = null;
  selectedUomId = '';
  selectedQuantity: number | null = null;
  selectedUnitTotal: number | null = null;
  selectedIva: number | null = null;
  selectedIeps: number | null = null;
  selectedCurrency: VendorCostCurrency = 'MXN';
  selectedCurrencyLocked = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddPurchaseOrderLineDialogData,
    private dialogRef: MatDialogRef<AddPurchaseOrderLineDialogComponent, PurchaseOrder | undefined>,
    private purchaseOrderService: PurchaseOrderService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.selectedCurrency = data.currency;
  }

  ngOnInit(): void {
    this.loadVendorProducts();
  }

  get dialogTitle(): string {
    return this.data.folio ? `Agregar producto — #${this.data.folio}` : 'Agregar producto';
  }

  get filteredProducts(): VendorCatalogProduct[] {
    const term = this.currentProductSearchTerm();
    if (!term) return this.vendorProducts;
    return this.vendorProducts.filter((product) => {
      const haystack = `${product.product_name || ''} ${product.product_sku || product.sku || ''}`.toLowerCase();
      return haystack.includes(term);
    });
  }

  get selectedProductUoms(): VendorCatalogUom[] {
    return this.selectedProduct?.uoms || [];
  }

  get selectedProductHasVendorCost(): boolean {
    return this.productHasVendorCost(this.selectedProduct);
  }

  get selectedUom(): VendorCatalogUom | undefined {
    return this.selectedProductUoms.find((row) => row.uom_id === this.selectedUomId);
  }

  get selectedUomCurrency(): VendorCostCurrency | null {
    return normalizeVendorCostCurrency(this.selectedUom?.currency);
  }

  get selectedLineCurrency(): VendorCostCurrency {
    return this.selectedUomCurrency ?? this.selectedCurrency;
  }

  get selectedCurrencyMismatch(): boolean {
    return this.selectedLineCurrency !== this.data.currency;
  }

  get currencyMismatchText(): string {
    if (!this.selectedCurrencyMismatch) return '';
    return currencyMismatchMessage(this.data.currency, this.selectedLineCurrency);
  }

  get canConfirm(): boolean {
    return !!(
      this.selectedProduct &&
      this.selectedUomId &&
      Number(this.selectedQuantity) > 0 &&
      !this.selectedCurrencyMismatch &&
      !this.saving()
    );
  }

  displayProduct(value: VendorCatalogProduct | string | null): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return this.getProductOptionLabel(value);
  }

  getProductOptionLabel(product: VendorCatalogProduct): string {
    const name = product?.product_name || 'Producto';
    const productSku = product?.product_sku || product?.sku || '';
    const sku = productSku ? ` | SKU: ${productSku}` : '';
    const missing = this.productHasVendorCost(product) ? '' : ' · Sin costo de proveedor';
    return `${name}${sku}${missing}`;
  }

  onProductSelected(product: VendorCatalogProduct): void {
    this.selectedProduct = product;
    this.productSearchTerm = product;
    this.selectedUomId = product?.uoms?.[0]?.uom_id || '';
    this.applySelectedUom();
  }

  onSelectedUomChange(): void {
    this.applySelectedUom();
  }

  setIva(value: number): void {
    this.selectedIva = value;
  }

  setIeps(value: number): void {
    this.selectedIeps = value;
  }

  isTaxPreset(current: number | null, preset: number): boolean {
    if (current === null || current === undefined) return false;
    return Number(current) === preset;
  }

  openSelectedProductDetail(): void {
    const productId = this.selectedProduct?.product_id;
    if (!productId) return;

    const uomIdToRestore = this.selectedUomId;
    this.dialog
      .open(ProductDetailModalComponent, {
        ...PRODUCT_DETAIL_DIALOG_CONFIG,
        data: {
          product: {
            id: productId,
            name: this.selectedProduct?.product_name,
            sku: this.selectedProduct?.product_sku || this.selectedProduct?.sku,
          },
          isNew: false,
          initialTab: 'costos',
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.refreshSelectedProduct(productId, uomIdToRestore);
      });
  }

  cancel(): void {
    if (this.saving()) return;
    this.dialogRef.close();
  }

  save(): void {
    if (!this.canConfirm || !this.selectedProduct) {
      return;
    }

    const quantity = Number(this.selectedQuantity);
    const unitTotal = Number(this.selectedUnitTotal);
    const iva = Number(this.selectedIva || 0);
    const ieps = Number(this.selectedIeps || 0);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      this.errorMessage.set('La cantidad debe ser mayor a 0');
      return;
    }
    if (!Number.isFinite(unitTotal) || unitTotal < 0) {
      this.errorMessage.set('El costo unitario no puede ser negativo');
      return;
    }

    const body: CreatePurchaseOrderLineItemDto = {
      product_id: this.selectedProduct.product_id,
      uom_id: this.selectedUomId,
      quantity,
      unit_total: unitTotal,
      iva_percentage: iva,
      ieps_percentage: ieps,
      currency: this.data.currency,
    };

    this.saving.set(true);
    this.errorMessage.set('');

    this.purchaseOrderService.createLineItem(this.data.orderId, body).subscribe({
      next: (order) => this.dialogRef.close(order),
      error: (err: Error) => {
        this.errorMessage.set(err.message || 'No se pudo agregar el producto');
        this.saving.set(false);
      },
    });
  }

  private loadVendorProducts(): void {
    this.loadingProducts.set(true);
    this.purchaseOrderService.getVendorProducts(this.data.vendorId).subscribe({
      next: (products) => {
        this.vendorProducts = products;
        this.loadingProducts.set(false);
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingProducts.set(false);
        this.errorMessage.set('Error al cargar productos del proveedor');
        this.cdr.detectChanges();
      },
    });
  }

  private refreshSelectedProduct(productId: string, preferredUomId: string): void {
    this.purchaseOrderService.getVendorProducts(this.data.vendorId).subscribe({
      next: (products) => {
        this.vendorProducts = products;
        const updated = products.find((product) => product.product_id === productId);
        if (!updated) {
          this.cdr.detectChanges();
          return;
        }
        this.selectedProduct = updated;
        this.productSearchTerm = updated;
        this.selectedUomId = preferredUomId || updated.uoms?.[0]?.uom_id || '';
        this.applySelectedUom();
        this.cdr.detectChanges();
      },
    });
  }

  private applySelectedUom(): void {
    const uom = this.selectedUom;
    if (!uom) {
      this.selectedCurrency = this.data.currency;
      this.selectedCurrencyLocked = true;
      this.selectedUnitTotal = null;
      this.selectedIva = null;
      this.selectedIeps = null;
      return;
    }

    const locked = this.selectedUomCurrency;
    if (locked) {
      this.selectedCurrency = locked;
      this.selectedCurrencyLocked = true;
    } else {
      this.selectedCurrency = this.data.currency;
      this.selectedCurrencyLocked = true;
    }

    this.selectedUnitTotal = catalogInputNumber(uom.cost);
    this.selectedIva = catalogInputNumber(uom.iva_percentage);
    this.selectedIeps = catalogInputNumber(uom.ieps_percentage);
  }

  private productHasVendorCost(product: VendorCatalogProduct | null): boolean {
    if (!product) return false;
    if (typeof product.has_vendor_cost === 'boolean') {
      return product.has_vendor_cost;
    }
    return (product.uoms || []).length > 0;
  }

  private currentProductSearchTerm(): string {
    const raw =
      typeof this.productSearchTerm === 'string'
        ? this.productSearchTerm
        : this.getProductOptionLabel(this.productSearchTerm);
    return String(raw || '').toLowerCase().trim();
  }
}
