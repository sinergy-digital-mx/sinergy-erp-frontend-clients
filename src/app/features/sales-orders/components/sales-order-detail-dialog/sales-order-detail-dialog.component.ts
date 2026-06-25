import { Component, Inject, signal, computed, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesDocumentLanguage, SalesOrder, SalesOrderDocument, SalesOrderInvoice, SalesOrderLineItem } from '../../models/sales-order.model';
import { resolveSalesOrderCustomerName, resolveSalesOrderCustomerId } from '../../utils/customer-display.util';
import {
  PosSaleCollection,
  posCollectionMethodLabel,
  posCollectionMoneyLabel,
  posCollectionUsdLabel,
} from '../../../pos/models/pos-sale-collection.model';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { WarehouseDetailModalComponent } from '../../../settings/components/warehouse-detail-modal/warehouse-detail-modal.component';
import { FiscalConfigurationModalComponent } from '../../../settings/components/fiscal-configuration-modal/fiscal-configuration-modal.component';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { Warehouse } from '../../../settings/models/warehouse.model';

@Component({
  selector: 'app-sales-order-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RemoveTrailingZerosPipe],
  templateUrl: './sales-order-detail-dialog.component.html',
  styleUrl: './sales-order-detail-dialog.component.scss',
  host: {
    'class': 'order-detail-dialog-container'
  }
})
export class SalesOrderDetailDialogComponent {
  order = signal<SalesOrder | null>(null);
  lineItems = signal<SalesOrderLineItem[]>([]);
  documents = signal<SalesOrderDocument[]>([]);
  posCollection = signal<PosSaleCollection | null>(null);
  loading = signal(true);
  activeTabIndex = signal(0);
  showDeliveredTotals = signal(false);
  regeneratingPDF = signal(false);
  showRegenerateLanguageModal = signal(false);
  selectedRegenerateLanguage = signal<SalesDocumentLanguage>('es');
  keepPreviousDocument = signal(false);

