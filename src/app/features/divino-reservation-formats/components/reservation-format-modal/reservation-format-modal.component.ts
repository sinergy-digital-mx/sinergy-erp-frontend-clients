import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Wand2, X } from 'lucide-angular';
import { environment } from '../../../../../environments/environment';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { ISelect, SelectComponent } from '../../../../core/components/select/select.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { PropertyService } from '../../../properties/services/property.service';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { DivinoReservationFormatService } from '../../services/divino-reservation-format.service';
import {
  CreateDivinoReservationFormatDto,
  DIVINO_LEAD_SOURCE_OPTIONS,
  DivinoReservationFormat,
} from '../../models/divino-reservation-format.model';

@Component({
  selector: 'app-reservation-format-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent, SelectComponent, LucideAngularModule],
  templateUrl: './reservation-format-modal.component.html',
  styleUrls: ['./reservation-format-modal.component.scss'],
})
export class ReservationFormatModalComponent implements OnInit {
  readonly X = X;
  readonly Wand2 = Wand2;
  /** Solo se muestra el botón de prellenado en entornos no productivos (localhost). */
  readonly showPrefill = !environment.production;
  form: FormGroup;
  loading = signal(false);

  propertySelectConfig: ISelect = {
    placeholder: 'Selecciona un lote',
    data: [],
    value: 'id',
    option: 'displayName',
    form_control: null,
    loading: true,
    all: false,
  };

  fiscalSelectConfig: ISelect = {
    placeholder: 'Valdetierra SA de CV (por defecto)',
    data: [],
    value: 'id',
    option: 'razon_social',
    form_control: null,
    loading: true,
    all: true,
    all_message: 'Valdetierra SA de CV (por defecto)',
  };

  currencySelectConfig: ISelect = {
    placeholder: 'Selecciona una moneda',
    data: [
      { value: 'MXN', label: 'MXN - Peso Mexicano' },
      { value: 'USD', label: 'USD - Dólar' },
    ],
    value: 'value',
    option: 'label',
    form_control: null,
    all: false,
  };

  maintenanceCurrencySelectConfig: ISelect = {
    placeholder: 'Selecciona una moneda',
    data: [
      { value: 'USD', label: 'USD - Dólar' },
      { value: 'MXN', label: 'MXN - Peso Mexicano' },
    ],
    value: 'value',
    option: 'label',
    form_control: null,
    all: false,
  };

  paymentDaySelectConfig: ISelect = {
    placeholder: 'Selecciona el día',
    data: [
      { value: '1', label: 'Día 1 del mes' },
      { value: '15', label: 'Día 15 del mes' },
    ],
    value: 'value',
    option: 'label',
    form_control: null,
    all: false,
  };

  leadSourceSelectConfig: ISelect = {
    placeholder: 'Selecciona el origen',
    data: DIVINO_LEAD_SOURCE_OPTIONS,
    value: 'value',
    option: 'label',
    form_control: null,
    all: false,
  };

  get isEdit(): boolean {
    return !!this.data?.format?.id;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReservationFormatModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { format: DivinoReservationFormat | null },
    private service: DivinoReservationFormatService,
    private propertyService: PropertyService,
    private fiscalService: FiscalConfigurationService,
    private interceptor: InterceptorService,
  ) {
    this.form = this.fb.group({
      property_id: [null, [Validators.required]],
      fiscal_configuration_id: [null],
      payable_to: [''],

      received_from: [''],
      amount_in_words: [''],
      evidenced_by: [''],

      purchase_price: [null, [Validators.min(0)]],
      currency: ['MXN'],

      reservation_deposit: [null, [Validators.min(0)]],
      reservation_date: [''],
      down_payment: [null, [Validators.min(0)]],
      down_payment_date: [''],
      financed_balance: [null, [Validators.min(0)]],
      financing_years: [null, [Validators.min(0)]],
      monthly_payments_count: [null, [Validators.min(0)]],
      monthly_payment_amount: [null, [Validators.min(0)]],
      maintenance_fee: [50, [Validators.min(0)]],
      maintenance_currency: ['USD'],
      payment_day: [null],

      buyer_name: [''],
      buyer_address: [''],
      buyer_phone: [''],
      buyer_email: ['', [Validators.email]],

      lead_source: [null],
      lead_source_other: [''],

      format_date: [''],
      agent_name: [''],
      notes: [''],
    });

    this.propertySelectConfig.form_control = this.form.get('property_id');
    this.fiscalSelectConfig.form_control = this.form.get('fiscal_configuration_id');
    this.currencySelectConfig.form_control = this.form.get('currency');
    this.maintenanceCurrencySelectConfig.form_control = this.form.get('maintenance_currency');
    this.paymentDaySelectConfig.form_control = this.form.get('payment_day');
    this.leadSourceSelectConfig.form_control = this.form.get('lead_source');
  }

  ngOnInit(): void {
    this.loadProperties();
    this.loadFiscalConfigurations();
    if (this.data?.format) {
      this.patchForm(this.data.format);
    }
  }

