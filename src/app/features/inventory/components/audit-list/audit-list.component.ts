import { Component, OnInit, computed, signal, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InventoryAuditService } from '../../services/inventory-audit.service';
import { InventoryService } from '../../services/inventory.service';
import { InventoryAudit, InventoryAuditFilters, InventoryAuditStatus } from '../../models/inventory-audit.model';
import {
  InventoryLocationFiscal,
  InventoryLocationBranch,
  InventoryLocationWarehouse,
} from '../../models/inventory-location.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { TransferLocationPathComponent } from '../transfer-location-path/transfer-location-path.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { PERMISSIONS } from '../../../../core/config/permissions.config';
import { ArrowLeft, Eye, ListFilter } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { ToastService } from '../../../../core/services/toast.service';
import { fiscalOptionLabel } from '../../utils/transfer-location.util';
import {
  auditProductLabel,
  auditStatusLabel,
  auditUserName,
  fromAuditWarehouse,
} from '../../utils/inventory-audit.util';
import { CreateAuditDialogComponent } from '../create-audit-dialog/create-audit-dialog.component';
import { AuditDetailDialogComponent } from '../audit-detail-dialog/audit-detail-dialog.component';
import { AUDIT_DETAIL_DIALOG_OPTIONS, CREATE_AUDIT_DIALOG_OPTIONS } from '../../config/audit-dialog.config';

