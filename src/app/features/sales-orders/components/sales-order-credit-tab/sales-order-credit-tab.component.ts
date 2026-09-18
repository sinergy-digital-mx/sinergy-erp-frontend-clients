import { Component, Input, OnChanges, OnInit, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { AuthService } from '../../../../core/services/auth.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { CreditUsageBarComponent } from '../../../customers/components/credit-usage-bar/credit-usage-bar.component';
import { CUSTOMER_PERMISSIONS } from '../../../customers/config/permissions.config';
import {
  Customer,
  CustomerFiscalCredit,
} from '../../../customers/models/customer-group.model';
import {
  isCustomerCreditEnabled,
  pickCustomerCreditForFiscal,
  unwrapCustomerPayload,
} from '../../../customers/utils/customer-credit.util';
import { SalesOrder } from '../../models/sales-order.model';
import { resolveSalesOrderCustomerId, resolveSalesOrderCustomerName } from '../../utils/customer-display.util';
import { salesOrderCreditChipLabel } from '../../utils/sales-order-credit.util';

@Component({
  selector: 'app-sales-order-credit-tab',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, CreditUsageBarComponent],
  template: `
    <div class="so-credit-tab">
      @if (loading()) {
        <p class="so-credit-tab__empty"><app-spinner size="sm"></app-spinner></p>
      } @else if (walkIn) {
        <p class="so-credit-tab__empty">El mostrador no tiene crédito.</p>
      } @else if (!customerId || !fiscalId) {
        <p class="so-credit-tab__empty">Esta orden no tiene cliente o razón social para consultar crédito.</p>
      } @else if (error()) {
        <p class="so-credit-tab__empty">{{ error() }}</p>
      } @else {
        <article class="so-credit-tab__card">
          <header class="so-credit-tab__head">
            <h4>{{ razonLabel() }}</h4>
            @if (rfcLabel()) {
              <p>RFC {{ rfcLabel() }}</p>
            }
            <p>{{ customerName() }}</p>
          </header>

          @if (!creditEnabled()) {
            <div class="so-credit-tab__dash">
              <div>
                <span>Días de crédito</span>
                <strong>—</strong>
              </div>
              <div>
                <span>Monto de crédito</span>
                <strong>—</strong>
              </div>
            </div>
            <p class="so-credit-tab__hint">Este cliente no tiene crédito activo con esta razón social.</p>
          } @else {
            <app-credit-usage-bar
              [used]="credit()?.credit_used ?? 0"
              [available]="credit()?.credit_available ?? 0"
              [limit]="credit()?.credit_amount ?? 0"
              [percent]="credit()?.credit_usage_percent ?? 0"
              [days]="creditDays()">
            </app-credit-usage-bar>
          }

          @if (orderCreditLabel()) {
            <p class="so-credit-tab__order">Esta OV: {{ orderCreditLabel() }}</p>
          }

          @if (canOpenCustomerCredit()) {
            <button type="button" class="so-credit-tab__link" (click)="openCustomerCredit()">
              Ver ficha de crédito del cliente →
            </button>
          }
        </article>
      }
    </div>
  `,
  styles: [`
    .so-credit-tab {
      padding: 0.25rem 0 1rem;
    }

    .so-credit-tab__empty {
      margin: 0;
      font-size: 0.875rem;
      color: #64748b;
    }

    .so-credit-tab__card {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 36rem;
      padding: 0.95rem 1rem;
      border: 1px solid #e0e7ff;
      border-radius: 12px;
      background: #fafbff;
    }

    .so-credit-tab__head h4 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 700;
      color: #1e293b;
    }

    .so-credit-tab__head p {
      margin: 0.15rem 0 0;
      font-size: 0.75rem;
      color: #64748b;
    }

    .so-credit-tab__dash {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .so-credit-tab__dash span {
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.72rem;
      font-weight: 600;
      color: #64748b;
    }

    .so-credit-tab__dash strong {
      color: #334155;
      font-weight: 500;
    }

    .so-credit-tab__hint,
    .so-credit-tab__order {
      margin: 0;
      font-size: 0.8rem;
      color: #475569;
    }

    .so-credit-tab__order {
      font-weight: 600;
      color: #4b3e8e;
    }

    .so-credit-tab__link {
      align-self: flex-start;
      padding: 0;
      border: 0;
      background: none;
      color: #4b3e8e;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
    }

    .so-credit-tab__link:hover {
      text-decoration: underline;
    }
  `],
})
export class SalesOrderCreditTabComponent implements OnInit, OnChanges {
  @Input({ required: true }) order!: SalesOrder;

