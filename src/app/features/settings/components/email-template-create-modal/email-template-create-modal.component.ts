import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EmailTemplateService } from '../../services/email-template.service';
import {
  CreateEmailTemplateDto,
  CustomEmailTemplateVariable,
  EmailTemplate,
  EmailTemplateVariable,
  EmailTemplateVariableGroup
} from '../../models/email-template.model';
import { InterceptorService } from '../../../../core/services/interceptor.service';

@Component({
  selector: 'app-email-template-create-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './email-template-create-modal.component.html',
  styleUrls: ['./email-template-create-modal.component.scss']
})
export class EmailTemplateCreateModalComponent implements OnInit {
  @ViewChild('subjectInput') subjectInput?: ElementRef<HTMLInputElement>;
  @ViewChild('bodyHtmlTextarea') bodyHtmlTextarea?: ElementRef<HTMLTextAreaElement>;

  form: FormGroup;
  loading = false;
  previewLoading = false;
  variablesLoading = false;
  isEdit = false;
  activeTab: 'editor' | 'preview' = 'editor';
  insertionTarget: 'subject' | 'bodyHtml' = 'bodyHtml';
  selectedVariableKey = '';
  subjectPlaceholder = 'Ej: Recordatorio de pago - {{contract.contract_number}}';
  bodyPlaceholder = '<p>Hola {{customer.name}},</p><p>Tu pago pendiente es {{payment.amount_pending}}</p>';
  availableVariableGroups: EmailTemplateVariableGroup[] = [];
  previewSubject = '';
  previewBodyHtml = '';
  missingVariables: string[] = [];

