import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, X } from 'lucide-angular';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ServiceSubscriptionService } from '../../services/service-subscription.service';
import {
  ServiceSubscriptionDetail,
  ServiceSubscriptionPeriod,
} from '../../models/service-subscription.model';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { AuthService } from '../../../../core/services/auth.service';
import { SERVICE_SUBSCRIPTION_PERMISSIONS } from '../../config/permissions.config';
import {
  CFDI_FORMA_PAGO_OPTIONS,
  CFDI_REGIMEN_RECEPTOR_OPTIONS,
  CFDI_USO_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  catalogLabel,
  coveragePercent,
  formatShortDate,
  moneyMx,
  subscriptionStatusLabel,
  withTax,
} from '../../utils/service-subscription-display.util';

interface OrderOption {
  id: string;
  folio: string;
  total: number;
  created_at: string;
}

@Component({
  selector: 'app-service-subscription-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent, LucideAngularModule],
  templateUrl: './service-subscription-detail.component.html',
  styleUrl: '../../styles/service-subscriptions.scss',
})
export class ServiceSubscriptionDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ServiceSubscriptionService);
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  private readonly auth = inject(AuthService);

  readonly ArrowLeft = ArrowLeft;
  readonly X = X;
  readonly money = moneyMx;
  readonly statusLabel = subscriptionStatusLabel;
  readonly coverage = coveragePercent;
  readonly withTax = withTax;
  readonly shortDate = formatShortDate;

  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly confirmingCancel = signal(false);
  readonly ordersLoading = signal(false);
  readonly detail = signal<ServiceSubscriptionDetail | null>(null);
  readonly linkingPeriod = signal<ServiceSubscriptionPeriod | null>(null);
  readonly orders = signal<OrderOption[]>([]);
  readonly canUpdate = this.auth.hasPermission(SERVICE_SUBSCRIPTION_PERMISSIONS.update);
  readonly canCreate = this.auth.hasPermission(SERVICE_SUBSCRIPTION_PERMISSIONS.create);

  constructor() {
    this.route.paramMap.subscribe(() => this.reload());
  }

  @HostListener('document:keydown.escape')
  closeLink(): void {
    this.linkingPeriod.set(null);
  }

  reload(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.loading.set(true);
    this.confirmingCancel.set(false);
    this.linkingPeriod.set(null);
    this.api.get(id).subscribe({
      next: (detail) => {
        this.detail.set(detail);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo abrir la suscripción'));
      },
    });
  }

  catalog(kind: 'uso' | 'forma' | 'metodo' | 'regimen', id: string): string {
    const options = {
      uso: CFDI_USO_OPTIONS,
      forma: CFDI_FORMA_PAGO_OPTIONS,
      metodo: PAYMENT_METHOD_OPTIONS,
      regimen: CFDI_REGIMEN_RECEPTOR_OPTIONS,
    }[kind];
    return catalogLabel(options, id);
  }

  generate(period: ServiceSubscriptionPeriod): void {
    const detail = this.detail();
    if (!detail || this.busy()) return;
    this.run(this.api.generate(detail.id, period.id), 'Orden generada');
  }

  invoice(period: ServiceSubscriptionPeriod): void {
    const detail = this.detail();
    if (!detail || this.busy()) return;
    this.run(this.api.invoice(detail.id, period.id), 'Factura enviada a timbrar');
  }

  skip(period: ServiceSubscriptionPeriod): void {
    const detail = this.detail();
    if (!detail || this.busy()) return;
    this.run(this.api.skip(detail.id, period.id), 'Mes omitido');
  }

  unlink(period: ServiceSubscriptionPeriod): void {
    const detail = this.detail();
    if (!detail || this.busy()) return;
    this.run(this.api.unlink(detail.id, period.id), 'Orden desvinculada');
  }

  openLink(period: ServiceSubscriptionPeriod): void {
    const detail = this.detail();
    if (!detail) return;
    this.linkingPeriod.set(period);
    this.orders.set([]);
    this.ordersLoading.set(true);
    const params = new HttpParams()
      .set('customer_id', String(detail.customer_id))
      .set('page', '1')
      .set('limit', '20');
    this.http.get<unknown>(`${environment.api}/tenant/sales-orders`, { params }).subscribe({
      next: (response) => {
        const rows = Array.isArray((response as { data?: unknown }).data)
          ? (response as { data: Array<Record<string, unknown>> }).data
          : [];
        this.orders.set(
          rows.map((row) => ({
            id: String(row['id']),
            folio: String(row['folio'] ?? ''),
            total: Number(row['total'] ?? 0),
            created_at: String(row['created_at'] ?? ''),
          })),
        );
        this.ordersLoading.set(false);
      },
      error: (err) => {
        this.ordersLoading.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudieron cargar las órdenes'));
      },
    });
  }

  confirmLink(order: OrderOption): void {
    const detail = this.detail();
    const period = this.linkingPeriod();
    if (!detail || !period) return;
    this.linkingPeriod.set(null);
    this.run(this.api.link(detail.id, period.id, order.id), 'Orden vinculada a ese mes');
  }

  renew(): void {
    const detail = this.detail();
    if (!detail || this.busy()) return;
    this.busy.set(true);
    this.api.renew(detail.id).subscribe({
      next: (created) => {
        this.busy.set(false);
        this.toast.success('Renovación creada');
        this.router.navigate(['/service-subscriptions', created.id]);
      },
      error: (err) => {
        this.busy.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo renovar'));
      },
    });
  }

  cancel(): void {
    const detail = this.detail();
    if (!detail || this.busy()) return;
    this.confirmingCancel.set(false);
    this.run(this.api.cancel(detail.id), 'Suscripción cancelada');
  }

  private run(request: Observable<ServiceSubscriptionDetail>, ok: string): void {
    this.busy.set(true);
    request.subscribe({
      next: (detail: ServiceSubscriptionDetail) => {
        this.detail.set(detail);
        this.busy.set(false);
        this.toast.success(ok);
      },
      error: (err: unknown) => {
        this.busy.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo completar'));
      },
    });
  }
}
