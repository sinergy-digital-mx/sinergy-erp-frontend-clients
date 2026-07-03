import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PurchaseOrderService } from '../../services/purchase-order.service';

export interface PurchaseOrderNotesDialogData {
  orderId: string;
  notes?: string | null;
  folio?: string;
}

export interface PurchaseOrderNotesDialogResult {
  saved: true;
  notes: string | null;
}

@Component({
  selector: 'app-purchase-order-notes-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './purchase-order-notes-dialog.component.html',
  styleUrl: './purchase-order-notes-dialog.component.scss',
})
export class PurchaseOrderNotesDialogComponent {
  notesText = signal('');
  saving = signal(false);
  errorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PurchaseOrderNotesDialogData,
    private dialogRef: MatDialogRef<PurchaseOrderNotesDialogComponent, PurchaseOrderNotesDialogResult | undefined>,
    private purchaseOrderService: PurchaseOrderService
  ) {
    this.notesText.set(data.notes?.trim() ? data.notes : '');
  }

  get dialogTitle(): string {
    return this.data.folio ? `Notas — #${this.data.folio}` : 'Editar notas';
  }

  cancel(): void {
    if (this.saving()) {
      return;
    }
    this.dialogRef.close();
  }

  save(): void {
    if (this.saving()) {
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    const trimmed = this.notesText().trim();
    const payload = trimmed ? trimmed : null;

    this.purchaseOrderService.updateOrderNotes(this.data.orderId, payload).subscribe({
      next: (res) => {
        this.dialogRef.close({ saved: true, notes: res.notes });
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message || 'No se pudieron guardar las notas');
        this.saving.set(false);
      },
    });
  }
}
