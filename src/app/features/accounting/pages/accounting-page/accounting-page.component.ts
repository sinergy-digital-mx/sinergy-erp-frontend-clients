import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { ReportPeriod, ReportPeriodSelectorComponent } from '../../../../core/components/report-period-selector/report-period-selector.component';
import { BranchService } from '../../../settings/services/branch.service';
import { Branch } from '../../../settings/models/branch.model';
import { AccountingPeriod, PosDaySummary } from '../../models/accounting.model';
import { PosSummaryTabComponent } from '../../components/pos-summary-tab/pos-summary-tab.component';
import { PosCollectionsTabComponent } from '../../components/pos-collections-tab/pos-collections-tab.component';
import { AccountsPayableTabComponent } from '../../components/accounts-payable-tab/accounts-payable-tab.component';
import { AccountsReceivableTabComponent } from '../../components/accounts-receivable-tab/accounts-receivable-tab.component';
import { CustomerDebtFlowComponent } from '../../components/customer-debt-flow/customer-debt-flow.component';

export type AccountingTab = 'pos' | 'pos-collections' | 'payable' | 'receivable' | 'debt-flow';

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
  ],
  templateUrl: './accounting-page.component.html',
  styleUrl: './accounting-page.component.scss',
})
export class AccountingPageComponent implements OnInit {
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

  readonly menuTabs: TabItem[] = [
    { id: 'pos', title: 'Puntos de venta' },
    { id: 'pos-collections', title: 'Cobranza POS' },
    { id: 'payable', title: 'Cuentas por pagar' },
    { id: 'receivable', title: 'Cuentas por cobrar' },
    { id: 'debt-flow', title: 'Flujo de deuda' },
  ];

  constructor(
    private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const initial = this.route.snapshot.data['tab'];
    if (typeof initial === 'string' && this.isAccountingTab(initial)) {
      this.activeTab.set(initial);
    }
    this.loadBranches();
  }

  showPeriodFilters(): boolean {
    const tab = this.activeTab();
    return tab !== 'payable' && tab !== 'debt-flow';
  }

  posDayOnlyFilters(): boolean {
    return this.activeTab() === 'pos';
  }

  branchRequired(): boolean {
    return this.activeTab() === 'pos' || this.activeTab() === 'pos-collections';
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
    if (tab === 'pos' && this.period() !== 'today' && this.period() !== 'range') {
      this.period.set('today');
      this.dateFrom.set('');
      this.dateTo.set('');
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
        this.branches.set(branches ?? []);
        if (this.branches().length === 1 && !this.billingBranchId()) {
          this.billingBranchId.set(this.branches()[0].id);
          this.reloadActiveTab();
        }
      },
      error: () => {
        this.branches.set([]);
      },
    });
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
