import { Component, Inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { Subject, takeUntil } from 'rxjs';
import { VendorService } from '../../services/vendor.service';
import {
  CheckVendorDuplicatesDto,
  Vendor,
  VendorAccounts,
  CreateVendorDto,
  VendorType,
} from '../../models/vendor.model';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { VendorPayableDetailDialogComponent } from '../../../accounting/components/vendor-payable-detail-dialog/vendor-payable-detail-dialog.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { X, FileUp } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { SETTINGS_PERMISSIONS } from '../../config/permissions.config';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { VENDOR_DUPLICATE_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import {
  VendorDuplicateWarningDialogComponent,
  VendorDuplicateWarningResult,
} from '../vendor-duplicate-warning-dialog/vendor-duplicate-warning-dialog.component';
import {
  completenessLevel as completenessTone,
  computeVendorCompleteness,
  vendorCompanyName,
  VENDOR_MATCH_REASON_LABELS,
} from '../../utils/vendor-profile.util';
import {
  COUNTRIES,
  isMexicoCountry,
  MEXICO_COUNTRY_NAME,
  resolveCountryName,
} from '../../../../core/utils/countries.util';

type VendorTabId = 'general' | 'fiscal' | 'direccion' | 'bancaria' | 'cuentas';

/** RFC persona física (13) o moral (12): 3-4 letras + 6 dígitos + 3 homoclave */
const MEXICAN_RFC_PATTERN = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i;

@Component({
  selector: 'app-vendor-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    LucideAngularModule,
    TabComponent,
    HasPermissionDirective,
  ],
  templateUrl: './vendor-detail-modal.component.html',
  styleUrl: './vendor-detail-modal.component.scss',
})
export class VendorDetailModalComponent implements OnDestroy {
  X = X;
  readonly FileUpIcon = FileUp;
  form: FormGroup;
  saving = signal(false);
  deleting = signal(false);
  satConstanciaUploading = signal(false);
  activeTab = signal<VendorTabId>('general');
  isNew = true;
  readonly vendorDeletePermission = SETTINGS_PERMISSIONS.vendors.delete;
  readonly vendorCompanyName = vendorCompanyName;
  private duplicateWarningAccepted = false;
  accounts = signal<VendorAccounts | null>(null);
  accountsLoading = signal(false);

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

