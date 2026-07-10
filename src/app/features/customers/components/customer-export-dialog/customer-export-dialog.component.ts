import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomerService, CustomersExportFilters } from '../../../../core/services/customer.service';

export interface CustomerExportDialogData {
  search?: string;
  status_id?: string | null;
  status_name?: string | null;
  group_id?: string | null;
  group_name?: string | null;
}

export interface CustomerExportDialogResult {
  downloaded: true;
}

@Component({
  selector: 'app-customer-export-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './customer-export-dialog.component.html',
  styleUrl: './customer-export-dialog.component.scss',
})
export class CustomerExportDialogComponent {
  exporting = signal(false);
  errorMessage = signal('');

  hasActiveFilters = computed(() => {
    const { search, status_id, group_id } = this.data;
    return !!(search || status_id || group_id);
  });

  canDownload = computed(() => !this.exporting());

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CustomerExportDialogData,
    private dialogRef: MatDialogRef<CustomerExportDialogComponent, CustomerExportDialogResult | undefined>,
    private customerService: CustomerService
  ) {}

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

    const filters: CustomersExportFilters = {};
    if (this.data.search) {
      filters.search = this.data.search;
    }
    if (this.data.status_id) {
      filters.status_id = this.data.status_id;
    }
    if (this.data.group_id) {
      filters.group_id = this.data.group_id;
    }

    this.customerService.exportCustomersExcel(filters).subscribe({
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

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
