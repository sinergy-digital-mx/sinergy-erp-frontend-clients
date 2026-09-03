import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { LucideAngularModule, ExternalLink } from 'lucide-angular';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { SalesOrderDetailPayload } from '../../models/sales-order.model';
import { SalesOrderPaymentCurrency } from '../../models/sales-order-payment.model';
import { SalesOrderService } from '../../services/sales-order.service';

export interface AddSalesOrderLineDialogData {
  orderId: string;
  folio?: string;
  currency: SalesOrderPaymentCurrency;
  fiscal_configuration_id: string;
  billing_branch_id: string;
}

@Component({
  selector: 'app-add-sales-order-line-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatAutocompleteModule, LucideAngularModule],
  templateUrl: './add-sales-order-line-dialog.component.html',
  styleUrl: './add-sales-order-line-dialog.component.scss',
})
export class AddSalesOrderLineDialogComponent implements OnInit, OnDestroy {
  readonly ExternalLink = ExternalLink;
  readonly taxPresets = [0, 8, 16];

  products: any[] = [];
  loadingProducts = signal(false);
  saving = signal(false);
  errorMessage = signal('');

  productSearchTerm: string | any = '';
  selectedProduct: any = null;
  selectedUomId = '';
  selectedQuantity: number | null = null;
  selectedUnitPrice: number | null = null;
  selectedIva: number | null = 16;
  selectedIeps: number | null = 0;

  private readonly destroy$ = new Subject<void>();
  private readonly productSearch$ = new Subject<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddSalesOrderLineDialogData,
    private dialogRef: MatDialogRef<AddSalesOrderLineDialogComponent, SalesOrderDetailPayload | undefined>,
    private salesOrderService: SalesOrderService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productSearch$
      .pipe(debounceTime(250), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => this.loadProducts(term));
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get dialogTitle(): string {
    return this.data.folio ? `Agregar producto — #${this.data.folio}` : 'Agregar producto';
  }

  get filteredProducts(): any[] {
    return this.products;
  }

  get selectedProductUoms(): any[] {
    return this.selectedProduct?.uoms || [];
  }

  get canConfirm(): boolean {
    return !!(
      this.selectedProduct &&
      this.selectedUomId &&
      Number(this.selectedQuantity) > 0 &&
      Number(this.selectedUnitPrice) >= 0 &&
      !this.saving()
    );
  }

