import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { GlobalDiscountService } from '../../services/global-discount.service';
import {
  CreateGlobalDiscountDto,
  GlobalDiscount,
  GlobalDiscountType,
  UpdateGlobalDiscountDto,
} from '../../models/global-discount.model';

export interface GlobalDiscountFormDialogData {
  discount?: GlobalDiscount | null;
}

@Component({
  selector: 'app-global-discount-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, LucideAngularModule],
  templateUrl: './global-discount-form-dialog.component.html',
  styleUrl: './global-discount-form-dialog.component.scss',
})
export class GlobalDiscountFormDialogComponent {
  readonly X = X;
  form: FormGroup;
  saving = signal(false);
  isNew = true;

  readonly discountTypeOptions: { value: GlobalDiscountType; label: string }[] = [
    { value: 'percentage', label: 'Porcentaje (%)' },
    { value: 'fixed', label: 'Monto fijo (MXN)' },
  ];

  constructor(
    private fb: FormBuilder,
    private globalDiscountService: GlobalDiscountService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GlobalDiscountFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GlobalDiscountFormDialogData
  ) {
    this.isNew = !data?.discount;
    this.form = this.createForm();
    if (data?.discount) {
      this.patchForm(data.discount);
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const payload = this.buildPayload();

    const request$ = this.isNew
      ? this.globalDiscountService.createGlobalDiscount(payload as CreateGlobalDiscountDto)
      : this.globalDiscountService.updateGlobalDiscount(
          this.data.discount!.id,
          payload as UpdateGlobalDiscountDto
        );

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: this.isNew ? 'Descuento global creado' : 'Descuento global actualizado',
            type: 'success',
          },
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error?.error?.message || 'No se pudo guardar el descuento global',
            type: 'error',
          },
          duration: 5000,
        });
      },
    });
  }

  get discountPreview(): string {
    const type = this.form.get('discount_type')?.value as GlobalDiscountType;
    const value = Number(this.form.get('value')?.value ?? 0);
    const name = String(this.form.get('name')?.value ?? '').trim() || 'Descuento';

    if (!Number.isFinite(value) || value <= 0) {
      return '';
    }

    if (type === 'percentage') {
      return `${name}: -${value}% sobre el subtotal neto de la orden`;
    }

    return `${name}: -$${value.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} sobre el subtotal neto de la orden`;
  }

  private createForm(): FormGroup {
    return this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(120)]],
        discount_type: ['percentage', Validators.required],
        value: [null, [Validators.required, Validators.min(0.01)]],
        is_active: [true],
        valid_from: [null],
        valid_to: [null],
      },
      { validators: [this.dateRangeValidator, this.valueRangeValidator] }
    );
  }

  private patchForm(discount: GlobalDiscount): void {
    this.form.patchValue({
      name: discount.name,
      discount_type: discount.discount_type,
      value: discount.value,
      is_active: discount.is_active !== false,
      valid_from: discount.valid_from ? discount.valid_from.slice(0, 10) : null,
      valid_to: discount.valid_to ? discount.valid_to.slice(0, 10) : null,
    });
  }

  private buildPayload(): CreateGlobalDiscountDto | UpdateGlobalDiscountDto {
    const raw = this.form.getRawValue();
    return {
      name: String(raw.name ?? '').trim(),
      discount_type: raw.discount_type,
      value: Number(raw.value),
      is_active: raw.is_active !== false,
      valid_from: raw.valid_from || null,
      valid_to: raw.valid_to || null,
    };
  }

  private dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const from = group.get('valid_from')?.value;
    const to = group.get('valid_to')?.value;
    if (from && to && from > to) {
      return { invalidDateRange: true };
    }
    return null;
  }

  private valueRangeValidator(group: AbstractControl): ValidationErrors | null {
    const type = group.get('discount_type')?.value as GlobalDiscountType;
    const value = Number(group.get('value')?.value);
    if (!Number.isFinite(value)) {
      return null;
    }
    if (type === 'percentage' && (value <= 0 || value > 100)) {
      return { invalidPercentage: true };
    }
    if (type === 'fixed' && value <= 0) {
      return { invalidFixed: true };
    }
    return null;
  }
}