  constructor(
    private fb: FormBuilder,
    private emailTemplateService: EmailTemplateService,
    private interceptorService: InterceptorService,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<EmailTemplateCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { template?: EmailTemplate }
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      bodyHtml: ['', [Validators.required, Validators.minLength(10)]],
      customVariablesJson: [''],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.loadAvailableVariables();

    if (this.data?.template) {
      const customVariables = this.data.template.custom_variables ?? this.data.template.customVariables ?? [];

      this.isEdit = true;
      this.form.patchValue({
        name: this.data.template.name,
        subject: this.data.template.subject,
        bodyHtml: this.getTemplateBody(this.data.template),
        customVariablesJson: customVariables.length ? JSON.stringify(customVariables, null, 2) : '',
        isActive: this.data.template.is_active
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: 'error',
        title: 'Error',
        message: 'Por favor completa todos los campos requeridos'
      });
      return;
    }

    this.loading = true;
    const payload = this.buildPayload();

    if (!payload) {
      this.loading = false;
      return;
    }

    if (this.isEdit && this.data?.template) {
      this.emailTemplateService.updateEmailTemplate(this.data.template.id, payload).subscribe({
        next: (result) => {
          this.loading = false;
          this.interceptorService.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: 'Template actualizado correctamente'
          });
          this.dialogRef.close(result);
        },
        error: (err) => {
          this.loading = false;
          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Error',
            message: err.error?.message || 'Error al actualizar template'
          });
        }
      });
    } else {
      this.emailTemplateService.createEmailTemplate(payload).subscribe({
        next: (result) => {
          this.loading = false;
          this.interceptorService.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: 'Template creado correctamente'
          });
          this.dialogRef.close(result);
        },
        error: (err) => {
          this.loading = false;
          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Error',
            message: err.error?.message || 'Error al crear template'
          });
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  setActiveTab(tab: 'editor' | 'preview') {
    this.activeTab = tab;

    if (tab === 'preview') {
      this.previewTemplate();
    }
  }

  loadAvailableVariables() {
    this.variablesLoading = true;

    this.emailTemplateService.getAvailableVariables().subscribe({
      next: (groups) => {
        this.availableVariableGroups = groups ?? [];
        this.variablesLoading = false;
      },
      error: (err) => {
        console.error('Error loading email template variables:', err);
        this.variablesLoading = false;
      }
    });
  }

  insertSelectedVariable() {
    if (!this.selectedVariableKey) {
      return;
    }

    this.insertVariable(this.selectedVariableKey);
  }

  insertVariable(variableKey: string, target: 'subject' | 'bodyHtml' = this.insertionTarget) {
    const token = `{{${variableKey}}}`;
    const element = target === 'subject' ? this.subjectInput?.nativeElement : this.bodyHtmlTextarea?.nativeElement;
    const currentValue = this.form.get(target)?.value ?? '';
    const start = element?.selectionStart ?? currentValue.length;
    const end = element?.selectionEnd ?? currentValue.length;
    const nextValue = `${currentValue.slice(0, start)}${token}${currentValue.slice(end)}`;

    this.form.get(target)?.setValue(nextValue);
    this.form.get(target)?.markAsDirty();
    this.form.get(target)?.markAsTouched();

    setTimeout(() => {
      element?.focus();
      element?.setSelectionRange(start + token.length, start + token.length);
    });
  }

  previewTemplate() {
    if (!this.form.get('subject')?.value || !this.form.get('bodyHtml')?.value) {
      return;
    }

    this.previewLoading = true;
    this.emailTemplateService.previewEmailTemplate({
      subject: this.form.get('subject')?.value,
      bodyHtml: this.form.get('bodyHtml')?.value,
      variables: this.buildSampleVariables()
    }).subscribe({
      next: (preview) => {
        this.previewSubject = preview.subject;
        this.previewBodyHtml = preview.bodyHtml;
        this.missingVariables = preview.missingVariables ?? [];
        this.previewLoading = false;
      },
      error: (err) => {
        console.error('Error previewing email template:', err);
        this.previewBodyHtml = this.form.get('bodyHtml')?.value ?? '';
        this.missingVariables = this.extractVariablesFromContent();
        this.previewLoading = false;
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al generar preview'
        });
      }
    });
  }

  getPreviewHTML(): SafeHtml {
    const bodyValue = this.previewBodyHtml || this.form.get('bodyHtml')?.value || '';
    return this.sanitizer.bypassSecurityTrustHtml(bodyValue);
  }

  getAllVariables(): EmailTemplateVariable[] {
    return this.availableVariableGroups.flatMap(group => group.variables);
  }

  formatVariableToken(variableKey: string): string {
    return `{{${variableKey}}}`;
  }

  getExtractedVariables(): string[] {
    return this.extractVariablesFromContent();
  }

  private buildPayload(): CreateEmailTemplateDto | null {
    const formValue = this.form.value;
    const customVariables = this.parseCustomVariables();

    if (customVariables === null) {
      return null;
    }

    return {
      name: formValue.name,
      subject: formValue.subject,
      bodyHtml: formValue.bodyHtml,
      variables: this.extractVariablesFromContent(),
      customVariables,
      isActive: formValue.isActive
    };
  }

  private parseCustomVariables(): CustomEmailTemplateVariable[] | null {
    const rawValue = this.form.get('customVariablesJson')?.value?.trim();

    if (!rawValue) {
      return [];
    }

    try {
      const parsed = JSON.parse(rawValue);

      if (!Array.isArray(parsed)) {
        throw new Error('Custom variables must be an array');
      }

      return parsed;
    } catch {
      this.interceptorService.openSnackbar({
        type: 'error',
        title: 'Error',
        message: 'Las variables personalizadas deben ser un arreglo JSON válido'
      });
      return null;
    }
  }

  private extractVariablesFromContent(): string[] {
    const content = `${this.form.get('subject')?.value ?? ''} ${this.form.get('bodyHtml')?.value ?? ''}`;
    const matches = content.match(/\{\{\s*([\w.]+)\s*\}\}/g) ?? [];
    const variables = matches.map(match => match.replace(/[{}]/g, '').trim());

    return Array.from(new Set(variables));
  }

  private buildSampleVariables(): Record<string, unknown> {
    const sampleVariables: Record<string, unknown> = {};
    const availableVariables = new Map(this.getAllVariables().map(variable => [variable.key, variable]));

    this.extractVariablesFromContent().forEach((key) => {
      const variable = availableVariables.get(key);
      this.assignNestedValue(sampleVariables, key, this.getSampleValue(variable));
    });

    this.parseCustomVariables()?.forEach((variable) => {
      this.assignNestedValue(sampleVariables, variable.key, variable.defaultValue || this.getSampleValue(variable));
    });

    return sampleVariables;
  }

  private assignNestedValue(target: Record<string, unknown>, key: string, value: unknown) {
    const parts = key.split('.');
    let current: Record<string, unknown> = target;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = value;
        return;
      }

      if (!current[part] || typeof current[part] !== 'object') {
        current[part] = {};
      }

      current = current[part] as Record<string, unknown>;
    });
  }

  private getSampleValue(variable?: Pick<EmailTemplateVariable | CustomEmailTemplateVariable, 'label' | 'type'>): string {
    switch (variable?.type) {
      case 'currency':
        return '$1,250.00';
      case 'number':
        return '123';
      case 'date':
        return '2026-05-19';
      case 'boolean':
        return 'Sí';
      default:
        return variable?.label ? `Ejemplo ${variable.label}` : 'Ejemplo';
    }
  }

  private getTemplateBody(template: EmailTemplate): string {
    return template.body_html ?? template.bodyHtml ?? template.body ?? '';
  }
}
