import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { PolluxBrandTextComponent } from '../../../../core/components/pollux-brand-text/pollux-brand-text.component';
import { PhoneDigitsDirective } from '../../../../core/directives/phone-digits.directive';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { SAT_COUNTRY_MEX } from '../../../customers/utils/fiscal-domicile.util';
import {
  FISCAL_PERSON_TYPE_OPTIONS,
  inferFiscalPersonTypeFromRfc,
  isValidFiscalPersonType,
  resolveFiscalPersonType,
} from '../../../customers/utils/fiscal-person-type.util';
import {
  SelfInvoiceCatalogOption,
  SelfInvoiceFiscalData,
  SelfInvoiceIssued,
  SelfInvoicePreview,
  SelfInvoiceStampPayload,
  SelfInvoiceStampResult,
  isAlreadyInvoicedMessage,
  normalizePublicInvoiceCode,
} from '../../models/self-invoice.model';
import { SelfInvoiceService } from '../../services/self-invoice.service';

type PortalStep = 'folio' | 'identify' | 'fiscal' | 'downloads' | 'success';

@Component({
  selector: 'app-self-invoice-portal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    PolluxBrandTextComponent,
    PhoneDigitsDirective,
  ],
  templateUrl: './self-invoice-portal.component.html',
  styleUrl: './self-invoice-portal.component.scss',
})
export class SelfInvoicePortalComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly toast = inject(ToastService);
  private readonly api = inject(SelfInvoiceService);
  private readonly destroyRef = inject(DestroyRef);

  readonly fiscalPersonTypeOptions = FISCAL_PERSON_TYPE_OPTIONS;

  readonly step = signal<PortalStep>('folio');
  readonly preview = signal<SelfInvoicePreview | null>(null);
  readonly previewLoading = signal(false);
  readonly identifyLoading = signal(false);
  readonly stampLoading = signal(false);
  readonly pdfLoading = signal(false);
  readonly xmlLoading = signal(false);
  readonly issued = signal<SelfInvoiceIssued | null>(null);
  readonly success = signal<SelfInvoiceStampResult | null>(null);

  readonly usoCfdiOptions = signal<SelfInvoiceCatalogOption[]>([]);
  readonly regimenOptions = signal<SelfInvoiceCatalogOption[]>([]);
  readonly formaPagoOptions = signal<SelfInvoiceCatalogOption[]>([]);
  readonly metodoPagoOptions = signal<SelfInvoiceCatalogOption[]>([]);

  readonly folioForm = this.fb.group({
    code: ['', [Validators.required]],
  });

  readonly identifyForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  readonly fiscalForm = this.fb.group({
    fiscal_rfc: ['', [Validators.required, Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/)]],
    fiscal_person_type: ['', [Validators.required]],
    fiscal_razon_social: ['', [Validators.required]],
    fiscal_postal_code: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    fiscal_country: [SAT_COUNTRY_MEX, [Validators.required]],
    fiscal_street: [''],
    fiscal_exterior_number: [''],
    fiscal_interior_number: [''],
    fiscal_colonia: [''],
    fiscal_localidad: [''],
    fiscal_municipio: [''],
    fiscal_state: [''],
    uso_cfdi: ['', [Validators.required]],
    regimen_fiscal_receptor: ['', [Validators.required]],
    forma_pago: ['', [Validators.required]],
    metodo_pago: ['PUE', [Validators.required]],
  });

  readonly showPreviewCard = computed(() => {
    const step = this.step();
    return step !== 'folio' && !!this.preview();
  });

  readonly formattedTotal = computed(() => this.formatCurrency(this.preview()?.total));

  ngOnInit(): void {
    this.title.setTitle('Facturar tu compra');
    this.bindSatUppercase();
    this.bindRfcPersonType();
    this.bindFolioUppercase();

    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([params, query]) => {
        const emailFromQr = (query.get('email') ?? '').trim();
        const emailControl = this.identifyForm.controls.email;
        if (emailFromQr && !emailControl.dirty) {
          emailControl.setValue(emailFromQr);
        }

        const code = normalizePublicInvoiceCode(params.get('code') ?? '');
        if (!code) {
          this.resetToFolioLanding();
          return;
        }
        this.folioForm.patchValue({ code }, { emitEvent: false });
        this.loadPreview(code);
      });
  }

  submitFolio(): void {
    if (this.folioForm.invalid) {
      this.folioForm.markAllAsTouched();
      return;
    }
    const code = normalizePublicInvoiceCode(this.folioForm.controls.code.value ?? '');
    if (!code) {
      this.folioForm.controls.code.setErrors({ required: true });
      return;
    }
    this.folioForm.controls.code.setValue(code, { emitEvent: false });
    const routeCode = normalizePublicInvoiceCode(this.route.snapshot.paramMap.get('code') ?? '');
    if (routeCode === code) {
      this.loadPreview(code, true);
      return;
    }
    void this.router.navigate(['/facturar', code], { queryParamsHandling: 'preserve' });
  }

  submitIdentify(): void {
    const preview = this.preview();
    if (!preview || this.identifyForm.invalid || this.identifyLoading()) {
      this.identifyForm.markAllAsTouched();
      return;
    }

    this.identifyLoading.set(true);
    this.api
      .identify(preview.code, {
        email: this.trimmedEmail(),
        phone: this.trimmedPhone(),
      })
      .subscribe({
        next: (result) => {
          this.identifyLoading.set(false);
          this.resetFiscalForm();
          this.applySuggested(result.suggested);
          if (result.matched && result.fiscal) {
            this.applyFiscal(result.fiscal);
          }
          this.step.set('fiscal');
        },
        error: (error: HttpErrorResponse) => {
          this.identifyLoading.set(false);
          if (error.status === 404) {
            this.toast.error('Recibo no encontrado. Revisa el folio completo.');
            return;
          }
          if (this.handleAlreadyInvoiced(error, preview.code)) {
            return;
          }
          this.toast.error(resolveHttpErrorMessage(error, 'No se pudo continuar. Revisa correo y teléfono.'));
        },
      });
  }

  submitStamp(): void {
    const preview = this.preview();
    if (!preview || this.fiscalForm.invalid || this.stampLoading()) {
      this.fiscalForm.markAllAsTouched();
      return;
    }

    const value = this.fiscalForm.getRawValue();
    const payload: SelfInvoiceStampPayload = {
      email: this.trimmedEmail(),
      phone: this.trimmedPhone(),
      fiscal_rfc: this.toSatUpper(value.fiscal_rfc),
      fiscal_person_type: (value.fiscal_person_type ?? '').trim().toLowerCase(),
      fiscal_razon_social: this.toSatUpper(value.fiscal_razon_social),
      fiscal_postal_code: (value.fiscal_postal_code ?? '').trim(),
      fiscal_country: this.toSatUpper(value.fiscal_country) || SAT_COUNTRY_MEX,
      uso_cfdi: (value.uso_cfdi ?? '').trim(),
      regimen_fiscal_receptor: (value.regimen_fiscal_receptor ?? '').trim(),
      forma_pago: (value.forma_pago ?? '').trim(),
      metodo_pago: (value.metodo_pago ?? '').trim() || 'PUE',
    };

    const street = this.toSatUpper(value.fiscal_street);
    const exterior = this.toSatUpper(value.fiscal_exterior_number);
    const interior = this.toSatUpper(value.fiscal_interior_number);
    const colonia = this.toSatUpper(value.fiscal_colonia);
    const localidad = this.toSatUpper(value.fiscal_localidad);
    const municipio = (value.fiscal_municipio ?? '').trim();
    const state = (value.fiscal_state ?? '').trim();

    if (street) payload.fiscal_street = street;
    if (exterior) payload.fiscal_exterior_number = exterior;
    if (interior) payload.fiscal_interior_number = interior;
    if (colonia) payload.fiscal_colonia = colonia;
    if (localidad) payload.fiscal_localidad = localidad;
    if (municipio) payload.fiscal_municipio = municipio;
    if (state) payload.fiscal_state = state;

    this.stampLoading.set(true);
    this.api.stamp(preview.code, payload).subscribe({
      next: (result) => {
        this.stampLoading.set(false);
        this.success.set(result);
        this.issued.set({
          uuid: result.uuid,
          pdf_url: result.pdf_url,
          pdf_file_name: result.pdf_file_name,
          invoice_id: result.invoice_id,
          stamp_status: result.stamp_status,
        });
        this.step.set('success');
      },
      error: (error: HttpErrorResponse) => {
        this.stampLoading.set(false);
        if (this.handleAlreadyInvoiced(error, preview.code)) {
          return;
        }
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo timbrar la factura.'), {
          duration: 12000,
        });
      },
    });
  }

  goBackToIdentify(): void {
    if (this.stampLoading()) {
      return;
    }
    this.step.set('identify');
  }

  goToOtherReceipt(): void {
    void this.router.navigate(['/facturar'], { queryParamsHandling: 'preserve' });
  }

  downloadPdf(): void {
    const preview = this.preview();
    const issued = this.issued() ?? this.successAsIssued();
    if (!preview || this.pdfLoading()) {
      return;
    }
    if (issued?.pdf_url) {
      window.open(issued.pdf_url, '_blank', 'noopener,noreferrer');
      return;
    }

    this.pdfLoading.set(true);
    this.api.getInvoicePdf(preview.code).subscribe({
      next: (link) => {
        this.pdfLoading.set(false);
        if (!link.signedUrl) {
          this.toast.error('No se recibió la URL del PDF');
          return;
        }
        window.open(link.signedUrl, '_blank', 'noopener,noreferrer');
      },
      error: (error: HttpErrorResponse) => {
        this.pdfLoading.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'Error al descargar el PDF'));
      },
    });
  }

  downloadXml(): void {
    const preview = this.preview();
    if (!preview || this.xmlLoading()) {
      return;
    }
    this.xmlLoading.set(true);
    this.api.getInvoiceXml(preview.code).subscribe({
      next: ({ blob, filename }) => {
        this.xmlLoading.set(false);
        this.saveBlob(blob, filename);
      },
      error: (error: HttpErrorResponse) => {
        this.xmlLoading.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'Error al descargar el XML'));
      },
    });
  }

  formatCurrency(value: number | string | undefined | null): string {
    const amount = Number(value);
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
      Number.isFinite(amount) ? amount : 0
    );
  }

  controlInvalid(controlName: string): boolean {
    const control = this.fiscalForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  identifyInvalid(controlName: string): boolean {
    const control = this.identifyForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  private bindFolioUppercase(): void {
    this.folioForm.controls.code.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (typeof value !== 'string') {
          return;
        }
        const next = normalizePublicInvoiceCode(value);
        if (next !== value) {
          this.folioForm.controls.code.setValue(next, { emitEvent: false });
        }
      });
  }

  private loadPreview(code: string, force = false): void {
    const current = this.preview();
    if (
      !force &&
      current &&
      current.code === code &&
      this.step() !== 'folio' &&
      !this.previewLoading()
    ) {
      return;
    }

    this.previewLoading.set(true);
    this.success.set(null);
    this.api.getPreview(code).subscribe({
      next: (preview) => {
        this.previewLoading.set(false);
        this.preview.set({
          ...preview,
          code: preview.code || code,
        });
        this.applyCatalogs(preview);
        this.issued.set(preview.invoice);
        if (preview.already_invoiced) {
          this.step.set('downloads');
          return;
        }
        this.step.set('identify');
      },
      error: (error: HttpErrorResponse) => {
        this.previewLoading.set(false);
        this.preview.set(null);
        this.issued.set(null);
        this.step.set('folio');
        if (error.status === 404) {
          this.toast.error('Recibo no encontrado. Revisa el folio completo.');
          return;
        }
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo cargar el recibo.'));
      },
    });
  }

  private resetToFolioLanding(): void {
    this.step.set('folio');
    this.preview.set(null);
    this.issued.set(null);
    this.success.set(null);
    this.previewLoading.set(false);
  }

  private applyCatalogs(preview: SelfInvoicePreview): void {
    this.usoCfdiOptions.set(preview.catalogs.uso_cfdi);
    this.regimenOptions.set(preview.catalogs.regimen_fiscal_receptor);
    this.formaPagoOptions.set(preview.catalogs.forma_pago);
    this.metodoPagoOptions.set(preview.catalogs.metodo_pago);
  }

  private applyFiscal(fiscal: SelfInvoiceFiscalData): void {
    this.fiscalForm.patchValue({
      fiscal_rfc: fiscal.fiscal_rfc,
      fiscal_person_type: resolveFiscalPersonType(fiscal.fiscal_person_type, fiscal.fiscal_rfc),
      fiscal_razon_social: fiscal.fiscal_razon_social,
      fiscal_postal_code: fiscal.fiscal_postal_code,
      fiscal_country: fiscal.fiscal_country || SAT_COUNTRY_MEX,
      fiscal_street: fiscal.fiscal_street,
      fiscal_exterior_number: fiscal.fiscal_exterior_number,
      fiscal_interior_number: fiscal.fiscal_interior_number,
      fiscal_colonia: fiscal.fiscal_colonia,
      fiscal_localidad: fiscal.fiscal_localidad,
      fiscal_municipio: fiscal.fiscal_municipio,
      fiscal_state: fiscal.fiscal_state,
    });
  }

  private applySuggested(suggested: { uso_cfdi: string; regimen_fiscal_receptor: string; forma_pago: string; metodo_pago: string } | null): void {
    const uso = suggested?.uso_cfdi ?? '';
    const regimen = suggested?.regimen_fiscal_receptor ?? '';
    const forma = suggested?.forma_pago ?? '';
    const metodo = suggested?.metodo_pago || 'PUE';
    this.usoCfdiOptions.set(this.ensureOption(this.usoCfdiOptions(), uso));
    this.regimenOptions.set(this.ensureOption(this.regimenOptions(), regimen));
    this.formaPagoOptions.set(this.ensureOption(this.formaPagoOptions(), forma));
    this.metodoPagoOptions.set(this.ensureOption(this.metodoPagoOptions(), metodo));
    this.fiscalForm.patchValue({
      uso_cfdi: uso,
      regimen_fiscal_receptor: regimen,
      forma_pago: forma,
      metodo_pago: metodo,
    });
  }

  private resetFiscalForm(): void {
    this.fiscalForm.reset({
      fiscal_rfc: '',
      fiscal_person_type: '',
      fiscal_razon_social: '',
      fiscal_postal_code: '',
      fiscal_country: SAT_COUNTRY_MEX,
      fiscal_street: '',
      fiscal_exterior_number: '',
      fiscal_interior_number: '',
      fiscal_colonia: '',
      fiscal_localidad: '',
      fiscal_municipio: '',
      fiscal_state: '',
      uso_cfdi: '',
      regimen_fiscal_receptor: '',
      forma_pago: '',
      metodo_pago: 'PUE',
    });
  }

  private handleAlreadyInvoiced(error: HttpErrorResponse, code: string): boolean {
    const message = resolveHttpErrorMessage(error, '');
    const apiCode = String(
      (error.error && typeof error.error === 'object' && 'code' in error.error
        ? (error.error as { code?: string }).code
        : '') ?? ''
    ).toUpperCase();
    const already =
      apiCode === 'ALREADY_INVOICED' || isAlreadyInvoicedMessage(message);
    if (error.status !== 400 || !already) {
      return false;
    }
    this.api.getPreview(code).subscribe({
      next: (preview) => {
        this.preview.set(preview);
        this.applyCatalogs(preview);
        this.issued.set(preview.invoice);
        this.step.set('downloads');
      },
      error: () => this.step.set('downloads'),
    });
    return true;
  }

  private bindSatUppercase(): void {
    for (const name of ['fiscal_rfc', 'fiscal_razon_social', 'fiscal_street', 'fiscal_colonia'] as const) {
      const control = this.fiscalForm.controls[name];
      control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
        if (typeof value !== 'string') {
          return;
        }
        const next = this.toSatUpper(value);
        if (next !== value) {
          control.setValue(next, { emitEvent: false });
        }
      });
    }
  }

  private bindRfcPersonType(): void {
    this.fiscalForm.controls.fiscal_rfc.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((rfc) => {
        const inferred = inferFiscalPersonTypeFromRfc(rfc);
        if (!inferred) {
          return;
        }
        const current = (this.fiscalForm.controls.fiscal_person_type.value ?? '').trim().toLowerCase();
        if (!current || !isValidFiscalPersonType(current)) {
          this.fiscalForm.controls.fiscal_person_type.setValue(inferred, { emitEvent: false });
        }
      });
  }

  private ensureOption(list: SelfInvoiceCatalogOption[], code: string): SelfInvoiceCatalogOption[] {
    const trimmed = code.trim();
    if (!trimmed || list.some((item) => item.code === trimmed)) {
      return list;
    }
    return [...list, { code: trimmed, label: trimmed }];
  }

  private trimmedEmail(): string {
    return (this.identifyForm.controls.email.value ?? '').trim();
  }

  private trimmedPhone(): string {
    return (this.identifyForm.controls.phone.value ?? '').replace(/\D/g, '').slice(-10);
  }

  private toSatUpper(value: string | null | undefined): string {
    return (value ?? '').trim().toUpperCase();
  }

  private successAsIssued(): SelfInvoiceIssued | null {
    const result = this.success();
    if (!result) {
      return null;
    }
    return {
      uuid: result.uuid,
      pdf_url: result.pdf_url,
      pdf_file_name: result.pdf_file_name,
      invoice_id: result.invoice_id,
      stamp_status: result.stamp_status,
    };
  }

  private saveBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.rel = 'noopener';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }
}
