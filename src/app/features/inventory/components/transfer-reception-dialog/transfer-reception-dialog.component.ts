import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { InventoryTransfer, TransferLine } from '../../models/inventory-transfer.model';
import { InventoryTransferService } from '../../services/inventory-transfer.service';
import { ToastService } from '../../../../core/services/toast.service';

export interface TransferReceptionDialogData {
  transfer: InventoryTransfer;
}

interface ReceptionRow {
  line: TransferLine;
  quantityReceived: number;
}

@Component({
  selector: 'app-transfer-reception-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './transfer-reception-dialog.component.html',
  styleUrl: './transfer-reception-dialog.component.scss',
})
export class TransferReceptionDialogComponent {
  readonly X = X;
  rows: ReceptionRow[];
  notes = '';
  saving = signal(false);

  constructor(
    private transferService: InventoryTransferService,
    private toast: ToastService,
    private dialogRef: MatDialogRef<TransferReceptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransferReceptionDialogData,
  ) {
    this.rows = (data.transfer.lines ?? []).map((line) => ({
      line,
      quantityReceived: this.asNumber(line.quantity),
    }));
  }

  lineId(line: TransferLine, index: number): string {
    return line.id || '';
  }

  shipped(row: ReceptionRow): number {
    return this.asNumber(row.line.quantity);
  }

  matches(row: ReceptionRow): boolean {
    return Math.abs(this.shipped(row) - Number(row.quantityReceived || 0)) < 0.0005;
  }

  allMatch(): boolean {
    return this.rows.length > 0 && this.rows.every((row) => this.matches(row));
  }

  close(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    if (this.rows.some((row) => !row.line.id)) {
      this.toast.error('Abre el detalle y vuelve a intentar: faltan las líneas');
      return;
    }
    this.saving.set(true);
    this.transferService
      .receiveTransfer(this.data.transfer.id, {
        notes: this.notes.trim() || undefined,
        lines: this.rows.map((row) => ({
          id: row.line.id as string,
          quantity_received: Number(row.quantityReceived),
        })),
      })
      .subscribe({
        next: (transfer) => {
          this.saving.set(false);
          const matched = transfer.status === 'received';
          this.toast.success(
            matched
              ? `${transfer.folio} recibida. Las cantidades cuadran.`
              : `${transfer.folio} recibida con diferencia.`,
          );
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.saving.set(false);
          this.toast.error(err?.message || 'No se pudo recibir la transferencia');
        },
      });
  }

  private asNumber(value: string | number | null | undefined): number {
    const parsed = parseFloat(String(value ?? 0));
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