  /** Catálogo completo de países (ISO 3166-1) en español. */
  readonly countryOptions = COUNTRIES;
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
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<VendorDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendor: Vendor | null },
  ) {
    this.isNew = !data.vendor;
    this.form = this.createForm();

    if (data.vendor) {
      this.form.patchValue({
        ...data.vendor,
        vendor_type: data.vendor.vendor_type ?? 'NATIONAL',
        company_name: data.vendor.company_name || data.vendor.name || '',
        tax_id: data.vendor.tax_id ?? '',
        rfc: data.vendor.rfc ?? '',
        exterior_number: data.vendor.exterior_number ?? '',
        interior_number: data.vendor.interior_number ?? '',
        colonia: data.vendor.colonia ?? '',
        localidad: data.vendor.localidad ?? '',
        credit_limit: data.vendor.credit_limit ?? 0,
        credit_days: data.vendor.credit_days ?? 0,
        // Datos importados traen 'USA', 'CHINA', etc.: se muestran con el nombre del catálogo.
        country: resolveCountryName(data.vendor.country) ?? data.vendor.country ?? '',
      });
    }

    this.applyVendorTypeValidators(this.form.get('vendor_type')!.value as VendorType);
    this.form
      .get('vendor_type')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((type: VendorType) => {
        this.syncCountryForVendorType(type);
        this.applyVendorTypeValidators(type);
        this.keepTabForVendorType(type);
      });

    if (this.isNew) {
      this.activeTab.set('fiscal');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isNational(): boolean {
    return this.form.get('vendor_type')?.value === 'NATIONAL';
  }

  get tabs(): TabItem[] {
    const items: TabItem[] = [{ id: 'general', title: 'General' }];
    if (this.isNational) {
      items.push({ id: 'fiscal', title: 'Información Fiscal' });
    } else {
      items.push({ id: 'direccion', title: 'Dirección' });
    }
    items.push({ id: 'bancaria', title: 'Información bancaria' });
    if (!this.isNew) {
      items.push({ id: 'cuentas', title: 'Cuentas' });
    }
    return items;
  }

  get profileCompleteness(): number {
    return computeVendorCompleteness(this.form?.getRawValue() ?? this.data.vendor ?? {});
  }

  get completenessLevel(): 'high' | 'mid' | 'low' {
    return completenessTone(this.profileCompleteness);
  }

  get similarVendors() {
    return this.data.vendor?.similar_vendors ?? [];
  }

  similarReasons(): string {
    const reasons = this.similarVendors
      .flatMap((item) => item.match_reasons ?? [])
      .map((reason) => VENDOR_MATCH_REASON_LABELS[reason])
      .filter(Boolean);
    return [...new Set(reasons)].join(', ');
  }

  setActiveTab(tabId: string): void {
    if (
      tabId === 'general' ||
      tabId === 'fiscal' ||
      tabId === 'direccion' ||
      tabId === 'bancaria' ||
      tabId === 'cuentas'
    ) {
      this.activeTab.set(tabId);
      if (tabId === 'cuentas') {
        this.loadAccounts();
      }
    }
  }

  openSatConstanciaPicker(): void {
    if (!this.isNational || this.satConstanciaUploading()) {
      return;
    }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf,.pdf';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        this.uploadSatConstancia(file);
      }
    };
    input.click();
  }

  uploadSatConstancia(file: File): void {
    if (!this.isNational || this.satConstanciaUploading()) {
      return;
    }
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      this.toast.error('Selecciona el PDF de la constancia del SAT');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      this.toast.error('El PDF no puede superar 10 MB');
      return;
    }

    this.satConstanciaUploading.set(true);
    this.vendorService
      .readSatConstancia(file)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          const companyName = String(this.form.get('company_name')?.value ?? '').trim();
          this.form.patchValue({
            vendor_type: 'NATIONAL',
            rfc: data.rfc,
            persona_type: data.persona_type,
            razon_social: data.razon_social,
            company_name: companyName || data.razon_social,
            street: data.street ?? '',
            exterior_number: data.exterior_number ?? '',
            interior_number: data.interior_number ?? '',
            colonia: data.colonia ?? '',
            localidad: data.localidad ?? '',
            city: data.city ?? '',
            state: data.state ?? '',
            zip_code: data.zip_code ?? '',
            country: 'México',
          });
          this.form.get('rfc')?.markAsTouched();
          this.satConstanciaUploading.set(false);
          this.activeTab.set('fiscal');
          this.toast.success(
            'Se llenó la información fiscal con la constancia del SAT. Puedes corregirla antes de guardar.',
          );
        },
        error: (error) => {
          this.satConstanciaUploading.set(false);
          this.toast.error(resolveHttpErrorMessage(error, 'No se pudo leer la constancia del SAT'));
        },
      });
  }

  loadAccounts(): void {
    const vendorId = this.data.vendor?.id;
    if (!vendorId || this.accountsLoading()) return;
    this.accountsLoading.set(true);
    this.vendorService.getVendorAccounts(vendorId).subscribe({
      next: (accounts) => {
        this.accounts.set(accounts);
        this.accountsLoading.set(false);
      },
      error: () => {
        this.accounts.set(null);
        this.accountsLoading.set(false);
        this.toast.error('No se pudieron cargar las cuentas del proveedor');
      },
    });
  }

  openPendingOrders(): void {
    const vendor = this.data.vendor;
    if (!vendor?.id) return;
    this.dialog.open(VendorPayableDetailDialogComponent, {
      width: '820px',
      maxWidth: '95vw',
      data: {
        vendorId: vendor.id,
        vendorLabel: vendorCompanyName(vendor) || vendor.razon_social || 'Proveedor',
        currency: 'all',
      },
    });
  }

  formatMoney(amount: number, currency: 'MXN' | 'USD'): string {
    return formatUnitCurrency(amount || 0, currency);
  }

  ledgerTypeLabel(type: string): string {
    if (type === 'credit') return 'A favor';
    if (type === 'debit') return 'Aplicado';
    if (type === 'void') return 'Reverso';
    return type;
  }

  netLabel(net: number, currency: 'MXN' | 'USD'): string {
    if (net < 0) return `A favor ${this.formatMoney(Math.abs(net), currency)}`;
    return this.formatMoney(net, currency);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      vendor_type: ['NATIONAL' as VendorType, Validators.required],
      company_name: ['', [Validators.required, Validators.minLength(2)]],
      street: [''],
      exterior_number: [''],
      interior_number: [''],
      colonia: [''],
      localidad: [''],
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
    this.clearControlValidators('tax_id');
    this.setControlValidators('legal_name', !national, [Validators.required]);
    this.setControlValidators('country', !national, [
      Validators.required,
      internationalCountryValidator,
    ]);

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

  /**
   * Al cambiar el tipo: un nacional siempre es de México y un internacional
   * no puede quedarse con México (se limpia para que elijan su país).
   */
  private syncCountryForVendorType(type: VendorType): void {
    const country = this.form.get('country');
    if (!country) return;
    if (type === 'NATIONAL') {
      country.setValue(MEXICO_COUNTRY_NAME, { emitEvent: false });
    } else if (isMexicoCountry(country.value)) {
      country.setValue('', { emitEvent: false });
    }
  }

  /** Al salir del campo, deja el país escrito igual que en el catálogo. */
  normalizeCountryInput(): void {
    const country = this.form.get('country');
    const resolved = resolveCountryName(country?.value);
    if (country && resolved && resolved !== country.value) {
      country.setValue(resolved);
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
        this.toast.error(this.missingFieldsMessage());
      }
      return;
    }

    if (this.isNew && !this.duplicateWarningAccepted) {
      const duplicatesPayload = this.buildDuplicatesPayload();
      if (duplicatesPayload) {
        this.saving.set(true);
        this.vendorService.checkVendorDuplicates(duplicatesPayload).subscribe({
          next: (response) => {
            if (response?.found && response.matches?.length) {
              this.saving.set(false);
              this.openDuplicateWarning(response.matches);
              return;
            }
            this.persistVendor();
          },
          error: () => {
            this.persistVendor();
          },
        });
        return;
      }
    }

    this.persistVendor();
  }

  private persistVendor(): void {
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

  private buildDuplicatesPayload(): CheckVendorDuplicatesDto | null {
    const v = this.form.getRawValue();
    const trim = (s: string | null | undefined) => s?.trim() || '';
    const payload: CheckVendorDuplicatesDto = {};
    if (trim(v.company_name)) {
      payload.company_name = trim(v.company_name);
      payload.name = trim(v.company_name);
    }
    if (trim(v.razon_social)) payload.razon_social = trim(v.razon_social);
    if (trim(v.legal_name)) payload.legal_name = trim(v.legal_name);
    if (trim(v.rfc)) payload.rfc = trim(v.rfc);
    if (trim(v.tax_id)) payload.tax_id = trim(v.tax_id);
    if (trim(v.bank_clabe)) payload.bank_clabe = trim(v.bank_clabe);
    if (trim(v.bank_iban)) payload.bank_iban = trim(v.bank_iban);
    if (trim(v.bank_account_number)) payload.bank_account_number = trim(v.bank_account_number);
    return Object.keys(payload).length > 0 ? payload : null;
  }

  private openDuplicateWarning(matches: Vendor['similar_vendors']): void {
    this.dialog
      .open(VendorDuplicateWarningDialogComponent, {
        ...VENDOR_DUPLICATE_DIALOG_CONFIG,
        data: { matches: matches ?? [] },
      })
      .afterClosed()
      .subscribe((result: VendorDuplicateWarningResult | undefined) => {
        if (result?.action === 'continue') {
          this.duplicateWarningAccepted = true;
          this.persistVendor();
          return;
        }
        if (result?.action === 'view' && result.vendorId) {
          this.vendorService.getVendor(result.vendorId).subscribe({
            next: (vendor) => {
              this.dialog.open(VendorDetailModalComponent, {
                width: '80vw',
                maxWidth: '1000px',
                data: { vendor },
              });
            },
          });
        }
      });
  }

  deleteVendor(): void {
    if (this.isNew || !this.data.vendor || this.deleting()) {
      return;
    }

    const vendor = this.data.vendor;
    const similarName = vendorCompanyName(vendor.similar_vendors?.[0]);
    const label = vendorCompanyName(vendor) || 'este proveedor';
    const message = similarName
      ? `¿Eliminar "${label}"? Si tiene compras, se conservarán en "${similarName}".`
      : `¿Eliminar "${label}"? Si tiene compras y no hay otro parecido, se desactivará para conservar el historial.`;

    this.dialog
      .open(AlertDialogComponent, {
        width: '400px',
        data: {
          title: 'Eliminar proveedor',
          message,
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          type: 'danger',
        },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }
        this.deleting.set(true);
        this.vendorService.deleteVendor(vendor.id).subscribe({
          next: (response) => {
            this.toast.success(response?.message || 'Proveedor eliminado correctamente');
            this.deleting.set(false);
            this.dialogRef.close({ deleted: true, result: response });
          },
          error: (error) => {
            this.toast.error(error.error?.message || 'Error al eliminar proveedor');
            this.deleting.set(false);
          },
        });
      });
  }

  private buildPayload(): CreateVendorDto {
    const v = this.form.getRawValue();
    const trim = (s: string | null | undefined) => s?.trim() || undefined;
    const type = v.vendor_type as VendorType;

    const companyName = trim(v.company_name)!;
    const base: CreateVendorDto = {
      vendor_type: type,
      name: companyName,
      company_name: companyName,
      street: trim(v.street),
      city: trim(v.city),
      state: trim(v.state),
      zip_code: trim(v.zip_code),
      country: resolveCountryName(v.country) ?? trim(v.country),
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
        exterior_number: trim(v.exterior_number) ?? '',
        interior_number: trim(v.interior_number) ?? '',
        colonia: trim(v.colonia) ?? '',
        localidad: trim(v.localidad) ?? '',
        bank_clabe: trim(v.bank_clabe),
      };
    }

    return {
      ...base,
      tax_id: trim(v.tax_id) || null,
      legal_name: trim(v.legal_name),
      bank_swift_bic: trim(v.bank_swift_bic)?.toUpperCase(),
      bank_iban: trim(v.bank_iban)?.toUpperCase(),
    };
  }

  close(): void {
    this.dialogRef.close();
  }

  private focusTabWithErrors(): void {
    const national = this.isNational;
    const tabFields: Record<VendorTabId, string[]> = {
      general: national
        ? ['vendor_type', 'company_name', 'status', 'credit_days', 'credit_limit']
        : [
            'vendor_type',
            'company_name',
            'tax_id',
            'legal_name',
            'status',
            'credit_days',
            'credit_limit',
          ],
      fiscal: [
        'rfc',
        'razon_social',
        'persona_type',
        'street',
        'exterior_number',
        'interior_number',
        'colonia',
        'localidad',
        'city',
        'state',
        'country',
        'zip_code',
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
      cuentas: [],
    };

    const order: VendorTabId[] = national
      ? ['general', 'fiscal', 'bancaria']
      : ['general', 'direccion', 'bancaria'];

    for (const tab of order) {
      const hasError = tabFields[tab].some((name) => this.form.get(name)?.invalid);
      if (hasError) {
        this.activeTab.set(tab);
        return;
      }
    }
  }

  /** Mensaje con los campos que impiden guardar, agrupados por pestaña. */
  private missingFieldsMessage(): string {
    const labels: Record<string, [string, string]> = {
      vendor_type: ['Tipo de proveedor', 'General'],
      company_name: ['Nombre de empresa (mínimo 2 letras)', 'General'],
      legal_name: ['Nombre legal', 'General'],
      tax_id: ['ID fiscal', 'General'],
      status: ['Status', 'General'],
      credit_days: ['Días de crédito (no puede ser negativo)', 'General'],
      credit_limit: ['Límite de crédito (no puede ser negativo)', 'General'],
      rfc: ['RFC (formato inválido)', 'Fiscal'],
      razon_social: ['Razón social', 'Fiscal'],
      persona_type: ['Tipo de persona', 'Fiscal'],
      street: ['Calle', this.isNational ? 'Fiscal' : 'Dirección'],
      city: ['Ciudad', this.isNational ? 'Fiscal' : 'Dirección'],
      state: ['Estado', this.isNational ? 'Fiscal' : 'Dirección'],
      country: [this.countryMissingLabel(), this.isNational ? 'Fiscal' : 'Dirección'],
      zip_code: ['Código postal', this.isNational ? 'Fiscal' : 'Dirección'],
      bank_clabe: ['CLABE (18 dígitos)', 'Información bancaria'],
      bank_swift_bic: ['SWIFT/BIC', 'Información bancaria'],
      bank_iban: ['IBAN', 'Información bancaria'],
    };
    const missing = Object.keys(this.form.controls)
      .filter((name) => this.form.get(name)?.invalid)
      .map((name) => {
        const [label, tab] = labels[name] ?? [name, ''];
        return tab ? `${label} (${tab})` : label;
      });
    if (!missing.length) {
      return 'Revisa los campos marcados en rojo.';
    }
    const intro = this.isNational
      ? 'Para guardar falta:'
      : 'Para guardar un proveedor internacional falta:';
    return `${intro} ${missing.join(', ')}.`;
  }

  private countryMissingLabel(): string {
    const errors = this.form.get('country')?.errors;
    if (errors?.['mexicoInternational']) {
      return 'País (un proveedor internacional no puede ser de México; si es de México, cámbialo a Nacional)';
    }
    if (errors?.['countryNotInList']) return 'País (elige uno de la lista)';
    return 'País';
  }

  private keepTabForVendorType(type: VendorType): void {
    if (type === 'NATIONAL' && this.activeTab() === 'direccion') {
      this.activeTab.set('fiscal');
    }
    if (type !== 'NATIONAL' && this.activeTab() === 'fiscal') {
      this.activeTab.set('direccion');
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
    if (c.errors['mexicoInternational']) {
      return 'Un proveedor internacional no puede ser de México. Si es de México, cámbialo a Nacional.';
    }
    if (c.errors['countryNotInList']) return 'Elige un país de la lista';
    return 'Valor inválido';
  }
}

/** País de proveedor internacional: debe estar en el catálogo y no ser México. */
function internationalCountryValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value || !String(value).trim()) return null;
  const resolved = resolveCountryName(value);
  if (!resolved) return { countryNotInList: true };
  if (resolved === MEXICO_COUNTRY_NAME) return { mexicoInternational: true };
  return null;
}
