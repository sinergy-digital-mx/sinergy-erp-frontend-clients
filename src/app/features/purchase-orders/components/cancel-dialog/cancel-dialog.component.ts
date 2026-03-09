import { Component, ElementRef, signal, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';

@Component({
  selector: 'app-cancel-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ButtonComponent
  ],
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.scss']
})
export class CancelDialogComponent implements AfterViewInit {
  readonly X = X;
  loading = signal(false);
  
  @ViewChild('reasonTextarea') reasonTextarea!: ElementRef<HTMLTextAreaElement>;
  
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CancelDialogComponent>
  ) {
    // Initialize form with validation
    this.form = this.fb.group({
      cancellation_reason: [
        '',
        [Validators.required]
      ]
    });
  }

  ngAfterViewInit(): void {
    // Focus the textarea when dialog opens for accessibility
    setTimeout(() => {
      this.reasonTextarea?.nativeElement.focus();
    }, 100);
  }

  /**
   * Close dialog without saving
   */
  closeDialog(): void {
    if (!this.loading()) {
      this.dialogRef.close(null);
    }
  }

  /**
   * Submit cancellation form
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const cancellationReason = this.form.value.cancellation_reason.trim();
    this.dialogRef.close(cancellationReason);
  }

  /**
   * Get validation error message for cancellation_reason field
   */
  getReasonError(): string | null {
    const control = this.form.get('cancellation_reason');
    
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    if (control.errors['required']) {
      return 'La razón de cancelación es requerida';
    }

    return 'Razón inválida';
  }
}
