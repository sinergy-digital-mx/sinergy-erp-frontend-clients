import { Component, Inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Document, DocumentType, PurchaseOrder } from '../../models/purchase-order.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { ReceiptModalComponent } from '../receipt-modal/receipt-modal.component';
import { PaymentDialogComponent, PaymentFormData } from '../payment-dialog/payment-dialog.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { BatchDetailDialogComponent } from '../../../inventory/components/batch-detail-dialog/batch-detail-dialog.component';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
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
    const paymentStatus = order.payments_summary?.payment_status ?? order.payment_status;
    return this.getRemainingAmount() > 0 && status !== 'Cancelada' && paymentStatus !== 'Pagado';
  });

  /** Abrir formulario de edición (cantidades, líneas, etc.). */
  canEditOrder = computed(() => {
    const o = this.order();
    if (!o) return false;
    const st = o.general_status ?? o.status;
    return st === 'Creada' || st === 'En Proceso';
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    private dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    public taxCalculator: TaxCalculatorService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
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

  parseNumber(value: number | string): number {
    return typeof value === 'string' ? parseFloat(value) : value;
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
          this.snackBar.open('Pago registrado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          this.loadOrder();
        },
        error: (error) => {
          this.snackBar.open(error?.message || 'Error al registrar pago', 'Cerrar', {
            duration: 3500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
    });
  }

  regeneratePDF(): void {
    const orderId = this.order()?.id;
    if (!orderId) return;

    this.regeneratingPDF.set(true);
    this.purchaseOrderService.regenerateOriginalPDF(orderId).subscribe({
      next: () => {
        this.regeneratingPDF.set(false);
        this.cdr.detectChanges();
        this.snackBar.open('PDF original regenerado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        // Reload order data to show new document
        this.loadOrder();
      },
      error: (error) => {
        this.regeneratingPDF.set(false);
        this.cdr.detectChanges();
        this.snackBar.open('Error al regenerar PDF original', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('Error regenerating original PDF:', error);
      }
    });
  }

  regenerateReceivingPDF(): void {
    const orderId = this.order()?.id;
    if (!orderId) return;

    this.regeneratingReceipt.set(true);
    this.purchaseOrderService.regenerateReceiptPDF(orderId).subscribe({
      next: () => {
        this.regeneratingReceipt.set(false);
        this.cdr.detectChanges();
        this.snackBar.open('PDF de recepción regenerado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        // Reload order data to show new document
        this.loadOrder();
      },
      error: (error) => {
        this.regeneratingReceipt.set(false);
        this.cdr.detectChanges();
        this.snackBar.open('Error al regenerar PDF de recepción', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('Error regenerating receipt PDF:', error);
      }
    });
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
      this.snackBar.open('Selecciona un tipo de documento', 'Cerrar', {
        duration: 2800,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
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
        this.snackBar.open('Documento subido correctamente', 'Cerrar', {
          duration: 2800,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.loadDocuments(order.id);
      },
      error: (error) => {
        this.uploadingDocument.set(false);
        this.snackBar.open(error?.message || 'Error al subir documento', 'Cerrar', {
          duration: 3200,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
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
        this.snackBar.open('Documento eliminado', 'Cerrar', {
          duration: 2500,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.loadDocuments(order.id);
      },
      error: (error) => {
        this.snackBar.open(error?.message || 'No se pudo eliminar el documento', 'Cerrar', {
          duration: 3200,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
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
}
