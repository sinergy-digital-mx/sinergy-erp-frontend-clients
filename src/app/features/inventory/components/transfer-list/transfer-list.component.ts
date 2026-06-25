import { Component, OnInit, signal, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InventoryTransferService } from '../../services/inventory-transfer.service';
import { InventoryTransfer, TransferFilters } from '../../models/inventory-transfer.model';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { BranchService } from '../../../settings/services/branch.service';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { Branch } from '../../../settings/models/branch.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { TransferDetailDialogComponent } from '../transfer-detail-dialog/transfer-detail-dialog.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { ArrowLeft } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

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
  ],
  templateUrl: './transfer-list.component.html',
  styleUrl: './transfer-list.component.scss',
})
export class TransferListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate!: TemplateRef<unknown>;

  readonly ArrowLeft = ArrowLeft;

  searchTerm = signal('');
  sourceWarehouseId = signal('');
  destinationWarehouseId = signal('');
  sourceBranchId = signal('');
  destinationBranchId = signal('');
  createdFrom = signal('');
  createdTo = signal('');

  warehouses = signal<Warehouse[]>([]);
  branches = signal<Branch[]>([]);

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
      { name: 'Fecha', prop: 'created_at', sortable: false, canAutoResize: false, width: 140 },
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
    private branchService: BranchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadWarehouses();
    this.loadBranches();
    this.loadTransfers();
  }

  private loadWarehouses(): void {
    this.warehouseService.getWarehouses({ limit: 500 }).subscribe({
      next: (response) => this.warehouses.set(response.data || []),
    });
  }

  private loadBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => this.branches.set(branches),
    });
  }

  loadTransfers(): void {
    this.table_config.update(c => ({ ...c, loading: true }));

    const { page, limit } = this.paginationState();
    const filters: TransferFilters = {
      search: this.searchTerm() || undefined,
      source_warehouse_id: this.sourceWarehouseId() || undefined,
      destination_warehouse_id: this.destinationWarehouseId() || undefined,
      source_billing_branch_id: this.sourceBranchId() || undefined,
      destination_billing_branch_id: this.destinationBranchId() || undefined,
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

  onPageChange(event: IPaginationEvent): void {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadTransfers();
  }

  openTransferDetail(transfer: InventoryTransfer): void {
    this.dialog.open(TransferDetailDialogComponent, {
      data: { transferId: transfer.id },
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '90vh',
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
}
