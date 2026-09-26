import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface QuotationConvertDialogData {
  branchName: string;
  openShift: { id: string; shift_date: string } | null;
}

export type QuotationConvertDialogResult = 'send' | 'skip';

@Component({
  selector: 'app-quotation-convert-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './quotation-convert-dialog.component.html',
  styleUrl: './quotation-convert-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class QuotationConvertDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QuotationConvertDialogData,
    private dialogRef: MatDialogRef<
      QuotationConvertDialogComponent,
      QuotationConvertDialogResult | undefined
    >,
  ) {}

  get hasShift(): boolean {
    return !!this.data.openShift;
  }

  get shiftLabel(): string {
    const raw = this.data.openShift?.shift_date ?? '';
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw);
    if (!match) return raw;
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const month = months[Number(match[2]) - 1] ?? match[2];
    return `${Number(match[3])} ${month} ${match[1]}`;
  }

  close(result?: QuotationConvertDialogResult): void {
    this.dialogRef.close(result);
  }
}
