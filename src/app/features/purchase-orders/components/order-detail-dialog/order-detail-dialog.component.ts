import { Component, Inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { Document, DocumentLanguage, DocumentType, PurchaseOrder } from '../../models/purchase-order.model';
import { purchaseOrderReceivedLots } from '../../models/purchase-order-lot.model';
import { LineItem } from '../../models/line-item.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import {
  PurchaseOrderNotesDialogComponent,
  PurchaseOrderNotesDialogResult,
} from '../purchase-order-notes-dialog/purchase-order-notes-dialog.component';
import { ReceiptModalComponent } from '../receipt-modal/receipt-modal.component';
import { PurchaseOrderLotsTabComponent } from '../purchase-order-lots-tab/purchase-order-lots-tab.component';
import { PurchaseOrderMovementsTabComponent } from '../purchase-order-movements-tab/purchase-order-movements-tab.component';
import { PaymentDialogComponent, PaymentFormData } from '../payment-dialog/payment-dialog.component';
import { EditPurchaseOrderLineDialogComponent } from '../edit-purchase-order-line-dialog/edit-purchase-order-line-dialog.component';
import { AddPurchaseOrderLineDialogComponent } from '../add-purchase-order-line-dialog/add-purchase-order-line-dialog.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { BatchDetailDialogComponent } from '../../../inventory/components/batch-detail-dialog/batch-detail-dialog.component';
import { BATCH_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/batch-detail-dialog.config';
import { FiscalConfigurationModalComponent } from '../../../settings/components/fiscal-configuration-modal/fiscal-configuration-modal.component';
import { BranchModalComponent } from '../../../settings/components/branch-modal/branch-modal.component';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { VendorDetailModalComponent } from '../../../settings/components/vendor-detail-modal/vendor-detail-modal.component';
import { VendorService } from '../../../settings/services/vendor.service';
import { Vendor } from '../../../settings/models/vendor.model';
import { WarehouseDetailModalComponent } from '../../../settings/components/warehouse-detail-modal/warehouse-detail-modal.component';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { PRODUCT_DETAIL_DIALOG_CONFIG, WAREHOUSE_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { formatTitleCase } from '../../../sales-orders/utils/sales-order-display.util';
import {
  formatPedimentoDisplay,
  formatPurchaseOrderUnitCost,
  isInternationalPurchaseOrder,
  parsePurchaseOrderDecimal,
} from '../../utils/purchase-order-display.util';
import {
  PurchaseOrderPedimentoDialogComponent,
  PurchaseOrderPedimentoDialogResult,
} from '../purchase-order-pedimento-dialog/purchase-order-pedimento-dialog.component';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    NgTemplateOutlet,
    FormsModule,
    MatDialogModule,
    RemoveTrailingZerosPipe,
    SpinnerComponent,
    PurchaseOrderLotsTabComponent,
    PurchaseOrderMovementsTabComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss'],
  host: {
    'class': 'order-detail-dialog-container'
  }
})
export class OrderDetailDialogComponent {
  order = signal<PurchaseOrder | null>(null);
  loading = signal<boolean>(true);
  refreshing = signal(false);
  activeTabIndex = signal<number>(0);
  showReceivedTotals = signal<boolean>(false);
  regeneratingPDF = signal<boolean>(false);
  regeneratingReceipt = signal<boolean>(false);
  uploadingDocument = signal<boolean>(false);
  documentTypes = signal<DocumentType[]>([]);
  selectedDocumentTypeId = signal<number | null>(null);
  showUploadDocumentModal = signal<boolean>(false);
  showRegenerateLanguageModal = signal<boolean>(false);
  regenerateTarget = signal<'original' | 'recepcion' | null>(null);
  selectedRegenerateLanguage = signal<DocumentLanguage>('es');
  keepPreviousDocument = signal(false);
  selectedUploadFile: File | null = null;
  selectedUploadFileName = '';
  uploadDocumentNotes = '';

  canReceive = computed(() => {
    const order = this.order();
    return order && order.general_status !== 'Recibida';
  });

  canCancel = computed(() => {
    const order = this.order();
    return order && order.general_status !== 'Recibida';
  });

  canAddPayment = computed(() => {
    const order = this.order();
    if (!order) return false;
    const status = order.general_status ?? order.status;
    if (status === 'Cancelada') return false;
    return this.getRemainingAmount() >= 0.01;
  });

