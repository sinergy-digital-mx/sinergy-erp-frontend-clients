import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { CustomerService } from '../../../../core/services/customer.service';
import { CustomerRegistrationSellerOption } from '../../../customers/models/customer-group.model';
import { SalesOrderService } from '../../services/sales-order.service';
import { PosUserSummary } from '../../models/sales-order.model';
import { formatPosUser } from '../../utils/pos-user-display.util';

export type SalesOrderSellerDialogMode = 'seller' | 'assignedSeller';

export interface SalesOrderSellerDialogData {
  orderId: string;
  folio?: string;
  mode: SalesOrderSellerDialogMode;
  currentSellerId?: string | null;
  currentSeller?: PosUserSummary | null;
}

export interface SalesOrderSellerDialogResult {
  saved: true;
  seller_user?: PosUserSummary | null;
  assigned_seller_user?: PosUserSummary | null;
}

@Component({
  selector: 'app-sales-order-seller-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, SpinnerComponent],
  templateUrl: './sales-order-seller-dialog.component.html',
  styleUrl: './sales-order-seller-dialog.component.scss',
})
export class SalesOrderSellerDialogComponent implements OnInit {
  sellers = signal<CustomerRegistrationSellerOption[]>([]);
  selectedSellerId = signal('');
  loading = signal(true);
  saving = signal(false);
  errorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderSellerDialogData,
    private dialogRef: MatDialogRef<
      SalesOrderSellerDialogComponent,
      SalesOrderSellerDialogResult | undefined
    >,
    private customerService: CustomerService,
    private salesOrderService: SalesOrderService
  ) {
    this.selectedSellerId.set(data.currentSellerId ?? '');
  }

  ngOnInit(): void {
    this.customerService.getRegistrationOptions().subscribe({
      next: (options) => {
        let sellers = [...(options.sellers ?? [])];
        const current = this.data.currentSeller;
        if (current?.id && !sellers.some((seller) => seller.id === current.id)) {
          sellers = [
            {
              id: current.id,
              first_name: current.first_name ?? null,
              last_name: current.last_name ?? null,
              pos_user_code: current.pos_user_code ?? null,
            },
            ...sellers,
          ];
        }
        sellers.sort((a, b) => this.sellerLabel(a).localeCompare(this.sellerLabel(b), 'es'));
        this.sellers.set(sellers);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar los vendedores');
        this.loading.set(false);
      },
    });
  }

  get isAssignedMode(): boolean {
    return this.data.mode === 'assignedSeller';
  }

  get fieldLabel(): string {
    return this.isAssignedMode ? 'Comisionado' : 'Vendedor';
  }

  get dialogTitle(): string {
    const label = this.fieldLabel;
    return this.data.folio ? `${label} — #${this.data.folio}` : `Cambiar ${label.toLowerCase()}`;
  }

  sellerLabel(user: CustomerRegistrationSellerOption | PosUserSummary): string {
    const raw = user.pos_user_code;
    const numeric = raw == null || String(raw).trim() === '' ? NaN : Number(raw);
    return formatPosUser({
      id: user.id,
      first_name: user.first_name ?? undefined,
      last_name: user.last_name ?? undefined,
      pos_user_code: Number.isFinite(numeric) ? numeric : null,
    });
  }

  cancel(): void {
    if (this.saving()) {
      return;
    }
    this.dialogRef.close();
  }

  save(): void {
    const sellerUserId = this.selectedSellerId();
    if (!sellerUserId || this.saving() || this.loading()) {
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    const request$ = this.isAssignedMode
      ? this.salesOrderService.updateOrderAssignedSeller(this.data.orderId, sellerUserId)
      : this.salesOrderService.updateOrderSeller(this.data.orderId, sellerUserId);

    request$.subscribe({
      next: (res) => {
        this.dialogRef.close({
          saved: true,
          seller_user: res.seller_user,
          assigned_seller_user: res.assigned_seller_user,
        });
      },
      error: (err: Error) => {
        this.errorMessage.set(
          err.message ||
            (this.isAssignedMode
              ? 'No se pudo actualizar el comisionado'
              : 'No se pudo actualizar el vendedor')
        );
        this.saving.set(false);
      },
    });
  }
}
