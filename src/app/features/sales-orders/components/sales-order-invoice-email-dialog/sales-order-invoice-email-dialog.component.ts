import { Component, Inject, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import {
  InvoiceEmailCompose,
  renderInvoiceEmailTemplate,
  wrapInvoiceEmailExtraMessage,
} from '../../models/sales-order-invoice-email.model';
import { SalesOrderElectronicInvoice } from '../../models/sales-order-electronic-invoice.model';
import { SalesOrderInvoiceService } from '../../services/sales-order-invoice.service';
import { SalesOrderInvoiceEmailTemplateEditorComponent } from '../sales-order-invoice-email-template-editor/sales-order-invoice-email-template-editor.component';
import { EmailHtmlPreviewComponent } from '../email-html-preview/email-html-preview.component';

export interface SalesOrderInvoiceEmailDialogData {
  orderId: string;
  invoiceId: string;
  invoice: SalesOrderElectronicInvoice;
  orderFolio?: string;
}

export interface SalesOrderInvoiceEmailDialogResult {
  sent?: boolean;
  to_email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-sales-order-invoice-email-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, SalesOrderInvoiceEmailTemplateEditorComponent, EmailHtmlPreviewComponent],
  templateUrl: './sales-order-invoice-email-dialog.component.html',
  styleUrl: './sales-order-invoice-email-dialog.component.scss',
})
export class SalesOrderInvoiceEmailDialogComponent implements OnInit {
  private readonly invoiceService = inject(SalesOrderInvoiceService);
  private readonly toast = inject(ToastService);

  view = signal<'compose' | 'template'>('compose');
  loading = signal(true);
  sending = signal(false);
  compose = signal<InvoiceEmailCompose | null>(null);
  toEmail = signal('');
  ccList = signal<string[]>([]);
  ccDraft = signal('');
  subject = signal('');
  message = signal('');

  previewHtml = computed(() => {
    const compose = this.compose();
    if (!compose) return '';
    return renderInvoiceEmailTemplate(compose.body_html, {
      ...compose.values,
      extra_message: wrapInvoiceEmailExtraMessage(this.message()),
    });
  });

  previewSubject = computed(() => {
    const compose = this.compose();
    if (!this.subject().trim() && compose) {
      return renderInvoiceEmailTemplate(compose.subject, compose.values);
    }
    return this.subject();
  });

  canSubmit = computed(() => {
    const compose = this.compose();
    return (
      !!compose?.can_send &&
      EMAIL_RE.test(this.toEmail().trim()) &&
      !!this.previewSubject().trim() &&
      !this.sending()
    );
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderInvoiceEmailDialogData,
    private dialogRef: MatDialogRef<SalesOrderInvoiceEmailDialogComponent, SalesOrderInvoiceEmailDialogResult>,
  ) {}

  ngOnInit(): void {
    this.loadCompose();
  }

  loadCompose(): void {
    this.loading.set(true);
    this.invoiceService.getInvoiceEmailCompose(this.data.orderId, this.data.invoiceId).subscribe({
      next: (compose) => {
        this.compose.set(compose);
        this.toEmail.set(compose.to_email || '');
        this.subject.set(compose.subject || '');
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo preparar el correo'));
      },
    });
  }

  addCc(email = this.ccDraft().trim()): void {
    const value = email.trim();
    if (!value) return;
    if (!EMAIL_RE.test(value)) {
      this.toast.error('El CC no es un correo válido');
      return;
    }
    const exists = this.ccList().some((item) => item.toLowerCase() === value.toLowerCase());
    if (exists || value.toLowerCase() === this.toEmail().trim().toLowerCase()) {
      this.ccDraft.set('');
      return;
    }
    this.ccList.update((list) => [...list, value]);
    this.ccDraft.set('');
  }

  addAdditionalAsCc(): void {
    const extra = this.compose()?.additional_email?.trim();
    if (extra) this.addCc(extra);
  }

  removeCc(email: string): void {
    this.ccList.update((list) => list.filter((item) => item !== email));
  }

  onCcKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addCc();
    }
  }

  onTemplateSaved(): void {
    this.loadCompose();
    this.view.set('compose');
  }

  send(): void {
    if (!this.canSubmit()) return;
    this.sending.set(true);
    this.invoiceService
      .sendInvoiceEmail(this.data.orderId, this.data.invoiceId, {
        to_email: this.toEmail().trim(),
        cc: this.ccList(),
        subject: this.previewSubject().trim(),
        message: this.message().trim() || undefined,
      })
      .subscribe({
        next: (row) => {
          this.sending.set(false);
          this.toast.success(`Factura enviada a ${row.to_email}`);
          this.dialogRef.close({ sent: true, to_email: row.to_email });
        },
        error: (error) => {
          this.sending.set(false);
          this.toast.error(resolveHttpErrorMessage(error, 'No se pudo enviar el correo'), {
            duration: 12000,
          });
        },
      });
  }

  close(): void {
    if (this.sending()) return;
    this.dialogRef.close();
  }

  invoiceLabel(): string {
    const invoice = this.data.invoice;
    const folio = [invoice.series, invoice.folio].filter(Boolean).join('-');
    return folio || invoice.uuid || this.data.orderFolio || 'Factura';
  }
}
