import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import {
  CustomerDuplicateMatch,
  CustomerDuplicateMatchReason,
} from '../../models/customer-group.model';
import { DUPLICATE_MATCH_REASON_LABELS } from '../../utils/customer-registration.util';

export interface CustomerDuplicateWarningDialogData {
  matches: CustomerDuplicateMatch[];
}

export type CustomerDuplicateWarningResult = { action: 'continue' };

@Component({
  selector: 'app-customer-duplicate-warning-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  templateUrl: './customer-duplicate-warning-dialog.component.html',
  styleUrl: './customer-duplicate-warning-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CustomerDuplicateWarningDialogComponent {
  readonly X = X;
  readonly matches: CustomerDuplicateMatch[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: CustomerDuplicateWarningDialogData,
    private dialogRef: MatDialogRef<
      CustomerDuplicateWarningDialogComponent,
      CustomerDuplicateWarningResult
    >,
    private router: Router
  ) {
    this.matches = data.matches ?? [];
  }

  get bodyText(): string {
    return this.matches.length > 1
      ? 'Encontramos clientes con datos similares. Revisa si ya existe antes de crear uno nuevo.'
      : 'Hay un cliente que parece familiar. Revisa si ya existe antes de crear uno nuevo.';
  }

  displayName(match: CustomerDuplicateMatch): string {
    return [match.name, match.lastname]
      .map((part) => (part ?? '').trim())
      .filter(Boolean)
      .join(' ');
  }

  reasonLabels(reasons: CustomerDuplicateMatchReason[]): string[] {
    return (reasons ?? [])
      .map((reason) => DUPLICATE_MATCH_REASON_LABELS[reason])
      .filter(Boolean);
  }

  secondaryLine(match: CustomerDuplicateMatch): string {
    const phone = [match.phone_code, match.phone]
      .map((part) => (part ?? '').trim())
      .filter(Boolean)
      .join(' ');
    const rfc = (match.fiscal_rfc ?? '').trim();
    return [(match.email ?? '').trim(), phone, rfc ? `RFC ${rfc}` : '']
      .filter(Boolean)
      .join(' · ');
  }

  continueAnyway(): void {
    this.dialogRef.close({ action: 'continue' });
  }

  viewMatch(match: CustomerDuplicateMatch, event?: Event): void {
    event?.stopPropagation();
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/customers/detail', match.id])
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
