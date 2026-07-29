import { Component, OnInit, signal, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InventoryTransferService } from '../../services/inventory-transfer.service';
import { InventoryTransfer, TransferFilters } from '../../models/inventory-transfer.model';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { TransferDetailDialogComponent } from '../transfer-detail-dialog/transfer-detail-dialog.component';
import { CreateTransferDialogComponent } from '../create-transfer-dialog/create-transfer-dialog.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { PERMISSIONS } from '../../../../core/config/permissions.config';
import { ArrowLeft, Download, ListFilter } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-transfer-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DatatableWrapperComponent,
    RemoveTrailingZerosPipe,
    LucideAngularModule,
    FilterClearButtonComponent,
  ],
  templateUrl: './transfer-list.component.html',
  styleUrl: './transfer-list.component.scss',
})
export class TransferListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate!: TemplateRef<unknown>;

  readonly ArrowLeft = ArrowLeft;
  readonly Download = Download;
  readonly ListFilter = ListFilter;

  searchTerm = signal('');
  sourceWarehouseId = signal('');
  destinationWarehouseId = signal('');
  createdFrom = signal('');
  createdTo = signal('');
  downloadingPdfId = signal<string | null>(null);

  filtersOpen = signal(false);
  draftSourceWarehouseId = signal('');
  draftDestinationWarehouseId = signal('');
  draftCreatedFrom = signal('');
  draftCreatedTo = signal('');

  warehouses = signal<Warehouse[]>([]);

  private transfersData = signal<InventoryTransfer[]>([]);
  private paginationState = signal({ page: 1, limit: 20 });
  private totalResultsState = signal(0);

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Producto', prop: 'product_name', sortable: false, canAutoResize: false, width: 180 },
      { name: 'Cantidad', prop: 'total_quantity', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Origen', prop: 'source_warehouse', sortable: false, canAutoResize: false, width: 160 },
      { name: 'Destino', prop: 'destination_warehouse', sortable: false, canAutoResize: false, width: 160 },
      { name: 'Usuario', prop: 'created_by_user', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Fecha', prop: 'created_at', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: false, width: 90 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin transferencias', subtitle: 'No se encontraron transferencias de inventario' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private transferService: InventoryTransferService,
    private warehouseService: WarehouseService,
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

  get canCreateTransfer(): boolean {
    return (
      this.authService.hasPermission(PERMISSIONS.inventory.write) ||
      this.authService.hasPermission(PERMISSIONS.inventory.transfer) ||
      this.authService.hasPermission(PERMISSIONS.inventory.create)
    );
  }

  ngOnInit(): void {
    this.loadWarehouses();
    this.loadTransfers();
  }

  private loadWarehouses(): void {
    this.warehouseService.getWarehouses({ limit: 100, status: 'active' }).subscribe({
      next: (response) => this.warehouses.set(response.data || []),
    });
  }

  loadTransfers(): void {
    this.table_config.update(c => ({ ...c, loading: true }));

    const { page, limit } = this.paginationState();
    // Solo filtros de almacén (y fechas/búsqueda). Sucursal = null → el API trae todo.
    const filters: TransferFilters = {
      search: this.searchTerm() || undefined,
      source_warehouse_id: this.sourceWarehouseId() || undefined,
      destination_warehouse_id: this.destinationWarehouseId() || undefined,
      source_billing_branch_id: undefined,
      destination_billing_branch_id: undefined,
      created_from: this.createdFrom() || undefined,
      created_to: this.createdTo() || undefined,
    };

    this.transferService.getTransfers(filters, { page, limit }).subscribe({
      next: (response) => {
        const transfers = response.data || [];
        this.transfersData.set(transfers);
        this.totalResultsState.set(response.total || 0);
        this.table_config.update(c => ({
          ...c,
          rows: transfers,
          totalResults: response.total || 0,
          page,
          hasNext: page < (response.totalPages || 1),
          loading: false,
        }));
      },
      error: () => {
        this.table_config.update(c => ({ ...c, loading: false }));
      },
    });
  }

  onSearch(): void {
    this.paginationState.update(p => ({ ...p, page: 1 }));
    this.loadTransfers();
  }

  onFilterChange(): void {
    this.paginationState.update(p => ({ ...p, page: 1 }));
    this.loadTransfers();
  }

  get hasPanelFilters(): boolean {
    return !!(
      this.sourceWarehouseId() ||
      this.destinationWarehouseId() ||
      this.createdFrom() ||
      this.createdTo()
    );
  }

  get panelFilterCount(): number {
    return [
      this.sourceWarehouseId(),
      this.destinationWarehouseId(),
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
    this.draftSourceWarehouseId.set(this.sourceWarehouseId());
    this.draftDestinationWarehouseId.set(this.destinationWarehouseId());
    this.draftCreatedFrom.set(this.createdFrom());
    this.draftCreatedTo.set(this.createdTo());
    this.filtersOpen.set(true);
  }

  closeFilters(): void {
    this.filtersOpen.set(false);
  }

  applyFilters(): void {
    this.sourceWarehouseId.set(this.draftSourceWarehouseId());
    this.destinationWarehouseId.set(this.draftDestinationWarehouseId());
    this.createdFrom.set(this.draftCreatedFrom());
    this.createdTo.set(this.draftCreatedTo());
    this.filtersOpen.set(false);
    this.onFilterChange();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.sourceWarehouseId.set('');
    this.destinationWarehouseId.set('');
    this.createdFrom.set('');
    this.createdTo.set('');
    this.draftSourceWarehouseId.set('');
    this.draftDestinationWarehouseId.set('');
    this.draftCreatedFrom.set('');
    this.draftCreatedTo.set('');
    this.filtersOpen.set(false);
    this.onFilterChange();
  }

  onPageChange(event: IPaginationEvent): void {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadTransfers();
  }

  openCreate(): void {
    this.dialog.open(CreateTransferDialogComponent, {
      data: {},
      width: 'min(1180px, 96vw)',
      maxWidth: '96vw',
      maxHeight: '92vh',
      panelClass: 'transfer-dialog-panel',
    }).afterClosed().subscribe((success) => {
      if (success) this.loadTransfers();
    });
  }

  openTransferDetail(transfer: InventoryTransfer): void {
    this.dialog.open(TransferDetailDialogComponent, {
      data: { transferId: transfer.id },
      width: 'min(1100px, 96vw)',
      maxWidth: '96vw',
      maxHeight: '92vh',
    });
  }

  downloadPdf(transfer: InventoryTransfer, event: Event): void {
    event.stopPropagation();
    if (this.downloadingPdfId()) return;

    this.downloadingPdfId.set(transfer.id);
    this.transferService.downloadTransferPdf(transfer.id, transfer.folio).subscribe({
      next: ({ blob, filename }) => {
        this.downloadingPdfId.set(null);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.downloadingPdfId.set(null);
        this.toast.error(err?.message || 'No se pudo descargar el PDF');
      },
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  warehouseLabel(wh: { name: string; billing_branch_code: string }): string {
    return `${wh.billing_branch_code} / ${wh.name}`;
  }

  warehouseOptionLabel(wh: Warehouse): string {
    return wh.code ? `${wh.code} — ${wh.name}` : wh.name;
  }
}
