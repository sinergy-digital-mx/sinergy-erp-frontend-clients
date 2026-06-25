import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PosApplicableDiscount } from '../../models/pos-inventory-summary.model';
import { formatApplicableDiscountLabel, previewLineDiscount } from '../../utils/pos-discount.util';

export interface PosAddProductDialogData {
  product_id: string;
  product_name: string;
  product_sku: string;
  product_uom_id: string;
  uom_id: string;
  uom_name: string;
  unit_price: number;
  iva_percentage: number;
  ieps_percentage: number;
  applicable_discounts: PosApplicableDiscount[];
}

export interface PosAddProductDialogResult {
  quantity: number;
  product_discount_id: string | null;
  selected_discount: PosApplicableDiscount | null;
}

@Component({
  selector: 'app-pos-add-product-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './pos-add-product-dialog.component.html',
  styleUrl: './pos-add-product-dialog.component.scss',
})
export class PosAddProductDialogComponent {
  quantity = signal(1);
  selectedDiscountId = signal<string>('');

  readonly preview = computed(() => {
    const qty = Math.max(1, Number(this.quantity()) || 1);
    const discount = this.resolveSelectedDiscount();
    const line = previewLineDiscount(this.data.unit_price, qty, discount);
    const iva = line.lineNetSubtotal * (this.data.iva_percentage / 100);
    const ieps = line.lineNetSubtotal * (this.data.ieps_percentage / 100);
    return {
      ...line,
      lineTotal: line.lineNetSubtotal + iva + ieps,
    };
  });

  constructor(
    private dialogRef: MatDialogRef<PosAddProductDialogComponent, PosAddProductDialogResult | undefined>,
    @Inject(MAT_DIALOG_DATA) readonly data: PosAddProductDialogData
  ) {}

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  }

  discountLabel(discount: PosApplicableDiscount): string {
    return formatApplicableDiscountLabel(discount);
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }

  confirm(): void {
    const qty = Math.max(1, Math.floor(Number(this.quantity()) || 1));
    const discount = this.resolveSelectedDiscount();
    this.dialogRef.close({
      quantity: qty,
      product_discount_id: discount?.id ?? null,
      selected_discount: discount,
    });
  }

  private resolveSelectedDiscount(): PosApplicableDiscount | null {
    const id = this.selectedDiscountId()?.trim();
    if (!id) {
      return null;
    }
    return this.data.applicable_discounts.find((d) => d.id === id) ?? null;
  }
}
