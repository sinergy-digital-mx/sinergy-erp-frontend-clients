import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';
import { ContractService } from '../../services/contract.service';
import { CustomerGroupDropdownComponent } from '../../../customers/components/customer-group-dropdown/customer-group-dropdown.component';
import { PolluxErrorStateComponent } from '../../../../core/components/pollux-error-state/pollux-error-state.component';
import {
  MonthlyIncomeAnalysis,
  MonthlyIncomeContractRow,
  MonthlyIncomeCurrencySummary,
  emptyCurrencySummary,
} from '../../models/monthly-income.model';
import { BUSINESS_TIME_ZONE } from '../../../../core/utils/api-datetime.util';
import { formatPolluxMoney } from '../../../../core/utils/pollux-money.util';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';

type ListFilter = 'all' | 'paid' | 'open' | 'unpaid' | 'partial' | 'prior';

@Component({
  selector: 'app-contract-metrics-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    MatTooltipModule,
    CustomerGroupDropdownComponent,
    PolluxErrorStateComponent,
  ],
  templateUrl: './contract-metrics-page.component.html',
  styleUrl: './contract-metrics-page.component.scss',
})
export class ContractMetricsPageComponent implements OnInit, OnDestroy {
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  readonly year = signal(this.businessMonth().year);
  readonly month = signal(this.businessMonth().month);
  readonly groupId = signal<string | null>(null);
  readonly currency = signal('USD');
  readonly listFilter = signal<ListFilter>('all');
  readonly search = signal('');
  readonly showUnscheduled = signal(false);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly analysis = signal<MonthlyIncomeAnalysis | null>(null);

  readonly summary = computed<MonthlyIncomeCurrencySummary>(() => {
    const found = this.analysis()?.currencies.find((row) => row.currency === this.currency());
    return found ?? emptyCurrencySummary(this.currency());
  });

  readonly currencyOptions = computed(() => {
    const codes = this.analysis()?.currencies.map((row) => row.currency) ?? [];
    return codes.length > 0 ? codes : [this.currency()];
  });

  readonly rows = computed(() => {
    const query = this.search().trim().toLowerCase();
    const filter = this.listFilter();
    return (this.analysis()?.contracts ?? []).filter((row) => {
      if (row.currency !== this.currency()) return false;
      if (filter === 'all' && row.month_expected <= 0) return false;
      if (filter === 'paid' && row.month_status !== 'paid') return false;
      if (filter === 'open' && row.month_pending <= 0) return false;
      if (filter === 'unpaid' && row.month_status !== 'unpaid') return false;
      if (filter === 'partial' && row.month_status !== 'partial') return false;
      if (filter === 'prior' && row.prior_amount <= 0) return false;
      if (!query) return true;
      return `${row.contract_number} ${row.customer_name}`.toLowerCase().includes(query);
    });
  });

  readonly unscheduled = computed(() =>
    (this.analysis()?.unscheduled.contracts ?? []).filter((row) => row.currency === this.currency()),
  );

  readonly monthRelation = computed<'current' | 'past' | 'future'>(() => {
    const now = this.businessMonth();
    const cursor = this.year() * 12 + this.month();
    const today = now.year * 12 + now.month;
    if (cursor === today) return 'current';
    return cursor < today ? 'past' : 'future';
  });

  readonly paceLine = computed(() => {
    const summary = this.summary();
    if (this.monthRelation() === 'future') {
      return 'Mes por venir. Es lo programado; todavía no vence.';
    }
    if (this.monthRelation() === 'past') {
      return 'Mes ya vencido. Arriba está lo que debió entrar y lo que de ese mes sigue abierto.';
    }
    if (summary.expected <= 0) return 'Este mes no hay mensualidades con vencimiento.';
    const day = this.businessDay();
    const days = new Date(this.year(), this.month(), 0).getDate();
    return `Día ${day} de ${days}. Va cobrado el ${summary.collection_pct.toFixed(0)}% de lo que entra este mes.`;
  });

