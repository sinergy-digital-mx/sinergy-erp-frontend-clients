import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InventoryTransferService } from '../../services/inventory-transfer.service';
import { InventoryTransfer, TransferLine, TransferProductSummary } from '../../models/inventory-transfer.model';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { formatApiDate } from '../../../../core/utils/api-datetime.util';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';
import { BATCH_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/batch-detail-dialog.config';
import { TransferLocationPathComponent } from '../transfer-location-path/transfer-location-path.component';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Check, CircleAlert, Download, ArrowRight, X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import {
  TransferLocationView,
  fromTransferWarehouse,
  isSameFiscal,
} from '../../utils/transfer-location.util';
import { transferStatusLabel } from '../../utils/transfer-status.util';
import { SHIPPING_PERMISSIONS } from '../../../logistics/config/permissions.config';
import { Shipping } from '../../../logistics/models/shipping.model';
import { Truck, truckBusyLabel, truckSelectLabel } from '../../../logistics/models/truck.model';
import { TruckService } from '../../../logistics/services/truck.service';
import { ShippingService } from '../../../logistics/services/shipping.service';
import { TruckFormModalComponent } from '../../../logistics/components/truck-form-modal/truck-form-modal.component';
import { ShippingDetailDialogComponent } from '../../../logistics/components/shipping-detail-dialog/shipping-detail-dialog.component';
import { User } from '../../../rbac-tenant-ui/models';
import { UserDetailModalComponent } from '../../../rbac-tenant-ui/components/user-detail-modal/user-detail-modal.component';
import { UserService } from '../../../rbac-tenant-ui/services/user.service';

@Component({
  selector: 'app-transfer-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RemoveTrailingZerosPipe,
    LucideAngularModule,
    TransferLocationPathComponent,
    SpinnerComponent,
  ],
  templateUrl: './transfer-detail-dialog.component.html',
  styleUrl: './transfer-detail-dialog.component.scss',
})
export class TransferDetailDialogComponent implements OnInit {
  readonly X = X;
  readonly ArrowRight = ArrowRight;
  readonly Download = Download;
  readonly Check = Check;
  readonly CircleAlert = CircleAlert;
  readonly statusLabel = transferStatusLabel;
  readonly truckSelectLabel = truckSelectLabel;
  readonly truckBusyLabel = truckBusyLabel;

  transfer = signal<InventoryTransfer | null>(null);
  loading = signal(true);
  downloadingPdf = signal(false);
  shipMode = signal<'new' | 'existing'>('new');
  trucks = signal<Truck[]>([]);
  drivers = signal<User[]>([]);
  openShippings = signal<Shipping[]>([]);
  loadingShipOptions = signal(false);
  savingShipping = signal(false);

  shippingDate = this.today();
  truckId = '';
  driverId = '';
  notes = '';
  existingShippingId = '';

  private shippingChanged = false;

  sourceLocation = computed<TransferLocationView | null>(() => {
    const t = this.transfer();
    return t ? fromTransferWarehouse(t.source_warehouse) : null;
  });

  destLocation = computed<TransferLocationView | null>(() => {
    const t = this.transfer();
    return t ? fromTransferWarehouse(t.destination_warehouse) : null;
  });

  fiscalRelation = computed(() => {
    const source = this.sourceLocation();
    const dest = this.destLocation();
    if (!source || !dest) return null;
    return isSameFiscal(source, dest);
  });

  selectedTruck = computed(() => this.trucks().find((truck) => truck.id === this.truckId) ?? null);
  selectedDriver = computed(() => this.drivers().find((driver) => driver.id === this.driverId) ?? null);

