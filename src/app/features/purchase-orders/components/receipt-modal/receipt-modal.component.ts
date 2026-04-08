import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiptService } from '../../services/receipt.service';
import { PurchaseOrder, LineItem } from '../../models/purchase-order.model';
import { ReceivedItem, ReceiptRequest } from '../../models/receipt.model';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

interface ItemInput {
  line_item_id: string;
  product_id: string;
  uom_id: string;
  quantity: number;
  unit_total: number;
  iva_percentage: number;
  iva_unit: number;
  ieps_percentage: number;
  ieps_unit: number;
  expiration_date: string;
}

@Component({
  selector: 'app-receipt-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './receipt-modal.component.html',
  styleUrl: './receipt-modal.component.scss'
})
export class ReceiptModalComponent implements OnInit {
  isLoading = false;
  purchaseOrder: PurchaseOrder;
  receivedQuantities: { [key: string]: number } = {};
  receivedDates: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ReceiptModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { purchaseOrder: PurchaseOrder }
  ) {
    this.purchaseOrder = data?.purchaseOrder;
  }

  ngOnInit() {
    if (this.purchaseOrder?.line_items) {
      // Initialize quantities and dates objects
      this.purchaseOrder.line_items.forEach((item) => {
        this.receivedQuantities[item.id] = 0;
        this.receivedDates[item.id] = '';
      });
    }
  }

  /**
   * Obtener nome do produto
   */
  getProductName(lineItem: LineItem): string {
    return lineItem.product?.name || 'Produto desconhecido';
  }

  /**
   * Obtener SKU del producto
   */
  getProductSku(lineItem: LineItem): string {
    return lineItem.product?.sku || '-';
  }

  /**
   * Obtener cantidad ordenada
   */
  getOrderedQuantity(lineItem: LineItem): string {
    return `${lineItem.quantity} ${lineItem.product_uom?.uom?.name || 'Unidad'}`;
  }

  /**
   * Enviar recibo
   */
  onSubmit(): void {
    console.log('onSubmit called');
    console.log('receivedQuantities:', this.receivedQuantities);

    if (!this.purchaseOrder?.line_items || this.purchaseOrder.line_items.length === 0) {
      console.log('No items');
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'No hay items para recibir', type: 'error' },
        duration: 3000
      });
      return;
    }

    // Validar que al menos un item tenga cantidad > 0
    let hasValidItems = false;
    const receivedItems: ReceivedItem[] = [];

    for (const lineItem of this.purchaseOrder.line_items) {
      const quantity = Number(this.receivedQuantities[lineItem.id] || 0);
      console.log(`Item ${lineItem.id}: quantity=${quantity}`);
      
      if (quantity > 0) {
        hasValidItems = true;
        receivedItems.push({
          line_item_id: lineItem.id,
          product_id: lineItem.product_id,
          product_uom_id: lineItem.product_uom?.id || lineItem.product_uom_id,
          quantity: quantity,
          unit_total: lineItem.unit_total || 0,
          iva_percentage: lineItem.iva_percentage || 0,
          iva_unit: lineItem.iva_unit || 0,
          ieps_percentage: lineItem.ieps_percentage || 0,
          ieps_unit: lineItem.ieps_unit || 0,
          expiration_date: this.receivedDates[lineItem.id] || ''
        });
      }
    }

    console.log('hasValidItems:', hasValidItems);
    console.log('receivedItems:', receivedItems);

    if (!hasValidItems) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Debes recibir al menos un item', type: 'error' },
        duration: 3000
      });
      return;
    }

    this.isLoading = true;
    const request: ReceiptRequest = { received_items: receivedItems };

    console.log('Sending request:', request);

    this.receiptService.receiveItems(this.purchaseOrder.id, request).subscribe({
      next: (response) => {
        console.log('Success response:', response);
        this.isLoading = false;
        this.cdr.detectChanges();
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Recibo registrado exitosamente', type: 'success' },
          duration: 3000
        });
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error response:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
        const errorMessage = error.error?.message || 
                            (Array.isArray(error.error?.message) ? error.error.message.join(', ') : 'Error al registrar recibo');
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { 
            message: errorMessage, 
            type: 'error' 
          },
          duration: 5000
        });
      }
    });
  }

  /**
   * Cancelar
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Formatear moneda
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  }
}
