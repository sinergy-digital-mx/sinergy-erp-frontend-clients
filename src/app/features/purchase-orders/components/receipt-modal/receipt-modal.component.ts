import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiptService } from '../../services/receipt.service';
import { PurchaseOrder, LineItem } from '../../models/purchase-order.model';
import { LotMode, ReceivedItem, ReceivedLot, ReceiptRequest, ReceiptResponse, UomCatalogItem } from '../../models/receipt.model';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { formatPurchaseOrderUnitCost } from '../../utils/purchase-order-display.util';

@Component({
  selector: 'app-receipt-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RemoveTrailingZerosPipe],
  templateUrl: './receipt-modal.component.html',
  styleUrl: './receipt-modal.component.scss'
})
export class ReceiptModalComponent implements OnInit {
  isLoading = false;
  purchaseOrder: PurchaseOrder;
  receivedQuantities: { [key: string]: number | null } = {};
  lotModes: Record<string, LotMode> = {};
  multipleLotsByLine: Record<string, ReceivedLot[]> = {};
  indicateMeasure: Record<string, boolean> = {};
  measureValues: Record<string, number | null> = {};
  measureUomIds: Record<string, string> = {};
  uomCatalog: UomCatalogItem[] = [];

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
      this.purchaseOrder.line_items.forEach((item) => {
        this.receivedQuantities[item.id] = null;
        this.lotModes[item.id] = 'single';
        this.multipleLotsByLine[item.id] = [];
        this.indicateMeasure[item.id] = false;
        this.measureValues[item.id] = null;
        this.measureUomIds[item.id] = '';
      });
    }
    this.receiptService.getUomCatalog(200).subscribe({
      next: (items) => {
        this.uomCatalog = items ?? [];
        this.cdr.detectChanges();
      }
    });
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
   * Nombre de unidad de la línea
   */
  getLineUomName(lineItem: LineItem): string {
    return lineItem.product_uom?.uom?.name || lineItem.uom?.name || 'Unidad';
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

  formatUnitCost(amount: number): string {
    return formatPurchaseOrderUnitCost(amount);
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

  /** Cantidad pedida en la línea. */
  getOrderedQty(lineItem: LineItem): number {
    return Number(lineItem.quantity || 0);
  }

  /** Cantidad ya recibida en recibos anteriores. */
  getAlreadyReceivedQty(lineItem: LineItem): number {
    return Number(lineItem.received_original_quantity || 0);
  }

  /** Cantidad que se está capturando en este recibo (lote único o suma de lotes). */
  getReceivingQty(lineItem: LineItem): number {
    if (this.getLotMode(lineItem.id) === 'multiple') {
      return this.getLotsTotal(lineItem.id);
    }
    return Number(this.receivedQuantities[lineItem.id] || 0);
  }

  /** Lo que falta por recibir tras esta captura. */
  getRemainingQty(lineItem: LineItem): number {
    return Math.max(
      0,
      this.getOrderedQty(lineItem) - this.getAlreadyReceivedQty(lineItem) - this.getReceivingQty(lineItem)
    );
  }

  /** Pendiente máximo de esta línea (ordenado menos ya recibido). */
  getMaxReceivableQty(lineItem: LineItem): number {
    return Math.max(0, this.getOrderedQty(lineItem) - this.getAlreadyReceivedQty(lineItem));
  }

  fillMaxReceivedQty(lineItem: LineItem): void {
    this.receivedQuantities[lineItem.id] = this.getMaxReceivableQty(lineItem);
  }

  getOverReceivedQty(lineItem: LineItem): number {
    return Math.max(
      0,
      this.getAlreadyReceivedQty(lineItem) + this.getReceivingQty(lineItem) - this.getOrderedQty(lineItem)
    );
  }

  isOverReceived(lineItem: LineItem): boolean {
    return this.getOverReceivedQty(lineItem) > 0;
  }

  getProgressPercent(lineItem: LineItem): number {
    const ordered = this.getOrderedQty(lineItem);
    if (ordered <= 0) {
      return 0;
    }
    const done = this.getAlreadyReceivedQty(lineItem) + this.getReceivingQty(lineItem);
    return Math.min(100, (done / ordered) * 100);
  }

  getProductCount(): number {
    return this.purchaseOrder?.line_items?.length ?? 0;
  }

  getReceivingProductCount(): number {
    return (this.purchaseOrder?.line_items ?? []).filter((item) => this.getReceivingQty(item) > 0).length;
  }

  onLotModeChange(lineItemId: string, mode: LotMode): void {
    this.lotModes[lineItemId] = mode;
    if (mode === 'single') {
      this.multipleLotsByLine[lineItemId] = [];
    } else if (!this.multipleLotsByLine[lineItemId] || this.multipleLotsByLine[lineItemId].length === 0) {
      this.addLot(lineItemId);
    }
  }

  isIndicateMeasure(lineItemId: string): boolean {
    return !!this.indicateMeasure[lineItemId];
  }

  onIndicateMeasureChange(lineItemId: string, checked: boolean): void {
    this.indicateMeasure[lineItemId] = checked;
  }

  getMeasureUomName(uomId: string | null | undefined): string {
    const id = (uomId || '').trim();
    if (!id) {
      return '';
    }
    const match = this.uomCatalog.find((item) => item.id === id);
    return (match?.name || match?.abbreviation || '').trim();
  }

  getLineMeasurePreview(lineItemId: string): string {
    const measure = this.parseMeasure(this.measureValues[lineItemId]);
    const unitName = this.getMeasureUomName(this.measureUomIds[lineItemId]);
    if (measure == null || !unitName) {
      return '';
    }
    return `${measure} ${unitName}`;
  }

  addLot(lineItemId: string): void {
    const lineItem = this.getLineItemById(lineItemId);
    if (!lineItem) {
      return;
    }
    const productUomId = lineItem.product_uom?.id || lineItem.product_uom_id || '';
    this.multipleLotsByLine[lineItemId] = [
      ...(this.multipleLotsByLine[lineItemId] || []),
      { tag_identifier: '', quantity: null, product_uom_id: productUomId, measure: null }
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

  private parseMeasure(value: number | string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const parsed = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : null;
  }

  private measureUnitMissingMessage(): string {
    return 'Indica la unidad del tamaño (Foot, PIES, …). No uses la unidad de la orden de compra';
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
      const wantsMeasure = this.isIndicateMeasure(lineItem.id);
      const measureUomId = (this.measureUomIds[lineItem.id] || '').trim();

      if (lotMode === 'single' && quantity > 0) {
        if (wantsMeasure && !measureUomId) {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: this.measureUnitMissingMessage(), type: 'error' },
            duration: 4000
          });
          return;
        }
        if (wantsMeasure && this.parseMeasure(this.measureValues[lineItem.id]) == null) {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: `Indica el tamaño para ${this.getProductName(lineItem)}`, type: 'error' },
            duration: 4000
          });
          return;
        }

        hasValidItems = true;
        const item: ReceivedItem = {
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
        };
        if (wantsMeasure) {
          item.measure = this.parseMeasure(this.measureValues[lineItem.id])!;
          item.measure_uom_id = measureUomId;
        }
        receivedItems.push(item);
      } else if (lotMode === 'multiple') {
        const lots = this.getLots(lineItem.id)
          .map((lot) => ({
            tag_identifier: (lot.tag_identifier || '').trim(),
            quantity: Number(lot.quantity || 0),
            product_uom_id: lot.product_uom_id || lineUomId,
            measure: this.parseMeasure(lot.measure)
          }))
          .filter((lot) => lot.tag_identifier || lot.quantity > 0);

        if (lots.length === 0) {
          continue;
        }

        if (wantsMeasure && !measureUomId) {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: this.measureUnitMissingMessage(), type: 'error' },
            duration: 4000
          });
          return;
        }

        const validationError = this.validateMultipleLots(lineItem, lots);
        if (validationError) {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: validationError, type: 'error' },
            duration: 4000
          });
          return;
        }

        if (wantsMeasure) {
          const missingMeasure = lots.findIndex((lot) => lot.measure == null);
          if (missingMeasure >= 0) {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                message: `El lote ${missingMeasure + 1} en ${this.getProductName(lineItem)} requiere tamaño`,
                type: 'error'
              },
              duration: 4000
            });
            return;
          }
        }

        hasValidItems = true;
        const payloadLots: ReceivedLot[] = lots.map((lot) => {
          const row: ReceivedLot = {
            tag_identifier: lot.tag_identifier,
            quantity: lot.quantity,
            product_uom_id: lot.product_uom_id
          };
          if (wantsMeasure && lot.measure != null) {
            row.measure = lot.measure;
          }
          return row;
        });
        const item: ReceivedItem = {
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
          lots: payloadLots
        };
        if (wantsMeasure) {
          item.measure_uom_id = measureUomId;
        }
        receivedItems.push(item);
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
        const batchNumbers = this.collectBatchNumbers(response);
        const message = batchNumbers.length
          ? `Recibo registrado: ${batchNumbers.join(', ')}`
          : 'Recibo registrado exitosamente';
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message, type: 'success' },
          duration: 4000
        });
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error response:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
        const errorMessage = resolveHttpErrorMessage(error, 'Error al registrar recibo');
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

  private collectBatchNumbers(response: ReceiptResponse): string[] {
    const fromRoot = (response.batches ?? []).map((batch) => batch.batch_number);
    const fromLines = (response.line_items ?? []).flatMap((line) =>
      [...(line.batches ?? []), ...(line.inventory_batches ?? [])].map((batch) => batch.batch_number)
    );
    return [...new Set([...fromRoot, ...fromLines].filter((value): value is string => !!value))];
  }
}