  productGroups = computed(() => {
    const transfer = this.transfer();
    if (!transfer) return [];

    const products: TransferProductSummary[] = transfer.products?.length
      ? transfer.products
      : [
          {
            product_id: transfer.product_id ?? '',
            product_name: transfer.product_name,
            product_sku: transfer.product_sku,
            uom_id: transfer.uom_id ?? '',
            uom_name: transfer.uom_name,
            quantity: transfer.total_quantity,
            lines_count: transfer.lines?.length ?? 0,
          },
        ];

    return products.map((product) => ({
      ...product,
      lines: (transfer.lines ?? []).filter((line) => this.lineBelongsTo(line, product, products.length)),
    }));
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { transferId: string },
    private dialogRef: MatDialogRef<TransferDetailDialogComponent>,
    private transferService: InventoryTransferService,
    private dialog: MatDialog,
    private toast: ToastService,
    private auth: AuthService,
    private truckService: TruckService,
    private userService: UserService,
    private shippingService: ShippingService,
  ) {}

  ngOnInit(): void {
    this.transferService.getTransferById(this.data.transferId).subscribe({
      next: (transfer) => {
        this.transfer.set(transfer);
        this.loading.set(false);
        if (this.canAssignShipping(transfer)) this.loadShipOptions();
      },
      error: () => this.loading.set(false),
    });
  }

  canCreateShipping(): boolean {
    return this.auth.hasPermission(SHIPPING_PERMISSIONS.create);
  }

  canReadShipping(): boolean {
    return this.auth.hasPermission(SHIPPING_PERMISSIONS.viewDetail);
  }

  canAssignShipping(transfer: InventoryTransfer | null = this.transfer()): boolean {
    return !!transfer && transfer.status === 'pending' && !transfer.shipping_id && this.canCreateShipping();
  }

  close(): void {
    this.dialogRef.close(this.shippingChanged);
  }

  downloadPdf(): void {
    const t = this.transfer();
    if (!t || this.downloadingPdf()) return;

    this.downloadingPdf.set(true);
    this.transferService.downloadTransferPdf(t.id, t.folio).subscribe({
      next: ({ blob, filename }) => {
        this.downloadingPdf.set(false);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.downloadingPdf.set(false);
        this.toast.error(err?.message || 'No se pudo descargar el PDF');
      },
    });
  }

  formatDate(dateString: string): string {
    return formatApiDate(dateString, 'datetime');
  }

  formatShippingDate(dateString: string | null | undefined): string {
    if (!dateString) return '';
    return formatApiDate(dateString, 'date');
  }

  shippingCountLabel(count: number | null | undefined): string {
    if (count == null || count <= 1) return '1 transferencia';
    return `${count} transferencias`;
  }

  shippingOptionLabel(shipping: Shipping): string {
    const date = shipping.shipping_date ? this.formatShippingDate(shipping.shipping_date) : '';
    const truck = shipping.truck_name || 'Sin unidad';
    const driver = shipping.driver_name || 'Sin chofer';
    const count = shipping.transfers?.length ?? 0;
    const cargo =
      count === 0 ? 'sin transferencias' : count === 1 ? '1 transferencia' : `${count} transferencias`;
    return [date, truck, driver, cargo].filter(Boolean).join(' · ');
  }

  sourceBatchId(line: TransferLine): string | undefined {
    return line.source_batch_id || line.source_inventory_batch_id;
  }

  destinationBatchId(line: TransferLine): string | undefined {
    return line.destination_batch_id || line.destination_inventory_batch_id;
  }

  openBatchDetail(batchId: string | undefined, event: Event): void {
    event.stopPropagation();
    if (!batchId) return;
    this.dialog.open(BatchDetailDialogComponent, {
      ...BATCH_DETAIL_DIALOG_OPTIONS,
      data: { batchId },
    });
  }

  openShipping(): void {
    const shippingId = this.transfer()?.shipping_id;
    if (!shippingId || !this.canReadShipping()) return;
    this.dialog
      .open(ShippingDetailDialogComponent, {
        width: '96vw',
        maxWidth: '1680px',
        maxHeight: '96vh',
        data: { shippingId },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result?.updated) this.reloadTransfer();
      });
  }

  editDriver(): void {
    const driver = this.selectedDriver();
    if (!driver) return;
    const ref = this.dialog.open(UserDetailModalComponent, {
      width: '840px',
      maxWidth: 'calc(100vw - 1rem)',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
      data: { user: driver, isNew: false },
    });
    ref.afterClosed().subscribe((saved) => {
      if (!saved) return;
      const keepId = driver.id;
      this.userService.refreshUsers().subscribe({
        next: (users) => {
          this.drivers.set((users ?? []).filter((user) => this.isActiveDriver(user)));
          this.driverId = keepId;
        },
      });
    });
  }

  editTruck(): void {
    const truck = this.selectedTruck();
    if (!truck) return;
    const ref = this.dialog.open(TruckFormModalComponent, {
      width: '700px',
      maxWidth: '95vw',
      disableClose: true,
      data: { truck },
    });
    ref.afterClosed().subscribe((saved: Truck | null) => {
      if (!saved) return;
      const keepId = saved.id || truck.id;
      this.truckService.getTrucks({ status: 'active', limit: 100 }).subscribe({
        next: (res) => {
          this.trucks.set(res.data ?? []);
          this.truckId = keepId;
        },
      });
    });
  }

