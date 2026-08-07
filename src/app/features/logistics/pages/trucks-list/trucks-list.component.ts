import { Component, OnDestroy, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, filter, switchMap, takeUntil, tap } from 'rxjs';
import { LucideAngularModule, Edit2, Trash2 } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { TRUCK_PERMISSIONS } from '../../config/permissions.config';
import { Truck, TruckStatus } from '../../models/truck.model';
import { TruckService } from '../../services/truck.service';
import { TruckFormModalComponent } from '../../components/truck-form-modal/truck-form-modal.component';

@Component({
  selector: 'app-trucks-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DatatableWrapperComponent,
    SearchComponent,
    FilterClearButtonComponent,
    HasPermissionDirective,
    LucideAngularModule,
  ],
  templateUrl: './trucks-list.component.html',
  styleUrl: './trucks-list.component.scss',
})
export class TrucksListComponent implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Edit2 = Edit2;
  readonly Trash2 = Trash2;
  readonly permissions = TRUCK_PERMISSIONS;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: '', prop: 'photo', sortable: false, canAutoResize: false, width: 56 },
      { name: 'Nombre', prop: 'name', sortable: false, canAutoResize: true, width: 180 },
      { name: 'Placa', prop: 'placa', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Año', prop: 'anio', sortable: false, canAutoResize: true, width: 80 },
      { name: 'Estado', prop: 'status', sortable: false, canAutoResize: true, width: 100 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true, width: 120 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin camiones', subtitle: 'Crea el primero para tu flota' },
    columnMode: 'force',
    reorderable: false,
  });

  search = '';
  onlyActive = true;
  private destroy$ = new Subject<void>();
  private lastQueryParams = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private truckService: TruckService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$),
        filter((query) => {
          const queryString = JSON.stringify(query);
          if (queryString === this.lastQueryParams) return false;
          this.lastQueryParams = queryString;
          return true;
        }),
        tap((query) => {
          this.search = query?.['search'] ?? '';
          const status = query?.['status'];
          this.onlyActive = status !== 'inactive' && status !== 'all';
          const page = query?.['page'] ? Number(query['page']) : 1;
          const limit = query?.['limit'] ? Number(query['limit']) : 20;
          this.table_config.update((c) => ({
            ...c,
            page: Number.isNaN(page) ? 1 : page,
            limit: Number.isNaN(limit) ? 20 : limit,
          }));
        }),
        switchMap(() => {
          this.table_config.update((c) => ({ ...c, loading: true }));
          return this.truckService.getTrucks(this.buildQueryParams());
        })
      )
      .subscribe({
        next: (res) => this.applyResponse(res),
        error: (err) => this.handleLoadError(err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildQueryParams() {
    const config = this.table_config();
    const params: {
      page: number;
      limit: number;
      search?: string;
      status?: TruckStatus;
    } = {
      page: Number.isNaN(config.page) ? 1 : config.page,
      limit: Number.isNaN(config.limit) ? 20 : config.limit,
    };
    const normalizedSearch = this.search?.trim();
    if (normalizedSearch) params.search = normalizedSearch;
    if (this.onlyActive) params.status = 'active';
    return params;
  }

  private applyResponse(res: {
    data: Truck[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
  }): void {
    this.table_config.update((c) => ({
      ...c,
      rows: res.data ?? [],
      totalResults: res.total ?? 0,
      page: res.page ?? c.page,
      limit: res.limit ?? c.limit,
      hasNext: res.hasNext ?? res.page < res.totalPages,
      loading: false,
    }));
  }

  private handleLoadError(error: unknown): void {
    console.error('Error loading trucks:', error);
    this.table_config.update((c) => ({
      ...c,
      rows: [],
      totalResults: 0,
      hasNext: false,
      loading: false,
    }));
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: 'Error al cargar camiones', type: 'error' },
      duration: 5000,
    });
  }

  private syncQuery(extra: Record<string, string | number | undefined> = {}): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.table_config().page,
        limit: this.table_config().limit,
        search: this.search || undefined,
        status: this.onlyActive ? 'active' : undefined,
        ...extra,
      },
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(event: IPaginationEvent): void {
    this.syncQuery({ page: event.page, limit: event.limit });
  }

  onSearchChange(searchTerm: string): void {
    this.search = searchTerm;
    this.syncQuery({ page: 1, search: searchTerm || undefined });
  }

  onOnlyActiveChange(checked: boolean): void {
    this.onlyActive = checked;
    this.syncQuery({ page: 1, status: checked ? 'active' : undefined });
  }

  get hasActiveFilters(): boolean {
    return !!this.search?.trim() || !this.onlyActive;
  }

  clearFilters(): void {
    this.search = '';
    this.onlyActive = true;
    this.syncQuery({ page: 1, search: undefined, status: 'active' });
  }

  openCreate(): void {
    const ref = this.dialog.open(TruckFormModalComponent, {
      width: '700px',
      maxWidth: '95vw',
      disableClose: true,
      data: { truck: null },
    });
    ref.afterClosed().subscribe((result) => {
      if (result) this.reload();
    });
  }

  openEdit(truck: Truck, event?: Event): void {
    event?.stopPropagation();
    const ref = this.dialog.open(TruckFormModalComponent, {
      width: '700px',
      maxWidth: '95vw',
      disableClose: true,
      data: { truck },
    });
    ref.afterClosed().subscribe((result) => {
      if (result) this.reload();
    });
  }

  deactivate(truck: Truck, event?: Event): void {
    event?.stopPropagation();
    const confirmRef = this.dialog.open(AlertDialogComponent, {
      width: '420px',
      data: {
        type: 'warning',
        title: 'Desactivar camión',
        message: `¿Desactivar «${truck.name}» (${truck.placa})? Seguirá en el historial de envíos.`,
        text_accept: 'Desactivar',
        text_cancel: 'Cancelar',
      },
    });

    confirmRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.truckService.deleteTruck(truck.id).subscribe({
        next: (res) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: res.message || 'Camión desactivado', type: 'success' },
            duration: 4000,
          });
          this.reload();
        },
        error: (err) => {
          const message =
            err?.error?.message ||
            (err?.status === 404 ? 'No encontrado' : 'No se pudo desactivar el camión');
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message, type: 'error' },
            duration: 6000,
          });
        },
      });
    });
  }

  private reload(): void {
    this.lastQueryParams = '';
    this.table_config.update((c) => ({ ...c, loading: true }));
    this.truckService
      .getTrucks(this.buildQueryParams())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => this.applyResponse(res),
        error: (err) => this.handleLoadError(err),
      });
  }

  getStatusLabel(status: string): string {
    return status === 'active' ? 'Activo' : 'Inactivo';
  }

  getStatusClass(status: string): string {
    return status === 'active'
      ? 'settings-badge settings-badge--status-active'
      : 'settings-badge settings-badge--status-inactive';
  }
}
