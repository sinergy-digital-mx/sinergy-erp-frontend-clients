import { Component, Inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { Document, DocumentLanguage, DocumentType, PurchaseOrder } from '../../models/purchase-order.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import {
  PurchaseOrderNotesDialogComponent,
  PurchaseOrderNotesDialogResult,
} from '../purchase-order-notes-dialog/purchase-order-notes-dialog.component';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { ReceiptModalComponent } from '../receipt-modal/receipt-modal.component';
import { PaymentDialogComponent, PaymentFormData } from '../payment-dialog/payment-dialog.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { BatchDetailDialogComponent } from '../../../inventory/components/batch-detail-dialog/batch-detail-dialog.component';
import { FiscalConfigurationModalComponent } from '../../../settings/components/fiscal-configuration-modal/fiscal-configuration-modal.component';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { VendorDetailModalComponent } from '../../../settings/components/vendor-detail-modal/vendor-detail-modal.component';
import { VendorService } from '../../../settings/services/vendor.service';
import { Vendor } from '../../../settings/models/vendor.model';
import { WarehouseDetailModalComponent } from '../../../settings/components/warehouse-detail-modal/warehouse-detail-modal.component';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { Warehouse } from '../../../settings/models/warehouse.model';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    RemoveTrailingZerosPipe
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

  /** Abrir formulario de edición (cantidades, líneas, etc.). */
  canEditOrder = computed(() => {
    const o = this.order();
    if (!o) return false;
    const st = o.general_status ?? o.status;
    return st === 'Creada' || st === 'En Proceso';
  });

  canEditNotes = computed(() => {
    const status = this.order()?.general_status ?? this.order()?.status ?? '';
    return status !== 'Cancelada';
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    private dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    public taxCalculator: TaxCalculatorService,
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

  loadOrder(): void {
    this.loading.set(true);
    this.purchaseOrderService.getOrderById(this.data.orderId).subscribe({
      next: (order) => {
        this.order.set(order);
        this.loadDocuments(order.id);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading order:', error);
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
    void this.router.navigate(['/purchase-orders', id, 'edit']);
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

  toggleTotals(showReceived: boolean): void {
    this.showReceivedTotals.set(showReceived);
  }

  getSubtotal(): string {
    const order = this.order();
    if (!order) return '$0.00';
    const value = this.showReceivedTotals() ? order.received_subtotal : order.requested_subtotal;
    return this.formatCurrency(value);
  }

  getIVA(): string {
    const order = this.order();
    if (!order) return '$0.00';
    const value = this.showReceivedTotals() ? order.received_iva_total : order.requested_iva_total;
    return this.formatCurrency(value);
  }

  getIEPS(): string {
    const order = this.order();
    if (!order) return '$0.00';
    const value = this.showReceivedTotals() ? order.received_ieps_total : order.requested_ieps_total;
    return this.formatCurrency(value);
  }

  getTotal(): string {
    const order = this.order();
    if (!order) return '$0.00';
    const value = this.showReceivedTotals() ? order.received_total : order.requested_total;
    return this.formatCurrency(value);
  }

  getTotalColor(): string {
    return this.showReceivedTotals() ? 'text-green-600' : 'text-blue-600';
  }

  formatCurrency(value: number | string): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(numValue) ? '$0.00' : this.taxCalculator.formatCurrency(numValue);
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
      width: '1120px',
      maxWidth: '98vw',
      maxHeight: '90vh',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Receipt was confirmed, reload order data
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

  openBatchDetail(batch: any): void {
    this.dialog.open(BatchDetailDialogComponent, {
      data: { batchId: batch.id },
      width: '920px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    });
  }

  getLineItemsCount(): number {
    return this.order()?.line_items?.length ?? 0;
  }

  getDocumentsCount(): number {
    return this.order()?.documents?.length ?? 0;
  }

  getBatchesCount(): number {
    return this.order()?.batches?.length ?? 0;
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
    const fiscal = this.order()?.fiscal_configuration;
    return fiscal?.razon_social || fiscal?.business_name || 'N/A';
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
        data: { warehouse },
        width: '80vw',
        maxWidth: '1000px',
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
}