  private readonly customerService = inject(CustomerService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);
  credit = signal<CustomerFiscalCredit | null>(null);
  customerName = signal('Cliente');
  razonFallback = signal('');
  rfcFallback = signal('');

  get customerId(): string | number | null {
    return resolveSalesOrderCustomerId(this.order);
  }

  get fiscalId(): string {
    return String(
      this.order?.fiscal_configuration_id || this.order?.fiscal_configuration?.id || '',
    ).trim();
  }

  get walkIn(): boolean {
    return this.order?.customer_summary?.is_walk_in === true;
  }

  razonLabel(): string {
    return (
      this.credit()?.razon_social ||
      this.razonFallback() ||
      this.order?.razon_social ||
      this.order?.fiscal_configuration?.razon_social ||
      this.order?.fiscal_razon_social ||
      'Razón social'
    );
  }

  rfcLabel(): string {
    return this.credit()?.rfc || this.rfcFallback() || this.order?.fiscal_configuration?.rfc || '';
  }

  creditEnabled(): boolean {
    return isCustomerCreditEnabled({
      credit_enabled: this.credit()?.credit_enabled,
      credit_amount: this.credit()?.credit_amount,
      credit_days: this.credit()?.credit_days,
    } as Customer);
  }

  creditDays(): number | null {
    const days = this.credit()?.credit_days;
    if (days == null) {
      return null;
    }
    const n = Number(days);
    return Number.isFinite(n) ? n : null;
  }

  orderCreditLabel(): string {
    return salesOrderCreditChipLabel(this.order);
  }

  canOpenCustomerCredit(): boolean {
    return !!this.customerId && this.auth.hasPermission(CUSTOMER_PERMISSIONS.viewDetail);
  }

  ngOnInit(): void {
    this.loadCredit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'] && !changes['order'].firstChange) {
      this.loadCredit();
    }
  }

  openCustomerCredit(): void {
    const id = this.customerId;
    if (id == null) {
      return;
    }
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/customers/detail', id], { queryParams: { tab: 'credit' } }),
    );
    window.open(url, '_blank');
  }

  private loadCredit(): void {
    this.credit.set(null);
    this.error.set(null);
    this.customerName.set(resolveSalesOrderCustomerName(this.order, 'Cliente'));
    this.razonFallback.set(
      this.order?.razon_social ||
        this.order?.fiscal_configuration?.razon_social ||
        this.order?.fiscal_razon_social ||
        '',
    );
    this.rfcFallback.set(this.order?.fiscal_configuration?.rfc || '');

    if (this.walkIn || !this.customerId || !this.fiscalId) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.customerService
      .getCustomer(String(this.customerId), { fiscal_configuration_id: this.fiscalId })
      .subscribe({
        next: (raw) => {
          const customer = unwrapCustomerPayload(raw);
          const picked = pickCustomerCreditForFiscal(customer, this.fiscalId);
          this.credit.set(picked);
          if (customer) {
            this.customerName.set(
              `${customer.name || ''} ${customer.lastname || ''}`.trim() ||
                customer.company_name ||
                this.customerName(),
            );
          }
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('No se pudo cargar el crédito de esta razón social.');
        },
      });
  }
}
