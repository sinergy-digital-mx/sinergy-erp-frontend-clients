import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SalesOrderService } from '../../services/sales-order.service';
import {
  SalesOrderExportFilters,
  SalesOrderExportType,
  SalesOrderFilters,
} from '../../models/sales-order.model';

export interface SalesOrderExportDialogData {
  filters: SalesOrderFilters;
}

export interface SalesOrderExportDialogResult {
  downloaded: true;
}

@Component({
  selector: 'app-sales-order-export-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './sales-order-export-dialog.component.html',
  styleUrl: './sales-order-export-dialog.component.scss',
})
export class SalesOrderExportDialogComponent {
  exportType = signal<SalesOrderExportType>('headers');
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
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderExportDialogData,
    private dialogRef: MatDialogRef<SalesOrderExportDialogComponent, SalesOrderExportDialogResult | undefined>,
    private salesOrderService: SalesOrderService
  ) {
    this.exportFrom.set(toDateInputValue(data.filters?.dateFrom));
    this.exportTo.set(toDateInputValue(data.filters?.dateTo));
  }

  setExportType(type: SalesOrderExportType): void {
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

    const type = this.exportType();
    if (type === 'details' && this.exportFrom() > this.exportTo()) {
      this.errorMessage.set('La fecha inicial debe ser anterior o igual a la final');
      return;
    }

    this.exporting.set(true);
    this.errorMessage.set('');

    const listFilters = this.data.filters ?? {};
    const filters: SalesOrderExportFilters = {};

    if (listFilters.search) {
      filters.search = listFilters.search;
    }
    const status = listFilters.general_status || listFilters.status;
    if (status) {
      filters.general_status = status;
    }
    if (listFilters.payment_status) {
      filters.payment_status = listFilters.payment_status;
    }
    if (listFilters.sales_order_type) {
      filters.sales_order_type = listFilters.sales_order_type;
    }
    if (listFilters.warehouse_id) {
      filters.warehouse_id = listFilters.warehouse_id;
    }
    if (listFilters.customer_id != null && listFilters.customer_id !== '') {
      filters.customer_id = listFilters.customer_id;
    }

    if (type === 'details') {
      filters.created_from = this.exportFrom();
      filters.created_to = this.exportTo();
    } else {
      const from = toDateInputValue(listFilters.dateFrom);
      const to = toDateInputValue(listFilters.dateTo);
      if (from) {
        filters.created_from = from;
      }
      if (to) {
        filters.created_to = to;
      }
    }

    this.salesOrderService.exportOrdersExcel(type, filters).subscribe({
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

function toDateInputValue(value?: string): string {
  if (!value) {
    return '';
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