@Component({
  selector: 'app-audit-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DatatableWrapperComponent,
    TransferLocationPathComponent,
    RemoveTrailingZerosPipe,
    LucideAngularModule,
    FilterClearButtonComponent,
  ],
  templateUrl: './audit-list.component.html',
  styleUrl: './audit-list.component.scss',
})
export class AuditListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate!: TemplateRef<unknown>;

  readonly ArrowLeft = ArrowLeft;
  readonly Eye = Eye;
  readonly ListFilter = ListFilter;
  readonly statuses: InventoryAuditStatus[] = ['draft', 'submitted', 'posted', 'cancelled'];

  searchTerm = signal('');
  fiscalId = signal('');
  branchId = signal('');
  warehouseId = signal('');
  status = signal<InventoryAuditStatus | ''>('');
  createdFrom = signal('');
  createdTo = signal('');

  filtersOpen = signal(false);
  draftFiscalId = signal('');
  draftBranchId = signal('');
  draftWarehouseId = signal('');
  draftStatus = signal<InventoryAuditStatus | ''>('');
  draftCreatedFrom = signal('');
  draftCreatedTo = signal('');

  locations = signal<InventoryLocationFiscal[]>([]);

  draftBranches = computed(() =>
    this.locations().find((fiscal) => fiscal.id === this.draftFiscalId())?.branches ?? []
  );
  draftWarehouses = computed(() =>
    this.draftBranches().find((branch) => branch.id === this.draftBranchId())?.warehouses ?? []
  );

  private paginationState = signal({ page: 1, limit: 20 });

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Almacén', prop: 'warehouse', sortable: false, canAutoResize: false, width: 220 },
      { name: 'Alcance', prop: 'product_name', sortable: false, canAutoResize: false, width: 170 },
      { name: 'Estado', prop: 'status', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Lotes', prop: 'totals', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Varianza', prop: 'variance', sortable: false, canAutoResize: false, width: 100 },
      { name: 'Creado', prop: 'created_by_user', sortable: false, canAutoResize: false, width: 150 },
      { name: 'Autorizado', prop: 'authorized_by_user', sortable: false, canAutoResize: false, width: 150 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: false, width: 130 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin auditorías', subtitle: 'No se encontraron auditorías de inventario' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private auditService: InventoryAuditService,
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toast: ToastService,
    private host: ElementRef<HTMLElement>
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.filtersOpen()) return;
    const target = event.target as Node | null;
    if (target && !this.host.nativeElement.querySelector('.filters-anchor')?.contains(target)) {
      this.closeFilters();
    }
  }

  get canCount(): boolean {
    return (
      this.authService.hasAdminRole() ||
      this.authService.hasPermission(PERMISSIONS.inventory.count)
    );
  }

  ngOnInit(): void {
    this.inventoryService.getLocations().subscribe({
      next: (locations) => this.locations.set(locations),
    });
    this.loadAudits();
  }

  loadAudits(): void {
    this.table_config.update((config) => ({ ...config, loading: true }));
    const { page, limit } = this.paginationState();
    const fiscal = this.fiscalId() || undefined;
    const branch = fiscal ? this.branchId() || undefined : undefined;
    const warehouse = branch ? this.warehouseId() || undefined : undefined;

    const filters: InventoryAuditFilters = {
      search: this.searchTerm() || undefined,
      status: this.status() || undefined,
      fiscal_configuration_id: fiscal,
      billing_branch_id: branch,
      warehouse_id: warehouse,
      created_from: this.createdFrom() || undefined,
      created_to: this.createdTo() || undefined,
    };

    this.auditService.getAudits(filters, { page, limit }).subscribe({
      next: (response) => {
        this.table_config.update((config) => ({
          ...config,
          rows: response.data || [],
          totalResults: response.total || 0,
          page,
          hasNext: page < (response.totalPages || 1),
          loading: false,
        }));
      },
      error: (err) => {
        this.table_config.update((config) => ({ ...config, loading: false }));
        this.toast.error(err?.message || 'No se pudieron cargar las auditorías');
      },
    });
  }

  onSearch(): void {
    this.paginationState.update((state) => ({ ...state, page: 1 }));
    this.loadAudits();
  }

  onFilterChange(): void {
    this.paginationState.update((state) => ({ ...state, page: 1 }));
    this.loadAudits();
  }

  get hasPanelFilters(): boolean {
    return !!(
      this.fiscalId() ||
      this.branchId() ||
      this.warehouseId() ||
      this.status() ||
      this.createdFrom() ||
      this.createdTo()
    );
  }

  get panelFilterCount(): number {
    return [
      this.fiscalId(),
      this.branchId(),
      this.warehouseId(),
      this.status(),
      this.createdFrom(),
      this.createdTo(),
    ].filter(Boolean).length;
  }

  get hasActiveFilters(): boolean {
    return !!(this.searchTerm() || this.hasPanelFilters);
  }

  toggleFilters(): void {
    if (this.filtersOpen()) {
      this.closeFilters();
      return;
    }
    this.draftFiscalId.set(this.fiscalId());
    this.draftBranchId.set(this.branchId());
    this.draftWarehouseId.set(this.warehouseId());
    this.draftStatus.set(this.status());
    this.draftCreatedFrom.set(this.createdFrom());
    this.draftCreatedTo.set(this.createdTo());
    this.filtersOpen.set(true);
  }

  closeFilters(): void {
    this.filtersOpen.set(false);
  }

  applyFilters(): void {
    this.fiscalId.set(this.draftFiscalId());
    this.branchId.set(this.draftBranchId());
    this.warehouseId.set(this.draftWarehouseId());
    this.status.set(this.draftStatus());
    this.createdFrom.set(this.draftCreatedFrom());
    this.createdTo.set(this.draftCreatedTo());
    this.filtersOpen.set(false);
    this.onFilterChange();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.fiscalId.set('');
    this.branchId.set('');
    this.warehouseId.set('');
    this.status.set('');
    this.createdFrom.set('');
    this.createdTo.set('');
    this.draftFiscalId.set('');
    this.draftBranchId.set('');
    this.draftWarehouseId.set('');
    this.draftStatus.set('');
    this.draftCreatedFrom.set('');
    this.draftCreatedTo.set('');
    this.filtersOpen.set(false);
    this.onFilterChange();
  }

  onDraftFiscalChange(id: string): void {
    this.draftFiscalId.set(id);
    this.draftBranchId.set('');
    this.draftWarehouseId.set('');
  }

  onDraftBranchChange(id: string): void {
    this.draftBranchId.set(id);
    this.draftWarehouseId.set('');
  }

  onPageChange(event: IPaginationEvent): void {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadAudits();
  }

  openCreate(): void {
    this.dialog
      .open(CreateAuditDialogComponent, {
        ...CREATE_AUDIT_DIALOG_OPTIONS,
        data: {
          warehouse_id: this.warehouseId() || undefined,
          fiscal_configuration_id: this.fiscalId() || undefined,
          billing_branch_id: this.branchId() || undefined,
        },
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) this.loadAudits();
      });
  }

  openDetail(audit: InventoryAudit, event?: Event): void {
    event?.stopPropagation();
    this.dialog
      .open(AuditDetailDialogComponent, {
        ...AUDIT_DETAIL_DIALOG_OPTIONS,
        data: { auditId: audit.id },
      })
      .afterClosed()
      .subscribe(() => this.loadAudits());
  }

  fiscalLabel(fiscal: InventoryLocationFiscal): string {
    return fiscalOptionLabel(fiscal);
  }

  branchLabel(branch: InventoryLocationBranch): string {
    return branch.name;
  }

  warehouseLabel(wh: InventoryLocationWarehouse): string {
    return wh.name;
  }

  productLabel(audit: InventoryAudit): string {
    return auditProductLabel(audit);
  }

  statusLabel(status: InventoryAuditStatus): string {
    return auditStatusLabel(status);
  }

  userName(audit: InventoryAudit, field: 'created_by_user' | 'authorized_by_user'): string {
    return auditUserName(audit[field]);
  }

  warehouseView(audit: InventoryAudit) {
    return fromAuditWarehouse(audit.warehouse);
  }

  countedLabel(audit: InventoryAudit): string {
    const totals = audit.totals;
    if (!totals) return '—';
    return `${totals.counted_lines} / ${totals.total_lines}`;
  }

  formatDate(value?: string | null): string {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
