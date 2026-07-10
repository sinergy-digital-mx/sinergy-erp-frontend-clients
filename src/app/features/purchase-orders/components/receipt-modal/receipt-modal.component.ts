import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiptService } from '../../services/receipt.service';
import { PurchaseOrder, LineItem } from '../../models/purchase-order.model';
import { LotMode, ReceivedItem, ReceivedLot, ReceiptRequest } from '../../models/receipt.model';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

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
  lotModes: Record<string, LotMode> = {};
  multipleLotsByLine: Record<string, ReceivedLot[]> = {};

  constructor(
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
        this.lotModes[item.id] = 'single';
        this.multipleLotsByLine[item.id] = [];
      });
    }
  }

  /**
   * Obtener nome do produto
   */
  getProductName(lineItem: LineItem): string {
    return lineItem.product?.name || 'Producto desconocido';
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
    return `${lineItem.quantity} ${lineItem.product_uom?.uom?.name || lineItem.uom?.name || 'Unidad'}`;
  }

  getUnitCost(lineItem: LineItem): number | null {
    const value = lineItem.unit_total ?? lineItem.unit_price;
    return value != null && Number.isFinite(Number(value)) ? Number(value) : null;
  }

  getLineTotal(lineItem: LineItem): number | null {
    const value = lineItem.line_total ?? lineItem.subtotal;
    if (value != null && Number.isFinite(Number(value))) {
      return Number(value);
    }
    const unitCost = this.getUnitCost(lineItem);
    if (unitCost == null) return null;
    return unitCost * Number(lineItem.quantity || 0);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount);
  }

  getLotMode(lineItemId: string): LotMode {
    return this.lotModes[lineItemId] || 'single';
  }

  onLotModeChange(lineItemId: string, mode: LotMode): void {
    this.lotModes[lineItemId] = mode;
    if (mode === 'single') {
      this.multipleLotsByLine[lineItemId] = [];
    } else if (!this.multipleLotsByLine[lineItemId] || this.multipleLotsByLine[lineItemId].length === 0) {
      this.addLot(lineItemId);
    }
  }

  addLot(lineItemId: string): void {
    const lineItem = this.getLineItemById(lineItemId);
    if (!lineItem) {
      return;
    }
    const productUomId = lineItem.product_uom?.id || lineItem.product_uom_id || '';
    this.multipleLotsByLine[lineItemId] = [
      ...(this.multipleLotsByLine[lineItemId] || []),
      { tag_identifier: '', quantity: 0, product_uom_id: productUomId }
    ];
  }

  removeLot(lineItemId: string, lotIndex: number): void {
    const current = [...(this.multipleLotsByLine[lineItemId] || [])];
    current.splice(lotIndex, 1);
    this.multipleLotsByLine[lineItemId] = current;
  }

  getLots(lineItemId: string): ReceivedLot[] {
    return this.multipleLotsByLine[lineItemId] || [];
  }

  getLotsTotal(lineItemId: string): number {
    return this.getLots(lineItemId).reduce((sum, lot) => sum + (Number(lot.quantity) || 0), 0);
  }

  private getLineItemById(lineItemId: string): LineItem | undefined {
    return this.purchaseOrder?.line_items?.find((item) => item.id === lineItemId);
  }

  private getLineUomId(lineItem: LineItem): string {
    return lineItem.product_uom?.id || lineItem.product_uom_id || '';
  }

  private validateMultipleLots(lineItem: LineItem, lots: ReceivedLot[]): string | null {
    if (lots.length === 0) {
      return `Debes agregar al menos un lote para ${this.getProductName(lineItem)}`;
    }

    const lineUomId = this.getLineUomId(lineItem);
    for (let index = 0; index < lots.length; index++) {
      const lot = lots[index];
      const lotNumber = index + 1;
      const tag = (lot.tag_identifier || '').trim();
      if (!tag) {
        return `El lote ${lotNumber} en ${this.getProductName(lineItem)} requiere identificador`;
      }

      const quantity = Number(lot.quantity || 0);
      if (quantity <= 0) {
        return `El lote ${lotNumber} en ${this.getProductName(lineItem)} requiere cantidad mayor a 0`;
      }

      if (lineUomId && lot.product_uom_id !== lineUomId) {
        return `El UOM del lote ${lotNumber} en ${this.getProductName(lineItem)} debe coincidir con la línea`;
      }
    }

    return null;
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
      
      const lotMode = this.getLotMode(lineItem.id);
      const lineUomId = this.getLineUomId(lineItem);
      if (lotMode === 'single' && quantity > 0) {
        hasValidItems = true;
        receivedItems.push({
          line_item_id: lineItem.id,
          product_id: lineItem.product_id,
          product_uom_id: lineUomId,
          quantity: quantity,
          unit_total: lineItem.unit_total || 0,
          iva_percentage: lineItem.iva_percentage || 0,
          iva_unit: lineItem.iva_unit || 0,
          ieps_percentage: lineItem.ieps_percentage || 0,
          ieps_unit: lineItem.ieps_unit || 0,
          expiration_date: null,
          lot_mode: 'single'
        });
      } else if (lotMode === 'multiple') {
        const lots = this.getLots(lineItem.id)
          .map((lot) => ({
            tag_identifier: (lot.tag_identifier || '').trim(),
            quantity: Number(lot.quantity || 0),
            product_uom_id: lot.product_uom_id || lineUomId
          }))
          .filter((lot) => lot.tag_identifier || lot.quantity > 0);

        if (lots.length === 0) {
          continue;
        }

        const validationError = this.validateMultipleLots(lineItem, lots);
        if (validationError) {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: validationError, type: 'error' },
            duration: 4000
          });
          return;
        }

        hasValidItems = true;
        receivedItems.push({
          line_item_id: lineItem.id,
          product_id: lineItem.product_id,
          product_uom_id: lineUomId,
          quantity: lots.reduce((sum, lot) => sum + lot.quantity, 0),
          unit_total: lineItem.unit_total || 0,
          iva_percentage: lineItem.iva_percentage || 0,
          iva_unit: lineItem.iva_unit || 0,
          ieps_percentage: lineItem.ieps_percentage || 0,
          ieps_unit: lineItem.ieps_unit || 0,
          expiration_date: null,
          lot_mode: 'multiple',
          lots
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
}
