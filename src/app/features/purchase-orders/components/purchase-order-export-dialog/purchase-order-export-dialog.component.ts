import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { OrderFilters, PurchaseOrderExportType } from '../../models/filters.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';

export interface PurchaseOrderExportDialogData {
  filters: OrderFilters;
}

@Component({
  selector: 'app-purchase-order-export-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './purchase-order-export-dialog.component.html',
  styleUrl: './purchase-order-export-dialog.component.scss',
})
export class PurchaseOrderExportDialogComponent {
  exportType = signal<PurchaseOrderExportType>('headers');
  exportFrom = signal('');
  exportTo = signal('');
  exporting = signal(false);
  errorMessage = signal('');

  canDownload = computed(() => {
    if (this.exporting()) {
      return false;
    }
    if (this.exportType() === 'headers') {
      return true;
    }
    return Boolean(this.exportFrom() && this.exportTo());
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PurchaseOrderExportDialogData,
    private dialogRef: MatDialogRef<PurchaseOrderExportDialogComponent>,
    private purchaseOrderService: PurchaseOrderService,
    private toast: ToastService
  ) {
    const listFilters = data.filters ?? {};
    this.exportFrom.set(this.purchaseOrderService.toDateOnly(listFilters.dateFrom) ?? '');
    this.exportTo.set(this.purchaseOrderService.toDateOnly(listFilters.dateTo) ?? '');
  }

  setExportType(type: PurchaseOrderExportType): void {
    if (this.exporting()) {
      return;
    }
    this.exportType.set(type);
    this.errorMessage.set('');
  }

  cancel(): void {
    if (this.exporting()) {
      return;
    }
    this.dialogRef.close();
  }

  confirmExport(): void {
    if (!this.canDownload()) {
      return;
    }

    const type = this.exportType();
    const listFilters = this.data.filters ?? {};

    let filters;
    if (type === 'details') {
      const from = this.exportFrom();
      const to = this.exportTo();
      if (from > to) {
        this.errorMessage.set('La fecha inicial debe ser anterior o igual a la final');
        return;
      }
      filters = this.purchaseOrderService.mapListFiltersToExport(listFilters, {
        created_from: from,
        created_to: to,
      });
    } else {
      filters = this.purchaseOrderService.mapListFiltersToExport(listFilters);
    }

    this.exporting.set(true);
    this.errorMessage.set('');

    this.purchaseOrderService.downloadExcel(type, filters).subscribe({
      next: () => {
        this.toast.success('Reporte descargado');
        this.dialogRef.close(true);
      },
      error: (err: Error) => {
        this.errorMessage.set(err?.message || 'No se pudo generar el reporte');
        this.toast.error(err?.message || 'No se pudo generar el reporte');
        this.exporting.set(false);
      },
    });
  }
}
