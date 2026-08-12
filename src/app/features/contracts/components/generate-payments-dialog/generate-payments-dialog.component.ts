import { Component, DestroyRef, Inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LocalDatePipe } from '../../../../core/pipes/local-date.pipe';
import { PaymentService } from '../../services/payment.service';
import { Contract } from '../../models/contract.model';
import { PaymentSchedulePreview } from '../../models/payment.model';

export interface GeneratePaymentsDialogData {
  contractId: string;
  contract: Contract | null;
  mode: 'generate' | 'regenerate';
  defaultStartDate?: string | null;
  paymentMonths: number;
  paymentsCount: number;
  currency: string;
}

@Component({
  selector: 'app-generate-payments-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    ButtonComponent,
    LucideAngularModule,
    LocalDatePipe
  ],
  providers: [DatePipe],
  templateUrl: './generate-payments-dialog.component.html',
  styleUrl: './generate-payments-dialog.component.scss'
})
export class GeneratePaymentsDialogComponent {
  readonly X = X;
  readonly days = Array.from({ length: 31 }, (_, i) => i + 1);
  readonly months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];

  form: FormGroup;
  preview = signal<PaymentSchedulePreview | null>(null);
  submitting = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GeneratePaymentsDialogData,
    private dialogRef: MatDialogRef<GeneratePaymentsDialogComponent>,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private interceptorService: InterceptorService,
    private destroyRef: DestroyRef
  ) {
    const parsed = this.parseDateParts(data.defaultStartDate) || this.todayParts();

    this.form = this.fb.group({
      day: [parsed.day, [Validators.required, Validators.min(1), Validators.max(31)]],
      month: [parsed.month, [Validators.required, Validators.min(1), Validators.max(12)]],
      year: [parsed.year, [Validators.required, Validators.min(2000), Validators.max(2100)]]
    });

    this.form.valueChanges.pipe(
      startWith(this.form.value),
      debounceTime(250),
      map(() => this.startDate),
      distinctUntilChanged(),
      switchMap((startDate) => {
        if (!startDate) return of(null);
        return this.paymentService.getSchedulePreview(this.data.contractId, startDate).pipe(
          catchError(() => of(null))
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((preview) => {
      if (preview) this.preview.set(preview);
    });
  }

  get isRegenerate(): boolean {
    return this.data.mode === 'regenerate';
  }

  get title(): string {
    return this.isRegenerate ? 'Regenerar calendario' : 'Generar pagos';
  }

  get submitLabel(): string {
    return this.isRegenerate ? 'Regenerar desde 0' : 'Generar pagos';
  }

  get startDate(): string {
    const { day, month, year } = this.form.value;
    return this.buildStartDate(Number(year), Number(month), Number(day));
  }

  get endDate(): string | null {
    return this.preview()?.end_date || this.localEndDate;
  }

  get paymentMonths(): number {
    return this.preview()?.payment_months || this.data.paymentMonths || 0;
  }

  get monthlyPayment(): number | null {
    const amount = this.preview()?.monthly_payment ?? this.data.contract?.monthly_payment;
    return amount != null ? Number(amount) : null;
  }

  private get localEndDate(): string | null {
    const months = this.data.paymentMonths;
    if (!months || !this.startDate) return null;
    return this.addMonthsToYmd(this.startDate, months - 1);
  }

  submit(): void {
    const startDate = this.startDate;
    if (!startDate || this.form.invalid || this.submitting()) return;

    if (this.isRegenerate) {
      const count = this.data.paymentsCount;
      if (!confirm(`Se borrarán las ${count} cuotas pendientes y se crearán de nuevo con la fecha de inicio indicada.`)) {
        return;
      }
    }

    this.submitting.set(true);
    this.dialogRef.disableClose = true;

    const request$ = this.isRegenerate
      ? this.paymentService.regeneratePayments(this.data.contractId, { start_date: startDate })
      : this.paymentService.generatePayments(this.data.contractId, { start_date: startDate });

    request$.subscribe({
      next: () => {
        this.submitting.set(false);
        this.dialogRef.disableClose = false;
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: this.isRegenerate
            ? 'Calendario regenerado correctamente'
            : 'Pagos generados correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.submitting.set(false);
        this.dialogRef.disableClose = false;
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || (this.isRegenerate ? 'Error al regenerar pagos' : 'Error al generar pagos')
        });
      }
    });
  }

  close(): void {
    if (this.submitting()) return;
    this.dialogRef.close();
  }

  private parseDateParts(value?: string | null): { year: number; month: number; day: number } | null {
    if (!value) return null;
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return null;
    return {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3])
    };
  }

  private todayParts(): { year: number; month: number; day: number } {
    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  }

  private buildStartDate(year: number, month: number, day: number): string {
    if (!year || !month || !day || year < 2000 || year > 2100) return '';
    const lastDay = new Date(year, month, 0).getDate();
    const clampedDay = Math.min(Math.max(day, 1), lastDay);
    return `${year}-${this.pad(month)}-${this.pad(clampedDay)}`;
  }

  private addMonthsToYmd(startDate: string, monthsToAdd: number): string {
    const parsed = this.parseDateParts(startDate);
    if (!parsed) return '';
    const target = new Date(parsed.year, parsed.month - 1 + monthsToAdd, 1);
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    target.setDate(Math.min(parsed.day, lastDay));
    return this.buildStartDate(target.getFullYear(), target.getMonth() + 1, target.getDate());
  }

  private pad(value: number): string {
    return String(value).padStart(2, '0');
  }
}
