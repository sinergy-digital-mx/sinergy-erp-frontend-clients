import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../rbac-tenant-ui/services/user.service';
import { User } from '../../../rbac-tenant-ui/models';
import { SalesOrderService } from '../../services/sales-order.service';
import { PosUserSummary } from '../../models/sales-order.model';
import { formatPosUser } from '../../utils/pos-user-display.util';

export interface SalesOrderSellerDialogData {
  orderId: string;
  folio?: string;
  currentSellerId?: string | null;
}

export interface SalesOrderSellerDialogResult {
  saved: true;
  seller_user: PosUserSummary | null | undefined;
}

@Component({
  selector: 'app-sales-order-seller-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './sales-order-seller-dialog.component.html',
  styleUrl: './sales-order-seller-dialog.component.scss',
})
export class SalesOrderSellerDialogComponent implements OnInit {
  sellers = signal<User[]>([]);
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
    private userService: UserService,
    private salesOrderService: SalesOrderService
  ) {
    this.selectedSellerId.set(data.currentSellerId ?? '');
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        const sellers = (users ?? [])
          .filter((user) => !user.is_pos_user)
          .sort((a, b) => this.sellerLabel(a).localeCompare(this.sellerLabel(b), 'es'));
        this.sellers.set(sellers);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar los vendedores');
        this.loading.set(false);
      },
    });
  }

  get dialogTitle(): string {
    return this.data.folio ? `Vendedor — #${this.data.folio}` : 'Cambiar vendedor';
  }

  sellerLabel(user: User): string {
    return formatPosUser({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      pos_user_code: user.pos_user_code,
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

    this.salesOrderService.updateOrderSeller(this.data.orderId, sellerUserId).subscribe({
      next: (res) => {
        this.dialogRef.close({ saved: true, seller_user: res.seller_user });
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message || 'No se pudo actualizar el vendedor');
        this.saving.set(false);
      },
    });
  }
}
