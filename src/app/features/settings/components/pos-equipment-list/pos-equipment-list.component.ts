import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PosEquipmentService } from '../../services/pos-equipment.service';
import { WarehouseService } from '../../services/warehouse.service';
import { PosEquipment } from '../../models/pos-equipment.model';
import { Warehouse } from '../../models/warehouse.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PosEquipmentDetailModalComponent } from '../pos-equipment-detail-modal/pos-equipment-detail-modal.component';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-pos-equipment-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent
  ],
  templateUrl: './pos-equipment-list.component.html',
  styleUrl: './pos-equipment-list.component.scss'
})
export class PosEquipmentListComponent implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre del Equipo', prop: 'name', sortable: true, canAutoResize: true, width: 200 },
      { name: 'Sucursal', prop: 'warehouse_name', sortable: true, canAutoResize: true, width: 150 },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: true, width: 100 },
      { name: 'Detalle', prop: 'detail', sortable: false, canAutoResize: true, width: 100 },
      { name: 'Eliminar', prop: 'delete', sortable: false, canAutoResize: true, width: 80 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron equipos' },
    columnMode: 'force',
    reorderable: false,
  });

  ArrowRight = ArrowRight;
  search = '';
  warehouses: Map<string, string> = new Map();
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private posEquipmentService: PosEquipmentService,
    private warehouseService: WarehouseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadWarehouses();
    this.loadPosEquipments();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadWarehouses() {
    this.warehouseService.getWarehouses().subscribe({
      next: (res) => {
        res.data.forEach(warehouse => {
          this.warehouses.set(warehouse.id, warehouse.name);
        });
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
      }
    });
  }

  loadPosEquipments() {
    this.table_config.update(c => ({ ...c, loading: true }));
    
    const params: any = {};
    if (this.search && this.search.trim()) {
      params.search = this.search;
    }
    
    this.posEquipmentService.getPosEquipments(params).subscribe({
      next: (res) => {
        const enrichedData = res.data.map(equipment => ({
          ...equipment,
          warehouse_name: this.warehouses.get(equipment.warehouse_id) || 'N/A'
        }));
        this.table_config.update(c => ({
          ...c,
          rows: enrichedData,
          totalResults: res.total,
          loading: false,
        }));
      },
      error: (error) => {
        console.error('Error loading pos equipments:', error);
        this.table_config.update(c => ({ ...c, loading: false }));
      }
    });
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.loadPosEquipments();
  }

  openCreateEquipmentModal() {
    const dialogRef = this.dialog.open(PosEquipmentDetailModalComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: { equipment: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPosEquipments();
      }
    });
  }

  viewDetail(equipment: PosEquipment) {
    const dialogRef = this.dialog.open(PosEquipmentDetailModalComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: { equipment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPosEquipments();
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

  deleteEquipment(equipment: PosEquipment, event: Event) {
    event.stopPropagation();
    
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Equipo',
        message: `¿Estás seguro de que deseas eliminar el equipo "${equipment.name}"? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        type: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.posEquipmentService.deletePosEquipment(equipment.id).subscribe({
          next: () => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: 'Equipo eliminado correctamente', type: 'success' },
              duration: 3000
            });
            this.loadPosEquipments();
          },
          error: (error) => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: error.error?.message || 'Error al eliminar equipo', type: 'error' },
              duration: 5000
            });
          }
        });
      }
    });
  }
}
