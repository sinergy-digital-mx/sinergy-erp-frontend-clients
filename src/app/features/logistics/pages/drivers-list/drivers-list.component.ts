import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../../rbac-tenant-ui/models';
import { ShippingDetailDialogComponent } from '../../components/shipping-detail-dialog/shipping-detail-dialog.component';
import { truckShippingFolio, truckUsageStatusLabel } from '../../models/truck.model';
import { ShippingService } from '../../services/shipping.service';
import { LogisticsBranchScopeService } from '../../services/logistics-branch-scope.service';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';

interface DriverRow extends User {
  active_shipping_id?: string | null;
  active_shipping_status?: string | null;
  active_shipping_date?: string | null;
  active_shipping_truck_name?: string | null;
}

@Component({
  selector: 'app-drivers-list',
  standalone: true,
  imports: [CommonModule, DatatableWrapperComponent],
  templateUrl: './drivers-list.component.html',
  styleUrl: './drivers-list.component.scss',
})
export class DriversListComponent implements OnInit, OnDestroy {
  search = '';
  private drivers: DriverRow[] = [];
  private destroy$ = new Subject<void>();

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: false, canAutoResize: true, width: 220 },
      { name: 'Correo', prop: 'email', sortable: false, canAutoResize: true, width: 240 },
      { name: 'Uso', prop: 'usage', sortable: false, canAutoResize: false, width: 176 },
      { name: 'Licencia', prop: 'license', sortable: false, canAutoResize: true, width: 160 },
      { name: 'Carta porte', prop: 'carta_porte', sortable: false, canAutoResize: true, width: 180 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: true,
    emptyState: {
      title: 'Sin choferes',
      subtitle: 'Marca un usuario como chofer y captura su licencia y RFC',
    },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private shippingService: ShippingService,
    private dialog: MatDialog,
    readonly branchScope: LogisticsBranchScopeService,
  ) {}

  ngOnInit(): void {
    this.branchScope
      .ensureLoaded()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.load());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBranchChange(id: string): void {
    if (!id || id === this.branchScope.selectedId()) return;
    this.branchScope.setSelected(id);
    this.table_config.update((config) => ({ ...config, page: 1 }));
    this.load();
  }

  private load(): void {
    this.table_config.update((config) => ({ ...config, loading: true }));
    const branchId = this.branchScope.selectedId() || undefined;
    this.shippingService.getDrivers(branchId).subscribe({
      next: (users) => {
        this.drivers = ((users ?? []) as DriverRow[])
          .filter((user) => this.isActive(user) && this.isDriver(user))
          .sort((a, b) => this.displayName(a).localeCompare(this.displayName(b), 'es'));
        this.applyPage();
      },
      error: () => {
        this.drivers = [];
        this.table_config.update((config) => ({
          ...config,
          rows: [],
          totalResults: 0,
          hasNext: false,
          loading: false,
          emptyState: {
            title: 'No se pudo cargar',
            subtitle: 'Intenta de nuevo en un momento',
          },
        }));
      },
    });
  }

  displayName(user: User): string {
    const name = [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
    return name || user.email || 'Sin nombre';
  }

  licenseOf(user: User): string {
    return user.driver_license_number?.trim() || '—';
  }

  cartaPorteReady(user: User): boolean {
    return user.carta_porte_ready === true;
  }

  isRoute(driver: DriverRow): boolean {
    return driver.active_shipping_status?.trim().toLowerCase() === 'en ruta';
  }

  shippingFolio(driver: DriverRow): string {
    return truckShippingFolio(driver.active_shipping_id);
  }

  usageTitle(driver: DriverRow): string {
    if (!driver.active_shipping_id) return 'Sin viaje activo';
    const folio = truckShippingFolio(driver.active_shipping_id);
    const status = truckUsageStatusLabel(driver.active_shipping_status);
    const day = this.formatDay(driver.active_shipping_date);
    const truck = driver.active_shipping_truck_name?.trim();
    return [`Viaje ${folio}`, status, day, truck].filter(Boolean).join(' · ');
  }

  openShipping(driver: DriverRow, event: Event): void {
    event.stopPropagation();
    const shippingId = driver.active_shipping_id;
    if (!shippingId) return;
    const ref = this.dialog.open(ShippingDetailDialogComponent, {
      width: '96vw',
      maxWidth: '1680px',
      maxHeight: '96vh',
      data: { shippingId },
    });
    ref.afterClosed().subscribe((result) => {
      if (result?.updated) this.load();
    });
  }

  private formatDay(value: string | null | undefined): string {
    if (!value) return '';
    const [year, month, day] = value.slice(0, 10).split('-');
    if (!year || !month || !day) return '';
    return `${day}/${month}/${year}`;
  }

  private isDriver(user: User): boolean {
    const value = user.is_driver as unknown;
    return value === true || value === 1 || value === '1';
  }

  onSearch(value: string): void {
    this.search = value;
    this.table_config.update((config) => ({ ...config, page: 1 }));
    this.applyPage();
  }

  onPageChange(event: IPaginationEvent): void {
    this.table_config.update((config) => ({
      ...config,
      page: event.page,
      limit: event.limit,
    }));
    this.applyPage();
  }

  private applyPage(): void {
    const term = this.search.trim().toLowerCase();
    const filtered = term
      ? this.drivers.filter((user) => this.searchText(user).includes(term))
      : this.drivers;
    const config = this.table_config();
    const start = (config.page - 1) * config.limit;
    this.table_config.update((current) => ({
      ...current,
      rows: filtered.slice(start, start + current.limit),
      totalResults: filtered.length,
      hasNext: start + current.limit < filtered.length,
      loading: false,
    }));
  }

  private isActive(user: User): boolean {
    const status =
      typeof user.status === 'string'
        ? user.status
        : (user.status as { name?: string; code?: string })?.name ||
          (user.status as { name?: string; code?: string })?.code ||
          '';
    return String(status).toLowerCase() !== 'inactive';
  }

  private searchText(user: User): string {
    return [this.displayName(user), user.email, user.phone, user.employee?.position]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
  }
}
