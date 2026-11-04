import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { ELECTRONIC_INVOICING_PERMISSIONS } from '../../../sales-orders/config/electronic-invoicing-permissions.config';
import { AccountingService } from '../../services/accounting.service';
import {
  GlobalInvoiceOrderRow,
  GlobalInvoicePage,
  GlobalInvoicePaymentLine,
} from '../../models/global-invoice.model';

@Component({
  selector: 'app-global-invoices-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './global-invoices-tab.component.html',
  styleUrl: './global-invoices-tab.component.scss',
})
export class GlobalInvoicesTabComponent implements OnInit, OnChanges {
  @Input() billingBranchId = '';
  @Output() billingBranchChange = new EventEmitter<string>();

  readonly month = signal(this.currentMonth());
  readonly branchId = signal('');
  readonly page = signal<GlobalInvoicePage | null>(null);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly cancelling = signal(false);
  readonly confirmCancel = signal(false);
  readonly selected = signal<Set<string>>(new Set());

  readonly allSelected = computed(() => {
    const orders = this.page()?.orders ?? [];
    return orders.length > 0 && orders.every((order) => this.selected().has(order.id));
  });

  constructor(
    private accounting: AccountingService,
    private auth: AuthService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.branchId.set(this.billingBranchId || '');
    this.load();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['billingBranchId'];
    if (!change || change.firstChange) return;
    const next = this.billingBranchId || '';
    if (next === this.branchId()) return;
    this.branchId.set(next);
    this.confirmCancel.set(false);
    this.load();
  }

  onMonth(value: string): void {
    if (!/^\d{4}-\d{2}$/.test(value)) return;
    this.month.set(value);
    this.confirmCancel.set(false);
    this.load();
  }

  onBranch(value: string): void {
    this.branchId.set(value);
    this.confirmCancel.set(false);
    if (value !== this.billingBranchId) this.billingBranchChange.emit(value);
    this.load();
  }

  isSelected(id: string): boolean {
    return this.selected().has(id);
  }

