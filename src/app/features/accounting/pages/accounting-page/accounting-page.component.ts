import { Component, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { ReportPeriod, ReportPeriodSelectorComponent } from '../../../../core/components/report-period-selector/report-period-selector.component';
import { AuthService } from '../../../../core/services/auth.service';
import { BranchService } from '../../../settings/services/branch.service';
import { Branch } from '../../../settings/models/branch.model';
import { AccountingPeriod, PosDaySummary } from '../../models/accounting.model';
import { PosSummaryTabComponent } from '../../components/pos-summary-tab/pos-summary-tab.component';
import { PosCollectionsTabComponent } from '../../components/pos-collections-tab/pos-collections-tab.component';
import { AccountsPayableTabComponent } from '../../components/accounts-payable-tab/accounts-payable-tab.component';
import { AccountsReceivableTabComponent } from '../../components/accounts-receivable-tab/accounts-receivable-tab.component';
import { CustomerDebtFlowComponent } from '../../components/customer-debt-flow/customer-debt-flow.component';
import { AverageCostReportTabComponent } from '../../components/average-cost-report-tab/average-cost-report-tab.component';

export type AccountingTab =
  | 'pos'
  | 'pos-collections'
  | 'payable'
  | 'receivable'
  | 'debt-flow'
  | 'average-cost';

@Component({
  selector: 'app-accounting-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabComponent,
    ReportPeriodSelectorComponent,
    PosSummaryTabComponent,
    PosCollectionsTabComponent,
    AccountsPayableTabComponent,
    AccountsReceivableTabComponent,
    CustomerDebtFlowComponent,
    AverageCostReportTabComponent,
  ],
  templateUrl: './accounting-page.component.html',
  styleUrl: './accounting-page.component.scss',
})
export class AccountingPageComponent implements OnInit, OnDestroy {
  @ViewChild(PosSummaryTabComponent) posTab?: PosSummaryTabComponent;
  @ViewChild(AccountsPayableTabComponent) payableTab?: AccountsPayableTabComponent;
  @ViewChild(AccountsReceivableTabComponent) receivableTab?: AccountsReceivableTabComponent;

  activeTab = signal<AccountingTab>('pos');
  period = signal<AccountingPeriod>('today');
  dateFrom = signal('');
  dateTo = signal('');
  billingBranchId = signal('');
  reloadToken = signal(0);

  branches = signal<Branch[]>([]);
  posSummary = signal<PosDaySummary>(this.emptyPosSummary());
  receivableSearchDraft = '';
  receivableSearch = signal('');
  private receivableSearchTimer: ReturnType<typeof setTimeout> | null = null;

  readonly menuTabs: TabItem[] = [
    { id: 'pos', title: 'Puntos de venta' },
    { id: 'pos-collections', title: 'Cobranza POS' },
    { id: 'payable', title: 'Cuentas por pagar' },
    { id: 'receivable', title: 'Cuentas por cobrar' },
    { id: 'debt-flow', title: 'Flujo de deuda' },
    { id: 'average-cost', title: 'Rep. Vent. Cost. Prom' },
  ];

  constructor(
    private branchService: BranchService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const initial = this.route.snapshot.data['tab'];
    if (typeof initial === 'string' && this.isAccountingTab(initial)) {
      this.activeTab.set(initial);
      if (initial === 'average-cost') {
        this.applyCurrentMonth();
      }
    }
    this.loadBranches();
  }

  ngOnDestroy(): void {
    if (this.receivableSearchTimer) clearTimeout(this.receivableSearchTimer);
  }

  onReceivableSearch(value: string): void {
    this.receivableSearchDraft = value;
    if (this.receivableSearchTimer) clearTimeout(this.receivableSearchTimer);
    this.receivableSearchTimer = setTimeout(() => {
      this.receivableSearch.set(value.trim());
    }, 300);
  }

  showPeriodFilters(): boolean {
    const tab = this.activeTab();
    return tab !== 'payable' && tab !== 'debt-flow';
  }

  posDayOnlyFilters(): boolean {
    return this.activeTab() === 'pos';
  }

  branchRequired(): boolean {
    return (
      this.activeTab() === 'pos' ||
      this.activeTab() === 'pos-collections' ||
      this.activeTab() === 'average-cost'
    );
  }

  branchOptional(): boolean {
    return this.activeTab() === 'receivable';
  }

  onTabChange(tabId: string): void {
    if (!this.isAccountingTab(tabId)) return;
    if (this.route.snapshot.routeConfig?.path === 'flujo-deuda' && tabId !== 'debt-flow') {
      void this.router.navigate(['/accounting']);
      return;
    }
    const tab = tabId;
    const previousTab = this.activeTab();
    if (tab === 'pos' && this.period() !== 'today' && this.period() !== 'range') {
      this.period.set('today');
      this.dateFrom.set('');
      this.dateTo.set('');
    }
    // El rango del mes de Rep. Vent. Cost. Prom. no aplica al corte diario de POS.
    if (tab === 'pos' && previousTab === 'average-cost') {
      this.period.set('today');
      this.dateFrom.set('');
      this.dateTo.set('');
    }
    // Rep. Vent. Cost. Prom. siempre abre en el mes actual.
    if (tab === 'average-cost') {
      this.applyCurrentMonth();
    }
    this.activeTab.set(tab);
    this.reloadActiveTab();
  }

  onPeriodChange(preset: ReportPeriod): void {
    if (preset === 'year') {
      return;
    }
    this.period.set(preset);
    if (preset === 'range') {
      return;
    }
    if (preset !== 'month') {
      this.dateFrom.set('');
      this.dateTo.set('');
    }
    this.reloadActiveTab();
  }

  onRangeChange(range: { dateFrom: string; dateTo: string }): void {
    this.dateFrom.set(range.dateFrom);
    this.dateTo.set(range.dateTo);
    this.period.set('range');
    this.reloadActiveTab();
  }

  onBranchChange(): void {
    this.reloadActiveTab();
  }

  branchLabel(b: Branch): string {
    return b.display_name?.trim() || `${b.city} (${b.code})`;
  }

  showPosSummary(): boolean {
    return this.activeTab() === 'pos';
  }

  onPosSummary(summary: PosDaySummary): void {
    this.posSummary.set(summary);
  }

  formatMoney(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(Number.isFinite(value) ? value : 0);
  }

  private loadBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        const list = branches ?? [];
        this.branches.set(list);
        if (this.billingBranchId() || !list.length) {
          return;
        }
        const sessionBranchId = this.authService.getBillingBranchId();
        const sessionBranch = list.find((branch) => branch.id === sessionBranchId);
        const selected = sessionBranch ?? (list.length === 1 ? list[0] : null);
        if (selected) {
          this.billingBranchId.set(selected.id);
          this.reloadActiveTab();
        }
      },
      error: () => {
        this.branches.set([]);
      },
    });
  }

  /** Mes actual como rango explícito (día 1 → hoy), igual que el botón "Mes" del selector. */
  private applyCurrentMonth(): void {
    const today = new Date();
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    this.period.set('range');
    this.dateFrom.set(this.toInputDate(first));
    this.dateTo.set(this.toInputDate(today));
  }

  private toInputDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private reloadActiveTab(): void {
    this.reloadToken.update((v) => v + 1);
  }

  private isAccountingTab(tabId: string): tabId is AccountingTab {
    return this.menuTabs.some((tab) => tab.id === tabId);
  }

  private emptyPosSummary(): PosDaySummary {
    return {
      orders_entered: 0,
      amount_entered: 0,
      orders_collected: 0,
      amount_collected: 0,
      orders_pending: 0,
      amount_pending: 0,
    };
  }
}
