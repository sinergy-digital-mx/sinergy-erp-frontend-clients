import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuotationService } from '../../services/quotation.service';
import {
  Quotation,
  QuotationDetailPayload,
  QuotationDocument,
  QuotationEmail,
  QuotationLineItem,
} from '../../models/quotation.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { isFiscalFlagOn } from '../../../settings/utils/fiscal-tax-flags.util';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { formatApiDate } from '../../../../core/utils/api-datetime.util';
import { formatUnitAmount } from '../../../../core/utils/unit-money.util';
import { QUOTATION_PERMISSIONS } from '../../config/permissions.config';
import { openInvoicePdfViewer } from '../../../accounting/components/invoice-pdf-viewer-dialog/invoice-pdf-viewer-dialog.component';
import { EditSalesOrderLineDialogComponent } from '../../../sales-orders/components/edit-sales-order-line-dialog/edit-sales-order-line-dialog.component';
import { AddSalesOrderLineDialogComponent } from '../../../sales-orders/components/add-sales-order-line-dialog/add-sales-order-line-dialog.component';
import { SalesOrderLineItem } from '../../../sales-orders/models/sales-order.model';
import {
  formatTitleCase,
  getSalesOrderListCompanyName,
} from '../../../sales-orders/utils/sales-order-display.util';
import {
  resolveSalesOrderCustomerId,
  resolveSalesOrderCustomerName,
} from '../../../sales-orders/utils/customer-display.util';
import { formatPosUser } from '../../../sales-orders/utils/pos-user-display.util';
import {
  getSalesOrderDocumentChipLabel,
  getSalesOrderDocumentKind,
} from '../../../sales-orders/utils/sales-order-document.util';
import {
  QuotationNotesDialogComponent,
  QuotationNotesDialogResult,
} from '../quotation-notes-dialog/quotation-notes-dialog.component';
import { AdvanceInvoiceDialogComponent } from '../../../sales-orders/components/advance-invoice-dialog/advance-invoice-dialog.component';
import {
  QuotationConvertDialogComponent,
  QuotationConvertDialogResult,
} from '../quotation-convert-dialog/quotation-convert-dialog.component';
import {
  ADVANCE_CONCEPT_SKU,
  AdvanceWizardDialogComponent,
  wizardLinesFromQuotation,
} from '../advance-wizard-dialog/advance-wizard-dialog.component';

type InstructionFilter = 'all' | 'caseA' | 'caseB' | 'cash' | 'close';

interface InstructionSection {
  id: Exclude<InstructionFilter, 'all'>;
  label: string;
  shortLabel: string;
  icon: string;
  tone: 'blue' | 'violet' | 'amber' | 'rose';
  points: string[];
}

const INSTRUCTION_SECTIONS: InstructionSection[] = [
  {
    id: 'caseA',
    label: 'Con productos',
    shortLabel: 'Con productos',
    icon: 'fi fi-rr-box-open',
    tone: 'blue',
    points: [
      'El cliente ya eligió, pero no hay. Esos productos se quedan en la cotización.',
      'Pedir anticipo manda el monto, con IVA, a la caja de esta sucursal.',
      'Cuando regrese, Generar venta arma la orden. Si se lleva más, caja cobra la diferencia.',
    ],
  },
  {
    id: 'caseB',
    label: 'Sin productos',
    shortLabel: 'Sin productos',
    icon: 'fi fi-rr-sack-dollar',
    tone: 'violet',
    points: [
      'Todavía no elige. En punto de venta, Anticipo pide el monto con IVA y la cotización queda sin productos.',
      'Caja cobra y ahí se factura el anticipo.',
      'Cuando regrese, Generar venta agrega los productos. La venta tiene que cubrir el anticipo.',
    ],
  },
  {
    id: 'cash',
    label: 'Caja',
    shortLabel: 'Caja',
    icon: 'fi fi-rr-cash-register',
    tone: 'amber',
    points: [
      'El anticipo no se timbra desde aquí. Lo cobra la caja de la sucursal, como una venta: efectivo, tarjeta, transferencia, cheque o mixto.',
      'Sin corte abierto no hay factura.',
      'Si la venta es mayor al anticipo, caja cobra solo la diferencia. Si es igual, la orden queda pagada.',
    ],
  },
  {
    id: 'close',
    label: 'Entrega y factura',
    shortLabel: 'Entrega',
    icon: 'fi fi-rr-file-invoice-dollar',
    tone: 'rose',
    points: [
      'Generar venta crea la orden y la factura de los productos. El anticipo se descuenta y queda ligado a su factura.',
      'También se timbra la nota de crédito, ligada a la orden.',
      'Si el anticipo cubre la venta, esa factura queda en cero. Si se llevan más, caja cobra la diferencia.',
      'Si la venta es menor al anticipo, no se deja pasar.',
    ],
  },
];

