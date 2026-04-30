import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { SETTINGS_PERMISSIONS } from '../../config/permissions.config';
import { AuthService } from '../../../../core/services/auth.service';
import {
  DailyExchangeRate,
  ExchangeRateService
} from '../../../../core/services/exchange-rate.service';

@Component({
  selector: 'app-exchange-rate-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exchange-rate-settings.component.html',
  styleUrl: './exchange-rate-settings.component.scss'
})
export class ExchangeRateSettingsComponent implements OnInit {
  readonly canRead: boolean;
  readonly canUpdate: boolean;

  loadingCurrent = false;
  loadingHistory = false;
  saving = false;

  form!: ReturnType<ExchangeRateSettingsComponent['createForm']>;

  todaysRate: DailyExchangeRate | null = null;
  history: DailyExchangeRate[] = [];
  statusMessage = '';
  errorMessage = '';
  todayLoadError = '';
  historyLoadError = '';

  constructor(
    private exchangeRateService: ExchangeRateService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.createForm();

    this.canRead =
      this.authService.hasPermission(SETTINGS_PERMISSIONS.exchangeRate.viewMenu) ||
      this.authService.hasPermission(SETTINGS_PERMISSIONS.exchangeRate.view) ||
      this.authService.hasPermission(SETTINGS_PERMISSIONS.exchangeRate.update);
    this.canUpdate = this.authService.hasPermission(SETTINGS_PERMISSIONS.exchangeRate.update);
  }

  ngOnInit(): void {
    if (this.canRead) {
      this.loadTodayRate();
      this.loadHistory();
    }
  }

  saveDailyRate(): void {
    if (!this.canUpdate || this.form.invalid) {
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.statusMessage = '';
    const formValue = this.form.getRawValue();

    this.exchangeRateService.upsertDailyExchangeRate({
      rate_date: formValue.rate_date || undefined,
      exchange_rate: Number(formValue.exchange_rate),
      notes: formValue.notes?.trim() || undefined
    }).pipe(
      finalize(() => {
        this.safeUpdate(() => {
          this.saving = false;
        });
      })
    ).subscribe({
      next: (saved) => {
        this.safeUpdate(() => {
          this.todaysRate = saved;
          this.statusMessage = 'Tipo de cambio guardado correctamente.';
          this.applyRateToForm(saved);
          this.loadHistory();
        });
      },
      error: (error) => {
        this.safeUpdate(() => {
          this.errorMessage = error?.error?.message || 'No se pudo guardar el tipo de cambio.';
        });
      }
    });
  }

  trackByRateDate(_: number, item: DailyExchangeRate): string {
    return item.rate_date;
  }

  private loadTodayRate(): void {
    this.loadingCurrent = true;
    this.todayLoadError = '';
    this.exchangeRateService.getDailyExchangeRate().pipe(
      timeout(12000),
      catchError((error) => {
        this.safeUpdate(() => {
          this.todayLoadError = error?.error?.message || 'No se pudo consultar el tipo de cambio de hoy.';
        });
        return of(null);
      })
    ).subscribe((rate) => {
      this.safeUpdate(() => {
        this.loadingCurrent = false;

        if (!rate || !Number.isFinite(rate.exchange_rate)) {
          this.todaysRate = null;
          return;
        }

        this.todaysRate = rate;
        this.applyRateToForm(rate);
      });
    });
  }

  private loadHistory(): void {
    this.loadingHistory = true;
    this.historyLoadError = '';
    this.exchangeRateService.getExchangeRateHistory({ page: 1, limit: 20 }).pipe(
      timeout(12000),
      catchError((error) => {
        this.safeUpdate(() => {
          this.historyLoadError = error?.error?.message || 'No se pudo cargar el historial.';
        });
        return of({ data: [] as DailyExchangeRate[] });
      })
    ).subscribe((response) => {
      this.safeUpdate(() => {
        this.loadingHistory = false;
        this.history = Array.isArray(response.data) ? response.data : [];
      });
    });
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private createForm() {
    return this.fb.group({
      rate_date: [this.getTodayDate(), Validators.required],
      exchange_rate: [17.0000, [Validators.required, Validators.min(0.0001)]],
      notes: ['']
    });
  }

  private applyRateToForm(rate: DailyExchangeRate): void {
    this.form.patchValue({
      exchange_rate: rate.exchange_rate,
      rate_date: rate.rate_date || this.form.controls.rate_date.value,
      notes: rate.notes || ''
    });
  }

  private safeUpdate(updateFn: () => void): void {
    setTimeout(() => {
      updateFn();
      this.cdr.detectChanges();
    }, 0);
  }
}
