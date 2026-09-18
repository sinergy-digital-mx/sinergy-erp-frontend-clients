import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EMPTY, Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { ToastService } from '../../../../core/services/toast.service';
import { ProductService } from '../../services/product.service';
import { VendorService } from '../../services/vendor.service';
import { Vendor, VendorListResponse } from '../../models/vendor.model';
import {
  PriceList,
  VendorCatalogImportPreview,
  VendorCatalogImportResult,
} from '../../models/product.model';

const XLSX_ACCEPT =
  '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

@Component({
  selector: 'app-product-vendor-import-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatAutocompleteModule],
  templateUrl: './product-vendor-import-dialog.component.html',
  styleUrl: './product-vendor-import-dialog.component.scss',
})
export class ProductVendorImportDialogComponent implements OnInit, OnDestroy {
  readonly vendorSearchCtrl = new FormControl<string | Vendor>('', { nonNullable: true });
  readonly priceListCtrl = new FormControl('', { nonNullable: true });

  readonly vendors = signal<Vendor[]>([]);
  readonly priceLists = signal<PriceList[]>([]);
  readonly selectedVendor = signal<Vendor | null>(null);
  readonly selectedPriceListId = signal('');
  readonly preview = signal<VendorCatalogImportPreview | null>(null);
  readonly previewLoading = signal(false);
  readonly previewError = signal('');
  readonly loadingVendors = signal(false);
  readonly loadingPriceLists = signal(false);
  readonly downloading = signal(false);
  readonly importing = signal(false);
  readonly isDragOver = signal(false);
  readonly selectedFile = signal<File | null>(null);
  readonly fileError = signal('');
  readonly errorMessage = signal('');
  readonly result = signal<VendorCatalogImportResult | null>(null);

  private readonly dialogRef = inject(
    MatDialogRef<ProductVendorImportDialogComponent, { imported: true } | undefined>
  );
  private readonly productService = inject(ProductService);
  private readonly vendorService = inject(VendorService);
  private readonly toast = inject(ToastService);

  readonly acceptTypes = XLSX_ACCEPT;
  readonly title = 'Importar';
  readonly importLabel = 'Importar';
  readonly disclaimer =
    'Llena Nuevo costo y/o Nuevo precio en el mismo Excel. Vacío = no cambia esa columna. No afecta órdenes de compra ni de venta pasadas.';

  readonly previewText = computed(() => {
    const preview = this.preview();
    if (!preview) {
      return '';
    }
    return `Se actualizarán ${preview.product_count} productos (${preview.row_count} renglones por UOM).`;
  });

  readonly fieldsLocked = computed(() => this.importing() || this.downloading());

  readonly canDownloadTemplate = computed(
    () =>
      !this.importing() &&
      !this.downloading() &&
      !!this.selectedVendor() &&
      !!this.selectedPriceListId()
  );

  readonly canImport = computed(() => this.canDownloadTemplate() && !!this.selectedFile());

  readonly resultSummary = computed(() => {
    const result = this.result();
    if (!result) {
      return '';
    }
    return formatImportSummary(result);
  });

  private readonly destroy$ = new Subject<void>();
  private readonly preview$ = new Subject<void>();

  ngOnInit(): void {
    this.setupVendorSearch();
    this.setupPreview();
    this.priceListCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((id) => {
      this.selectedPriceListId.set(id);
      this.clearImportState();
      this.preview$.next();
    });
    this.loadPriceLists();
  }

