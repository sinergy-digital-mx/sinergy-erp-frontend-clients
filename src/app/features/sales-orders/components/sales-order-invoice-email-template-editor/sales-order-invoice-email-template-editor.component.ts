import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import {
  InvoiceEmailTemplate,
  InvoiceEmailVariable,
  renderInvoiceEmailTemplate,
} from '../../models/sales-order-invoice-email.model';
import { SalesOrderInvoiceService } from '../../services/sales-order-invoice.service';
import { EmailHtmlPreviewComponent } from '../email-html-preview/email-html-preview.component';

@Component({
  selector: 'app-sales-order-invoice-email-template-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, EmailHtmlPreviewComponent],
  templateUrl: './sales-order-invoice-email-template-editor.component.html',
  styleUrl: './sales-order-invoice-email-template-editor.component.scss',
})
export class SalesOrderInvoiceEmailTemplateEditorComponent implements OnInit {
  @Input() compact = false;
  @Output() saved = new EventEmitter<InvoiceEmailTemplate>();

  private readonly invoiceService = inject(SalesOrderInvoiceService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  saving = signal(false);
  resetting = signal(false);
  subject = signal('');
  bodyHtml = signal('');
  variables = signal<InvoiceEmailVariable[]>([]);
  sampleValues = signal<Record<string, string>>({});
  updatedAt = signal<string | null>(null);
  updatedBy = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.invoiceService.getInvoiceEmailTemplate().subscribe({
      next: (template) => {
        this.applyTemplate(template);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo cargar la plantilla'));
      },
    });
  }

  previewHtml(): string {
    return renderInvoiceEmailTemplate(this.bodyHtml(), {
      ...this.sampleValues(),
      extra_message: this.sampleValues()['extra_message'] || '',
    });
  }

  previewSubject(): string {
    return renderInvoiceEmailTemplate(this.subject(), this.sampleValues());
  }

  insertVariable(variable: InvoiceEmailVariable): void {
    const token = `{{${variable.key}}}`;
    this.bodyHtml.update((html) => `${html}${html.endsWith('\n') ? '' : '\n'}${token}`);
  }

  save(): void {
    if (this.saving()) return;
    const subject = this.subject().trim();
    const body = this.bodyHtml().trim();
    if (subject.length < 3 || body.length < 20) {
      this.toast.error('El asunto y el HTML de la plantilla son obligatorios');
      return;
    }
    this.saving.set(true);
    this.invoiceService
      .updateInvoiceEmailTemplate({ subject, body_html: this.bodyHtml() })
      .subscribe({
        next: (template) => {
          this.saving.set(false);
          this.applyTemplate(template);
          this.saved.emit(template);
          this.toast.success('Plantilla de correo actualizada');
        },
        error: (error) => {
          this.saving.set(false);
          this.toast.error(resolveHttpErrorMessage(error, 'No se pudo guardar la plantilla'));
        },
      });
  }

  resetDefault(): void {
    if (this.resetting()) return;
    this.resetting.set(true);
    this.invoiceService.updateInvoiceEmailTemplate({ reset_default: true }).subscribe({
      next: (template) => {
        this.resetting.set(false);
        this.applyTemplate(template);
        this.saved.emit(template);
        this.toast.success('Se restauró la plantilla predeterminada');
      },
      error: (error) => {
        this.resetting.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo restaurar la plantilla'));
      },
    });
  }

  private applyTemplate(template: InvoiceEmailTemplate): void {
    this.subject.set(template.subject || '');
    this.bodyHtml.set(template.body_html || '');
    this.variables.set(template.variables || []);
    this.sampleValues.set(template.sample_values || {});
    this.updatedAt.set(template.updated_at ?? null);
    this.updatedBy.set(template.updated_by?.display_name ?? null);
  }
}