  /** Editar encabezado (cantidades en formulario). */
  canEditOrder = computed(() => {
    const o = this.order();
    if (!o) return false;
    const st = o.general_status ?? o.status;
    return st === 'Creada' || st === 'En Proceso';
  });

  /** Acciones de línea: lápiz, basura y agregar producto. */
  canEditLines = computed(() => {
    const order = this.order();
    if (!order) return false;
    if (typeof order.can_edit_lines === 'boolean') {
      return order.can_edit_lines;
    }
    return (order.general_status ?? order.status) === 'Creada';
  });

  canEditNotes = computed(() => {
    const status = this.order()?.general_status ?? this.order()?.status ?? '';
    return status !== 'Cancelada';
  });

  isInternationalVendor = computed(() => isInternationalPurchaseOrder(this.order()));

  canEditPedimento = computed(() => {
    if (!this.isInternationalVendor()) {
      return false;
    }
    const status = this.order()?.general_status ?? this.order()?.status ?? '';
    return status === 'Creada' || status === 'Recibida';
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    private dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private fiscalConfigService: FiscalConfigurationService,
    private vendorService: VendorService,
    private warehouseService: WarehouseService
  ) {
    this.loadDocumentTypes();
    this.loadOrder();
  }

  loadOrder(silent = false): void {
    if (!silent) {
      this.loading.set(true);
    } else {
      this.refreshing.set(true);
    }
    this.purchaseOrderService.getOrderById(this.data.orderId).subscribe({
      next: (order) => {
        this.order.set(order);
        const status = order.general_status ?? order.status;
        if (status === 'Recibida') {
          this.showReceivedTotals.set(true);
        }
        this.loadDocuments(order.id);
        this.loading.set(false);
        this.refreshing.set(false);
      },
      error: (error) => {
        console.error('Error loading order:', error);
        this.loading.set(false);
        this.refreshing.set(false);
      }
    });
  }

  refreshOrder(): void {
    if (this.refreshing() || this.loading()) return;
    this.loadOrder(true);
  }

  close(): void {
    this.dialogRef.close(true);
  }

  goToEditForm(): void {
    const id = this.order()?.id;
    if (!id) return;
    this.dialogRef.close(true);
    void this.router.navigate(['/purchase-orders', id, 'edit']);
  }

  openEditLineItem(item: LineItem): void {
    const order = this.order();
    if (!order || !this.canEditLines()) return;

    this.dialog
      .open(EditPurchaseOrderLineDialogComponent, {
        width: '460px',
        maxWidth: '95vw',
        panelClass: 'po-line-dialog-panel',
        autoFocus: 'first-tabbable',
        data: {
          orderId: order.id,
          folio: order.folio,
          currency: this.getPaymentCurrency(),
          lineItem: item,
        },
      })
      .afterClosed()
      .subscribe((updated: PurchaseOrder | undefined) => {
        if (!updated) return;
        this.applyLineMutation(updated);
        this.toast.success('Línea actualizada');
      });
  }

  confirmDeleteLineItem(item: LineItem): void {
    const order = this.order();
    if (!order || !this.canEditLines()) return;

    const name = item.product?.name || 'este producto';
    this.dialog
      .open(AlertDialogComponent, {
        width: '420px',
        data: {
          title: 'Eliminar producto',
          message: `¿Eliminar ${name} de esta orden? Se recalcularán los totales.`,
          type: 'warning',
          text_accept: 'Eliminar',
          text_cancel: 'Cancelar',
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return;
        this.purchaseOrderService.deleteLineItem(order.id, item.id).subscribe({
          next: (updated) => {
            this.applyLineMutation(updated);
            this.toast.success('Producto eliminado');
          },
          error: (error: Error) => {
            this.toast.error(error?.message || 'No se pudo eliminar la línea');
          },
        });
      });
  }

  openAddLineItem(): void {
    const order = this.order();
    if (!order || !this.canEditLines()) return;
    if (!order.vendor_id) {
      this.toast.error('La orden no tiene proveedor');
      return;
    }

    this.dialog
      .open(AddPurchaseOrderLineDialogComponent, {
        width: '760px',
        maxWidth: '95vw',
        panelClass: 'po-line-dialog-panel',
        autoFocus: 'first-tabbable',
        data: {
          orderId: order.id,
          vendorId: order.vendor_id,
          currency: this.getPaymentCurrency(),
          folio: order.folio,
        },
      })
      .afterClosed()
      .subscribe((updated: PurchaseOrder | undefined) => {
        if (!updated) return;
        this.applyLineMutation(updated);
        this.toast.success('Producto agregado');
      });
  }

  /** Pinta líneas y totales con la respuesta de PATCH/DELETE/POST (sin GET extra). */
  private applyLineMutation(updated: PurchaseOrder): void {
    const current = this.order();
    if (!updated?.id || !Array.isArray(updated.line_items)) {
      this.loadOrder(true);
      return;
    }

    this.order.set({
      ...current,
      ...updated,
      documents: updated.documents ?? current?.documents,
      payments: updated.payments ?? current?.payments ?? [],
      batches: updated.batches ?? current?.batches,
      batches_summary: updated.batches_summary ?? current?.batches_summary,
      movements: updated.movements ?? current?.movements,
      movements_count: updated.movements_count ?? current?.movements_count,
    });
  }

  openNotesEditor(): void {
    const order = this.order();
    if (!order || !this.canEditNotes()) {
      return;
    }

    this.dialog
      .open(PurchaseOrderNotesDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        autoFocus: 'textarea',
        data: {
          orderId: order.id,
          notes: order.notes ?? '',
          folio: order.folio,
        },
      })
      .afterClosed()
      .subscribe((result: PurchaseOrderNotesDialogResult | undefined) => {
        if (!result?.saved) {
          return;
        }

        this.order.update((current) =>
          current ? { ...current, notes: result.notes ?? undefined } : current
        );
        this.toast.success(result.notes ? 'Notas actualizadas' : 'Notas eliminadas');
      });
  }

  formatPedimento(value?: string | null): string {
    return formatPedimentoDisplay(value);
  }

  openPedimentoEditor(): void {
    const order = this.order();
    if (!order || !this.canEditPedimento()) {
      return;
    }

    this.dialog
      .open(PurchaseOrderPedimentoDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        autoFocus: 'input',
        data: {
          orderId: order.id,
          pedimentoNumber: order.pedimento_number ?? '',
          folio: order.folio,
        },
      })
      .afterClosed()
      .subscribe((result: PurchaseOrderPedimentoDialogResult | undefined) => {
        if (!result?.saved) {
          return;
        }

        this.order.update((current) =>
          current ? { ...current, pedimento_number: result.pedimento_number } : current
        );
        this.toast.success(result.pedimento_number ? 'Pedimento actualizado' : 'Pedimento eliminado');
      });
  }

