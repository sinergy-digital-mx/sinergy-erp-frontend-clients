import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../rbac-tenant-ui/models';
import { UserService } from '../../../rbac-tenant-ui/services/user.service';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';

@Component({
  selector: 'app-drivers-list',
  standalone: true,
  imports: [CommonModule, DatatableWrapperComponent],
  templateUrl: './drivers-list.component.html',
  styleUrl: './drivers-list.component.scss',
})
export class DriversListComponent implements OnInit {
  search = '';
  private drivers: User[] = [];

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: false, canAutoResize: true, width: 220 },
      { name: 'Correo', prop: 'email', sortable: false, canAutoResize: true, width: 280 },
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.drivers = (users ?? [])
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
