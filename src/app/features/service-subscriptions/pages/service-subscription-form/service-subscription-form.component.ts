import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ServiceSubscriptionService } from '../../services/service-subscription.service';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import {
  BILLING_DAYS,
  CFDI_FORMA_PAGO_OPTIONS,
  CFDI_REGIMEN_RECEPTOR_OPTIONS,
  CFDI_USO_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  SUBSCRIPTION_MONTH_OPTIONS,
  countMonths,
  defaultSubscriptionRange,
  joinYearMonth,
  listMonthLabels,
  moneyMx,
  monthOf,
  monthRangeIssue,
  subscriptionYearOptions,
  withTax,
  yearOf,
} from '../../utils/service-subscription-display.util';

interface LookupItem {
  id: string | number;
  label: string;
  name?: string;
}

interface BranchOption {
  id: string;
  label: string;
  fiscalId: string;
}

type LookupState = 'idle' | 'loading' | 'ready';

@Component({
  selector: 'app-service-subscription-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './service-subscription-form.component.html',
  styleUrl: '../../styles/service-subscriptions.scss',
})
export class ServiceSubscriptionFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly api = inject(ServiceSubscriptionService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly base = environment.api;
  private readonly initialRange = defaultSubscriptionRange();

  readonly ArrowLeft = ArrowLeft;
  readonly money = moneyMx;
  readonly monthOptions = SUBSCRIPTION_MONTH_OPTIONS;
  readonly yearOptions = subscriptionYearOptions();
  readonly billingDays = BILLING_DAYS;
  readonly ivaRates = [0, 8, 16];
  readonly usoOptions = CFDI_USO_OPTIONS;
  readonly formaOptions = CFDI_FORMA_PAGO_OPTIONS;
  readonly metodoOptions = PAYMENT_METHOD_OPTIONS;
  readonly regimenOptions = CFDI_REGIMEN_RECEPTOR_OPTIONS;

  readonly saving = signal(false);
  readonly customers = signal<LookupItem[]>([]);
  readonly products = signal<LookupItem[]>([]);
  readonly customerLookup = signal<LookupState>('idle');
  readonly productLookup = signal<LookupState>('idle');
  readonly selectedCustomer = signal<LookupItem | null>(null);
  readonly selectedProduct = signal<LookupItem | null>(null);
  readonly uoms = signal<LookupItem[]>([]);
  readonly fiscals = signal<LookupItem[]>([]);
  readonly branches = signal<BranchOption[]>([]);

  readonly form = this.fb.nonNullable.group({
    customer_search: [''],
    customer_id: [null as number | null, Validators.required],
    title: ['', [Validators.required, Validators.maxLength(160)]],
    monthly_amount: [0, [Validators.required, Validators.min(0.01)]],
    iva_percentage: [16, [Validators.required, Validators.min(0), Validators.max(100)]],
    start_month: [this.initialRange.start, Validators.required],
    end_month: [this.initialRange.end, Validators.required],
    billing_day: [1, [Validators.required, Validators.min(1), Validators.max(28)]],
    fiscal_configuration_id: ['', Validators.required],
    billing_branch_id: ['', Validators.required],
    product_search: [''],
    product_id: ['', Validators.required],
    product_uom_id: ['', Validators.required],
    uso_cfdi: ['G03', Validators.required],
    forma_pago: ['99', Validators.required],
    metodo_pago: ['PPD', Validators.required],
    regimen_fiscal_receptor: ['601', Validators.required],
    notes: [''],
  });

  readonly preview = toSignal(
    this.form.valueChanges.pipe(map(() => this.form.getRawValue())),
    { initialValue: this.form.getRawValue() },
  );

  constructor() {
    this.watchLookup('customer_search', this.customerLookup, this.customers, (search) => this.fetchCustomers(search));
    this.watchLookup('product_search', this.productLookup, this.products, (search) => this.fetchProducts(search));
    this.form.controls.fiscal_configuration_id.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.syncBranch();
    });
    this.loadFiscals();
    this.loadBranches();
  }

  yearOf(value: string): string {
    return yearOf(value);
  }

  monthOf(value: string): string {
    return monthOf(value);
  }

  onMonthChange(control: 'start_month' | 'end_month', part: 'year' | 'month', event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const current = this.form.controls[control].value;
    const year = part === 'year' ? value : yearOf(current);
    const month = part === 'month' ? value : monthOf(current);
    this.form.controls[control].setValue(joinYearMonth(year, month));
    this.form.controls[control].markAsTouched();
  }

  setIva(rate: number): void {
    this.form.controls.iva_percentage.setValue(rate);
  }

  sameRate(rate: number): boolean {
    return Number(this.preview().iva_percentage) === rate;
  }

  monthCount(): number | null {
    const value = this.preview();
    return countMonths(value.start_month, value.end_month);
  }

  monthCountLabel(): string {
    const count = this.monthCount();
    return count && count > 0 ? String(count) : '—';
  }

  serviceLabel(): string {
    return this.preview().title.trim() || 'Sin nombre';
  }

  monthIssue(): string | null {
    const value = this.preview();
    return monthRangeIssue(value.start_month, value.end_month);
  }

  monthLabels(): string[] {
    const value = this.preview();
    return listMonthLabels(value.start_month, value.end_month);
  }

  monthlyWithTax(): number {
    const value = this.preview();
    return withTax(Number(value.monthly_amount), Number(value.iva_percentage));
  }

  termTotal(): number {
    const count = this.monthCount();
    if (!count || count < 1) return 0;
    return this.monthlyWithTax() * count;
  }

  visibleBranches(): BranchOption[] {
    const fiscalId = this.form.controls.fiscal_configuration_id.value;
    const all = this.branches();
    if (!fiscalId) return all;
    return all.filter((item) => item.fiscalId === fiscalId);
  }

  pickCustomer(item: LookupItem): void {
    this.selectedCustomer.set(item);
    this.customers.set([]);
    this.customerLookup.set('idle');
    this.form.patchValue({ customer_id: Number(item.id), customer_search: item.label });
  }

  clearCustomer(): void {
    this.selectedCustomer.set(null);
    this.customers.set([]);
    this.customerLookup.set('idle');
    this.form.patchValue({ customer_id: null, customer_search: '' });
  }

  pickProduct(item: LookupItem): void {
    this.selectedProduct.set(item);
    this.products.set([]);
    this.productLookup.set('idle');
    const patch: { product_id: string; product_search: string; product_uom_id: string; title?: string } = {
      product_id: String(item.id),
      product_search: item.label,
      product_uom_id: '',
    };
    if (!this.form.controls.title.value.trim() && item.name) patch.title = item.name;
    this.form.patchValue(patch);
    this.loadUoms(String(item.id));
  }

  clearProduct(): void {
    this.selectedProduct.set(null);
    this.products.set([]);
    this.uoms.set([]);
    this.productLookup.set('idle');
    this.form.patchValue({ product_id: '', product_search: '', product_uom_id: '' });
  }

  closeLookup(kind: 'customer' | 'product'): void {
    setTimeout(() => {
      if (kind === 'customer') this.customerLookup.set('idle');
      else this.productLookup.set('idle');
    }, 180);
  }

  fieldError(name: 'customer_id' | 'title' | 'monthly_amount' | 'product_id' | 'product_uom_id' | 'fiscal_configuration_id' | 'billing_branch_id'): string | null {
    const control = this.form.controls[name];
    if (!control.touched || !control.invalid) return null;
    const messages: Partial<Record<typeof name, string>> = {
      customer_id: 'Elige un cliente de la lista',
      title: 'Escribe el nombre del servicio',
      monthly_amount: 'Indica el monto mensual',
      product_id: 'Elige un servicio de la lista',
      product_uom_id: 'Elige la unidad',
      fiscal_configuration_id: 'Elige la razón social',
      billing_branch_id: 'Elige la sucursal',
    };
    return messages[name] ?? 'Revisa este dato';
  }

  save(): void {
    const issue = this.monthIssue();
    if (this.form.invalid || issue || this.saving()) {
      this.form.markAllAsTouched();
      this.toast.error(issue || 'Completa los datos de la suscripción');
      return;
    }
    const value = this.form.getRawValue();
    this.saving.set(true);
    this.api
      .create({
        customer_id: Number(value.customer_id),
        title: value.title.trim(),
        monthly_amount: Number(value.monthly_amount),
        iva_percentage: Number(value.iva_percentage),
        fiscal_configuration_id: value.fiscal_configuration_id,
        billing_branch_id: value.billing_branch_id,
        product_id: value.product_id,
        product_uom_id: value.product_uom_id,
        start_month: value.start_month,
        end_month: value.end_month,
        billing_day: Number(value.billing_day),
        uso_cfdi: value.uso_cfdi,
        forma_pago: value.forma_pago,
        metodo_pago: value.metodo_pago,
        regimen_fiscal_receptor: value.regimen_fiscal_receptor,
        notes: value.notes.trim() || undefined,
      })
      .subscribe({
        next: (created) => {
          this.saving.set(false);
          this.toast.success('Suscripción creada');
          this.router.navigate(['/service-subscriptions', created.id]);
        },
        error: (err) => {
          this.saving.set(false);
          this.toast.error(resolveHttpErrorMessage(err, 'No se pudo crear la suscripción'));
        },
      });
  }

  private watchLookup(
    controlName: 'customer_search' | 'product_search',
    state: WritableSignal<LookupState>,
    target: WritableSignal<LookupItem[]>,
    fetch: (search: string) => void,
  ): void {
    this.form.controls[controlName].valueChanges
      .pipe(
        debounceTime(250),
        map((value) => value.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((search) => {
        if (search.length < 2 || this.lookupMatchesSelection(controlName, search)) {
          target.set([]);
          state.set('idle');
          return;
        }
        state.set('loading');
        fetch(search);
      });
  }

  private lookupMatchesSelection(controlName: 'customer_search' | 'product_search', search: string): boolean {
    const selected = controlName === 'customer_search' ? this.selectedCustomer() : this.selectedProduct();
    return !!selected && selected.label.trim() === search;
  }

  private fetchCustomers(search: string): void {
    const params = new HttpParams().set('search', search).set('limit', '8');
    this.http
      .get<unknown>(`${this.base}/tenant/customers`, { params })
      .pipe(catchError(() => of(null)), takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        if (this.form.controls.customer_search.value.trim() !== search) return;
        if (!response) {
          this.customerLookup.set('ready');
          this.customers.set([]);
          this.toast.error('No se pudieron buscar clientes');
          return;
        }
        this.customers.set(
          unwrapList(response).map((row) => ({
            id: Number(row['id']),
            label: customerLabel(row),
          })),
        );
        this.customerLookup.set('ready');
      });
  }

  private fetchProducts(search: string): void {
    const params = new HttpParams().set('search', search).set('item_kind', 'service').set('limit', '8');
    this.http
      .get<unknown>(`${this.base}/tenant/products`, { params })
      .pipe(catchError(() => of(null)), takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        if (this.form.controls.product_search.value.trim() !== search) return;
        if (!response) {
          this.productLookup.set('ready');
          this.products.set([]);
          this.toast.error('No se pudieron buscar servicios');
          return;
        }
        this.products.set(
          unwrapList(response).map((row) => {
            const sku = text(row['sku']);
            const name = text(row['name']) || 'Servicio';
            return {
              id: String(row['id']),
              name,
              label: sku ? `${sku} · ${name}` : name,
            };
          }),
        );
        this.productLookup.set('ready');
      });
  }

  private loadUoms(productId: string): void {
    this.http
      .get<unknown>(`${this.base}/tenant/products/${productId}/uoms`)
      .pipe(catchError(() => of(null)), takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        if (!response) {
          this.uoms.set([]);
          this.toast.error('No se pudieron cargar las unidades');
          return;
        }
        const options = unwrapList(response).map((row) => {
          const uom = row['uom'] as { name?: string } | undefined;
          return { id: String(row['id']), label: uom?.name || 'Unidad' };
        });
        this.uoms.set(options);
        if (options[0]) this.form.patchValue({ product_uom_id: String(options[0].id) });
      });
  }

  private loadFiscals(): void {
    const params = new HttpParams().set('limit', '100');
    this.http.get<unknown>(`${this.base}/tenant/fiscal-configurations`, { params }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.fiscals.set(
          unwrapList(response).map((row) => ({
            id: String(row['id']),
            label: text(row['razon_social']) || 'Razón social',
          })),
        );
        this.applyBillingDefaults();
      },
    });
  }

  private loadBranches(): void {
    this.http.get<unknown>(`${this.base}/tenant/billing/branches`).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.branches.set(
          unwrapList(response).map((row) => {
            const name = text(row['name']);
            const code = text(row['code']);
            const label = name && code && name !== code ? `${name} (${code})` : name || code || 'Sucursal';
            return {
              id: String(row['id']),
              label,
              fiscalId: String(row['fiscal_configuration_id'] ?? ''),
            };
          }),
        );
        this.applyBillingDefaults();
      },
    });
  }

  private applyBillingDefaults(): void {
    const fiscal = this.form.controls.fiscal_configuration_id;
    if (!fiscal.value && this.fiscals().length === 1) {
      fiscal.setValue(String(this.fiscals()[0].id));
    }
    this.syncBranch();
  }

  private syncBranch(): void {
    const options = this.visibleBranches();
    const branch = this.form.controls.billing_branch_id;
    const current = branch.value;
    if (current && options.some((item) => item.id === current)) return;
    branch.setValue(options.length === 1 ? options[0].id : '');
  }
}

function customerLabel(row: Record<string, unknown>): string {
  const person = [text(row['name']), text(row['lastname'])].filter(Boolean).join(' ');
  const company = text(row['fiscal_razon_social']) || text(row['company_name']) || person || 'Cliente';
  const rfc = text(row['fiscal_rfc']);
  return rfc ? `${company} · ${rfc}` : company;
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function unwrapList(response: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(response)) return response as Array<Record<string, unknown>>;
  if (response && typeof response === 'object' && Array.isArray((response as { data?: unknown }).data)) {
    return (response as { data: Array<Record<string, unknown>> }).data;
  }
  return [];
}