  canEditOrder = computed(() => this.order()?.general_status === 'Creada');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    private dialogRef: MatDialogRef<SalesOrderDetailDialogComponent>,
    private dialog: MatDialog,
    private salesOrderService: SalesOrderService,
    private warehouseService: WarehouseService,
    private fiscalConfigService: FiscalConfigurationService,
    private router: Router,
    private taxCalculator: TaxCalculatorService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadOrder();
  }

  loadOrder(): void {
    this.loading.set(true);
    this.salesOrderService.getOrderDetailById(this.data.orderId).subscribe({
      next: (payload) => {
        this.order.set(payload?.header || null);
        this.lineItems.set(payload?.line_items || payload?.header?.line_items || []);
        this.documents.set(payload?.documents || payload?.header?.documents || []);
        this.posCollection.set(payload?.pos_collection ?? payload?.header?.pos_collection ?? null);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  goToEditForm(): void {
    const id = this.order()?.id;
    if (!id) return;
    this.dialogRef.close();
    void this.router.navigate(['/sales-orders', id, 'edit']);
  }

  parseNumber(value: number | string | undefined | null): number {
    if (value === null || value === undefined) return 0;
    const n = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  formatCurrency(value: number | string | undefined | null): string {
    return this.taxCalculator.formatCurrency(this.parseNumber(value));
  }

  formatLongDate(value?: string | null): string {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  formatShortDate(value?: string | null): string {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long' });
  }

  hasVisibleDiscount(): boolean {
    return this.getTotalsSnapshot().discount > 0.009;
  }

  hasVisibleTaxes(): boolean {
    const { iva, ieps } = this.getTotalsSnapshot();
    return iva + ieps > 0.009;
  }

  getDisplayedTaxes(): string {
    const { iva, ieps } = this.getTotalsSnapshot();
    return this.formatCurrency(iva + ieps);
  }

  toggleTotals(showDelivered: boolean): void {
    this.showDeliveredTotals.set(showDelivered);
  }

  getTotalColor(): string {
    return this.showDeliveredTotals() ? 'text-green-600' : 'text-blue-600';
  }

  getDisplayedSubtotal(): string {
    return this.formatCurrency(this.getTotalsSnapshot().subtotal);
  }

  getDisplayedDiscount(): string {
    return this.formatCurrency(this.getTotalsSnapshot().discount);
  }

  getDisplayedIva(): string {
    return this.formatCurrency(this.getTotalsSnapshot().iva);
  }

  getDisplayedIeps(): string {
    return this.formatCurrency(this.getTotalsSnapshot().ieps);
  }

  getDisplayedTotal(): string {
    return this.formatCurrency(this.getTotalsSnapshot().total);
  }

  getRequestedQuantity(item: SalesOrderLineItem): number {
    return this.parseNumber(item.quantity);
  }

  getDeliveredQuantity(item: SalesOrderLineItem): number {
    const allocations = Array.isArray(item.batch_allocations) ? item.batch_allocations : [];
    if (allocations.length > 0) {
      return allocations.reduce(
        (sum, allocation) => sum + this.parseNumber(allocation?.quantity_allocated),
        0
      );
    }
    if (this.order()?.general_status === 'Surtida') {
      return this.getRequestedQuantity(item);
    }
    return 0;
  }

  private getTotalsSnapshot(): {
    subtotal: number;
    discount: number;
    iva: number;
    ieps: number;
    total: number;
  } {
    const order = this.order();
    if (!order) {
      return { subtotal: 0, discount: 0, iva: 0, ieps: 0, total: 0 };
    }

    if (!this.showDeliveredTotals()) {
      return {
        subtotal: this.parseNumber(order.requested_subtotal ?? order.subtotal),
        discount: this.parseNumber(order.requested_discount_total ?? order.discount_total),
        iva: this.parseNumber(order.requested_iva_total ?? order.iva_total),
        ieps: this.parseNumber(order.requested_ieps_total ?? order.ieps_total),
        total: this.parseNumber(order.requested_total ?? order.total ?? order.grand_total)
      };
    }

    const hasDeliveredHeader =
      order.delivered_subtotal != null ||
      order.delivered_total != null ||
      order.delivered_iva_total != null;

    if (hasDeliveredHeader) {
      return {
        subtotal: this.parseNumber(order.delivered_subtotal ?? order.subtotal),
        discount: this.parseNumber(order.delivered_discount_total ?? order.discount_total),
        iva: this.parseNumber(order.delivered_iva_total ?? order.iva_total),
        ieps: this.parseNumber(order.delivered_ieps_total ?? order.ieps_total),
        total: this.parseNumber(order.delivered_total ?? order.total ?? order.grand_total)
      };
    }

    return this.computeDeliveredTotalsFromLines();
  }

  private computeDeliveredTotalsFromLines(): {
    subtotal: number;
    discount: number;
    iva: number;
    ieps: number;
    total: number;
  } {
    let subtotal = 0;
    let discount = 0;
    let iva = 0;
    let ieps = 0;

    for (const item of this.lineItems()) {
      const ratio = this.getLineDeliveryRatio(item);
      if (ratio <= 0) continue;

      const qty = this.getRequestedQuantity(item);
      const unit = this.parseNumber(item.unit_price);
      const gross = unit * qty * ratio;
      const discountPct = this.parseNumber(item.discount_percentage);
      const lineDiscount = gross * (discountPct / 100);
      const discounted = Math.max(gross - lineDiscount, 0);
      const lineIva = discounted * (this.parseNumber(item.iva_percentage) / 100);
      const lineIeps = discounted * (this.parseNumber(item.ieps_percentage) / 100);

      subtotal += discounted;
      discount += lineDiscount;
      iva += lineIva;
      ieps += lineIeps;
    }

    return {
      subtotal,
      discount,
      iva,
      ieps,
      total: subtotal + iva + ieps
    };
  }

  private getLineDeliveryRatio(item: SalesOrderLineItem): number {
    const requested = this.getRequestedQuantity(item);
    if (requested <= 0) return 0;
    return Math.min(this.getDeliveredQuantity(item) / requested, 1);
  }

  getStatusClass(status?: string): string {
    if (status === 'Creada') return 'bg-blue-100 text-blue-700';
    if (status === 'Surtida') return 'bg-green-100 text-green-700';
    if (status === 'Cancelada') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  }

  getPaymentStatusClass(status?: string): string {
    if (status === 'Pendiente') return 'bg-red-50 text-red-600';
    if (status === 'Pagado') return 'bg-green-50 text-green-600';
    return 'bg-gray-100 text-gray-600';
  }

  getCustomerDisplayName(): string {
    return resolveSalesOrderCustomerName(this.order());
  }

  posPaymentMethodLabel(): string {
    return posCollectionMethodLabel(this.posCollection()?.payment_method);
  }

  posCollectionMoney(value: unknown): string {
    return posCollectionMoneyLabel(value);
  }

  posCollectionUsd(value: unknown): string {
    return posCollectionUsdLabel(value);
  }

  formatPosCollectedAt(value?: string | null): string {
    if (!value) {
      return '—';
    }
    return new Date(value).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' });
  }

  getFiscalDisplayName(): string {
    const fiscal = this.order()?.fiscal_configuration;
    return fiscal?.business_name || fiscal?.razon_social || this.order()?.fiscal_razon_social || 'N/A';
  }

  getLineUom(item: SalesOrderLineItem): string {
    return (
      item.uom_name ||
      item.product_uom?.uom?.name ||
      item.base_uom_name ||
      item.base_uom?.name ||
      'Unidad'
    );
  }

  getLineTotal(item: SalesOrderLineItem): number {
    const qty = this.parseNumber(item.quantity);
    const unit = this.parseNumber(item.unit_price);
    const discountPct = this.parseNumber(item.discount_percentage);
    const taxable = unit * qty;
    const discount = taxable * (discountPct / 100);
    const discountedSubtotal = Math.max(taxable - discount, 0);
    const iva = discountedSubtotal * (this.parseNumber(item.iva_percentage) / 100);
    const ieps = discountedSubtotal * (this.parseNumber(item.ieps_percentage) / 100);
    return discountedSubtotal + iva + ieps;
  }

  getBatchAllocationsRows(): Array<{ item: SalesOrderLineItem; allocation: any }> {
    const rows: Array<{ item: SalesOrderLineItem; allocation: any }> = [];
    for (const item of this.lineItems()) {
      const allocations = Array.isArray(item.batch_allocations) ? item.batch_allocations : [];
      for (const allocation of allocations) {
        rows.push({ item, allocation });
      }
    }
    return rows;
  }

  getInvoices(): SalesOrderInvoice[] {
    const invoices = this.order()?.invoices;
    return Array.isArray(invoices) ? invoices : [];
  }

  canOpenCustomer(): boolean {
    return resolveSalesOrderCustomerId(this.order()) != null;
  }

  canOpenWarehouse(): boolean {
    return !!(this.order()?.warehouse_id || this.order()?.warehouse?.id);
  }

  canOpenFiscal(): boolean {
    return !!(this.order()?.fiscal_configuration_id || this.order()?.fiscal_configuration?.id);
  }

  openCustomerInNewTab(): void {
    const customerId = resolveSalesOrderCustomerId(this.order());
    if (customerId == null) return;
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/customers/detail', customerId])
    );
    window.open(url, '_blank');
  }

  openWarehouseDialog(): void {
    const warehouseId = this.order()?.warehouse?.id ?? this.order()?.warehouse_id;
    if (!warehouseId) return;

    const openModal = (warehouse: Warehouse) => {
      this.dialog.open(WarehouseDetailModalComponent, {
        data: { warehouse },
        width: '80vw',
        maxWidth: '1000px',
      });
    };

    const embedded = this.order()?.warehouse;
    if (embedded && 'code' in embedded) {
      openModal(embedded as Warehouse);
      return;
    }

    this.warehouseService.getWarehouse(warehouseId).subscribe({
      next: (warehouse) => openModal(warehouse),
      error: () => {
        openModal({ id: warehouseId, name: embedded?.name || '' } as Warehouse);
      },
    });
  }

  openFiscalDialog(): void {
    const fiscalId = this.order()?.fiscal_configuration?.id ?? this.order()?.fiscal_configuration_id;
    if (!fiscalId) return;

    const openModal = (fiscalConfig: FiscalConfiguration) => {
      this.dialog.open(FiscalConfigurationModalComponent, {
        data: { fiscalConfig },
        width: '80vw',
        maxWidth: '1000px',
      });
    };

    const embedded = this.order()?.fiscal_configuration;
    if (embedded?.rfc && embedded?.razon_social) {
      openModal(embedded as FiscalConfiguration);
      return;
    }

    this.fiscalConfigService.getFiscalConfiguration(fiscalId).subscribe({
      next: (fiscalConfig) => openModal(fiscalConfig),
      error: () => {
        if (embedded) {
          openModal({ ...embedded, id: fiscalId } as FiscalConfiguration);
        }
      },
    });
  }

  openProductDetail(item: SalesOrderLineItem): void {
    const productId = item.product?.id ?? item.product_id;
    if (!productId) return;
    this.dialog.open(ProductDetailModalComponent, {
      data: {
        product: {
          id: productId,
          name: item.product?.name,
          sku: item.product?.sku,
        },
        isNew: false,
      },
      width: '850px',
      maxHeight: '90vh',
    });
  }

  canOpenProduct(item: SalesOrderLineItem): boolean {
    return !!(item.product?.id || item.product_id);
  }

  hasDocuments(): boolean {
    return this.documents().length > 0;
  }

  regeneratePDF(): void {
    this.openRegenerateLanguageModal();
  }

  openRegenerateLanguageModal(): void {
    if (this.regeneratingPDF()) return;
    this.selectedRegenerateLanguage.set(this.getDefaultDocumentLanguage());
    this.keepPreviousDocument.set(false);
    this.showRegenerateLanguageModal.set(true);
  }

  closeRegenerateLanguageModal(): void {
    if (this.regeneratingPDF()) return;
    this.showRegenerateLanguageModal.set(false);
  }

  confirmRegenerateDocument(): void {
    const orderId = this.order()?.id;
    const language = this.selectedRegenerateLanguage();
    const keepPrevious = this.keepPreviousDocument();
    if (!orderId || this.regeneratingPDF()) return;

    this.regeneratingPDF.set(true);
    this.salesOrderService.regenerateOriginalPDF(orderId, language, keepPrevious).subscribe({
      next: (response) => {
        this.regeneratingPDF.set(false);
        this.showRegenerateLanguageModal.set(false);
        this.cdr.detectChanges();
        this.toast.success(response?.message || 'PDF original regenerado exitosamente');
        this.loadOrder();
      },
      error: (error) => {
        this.regeneratingPDF.set(false);
        this.cdr.detectChanges();
        this.toast.error(error?.message || 'Error al regenerar PDF original');
        console.error('Error regenerating original PDF:', error);
      }
    });
  }

  getDefaultDocumentLanguage(): SalesDocumentLanguage {
    const doc = this.documents().find(d => d.document_type_name === 'DOCUMENTO_ORIGINAL');
    return doc?.document_language === 'en' ? 'en' : 'es';
  }

  getDocumentLanguageLabel(language?: SalesDocumentLanguage | string | null): string | null {
    if (language === 'es') return 'ES';
    if (language === 'en') return 'EN';
    return null;
  }

  getDocumentBadgeClass(documentType: string): string {
    const typeMap: Record<string, string> = {
      DOCUMENTO_ORIGINAL: 'badge-blue',
      DOCUMENTO_RECIBO: 'badge-green',
      DOCUMENTO_RECEPCION: 'badge-green'
    };
    return typeMap[documentType] || 'badge-gray';
  }

  formatDocumentDate(dateString?: string | null): string {
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    return `${day} de ${month}`;
  }

  downloadDocument(doc: SalesOrderDocument): void {
    if (doc.path) {
      window.open(doc.path, '_blank');
    }
  }
}
