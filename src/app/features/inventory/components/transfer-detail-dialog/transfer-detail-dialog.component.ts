import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InventoryTransferService } from '../../services/inventory-transfer.service';
import { InventoryTransfer, TransferLine, TransferProductSummary } from '../../models/inventory-transfer.model';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { formatApiDate } from '../../../../core/utils/api-datetime.util';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';
import { BATCH_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/batch-detail-dialog.config';
import { TransferLocationPathComponent } from '../transfer-location-path/transfer-location-path.component';
import { ToastService } from '../../../../core/services/toast.service';
import { X, ArrowRight, Download } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import {
  TransferLocationView,
  fromTransferWarehouse,
  isSameFiscal,
} from '../../utils/transfer-location.util';

@Component({
  selector: 'app-transfer-detail-dialog',
  standalone: true,
  imports: [CommonModule, RemoveTrailingZerosPipe, LucideAngularModule, TransferLocationPathComponent, SpinnerComponent],
  templateUrl: './transfer-detail-dialog.component.html',
  styleUrl: './transfer-detail-dialog.component.scss',
})
export class TransferDetailDialogComponent implements OnInit {
  readonly X = X;
  readonly ArrowRight = ArrowRight;
  readonly Download = Download;

  transfer = signal<InventoryTransfer | null>(null);
  loading = signal(true);
  downloadingPdf = signal(false);

  sourceLocation = computed<TransferLocationView | null>(() => {
    const t = this.transfer();
    return t ? fromTransferWarehouse(t.source_warehouse) : null;
  });

  destLocation = computed<TransferLocationView | null>(() => {
    const t = this.transfer();
    return t ? fromTransferWarehouse(t.destination_warehouse) : null;
  });

  fiscalRelation = computed(() => {
    const source = this.sourceLocation();
    const dest = this.destLocation();
    if (!source || !dest) return null;
    return isSameFiscal(source, dest);
  });

  productGroups = computed(() => {
    const transfer = this.transfer();
    if (!transfer) return [];

    const products: TransferProductSummary[] = transfer.products?.length
      ? transfer.products
      : [
          {
            product_id: transfer.product_id ?? '',
            product_name: transfer.product_name,
            product_sku: transfer.product_sku,
            uom_id: transfer.uom_id ?? '',
            uom_name: transfer.uom_name,
            quantity: transfer.total_quantity,
            lines_count: transfer.lines?.length ?? 0,
          },
        ];

    return products.map((product) => ({
      ...product,
      lines: (transfer.lines ?? []).filter((line) => this.lineBelongsTo(line, product, products.length)),
    }));
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { transferId: string },
    private dialogRef: MatDialogRef<TransferDetailDialogComponent>,
    private transferService: InventoryTransferService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.transferService.getTransferById(this.data.transferId).subscribe({
      next: (transfer) => {
        this.transfer.set(transfer);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  downloadPdf(): void {
    const t = this.transfer();
    if (!t || this.downloadingPdf()) return;

    this.downloadingPdf.set(true);
    this.transferService.downloadTransferPdf(t.id, t.folio).subscribe({
      next: ({ blob, filename }) => {
        this.downloadingPdf.set(false);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.downloadingPdf.set(false);
        this.toast.error(err?.message || 'No se pudo descargar el PDF');
      },
    });
  }

  formatDate(dateString: string): string {
    return formatApiDate(dateString, 'datetime');
  }

  sourceBatchId(line: TransferLine): string | undefined {
    return line.source_batch_id || line.source_inventory_batch_id;
  }

  destinationBatchId(line: TransferLine): string | undefined {
    return line.destination_batch_id || line.destination_inventory_batch_id;
  }

  private lineBelongsTo(line: TransferLine, product: TransferProductSummary, productCount: number): boolean {
    if (!line.product_id) return productCount === 1;
    if (line.product_id !== product.product_id) return false;
    if (line.uom_id && product.uom_id && line.uom_id !== product.uom_id) return false;
    return true;
  }

  openBatchDetail(batchId: string | undefined, event: Event): void {
    event.stopPropagation();
    if (!batchId) return;
    this.dialog.open(BatchDetailDialogComponent, {
      ...BATCH_DETAIL_DIALOG_OPTIONS,
      data: { batchId },
    });
  }
}