  toggleTotals(showReceived: boolean): void {
    this.showReceivedTotals.set(showReceived);
  }

  getSubtotal(): string {
    return this.formatAmount(this.displayedSubtotalAmount());
  }

  getIVA(): string {
    return this.formatAmount(this.displayedIvaAmount());
  }

  getIEPS(): string {
    return this.formatAmount(this.displayedIepsAmount());
  }

  getTotal(): string {
    return this.formatAmount(this.displayedTotalAmount());
  }

  displayedSubtotalAmount(): number {
    const order = this.order();
    if (!order) return 0;
    return this.parseNumber(this.showReceivedTotals() ? order.received_subtotal : order.requested_subtotal);
  }

  displayedIvaAmount(): number {
    const order = this.order();
    if (!order) return 0;
    return this.parseNumber(this.showReceivedTotals() ? order.received_iva_total : order.requested_iva_total);
  }

  displayedIepsAmount(): number {
    const order = this.order();
    if (!order) return 0;
    return this.parseNumber(this.showReceivedTotals() ? order.received_ieps_total : order.requested_ieps_total);
  }

  displayedTotalAmount(): number {
    const order = this.order();
    if (!order) return 0;
    return this.parseNumber(this.showReceivedTotals() ? order.received_total : order.requested_total);
  }

  hasDisplayedIva(): boolean {
    return this.displayedIvaAmount() > 0;
  }

  hasDisplayedIeps(): boolean {
    return this.displayedIepsAmount() > 0;
  }