  displayProduct(value: any): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return this.getProductOptionLabel(value);
  }

  getProductOptionLabel(product: any): string {
    const name = product?.product_name || product?.name || 'Producto';
    const sku = product?.product_sku || product?.sku || '';
    const stock = Number(product?.available_quantity ?? 0);
    const skuPart = sku ? ` | SKU: ${sku}` : '';
    return `${name}${skuPart} · Stock ${stock}`;
  }

  onProductSearchChange(value: string | any): void {
    this.productSearchTerm = value;
    if (typeof value === 'string') {
      this.productSearch$.next(value);
    }
  }

  onProductSelected(product: any): void {
    this.selectedProduct = product;
    this.productSearchTerm = product;
    const firstUom = (product?.uoms || [])[0];
    this.selectedUomId = firstUom?.id || firstUom?.product_uom_id || firstUom?.uom_id || '';
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
    const productId = this.selectedProduct?.product_id || this.selectedProduct?.id;
    if (!productId) return;

    this.dialog.open(ProductDetailModalComponent, {
      ...PRODUCT_DETAIL_DIALOG_CONFIG,
      data: {
        product: {
          id: productId,
          name: this.selectedProduct?.product_name || this.selectedProduct?.name,
          sku: this.selectedProduct?.product_sku || this.selectedProduct?.sku,
        },
        isNew: false,
      },
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
    const unitPrice = Number(this.selectedUnitPrice);
    const iva = Number(this.selectedIva || 0);
    const ieps = Number(this.selectedIeps || 0);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      this.errorMessage.set('La cantidad debe ser mayor a 0');
      return;
    }
    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      this.errorMessage.set('El precio unitario no puede ser negativo');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    this.salesOrderService
      .createLineItem(this.data.orderId, {
        product_id: this.selectedProduct.product_id || this.selectedProduct.id,
        product_uom_id: this.selectedUomId,
        quantity,
        unit_price: unitPrice,
        iva_percentage: iva,
        ieps_percentage: ieps,
      })
      .subscribe({
        next: (payload) => this.dialogRef.close(payload),
        error: (err: Error) => {
          this.errorMessage.set(err.message || 'No se pudo agregar el producto');
          this.saving.set(false);
        },
      });
  }

  private loadProducts(search = ''): void {
    this.loadingProducts.set(true);
    this.salesOrderService
      .getProductsSummary({
        fiscal_configuration_id: this.data.fiscal_configuration_id,
        billing_branch_id: this.data.billing_branch_id,
        search: search.trim() || undefined,
        limit: 80,
      })
      .subscribe({
        next: (res: any) => {
          this.products = this.normalizeProducts(res);
          this.loadingProducts.set(false);
          this.cdr.detectChanges();
        },
        error: () => {
          this.products = [];
          this.loadingProducts.set(false);
          this.errorMessage.set('No se pudieron cargar productos de la sucursal');
          this.cdr.detectChanges();
        },
      });
  }

  private applySelectedUom(): void {
    const uom = this.selectedProductUoms.find(
      (row) => (row.id || row.product_uom_id || row.uom_id) === this.selectedUomId
    );
    if (!uom) {
      this.selectedUnitPrice = null;
      return;
    }
    this.selectedUnitPrice = Number(uom.cost ?? 0);
    this.selectedIva = Number(uom.iva_percentage ?? 16);
    this.selectedIeps = Number(uom.ieps_percentage ?? 0);
  }

  private normalizeProducts(res: any): any[] {
    const rows = Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.items)
          ? res.items
          : [];

    return rows.map((row: any) => {
      const productId = row.product_id || row.id;
      const uoms = this.normalizeUoms(row);
      return {
        ...row,
        product_id: productId,
        id: productId,
        product_name: row.product_name || row.name || 'Producto',
        name: row.product_name || row.name || 'Producto',
        product_sku: row.product_sku || row.sku || '',
        sku: row.product_sku || row.sku || '',
        available_quantity: Number(row.total_available_quantity ?? row.available_quantity ?? 0),
        uoms,
      };
    });
  }

  private normalizeUoms(product: any): any[] {
    const rows = Array.isArray(product?.uoms) ? product.uoms : [];
    if (rows.length > 0) {
      return rows.map((u: any) => ({
        ...u,
        id: u.id || u.product_uom_id || u.uom_id,
        product_uom_id: u.product_uom_id || u.id || u.uom_id,
        uom_id: u.uom_id || u.id,
        name: u.name || u.uom_name || 'UOM',
        uom_name: u.uom_name || u.name || 'UOM',
        cost: Number(u.suggested_unit_price ?? u.cost ?? u.unit_price ?? 0),
        iva_percentage: Number(u.suggested_iva_percentage ?? u.iva_percentage ?? 16),
        ieps_percentage: Number(u.suggested_ieps_percentage ?? u.ieps_percentage ?? 0),
      }));
    }

    const fallbackId = product.product_uom_id || product.uom_id || '';
    if (!fallbackId) return [];
    return [{
      id: fallbackId,
      product_uom_id: fallbackId,
      uom_id: product.uom_id || fallbackId,
      name: product.uom_name || 'UOM',
      uom_name: product.uom_name || 'UOM',
      cost: Number(product.suggested_unit_price ?? product.cost ?? product.unit_price ?? 0),
      iva_percentage: Number(product.suggested_iva_percentage ?? product.iva_percentage ?? 16),
      ieps_percentage: Number(product.suggested_ieps_percentage ?? product.ieps_percentage ?? 0),
    }];
  }
}
