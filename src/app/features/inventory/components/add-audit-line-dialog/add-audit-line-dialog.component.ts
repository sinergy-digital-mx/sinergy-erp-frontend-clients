import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Search, X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { InventoryBatchService } from '../../services/inventory-batch.service';
import { InventoryAuditService } from '../../services/inventory-audit.service';
import { InventoryBatch } from '../../models/inventory-batch.model';
import { ToastService } from '../../../../core/services/toast.service';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';

export interface AddAuditLineDialogData {
  auditId: string;
  warehouseId: string;
  productId?: string | null;
  existingBatchIds: string[];
}

@Component({
  selector: 'app-add-audit-line-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, RemoveTrailingZerosPipe, SpinnerComponent],
  templateUrl: './add-audit-line-dialog.component.html',
  styleUrl: './add-audit-line-dialog.component.scss',
})
export class AddAuditLineDialogComponent implements OnInit {
  readonly X = X;
  readonly Search = Search;

  searchTerm = signal('');
  loading = signal(false);
  submittingId = signal<string | null>(null);
  batches = signal<InventoryBatch[]>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddAuditLineDialogData,
    private dialogRef: MatDialogRef<AddAuditLineDialogComponent, boolean>,
    private batchService: InventoryBatchService,
    private auditService: InventoryAuditService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.loading.set(true);
    const existing = new Set(this.data.existingBatchIds);
    this.batchService
      .getBatches({
        warehouse_id: this.data.warehouseId,
        product_id: this.data.productId || undefined,
        search: this.searchTerm().trim() || undefined,
        page: 1,
        limit: 50,
        sort_by: 'batch_number',
        sort_order: 'ASC',
      })
      .subscribe({
        next: (response) => {
          this.batches.set((response.data || []).filter((batch) => !existing.has(batch.id)));
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.toast.error(err?.message || 'No se pudieron buscar lotes');
        },
      });
  }

  add(batch: InventoryBatch): void {
    if (this.submittingId()) return;
    this.submittingId.set(batch.id);
    this.auditService.addLine(this.data.auditId, { inventory_batch_id: batch.id }).subscribe({
      next: () => {
        this.submittingId.set(null);
        this.toast.success(`Lote ${batch.batch_number} agregado`);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.submittingId.set(null);
        this.toast.error(err?.message || 'No se pudo agregar el lote');
      },
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