  markTitle(ready: boolean | null | undefined, missing: string[] | null | undefined): string {
    if (ready) return 'Carta porte completo';
    const detail = (missing ?? []).filter(Boolean).join(' · ');
    return detail ? `Carta porte no completo: ${detail}` : 'Carta porte no completo';
  }

  driverName(user: User): string {
    return [user.first_name, user.last_name].filter(Boolean).join(' ').trim() || user.email;
  }

  createShipping(): void {
    const transfer = this.transfer();
    const branchId = transfer?.source_warehouse?.billing_branch_id;
    if (!transfer || !branchId) {
      this.toast.error('La transferencia no tiene sucursal de origen');
      return;
    }
    if (!this.truckId || !this.driverId || !this.shippingDate) {
      this.toast.error('Indica fecha, unidad y chofer');
      return;
    }
    const truck = this.selectedTruck();
    if (truck?.active_shipping_id) {
      this.toast.error(`Esa unidad está ${truckBusyLabel(truck)}. Elige otra.`);
      return;
    }
    this.savingShipping.set(true);
    this.shippingService
      .createShipping({
        shipping_date: this.shippingDate,
        driver_id: this.driverId,
        truck_id: this.truckId,
        billing_branch_id: branchId,
        notes: this.notes.trim() || undefined,
        orders: [],
        inventory_transfer_ids: [transfer.id],
      })
      .subscribe({
        next: () => {
          this.savingShipping.set(false);
          this.toast.success(`Envío creado para ${transfer.folio}`);
          this.reloadTransfer();
        },
        error: (err) => {
          this.savingShipping.set(false);
          this.toast.error(this.apiError(err, 'No se pudo crear el envío'));
        },
      });
  }

  addToExistingShipping(): void {
    const transfer = this.transfer();
    if (!transfer) return;
    if (!this.existingShippingId) {
      this.toast.error('Elige un envío');
      return;
    }
    this.savingShipping.set(true);
    this.shippingService.addTransfers(this.existingShippingId, [transfer.id]).subscribe({
      next: () => {
        this.savingShipping.set(false);
        this.toast.success(`${transfer.folio} se agregó al envío`);
        this.reloadTransfer();
      },
      error: (err) => {
        this.savingShipping.set(false);
        this.toast.error(this.apiError(err, 'No se pudo agregar al envío'));
      },
    });
  }

  private loadShipOptions(): void {
    const branchId = this.transfer()?.source_warehouse?.billing_branch_id;
    this.loadingShipOptions.set(true);
    this.truckService.getTrucks({ status: 'active', limit: 100 }).subscribe({
      next: (res) => this.trucks.set(res.data ?? []),
      error: () => this.trucks.set([]),
    });
    this.userService.refreshUsers().subscribe({
      next: (users) => this.drivers.set((users ?? []).filter((user) => this.isActiveDriver(user))),
      error: () => this.drivers.set([]),
    });
    if (!branchId) {
      this.openShippings.set([]);
      this.loadingShipOptions.set(false);
      return;
    }
    this.shippingService
      .getShippings({ status: 'Creado', billing_branch_id: branchId, limit: 100, page: 1 })
      .subscribe({
        next: (res) => {
          this.openShippings.set(res.data ?? []);
          this.loadingShipOptions.set(false);
        },
        error: () => {
          this.openShippings.set([]);
          this.loadingShipOptions.set(false);
        },
      });
  }

  private reloadTransfer(): void {
    this.shippingChanged = true;
    this.transferService.getTransferById(this.data.transferId).subscribe({
      next: (transfer) => this.transfer.set(transfer),
      error: (err) => this.toast.error(err?.message || 'No se pudo actualizar la transferencia'),
    });
  }

  private today(): string {
    const date = new Date();
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  private isActiveDriver(user: User): boolean {
    const status =
      typeof user.status === 'string'
        ? user.status
        : (user.status as { name?: string; code?: string } | undefined)?.name ||
          (user.status as { code?: string } | undefined)?.code ||
          '';
    const flag = user.is_driver as unknown;
    const isDriver = flag === true || flag === 1 || flag === '1';
    return String(status).toLowerCase() !== 'inactive' && isDriver;
  }

  private apiError(err: { error?: { message?: string | string[] }; message?: string }, fallback: string): string {
    const message = err?.error?.message ?? err?.message;
    if (Array.isArray(message)) return message.join('. ');
    return message || fallback;
  }

  private lineBelongsTo(line: TransferLine, product: TransferProductSummary, productCount: number): boolean {
    if (!line.product_id) return productCount === 1;
    if (line.product_id !== product.product_id) return false;
    if (line.uom_id && product.uom_id && line.uom_id !== product.uom_id) return false;
    return true;
  }
}
