import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomerService } from '../../../../core/services/customer.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import {
  Customer,
  CustomerCreditsUpdateItem,
  CustomerFiscalCredit,
} from '../../models/customer-group.model';
import { SlimSwitchComponent } from '../../../../core/components/slim-switch/slim-switch.component';
import { CreditUsageBarComponent } from '../credit-usage-bar/credit-usage-bar.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import {
  creditsFromCustomer,
  isCustomerCreditEnabled,
  isTruthyFlag,
  unwrapCustomerPayload,
} from '../../utils/customer-credit.util';

interface CreditCardDraft {
  fiscal_configuration_id: string;
  razon_social: string;
  rfc: string;
  credit_enabled: boolean;
  credit_days: string;
  credit_amount: string;
  credit_used: number;
  credit_available: number;
  credit_usage_percent: number;
}

@Component({
  selector: 'app-customer-fiscal-credits',
  standalone: true,
  imports: [CommonModule, FormsModule, SlimSwitchComponent, CreditUsageBarComponent, ButtonComponent],
  template: `
    @if (walkIn) {
      <p class="fiscal-credits__empty">El mostrador no puede tener crédito.</p>
    } @else if (!customerId) {
      <p class="fiscal-credits__empty">Guarda el cliente para configurar crédito por razón social.</p>
    } @else if (loading()) {
      <p class="fiscal-credits__empty">Cargando crédito por razón social...</p>
    } @else if (credits().length === 0) {
      <p class="fiscal-credits__empty">No hay razones sociales para asignar crédito.</p>
    } @else {
      <div class="fiscal-credits">
        @for (item of credits(); track item.fiscal_configuration_id) {
          <article class="fiscal-credits__card">
            <header class="fiscal-credits__head">
              <h4>{{ item.razon_social }}</h4>
              <p>RFC {{ item.rfc || '—' }}</p>
            </header>

            <app-slim-switch
              label="Activar crédito"
              [checked]="item.credit_enabled"
              [disabled]="!canEdit || saving()"
              (checkedChange)="setEnabled(item.fiscal_configuration_id, $event)">
            </app-slim-switch>

            @if (!item.credit_enabled) {
              <div class="fiscal-credits__dash">
                <div>
                  <span>Días de crédito</span>
                  <strong>—</strong>
                </div>
                <div>
                  <span>Monto de crédito</span>
                  <strong>—</strong>
                </div>
              </div>
            } @else {
              <div class="fiscal-credits__fields">
                <label>
                  <span>Días de crédito</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    [ngModel]="item.credit_days"
                    (ngModelChange)="patchCard(item.fiscal_configuration_id, { credit_days: $event })"
                    [disabled]="!canEdit || saving()" />
                </label>
                <label>
                  <span>Monto de crédito</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    [ngModel]="item.credit_amount"
                    (ngModelChange)="patchCard(item.fiscal_configuration_id, { credit_amount: $event })"
                    [disabled]="!canEdit || saving()" />
                </label>
              </div>
              <app-credit-usage-bar
                [used]="item.credit_used"
                [available]="item.credit_available"
                [limit]="+item.credit_amount || 0"
                [percent]="item.credit_usage_percent"
                [days]="item.credit_days !== '' ? +item.credit_days : null">
              </app-credit-usage-bar>
            }
          </article>
        }

        @if (canEdit && showSaveButton) {
          <app-button
            text="Guardar crédito"
            variant="primary"
            size="sm"
            [fullWidth]="false"
            [loading]="saving()"
            [disabled]="!canSave() || saving()"
            (clicked)="save()">
          </app-button>
        }
      </div>
    }
  `,
  styles: [`
    .fiscal-credits {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .fiscal-credits__empty {
      margin: 0;
      font-size: 0.875rem;
      color: #64748b;
    }

    .fiscal-credits__card {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 0.9rem;
      border: 1px solid #e0e7ff;
      border-radius: 12px;
      background: #fafbff;
    }

    .fiscal-credits__head h4 {
      margin: 0;
      font-size: 0.92rem;
      font-weight: 700;
      color: #1e293b;
    }

    .fiscal-credits__head p {
      margin: 0.15rem 0 0;
      font-size: 0.75rem;
      color: #64748b;
    }

    .fiscal-credits__dash,
    .fiscal-credits__fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .fiscal-credits__dash span,
    .fiscal-credits__fields span {
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.72rem;
      font-weight: 600;
      color: #64748b;
    }

    .fiscal-credits__dash strong {
      color: #334155;
      font-weight: 500;
    }

    .fiscal-credits__fields input {
      width: 100%;
      height: 2.25rem;
      padding: 0 0.65rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 0.875rem;
      box-sizing: border-box;
    }
  `],
})
export class CustomerFiscalCreditsComponent implements OnChanges {
  @Input() customerId: string | number | null = null;
  @Input() canEdit = false;
  @Input() walkIn = false;
  /** En el modal de cliente el crédito se guarda con Actualizar, no con este botón. */
  @Input() showSaveButton = true;

  private readonly customerService = inject(CustomerService);
  private readonly interceptor = inject(InterceptorService);