  ngOnDestroy(): void {
    this.preview$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayVendor = (vendor: Vendor | string | null): string => {
    if (!vendor || typeof vendor === 'string') {
      return typeof vendor === 'string' ? vendor : '';
    }
    return vendor.name ?? '';
  };

  onVendorSearchFocus(): void {
    if (!this.vendors().length && !this.loadingVendors()) {
      this.loadVendors(this.currentVendorSearchTerm());
    }
  }

  onVendorSelected(vendor: Vendor): void {
    if (!vendor?.id) {
      return;
    }
    this.selectedVendor.set(vendor);
    this.vendorSearchCtrl.setValue(vendor, { emitEvent: false });
    this.clearImportState();
    this.preview$.next();
  }

  downloadTemplate(): void {
    if (!this.canDownloadTemplate()) {
      return;
    }
    const vendorId = this.selectedVendor()?.id;
    const priceListId = this.selectedPriceListId();
    if (!vendorId || !priceListId) {
      return;
    }

    this.downloading.set(true);
    this.errorMessage.set('');

    this.productService
      .downloadVendorCatalogTemplate(vendorId, priceListId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ blob, filename }) => {
          triggerBrowserDownload(blob, filename);
          this.downloading.set(false);
        },
        error: (err: Error) => {
          this.downloading.set(false);
          this.errorMessage.set(err.message || 'No se pudo descargar el archivo');
        },
      });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.fieldsLocked()) {
      return;
    }
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    if (this.fieldsLocked()) {
      return;
    }
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.assignFile(file);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.assignFile(file);
    }
    input.value = '';
  }

  clearFile(): void {
    this.selectedFile.set(null);
    this.fileError.set('');
  }

  importFile(): void {
    if (!this.canImport()) {
      return;
    }
    const vendorId = this.selectedVendor()?.id;
    const priceListId = this.selectedPriceListId();
    const file = this.selectedFile();
    if (!vendorId || !priceListId || !file) {
      return;
    }

    this.importing.set(true);
    this.errorMessage.set('');
    this.result.set(null);

    this.productService
      .importVendorCatalog(vendorId, priceListId, file)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => this.handleImportResult(result),
        error: (err: Error) => {
          this.importing.set(false);
          this.errorMessage.set(err.message || 'No se pudo importar el archivo');
        },
      });
  }

  cancel(): void {
    if (this.importing()) {
      return;
    }
    this.dialogRef.close();
  }

  private setupVendorSearch(): void {
    this.vendorSearchCtrl.valueChanges
      .pipe(
        debounceTime(250),
        filter((value): value is string => typeof value === 'string'),
        distinctUntilChanged((a, b) => a.trim() === b.trim()),
        takeUntil(this.destroy$)
      )
      .subscribe((term) => {
        this.selectedVendor.set(null);
        this.clearImportState();
        this.preview.set(null);
        this.previewError.set('');
        this.loadVendors(term);
      });
  }

  private setupPreview(): void {
    this.preview$
      .pipe(
        switchMap(() => {
          const vendor = this.selectedVendor();
          const priceListId = this.selectedPriceListId();
          if (!vendor?.id || !priceListId) {
            this.preview.set(null);
            this.previewLoading.set(false);
            return EMPTY;
          }

          this.previewLoading.set(true);
          this.previewError.set('');

          return this.productService.previewVendorCatalog(vendor.id, priceListId).pipe(
            catchError((err: Error) => {
              this.preview.set(null);
              this.previewError.set(
                err.message || 'Este proveedor no tiene productos con costo.'
              );
              this.previewLoading.set(false);
              return EMPTY;
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((preview) => {
        this.preview.set(preview);
        this.previewLoading.set(false);
        this.previewError.set('');
      });
  }

  private loadVendors(search: string): void {
    this.loadingVendors.set(true);
    const term = search.trim();
    this.vendorService
      .getVendors({
        status: 'active',
        limit: 100,
        page: 1,
        ...(term ? { search: term } : {}),
      })
      .pipe(
        catchError(() => {
          this.toast.error('No se pudieron cargar los proveedores');
          return of({ data: [] } as VendorListResponse);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        this.vendors.set(response?.data ?? []);
        this.loadingVendors.set(false);
      });
  }

  private loadPriceLists(): void {
    this.loadingPriceLists.set(true);
    this.productService
      .getPriceLists()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (lists) => {
          this.priceLists.set(lists ?? []);
          this.loadingPriceLists.set(false);
          if (!this.priceListCtrl.value) {
            const preferred = lists.find((list) => list.is_default) ?? lists[0];
            if (preferred?.id) {
              this.priceListCtrl.setValue(preferred.id);
            }
          }
        },
        error: () => {
          this.priceLists.set([]);
          this.loadingPriceLists.set(false);
          this.toast.error('No se pudieron cargar las listas de precios');
        },
      });
  }

  private assignFile(file: File): void {
    this.fileError.set('');
    this.result.set(null);
    this.errorMessage.set('');
    if (!isXlsxFile(file)) {
      this.selectedFile.set(null);
      this.fileError.set('El archivo debe ser .xlsx');
      return;
    }
    this.selectedFile.set(file);
  }

  private handleImportResult(result: VendorCatalogImportResult): void {
    this.importing.set(false);
    this.result.set(result);
    const summary = formatImportSummary(result);
    const hasErrors = result.errors?.length > 0;

    if (hasErrors) {
      this.toast.warning(summary);
      return;
    }

    this.toast.success(summary);
    this.dialogRef.close({ imported: true });
  }

  private clearImportState(): void {
    this.selectedFile.set(null);
    this.fileError.set('');
    this.errorMessage.set('');
    this.result.set(null);
  }

  private currentVendorSearchTerm(): string {
    const value = this.vendorSearchCtrl.value;
    return typeof value === 'string' ? value.trim() : '';
  }
}

export function formatImportSummary(result: VendorCatalogImportResult): string {
  if (result.costs_updated != null || result.prices_updated != null) {
    const parts = [
      `${result.costs_updated ?? 0} costos actualizados`,
      `${result.prices_updated ?? 0} precios actualizados`,
    ];
    const created = result.prices_created ?? result.created;
    if (created > 0) {
      parts.push(`${created} precios creados`);
    }
    parts.push(`${result.skipped} sin cambios`);
    return parts.join(', ');
  }

  const parts = [`${result.updated} actualizados`];
  if (result.created > 0) {
    parts.push(`${result.created} creados`);
  }
  parts.push(`${result.skipped} sin cambios`);
  return parts.join(', ');
}

function isXlsxFile(file: File): boolean {
  return file.name.toLowerCase().endsWith('.xlsx');
}

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
