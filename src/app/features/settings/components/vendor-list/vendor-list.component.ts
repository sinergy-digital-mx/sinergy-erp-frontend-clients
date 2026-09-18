import { Component, OnDestroy, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendorService } from '../../services/vendor.service';
import { Vendor, VendorQueryParams, VendorType } from '../../models/vendor.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { VendorDetailModalComponent } from '../vendor-detail-modal/vendor-detail-modal.component';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import {
  VendorExportDialogComponent,
  VendorExportDialogResult,
} from '../vendor-export-dialog/vendor-export-dialog.component';
import { ToastService } from '../../../../core/services/toast.service';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { SETTINGS_PERMISSIONS } from '../../config/permissions.config';
import { VENDOR_MATCH_REASON_LABELS } from '../../utils/vendor-profile.util';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent,
    FilterClearButtonComponent,
    HasPermissionDirective,
  ],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.scss',
})
export class VendorListComponent implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly vendorDeletePermission = SETTINGS_PERMISSIONS.vendors.delete;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true, width: 150 },
      { name: 'Empresa', prop: 'company_name', sortable: true, canAutoResize: true, width: 160 },
      { name: 'Tipo', prop: 'vendor_type', sortable: true, canAutoResize: true, width: 100 },
      { name: 'ID Fiscal', prop: 'rfc', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Ficha', prop: 'profile_completeness', sortable: false, canAutoResize: true, width: 110 },
      { name: 'Similar', prop: 'looks_similar', sortable: false, canAutoResize: true, width: 110 },
      { name: 'Status', prop: 'status', sortable: true, canAutoResize: true, width: 90 },
      { name: '', prop: 'actions', sortable: false, canAutoResize: false, width: 90 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron proveedores' },
    columnMode: 'force',
    reorderable: false,
  });

  search = '';
  vendorTypeFilter: VendorType | '' = '';
  similarOnly = false;
  readonly vendorTypeFilterOptions: { value: VendorType | ''; label: string }[] = [
    { value: '', label: 'Todos los tipos' },
    { value: 'NATIONAL', label: 'Nacional (México)' },
    { value: 'INTERNATIONAL', label: 'Internacional' },
  ];
  private destroy$ = new Subject<void>();
  private lastQueryParams = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private toast: ToastService,
  ) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;

      this.search = query?.['search'] ?? '';
      const type = query?.['vendor_type'];
      this.vendorTypeFilter = type === 'NATIONAL' || type === 'INTERNATIONAL' ? type : '';
      this.similarOnly = query?.['similar_only'] === 'true' || query?.['similar_only'] === true;

      const page = query?.['page'] ? Number(query['page']) : 1;
      const limit = query?.['limit'] ? Number(query['limit']) : 20;

      this.table_config.update((c) => ({
        ...c,
        page: Number.isNaN(page) ? 1 : page,
        limit: Number.isNaN(limit) ? 20 : limit,
      }));

      this.loadVendors();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadVendors() {
    this.table_config.update((c) => ({ ...c, loading: true }));
    const config = this.table_config();
    const page = Number.isNaN(config.page) ? 1 : config.page;
    const limit = Number.isNaN(config.limit) ? 20 : config.limit;

    const params: VendorQueryParams = { page, limit };
    if (this.search?.trim()) {
      params.search = this.search.trim();
    }
    if (this.vendorTypeFilter) {
      params.vendor_type = this.vendorTypeFilter;
    }
    if (this.similarOnly) {
      params.similar_only = true;
    }

    this.vendorService.getVendors(params).subscribe({
      next: (res) => {
        this.table_config.update((c) => ({
          ...c,
          rows: res.data,
          totalResults: res.total,
          hasNext: res.hasNext ?? false,
          loading: false,
        }));
      },
      error: (error) => {
        console.error('Error loading vendors:', error);
        this.table_config.update((c) => ({ ...c, loading: false }));
      },
    });
  }

  onPageChange(event: IPaginationEvent) {
    this.navigateFilters({ page: event.page, limit: event.limit });
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.navigateFilters({ page: 1, search: searchTerm || undefined });
  }

  get hasActiveFilters(): boolean {
    return !!(this.search?.trim() || this.vendorTypeFilter || this.similarOnly);
  }

  clearFilters(): void {
    this.vendorTypeFilter = '';
    this.similarOnly = false;
    this.search = '';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: null,
        vendor_type: null,
        similar_only: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onVendorTypeFilterChange(value: string): void {
    const vendorType = value === 'NATIONAL' || value === 'INTERNATIONAL' ? value : '';
    this.navigateFilters({ page: 1, vendor_type: vendorType || undefined });
  }

  toggleSimilarOnly(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        similar_only: this.similarOnly ? null : 'true',
      },
      queryParamsHandling: 'merge',
    });
  }

  private navigateFilters(extra: Record<string, string | number | undefined>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.search || undefined,
        vendor_type: this.vendorTypeFilter || undefined,
        similar_only: this.similarOnly ? 'true' : undefined,
        ...extra,
      },
      queryParamsHandling: 'merge',
    });
  }

  getVendorTypeBadgeClass(type?: VendorType): string {
    return type === 'INTERNATIONAL'
      ? 'settings-badge--type-international'
      : 'settings-badge--type-national';
  }

  openCreateVendorModal() {
    const dialogRef = this.dialog.open(VendorDetailModalComponent, {
      width: '80vw',
      maxWidth: '1000px',
      data: { vendor: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadVendors();
      }
    });
  }

  viewDetail(event: { data: Vendor }) {
    const vendor = event.data;
    const dialogRef = this.dialog.open(VendorDetailModalComponent, {
      width: '80vw',
      maxWidth: '1000px',
      data: { vendor },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadVendors();
      }
    });
  }

  getStatusClass(status: string): string {
    return status === 'active' ? 'settings-badge--status-active' : 'settings-badge--status-inactive';
  }

  getStatusLabel(status: string): string {
    return status === 'active' ? 'Activo' : 'Inactivo';
  }

  getVendorTypeLabel(type?: string): string {
    return type === 'INTERNATIONAL' ? 'Internacional' : 'Nacional';
  }

  completenessLevel(value?: number): 'high' | 'mid' | 'low' {
    const percent = Number(value) || 0;
    if (percent >= 80) return 'high';
    if (percent >= 50) return 'mid';
    return 'low';
  }

  similarLabel(vendor: Vendor): string {
    if (!vendor.looks_similar) {
      return '';
    }
    const names = (vendor.similar_vendors ?? []).map((item) => item.name).filter(Boolean);
    const reasons = (vendor.similar_vendors ?? [])
      .flatMap((item) => item.match_reasons ?? [])
      .map((reason) => VENDOR_MATCH_REASON_LABELS[reason])
      .filter(Boolean);
    const uniqueReasons = [...new Set(reasons)];
    const who = names.length ? names.join(', ') : 'otro proveedor';
    const why = uniqueReasons.length ? ` (${uniqueReasons.join(', ')})` : '';
    return `Parecido a ${who}${why}`;
  }

  openExportModal(): void {
    this.dialog
      .open(VendorExportDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        autoFocus: false,
        data: {
          search: this.search?.trim() || undefined,
          vendor_type: this.vendorTypeFilter || undefined,
          vendor_type_label: this.vendorTypeFilter
            ? this.getVendorTypeLabel(this.vendorTypeFilter)
            : undefined,
        },
      })
      .afterClosed()
      .subscribe((result: VendorExportDialogResult | undefined) => {
        if (result?.downloaded) {
          this.toast.success('Reporte descargado');
        }
      });
  }

  getFiscalId(vendor: Vendor): string {
    if (vendor.vendor_type === 'INTERNATIONAL') {
      return vendor.tax_id || '—';
    }
    return vendor.rfc || '—';
  }

  deleteVendor(vendor: Vendor, event: Event) {
    event.stopPropagation();

    const similarName = vendor.similar_vendors?.[0]?.name;
    const message = similarName
      ? `¿Eliminar "${vendor.name}"? Si tiene compras, se conservarán en "${similarName}".`
      : `¿Eliminar "${vendor.name}"? Si tiene compras y no hay otro parecido, se desactivará para conservar el historial.`;

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar proveedor',
        message,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        type: 'danger',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.vendorService.deleteVendor(vendor.id).subscribe({
        next: (response) => {
          const text = response?.message || 'Proveedor eliminado correctamente';
          if (response?.action === 'deactivated') {
            this.toast.success(text);
          } else {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: text, type: 'success' },
              duration: 4000,
            });
          }
          this.loadVendors();
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al eliminar proveedor', type: 'error' },
            duration: 5000,
          });
        },
      });
    });
  }
}
