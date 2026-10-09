import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shipping } from '../../models/shipping.model';
import { ShippingViewComponent } from '../shipping-view/shipping-view.component';

export interface ShippingDetailDialogData {
  shippingId: string;
}

@Component({
  selector: 'app-shipping-detail-dialog',
  standalone: true,
  imports: [CommonModule, ShippingViewComponent],
  template: `
    <div class="shipping-detail-dialog">
      <app-shipping-view
        [shippingId]="data.shippingId"
        [active]="true"
        [showClose]="true"
        (shippingUpdated)="onUpdated($event)"
        (closed)="close()"
      ></app-shipping-view>
    </div>
  `,
  styles: [
    `
      .shipping-detail-dialog {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 92vh;
        max-height: 94vh;
        padding: 0.7rem 1rem 0.85rem;
        box-sizing: border-box;
      }
    `,
  ],
})
export class ShippingDetailDialogComponent {
  private dirty = false;

  constructor(
    public dialogRef: MatDialogRef<ShippingDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShippingDetailDialogData
  ) {}

  onUpdated(_shipping: Shipping): void {
    this.dirty = true;
  }

  close(): void {
    this.dialogRef.close(this.dirty ? { updated: true } : undefined);
  }
}
