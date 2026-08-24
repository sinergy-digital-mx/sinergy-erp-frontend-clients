import { Component, OnInit, signal, computed, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InventoryTransferService } from '../../services/inventory-transfer.service';
import { InventoryService } from '../../services/inventory.service';
import { InventoryTransfer, TransferFilters } from '../../models/inventory-transfer.model';
import {
  InventoryLocationFiscal,
  InventoryLocationBranch,
  InventoryLocationWarehouse,
} from '../../models/inventory-location.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { TransferDetailDialogComponent } from '../transfer-detail-dialog/transfer-detail-dialog.component';
import { CreateTransferDialogComponent } from '../create-transfer-dialog/create-transfer-dialog.component';
import { TransferLocationPathComponent } from '../transfer-location-path/transfer-location-path.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { PERMISSIONS } from '../../../../core/config/permissions.config';
import { ArrowLeft, Download, ListFilter } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { ToastService } from '../../../../core/services/toast.service';
import {
  TransferLocationView,
  fiscalOptionLabel,
  fromTransferWarehouse,
  isSameFiscal,
} from '../../utils/transfer-location.util';

@Component({
  selector: 'app-transfer-list',
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
  templateUrl: './transfer-list.component.html',
  styleUrl: './transfer-list.component.scss',
})
export class TransferListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate!: TemplateRef<unknown>;

  readonly ArrowLeft = ArrowLeft;
  readonly Download = Download;
  readonly ListFilter = ListFilter;

  searchTerm = signal('');
  sourceFiscalId = signal('');
  sourceBranchId = signal('');
  sourceWarehouseId = signal('');
  destFiscalId = signal('');
  destBranchId = signal('');
  destWarehouseId = signal('');
  createdFrom = signal('');
  createdTo = signal('');
  downloadingPdfId = signal<string | null>(null);

  filtersOpen = signal(false);
  draftSourceFiscalId = signal('');
  draftSourceBranchId = signal('');
  draftSourceWarehouseId = signal('');
  draftDestFiscalId = signal('');
  draftDestBranchId = signal('');
  draftDestWarehouseId = signal('');
  draftCreatedFrom = signal('');
  draftCreatedTo = signal('');

  locations = signal<InventoryLocationFiscal[]>([]);

  draftSourceBranches = computed(() =>
    this.locations().find(f => f.id === this.draftSourceFiscalId())?.branches ?? []
  );
  draftSourceWarehouses = computed(() =>
    this.draftSourceBranches().find(b => b.id === this.draftSourceBranchId())?.warehouses ?? []
  );
  draftDestBranches = computed(() =>
    this.locations().find(f => f.id === this.draftDestFiscalId())?.branches ?? []
  );
  draftDestWarehouses = computed(() =>
    this.draftDestBranches().find(b => b.id === this.draftDestBranchId())?.warehouses ?? []
  );

  private transfersData = signal<InventoryTransfer[]>([]);
  private paginationState = signal({ page: 1, limit: 20 });
  private totalResultsState = signal(0);

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Producto', prop: 'product_name', sortable: false, canAutoResize: false, width: 180 },
      { name: 'Cantidad', prop: 'total_quantity', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Origen', prop: 'source_warehouse', sortable: false, canAutoResize: false, width: 210 },
      { name: 'Destino', prop: 'destination_warehouse', sortable: false, canAutoResize: false, width: 220 },
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

  get canCreateTransfer(): boolean {
    return (
      this.authService.hasPermission(PERMISSIONS.inventory.write) ||
      this.authService.hasPermission(PERMISSIONS.inventory.transfer) ||
      this.authService.hasPermission(PERMISSIONS.inventory.create)
    );
  }

  ngOnInit(): void {
    this.loadLocations();
    this.loadTransfers();
  }

  private loadLocations(): void {
    this.inventoryService.getLocations().subscribe({
      next: (locations) => this.locations.set(locations),
    });
  }

  loadTransfers(): void {
    this.table_config.update(c => ({ ...c, loading: true }));

    const { page, limit } = this.paginationState();
    const sourceFiscal = this.sourceFiscalId() || undefined;
    const sourceBranch = sourceFiscal ? (this.sourceBranchId() || undefined) : undefined;
    const sourceWarehouse = sourceBranch ? (this.sourceWarehouseId() || undefined) : undefined;
    const destFiscal = this.destFiscalId() || undefined;
    const destBranch = destFiscal ? (this.destBranchId() || undefined) : undefined;
    const destWarehouse = destBranch ? (this.destWarehouseId() || undefined) : undefined;

    const filters: TransferFilters = {
      search: this.searchTerm() || undefined,
      source_fiscal_configuration_id: sourceFiscal,
      source_billing_branch_id: sourceBranch,
      source_warehouse_id: sourceWarehouse,
      destination_fiscal_configuration_id: destFiscal,
      destination_billing_branch_id: destBranch,
      destination_warehouse_id: destWarehouse,
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
      this.sourceFiscalId() ||
      this.sourceBranchId() ||
      this.sourceWarehouseId() ||
      this.destFiscalId() ||
      this.destBranchId() ||
      this.destWarehouseId() ||
      this.createdFrom() ||
      this.createdTo()
    );
  }

  get panelFilterCount(): number {
    return [
      this.sourceFiscalId(),
      this.sourceBranchId(),
      this.sourceWarehouseId(),
      this.destFiscalId(),
      this.destBranchId(),
      this.destWarehouseId(),
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
    this.draftSourceFiscalId.set(this.sourceFiscalId());
    this.draftSourceBranchId.set(this.sourceBranchId());
    this.draftSourceWarehouseId.set(this.sourceWarehouseId());
    this.draftDestFiscalId.set(this.destFiscalId());
    this.draftDestBranchId.set(this.destBranchId());
    this.draftDestWarehouseId.set(this.destWarehouseId());
    this.draftCreatedFrom.set(this.createdFrom());
    this.draftCreatedTo.set(this.createdTo());
    this.filtersOpen.set(true);
  }

  closeFilters(): void {
    this.filtersOpen.set(false);
  }

  applyFilters(): void {
    this.sourceFiscalId.set(this.draftSourceFiscalId());
    this.sourceBranchId.set(this.draftSourceBranchId());
    this.sourceWarehouseId.set(this.draftSourceWarehouseId());
    this.destFiscalId.set(this.draftDestFiscalId());
    this.destBranchId.set(this.draftDestBranchId());
    this.destWarehouseId.set(this.draftDestWarehouseId());
    this.createdFrom.set(this.draftCreatedFrom());
    this.createdTo.set(this.draftCreatedTo());
    this.filtersOpen.set(false);
    this.onFilterChange();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.sourceFiscalId.set('');
    this.sourceBranchId.set('');
    this.sourceWarehouseId.set('');
    this.destFiscalId.set('');
    this.destBranchId.set('');
    this.destWarehouseId.set('');
    this.createdFrom.set('');
    this.createdTo.set('');
    this.draftSourceFiscalId.set('');
    this.draftSourceBranchId.set('');
    this.draftSourceWarehouseId.set('');
    this.draftDestFiscalId.set('');
    this.draftDestBranchId.set('');
    this.draftDestWarehouseId.set('');
    this.draftCreatedFrom.set('');
    this.draftCreatedTo.set('');
    this.filtersOpen.set(false);
    this.onFilterChange();
  }

  onDraftSourceFiscalChange(id: string): void {
    this.draftSourceFiscalId.set(id);
    this.draftSourceBranchId.set('');
    this.draftSourceWarehouseId.set('');
  }

  onDraftSourceBranchChange(id: string): void {
    this.draftSourceBranchId.set(id);
    this.draftSourceWarehouseId.set('');
  }

  onDraftDestFiscalChange(id: string): void {
    this.draftDestFiscalId.set(id);
    this.draftDestBranchId.set('');
    this.draftDestWarehouseId.set('');
  }

  onDraftDestBranchChange(id: string): void {
    this.draftDestBranchId.set(id);
    this.draftDestWarehouseId.set('');
  }

  onPageChange(event: IPaginationEvent): void {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadTransfers();
  }

  openCreate(): void {
    this.dialog.open(CreateTransferDialogComponent, {
      data: {},
      width: 'min(1100px, 96vw)',
      height: '720px',
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

  fiscalLabel(fiscal: InventoryLocationFiscal): string {
    return fiscalOptionLabel(fiscal);
  }

  branchLabel(branch: InventoryLocationBranch): string {
    return branch.name;
  }

  warehouseLabel(wh: InventoryLocationWarehouse): string {
    return wh.name;
  }

  sourceView(transfer: InventoryTransfer): TransferLocationView {
    return fromTransferWarehouse(transfer.source_warehouse);
  }

  destView(transfer: InventoryTransfer): TransferLocationView {
    return fromTransferWarehouse(transfer.destination_warehouse);
  }

  fiscalRelation(transfer: InventoryTransfer): boolean | null {
    return isSameFiscal(this.sourceView(transfer), this.destView(transfer));
  }
}
