import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SalesOrderService } from '../../services/sales-order.service';

export interface SalesOrderNotesDialogData {
  orderId: string;
  notes?: string | null;
  folio?: string;
}

export interface SalesOrderNotesDialogResult {
  saved: true;
  notes: string | null;
}

@Component({
  selector: 'app-sales-order-notes-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './sales-order-notes-dialog.component.html',
  styleUrl: './sales-order-notes-dialog.component.scss',
})
export class SalesOrderNotesDialogComponent {
  notesText = signal('');
  saving = signal(false);
  errorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderNotesDialogData,
    private dialogRef: MatDialogRef<SalesOrderNotesDialogComponent, SalesOrderNotesDialogResult | undefined>,
    private salesOrderService: SalesOrderService
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

    this.salesOrderService.updateOrderNotes(this.data.orderId, payload).subscribe({
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
