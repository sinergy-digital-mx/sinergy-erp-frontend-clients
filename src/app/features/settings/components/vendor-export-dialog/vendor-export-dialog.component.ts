import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VendorService } from '../../services/vendor.service';
import { VendorsExportFilters } from '../../models/vendor.model';

export interface VendorExportDialogData {
  search?: string;
  status?: 'active' | 'inactive';
  status_label?: string;
  vendor_type?: VendorsExportFilters['vendor_type'];
  vendor_type_label?: string;
  state?: string;
  country?: string;
}

export interface VendorExportDialogResult {
  downloaded: true;
}

@Component({
  selector: 'app-vendor-export-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './vendor-export-dialog.component.html',
  styleUrl: './vendor-export-dialog.component.scss',

})
export class VendorExportDialogComponent {
  exporting = signal(false);
  errorMessage = signal('');

  hasActiveFilters = computed(() => {
    const { search, status, vendor_type, state, country } = this.data;
    return !!(search || status || vendor_type || state || country);
  });

  canDownload = computed(() => !this.exporting());

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: VendorExportDialogData,
    private dialogRef: MatDialogRef<VendorExportDialogComponent, VendorExportDialogResult | undefined>,
    private vendorService: VendorService
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

    const filters: VendorsExportFilters = {};
    if (this.data.search) {
      filters.search = this.data.search;
    }
    if (this.data.status) {
      filters.status = this.data.status;
    }
    if (this.data.vendor_type) {
      filters.vendor_type = this.data.vendor_type;
    }
    if (this.data.state) {
      filters.state = this.data.state;
    }
    if (this.data.country) {
      filters.country = this.data.country;
    }

    this.vendorService.exportVendorsExcel(filters).subscribe({
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
