import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportPeriod, ReportPeriodSelectorComponent } from '../../../../core/components/report-period-selector/report-period-selector.component';
import { BranchService } from '../../../settings/services/branch.service';
import { Branch } from '../../../settings/models/branch.model';
import { AccountingPeriod } from '../../models/accounting.model';
import { PosSummaryTabComponent } from '../../components/pos-summary-tab/pos-summary-tab.component';
import { AccountsPayableTabComponent } from '../../components/accounts-payable-tab/accounts-payable-tab.component';
import { AccountsReceivableTabComponent } from '../../components/accounts-receivable-tab/accounts-receivable-tab.component';

export type AccountingTab = 'pos' | 'payable' | 'receivable';

@Component({
  selector: 'app-accounting-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReportPeriodSelectorComponent,
    PosSummaryTabComponent,
    AccountsPayableTabComponent,
    AccountsReceivableTabComponent,
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

  readonly tabs: { id: AccountingTab; label: string }[] = [
    { id: 'pos', label: 'Puntos de venta' },
    { id: 'payable', label: 'Cuentas por pagar' },
    { id: 'receivable', label: 'Cuentas por cobrar' },
  ];

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  showPeriodFilters(): boolean {
    return this.activeTab() !== 'payable';
  }

  posDayOnlyFilters(): boolean {
    return this.activeTab() === 'pos';
  }

  branchRequired(): boolean {
    return this.activeTab() === 'pos';
  }

  branchOptional(): boolean {
    return this.activeTab() === 'receivable';
  }

  onTabChange(tab: AccountingTab): void {
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
}
