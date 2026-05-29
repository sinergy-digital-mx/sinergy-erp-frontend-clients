import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { EmailTemplate } from '../../../settings/models/email-template.model';
import { EmailTemplateService } from '../../../settings/services/email-template.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-send-payment-email-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send-payment-email-modal.component.html',
  styleUrls: ['./send-payment-email-modal.component.scss']
})
export class SendPaymentEmailModalComponent implements OnInit {
  form: FormGroup;
  templates: EmailTemplate[] = [];
  loadingTemplates = false;
  sending = false;

  constructor(
    private fb: FormBuilder,
    private emailTemplateService: EmailTemplateService,
    private interceptorService: InterceptorService,
    public dialogRef: MatDialogRef<SendPaymentEmailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payment: Payment }
  ) {
    this.form = this.fb.group({
      templateId: ['', Validators.required],
      toEmail: ['', Validators.email],
      cc: [''],
      bcc: ['']
    });
  }

  ngOnInit() {
    this.loadTemplates();
  }

  loadTemplates() {
    this.loadingTemplates = true;
    this.emailTemplateService.getEmailTemplates({ isActive: true }).subscribe({
      next: (res) => {
        this.templates = res?.data ?? [];
        this.loadingTemplates = false;
      },
      error: (err) => {
        this.loadingTemplates = false;
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudieron cargar los templates activos'
        });
      }
    });
  }

  send() {
    if (this.sending) {
      return;
    }

    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: 'error',
        title: 'Error',
        message: 'Selecciona un template válido'
      });
      return;
    }

    const formValue = this.form.value;
    this.sending = true;

    this.emailTemplateService.sendEmailTemplate(formValue.templateId, {
      context: {
        entity: 'payment',
        id: this.data.payment.id
      },
      ...(formValue.toEmail?.trim() && { toEmail: formValue.toEmail.trim() }),
      ...this.buildEmailArrayPayload('cc', formValue.cc),
      ...this.buildEmailArrayPayload('bcc', formValue.bcc)
    }).pipe(
      finalize(() => {
        this.sending = false;
      })
    ).subscribe({
      next: (response) => {
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: `Correo enviado a ${response.toEmail}`
        });
        this.dialogRef.close(response);
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo enviar el correo'
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  get selectedTemplate(): EmailTemplate | undefined {
    const templateId = this.form.get('templateId')?.value;
    return this.templates.find(template => template.id === templateId);
  }

  private buildEmailArrayPayload(key: 'cc' | 'bcc', rawValue: string) {
    const emails = this.parseEmailList(rawValue);
    return emails.length ? { [key]: emails } : {};
  }

  private parseEmailList(rawValue: string): string[] {
    return (rawValue || '')
      .split(',')
      .map(email => email.trim())
      .filter(Boolean);
  }
}