  /** Columna IVA si alguna línea tiene IVA (solicitado o recibido). */
  hasLineIvaColumn(): boolean {
    return (this.order()?.line_items ?? []).some(
      (item) =>
        this.parseNumber(item.iva_percentage) > 0 ||
        this.parseNumber(item.line_iva) > 0 ||
        this.parseNumber(item.received_original_iva_percentage) > 0 ||
        this.parseNumber(item.received_original_iva_unit) > 0
    );
  }

  hasLineIepsColumn(): boolean {
    return (this.order()?.line_items ?? []).some(
      (item) =>
        this.parseNumber(item.ieps_percentage) > 0 ||
        this.parseNumber(item.line_ieps) > 0 ||
        this.parseNumber(item.received_original_ieps_percentage) > 0 ||
        this.parseNumber(item.received_original_ieps_unit) > 0
    );
  }

  hasLineTax(item: LineItem): boolean {
    return this.getLineIvaAmount(item) > 0 || this.getLineIepsAmount(item) > 0;
  }

  /** Costo unitario sin IVA. En Recibidos usa el costo de recepción si viene. */
  getLineUnitCost(item: LineItem): number {
    if (this.showReceivedTotals()) {
      const received = parsePurchaseOrderDecimal(item.received_original_unit_total);
      if (received > 0) return received;
    }
    return parsePurchaseOrderDecimal(item.unit_total);
  }

  getLineDisplayQuantity(item: LineItem): number {
    if (this.showReceivedTotals()) {
      return this.parseNumber(item.received_original_quantity);
    }
    return this.parseNumber(item.quantity);
  }

  /** Importe de línea sin IVA. */
  getLineSubtotal(item: LineItem): number {
    if (this.showReceivedTotals()) {
      const qty = this.getLineDisplayQuantity(item);
      if (qty <= 0) return 0;
      return this.parseNumber(this.getLineUnitCost(item) * qty);
    }
    return this.parseNumber(item.line_subtotal);
  }

  getLineIvaPercent(item: LineItem): number {
    if (this.showReceivedTotals() && item.received_original_iva_percentage != null) {
      return this.parseNumber(item.received_original_iva_percentage);
    }
    return this.parseNumber(item.iva_percentage);
  }

  /** IVA de la línea en dinero. */
  getLineIvaAmount(item: LineItem): number {
    if (this.showReceivedTotals()) {
      const qty = this.getLineDisplayQuantity(item);
      if (qty <= 0) return 0;
      const unit = this.parseNumber(item.received_original_iva_unit ?? item.iva_unit);
      if (unit > 0) return this.parseNumber(unit * qty);
      const pct = this.getLineIvaPercent(item);
      if (pct <= 0) return 0;
      return this.parseNumber((this.getLineSubtotal(item) * pct) / 100);
    }
    return this.parseNumber(item.line_iva);
  }

  getLineIepsPercent(item: LineItem): number {
    if (this.showReceivedTotals() && item.received_original_ieps_percentage != null) {
      return this.parseNumber(item.received_original_ieps_percentage);
    }
    return this.parseNumber(item.ieps_percentage);
  }

  getLineIepsAmount(item: LineItem): number {
    if (this.showReceivedTotals()) {
      const qty = this.getLineDisplayQuantity(item);
      if (qty <= 0) return 0;
      const unit = this.parseNumber(item.received_original_ieps_unit ?? item.ieps_unit);
      if (unit > 0) return this.parseNumber(unit * qty);
      const pct = this.getLineIepsPercent(item);
      if (pct <= 0) return 0;
      return this.parseNumber((this.getLineSubtotal(item) * pct) / 100);
    }
    return this.parseNumber(item.line_ieps);
  }

  /** Importe de línea con IVA + IEPS. */
  getLineTotal(item: LineItem): number {
    if (this.showReceivedTotals()) {
      return this.parseNumber(
        this.getLineSubtotal(item) + this.getLineIvaAmount(item) + this.getLineIepsAmount(item)
      );
    }
    const persisted = this.parseNumber(item.line_total);
    if (persisted > 0) return persisted;
    return this.parseNumber(
      this.getLineSubtotal(item) + this.getLineIvaAmount(item) + this.getLineIepsAmount(item)
    );
  }

  hasReceivedQuantity(item: LineItem): boolean {
    return this.parseNumber(item.received_original_quantity) > 0;
  }

  getProductsColspan(): number {
    let count = 5;
    if (this.hasLineIvaColumn()) count += 1;
    if (this.hasLineIepsColumn()) count += 1;
    if (this.canEditLines()) count += 1;
    return count;
  }

