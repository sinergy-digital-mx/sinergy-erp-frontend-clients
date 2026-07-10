import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CancelSalesOrderInvoicePayload,
  CFDI_CANCEL_MOTIVO_OPTIONS,
  SalesOrderElectronicInvoice,
} from '../../models/sales-order-electronic-invoice.model';

export interface SalesOrderInvoiceCancelDialogData {
  invoice: SalesOrderElectronicInvoice;
}

export interface SalesOrderInvoiceCancelDialogResult {
  payload: CancelSalesOrderInvoicePayload;
}

@Component({
  selector: 'app-sales-order-invoice-cancel-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-order-invoice-cancel-dialog.component.html',
  styleUrl: './sales-order-invoice-cancel-dialog.component.scss',
})
export class SalesOrderInvoiceCancelDialogComponent {
  form: FormGroup;
  readonly motivoOptions = CFDI_CANCEL_MOTIVO_OPTIONS;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesOrderInvoiceCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderInvoiceCancelDialogData
  ) {
    this.form = this.fb.group({
      motivo: ['02', Validators.required],
      folio_sustitucion: [''],
    });
  }

  get requiresSubstitution(): boolean {
    return this.form.get('motivo')?.value === '01';
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) return;

    const value = this.form.value;
    const payload: CancelSalesOrderInvoicePayload = {
      motivo: value.motivo,
      folio_sustitucion: value.motivo === '01' ? value.folio_sustitucion?.trim() : undefined,
    };

    if (payload.motivo === '01' && !payload.folio_sustitucion) {
      this.form.get('folio_sustitucion')?.setErrors({ required: true });
      return;
    }

    this.dialogRef.close({ payload } satisfies SalesOrderInvoiceCancelDialogResult);
  }
}