  credits = signal<CreditCardDraft[]>([]);
  loading = signal(false);
  saving = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customerId'] || changes['walkIn']) {
      this.load();
    }
  }

  setEnabled(id: string, enabled: boolean): void {
    this.patchCard(id, { credit_enabled: enabled });
  }

  patchCard(id: string, patch: Partial<CreditCardDraft>): void {
    this.credits.update((list) =>
      list.map((item) => (item.fiscal_configuration_id === id ? { ...item, ...patch } : item))
    );
  }

  canSave(): boolean {
    if (!this.canEdit || this.walkIn || !this.customerId) {
      return false;
    }
    return !this.hasInvalidEnabledCredit();
  }

  hasInvalidEnabledCredit(): boolean {
    return this.credits().some((item) => {
      if (!item.credit_enabled) {
        return false;
      }
      const days = Number(item.credit_days);
      const amount = Number(item.credit_amount);
      return !(Number.isFinite(days) && days >= 0 && Number.isFinite(amount) && amount > 0);
    });
  }

  /** Payload para PUT /customers/:id/credits. Null si no hay nada que enviar. */
  buildUpdateItems(): CustomerCreditsUpdateItem[] | null {
    if (this.walkIn || !this.customerId || this.loading() || this.credits().length === 0) {
      return null;
    }
    return this.credits().map((item) => ({
      fiscal_configuration_id: item.fiscal_configuration_id,
      credit_enabled: item.credit_enabled,
      credit_days: item.credit_enabled ? Number(item.credit_days) : null,
      credit_amount: item.credit_enabled ? Number(item.credit_amount) : null,
    }));
  }

  save(): void {
    const id = this.customerId;
    if (!id || !this.canSave() || this.saving()) {
      return;
    }

    const perRazon = this.buildUpdateItems();
    if (!perRazon?.length) {
      return;
    }

    this.saving.set(true);
    this.customerService
      .updateCustomerCredits(String(id), perRazon)
      .pipe(
        switchMap((credits) =>
          this.customerService.getCustomer(String(id)).pipe(
            catchError(() => of(null)),
            map((raw) => ({ customer: unwrapCustomerPayload(raw), credits }))
          )
        )
      )
      .subscribe({
        next: ({ customer, credits }) => {
          this.saving.set(false);
          this.credits.set(this.draftsFromCustomer(customer, credits));
          this.interceptor.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: 'Crédito actualizado',
          });
        },
        error: (error) => {
          this.saving.set(false);
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: error?.error?.message || 'No se pudo actualizar el crédito',
          });
        },
      });
  }

  private load(): void {
    if (this.walkIn || !this.customerId) {
      this.credits.set([]);
      this.loading.set(false);
      return;
    }

    const id = String(this.customerId);
    this.loading.set(true);
    forkJoin({
      customer: this.customerService.getCustomer(id).pipe(catchError(() => of(null))),
      credits: this.customerService.getCustomerCredits(id).pipe(
        catchError(() => of([] as CustomerFiscalCredit[]))
      ),
    }).subscribe({
      next: ({ customer, credits }) => {
        const unwrapped = unwrapCustomerPayload(customer);
        const fromCustomer = creditsFromCustomer(unwrapped);
        this.credits.set(this.draftsFromCustomer(unwrapped, credits.length ? credits : fromCustomer));
        this.loading.set(false);
      },
      error: () => {
        this.credits.set([]);
        this.loading.set(false);
      },
    });
  }

  /** Opciones del tab Crédito: solo `credits[]` (fiscal_configuration_id + razon_social), no almacenes. */
  private draftsFromCustomer(
    customer: Customer | null,
    listed: CustomerFiscalCredit[]
  ): CreditCardDraft[] {
    const drafts = listed
      .filter((item) => !!item.fiscal_configuration_id)
      .map((item) => this.toDraft(item));
    if (!isCustomerCreditEnabled(customer) || drafts.some((item) => item.credit_enabled)) {
      return drafts;
    }
    return drafts.map((item) => ({
      ...item,
      credit_enabled: true,
      credit_days: customer?.credit_days != null ? String(customer.credit_days) : item.credit_days,
      credit_amount: customer?.credit_amount != null ? String(customer.credit_amount) : item.credit_amount,
      credit_used: Number(customer?.credit_used ?? item.credit_used),
      credit_available: Number(customer?.credit_available ?? item.credit_available),
      credit_usage_percent: Number(customer?.credit_usage_percent ?? item.credit_usage_percent),
    }));
  }

  private toDraft(credit: CustomerFiscalCredit): CreditCardDraft {
    const enabled = isTruthyFlag(credit.credit_enabled);
    return {
      fiscal_configuration_id: String(credit.fiscal_configuration_id),
      razon_social: credit.razon_social || 'Razón social',
      rfc: credit.rfc || '',
      credit_enabled: enabled,
      credit_days: credit.credit_days != null ? String(credit.credit_days) : '',
      credit_amount: credit.credit_amount != null ? String(credit.credit_amount) : '',
      credit_used: Number(credit.credit_used ?? 0),
      credit_available: Number(credit.credit_available ?? 0),
      credit_usage_percent: Number(credit.credit_usage_percent ?? 0),
    };
  }
}
