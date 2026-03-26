import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EmailTemplateService } from '../../services/email-template.service';
import { EmailTemplate, CreateEmailTemplateDto } from '../../models/email-template.model';
import { InterceptorService } from '../../../../core/services/interceptor.service';

@Component({
  selector: 'app-email-template-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './email-template-create-modal.component.html',
  styleUrls: ['./email-template-create-modal.component.scss']
})
export class EmailTemplateCreateModalComponent implements OnInit {
  form: FormGroup;
  loading = false;
  isEdit = false;
  activeTab: 'editor' | 'preview' = 'editor';

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
      body: ['', [Validators.required, Validators.minLength(10)]],
      description: [''],
      variables: [''],
      is_active: [true]
    });
  }

  ngOnInit() {
    if (this.data?.template) {
      this.isEdit = true;
      this.form.patchValue({
        name: this.data.template.name,
        subject: this.data.template.subject,
        body: this.data.template.body,
        description: this.data.template.description,
        variables: this.data.template.variables?.join(', ') || '',
        is_active: this.data.template.is_active
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
    const formValue = this.form.value;
    const variables = formValue.variables
      ? formValue.variables.split(',').map((v: string) => v.trim()).filter((v: string) => v)
      : [];

    const payload: CreateEmailTemplateDto = {
      name: formValue.name,
      subject: formValue.subject,
      body: formValue.body,
      description: formValue.description,
      variables: variables,
      is_active: formValue.is_active
    };

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

  getPreviewHTML(): SafeHtml {
    const bodyValue = this.form.get('body')?.value || '';
    return this.sanitizer.bypassSecurityTrustHtml(bodyValue);
  }
}
