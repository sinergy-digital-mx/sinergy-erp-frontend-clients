import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, Edit2, Trash2 } from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { ConfirmDialogComponent } from '../../../rbac-tenant-ui/components/confirm-dialog/confirm-dialog.component';
import { GlobalDiscountFormDialogComponent } from '../../components/global-discount-form-dialog/global-discount-form-dialog.component';
import { GLOBAL_DISCOUNT_PERMISSIONS } from '../../config/permissions.config';
import { GlobalDiscount, GlobalDiscountType } from '../../models/global-discount.model';
import { GlobalDiscountService } from '../../services/global-discount.service';

@Component({
  selector: 'app-global-discounts-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    DatatableWrapperComponent,
    FilterClearButtonComponent,
    HasPermissionDirective,
    LucideAngularModule,
  ],
  templateUrl: './global-discounts-list.component.html',
  styleUrl: './global-discounts-list.component.scss',
})
export class GlobalDiscountsListComponent implements OnInit, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Edit2 = Edit2;
  readonly Trash2 = Trash2;
  readonly createPermissions = [...GLOBAL_DISCOUNT_PERMISSIONS.create];
  readonly updatePermissions = [...GLOBAL_DISCOUNT_PERMISSIONS.update];
  readonly deletePermissions = [...GLOBAL_DISCOUNT_PERMISSIONS.delete];

  activeFilter = new FormControl<string>('true', { nonNullable: true });
  private readonly destroy$ = new Subject<void>();

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: false, canAutoResize: true, width: 220 },
      { name: 'Tipo', prop: 'discount_type', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Valor', prop: 'value', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Vigencia', prop: 'validity', sortable: false, canAutoResize: true, width: 180 },
      { name: 'Estado', prop: 'status', sortable: false, canAutoResize: true, width: 100 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true, width: 110 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No hay descuentos globales registrados' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private globalDiscountService: GlobalDiscountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDiscounts();
    this.activeFilter.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.loadDiscounts());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get hasActiveFilters(): boolean {
    return this.activeFilter.value !== 'true';
  }

  clearFilters(): void {
    this.activeFilter.setValue('true', { emitEvent: false });
    this.loadDiscounts();
  }

  openCreateModal(): void {
    this.dialog
      .open(GlobalDiscountFormDialogComponent, {
        width: '560px',
        maxWidth: '95vw',
        data: { discount: null },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadDiscounts();
        }
      });
  }

  openEditModal(discount: GlobalDiscount): void {
    this.dialog
      .open(GlobalDiscountFormDialogComponent, {
        width: '560px',
        maxWidth: '95vw',
        data: { discount },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadDiscounts();
        }
      });
  }

  deleteDiscount(discount: GlobalDiscount): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Eliminar descuento global',
        message: `¿Eliminar "${discount.name}"?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        isDangerous: true,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.globalDiscountService.deleteGlobalDiscount(discount.id).subscribe({
        next: () => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Descuento global eliminado', type: 'success' },
            duration: 3000,
          });
          this.loadDiscounts();
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: error?.error?.message || 'Error al eliminar el descuento global',
              type: 'error',
            },
            duration: 5000,
          });
        },
      });
    });
  }

  getTypeLabel(type: GlobalDiscountType): string {
    return type === 'percentage' ? 'Porcentaje' : 'Monto fijo';
  }

  getValueLabel(discount: GlobalDiscount): string {
    if (discount.discount_type === 'percentage') {
      return `${discount.value}%`;
    }
    return `$${Number(discount.value).toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  getValidityLabel(discount: GlobalDiscount): string {
    if (!discount.valid_from && !discount.valid_to) {
      return 'Sin límite';
    }
    const from = discount.valid_from
      ? new Date(discount.valid_from).toLocaleDateString('es-MX')
      : '—';
    const to = discount.valid_to ? new Date(discount.valid_to).toLocaleDateString('es-MX') : '—';
    return `${from} → ${to}`;
  }

  getStatusClass(discount: GlobalDiscount): string {
    return discount.is_active === false
      ? 'settings-badge--status-inactive'
      : 'settings-badge--status-active';
  }

  getStatusLabel(discount: GlobalDiscount): string {
    return discount.is_active === false ? 'Inactivo' : 'Activo';
  }

  private loadDiscounts(): void {
    this.table_config.update((config) => ({ ...config, loading: true }));

    this.globalDiscountService.getGlobalDiscounts().subscribe({
      next: (discounts) => {
        const filtered = this.filterByActive(discounts);
        this.table_config.update((config) => ({
          ...config,
          rows: filtered,
          totalResults: filtered.length,
          loading: false,
        }));
      },
      error: (error) => {
        console.error('Error loading global discounts:', error);
        this.table_config.update((config) => ({
          ...config,
          rows: [],
          totalResults: 0,
          loading: false,
        }));
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error?.error?.message || 'Error al cargar descuentos globales',
            type: 'error',
          },
          duration: 5000,
        });
      },
    });
  }

  private filterByActive(discounts: GlobalDiscount[]): GlobalDiscount[] {
    const active = this.activeFilter.value;
    if (active === 'true') {
      return discounts.filter((item) => item.is_active !== false);
    }
    if (active === 'false') {
      return discounts.filter((item) => item.is_active === false);
    }
    return discounts;
  }
}