@Component({
  selector: 'app-quotation-detail-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, RemoveTrailingZerosPipe, SpinnerComponent],
  templateUrl: './quotation-detail-dialog.component.html',
  styleUrls: [
    '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component.scss',
    './quotation-detail-dialog.component.scss',
  ],
  host: {
    class: 'order-detail-dialog-container',
  },
})
export class QuotationDetailDialogComponent implements OnInit {
  loading = signal(true);
  refreshing = signal(false);
  converting = signal(false);
  cancelling = signal(false);
  openingAdvancePdf = signal(false);
  downloadingAdvanceXml = signal(false);
  regeneratingPDF = signal(false);
  sendingEmail = signal(false);
  activeTabIndex = signal(0);
  instructionSection = signal<InstructionFilter>('all');
  readonly instructionFilters: { id: InstructionFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'Todas', icon: 'fi fi-rr-apps' },
    ...INSTRUCTION_SECTIONS.map((section) => ({
      id: section.id,
      label: section.shortLabel,
      icon: section.icon,
    })),
  ];
  visibleInstructions = computed(() => {
    const selected = this.instructionSection();
    if (selected === 'all') {
      return INSTRUCTION_SECTIONS;
    }
    return INSTRUCTION_SECTIONS.filter((section) => section.id === selected);
  });
  header = signal<Quotation | null>(null);
  lineItems = signal<QuotationLineItem[]>([]);
  documents = signal<QuotationDocument[]>([]);
  emails = signal<QuotationEmail[]>([]);
  discountSummary = signal<QuotationDetailPayload['discount_summary'] | null>(null);
  emailTo = '';
  emailCc = '';
  emailSubject = '';
  emailMessage = '';
  canConvertPerm = false;
  canCancelPerm = false;
  canUpdate = false;
  canSendPerm = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { quotationId: string },
    private dialogRef: MatDialogRef<QuotationDetailDialogComponent>,
    private dialog: MatDialog,
    private quotationService: QuotationService,
    private auth: AuthService,
    private toast: ToastService,
    private taxCalculator: TaxCalculatorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.canConvertPerm = this.auth.hasPermission(QUOTATION_PERMISSIONS.convert);
    this.canCancelPerm = this.auth.hasPermission(QUOTATION_PERMISSIONS.delete);
    this.canUpdate = this.auth.hasPermission(QUOTATION_PERMISSIONS.update);
    this.canSendPerm = this.auth.hasPermission(QUOTATION_PERMISSIONS.send);
    this.reload();
  }

  reload(silent = false): void {
    if (silent) {
      this.refreshing.set(true);
    } else {
      this.loading.set(true);
    }
    this.quotationService.getDetail(this.data.quotationId).subscribe({
      next: (payload) => {
        this.applyPayload(payload);
        this.loading.set(false);
        this.refreshing.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.refreshing.set(false);
        this.toast.error('No se pudo cargar la cotización');
      },
    });
  }

  private applyPayload(payload: QuotationDetailPayload): void {
    this.header.set(payload.header);
    this.lineItems.set(payload.line_items || []);
    this.documents.set(payload.documents || []);
    this.emails.set(payload.emails || []);
    this.discountSummary.set(payload.discount_summary ?? null);
    const header = payload.header;
    if (!this.emailTo) {
      this.emailTo = header?.customer_email || header?.customer?.email || '';
    }
    if (!this.emailSubject && header?.folio) {
      this.emailSubject = `Cotización ${header.folio}`;
    }
    if (!this.emailMessage && header?.folio) {
      this.emailMessage = `Adjuntamos la cotización ${header.folio}.`;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  parseNumber(value: number | string | undefined | null): number {
    if (value === null || value === undefined) return 0;
    const n = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  formatCurrency(value: number | string | undefined | null): string {
    return this.taxCalculator.formatCurrency(this.parseNumber(value));
  }

  formatShortDate(value?: string | null): string {
    return formatApiDate(value, 'month-day');
  }

  getStatusBadgeClass(): string {
    const status = this.header()?.general_status ?? '';
    if (status === 'Convertida') return 'status-badge--success';
    if (status === 'Creada') return 'status-badge--info';
    if (status === 'Cancelada') return 'status-badge--danger';
    return 'status-badge--neutral';
  }

  getRazonSocialDisplayName(): string {
    const q = this.header();
    const value = q?.razon_social ?? q?.fiscal_configuration?.razon_social ?? q?.fiscal_razon_social;
    if (!value?.trim()) return '—';
    return formatTitleCase(value.trim());
  }

  getRazonSocialSubtitle(): string {
    return this.header()?.fiscal_configuration?.rfc?.trim() || '';
  }

  getSucursalDisplayName(): string {
    const q = this.header();
    const value = q?.sucursal ?? q?.billing_branch?.code;
    if (!value?.trim()) return '—';
    return formatTitleCase(value.trim());
  }

  getSucursalSubtitle(): string {
    const branch = this.header()?.billing_branch;
    if (!branch) return '';
    return [branch.city, branch.state].filter(Boolean).join(', ');
  }

  getCustomerDisplayName(): string {
    return formatTitleCase(resolveSalesOrderCustomerName(this.header() as any));
  }

  canOpenCustomer(): boolean {
    return resolveSalesOrderCustomerId(this.header() as any) != null;
  }

  openCustomerInNewTab(): void {
    const customerId = resolveSalesOrderCustomerId(this.header() as any);
    if (customerId == null) return;
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/customers/detail', customerId]),
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  getCustomerCompanyName(): string {
    return getSalesOrderListCompanyName(this.header() as any);
  }

  getSellerDisplayName(): string {
    return formatPosUser(this.header()?.seller_user ?? undefined);
  }

  getAssignedSellerDisplayName(): string {
    const seller = this.header()?.assigned_seller_user;
    return seller ? formatPosUser(seller) : 'Sin comisionado';
  }

  formatPosUserLabel(user: Quotation['terminal_user']): string {
    return formatPosUser(user ?? undefined);
  }

  isPosQuotation(): boolean {
    return this.header()?.quotation_type === 'POS';
  }

  hasLineDiscount(): boolean {
    return this.getLineDiscountAmount() > 0.009;
  }

  hasGlobalDiscount(): boolean {
    return this.getGlobalDiscountAmount() > 0.009;
  }

  globalDiscountLabel(): string {
    return 'Desc. global';
  }

  private getLineDiscountAmount(): number {
    const summary = this.discountSummary();
    if (summary?.line_discount_total != null) {
      return this.parseNumber(summary.line_discount_total);
    }
    const q = this.header();
    return Math.max(this.parseNumber(q?.discount_total) - this.parseNumber(q?.global_discount_amount), 0);
  }

  private getGlobalDiscountAmount(): number {
    const summary = this.discountSummary();
    if (summary?.global_discount_amount != null) {
      return this.parseNumber(summary.global_discount_amount);
    }
    return this.parseNumber(this.header()?.global_discount_amount);
  }

  getDisplayedLineDiscount(): string {
    return this.formatCurrency(-this.getLineDiscountAmount());
  }

  getDisplayedGlobalDiscount(): string {
    return this.formatCurrency(-this.getGlobalDiscountAmount());
  }

  getDisplayedSubtotal(): string {
    return this.formatCurrency(this.header()?.subtotal);
  }

  getDisplayedIva(): string {
    return this.formatCurrency(this.header()?.iva_total);
  }

  getDisplayedIeps(): string {
    return this.formatCurrency(this.header()?.ieps_total);
  }

  getDisplayedTotal(): string {
    return this.formatCurrency(this.header()?.total);
  }

  hasAdvanceBalance(): boolean {
    return this.getAmountPaid() > 0;
  }

  getAmountPaid(): number {
    const header = this.header();
    if (!header) return 0;
    if (header.amount_paid != null && header.amount_paid !== '') {
      return this.roundMoney(this.parseNumber(header.amount_paid));
    }
    const collected = this.parseNumber(header.advance_payment?.amount_mxn);
    if (collected > 0) return this.roundMoney(collected);
    return this.roundMoney(this.parseNumber(header.advance_invoice?.total));
  }

  getAmountPending(): number {
    const header = this.header();
    if (!header) return 0;
    if (header.amount_pending != null && header.amount_pending !== '') {
      return this.roundMoney(this.parseNumber(header.amount_pending));
    }
    return Math.max(0, this.roundMoney(this.parseNumber(header.total) - this.getAmountPaid()));
  }

  getDisplayedAmountPaid(): string {
    return this.formatCurrency(this.getAmountPaid());
  }

  getDisplayedAmountPending(): string {
    return this.formatCurrency(this.getAmountPending());
  }

  private roundMoney(value: number): number {
    return Math.round(value * 100) / 100;
  }

  getLineItemsCount(): number {
    return this.lineItems().length;
  }

  getDocumentsCount(): number {
    return this.documents().length + (this.header()?.advance_invoice ? 1 : 0);
  }

  advanceFolioLabel(): string {
    const invoice = this.header()?.advance_invoice;
    if (!invoice) return '';
    const parts = [invoice.series, invoice.folio].filter((part) => !!part?.trim());
    return parts.join('-') || 'Sin folio';
  }

  openAdvancePdf(): void {
    const q = this.header();
    const invoiceId = q?.advance_invoice?.id;
    if (!q || !invoiceId || this.openingAdvancePdf()) return;
    this.openingAdvancePdf.set(true);
    this.quotationService.getAdvancePdf(q.id, invoiceId).subscribe({
      next: (response) => {
        this.openingAdvancePdf.set(false);
        if (!response.signedUrl) {
          this.toast.error('No se recibió la URL del PDF');
          return;
        }
        openInvoicePdfViewer(this.dialog, response.signedUrl, this.advanceFolioLabel() || 'Anticipo');
      },
      error: (err) => {
        this.openingAdvancePdf.set(false);
        this.toast.error(err?.error?.message || 'No se pudo abrir el PDF');
      },
    });
  }

  downloadAdvanceXml(): void {
    const q = this.header();
    const invoice = q?.advance_invoice;
    if (!q || !invoice?.id || this.downloadingAdvanceXml()) return;
    this.downloadingAdvanceXml.set(true);
    this.quotationService.getAdvanceXml(q.id, invoice.id).subscribe({
      next: (blob) => {
        this.downloadingAdvanceXml.set(false);
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${this.advanceFolioLabel() || 'anticipo'}.xml`;
        anchor.rel = 'noopener';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.downloadingAdvanceXml.set(false);
        this.toast.error(err?.error?.message || 'No se pudo descargar el XML');
      },
    });
  }

  getEmailsCount(): number {
    return this.emails().length;
  }

  canShowSend(): boolean {
    const q = this.header();
    if (!q || !this.canSendPerm) return false;
    if (q.general_status === 'Cancelada') return false;
    return q.can_send !== false;
  }

  sendBlockedReason(): string {
    if (!this.canSendPerm) {
      return 'Tu usuario no tiene el permiso de envío. Cierra sesión y vuelve a entrar para refrescar permisos.';
    }
    if (this.header()?.general_status === 'Cancelada') {
      return 'No se puede enviar una cotización cancelada.';
    }
    return 'No se puede enviar esta cotización.';
  }

  senderLabel(row: QuotationEmail): string {
    return row.sent_by?.display_name || [row.sent_by?.first_name, row.sent_by?.last_name].filter(Boolean).join(' ') || '—';
  }

  sendEmail(): void {
    const q = this.header();
    if (!q || !this.canShowSend() || this.sendingEmail()) return;
    const to = this.emailTo.trim();
    if (!to) {
      this.toast.error('Indica un correo destino');
      return;
    }

    const cc = this.emailCc
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    this.sendingEmail.set(true);
    this.quotationService
      .sendEmail(q.id, {
        to_email: to,
        ...(cc.length ? { cc } : {}),
        subject: this.emailSubject.trim() || undefined,
        message: this.emailMessage.trim() || undefined,
      })
      .subscribe({
        next: (row) => {
          this.sendingEmail.set(false);
          this.emails.update((current) => [row, ...current]);
          this.toast.success(`Cotización enviada a ${row.to_email}`);
        },
        error: (err) => {
          this.sendingEmail.set(false);
          this.toast.error(err?.error?.message || 'No se pudo enviar el correo');
        },
      });
  }

  getLineUom(item: QuotationLineItem): string {
    return item.uom_name || 'Unidad';
  }

  getLineQty(item: QuotationLineItem): number {
    return this.parseNumber(item.quantity);
  }

  canShowConvert(): boolean {
    return this.canConvertPerm && !!this.header()?.can_convert;
  }

  canEditLines = computed(() => {
    const header = this.header();
    if (!this.canUpdate || !header) return false;
    if (typeof header.can_edit_lines === 'boolean') return header.can_edit_lines;
    return !!header.can_edit;
  });

  getPaymentCurrency(): 'MXN' | 'USD' {
    return 'MXN';
  }

  formatAmount(value: number | string | null | undefined): string {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.parseNumber(value));
  }

  formatUnitPrice(value: number | string | null | undefined): string {
    return formatUnitAmount(value);
  }

  ivaEnabled(): boolean {
    return isFiscalFlagOn(this.header()?.fiscal_configuration?.iva_enabled, true);
  }

  iepsEnabled(): boolean {
    return isFiscalFlagOn(this.header()?.fiscal_configuration?.ieps_enabled, true);
  }

  hasLineIvaColumn(): boolean {
    if (!this.ivaEnabled()) return false;
    return this.lineItems().some(
      (item) => this.parseNumber(item.iva_percentage) > 0 || this.parseNumber(item.line_iva) > 0,
    );
  }

  hasLineIepsColumn(): boolean {
    if (!this.iepsEnabled()) return false;
    return this.lineItems().some(
      (item) => this.parseNumber(item.ieps_percentage) > 0 || this.parseNumber(item.line_ieps) > 0,
    );
  }

  hasLineTax(item: QuotationLineItem): boolean {
    return this.getLineIvaAmount(item) > 0 || this.getLineIepsAmount(item) > 0;
  }

  getLineUnitPrice(item: QuotationLineItem): number {
    return this.parseNumber(item.unit_price);
  }

  getLineSubtotal(item: QuotationLineItem): number {
    if (item.line_subtotal != null) {
      return this.parseNumber(item.line_subtotal);
    }
    return this.parseNumber(item.quantity) * this.parseNumber(item.unit_price);
  }

  getLineIvaPercent(item: QuotationLineItem): number {
    return this.parseNumber(item.iva_percentage);
  }

  getLineIvaAmount(item: QuotationLineItem): number {
    if (item.line_iva != null) {
      return this.parseNumber(item.line_iva);
    }
    const taxable = Math.max(
      this.getLineSubtotal(item) - this.parseNumber(item.line_discount_amount),
      0,
    );
    return taxable * (this.getLineIvaPercent(item) / 100);
  }

  getLineIepsPercent(item: QuotationLineItem): number {
    return this.parseNumber(item.ieps_percentage);
  }

  getLineIepsAmount(item: QuotationLineItem): number {
    if (item.line_ieps != null) {
      return this.parseNumber(item.line_ieps);
    }
    const taxable = Math.max(
      this.getLineSubtotal(item) - this.parseNumber(item.line_discount_amount),
      0,
    );
    return taxable * (this.getLineIepsPercent(item) / 100);
  }

  getLineGross(item: QuotationLineItem): number {
    if (item.line_total != null) {
      return this.parseNumber(item.line_total);
    }
    const taxable = Math.max(
      this.getLineSubtotal(item) - this.parseNumber(item.line_discount_amount),
      0,
    );
    return taxable + this.getLineIvaAmount(item) + this.getLineIepsAmount(item);
  }

  getProductsColspan(): number {
    let count = 4;
    if (this.hasLineIvaColumn()) count += 1;
    if (this.hasLineIepsColumn()) count += 1;
    if (this.canEditLines()) count += 1;
    return count;
  }

  getTotalsSnapshot(): { subtotal: number; iva: number; ieps: number; total: number } {
    const header = this.header();
    return {
      subtotal: this.parseNumber(header?.subtotal),
      iva: this.parseNumber(header?.iva_total),
      ieps: this.parseNumber(header?.ieps_total),
      total: this.parseNumber(header?.total),
    };
  }

  private applyLineMutation(updated: QuotationDetailPayload): void {
    this.applyPayload(updated);
  }

  openEditLineItem(item: QuotationLineItem): void {
    const q = this.header();
    if (!q || !item.id || !this.canEditLines()) return;

    this.dialog
      .open(EditSalesOrderLineDialogComponent, {
        width: '460px',
        maxWidth: '95vw',
        panelClass: 'po-line-dialog-panel',
        autoFocus: 'first-tabbable',
        data: {
          quotationId: q.id,
          folio: q.folio,
          currency: this.getPaymentCurrency(),
          lineItem: item as SalesOrderLineItem,
          ivaEnabled: this.ivaEnabled(),
          iepsEnabled: this.iepsEnabled(),
        },
      })
      .afterClosed()
      .subscribe((updated: QuotationDetailPayload | undefined) => {
        if (!updated) return;
        this.applyLineMutation(updated);
        this.toast.success('Línea actualizada');
      });
  }

  confirmDeleteLineItem(item: QuotationLineItem): void {
    const q = this.header();
    if (!q || !item.id || !this.canEditLines()) return;

    const name = item.product?.name || 'este producto';
    this.dialog
      .open(AlertDialogComponent, {
        width: '420px',
        data: {
          title: 'Eliminar producto',
          message: `¿Eliminar ${name} de esta cotización? Se recalcularán los totales.`,
          type: 'warning',
          text_accept: 'Eliminar',
          text_cancel: 'Cancelar',
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return;
        this.quotationService.deleteLineItem(q.id, String(item.id)).subscribe({
          next: (updated) => {
            this.applyLineMutation(updated);
            this.toast.success('Producto eliminado');
          },
          error: (error: Error) => {
            this.toast.error(error?.message || 'No se pudo eliminar la línea');
          },
        });
      });
  }

  openAddLineItem(): void {
    const q = this.header();
    if (!q || !this.canEditLines()) return;

    const fiscalId = q.fiscal_configuration_id || q.fiscal_configuration?.id;
    const branchId = q.billing_branch_id || q.billing_branch?.id;
    if (!fiscalId || !branchId) {
      this.toast.error('La cotización no tiene razón social o sucursal');
      return;
    }

    this.dialog
      .open(AddSalesOrderLineDialogComponent, {
        width: '760px',
        maxWidth: '95vw',
        panelClass: 'po-line-dialog-panel',
        autoFocus: 'first-tabbable',
        data: {
          quotationId: q.id,
          folio: q.folio,
          currency: this.getPaymentCurrency(),
          fiscal_configuration_id: fiscalId,
          billing_branch_id: branchId,
          sale_scope: 'combined',
          ivaEnabled: this.ivaEnabled(),
          iepsEnabled: this.iepsEnabled(),
        },
      })
      .afterClosed()
      .subscribe((updated: QuotationDetailPayload | undefined) => {
        if (!updated) return;
        this.applyLineMutation(updated);
        this.toast.success('Producto agregado');
      });
  }

  canShowCancel(): boolean {
    return this.canCancelPerm && !!this.header()?.can_cancel;
  }

  canEditNotes(): boolean {
    const header = this.header();
    if (!this.canUpdate || !header) return false;
    if (header.can_edit_notes != null) return header.can_edit_notes;
    return header.general_status !== 'Cancelada';
  }

  openNotesEditor(): void {
    const q = this.header();
    if (!q || !this.canEditNotes()) return;

    this.dialog
      .open(QuotationNotesDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        autoFocus: 'textarea',
        data: {
          quotationId: q.id,
          notes: q.notes ?? '',
          folio: q.folio,
        },
      })
      .afterClosed()
      .subscribe((result: QuotationNotesDialogResult | undefined) => {
        if (!result?.saved) return;
        this.header.update((current) =>
          current ? { ...current, notes: result.notes ?? undefined } : current,
        );
        this.toast.success(
          result.notes
            ? 'Observaciones actualizadas. El PDF se regeneró.'
            : 'Observaciones eliminadas. El PDF se regeneró.',
        );
        this.reload(true);
      });
  }

  convert(): void {
    const q = this.header();
    if (!q?.can_convert) return;

    const branchName = this.getSucursalDisplayName();
    this.quotationService.collectionPreview(q.id).subscribe({
      next: (preview) => this.confirmConvert(q, preview.sucursal || branchName, preview.open_shift),
      error: () => this.confirmConvert(q, branchName, null),
    });
  }

  private confirmConvert(
    q: Quotation,
    branchName: string,
    openShift: { id: string; shift_date: string } | null,
  ): void {
    this.dialog
      .open(QuotationConvertDialogComponent, {
        width: '420px',
        maxWidth: '95vw',
        autoFocus: false,
        panelClass: 'quotation-convert-dialog',
        data: {
          branchName,
          openShift,
        },
      })
      .afterClosed()
      .subscribe((answer: QuotationConvertDialogResult | undefined) => {
        if (!answer) return;
        const sendToCaja = answer === 'send';
        this.converting.set(true);
        this.quotationService.convert(q.id, { send_to_pos_caja: sendToCaja }).subscribe({
          next: (res) => {
            this.converting.set(false);
            const folio = res.sales_order?.folio || 'OV';
            if (res.sales_order?.sent_to_pos_caja) {
              this.toast.success(`Convertida a ${folio}. En caja de ${branchName} para cobrar.`);
            } else {
              this.toast.success(`Convertida a ${folio}. Sin cobro en caja. Puedes enviarla después desde la orden.`);
            }
            this.dialogRef.close({ converted: true, salesOrderId: res.sales_order?.id });
          },
          error: (err) => {
            this.converting.set(false);
            this.toast.error(err?.error?.message || 'No se pudo convertir');
          },
        });
      });
  }

  advanceStep(): number {
    const q = this.header();
    if (!q) return 0;
    if (q.advance_invoice?.applied) return 4;
    if (q.general_status === 'Convertida') return 3;
    if (q.can_close_advance) return 2;
    if (Number(q.advance_requested_total ?? 0) > 0 || q.advance_invoice) return 1;
    return 0;
  }

  canAskAdvance(): boolean {
    const q = this.header();
    return !!q && q.general_status === 'Creada' && !q.advance_invoice && !(Number(q.advance_requested_total ?? 0) > 0);
  }

  askAdvance(): void {
    const q = this.header();
    if (!q || !this.canAskAdvance()) return;
    const realLines = this.lineItems().filter((line) => line.product?.sku !== ADVANCE_CONCEPT_SKU);
    const taxable = Math.max(
      Number(q.subtotal || 0) - Number(q.discount_total || 0) - Number(q.global_discount_amount || 0),
      0,
    );
    const iva = taxable > 0 ? Math.round((Number(q.iva_total || 0) / taxable) * 10000) / 100 : 8;
    const ivaPct = Math.abs(iva - 8) < 0.3 ? 8 : Math.abs(iva - 16) < 0.3 ? 16 : 8;
    this.dialog
      .open(AdvanceWizardDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        autoFocus: false,
        panelClass: 'advance-wizard-dialog',
        data: {
          mode: 'start',
          quotationId: q.id,
          folio: q.folio,
          quotationTotal: Number(q.total || 0),
          hasRealProducts: realLines.length > 0,
          customerLabel: q.customer_display_name || q.customer?.name || '',
          customerReady: !!q.customer?.fiscal_rfc,
          missingFiscal: q.customer?.fiscal_rfc ? [] : ['RFC'],
          ivaPercent: ivaPct,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (!result || result.mode === 'close' || !('advanceCase' in result)) return;
        this.quotationService
          .startAdvance(q.id, {
            advance_amount: result.amount,
            advance_case: result.advanceCase,
            advance_iva_percentage: result.ivaPercent,
            advance_uso_cfdi: 'G01',
            advance_metodo_pago: 'PUE',
            advance_stamp_environment: result.stampEnvironment,
          })
          .subscribe({
            next: () => {
              this.toast.success('Anticipo enviado a la caja de la sucursal');
              this.reload(true);
            },
            error: (err) => this.toast.error(err?.error?.message || 'No se pudo pedir el anticipo'),
          });
      });
  }

  generateAdvanceSale(): void {
    const q = this.header();
    if (!q?.can_close_advance) return;
    this.dialog
      .open(AdvanceWizardDialogComponent, {
        width: '560px',
        maxWidth: '95vw',
        autoFocus: false,
        panelClass: 'advance-wizard-dialog',
        data: {
          mode: 'close',
          quotationId: q.id,
          folio: q.folio,
          paid: Number(q.advance_invoice?.total ?? q.amount_paid ?? 0),
          warehouseId: q.warehouse_id,
          billingBranchId: q.billing_branch_id,
          lines: wizardLinesFromQuotation(this.lineItems()),
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (!result || result.mode !== 'close') return;
        const extra = result.difference > 0.009
          ? ` Caja cobra la diferencia.`
          : ' No hay diferencia por cobrar.';
        this.toast.success(`Venta ${result.salesOrderFolio} generada.${extra}`);
        this.reload(true);
      });
  }

  openAdvanceInvoice(): void {
    const q = this.header();
    if (!q?.can_stamp_advance) return;
    const base = Math.max(
      Number(q.subtotal || 0) - Number(q.discount_total || 0) - Number(q.global_discount_amount || 0),
      0,
    );
    const taxable = base || Number(q.total || 0);
    const iva = taxable > 0 ? Math.round((Number(q.iva_total || 0) / taxable) * 10000) / 100 : 8;
    const ivaPct = Math.abs(iva - 8) < 0.3 ? 8 : Math.abs(iva - 16) < 0.3 ? 16 : iva;
    this.dialog
      .open(AdvanceInvoiceDialogComponent, {
        width: '480px',
        maxWidth: '95vw',
        panelClass: 'advance-invoice-dialog-panel',
        autoFocus: false,
        data: {
          mode: 'stamp',
          source: 'quotation',
          documentId: q.id,
          folio: q.folio,
          defaultBase: Number(base.toFixed(2)),
          defaultTotal: Number(q.total || 0),
          defaultIva: ivaPct,
          customer: {
            fiscal_rfc: q.customer?.fiscal_rfc,
            fiscal_person_type: q.customer?.fiscal_person_type,
            is_walk_in: q.customer_summary?.is_walk_in,
          },
        },
      })
      .afterClosed()
      .subscribe((stamped) => {
        if (!stamped) return;
        this.toast.success('Factura de anticipo timbrada');
        this.reload(true);
      });
  }

  cancelAdvanceInvoice(): void {
    const q = this.header();
    const invoiceId = q?.advance_invoice?.id;
    if (!q || !invoiceId || q.advance_invoice?.applied) return;
    this.quotationService.cancelAdvance(q.id, invoiceId).subscribe({
      next: () => {
        this.toast.success('Factura de anticipo cancelada');
        this.reload(true);
      },
      error: (err) => this.toast.error(err?.error?.message || 'No se pudo cancelar el anticipo'),
    });
  }

  cancelQuotation(): void {
    const q = this.header();
    if (!q?.can_cancel) return;
    this.cancelling.set(true);
    this.quotationService.cancel(q.id).subscribe({
      next: () => {
        this.cancelling.set(false);
        this.toast.success('Cotización cancelada');
        this.dialogRef.close({ cancelled: true });
      },
      error: (err) => {
        this.cancelling.set(false);
        this.toast.error(err?.error?.message || 'No se pudo cancelar');
      },
    });
  }

  goToSalesOrder(): void {
    const id = this.header()?.converted_to_sales_order_id;
    if (!id) return;
    this.dialogRef.close();
    void this.router.navigate(['/sales-orders']);
  }

  originalDocument(): QuotationDocument | undefined {
    return this.documents().find((d) => d.document_type_name === 'DOCUMENTO_ORIGINAL');
  }

  openPdf(): void {
    const doc = this.originalDocument();
    const url = doc?.path?.trim();
    if (!url) {
      this.toast.info('El PDF aún se está generando. Recarga en unos segundos.');
      return;
    }
    openInvoicePdfViewer(this.dialog, url, doc?.document_name || this.header()?.folio || 'Cotización');
  }

  regeneratePDF(): void {
    const q = this.header();
    if (!q) return;
    this.regeneratingPDF.set(true);
    this.quotationService.regenerateDocumentoOriginal(q.id).subscribe({
      next: () => {
        this.regeneratingPDF.set(false);
        this.toast.success('PDF regenerado');
        this.reload(true);
      },
      error: (err) => {
        this.regeneratingPDF.set(false);
        this.toast.error(err?.error?.message || 'No se pudo regenerar el PDF');
      },
    });
  }

  getDocumentTypeLabel(documentType: string): string {
    return getSalesOrderDocumentChipLabel(documentType);
  }

  getDocumentBadgeClass(documentType: string): string {
    switch (getSalesOrderDocumentKind(documentType)) {
      case 'original':
        return 'badge-blue';
      case 'delivery':
        return 'badge-green';
      default:
        return 'badge-gray';
    }
  }

  getDocumentLanguageLabel(language?: string | null): string | null {
    if (language === 'es') return 'ES';
    if (language === 'en') return 'EN';
    return null;
  }

  formatDocumentDate(dateString?: string | null): string {
    return formatApiDate(dateString, 'month-day');
  }

  canPreviewDocument(doc: QuotationDocument): boolean {
    const named = (doc.document_name || '').trim();
    const file = (named || (doc.path || '').split('?')[0].split('/').pop() || '').toLowerCase();
    return !file || !file.includes('.') || /\.(pdf|png|jpe?g|webp|gif)$/.test(file);
  }

  previewDocument(doc: QuotationDocument): void {
    const url = doc.path?.trim();
    if (!url) return;
    openInvoicePdfViewer(this.dialog, url, doc.document_name || 'Documento');
  }

  downloadDocument(doc: QuotationDocument): void {
    const url = doc.path?.trim();
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (doc.document_name) link.download = doc.document_name;
    link.click();
  }
}
