import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InventoryTransferService } from '../../services/inventory-transfer.service';
import { InventoryTransfer } from '../../models/inventory-transfer.model';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';
import { X, ArrowUpRight, ArrowDownLeft } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-transfer-detail-dialog',
  standalone: true,
  imports: [CommonModule, RemoveTrailingZerosPipe, LucideAngularModule],
  templateUrl: './transfer-detail-dialog.component.html',
  styleUrl: './transfer-detail-dialog.component.scss',
})
export class TransferDetailDialogComponent implements OnInit {
  readonly X = X;
  readonly ArrowUpRight = ArrowUpRight;
  readonly ArrowDownLeft = ArrowDownLeft;

  transfer = signal<InventoryTransfer | null>(null);
  loading = signal(true);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { transferId: string },
    private dialogRef: MatDialogRef<TransferDetailDialogComponent>,
    private transferService: InventoryTransferService,
    private dialog: MatDialog
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

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  openBatchDetail(batchId: string | undefined, event: Event): void {
    event.stopPropagation();
    if (!batchId) return;
    this.dialog.open(BatchDetailDialogComponent, {
      data: { batchId },
      width: '920px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    });
  }
}
