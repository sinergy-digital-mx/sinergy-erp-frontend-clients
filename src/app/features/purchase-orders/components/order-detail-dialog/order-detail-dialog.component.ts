import { Component, Inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PurchaseOrder } from '../../models/purchase-order.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { ReceiptModalComponent } from '../receipt-modal/receipt-modal.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
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

  canReceive = computed(() => {
    const order = this.order();
    return order && order.general_status !== 'Recibida';
  });

  canCancel = computed(() => {
    const order = this.order();
    return order && order.general_status !== 'Recibida';
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    private dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    private purchaseOrderService: PurchaseOrderService,
    public taxCalculator: TaxCalculatorService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.loadOrder();
  }

  loadOrder(): void {
    this.loading.set(true);
    this.purchaseOrderService.getOrderById(this.data.orderId).subscribe({
      next: (response: any) => {
        // Handle new structure: { data: { header, documents, products, batches, payments } }
        if (response.data?.header) {
          const orderData = response.data.header;
          // Merge documents from the data level
          if (response.data.documents) {
            orderData.documents = response.data.documents;
          }
          this.order.set(orderData);
        } else {
          // Handle old structure: direct order object
          this.order.set(response);
        }
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

  parseNumber(value: number | string): number {
    return typeof value === 'string' ? parseFloat(value) : value;
  }

  initiateReceipt(): void {
    const order = this.order();
    if (!order) return;

    const dialogRef = this.dialog.open(ReceiptModalComponent, {
      data: { purchaseOrder: order },
      width: '600px',
      maxWidth: '95vw',
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

  uploadDocument(): void {
    console.log('Subir documento');
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

  deleteDocument(doc: any): void {
    console.log('Eliminar documento:', doc.id);
  }

  hasDocuments(): boolean {
    const order = this.order();
    return order && order.documents && order.documents.length > 0;
  }
}