  private patchForm(format: DivinoReservationFormat): void {
    this.form.patchValue({
      property_id: format.property_id ?? null,
      fiscal_configuration_id: format.fiscal_configuration_id ?? null,
      payable_to: format.payable_to ?? '',
      received_from: format.received_from ?? '',
      amount_in_words: format.amount_in_words ?? '',
      evidenced_by: format.evidenced_by ?? '',
      purchase_price: format.purchase_price ?? null,
      currency: format.currency ?? 'MXN',
      reservation_deposit: format.reservation_deposit ?? null,
      reservation_date: this.toDateInput(format.reservation_date),
      down_payment: format.down_payment ?? null,
      down_payment_date: this.toDateInput(format.down_payment_date),
      financed_balance: format.financed_balance ?? null,
      financing_years: format.financing_years ?? null,
      monthly_payments_count: format.monthly_payments_count ?? null,
      monthly_payment_amount: format.monthly_payment_amount ?? null,
      maintenance_fee: format.maintenance_fee ?? 50,
      maintenance_currency: format.maintenance_currency ?? 'USD',
      payment_day: format.payment_day ?? null,
      buyer_name: format.buyer_name ?? '',
      buyer_address: format.buyer_address ?? '',
      buyer_phone: format.buyer_phone ?? '',
      buyer_email: format.buyer_email ?? '',
      lead_source: format.lead_source ?? null,
      lead_source_other: format.lead_source_other ?? '',
      format_date: this.toDateInput(format.format_date),
      agent_name: format.agent_name ?? '',
      notes: format.notes ?? '',
    });
  }

  private toDateInput(value?: string | null): string {
    if (!value) return '';
    return value.slice(0, 10);
  }

  private loadProperties(): void {
    this.propertyService.getProperties({ status: 'disponible', limit: 100 }).subscribe({
      next: (res) => {
        const rows = Array.isArray(res) ? res : (res?.data ?? []);
        const mapped = rows.map((p: any) => ({
          ...p,
          displayName: `${p.code}${p.name ? ' — ' + p.name : ''}`,
        }));
        // Ensure the current lote is selectable when editing (may not be "disponible").
        if (this.data?.format?.property && !mapped.some((p: any) => p.id === this.data.format!.property_id)) {
          const prop = this.data.format.property;
          mapped.unshift({
            id: prop.id,
            code: prop.code,
            name: prop.name,
            displayName: `${prop.code}${prop.name ? ' — ' + prop.name : ''}`,
          });
        }
        this.propertySelectConfig = { ...this.propertySelectConfig, data: mapped, loading: false };
      },
      error: () => {
        this.propertySelectConfig = { ...this.propertySelectConfig, loading: false };
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No pudimos cargar los lotes disponibles.',
        });
      },
    });
  }

  private loadFiscalConfigurations(): void {
    this.fiscalService.listFiscalConfigurations({ status: 'active', limit: 100 }).subscribe({
      next: (res) => {
        this.fiscalSelectConfig = { ...this.fiscalSelectConfig, data: res?.data ?? [], loading: false };
      },
      error: () => {
        this.fiscalSelectConfig = { ...this.fiscalSelectConfig, loading: false };
      },
    });
  }

  /** Rellena el formulario con datos de prueba (excepto el LOTE). Solo en localhost. */
  prefillForTest(): void {
    const today = new Date();
    const iso = (date: Date) => date.toISOString().slice(0, 10);
    const plusDays = (days: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() + days);
      return iso(d);
    };

    this.form.patchValue({
      payable_to: 'Valdetierra SA de CV',
      received_from: 'Juan Pérez López',
      amount_in_words: 'Cincuenta mil pesos 00/100 M.N.',
      evidenced_by: 'Transferencia SPEI ref. 998877',
      purchase_price: 850000,
      currency: 'MXN',
      reservation_deposit: 50000,
      reservation_date: iso(today),
      down_payment: 170000,
      down_payment_date: plusDays(10),
      financed_balance: 630000,
      financing_years: 5,
      monthly_payments_count: 60,
      monthly_payment_amount: 10500,
      maintenance_fee: 50,
      maintenance_currency: 'USD',
      payment_day: '1',
      buyer_name: 'Juan Pérez López',
      buyer_address: 'Av. Reforma 123, Tijuana, B.C.',
      buyer_phone: '+52 664 123 4567',
      buyer_email: 'juan.perez@example.com',
      lead_source: 'instagram',
      lead_source_other: '',
      format_date: iso(today),
      agent_name: 'María Gómez',
      notes: 'Cliente pide firmar contrato la próxima semana.',
    });

    this.interceptor.openSnackbar({
      type: 'info',
      title: 'Datos de prueba',
      message: 'Formulario prellenado. Selecciona el lote para continuar.',
    });
  }

  close(): void {
    if (!this.loading()) {
      this.dialogRef.close(false);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.interceptor.openSnackbar({
        type: 'error',
        title: 'Datos incompletos',
        message: 'Revisa los campos marcados. El lote es obligatorio.',
      });
      return;
    }

    const payload = this.buildPayload();
    this.loading.set(true);

    const request$ = this.isEdit
      ? this.service.update(this.data.format!.id, payload)
      : this.service.create(payload);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: this.isEdit ? 'Formato actualizado correctamente.' : 'Formato creado correctamente.',
        });
        this.dialogRef.close(true);
      },
      error: (err: unknown) => {
        this.loading.set(false);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: this.resolveApiErrorMessage(
            err,
            this.isEdit ? 'No pudimos actualizar el formato.' : 'No pudimos crear el formato.',
          ),
        });
      },
    });
  }

  private buildPayload(): CreateDivinoReservationFormatDto {
    const raw = this.form.value;
    const normalize = (value: unknown) => {
      if (value === '' || value === undefined) return null;
      return value as any;
    };
    const payload: any = {};
    Object.keys(raw).forEach((key) => {
      payload[key] = normalize(raw[key]);
    });
    payload.property_id = raw.property_id;
    return payload as CreateDivinoReservationFormatDto;
  }

  private resolveApiErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse && error.error?.message != null) {
      const msg = error.error.message;
      return Array.isArray(msg) ? msg.join(', ') : String(msg);
    }
    return fallback;
  }
}
