import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { QuotationService } from '../../services/quotation.service';

export interface QuotationNotesDialogData {
  quotationId: string;
  notes?: string | null;
  folio?: string;
}

export interface QuotationNotesDialogResult {
  saved: true;
  notes: string | null;
}

@Component({
  selector: 'app-quotation-notes-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: '../../../sales-orders/components/sales-order-notes-dialog/sales-order-notes-dialog.component.html',
  styleUrl: '../../../sales-orders/components/sales-order-notes-dialog/sales-order-notes-dialog.component.scss',
})
export class QuotationNotesDialogComponent {
  notesText = signal('');
  saving = signal(false);
  errorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QuotationNotesDialogData,
    private dialogRef: MatDialogRef<QuotationNotesDialogComponent, QuotationNotesDialogResult | undefined>,
    private quotationService: QuotationService,
  ) {
    this.notesText.set(data.notes?.trim() ? data.notes : '');
  }

  get dialogTitle(): string {
    return this.data.folio ? `Notas — #${this.data.folio}` : 'Editar notas';
  }

  cancel(): void {
    if (this.saving()) return;
    this.dialogRef.close();
  }

  save(): void {
    if (this.saving()) return;
    this.saving.set(true);
    this.errorMessage.set('');
    const payload = this.notesText().trim() || null;
    this.quotationService.updateNotes(this.data.quotationId, payload).subscribe({
      next: (res) => {
        this.dialogRef.close({ saved: true, notes: res.header?.notes ?? payload });
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'No se pudieron guardar las notas');
        this.saving.set(false);
      },
    });
  }
}
