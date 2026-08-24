import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ProductCatalogExportFilters } from '../../models/product.model';

export interface ProductCatalogExportDialogData extends ProductCatalogExportFilters {}

export interface ProductCatalogExportDialogResult {
  downloaded: true;
}

@Component({
  selector: 'app-product-catalog-export-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './product-catalog-export-dialog.component.html',
  styleUrl: './product-catalog-export-dialog.component.scss',
})
export class ProductCatalogExportDialogComponent {
  exporting = signal(false);
  errorMessage = signal('');

  hasActiveFilters = computed(() => {
    const { search, sku, category_id, subcategory_id, is_active } = this.data;
    return !!(search || sku || category_id || subcategory_id || is_active !== undefined);
  });

  canDownload = computed(() => !this.exporting());

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductCatalogExportDialogData,
    private dialogRef: MatDialogRef<
      ProductCatalogExportDialogComponent,
      ProductCatalogExportDialogResult | undefined
    >,
    private productService: ProductService
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

    const filters: ProductCatalogExportFilters = {};
    if (this.data.search) {
      filters.search = this.data.search;
    }
    if (this.data.sku) {
      filters.sku = this.data.sku;
    }
    if (this.data.category_id) {
      filters.category_id = this.data.category_id;
    }
    if (this.data.subcategory_id) {
      filters.subcategory_id = this.data.subcategory_id;
    }
    if (this.data.is_active !== undefined) {
      filters.is_active = this.data.is_active;
    }

    this.productService.exportProductCatalogExcel(filters).subscribe({
      next: ({ blob, filename }) => {
        triggerBrowserDownload(blob, filename);
        this.exporting.set(false);
        this.dialogRef.close({ downloaded: true });
      },
      error: (err: Error) => {
        this.exporting.set(false);
        this.errorMessage.set(err.message || 'No se pudo generar el catálogo');
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
