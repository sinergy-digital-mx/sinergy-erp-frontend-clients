import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from '../../services/inventory.service';
import {
  InventoryBatchExportFilters,
  InventoryExportType,
  InventorySummaryExportFilters,
} from '../../models/inventory-item.model';

export interface InventoryExportDialogData {
  defaultType: InventoryExportType;
  search?: string;
  warehouse_id?: string;
  only_available?: boolean;
}

export interface InventoryExportDialogResult {
  downloaded: true;
}

@Component({
  selector: 'app-inventory-export-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './inventory-export-dialog.component.html',
  styleUrl: './inventory-export-dialog.component.scss',
})
export class InventoryExportDialogComponent {
  exportType = signal<InventoryExportType>('batches');
  exporting = signal(false);
  errorMessage = signal('');

  canDownload = computed(() => !this.exporting());

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InventoryExportDialogData,
    private dialogRef: MatDialogRef<InventoryExportDialogComponent, InventoryExportDialogResult | undefined>,
    private inventoryService: InventoryService
  ) {
    this.exportType.set(data.defaultType ?? 'batches');
  }

  setExportType(type: InventoryExportType): void {
    this.exportType.set(type);
    this.errorMessage.set('');
  }

  cancel(): void {
    if (this.exporting()) {
      return;
    }
    this.dialogRef.close();
  }

  download(): void {
    if (!this.canDownload()) {
      return;
    }

    this.exporting.set(true);
    this.errorMessage.set('');

    const type = this.exportType();
    const { search, warehouse_id, only_available } = this.data;

    if (type === 'batches') {
      const filters: InventoryBatchExportFilters = {};
      if (search) {
        filters.search = search;
      }
      if (warehouse_id) {
        filters.warehouse_id = warehouse_id;
      }

      this.inventoryService.exportInventoryExcel('batches', filters).subscribe({
        next: ({ blob, filename }) => {
          triggerBrowserDownload(blob, filename);
          this.exporting.set(false);
          this.dialogRef.close({ downloaded: true });
        },
        error: (err: Error) => {
          this.exporting.set(false);
          this.errorMessage.set(err.message || 'No se pudo generar el reporte');
        },
      });
    } else {
      const filters: InventorySummaryExportFilters = {};
      if (search) {
        filters.search = search;
      }
      if (warehouse_id) {
        filters.warehouse_id = warehouse_id;
      }
      filters.only_available = only_available ?? true;

      this.inventoryService.exportInventoryExcel('summary', filters).subscribe({
        next: ({ blob, filename }) => {
          triggerBrowserDownload(blob, filename);
          this.exporting.set(false);
          this.dialogRef.close({ downloaded: true });
        },
        error: (err: Error) => {
          this.exporting.set(false);
          this.errorMessage.set(err.message || 'No se pudo generar el reporte');
        },
      });
    }
  }
}

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
