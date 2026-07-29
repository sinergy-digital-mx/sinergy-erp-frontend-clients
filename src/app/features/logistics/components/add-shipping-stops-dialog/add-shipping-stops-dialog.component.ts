import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import { SalesOrder } from '../../../sales-orders/models/sales-order.model';
import { Shipping } from '../../models/shipping.model';
import { ShippingService } from '../../services/shipping.service';

export interface AddShippingStopsDialogData {
  shippingId: string;
  warehouseId: string;
  assignedOrderIds: string[];
}

@Component({
  selector: 'app-add-shipping-stops-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, SearchComponent, LucideAngularModule],
  templateUrl: './add-shipping-stops-dialog.component.html',
  styleUrl: './add-shipping-stops-dialog.component.scss',
})
export class AddShippingStopsDialogComponent implements OnInit {
  readonly X = X;

  orders = signal<SalesOrder[]>([]);
  loading = signal(false);
  saving = signal(false);
  selected = new Set<string>();
  search = '';
  page = 1;
  totalPages = 1;

  constructor(
    private salesOrderService: SalesOrderService,
    private shippingService: ShippingService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddShippingStopsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddShippingStopsDialogData
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);
    this.salesOrderService
      .getOrders(
        {
          search: this.search || undefined,
          general_status: 'Surtida',
          warehouse_id: this.data.warehouseId,
        },
        { page: this.page, limit: 20 }
      )
      .subscribe({
        next: (res) => {
          const assigned = new Set(this.data.assignedOrderIds);
          const rows = (res.data ?? []).filter((o) => !assigned.has(o.id));
          this.orders.set(rows);
          this.totalPages = res.totalPages || 1;
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.orders.set([]);
        },
      });
  }

  onSearch(term: string): void {
    this.search = term;
    this.page = 1;
    this.loadOrders();
  }

  toggle(id: string): void {
    if (this.selected.has(id)) this.selected.delete(id);
    else this.selected.add(id);
    this.selected = new Set(this.selected);
  }

  isSelected(id: string): boolean {
    return this.selected.has(id);
  }

  prevPage(): void {
    if (this.page <= 1) return;
    this.page -= 1;
    this.loadOrders();
  }

  nextPage(): void {
    if (this.page >= this.totalPages) return;
    this.page += 1;
    this.loadOrders();
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (!this.selected.size) return;
    const baseSeq = this.data.assignedOrderIds.length;
    const orders = Array.from(this.selected).map((sales_order_id, index) => ({
      sales_order_id,
      stop_sequence: baseSeq + index + 1,
    }));
    this.saving.set(true);
    this.shippingService.addStops(this.data.shippingId, orders).subscribe({
      next: (res) => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: res.message || 'Paradas agregadas', type: 'success' },
          duration: 4000,
        });
        this.dialogRef.close(res.shipping as Shipping);
      },
      error: (err) => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: err?.error?.message || 'No se pudieron agregar las órdenes',
            type: 'error',
          },
          duration: 6000,
        });
      },
    });
  }

  orderLabel(order: SalesOrder): string {
    const folio = order.folio || order.id.slice(0, 8);
    const company = order.customer?.company_name?.trim() || '';
    const person = [order.customer?.name, order.customer?.lastname]
      .filter(Boolean)
      .join(' ')
      .trim();
    let customer = '';
    if (company && person) customer = `${company} - ${person}`;
    else if (company) customer = company;
    else if (person) customer = person;
    else customer = order.customer_display_name || order.customer_summary?.display_name || 'Cliente';
    return `#${folio} · ${customer}`;
  }
}
