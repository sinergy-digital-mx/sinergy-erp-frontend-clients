import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ServiceSubscriptionService } from '../../services/service-subscription.service';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';

interface LookupItem {
  id: string | number;
  label: string;
}

interface UomOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-service-subscription-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './service-subscription-form.component.html',
})
export class ServiceSubscriptionFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly api = inject(ServiceSubscriptionService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly base = environment.api;

  readonly saving = signal(false);
  readonly customers = signal<LookupItem[]>([]);
  readonly products = signal<LookupItem[]>([]);
  readonly uoms = signal<UomOption[]>([]);
  readonly fiscals = signal<LookupItem[]>([]);
  readonly branches = signal<LookupItem[]>([]);

  readonly form = this.fb.nonNullable.group({
    customer_search: [''],
    customer_id: [null as number | null, Validators.required],
    title: ['', Validators.required],
    monthly_amount: [0, [Validators.required, Validators.min(0.01)]],
    iva_percentage: [16, [Validators.required, Validators.min(0)]],
    start_month: ['', Validators.required],
    end_month: ['', Validators.required],
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

  constructor() {
    this.loadFiscals();
    this.loadBranches();
  }

  searchCustomers(): void {
    const search = this.form.controls.customer_search.value.trim();
    if (search.length < 2) return;
    const params = new HttpParams().set('search', search).set('limit', '8');
    this.http.get<unknown>(`${this.base}/tenant/customers`, { params }).subscribe({
      next: (response) => {
        const rows = unwrapList(response);
        this.customers.set(
          rows.map((row) => ({
            id: Number(row['id']),
            label: [row['fiscal_razon_social'], row['company_name'], row['name'], row['lastname']]
              .filter((part) => typeof part === 'string' && part.trim())
              .slice(0, 2)
              .join(' · '),
          })),
        );
      },
    });
  }

  pickCustomer(item: LookupItem): void {
    this.form.patchValue({ customer_id: Number(item.id), customer_search: item.label });
    this.customers.set([]);
  }

  searchProducts(): void {
    const search = this.form.controls.product_search.value.trim();
    if (search.length < 2) return;
    const params = new HttpParams()
      .set('search', search)
      .set('item_kind', 'service')
      .set('limit', '8');
    this.http.get<unknown>(`${this.base}/tenant/products`, { params }).subscribe({
      next: (response) => {
        const rows = unwrapList(response);
        this.products.set(
          rows.map((row) => ({
            id: String(row['id']),
            label: `${row['sku'] ?? ''} ${row['name'] ?? ''}`.trim(),
          })),
        );
      },
    });
  }

  pickProduct(item: LookupItem): void {
    this.form.patchValue({ product_id: String(item.id), product_search: item.label, product_uom_id: '' });
    this.products.set([]);
    this.http.get<unknown>(`${this.base}/tenant/products/${item.id}/uoms`).subscribe({
      next: (response) => {
        const rows = unwrapList(response);
        this.uoms.set(
          rows.map((row) => {
            const uom = row['uom'] as { name?: string } | undefined;
            return { id: String(row['id']), label: uom?.name || 'Unidad' };
          }),
        );
        const first = this.uoms()[0];
        if (first) this.form.patchValue({ product_uom_id: first.id });
      },
    });
  }

  save(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      this.toast.error('Completa los datos de la suscripción');
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

  private loadFiscals(): void {
    const params = new HttpParams().set('limit', '100');
    this.http.get<unknown>(`${this.base}/tenant/fiscal-configurations`, { params }).subscribe({
      next: (response) => {
        this.fiscals.set(
          unwrapList(response).map((row) => ({
            id: String(row['id']),
            label: String(row['razon_social'] ?? 'Razón social'),
          })),
        );
      },
    });
  }

  private loadBranches(): void {
    this.http.get<unknown>(`${this.base}/tenant/billing/branches`).subscribe({
      next: (response) => {
        this.branches.set(
          unwrapList(response).map((row) => ({
            id: String(row['id']),
            label: String(row['code'] ?? row['name'] ?? 'Sucursal'),
            fiscalId: String(row['fiscal_configuration_id'] ?? ''),
          })) as LookupItem[],
        );
      },
    });
  }
}

function unwrapList(response: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(response)) return response as Array<Record<string, unknown>>;
  if (response && typeof response === 'object' && Array.isArray((response as { data?: unknown }).data)) {
    return (response as { data: Array<Record<string, unknown>> }).data;
  }
  return [];
}