  checkedOf(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  cancelledFolio(): string {
    const invoice = this.page()?.cancelled_invoice;
    if (!invoice) return '';
    return [invoice.series, invoice.folio].filter(Boolean).join(' ');
  }

  toggle(id: string, checked: boolean): void {
    const next = new Set(this.selected());
    if (checked) next.add(id);
    else next.delete(id);
    this.selected.set(next);
  }

  toggleAll(checked: boolean): void {
    const orders = this.page()?.orders ?? [];
    this.selected.set(checked ? new Set(orders.map((order) => order.id)) : new Set());
  }

  canStamp(): boolean {
    return this.auth.hasPermission(ELECTRONIC_INVOICING_PERMISSIONS.stamp);
  }

  canCancel(): boolean {
    return this.auth.hasPermission(ELECTRONIC_INVOICING_PERMISSIONS.cancel);
  }

  canReadInvoice(): boolean {
    return this.auth.hasPermission(ELECTRONIC_INVOICING_PERMISSIONS.read);
  }

  canSelectOrders(): boolean {
    const invoice = this.page()?.invoice;
    return !invoice || invoice.status === 'cancelled';
  }

  showGenerate(): boolean {
    return this.canSelectOrders() && (this.page()?.orders.length ?? 0) > 0;
  }

  generateDisabled(): boolean {
    const page = this.page();
    return (
      this.saving() ||
      this.loading() ||
      !this.canStamp() ||
      !page?.can_generate ||
      !this.allSelected()
    );
  }

  generateHint(): string {
    const page = this.page();
    if (!page || !this.showGenerate()) return '';
    if (!this.canStamp()) return 'No tienes permiso para timbrar.';
    if (page.blocked_reason) return page.blocked_reason;
    if (!this.allSelected()) return 'Selecciona todas las órdenes de esta sucursal para generar la factura.';
    return '';
  }

  generate(): void {
    const page = this.page();
    const branchId = page?.billing_branch_id;
    if (!page || !branchId || this.generateDisabled()) return;
    this.saving.set(true);
    this.accounting
      .generateGlobalInvoice({
        month: page.month,
        billing_branch_id: branchId,
        order_ids: page.orders.map((order) => order.id),
        environment: this.stampEnvironment(),
      })
      .subscribe({
        next: (next) => {
          this.saving.set(false);
          this.applyPage(next);
          this.toast.success('Factura a público en general timbrada.');
        },
        error: (error) => {
          this.saving.set(false);
          this.toast.error(resolveHttpErrorMessage(error, 'No se pudo generar la factura'));
          this.load();
        },
      });
  }

  askCancel(): void {
    this.confirmCancel.set(true);
  }

  cancel(): void {
    const invoice = this.page()?.invoice;
    if (!invoice || this.cancelling()) return;
    this.cancelling.set(true);
    this.accounting.cancelGlobalInvoice(invoice.id).subscribe({
      next: (next) => {
        this.cancelling.set(false);
        this.confirmCancel.set(false);
        this.applyPage(next);
        const pending = next.invoice?.stamp_status === 'cancel_pending';
        this.toast.success(
          pending
            ? 'La cancelación quedó en proceso en el SAT.'
            : 'Factura a público en general cancelada.',
        );
      },
      error: (error) => {
        this.cancelling.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo cancelar la factura'));
      },
    });
  }

  openPdf(): void {
    const invoiceId = this.page()?.invoice?.electronic_invoice_id;
    if (!invoiceId) return;
    this.accounting.getElectronicInvoicePdfUrl(invoiceId).subscribe({
      next: (url) => {
        if (!url) {
          this.toast.error('No hay PDF de esta factura');
          return;
        }
        window.open(url, '_blank', 'noopener');
      },
      error: (error) => {
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo abrir el PDF'));
      },
    });
  }

  invoiceFolio(): string {
    const invoice = this.page()?.invoice;
    if (!invoice) return '';
    return [invoice.series, invoice.folio].filter(Boolean).join(' ') || 'Factura público en general';
  }

  stampLabel(status: string | null): string {
    switch (status) {
      case 'stamped':
        return 'Timbrada';
      case 'cancel_pending':
        return 'Cancelación en proceso';
      case 'cancelled':
        return 'Cancelada';
      case 'cancel_error':
        return 'No se pudo cancelar';
      default:
        return status ? 'En proceso' : 'En proceso';
    }
  }

  statusClass(status: string): string {
    const base = 'dt-status-pill';
    switch (status) {
      case 'Creada':
        return `${base} dt-status-pill--info`;
      case 'En Selección':
        return `${base} dt-status-pill--warning`;
      case 'Lista para entrega':
      case 'En Camino':
        return `${base} dt-status-pill--sky`;
      case 'Surtida':
        return `${base} dt-status-pill--success`;
      case 'Cancelada':
        return `${base} dt-status-pill--danger`;
      default:
        return `${base} dt-status-pill--neutral`;
    }
  }

  paymentClass(status: string): string {
    const base = 'dt-status-pill';
    switch (status) {
      case 'Pagado':
        return `${base} dt-status-pill--success`;
      case 'Parcial':
        return `${base} dt-status-pill--warning`;
      case 'Pendiente':
        return `${base} dt-status-pill--danger`;
      default:
        return `${base} dt-status-pill--neutral`;
    }
  }

  formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'America/Tijuana',
    }).format(date);
  }

  formatMoney(value: number, currency = 'MXN'): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency || 'MXN',
    }).format(Number.isFinite(value) ? value : 0);
  }

  lineAmount(line: GlobalInvoicePaymentLine): string {
    const parts: string[] = [];
    if (line.amount_mxn > 0) parts.push(this.formatMoney(line.amount_mxn, 'MXN'));
    if (line.amount_usd > 0) parts.push(this.formatMoney(line.amount_usd, 'USD'));
    return parts.join(' · ');
  }

  showBreakdown(order: GlobalInvoiceOrderRow): boolean {
    return order.payment_lines.length > 1 || order.payment_method === 'mixed';
  }

  private load(): void {
    this.loading.set(true);
    this.accounting.getGlobalInvoices(this.month(), this.branchId() || undefined).subscribe({
      next: (page) => {
        this.loading.set(false);
        this.applyPage(page);
      },
      error: (error) => {
        this.loading.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo cargar el mes'));
      },
    });
  }

  private applyPage(page: GlobalInvoicePage): void {
    this.page.set(page);
    const next = page.billing_branch_id ?? '';
    if (next !== this.branchId()) this.branchId.set(next);
    if (next && next !== this.billingBranchId) this.billingBranchChange.emit(next);
    const selectable = !page.invoice || page.invoice.status === 'cancelled';
    this.selected.set(selectable ? new Set(page.orders.map((order) => order.id)) : new Set());
  }

  private currentMonth(): string {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Tijuana',
      year: 'numeric',
      month: '2-digit',
    }).formatToParts(new Date());
    const year = parts.find((part) => part.type === 'year')?.value ?? '0000';
    const month = parts.find((part) => part.type === 'month')?.value ?? '01';
    return `${year}-${month}`;
  }

  private stampEnvironment(): 'demo' | 'production' {
    if (typeof window === 'undefined') return 'production';
    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1' ? 'demo' : 'production';
  }
}
