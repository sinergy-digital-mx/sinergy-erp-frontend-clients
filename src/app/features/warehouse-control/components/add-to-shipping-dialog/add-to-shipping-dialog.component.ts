import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShippingService } from '../../../logistics/services/shipping.service';
import { Shipping } from '../../../logistics/models/shipping.model';

export interface AddToShippingDialogData {
  salesOrderId: string;
  billingBranchId?: string;
}

@Component({
  selector: 'app-add-to-shipping-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './add-to-shipping-dialog.component.html',
  styleUrl: './add-to-shipping-dialog.component.scss',
})
export class AddToShippingDialogComponent implements OnInit {
  readonly X = X;
  trips = signal<Shipping[]>([]);
  loading = signal(true);
  savingId = signal<string | null>(null);
  error = signal<string | null>(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddToShippingDialogData,
    private dialogRef: MatDialogRef<AddToShippingDialogComponent, boolean>,
    private shippings: ShippingService,
  ) {}

  ngOnInit(): void {
    this.shippings
      .getShippings({
        status: 'Creado',
        billing_branch_id: this.data.billingBranchId,
        limit: 50,
        page: 1,
      })
      .subscribe({
        next: (res) => {
          this.trips.set(res.data ?? []);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('No se pudieron cargar los viajes en Creado');
        },
      });
  }

  label(trip: Shipping): string {
    const plate = trip.truck_placa?.trim();
    const when = trip.shipping_date ? String(trip.shipping_date).slice(0, 10) : '';
    return [when, plate, trip.driver_name].filter(Boolean).join(' · ') || trip.id.slice(0, 8);
  }

  add(trip: Shipping): void {
    if (this.savingId()) return;
    this.savingId.set(trip.id);
    this.error.set(null);
    this.shippings.addStops(trip.id, [{ sales_order_id: this.data.salesOrderId }]).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        this.savingId.set(null);
        this.error.set(err?.error?.message || 'No se pudo agregar la orden al viaje');
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
