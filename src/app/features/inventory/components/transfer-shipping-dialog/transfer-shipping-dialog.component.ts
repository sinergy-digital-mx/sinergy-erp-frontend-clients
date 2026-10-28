import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TruckFormModalComponent } from '../../../logistics/components/truck-form-modal/truck-form-modal.component';
import { Check, CircleAlert, LucideAngularModule, X } from 'lucide-angular';
import { InventoryTransfer } from '../../models/inventory-transfer.model';
import { Truck, truckBusyLabel, truckSelectLabel } from '../../../logistics/models/truck.model';
import { UserDetailModalComponent } from '../../../rbac-tenant-ui/components/user-detail-modal/user-detail-modal.component';
import { TruckService } from '../../../logistics/services/truck.service';
import { ShippingService } from '../../../logistics/services/shipping.service';
import { UserService } from '../../../rbac-tenant-ui/services/user.service';
import { User } from '../../../rbac-tenant-ui/models';
import { ToastService } from '../../../../core/services/toast.service';

export interface TransferShippingDialogData {
  transfer: InventoryTransfer;
}

@Component({
  selector: 'app-transfer-shipping-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './transfer-shipping-dialog.component.html',
  styleUrl: './transfer-shipping-dialog.component.scss',
})
export class TransferShippingDialogComponent implements OnInit {
  readonly X = X;
  readonly Check = Check;
  readonly CircleAlert = CircleAlert;
  readonly truckSelectLabel = truckSelectLabel;
  readonly truckBusyLabel = truckBusyLabel;

  trucks = signal<Truck[]>([]);
  drivers = signal<User[]>([]);
  shippingDate = this.today();
  truckId = '';
  driverId = '';
  notes = '';
  saving = signal(false);

  selectedTruck = computed(() => this.trucks().find((truck) => truck.id === this.truckId) ?? null);
  selectedDriver = computed(() => this.drivers().find((driver) => driver.id === this.driverId) ?? null);

  constructor(
    private truckService: TruckService,
    private dialog: MatDialog,
    private userService: UserService,
    private shippingService: ShippingService,
    private toast: ToastService,
    private dialogRef: MatDialogRef<TransferShippingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransferShippingDialogData,
  ) {}

  ngOnInit(): void {
    this.truckService.getTrucks({ status: 'active', limit: 100 }).subscribe({
      next: (res) => this.trucks.set(res.data ?? []),
      error: () => this.trucks.set([]),
    });
    this.userService.refreshUsers().subscribe({
      next: (users) => {
        this.drivers.set((users ?? []).filter((user) => this.isActiveDriver(user)));
      },
      error: () => this.drivers.set([]),
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

  close(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    const branchId = this.data.transfer.source_warehouse?.billing_branch_id;
    if (!branchId) {
      this.toast.error('La transferencia no tiene sucursal de origen');
      return;
    }
    if (!this.truckId || !this.driverId || !this.shippingDate) {
      this.toast.error('Indica fecha, unidad y chofer');
      return;
    }
    this.saving.set(true);
    this.shippingService
      .createShipping({
        shipping_date: this.shippingDate,
        driver_id: this.driverId,
        truck_id: this.truckId,
        billing_branch_id: branchId,
        notes: this.notes.trim() || undefined,
        orders: [],
        inventory_transfer_ids: [this.data.transfer.id],
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.toast.success(`Envío creado para ${this.data.transfer.folio}`);
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.saving.set(false);
          this.toast.error(err?.error?.message || err?.message || 'No se pudo crear el envío');
        },
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
}
