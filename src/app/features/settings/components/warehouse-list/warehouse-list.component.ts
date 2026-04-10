import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarehouseService } from '../../services/warehouse.service';
import { Warehouse } from '../../models/warehouse.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { WarehouseDetailModalComponent } from '../warehouse-detail-modal/warehouse-detail-modal.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent
  ],
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.scss'
})
export class WarehouseListComponent implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true, width: 150 },
      { name: 'Código', prop: 'code', sortable: true, canAutoResize: true, width: 120 },
      { name: 'País', prop: 'country', sortable: true, canAutoResize: true, width: 100 },
      { name: 'Estado', prop: 'state', sortable: true, canAutoResize: true, width: 100 },
      { name: 'Status', prop: 'status', sortable: true, canAutoResize: true, width: 100 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron almacenes' },
    columnMode: 'force',
    reorderable: false,
  });

  search = '';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadWarehouses();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadWarehouses() {
    this.table_config.update(c => ({ ...c, loading: true }));
    
    const params: any = {};
    if (this.search && this.search.trim()) {
      params.search = this.search;
    }
    
    this.warehouseService.getWarehouses(params).subscribe({
      next: (res) => {
        this.table_config.update(c => ({
          ...c,
          rows: res.data,
          totalResults: res.total,
          loading: false,
        }));
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
        this.table_config.update(c => ({ ...c, loading: false }));
      }
    });
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.loadWarehouses();
  }

  openCreateWarehouseModal() {
    const dialogRef = this.dialog.open(WarehouseDetailModalComponent, {
      width: '80vw',
      maxWidth: '1000px',
      data: { warehouse: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadWarehouses();
      }
    });
  }

  viewDetail(warehouse: Warehouse) {
    const dialogRef = this.dialog.open(WarehouseDetailModalComponent, {
      width: '80vw',
      maxWidth: '1000px',
      data: { warehouse }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadWarehouses();
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
}
