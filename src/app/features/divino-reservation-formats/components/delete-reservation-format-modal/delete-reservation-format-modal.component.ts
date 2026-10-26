import { Component, Inject, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Mail, Trash2, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { DivinoReservationFormat } from '../../models/divino-reservation-format.model';
import { DivinoReservationFormatService } from '../../services/divino-reservation-format.service';

export interface DeleteReservationFormatDialogData {
  format: DivinoReservationFormat;
}

@Component({
  selector: 'app-delete-reservation-format-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  templateUrl: './delete-reservation-format-modal.component.html',
  styleUrl: './delete-reservation-format-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DeleteReservationFormatModalComponent {
  readonly X = X;
  readonly Trash2 = Trash2;
  readonly Mail = Mail;
  readonly deleting = signal(false);

  constructor(
    public dialogRef: MatDialogRef<DeleteReservationFormatModalComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteReservationFormatDialogData,
    private service: DivinoReservationFormatService,
    private interceptor: InterceptorService,
  ) {}

  get format(): DivinoReservationFormat {
    return this.data.format;
  }

  get isSent(): boolean {
    return this.format.status === 'sent';
  }

  get statusLabel(): string {
    return this.isSent ? 'Enviado' : 'Borrador';
  }

  get buyerName(): string {
    return this.format.buyer_name?.trim() || 'Sin comprador';
  }

  get lotLabel(): string {
    const code = this.format.property?.code?.trim();
    if (code) {
      return code;
    }
    const parts = [this.format.block, this.format.lot_number]
      .map((value) => value?.trim())
      .filter((value): value is string => !!value);
    return parts.length ? parts.join(' · ') : '—';
  }

  cancel(): void {
    if (this.deleting()) {
      return;
    }
    this.dialogRef.close(false);
  }

  confirm(): void {
    if (this.deleting()) {
      return;
    }
    this.deleting.set(true);
    this.dialogRef.disableClose = true;
    this.service.delete(this.format.id).subscribe({
      next: () => {
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Eliminado',
          message: `Se eliminó el formato ${this.format.folio}.`,
        });
        this.dialogRef.close(true);
      },
      error: (err: unknown) => {
        this.deleting.set(false);
        this.dialogRef.disableClose = false;
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: this.resolveApiErrorMessage(err, 'No pudimos eliminar el formato.'),
        });
      },
    });
  }

  private resolveApiErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse && error.error?.message != null) {
      const message = error.error.message;
      return Array.isArray(message) ? message.join(', ') : String(message);
    }
    return fallback;
  }
}
