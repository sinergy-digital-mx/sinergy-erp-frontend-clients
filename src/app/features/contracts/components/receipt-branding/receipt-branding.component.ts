import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { PaymentReceiptTemplate, PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-receipt-branding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './receipt-branding.component.html',
  styleUrl: './receipt-branding.component.scss',
})
export class ReceiptBrandingComponent implements OnInit {
  @Input() contractId = '';
  @Input() embedded = false;
  @Output() saved = new EventEmitter<void>();

  template = signal<PaymentReceiptTemplate | null>(null);
  loading = signal(true);
  saving = false;
  uploading = false;
  fiscalConfigurationId = '';
  private ready = false;
  private lastSaved = '';

  constructor(
    private paymentService: PaymentService,
    private interceptorService: InterceptorService,
    @Optional() public dialogRef: MatDialogRef<ReceiptBrandingComponent> | null,
    @Optional() @Inject(MAT_DIALOG_DATA) data?: { contractId: string },
  ) {
    if (data?.contractId) this.contractId = data.contractId;
  }

  ngOnInit(): void {
    this.paymentService.getReceiptTemplate(this.contractId).subscribe({
      next: (template) => {
        this.apply(template);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo cargar la razón social del recibo',
        });
      },
    });
  }

  get previewFiscal() {
    const current = this.template();
    const id = this.fiscalConfigurationId || current?.effective_fiscal_configuration_id || '';
    return current?.fiscal_configurations.find((item) => item.id === id) || null;
  }

  get uploadTargetId(): string {
    return this.fiscalConfigurationId || this.previewFiscal?.id || '';
  }

  saveSelection(): void {
    if (!this.ready || this.fiscalConfigurationId === this.lastSaved) return;
    this.saving = true;
    this.paymentService
      .updateReceiptTemplate(this.contractId, { fiscal_configuration_id: this.fiscalConfigurationId || null })
      .subscribe({
        next: (template) => {
          this.apply(template);
          this.saving = false;
          this.saved.emit();
        },
        error: (err) => {
          this.saving = false;
          this.fiscalConfigurationId = this.lastSaved;
          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Error',
            message: err.error?.message || 'No se pudo guardar la razón social',
          });
        },
      });
  }

  onFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const fiscalId = this.uploadTargetId;
    input.value = '';
    if (!file || !fiscalId || this.uploading) return;
    this.uploading = true;
    this.paymentService.uploadReceiptLogo(this.contractId, fiscalId, file).subscribe({
      next: (template) => {
        this.apply(template);
        this.uploading = false;
        this.saved.emit();
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Logo',
          message: 'El logo quedó en el recibo de enganches y de pagos',
        });
      },
      error: (err) => {
        this.uploading = false;
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo subir el logo',
        });
      },
    });
  }

  close(): void {
    this.dialogRef?.close();
  }

  private apply(template: PaymentReceiptTemplate): void {
    this.ready = false;
    this.template.set(template);
    const selected = template.fiscal_configuration_id || '';
    const exists = template.fiscal_configurations.some((item) => item.id === selected);
    this.fiscalConfigurationId = exists ? selected : '';
    this.lastSaved = this.fiscalConfigurationId;
    this.ready = true;
  }
}
