import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';

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
import { ArrowRight } from 'lucide-angular';



@Component({

  selector: 'app-vendor-list',

  standalone: true,

  imports: [

    CommonModule,

    DatatableWrapperComponent,

    SearchComponent,

    ButtonComponent,

    FilterClearButtonComponent

  ],

  templateUrl: './vendor-list.component.html',

  styleUrl: './vendor-list.component.scss'

})

export class VendorListComponent implements OnDestroy {

  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;



  table_config = signal<IDatatableConfig>({

    rows: [],

    columns: [

      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true, width: 150 },

      { name: 'Empresa', prop: 'company_name', sortable: true, canAutoResize: true, width: 180 },

      { name: 'Tipo', prop: 'vendor_type', sortable: true, canAutoResize: true, width: 110 },

      { name: 'ID Fiscal', prop: 'rfc', sortable: false, canAutoResize: true, width: 130 },

      { name: 'Ciudad', prop: 'city', sortable: true, canAutoResize: true, width: 120 },

      { name: 'Estado', prop: 'state', sortable: true, canAutoResize: true, width: 100 },

      { name: 'País', prop: 'country', sortable: true, canAutoResize: true, width: 100 },

      { name: 'Status', prop: 'status', sortable: true, canAutoResize: true, width: 100 },

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



  ArrowRight = ArrowRight;

  search = '';

  vendorTypeFilter: VendorType | '' = '';

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

    private snackBar: MatSnackBar

  ) {

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {

      const queryString = JSON.stringify(query);

      if (queryString === this.lastQueryParams) {

        return;

      }

      this.lastQueryParams = queryString;



      this.search = query?.['search'] ?? '';

      const type = query?.['vendor_type'];

      this.vendorTypeFilter =

        type === 'NATIONAL' || type === 'INTERNATIONAL' ? type : '';



      const page = query?.['page'] ? Number(query['page']) : 1;

      const limit = query?.['limit'] ? Number(query['limit']) : 20;



      this.table_config.update(c => ({

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

    this.table_config.update(c => ({ ...c, loading: true }));

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



    this.vendorService.getVendors(params).subscribe({

      next: (res) => {

        this.table_config.update(c => ({

          ...c,

          rows: res.data,

          totalResults: res.total,

          hasNext: res.hasNext ?? false,

          loading: false,

        }));

      },

      error: (error) => {

        console.error('Error loading vendors:', error);

        this.table_config.update(c => ({ ...c, loading: false }));

      }

    });

  }



  onPageChange(event: IPaginationEvent) {

    this.router.navigate([], {

      relativeTo: this.route,

      queryParams: {

        page: event.page,

        limit: event.limit,

        search: this.search || undefined,

        vendor_type: this.vendorTypeFilter || undefined,

      },

      queryParamsHandling: 'merge',

    });

  }



  onSearchChange(searchTerm: string) {

    this.search = searchTerm;

    this.router.navigate([], {

      relativeTo: this.route,

      queryParams: {

        page: 1,

        search: searchTerm || undefined,

        vendor_type: this.vendorTypeFilter || undefined,

      },

      queryParamsHandling: 'merge',

    });

  }

  get hasActiveFilters(): boolean {
    return !!(this.search?.trim() || this.vendorTypeFilter);
  }

  clearFilters(): void {
    this.vendorTypeFilter = '';
    this.onSearchChange('');
  }



  onVendorTypeFilterChange(value: string): void {

    const vendorType =

      value === 'NATIONAL' || value === 'INTERNATIONAL' ? value : '';

    this.router.navigate([], {

      relativeTo: this.route,

      queryParams: {

        page: 1,

        vendor_type: vendorType || undefined,

        search: this.search || undefined,

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

      data: { vendor: null }

    });



    dialogRef.afterClosed().subscribe(result => {

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

      data: { vendor }

    });



    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadVendors();

      }

    });

  }



  getStatusClass(status: string): string {

    return status === 'active'

      ? 'settings-badge--status-active'

      : 'settings-badge--status-inactive';

  }



  getStatusLabel(status: string): string {

    return status === 'active' ? 'Activo' : 'Inactivo';

  }



  getVendorTypeLabel(type?: string): string {

    return type === 'INTERNATIONAL' ? 'Internacional' : 'Nacional';

  }



  getFiscalId(vendor: Vendor): string {

    if (vendor.vendor_type === 'INTERNATIONAL') {

      return vendor.tax_id || '—';

    }

    return vendor.rfc || '—';

  }



  deleteVendor(vendor: Vendor, event: Event) {

    event.stopPropagation();

    

    const dialogRef = this.dialog.open(AlertDialogComponent, {

      width: '400px',

      data: {

        title: 'Eliminar Proveedor',

        message: `¿Estás seguro de que deseas eliminar el proveedor "${vendor.name}"? Esta acción no se puede deshacer.`,

        confirmText: 'Eliminar',

        cancelText: 'Cancelar',

        type: 'danger'

      }

    });



    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.vendorService.deleteVendor(vendor.id).subscribe({

          next: () => {

            this.snackBar.openFromComponent(CustomSnackbarComponent, {

              data: { message: 'Proveedor eliminado correctamente', type: 'success' },

              duration: 3000

            });

            this.loadVendors();

          },

          error: (error) => {

            this.snackBar.openFromComponent(CustomSnackbarComponent, {

              data: { message: error.error?.message || 'Error al eliminar proveedor', type: 'error' },

              duration: 5000

            });

          }

        });

      }

    });

  }

}

