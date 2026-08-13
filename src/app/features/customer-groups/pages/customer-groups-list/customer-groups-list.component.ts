import { Component, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, Edit2, Trash2 } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfirmDialogComponent } from '../../../rbac-tenant-ui/components/confirm-dialog/confirm-dialog.component';
import { CustomerGroupFormDialogComponent } from '../../components/customer-group-form-dialog/customer-group-form-dialog.component';
import { CUSTOMER_GROUP_PERMISSIONS } from '../../config/permissions.config';
import { CustomerGroupAdmin } from '../../models/customer-group-admin.model';
import { CustomerGroupAdminService } from '../../services/customer-group-admin.service';

@Component({
  selector: 'app-customer-groups-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DatatableWrapperComponent,
    LucideAngularModule,
  ],
  templateUrl: './customer-groups-list.component.html',
  styleUrl: './customer-groups-list.component.scss',
})
export class CustomerGroupsListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Edit2 = Edit2;
  readonly Trash2 = Trash2;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: false, canAutoResize: true, width: 220 },
      { name: 'Descripción', prop: 'description', sortable: false, canAutoResize: true },
      { name: 'Clientes', prop: 'customer_count', sortable: false, canAutoResize: true, width: 110 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true, width: 110 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No hay grupos de clientes registrados' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private customerGroupAdminService: CustomerGroupAdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  get canCreate(): boolean {
    return this.hasPermission(CUSTOMER_GROUP_PERMISSIONS.create);
  }

  get canUpdate(): boolean {
    return this.hasPermission(CUSTOMER_GROUP_PERMISSIONS.update);
  }

  get canDelete(): boolean {
    return this.hasPermission(CUSTOMER_GROUP_PERMISSIONS.delete);
  }

  canDeleteGroup(group: CustomerGroupAdmin): boolean {
    return this.canDelete && !group.is_system && (group.customer_count ?? 0) === 0;
  }

  openCreateModal(): void {
    this.dialog
      .open(CustomerGroupFormDialogComponent, {
        width: '480px',
        maxWidth: '95vw',
        data: { group: null },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadGroups();
        }
      });
  }

  openEditModal(group: CustomerGroupAdmin): void {
    this.dialog
      .open(CustomerGroupFormDialogComponent, {
        width: '480px',
        maxWidth: '95vw',
        data: { group },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadGroups();
        }
      });
  }

  deleteGroup(group: CustomerGroupAdmin): void {
    if (!this.canDeleteGroup(group)) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Eliminar grupo',
        message: `¿Eliminar "${group.name}"?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        isDangerous: true,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.customerGroupAdminService.deleteCustomerGroup(group.id).subscribe({
        next: () => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Grupo eliminado', type: 'success' },
            duration: 3000,
          });
          this.loadGroups();
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: this.resolveErrorMessage(error, 'No se pudo eliminar el grupo'),
              type: 'error',
            },
            duration: 5000,
          });
        },
      });
    });
  }

  private hasPermission(permission: string): boolean {
    return this.authService.hasAdminRole() || this.authService.hasPermission(permission);
  }

  private resolveErrorMessage(error: unknown, fallback: string): string {
    if (!error || typeof error !== 'object') {
      return fallback;
    }
    const msg = (error as { error?: { message?: string | string[] } }).error?.message;
    if (Array.isArray(msg)) {
      return msg.join(', ');
    }
    if (typeof msg === 'string' && msg.trim()) {
      return msg;
    }
    return fallback;
  }

  private loadGroups(): void {
    this.table_config.update((config) => ({ ...config, loading: true }));

    this.customerGroupAdminService.getCustomerGroups().subscribe({
      next: (groups) => {
        this.table_config.update((config) => ({
          ...config,
          rows: groups,
          totalResults: groups.length,
          loading: false,
        }));
      },
      error: (error) => {
        this.table_config.update((config) => ({
          ...config,
          rows: [],
          totalResults: 0,
          loading: false,
        }));
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: this.resolveErrorMessage(error, 'Error al cargar grupos de clientes'),
            type: 'error',
          },
          duration: 5000,
        });
      },
    });
  }
}
