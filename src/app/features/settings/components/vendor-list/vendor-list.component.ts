import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendorService } from '../../services/vendor.service';
import { Vendor } from '../../models/vendor.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { VendorDetailModalComponent } from '../vendor-detail-modal/vendor-detail-modal.component';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent
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
      { name: 'RFC', prop: 'rfc', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Ciudad', prop: 'city', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Estado', prop: 'state', sortable: true, canAutoResize: true, width: 100 },
      { name: 'País', prop: 'country', sortable: true, canAutoResize: true, width: 100 },
      { name: 'Tipo', prop: 'persona_type', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Status', prop: 'status', sortable: true, canAutoResize: true, width: 100 },
    ],
    externalPaging: false,
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
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadVendors();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadVendors() {
    this.table_config.update(c => ({ ...c, loading: true }));
    
    const params: any = {};
    if (this.search && this.search.trim()) {
      params.search = this.search;
    }
    
    this.vendorService.getVendors(params).subscribe({
      next: (res) => {
        this.table_config.update(c => ({
          ...c,
          rows: res.data,
          totalResults: res.total,
          loading: false,
        }));
      },
      error: (error) => {
        console.error('Error loading vendors:', error);
        this.table_config.update(c => ({ ...c, loading: false }));
      }
    });
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.loadVendors();
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

  viewDetail(vendor: Vendor) {
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
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  getStatusLabel(status: string): string {
    return status === 'active' ? 'Activo' : 'Inactivo';
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