  formatAmount(value: number | string | null | undefined): string {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.parseNumber(value));
  }

  formatUnitCost(value: number | string | null | undefined): string {
    return formatPurchaseOrderUnitCost(value);
  }

  getTotalColor(): string {
    return this.showReceivedTotals() ? 'text-green-600' : 'text-blue-600';
  }

  formatCurrency(value: number | string): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return this.formatAmount(0);
    return this.formatAmount(numValue);
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

  getOrderTotalForPayments(): number {
    const order = this.order();
    if (!order) return 0;
    const summary = order.payments_summary;
    if (summary) {
      const paid = this.parseNumber(summary.amount_paid);
      const pending = this.parseNumber(summary.amount_pending);
      return Math.max(paid + pending, 0);
    }
    return this.parseNumber(
      order.requested_total ??
      order.grand_total ??
      order.total_subtotal ??
      0
    );
  }

  getPaidAmount(): number {
    const order = this.order();
    if (order?.payments_summary) {
      return this.parseNumber(order.payments_summary.amount_paid);
    }
    if (!order?.payments?.length) return 0;
    return order.payments.reduce((sum, p) => sum + this.parseNumber(p.amount), 0);
  }

  getRemainingAmount(): number {
    const order = this.order();
    if (!order) return 0;
    if (order.payments_summary) {
      return Math.max(this.parseNumber(order.payments_summary.amount_pending), 0);
    }
    const backendRemaining = this.parseNumber(order.remaining_amount ?? 0);
    if (backendRemaining > 0) {
      return backendRemaining;
    }
    return Math.max(this.getOrderTotalForPayments() - this.getPaidAmount(), 0);
  }

  getPaidPercent(): number {
    const total = this.getOrderTotalForPayments();
    if (total <= 0) return 0;
    return Math.min((this.getPaidAmount() / total) * 100, 100);
  }

  parseNumber(value: number | string | null | undefined): number {
    if (value === null || value === undefined) return 0;
    const parsed = typeof value === 'string' ? parseFloat(value) : value;
    return Number.isFinite(parsed) ? Math.round(parsed * 100) / 100 : 0;
  }

  getPaymentCurrency(): 'MXN' | 'USD' {
    const order = this.order();
    return order?.payments_summary?.currency ?? order?.payment_currency ?? 'MXN';
  }

  getPaymentStatus(): string {
    const order = this.order();
    return order?.payments_summary?.payment_status ?? order?.payment_status ?? 'Pendiente';
  }

  getPaymentStatusClass(): string {
    const status = this.getPaymentStatus().trim().toLowerCase();
    if (status === 'pagado' || status === 'pagada') {
      return 'status-paid';
    }
    if (status === 'parcial') {
      return 'status-partial';
    }
    return 'status-pending';
  }

  formatPaymentCurrency(value: number | string): string {
    const amount = this.parseNumber(value);
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: this.getPaymentCurrency(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number.isFinite(amount) ? amount : 0);
  }

  initiateReceipt(): void {
    const order = this.order();
    if (!order) return;

    const dialogRef = this.dialog.open(ReceiptModalComponent, {
      data: { purchaseOrder: order },
      width: '900px',
      maxWidth: '96vw',
      maxHeight: '90vh',
      panelClass: 'receipt-modal-panel',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showReceivedTotals.set(true);
        this.activeTabIndex.set(0);
        this.loadOrder();
      }
    });
  }

  cancelOrder(): void {
    console.log('Cancelar orden');
  }

  registerPayment(): void {
    const order = this.order();
    if (!order) return;
    const remainingAmount = this.getRemainingAmount();
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '660px',
      maxWidth: '95vw',
      panelClass: 'payment-dialog-panel',
      data: {
        remainingAmount,
        totalAmount: this.getOrderTotalForPayments(),
        currency: this.getPaymentCurrency()
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((paymentData: PaymentFormData | null) => {
      if (!paymentData) return;
      this.purchaseOrderService.registerPayment(order.id, paymentData).subscribe({
        next: () => {
          this.toast.success('Pago registrado exitosamente');
          this.loadOrder();
        },
        error: (error) => {
          this.toast.error(error?.message || 'Error al registrar pago');
        }
      });
    });
  }

  regeneratePDF(): void {
    this.openRegenerateLanguageModal('original');
  }

  regenerateReceivingPDF(): void {
    this.openRegenerateLanguageModal('recepcion');
  }

  openRegenerateLanguageModal(target: 'original' | 'recepcion'): void {
    if (this.regeneratingPDF() || this.regeneratingReceipt()) return;
    this.regenerateTarget.set(target);
    this.selectedRegenerateLanguage.set(this.getDefaultDocumentLanguage(target));
    this.keepPreviousDocument.set(false);
    this.showRegenerateLanguageModal.set(true);
  }

  closeRegenerateLanguageModal(): void {
    if (this.regeneratingPDF() || this.regeneratingReceipt()) return;
    this.showRegenerateLanguageModal.set(false);
    this.regenerateTarget.set(null);
  }

  confirmRegenerateDocument(): void {
    const orderId = this.order()?.id;
    const target = this.regenerateTarget();
    const language = this.selectedRegenerateLanguage();
    const keepPrevious = this.keepPreviousDocument();
    if (!orderId || !target || this.isRegeneratingDocument()) return;

    const isOriginal = target === 'original';
    if (isOriginal) {
      this.regeneratingPDF.set(true);
    } else {
      this.regeneratingReceipt.set(true);
    }

    const request$ = isOriginal
      ? this.purchaseOrderService.regenerateOriginalPDF(orderId, language, keepPrevious)
      : this.purchaseOrderService.regenerateReceiptPDF(orderId, language, keepPrevious);

    request$.subscribe({
      next: (response) => {
        if (isOriginal) {
          this.regeneratingPDF.set(false);
        } else {
          this.regeneratingReceipt.set(false);
        }
        this.showRegenerateLanguageModal.set(false);
        this.regenerateTarget.set(null);
        this.cdr.detectChanges();
        this.toast.success(response?.message || (
          isOriginal ? 'PDF original regenerado exitosamente' : 'PDF de recepción regenerado exitosamente'
        ));
        this.loadOrder();
      },
      error: (error) => {
        if (isOriginal) {
          this.regeneratingPDF.set(false);
        } else {
          this.regeneratingReceipt.set(false);
        }
        this.cdr.detectChanges();
        this.toast.error(
          error?.message || (isOriginal ? 'Error al regenerar PDF original' : 'Error al regenerar PDF de recepción')
        );
        console.error('Error regenerating document:', error);
      }
    });
  }

  getDefaultDocumentLanguage(target: 'original' | 'recepcion'): DocumentLanguage {
    const docs = this.order()?.documents ?? [];
    const typeNames = target === 'original'
      ? ['DOCUMENTO_ORIGINAL']
      : ['DOCUMENTO_RECIBO', 'DOCUMENTO_RECEPCION'];
    const doc = docs.find(d => typeNames.includes(d.document_type_name));
    return doc?.document_language === 'en' ? 'en' : 'es';
  }

  getDocumentLanguageLabel(language?: DocumentLanguage | string | null): string | null {
    if (language === 'es') return 'ES';
    if (language === 'en') return 'EN';
    return null;
  }

  isRegeneratingDocument(): boolean {
    return this.regeneratingPDF() || this.regeneratingReceipt();
  }

  openUploadDocumentModal(): void {
    this.selectedUploadFile = null;
    this.selectedUploadFileName = '';
    this.uploadDocumentNotes = '';
    this.showUploadDocumentModal.set(true);
  }

  closeUploadDocumentModal(): void {
    if (this.uploadingDocument()) return;
    this.showUploadDocumentModal.set(false);
  }

  openDocumentPicker(input: HTMLInputElement): void {
    if (this.uploadingDocument()) return;
    input.click();
  }

  onDocumentFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.selectedUploadFile = file;
    this.selectedUploadFileName = file.name;
    input.value = '';
  }

  submitUploadDocument(): void {
    const order = this.order();
    const documentTypeId = this.selectedDocumentTypeId();
    const file = this.selectedUploadFile;
    if (!order || !file) return;

    if (!documentTypeId) {
      this.toast.warning('Selecciona un tipo de documento');
      return;
    }

    this.uploadingDocument.set(true);
    this.purchaseOrderService.uploadOrderDocument(order.id, file, Number(documentTypeId)).subscribe({
      next: () => {
        this.uploadingDocument.set(false);
        this.showUploadDocumentModal.set(false);
        this.selectedUploadFile = null;
        this.selectedUploadFileName = '';
        this.uploadDocumentNotes = '';
        this.toast.success('Documento subido correctamente');
        this.loadDocuments(order.id);
      },
      error: (error) => {
        this.uploadingDocument.set(false);
        this.toast.error(error?.message || 'Error al subir documento');
      }
    });
  }

  getDocumentBadgeClass(documentType: string): string {
    const typeMap: { [key: string]: string } = {
      'DOCUMENTO_ORIGINAL': 'badge-blue',
      'DOCUMENTO_RECIBO': 'badge-green',
      'DOCUMENTO_RECEPCION': 'badge-green'
    };
    return typeMap[documentType] || 'badge-gray';
  }

  formatDocumentDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    return `${day} de ${month}`;
  }

  downloadDocument(doc: any): void {
    if (doc.path) {
      window.open(doc.path, '_blank');
    }
  }

  deleteDocument(doc: Document): void {
    const order = this.order();
    if (!order) return;
    this.purchaseOrderService.deleteOrderDocument(doc.id).subscribe({
      next: () => {
        this.toast.success('Documento eliminado');
        this.loadDocuments(order.id);
      },
      error: (error) => {
        this.toast.error(error?.message || 'No se pudo eliminar el documento');
      }
    });
  }

  hasDocuments(): boolean {
    const order = this.order();
    return order && order.documents && order.documents.length > 0;
  }

  private loadDocuments(orderId: string): void {
    this.purchaseOrderService.getOrderDocuments(orderId).subscribe({
      next: (resp) => {
        const current = this.order();
        if (!current) return;
        this.order.set({
          ...current,
          documents: Array.isArray(resp?.data) ? resp.data : []
        });
      },
      error: (error) => {
        console.error('Error loading documents:', error);
      }
    });
  }

  private loadDocumentTypes(): void {
    this.purchaseOrderService.getOrderDocumentTypes().subscribe({
      next: (resp) => {
        const types = Array.isArray(resp?.data) ? resp.data : [];
        this.documentTypes.set(types);
        if (!this.selectedDocumentTypeId() && types.length > 0) {
          this.selectedDocumentTypeId.set(types[0].id);
        }
      },
      error: (error) => {
        console.error('Error loading document types:', error);
      }
    });
  }

  openBatchDetail(batchId: string): void {
    if (!batchId) return;
    this.dialog.open(BatchDetailDialogComponent, {
      ...BATCH_DETAIL_DIALOG_OPTIONS,
      data: { batchId },
    });
  }

  getLineItemsCount(): number {
    return this.order()?.line_items?.length ?? 0;
  }

  getDocumentsCount(): number {
    return this.order()?.documents?.length ?? 0;
  }

  getBatchesCount(): number {
    const summary = this.order()?.batches_summary;
    if (summary?.received_lots != null) {
      return summary.received_lots;
    }
    return purchaseOrderReceivedLots(this.order()?.batches).length;
  }

  getMigratedLotsCount(): number {
    return this.order()?.batches_summary?.migrated_lots ?? 0;
  }

  getMovementsCount(): number {
    const order = this.order();
    if (order?.movements_count != null) {
      return order.movements_count;
    }
    return order?.movements?.length ?? 0;
  }

  getPaymentsCount(): number {
    return this.order()?.payments?.length ?? 0;
  }

  getStatusBadgeClass(): string {
    const status = (this.order()?.general_status ?? this.order()?.status ?? '').toString();
    if (status === 'Recibida') return 'status-badge--success';
    if (status === 'En Proceso') return 'status-badge--warning';
    if (status === 'Creada') return 'status-badge--info';
    if (status === 'Cancelada') return 'status-badge--danger';
    return 'status-badge--neutral';
  }

  getFiscalDisplayName(): string {
    return this.getRazonSocialDisplayName();
  }

  getRazonSocialDisplayName(): string {
    const order = this.order();
    const value = order?.razon_social ?? order?.fiscal_configuration?.razon_social;
    if (!value?.trim()) {
      return '—';
    }
    return formatTitleCase(value.trim());
  }

  getRazonSocialSubtitle(): string {
    const fiscal = this.order()?.fiscal_configuration;
    const rfc = fiscal?.rfc?.trim() || '';
    const prefix = fiscal?.prefix?.trim();
    if (rfc && prefix) return `${rfc} · ${prefix}`;
    return rfc || prefix || '';
  }

  getSucursalDisplayName(): string {
    const order = this.order();
    const value = order?.sucursal ?? order?.billing_branch?.code;
    if (!value?.trim()) {
      return '—';
    }
    return formatTitleCase(value.trim());
  }

  getSucursalSubtitle(): string {
    const branch = this.order()?.billing_branch;
    if (!branch) {
      return '';
    }
    return [branch.city, branch.state].filter(Boolean).join(', ');
  }

  getWarehouseDisplayName(): string {
    const name = this.order()?.warehouse?.name;
    if (!name?.trim()) {
      return '—';
    }
    return formatTitleCase(name.trim());
  }

  canOpenBranch(): boolean {
    const order = this.order();
    const branchId = order?.billing_branch_id ?? order?.billing_branch?.id;
    const fiscalId = order?.fiscal_configuration_id ?? order?.fiscal_configuration?.id;
    return !!(branchId && fiscalId);
  }

  openBranchDialog(): void {
    const order = this.order();
    const branchId = order?.billing_branch_id ?? order?.billing_branch?.id;
    const fiscalConfigId = order?.fiscal_configuration_id ?? order?.fiscal_configuration?.id;
    if (!branchId || !fiscalConfigId) return;

    this.dialog.open(BranchModalComponent, {
      data: { fiscalConfigId, branchId },
      width: '80vw',
      maxWidth: '1000px',
    });
  }

  canOpenProduct(item: LineItem): boolean {
    return !!(item.product?.id || item.product_id);
  }

  openProductDetail(item: LineItem): void {
    const productId = item.product?.id ?? item.product_id;
    if (!productId) return;
    this.dialog.open(ProductDetailModalComponent, {
      ...PRODUCT_DETAIL_DIALOG_CONFIG,
      data: {
        product: {
          id: productId,
          name: item.product?.name,
          sku: item.product?.sku,
        },
        isNew: false,
      },
    });
  }

  canOpenVendor(): boolean {
    return !!(this.order()?.vendor_id || this.order()?.vendor?.id);
  }

  canOpenWarehouse(): boolean {
    return !!(this.order()?.warehouse_id || this.order()?.warehouse?.id);
  }

  canOpenFiscal(): boolean {
    return !!(this.order()?.fiscal_configuration_id || this.order()?.fiscal_configuration?.id);
  }

  openVendorDialog(): void {
    const vendorId = this.order()?.vendor?.id ?? this.order()?.vendor_id;
    if (!vendorId) return;

    const openModal = (vendor: Vendor) => {
      this.dialog.open(VendorDetailModalComponent, {
        data: { vendor },
        width: '80vw',
        maxWidth: '1000px',
      }).afterClosed().subscribe((savedVendor?: Vendor) => {
        if (!savedVendor) {
          return;
        }
        this.loadOrder(true);
      });
    };

    const embedded = this.order()?.vendor;
    this.vendorService.getVendor(String(vendorId)).subscribe({
      next: (vendor) => openModal(vendor),
      error: () => {
        if (embedded) {
          openModal({ ...embedded, id: String(vendorId) } as unknown as Vendor);
        }
      },
    });
  }

  openWarehouseDialog(): void {
    const warehouseId = this.order()?.warehouse?.id ?? this.order()?.warehouse_id;
    if (!warehouseId) return;

    const openModal = (warehouse: Warehouse) => {
      this.dialog.open(WarehouseDetailModalComponent, {
        ...WAREHOUSE_DETAIL_DIALOG_CONFIG,
        data: { warehouse },
      });
    };

    const embedded = this.order()?.warehouse;
    this.warehouseService.getWarehouse(warehouseId).subscribe({
      next: (warehouse) => openModal(warehouse),
      error: () => {
        if (embedded) {
          openModal({ id: warehouseId, name: embedded.name } as Warehouse);
        }
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
    this.fiscalConfigService.getFiscalConfiguration(fiscalId).subscribe({
      next: (fiscalConfig) => openModal(fiscalConfig),
      error: () => {
        if (embedded) {
          openModal({ ...embedded, id: fiscalId } as FiscalConfiguration);
        }
      },
    });
  }
}
