import { Component, Inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { Subject, takeUntil } from 'rxjs';
import { VendorService } from '../../services/vendor.service';
import { Vendor, CreateVendorDto, VendorType } from '../../models/vendor.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

type VendorTabId = 'general' | 'direccion' | 'bancaria';

/** RFC persona física (13) o moral (12): 3-4 letras + 6 dígitos + 3 homoclave */
const MEXICAN_RFC_PATTERN = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i;

@Component({
  selector: 'app-vendor-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, LucideAngularModule, TabComponent],
  templateUrl: './vendor-detail-modal.component.html',
  styleUrl: './vendor-detail-modal.component.scss',
})
export class VendorDetailModalComponent implements OnDestroy {
  X = X;
  form: FormGroup;
  saving = signal(false);
  activeTab = signal<VendorTabId>('general');
  isNew = true;

  tabs: TabItem[] = [
    { id: 'general', title: 'General' },
    { id: 'direccion', title: 'Dirección' },
    { id: 'bancaria', title: 'Información bancaria' },
  ];

  vendorTypeOptions: { id: VendorType; name: string }[] = [
    { id: 'NATIONAL', name: 'Nacional (México)' },
    { id: 'INTERNATIONAL', name: 'Internacional' },
  ];

  personaTypeOptions = [
    { id: 'Persona Física', name: 'Persona Física' },
    { id: 'Persona Moral', name: 'Persona Moral' },
  ];

  statusOptions = [
    { id: 'active', name: 'Activo' },
    { id: 'inactive', name: 'Inactivo' },
  ];

  countryOptions = [
    { id: 'México', name: 'México' },
    { id: 'Estados Unidos', name: 'Estados Unidos' },
    { id: 'Canadá', name: 'Canadá' },
    { id: 'España', name: 'España' },
    { id: 'Argentina', name: 'Argentina' },
    { id: 'Brasil', name: 'Brasil' },
    { id: 'Chile', name: 'Chile' },
    { id: 'Colombia', name: 'Colombia' },
    { id: 'Perú', name: 'Perú' },
    { id: 'China', name: 'China' },
    { id: 'Alemania', name: 'Alemania' },
    { id: 'Reino Unido', name: 'Reino Unido' },
  ];

  currencyOptions = [
    { id: 'MXN', name: 'MXN' },
    { id: 'USD', name: 'USD' },
    { id: 'EUR', name: 'EUR' },
    { id: 'CAD', name: 'CAD' },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private toast: ToastService,
    public dialogRef: MatDialogRef<VendorDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendor: Vendor | null },
  ) {
    this.isNew = !data.vendor;
    this.form = this.createForm();

    if (data.vendor) {
      this.form.patchValue({
        ...data.vendor,
        vendor_type: data.vendor.vendor_type ?? 'NATIONAL',
        credit_limit: data.vendor.credit_limit ?? 0,
        credit_days: data.vendor.credit_days ?? 0,
      });
    }

    this.applyVendorTypeValidators(this.form.get('vendor_type')!.value as VendorType);
    this.form
      .get('vendor_type')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((type: VendorType) => this.applyVendorTypeValidators(type));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isNational(): boolean {
    return this.form.get('vendor_type')?.value === 'NATIONAL';
  }

  setActiveTab(tabId: string): void {
    if (tabId === 'general' || tabId === 'direccion' || tabId === 'bancaria') {
      this.activeTab.set(tabId);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      vendor_type: ['NATIONAL' as VendorType, Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      company_name: [''],
      street: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      country: ['México'],
      razon_social: [''],
      rfc: [''],
      persona_type: ['Persona Moral'],
      tax_id: [''],
      legal_name: [''],
      bank_name: [''],
      bank_account_holder: [''],
      bank_account_number: [''],
      bank_clabe: [''],
      bank_swift_bic: [''],
      bank_iban: [''],
      bank_currency: ['MXN'],
      status: ['active'],
      credit_days: [0, [Validators.min(0)]],
      credit_limit: [0, [Validators.min(0)]],
    });
  }

  private applyVendorTypeValidators(type: VendorType): void {
    const national = type === 'NATIONAL';
    if (national) {
      this.setControlValidators('rfc', true, [Validators.pattern(MEXICAN_RFC_PATTERN)]);
    } else {
      this.clearControlValidators('rfc');
    }
    this.setControlValidators('persona_type', national, [Validators.required]);
    this.setControlValidators('tax_id', !national, [Validators.required]);
    this.setControlValidators('legal_name', !national, [Validators.required]);
    this.setControlValidators('country', !national, [Validators.required]);

    if (national) {
      this.form.patchValue(
        {
          country: this.form.get('country')?.value || 'México',
          bank_currency: 'MXN',
        },
        { emitEvent: false },
      );
      this.clearControlValidators('bank_swift_bic');
      this.clearControlValidators('bank_iban');
      this.setControlValidators('bank_clabe', false, [
        Validators.pattern(/^\d{18}$/),
      ]);
    } else {
      this.form.patchValue(
        { bank_currency: this.form.get('bank_currency')?.value || 'USD' },
        { emitEvent: false },
      );
      this.clearControlValidators('bank_clabe');
      this.clearControlValidators('persona_type');
    }
  }

  private setControlValidators(
    name: string,
    enabled: boolean,
    validators: ValidatorFn[],
  ): void {
    const control = this.form.get(name);
    if (!control) return;
    control.setValidators(enabled ? validators : []);
    control.updateValueAndValidity({ emitEvent: false });
  }

  private clearControlValidators(name: string): void {
    const control = this.form.get(name);
    if (!control) return;
    control.clearValidators();
    control.updateValueAndValidity({ emitEvent: false });
  }

  save(): void {
    if (this.form.invalid || this.saving()) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        this.focusTabWithErrors();
      }
      return;
    }

    this.saving.set(true);
    const payload = this.buildPayload();

    const request$ = this.isNew
      ? this.vendorService.createVendor(payload)
      : this.vendorService.updateVendor(this.data.vendor!.id, payload);

    request$.subscribe({
      next: (vendor) => {
        this.toast.success(
          this.isNew ? 'Proveedor creado correctamente' : 'Proveedor actualizado correctamente',
        );
        this.saving.set(false);
        this.dialogRef.close(vendor);
      },
      error: (error) => {
        const msg = Array.isArray(error.error?.message)
          ? error.error.message.join(', ')
          : error.error?.message || 'Error al guardar proveedor';
        this.toast.error(msg);
        this.saving.set(false);
      },
    });
  }

  private buildPayload(): CreateVendorDto {
    const v = this.form.getRawValue();
    const trim = (s: string | null | undefined) => s?.trim() || undefined;
    const type = v.vendor_type as VendorType;

    const base: CreateVendorDto = {
      vendor_type: type,
      name: trim(v.name)!,
      company_name: trim(v.company_name),
      street: trim(v.street),
      city: trim(v.city),
      state: trim(v.state),
      zip_code: trim(v.zip_code),
      country: trim(v.country),
      status: v.status,
      credit_days: v.credit_days ?? 0,
      credit_limit: v.credit_limit ?? 0,
      bank_name: trim(v.bank_name),
      bank_account_holder: trim(v.bank_account_holder),
      bank_account_number: trim(v.bank_account_number),
      bank_currency: trim(v.bank_currency),
    };

    if (type === 'NATIONAL') {
      return {
        ...base,
        rfc: trim(v.rfc)?.toUpperCase(),
        razon_social: trim(v.razon_social),
        persona_type: v.persona_type,
        bank_clabe: trim(v.bank_clabe),
      };
    }

    return {
      ...base,
      tax_id: trim(v.tax_id),
      legal_name: trim(v.legal_name),
      bank_swift_bic: trim(v.bank_swift_bic)?.toUpperCase(),
      bank_iban: trim(v.bank_iban)?.toUpperCase(),
    };
  }

  close(): void {
    this.dialogRef.close();
  }

  private focusTabWithErrors(): void {
    const tabFields: Record<VendorTabId, string[]> = {
      general: [
        'vendor_type',
        'name',
        'company_name',
        'rfc',
        'razon_social',
        'persona_type',
        'tax_id',
        'legal_name',
        'status',
        'credit_days',
        'credit_limit',
      ],
      direccion: ['street', 'city', 'state', 'country', 'zip_code'],
      bancaria: [
        'bank_name',
        'bank_account_holder',
        'bank_account_number',
        'bank_currency',
        'bank_clabe',
        'bank_swift_bic',
        'bank_iban',
      ],
    };

    for (const tab of ['general', 'direccion', 'bancaria'] as VendorTabId[]) {
      const hasError = tabFields[tab].some((name) => this.form.get(name)?.invalid);
      if (hasError) {
        this.activeTab.set(tab);
        return;
      }
    }
  }

  showError(controlName: string): boolean {
    const c = this.form.get(controlName);
    return !!(c && c.invalid && c.touched);
  }

  getError(controlName: string): string {
    const c = this.form.get(controlName) as AbstractControl | null;
    if (!c?.errors) return '';
    if (c.errors['required']) return 'Campo requerido';
    if (c.errors['pattern']) {
      return controlName === 'rfc'
        ? 'RFC inválido (formato: 3-4 letras + 6 dígitos + 3 alfanuméricos)'
        : 'Formato inválido';
    }
    if (c.errors['minlength']) return 'Muy corto';
    return 'Valor inválido';
  }
}