  readonly quotaHint = computed(() => {
    const month = this.analysis()?.month_label ?? 'el mes';
    const summary = this.summary();
    const installments = summary.prior_installments;
    const contracts = summary.prior_contracts;
    return `Una cuota es una mensualidad que ya venció. ${installments} ${installments === 1 ? 'cuota es una mensualidad' : 'cuotas son mensualidades'} de meses anteriores a ${month} que siguen sin cubrirse, en ${contracts} ${contracts === 1 ? 'contrato' : 'contratos'}. No entran en lo que deberías recibir este mes.`;
  });

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly contracts: ContractService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const now = this.businessMonth();
      if (!params.get('year') || !params.get('month')) {
        void this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { year: now.year, month: now.month },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
        return;
      }
      const year = this.readInt(params.get('year'), now.year);
      const month = this.readInt(params.get('month'), now.month);
      this.year.set(year);
      this.month.set(month >= 1 && month <= 12 ? month : now.month);
      this.groupId.set(params.get('group_id'));
      this.reload();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  shiftMonth(delta: number): void {
    const next = new Date(this.year(), this.month() - 1 + delta, 1);
    this.go(next.getFullYear(), next.getMonth() + 1);
  }

  goToCurrentMonth(): void {
    const now = this.businessMonth();
    this.go(now.year, now.month);
  }

  onGroupSelect(event: { groupId: string | null }): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { group_id: event.groupId },
      queryParamsHandling: 'merge',
    });
  }

  selectCurrency(code: string): void {
    this.currency.set(code);
  }

  setListFilter(filter: ListFilter): void {
    this.listFilter.set(filter);
  }

  focusList(filter: ListFilter): void {
    this.listFilter.set(filter);
    this.search.set('');
    queueMicrotask(() => {
      document.getElementById('metrics-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  openContract(row: MonthlyIncomeContractRow): void {
    void this.router.navigate(['/contracts/detail', row.contract_id]);
  }

  money(amount: number, currency = this.currency()): string {
    return formatPolluxMoney(amount, currency);
  }

  statusLabel(status: MonthlyIncomeContractRow['month_status']): string {
    if (status === 'paid') return 'Al corriente';
    if (status === 'partial') return 'Parcial';
    if (status === 'unpaid') return 'Sin pago';
    return 'Solo atraso';
  }

  formatDay(value: string | null): string {
    if (!value) return '';
    const [year, month, day] = value.slice(0, 10).split('-');
    if (!year || !month || !day) return value;
    return `${day}/${month}/${year}`;
  }

  reload(): void {
    this.load();
  }

  private go(year: number, month: number): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { year, month },
      queryParamsHandling: 'merge',
    });
  }

  private load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.contracts.getMonthlyIncome(this.year(), this.month(), this.groupId()).subscribe({
      next: (income) => {
        this.analysis.set(income);
        const codes = income.currencies.map((row) => row.currency);
        if (codes.length > 0 && !codes.includes(this.currency())) {
          this.currency.set(codes[0]);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.analysis.set(null);
        this.error.set(resolveHttpErrorMessage(err, 'No se pudieron cargar las métricas.'));
      },
    });
  }

  private businessMonth(): { year: number; month: number } {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: BUSINESS_TIME_ZONE,
      year: 'numeric',
      month: 'numeric',
    }).formatToParts(new Date());
    return {
      year: Number(parts.find((part) => part.type === 'year')?.value),
      month: Number(parts.find((part) => part.type === 'month')?.value),
    };
  }

  private businessDay(): number {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: BUSINESS_TIME_ZONE,
      day: 'numeric',
    }).formatToParts(new Date());
    return Number(parts.find((part) => part.type === 'day')?.value);
  }

  private readInt(value: string | null, fallback: number): number {
    const parsed = Number(value);
    return Number.isInteger(parsed) ? parsed : fallback;
  }
}
