import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { VendorMatchReason, VendorSimilarMatch } from '../../models/vendor.model';
import { VENDOR_MATCH_REASON_LABELS } from '../../utils/vendor-profile.util';

export interface VendorDuplicateWarningDialogData {
  matches: VendorSimilarMatch[];
}

export type VendorDuplicateWarningResult =
  | { action: 'continue' }
  | { action: 'view'; vendorId: string };

@Component({
  selector: 'app-vendor-duplicate-warning-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  templateUrl: './vendor-duplicate-warning-dialog.component.html',
  styleUrl: './vendor-duplicate-warning-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class VendorDuplicateWarningDialogComponent {
  readonly X = X;
  readonly matches: VendorSimilarMatch[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: VendorDuplicateWarningDialogData,
    private dialogRef: MatDialogRef<
      VendorDuplicateWarningDialogComponent,
      VendorDuplicateWarningResult
    >,
  ) {
    this.matches = data.matches ?? [];
  }

  get bodyText(): string {
    return this.matches.length > 1
      ? 'Encontramos proveedores con datos similares. Revisa si ya existe antes de crear uno nuevo.'
      : 'Hay un proveedor que parece familiar. Revisa si ya existe antes de crear uno nuevo.';
  }

  reasonLabels(reasons: VendorMatchReason[]): string[] {
    return (reasons ?? []).map((reason) => VENDOR_MATCH_REASON_LABELS[reason]).filter(Boolean);
  }

  secondaryLine(match: VendorSimilarMatch): string {
    const rfc = (match.rfc ?? '').trim();
    const taxId = (match.tax_id ?? '').trim();
    return [(match.company_name ?? '').trim(), rfc ? `RFC ${rfc}` : '', taxId ? `ID ${taxId}` : '']
      .filter(Boolean)
      .join(' · ');
  }

  continueAnyway(): void {
    this.dialogRef.close({ action: 'continue' });
  }

  viewMatch(match: VendorSimilarMatch, event?: Event): void {
    event?.stopPropagation();
    this.dialogRef.close({ action: 'view', vendorId: match.id });
  }
}
