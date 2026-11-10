import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { InventoryTransfer } from '../../../inventory/models/inventory-transfer.model';
import { InventoryTransferService } from '../../../inventory/services/inventory-transfer.service';
import { fromTransferWarehouse, transferNeedsShipping } from '../../../inventory/utils/transfer-location.util';
import { Shipping } from '../../models/shipping.model';
import { ShippingService } from '../../services/shipping.service';

export interface AddShippingTransfersDialogData {
  shippingId: string;
  billingBranchId: string;
  assignedTransferIds: string[];
}

@Component({
  selector: 'app-add-shipping-transfers-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule, SpinnerComponent],
  templateUrl: './add-shipping-transfers-dialog.component.html',
  styleUrl: './add-shipping-transfers-dialog.component.scss',
})
export class AddShippingTransfersDialogComponent implements OnInit {
  readonly X = X;

  transfers = signal<InventoryTransfer[]>([]);
  loading = signal(false);
  saving = signal(false);
  selected = new Set<string>();

  constructor(
    private transferService: InventoryTransferService,
    private shippingService: ShippingService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddShippingTransfersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddShippingTransfersDialogData,
  ) {}

  ngOnInit(): void {
    this.loadTransfers();
  }

  loadTransfers(): void {
    this.loading.set(true);
    this.transferService
      .getTransfers(
        { status: 'pending', source_billing_branch_id: this.data.billingBranchId },
        { page: 1, limit: 100 },
      )
      .subscribe({
        next: (res) => {
          const assigned = new Set(this.data.assignedTransferIds);
          this.transfers.set(
            (res.data ?? []).filter(
              (transfer) =>
                !assigned.has(transfer.id) &&
                !transfer.shipping_id &&
                transferNeedsShipping(
                  fromTransferWarehouse(transfer.source_warehouse),
                  fromTransferWarehouse(transfer.destination_warehouse),
                ),
            ),
          );
          this.loading.set(false);
        },
        error: () => {
          this.transfers.set([]);
          this.loading.set(false);
        },
      });
  }

  toggle(id: string): void {
    if (this.selected.has(id)) this.selected.delete(id);
    else this.selected.add(id);
    this.selected = new Set(this.selected);
  }

  isSelected(id: string): boolean {
    return this.selected.has(id);
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (!this.selected.size || this.saving()) return;
    this.saving.set(true);
    this.shippingService.addTransfers(this.data.shippingId, [...this.selected]).subscribe({
      next: (res) => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: res.message || 'Transferencias agregadas', type: 'success' },
          duration: 4000,
        });
        this.dialogRef.close(res.shipping as Shipping);
      },
      error: (err) => {
        this.saving.set(false);
        const message = err?.error?.message;
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: Array.isArray(message) ? message.join('. ') : message || 'No se pudieron agregar las transferencias',
            type: 'error',
          },
          duration: 6000,
        });
      },
    });
  }

  transferLabel(transfer: InventoryTransfer): string {
    const dest = transfer.destination_warehouse?.name || 'Destino';
    return `${transfer.folio} · ${dest} · ${transfer.total_quantity}`;
  }
}
