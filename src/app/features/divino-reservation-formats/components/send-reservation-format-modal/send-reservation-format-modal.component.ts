import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { finalize } from 'rxjs';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { DivinoReservationFormatService } from '../../services/divino-reservation-format.service';
import {
  DivinoReservationFormat,
  SendDivinoReservationFormatDto,
} from '../../models/divino-reservation-format.model';

@Component({
  selector: 'app-send-reservation-format-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './send-reservation-format-modal.component.html',
  styleUrls: ['./send-reservation-format-modal.component.scss'],
})
export class SendReservationFormatModalComponent {
  readonly X = X;
  form: FormGroup;
  sending = signal(false);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SendReservationFormatModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { format: DivinoReservationFormat },
    private service: DivinoReservationFormatService,
    private interceptor: InterceptorService,
  ) {
    this.form = this.fb.group({
      to_email: [this.data.format?.buyer_email ?? '', [Validators.email]],
      cc: [''],
      bcc: [''],
      subject: ['Tu formato de reservación - Divino'],
      message: ['Adjuntamos tu formato de reservación.'],
    });
  }

  close(): void {
    if (!this.sending()) {
      this.dialogRef.close(false);
    }
  }

  send(): void {
    if (this.sending()) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.interceptor.openSnackbar({
        type: 'error',
        title: 'Error',
        message: 'Revisa el correo de destino.',
      });
      return;
    }

    const raw = this.form.value;
    const payload: SendDivinoReservationFormatDto = {
      ...(raw.to_email?.trim() && { to_email: raw.to_email.trim() }),
      ...this.buildEmailArray('cc', raw.cc),
      ...this.buildEmailArray('bcc', raw.bcc),
      ...(raw.subject?.trim() && { subject: raw.subject.trim() }),
      ...(raw.message?.trim() && { message: raw.message.trim() }),
    };

    this.sending.set(true);
    this.service
      .send(this.data.format.id, payload)
      .pipe(finalize(() => this.sending.set(false)))
      .subscribe({
        next: (updated) => {
          this.interceptor.openSnackbar({
            type: 'success',
            title: 'Enviado',
            message: `Formato enviado a ${updated.sent_to ?? payload.to_email ?? 'el destinatario'}.`,
          });
          this.dialogRef.close(true);
        },
        error: (err: unknown) => {
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: this.resolveApiErrorMessage(err, 'No pudimos enviar el correo.'),
          });
        },
      });
  }

  private buildEmailArray(key: 'cc' | 'bcc', rawValue: string) {
    const emails = (rawValue || '')
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean);
    return emails.length ? { [key]: emails } : {};
  }

  private resolveApiErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse && error.error?.message != null) {
      const msg = error.error.message;
      return Array.isArray(msg) ? msg.join(', ') : String(msg);
    }
    return fallback;
  }
}
